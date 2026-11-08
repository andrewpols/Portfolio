import "../styles/work.css";
import { experiences } from "./workData.js";

export default function Experiences() {
    return (
        <section id="experiences-section" className="section">
            <h2 className="section-label">Experience</h2>
            <div className="section-body">
                {experiences.map((e) => (
                    <article className="experience" id={`experience-${e.id}`} tabIndex={-1} key={e.id}>
                        <div className="experience-top">
                            <h3 className="experience-role">{e.role}, {e.company}</h3>
                            <p className="experience-period">{e.period}</p>
                        </div>
                        <p className="experience-meta">{e.location}</p>
                        <p className="experience-summary">{e.summary}</p>
                        <ul className="experience-highlights">
                            {e.highlights.map((h, j) => <li key={j}>{h}</li>)}
                        </ul>
                    </article>
                ))}
            </div>
        </section>
    );
}
