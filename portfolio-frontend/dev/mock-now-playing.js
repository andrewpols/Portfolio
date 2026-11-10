// Dev-only stand-in for /api/now-playing: fake songs, no Spotify calls, no quota. Used when the dev server
// starts with NOW_PLAYING_MOCK=1 (see `npm run dev:mock`). It is only wired into vite.config.js's dev
// middleware, so it never ships.
//
// A new fake song goes "live" every SLOT_MS. Like Spotify, the mock only logs songs that were played to the
// end: every third song counts as skipped and never reaches the recent list, so the page's own
// "passed songs" handling is visible. Every seventh slot is paused, so the pause icon shows too.

const SLOT_MS = 20_000;
const SONGS = [
    ["Neon Harbor", "The Static Choir", "Low Tide"],
    ["Paper Satellites", "Mira Lowe", "Orbit Notes"],
    ["Slow Fire", "Cedar & Salt", "Slow Fire"],
    ["Glass Avenue", "The Static Choir", "Low Tide"],
    ["Afterimage", "Juno Park", "Afterimage"],
    ["Halfway Home", "Mira Lowe", "Orbit Notes"],
    ["Velvet Static", "Cedar & Salt", "Dim Signals"],
    ["Northbound", "Juno Park", "Afterimage"],
];
const ARTISTS = ["The Static Choir", "Mira Lowe", "Cedar & Salt", "Juno Park", "Kite Season"];

function song(i, { nowPlaying = false, playedAt = null } = {}) {
    const [name, artist, album] = SONGS[((i % SONGS.length) + SONGS.length) % SONGS.length];
    return { name, artist, album, url: "https://example.com/mock", image: "", nowPlaying, playedAt };
}

export function mockNowPlaying(startedAt, now = Date.now()) {
    const slot = Math.floor((now - startedAt) / SLOT_MS);
    const startS = Math.floor(startedAt / 1000);

    // Songs "played to the end" before this slot, newest first, plus a little older history.
    const logged = [];
    for (let i = slot - 1; i >= 0 && logged.length < 5; i--) {
        if (i % 3 === 2) continue; // skipped: Spotify would never log it
        logged.push(song(i, { playedAt: Math.floor((startedAt + (i + 1) * SLOT_MS) / 1000) }));
    }
    logged.push(song(-1, { playedAt: startS - 3600 }), song(-2, { playedAt: startS - 5400 }));

    const paused = slot % 7 === 6;
    const track = paused ? logged[0] : song(slot, { nowPlaying: true });
    const recent = paused ? logged.slice(1, 6) : logged.slice(0, 5);

    return {
        track,
        recent,
        topArtists: ARTISTS.map((name) => ({ name, url: "https://example.com/mock" })),
        topArtistsPeriod: "recent",
    };
}
