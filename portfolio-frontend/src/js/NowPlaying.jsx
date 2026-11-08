import { useEffect, useState } from "react";
import Reveal from "./Reveal.jsx";

const REFRESH_MS = 30000;

function timeAgo(uts) {
    const mins = Math.floor((Date.now() / 1000 - uts) / 60);
    if (mins < 1) return "just now";
    if (mins < 60) return `${mins}m ago`;
    const hrs = Math.floor(mins / 60);
    if (hrs < 24) return `${hrs}h ago`;
    return `${Math.floor(hrs / 24)}d ago`;
}

function Equalizer() {
    return (
        <span className="eq" aria-hidden="true">
            <i /><i /><i /><i />
        </span>
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

        async function load() {
            try {
                const res = await fetch("/api/now-playing");
                if (!res.ok) return;
                const json = await res.json();
                if (!cancelled && json.track) setData(json);
            } catch {
                // keep showing the last known data
            }
        }

        load();
        const id = setInterval(load, REFRESH_MS);
        return () => {
            cancelled = true;
            clearInterval(id);
        };
    }, []);

    if (!data) return null;
    const { track, recent = [], topArtists = [] } = data;
    const live = track.nowPlaying;

    return (
        <Reveal as="section" id="music-section" className="section">
        <h2 className="section-label">Listening</h2>
        <div className="section-body">
        <div id="music-card" className={live ? "is-live" : ""}>
            <div className="music-feature">
                <a href={track.url} target="_blank" rel="noreferrer" className="music-art-wrap" aria-label={`Open ${track.name} by ${track.artist} on Last.fm`}>
                    <Art src={track.image} className="music-art" />
                </a>
                <div className="music-meta">
                    <span className="music-status">
                        <Equalizer />
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
                        <p className="music-label">On repeat this month</p>
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
