// Checks whether Spotify is currently rate-limiting this app, using one lightweight call.
//
//   node --env-file=.env.local scripts/spotify-status.mjs
//
// Run it sparingly: every run is a real request against the app's quota.

const e = process.env;
if (!e.SPOTIFY_CLIENT_ID || !e.SPOTIFY_CLIENT_SECRET || !e.SPOTIFY_REFRESH_TOKEN) {
    console.error("Missing SPOTIFY_* env vars. Run with: node --env-file=.env.local scripts/spotify-status.mjs");
    process.exit(1);
}

const tokenRes = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
        Authorization: "Basic " + btoa(`${e.SPOTIFY_CLIENT_ID}:${e.SPOTIFY_CLIENT_SECRET}`),
        "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({ grant_type: "refresh_token", refresh_token: e.SPOTIFY_REFRESH_TOKEN }),
});
if (!tokenRes.ok) {
    console.log(`Token exchange failed (${tokenRes.status}): the refresh token may need re-authorizing.`);
    process.exit(1);
}
const { access_token } = await tokenRes.json();

const res = await fetch("https://api.spotify.com/v1/me/player/recently-played?limit=1", {
    headers: { Authorization: `Bearer ${access_token}` },
});

if (res.status === 429) {
    const wait = Number(res.headers.get("retry-after")) || 0;
    const clears = new Date(Date.now() + wait * 1000);
    const h = Math.floor(wait / 3600);
    const m = Math.round((wait % 3600) / 60);
    console.log("BLOCKED (429 rate limit)");
    console.log(`Retry-After: ${wait}s (about ${h}h ${m}m)`);
    console.log(`Should clear around: ${clears.toLocaleString()}`);
} else if (res.ok) {
    console.log("OK: recently-played is working again. The rate limit has cleared.");
} else {
    console.log(`Unexpected response: ${res.status} ${(await res.text()).slice(0, 200)}`);
}
