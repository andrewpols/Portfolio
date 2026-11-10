// Vercel serverless function: proxies Spotify so credentials stay server-side.
// Env vars: SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET, SPOTIFY_REFRESH_TOKEN
// Get the refresh token once with `node scripts/spotify-auth.mjs`.

const API = "https://api.spotify.com/v1";
const RECENT_COUNT = 5;

// Reused across warm invocations so most requests skip the token exchange.
let cachedToken = { value: null, expiresAt: 0 };

async function getAccessToken({ SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET, SPOTIFY_REFRESH_TOKEN }) {
    if (cachedToken.value && Date.now() < cachedToken.expiresAt - 30000) return cachedToken.value;

    const basic = btoa(`${SPOTIFY_CLIENT_ID}:${SPOTIFY_CLIENT_SECRET}`);
    const res = await fetch("https://accounts.spotify.com/api/token", {
        method: "POST",
        headers: {
            Authorization: `Basic ${basic}`,
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({ grant_type: "refresh_token", refresh_token: SPOTIFY_REFRESH_TOKEN }),
        signal: AbortSignal.timeout(8000),
    });
    if (!res.ok) {
        // 400/401 here usually means the refresh token was revoked: rerun scripts/spotify-auth.mjs and update the env var.
        console.error(`Spotify token exchange failed (${res.status}). The refresh token may need re-authorizing.`);
        throw new Error(`Spotify token exchange responded ${res.status}`);
    }

    const json = await res.json();
    cachedToken = { value: json.access_token, expiresAt: Date.now() + json.expires_in * 1000 };
    return cachedToken.value;
}

// Spotify's dev-mode quota is small and shared by the whole app, so only the live track is fetched on every
// request. The recent list only changes when a song ends, so it is refetched when the live song changes (it
// is remembered under that song's id) and otherwise only as a slow backstop. Both lists are kept per warm
// instance.
const RECENT_TTL_MS = 10 * 60_000;
const ARTISTS_TTL_MS = 10 * 60_000;
const slots = {
    recent: { at: 0, data: null, forKey: null, blockedUntil: 0 },
    artists: { at: 0, data: null, forKey: null, blockedUntil: 0 },
};

function spotifyGet(path, token) {
    return fetch(`${API}${path}`, {
        headers: { Authorization: `Bearer ${token}` },
        signal: AbortSignal.timeout(8000),
    });
}

// Returns fresh data when the cache is stale. On any failure the last good copy is returned (or null), and a
// 429 pauses calls until Spotify's Retry-After has passed so we don't dig the hole deeper.
async function cached(slot, ttl, path, token, key = null) {
    const now = Date.now();
    if (slot.data && now - slot.at < ttl && slot.forKey === key) return slot.data;
    if (now < slot.blockedUntil) return slot.data;
    const name = path.split("?")[0];
    try {
        const res = await spotifyGet(path, token);
        if (res.status === 429) {
            const wait = Number(res.headers.get("retry-after")) || 60;
            slot.blockedUntil = now + wait * 1000;
            console.error(`Spotify rate limit on ${name}: pausing for ${wait}s`);
            return slot.data;
        }
        if (!res.ok) {
            console.error(`Spotify ${name} responded ${res.status}`);
            return slot.data;
        }
        slot.data = await res.json();
        slot.at = now;
        slot.forKey = key;
        return slot.data;
    } catch (err) {
        console.error(`Spotify ${name} failed:`, err?.message ?? err);
        return slot.data;
    }
}

// 204 means nothing is playing, so there is no body to parse.
// The live track is the one call that must stay fresh, so it gets a short TTL instead of the long ones above.
// Concurrent requests on a warm instance share one in-flight call, and a 429 backs off for Retry-After.
const CURRENT_TTL_MS = 4000;
let current = { at: 0, data: null, blockedUntil: 0, inflight: null };

function getCurrent(token) {
    const now = Date.now();
    if (now - current.at < CURRENT_TTL_MS) return Promise.resolve(current.data);
    if (now < current.blockedUntil) return Promise.resolve(null); // limited: show nothing live rather than a stale song
    if (current.inflight) return current.inflight;

    current.inflight = (async () => {
        try {
            const res = await spotifyGet("/me/player/currently-playing", token);
            if (res.status === 429) {
                const wait = Number(res.headers.get("retry-after")) || 60;
                current.blockedUntil = Date.now() + wait * 1000;
                console.error(`Spotify rate limit on currently-playing: pausing for ${wait}s`);
                return null;
            }
            // 204 = nothing playing (no body). Cache that too so an idle account isn't re-polled constantly.
            const data = res.status === 200 ? await res.json().catch(() => null) : null;
            if (res.ok) current = { ...current, at: Date.now(), data };
            return data;
        } catch {
            return null;
        } finally {
            current.inflight = null;
        }
    })();
    return current.inflight;
}

// Images come largest first; take the smallest one that is still at least 300px wide.
function pickArt(images = []) {
    const fit = images.filter((i) => (i.width ?? 0) >= 300).pop();
    return (fit ?? images[0])?.url ?? "";
}

function shapeTrack(t, { nowPlaying = false, playedAt = null } = {}) {
    return {
        name: t.name,
        artist: (t.artists ?? []).map((a) => a.name).join(", "),
        album: t.album?.name ?? "",
        url: t.external_urls?.spotify ?? "",
        image: pickArt(t.album?.images),
        nowPlaying,
        playedAt,
    };
}

// Same song = same artist + title. Spotify lists newest first, so keeping the first hit keeps the most recent play.
function uniqueTracks(tracks) {
    const seen = new Set();
    return tracks.filter((t) => {
        const key = `${t.artist}\u0000${t.name}`.toLowerCase();
        if (seen.has(key)) return false;
        seen.add(key);
        return true;
    });
}

// Counts plays per lead artist (features would inflate the tally). Items are newest first.
function topArtistsFromRecent(items, limit = 5) {
    const counts = new Map();
    for (const { track } of items) {
        const artist = track?.artists?.[0];
        if (!artist) continue;
        const entry = counts.get(artist.id ?? artist.name) ?? {
            name: artist.name,
            url: artist.external_urls?.spotify ?? "",
            plays: 0,
        };
        entry.plays += 1;
        counts.set(artist.id ?? artist.name, entry);
    }
    return [...counts.values()]
        .sort((a, b) => b.plays - a.plays) // stable: ties stay in most-recent-first order
        .slice(0, limit)
        .map(({ name, url }) => ({ name, url }));
}

export default async function handler(req, res) {
    const env = process.env;
    if (!env.SPOTIFY_CLIENT_ID || !env.SPOTIFY_CLIENT_SECRET || !env.SPOTIFY_REFRESH_TOKEN) {
        return res.status(500).json({ error: "Spotify is not configured" });
    }

    try {
        const token = await getAccessToken(env);
        // The live track comes first: its id decides whether the recent list needs refetching. Every call can
        // fail independently, so a rate limit on one list must not take the whole card down.
        const currentData = await getCurrent(token);
        const liveKey =
            currentData?.is_playing && currentData.item?.type === "track"
                ? (currentData.item.id ?? currentData.item.name)
                : null;
        const [recentData, artistsData] = await Promise.all([
            cached(slots.recent, RECENT_TTL_MS, "/me/player/recently-played?limit=50", token, liveKey),
            cached(slots.artists, ARTISTS_TTL_MS, "/me/top/artists?time_range=short_term&limit=5", token),
        ]);

        const played = (recentData?.items ?? [])
            .filter((i) => i.track)
            .map((i) => shapeTrack(i.track, { playedAt: Math.floor(Date.parse(i.played_at) / 1000) }));

        // Podcast episodes and paused playback don't count as "listening now".
        const live =
            currentData?.is_playing && currentData.item?.type === "track"
                ? shapeTrack(currentData.item, { nowPlaying: true })
                : null;

        const tracks = uniqueTracks(live ? [live, ...played] : played);
        let topArtists = (artistsData?.items ?? []).map((a) => ({
            name: a.name,
            url: a.external_urls?.spotify ?? "",
        }));
        let topArtistsPeriod = "month";

        // Spotify returns nothing here for accounts with little history, so fall back to the artists
        // played most in the last 50 plays. Ties keep the most recently played first.
        if (!topArtists.length) {
            topArtists = topArtistsFromRecent(recentData?.items ?? []);
            topArtistsPeriod = "recent";
        }

        res.setHeader("Cache-Control", "s-maxage=7, stale-while-revalidate=10");

        if (!tracks[0]) return res.status(204).end(); // nothing played yet: the card stays hidden

        return res.status(200).json({
            track: tracks[0],
            recent: tracks.slice(1, 1 + RECENT_COUNT),
            topArtists,
            topArtistsPeriod,
        });
    } catch (err) {
        console.error("now-playing failed:", err?.message ?? err);
        return res.status(502).json({ error: "Failed to reach Spotify" });
    }
}
