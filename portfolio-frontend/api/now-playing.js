// Vercel serverless function: proxies Last.fm so the API key stays server-side.
// Env vars: LASTFM_API_KEY, LASTFM_USERNAME

const PLACEHOLDER_HASH = "2a96cbd8b46e442fc41c2b86b821562f"; // Last.fm's "no art" star

function pickArt(images = []) {
    const order = ["extralarge", "large", "medium"];
    for (const size of order) {
        const src = images.find((i) => i.size === size)?.["#text"];
        if (src && !src.includes(PLACEHOLDER_HASH)) return src;
    }
    return "";
}

function shapeTrack(t) {
    return {
        name: t.name,
        artist: t.artist?.["#text"] ?? "",
        album: t.album?.["#text"] ?? "",
        url: t.url,
        image: pickArt(t.image),
        nowPlaying: t["@attr"]?.nowplaying === "true",
        playedAt: t.date?.uts ? Number(t.date.uts) : null,
    };
}

// Same song = same artist + title. Last.fm lists newest first, so keeping the first hit keeps the most recent play.
function uniqueTracks(tracks) {
    const seen = new Set();
    return tracks.filter((t) => {
        const key = `${t.artist}\u0000${t.name}`.toLowerCase();
        if (seen.has(key)) return false;
        seen.add(key);
        return true;
    });
}

const RECENT_COUNT = 5;

export default async function handler(req, res) {
    const { LASTFM_API_KEY, LASTFM_USERNAME } = process.env;

    if (!LASTFM_API_KEY || !LASTFM_USERNAME) {
        return res.status(500).json({ error: "Last.fm is not configured" });
    }

    const base =
        "https://ws.audioscrobbler.com/2.0/?format=json" +
        `&user=${encodeURIComponent(LASTFM_USERNAME)}` +
        `&api_key=${encodeURIComponent(LASTFM_API_KEY)}`;

    try {
        const get = (query) => fetch(`${base}&${query}`, { signal: AbortSignal.timeout(8000) });
        // Top artists are optional: if that call fails or times out, still return the recent tracks.
        const [recentRes, artistsRes] = await Promise.all([
            get("method=user.getrecenttracks&limit=30"),
            get("method=user.gettopartists&period=1month&limit=5").catch(() => null),
        ]);
        if (!recentRes.ok) throw new Error(`Last.fm responded ${recentRes.status}`);

        const recentData = await recentRes.json();
        const artistsData = artistsRes?.ok ? await artistsRes.json().catch(() => null) : null;

        const tracks = uniqueTracks((recentData?.recenttracks?.track ?? []).map(shapeTrack));
        const topArtists = (artistsData?.topartists?.artist ?? []).map((a) => ({
            name: a.name,
            url: a.url,
            plays: Number(a.playcount) || 0,
        }));

        res.setHeader("Cache-Control", "s-maxage=30, stale-while-revalidate=60");

        if (!tracks[0]) return res.status(204).end(); // nothing played yet: the card stays hidden

        return res.status(200).json({
            track: tracks[0] ?? null,
            recent: tracks.slice(1, 1 + RECENT_COUNT),
            topArtists,
        });
    } catch {
        return res.status(502).json({ error: "Failed to reach Last.fm" });
    }
}
