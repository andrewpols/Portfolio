import "../styles/work.css";
import { experiences } from "./workData.js";
import { ArrowUpRight, PlayBadge } from "./Icons.jsx";
import usePreview from "./usePreview.js";
import OrgMark from "./OrgMark.jsx";

function Experience({ e }) {
    const { ref, shown, hover } = usePreview({ autoplayOnce: true });
    return (
        <article className="experience" id={`experience-${e.id}`} tabIndex={-1} {...hover}>
            <div className="experience-head">
                <h3 className="experience-role">{e.mark && <OrgMark src={e.mark} className="org-mark-wide" />}<span>{e.role}, {e.company}</span></h3>
                <p className="meta nowrap when-wide">{e.period}</p>
            </div>
            <p className="meta experience-place"><span className="when-narrow">{e.period}</span>{e.location}</p>
            <p className="experience-summary">{e.summary}</p>
            <ul className="experience-did">
                {e.highlights.slice(0, 2).map((h) => <li key={h}>{h}</li>)}
            </ul>
            <div className={`preview${e.previewVid ? " has-video" : ""}${shown ? " is-playing" : ""}`}>
                <img src={e.previewImg} alt={e.previewAlt} className="preview-frame" loading="lazy" decoding="async" />
                {e.previewVid && <video ref={ref} src={e.previewVid} muted loop playsInline preload="none" poster={e.previewImg} aria-hidden="true" className="preview-video" />}
                {e.previewVid && <PlayBadge />}
            </div>
            <p className="links-row experience-links">
                {e.link && <a href={e.link} target="_blank" rel="noreferrer" className="text-link">{e.linkLabel}<ArrowUpRight /></a>}
                {e.demoLink && <a href={e.demoLink} target="_blank" rel="noreferrer" className="text-link">{e.demoLabel}<ArrowUpRight /></a>}
            </p>
        </article>
    );
}

export default function Experiences() {
    return (
        <section id="experiences-section" className="page block">
            <h2 className="block-title">Experience</h2>
            <div className="block-body">
                {experiences.map((e) => <Experience e={e} key={e.id} />)}
            </div>
        </section>
    );
}
