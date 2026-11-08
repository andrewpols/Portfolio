import "../styles/about-me.css";

import { EducationCard } from "./EducationCard.jsx";
import NowPlaying from "./NowPlaying.jsx";
import Reveal from "./Reveal.jsx";

const stack = [
    { label: "Frontend", items: ["React", "JavaScript", "TypeScript", "Tailwind CSS", "HTML"] },
    { label: "Backend", items: ["Python", "Java", "Go", "C", "SQL", "Node.js"] },
    { label: "Databases", items: ["PostgreSQL", "MySQL", "MongoDB", "Redis", "ChromaDB"] },
    { label: "Tools", items: ["Docker", "Git", "Jira", "scikit-learn"] },
];

export default function AboutMe() {
    return (
        <>
            <Reveal as="section" id="about-me-section" className="section">
                <h2 className="section-label">About</h2>
                <div className="section-body about-grid">
                    <div id="about-me-desc">
                        <p>
                            I&rsquo;m a third-year Computer Science student at UofT, currently on a 12-month internship at IBM on the{" "}
                            <a href="https://www.ibm.com/products/planning-analytics/" target="_blank" rel="noreferrer" id="pa-link">Planning Analytics</a> team.
                        </p>
                        <p>
                            I&rsquo;m motivated by challenging problems in domains that impact people at a large scale. At IBM, that&rsquo;s the FP&amp;A sector, but I&rsquo;ve also solved problems in research and music through personal projects.
                        </p>
                        <p>
                            Outside of work, I&rsquo;m usually listening to something. The music I love shapes how I make decisions and even how I write code.
                        </p>
                    </div>

                    <EducationCard
                        institution="University of Toronto"
                        degree="HBSc"
                        field="Computer Science"
                        startDate="2024"
                        endDate="2028"
                        gpa="4.00 / 4.00"
                        location="Toronto, ON"
                        courses={[
                            { code: "CSC207", name: "Software Design" },
                            { code: "CSC258", name: "Computer Organization" },
                            { code: "CSC209", name: "Systems Programming" },
                            { code: "STA238", name: "Probability, Statistics, and Data Analysis II" },
                        ]}
                        achievements={[
                            "Dean's List for 4 consecutive semesters",
                            "Governor General's Academic Medal",
                        ]}
                    />
                </div>
            </Reveal>

            <NowPlaying />

            <Reveal as="section" id="tech-stack-section" className="section">
                <h2 className="section-label">Stack</h2>
                <dl className="section-body stack-list">
                    {stack.map((g) => (
                        <div className="stack-row" key={g.label}>
                            <dt>{g.label}</dt>
                            <dd>{g.items.join(" / ")}</dd>
                        </div>
                    ))}
                </dl>
            </Reveal>
        </>
    );
}
