import { useEffect, useState } from "react";
import Reveal from "./Reveal.jsx";

// The server caches for a few seconds too, so checking faster than this gains nothing.
const REFRESH_MS = 10000;

function timeAgo(uts) {
    const mins = Math.floor((Date.now() / 1000 - uts) / 60);
    if (mins < 1) return "just now";
    if (mins < 60) return `${mins}m ago`;
    const hrs = Math.floor(mins / 60);
    if (hrs < 24) return `${hrs}h ago`;
    return `${Math.floor(hrs / 24)}d ago`;
}

// Moving bars while a track is live, a pause icon when it isn't. Both are decorative: the status text carries the state.
function PlaybackIcon({ live }) {
    if (live) {
        return (
            <span className="eq" aria-hidden="true">
                <i /><i /><i /><i />
            </span>
        );
    }
    return (
        <svg className="pause-icon" width="18" height="13" viewBox="0 0 18 13" fill="currentColor" aria-hidden="true">
            <rect x="4" y="0" width="4" height="13" />
            <rect x="10" y="0" width="4" height="13" />
        </svg>
    );
}

function Art({ src, className }) {
    return src ? (
        <img className={className} src={src} alt="" loading="lazy" />
    ) : (
        <div className={`${className} art-empty`} />
    );
}

export default function NowPlaying() {
    const [data, setData] = useState(null);

    useEffect(() => {
        let cancelled = false;
        const ctrl = new AbortController();

        async function load() {
            if (document.hidden) return; // don't poll from a background tab
            try {
                const res = await fetch("/api/now-playing", { signal: ctrl.signal });
                if (!res.ok) return;
                const json = await res.json();
                if (!cancelled && json.track) setData(json);
            } catch {
                // keep showing the last known data
            }
        }

        load();
        const id = setInterval(load, REFRESH_MS);
        const onVisible = () => { if (!document.hidden) load(); };
        document.addEventListener("visibilitychange", onVisible);
        return () => {
            cancelled = true;
            ctrl.abort();
            clearInterval(id);
            document.removeEventListener("visibilitychange", onVisible);
        };
    }, []);

    if (!data) return null;
    const { track, recent = [], topArtists = [], topArtistsPeriod } = data;
    const live = track.nowPlaying;

    return (
        <Reveal as="section" id="music-section" className="section">
        <h2 className="section-label">Listening</h2>
        <div className="section-body">
        <div id="music-card" className={live ? "is-live" : ""}>
            <div className="music-feature">
                <a href={track.url} target="_blank" rel="noreferrer" className="music-art-wrap" aria-label={`Open ${track.name} by ${track.artist} on Spotify`}>
                    <Art src={track.image} className="music-art" />
                </a>
                <div className="music-meta">
                    <span className="music-status">
                        <PlaybackIcon live={live} />
                        {live ? "Listening now" : `Last played${track.playedAt ? ` · ${timeAgo(track.playedAt)}` : ""}`}
                    </span>
                    <a href={track.url} target="_blank" rel="noreferrer" className="music-title">
                        {track.name}
                    </a>
                    <span className="music-artist">{track.artist}</span>
                    {track.album && <span className="music-album">{track.album}</span>}
                </div>
            </div>

            <div className="music-side">
                {recent.length > 0 && (
                    <div className="music-block">
                        <p className="music-label">Recently played</p>
                        <ul className="music-recent">
                            {recent.map((t, i) => (
                                <li key={`${t.url}-${i}`}>
                                    <a href={t.url} target="_blank" rel="noreferrer">
                                        <Art src={t.image} className="music-mini-art" />
                                        <span className="music-mini-info">
                                            <span className="music-mini-title">{t.name}</span>
                                            <span className="music-mini-artist">{t.artist}</span>
                                        </span>
                                        {t.playedAt && <span className="music-mini-time">{timeAgo(t.playedAt)}</span>}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}

                {topArtists.length > 0 && (
                    <div className="music-block">
                        <p className="music-label">{topArtistsPeriod === "recent" ? "On repeat lately" : "On repeat this month"}</p>
                        <div className="music-artists">
                            {topArtists.map((a) => (
                                <a key={a.name} href={a.url} target="_blank" rel="noreferrer" className="music-artist-chip">
                                    {a.name}
                                </a>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
        </div>
        </Reveal>
    );
}
