import "../styles/experience.css";

const experiences = [
    {
        company: "IBM",
        role: "Software Developer Intern",
        period: "May 2026 - May 2027",
        location: "Toronto, ON",
        summary:
            "Developing tools that help clients navigate their data and models on IBM Planning Analytics Workspace.",
        highlights: [
            "Built an interactive dependency graph for exploring relationships between Planning Analytics objects.",
            "Worked with TM1 APIs to collect and process dependency data and turn it into a visual graph.",
            "Collaborated with engineers, designers, and product management to develop and refine the feature through the development process.",
        ],
    }
];

export default function Experiences({embedded = false}) {
    return (
        <section id="experiences-section">
            <div className="section-heading-wrap">
                {embedded ? (
                    <div className="portfolio-section-heading">
                        <p>01 / Experience</p>
                        <h2>Experience</h2>
                    </div>
                ) : (
                    <>
                        <p className="section-kicker">Professional background</p>
                        <h1 className="section-title">Experience</h1>
                    </>
                )}
            </div>

            <div className="experience-timeline">
                {experiences.map((experience, index) => (
                    <article className="experience-card" key={`${experience.company}-${index}`}>
                        <div className="experience-content">
                            <div className="experience-header-row">
                                <div>
                                    <p className="experience-company">{experience.company}</p>
                                    <h2 className="experience-role">{experience.role}</h2>
                                </div>
                                <span className="experience-badge">{experience.period}</span>
                            </div>

                            <p className="experience-meta">{experience.location}</p>
                            <p className="experience-summary">{experience.summary}</p>

                            <ul className="experience-highlights">
                                {experience.highlights.map((highlight, highlightIndex) => (
                                    <li key={`${experience.company}-highlight-${highlightIndex}`}>{highlight}</li>
                                ))}
                            </ul>
                        </div>
                    </article>
                ))}
            </div>
        </section>
    );
}
