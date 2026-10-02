import "../styles/about-me.css";

import { FaReact } from "react-icons/fa";
import { SiJavascript } from "react-icons/si";
import { SiTypescript } from "react-icons/si";
import { SiTailwindcss } from "react-icons/si";
import { SiPython } from "react-icons/si";
import { FaJava } from "react-icons/fa";
import { SiC } from "react-icons/si";
import { SiRedis } from "react-icons/si";
import { SiDjango } from "react-icons/si";
import { FaNodeJs } from "react-icons/fa";
import { SiDocker } from "react-icons/si";
import { FaGitAlt } from "react-icons/fa6";
import { TbSql } from "react-icons/tb";
import { SiJira } from "react-icons/si";
import { SiNginx } from "react-icons/si";
import { SiScikitlearn } from "react-icons/si";

import { EducationCard } from "./EducationCard.jsx";

function TechStackCard({ Icon, name }) {
    return (
        <div className="tech-stack-chip">
            <div className="tech-stack-content">
                <Icon className="tech-stack-icon" />
                <span className="tech-stack-name">{name}</span>
            </div>
        </div>
    )
}

export default function AboutMe() {

    return (
        <section id="about-me-section">
            <div id="about-me-container">
                <div id="about-me-intro">
                    <div id="about-me-text" className="mt-12">
                        <h1 id="about-me-title">About Me</h1>
                        <p id="about-me-desc" className="mt-5 mr-20 text-xs">
                            I'm a third-year Computer Science student at UofT, currently on a 12-month internship at IBM on the <a href="https://www.ibm.com/products/planning-analytics/" target="_blank" id="pa-link">Planning Analytics</a> team. 
                            I have a 4.0/4.0 GPA and have built projects across software engineering, data science, and computer science. 
                            <br />
                            <br />
                            Outside of tech, I love listening to music and reading books. My favourite song at the moment is The Weeknd's <i>"The Birds Pt. 2."</i>
                        </p>
                    </div>

                    <div id="about-me-picture">
                        <EducationCard
                            institution="University of Toronto"
                            degree="HBsc"
                            field="Computer Science"
                            startDate="2024"
                            endDate="2029"
                            gpa="4.00 / 4.00"
                            location="Toronto, ON"
                            courses={[
                                { code: "CSC207", name: "Software Design" },
                                { code: "CSC258", name: "Computer Organization" },
                                { code: "CSC209", name: "Systems Programming" },
                                { code: "STA208", name: "Probability, Statistics, and Data Analysis II" },
                            ]}
                            achievements={[
                                "Dean's List for 4 consecutive semesters",
                                "University of Toronto Scholar: $10,000",

                            ]}
                        />
                    </div>
                </div>
            </div>


            <div id="tech-stack-section">
                <div className="tech-stack-header">
                    <p className="tech-stack-kicker">Capabilities</p>
                    <h2>Tech stack</h2>
                </div>

                <div className="tech-stack-groups">
                    <div className="tech-stack-group">
                        <p className="tech-stack-label">Frontend</p>
                        <div className="tech-stack-list">
                            <TechStackCard Icon={FaReact} name="React" />
                            <TechStackCard Icon={SiJavascript} name="JavaScript" />
                            <TechStackCard Icon={SiTypescript} name="TypeScript" />
                            <TechStackCard Icon={SiTailwindcss} name="Tailwind CSS" />
                        </div>
                    </div>

                    <div className="tech-stack-group">
                        <p className="tech-stack-label">Backend</p>
                        <div className="tech-stack-list">
                            <TechStackCard Icon={SiPython} name="Python" />
                            <TechStackCard Icon={FaJava} name="Java" />
                            <TechStackCard Icon={SiC} name="C" />
                            <TechStackCard Icon={SiRedis} name="Redis" />
                            <TechStackCard Icon={TbSql} name="SQL" />
                            <TechStackCard Icon={FaNodeJs} name="Node.js" />
                        </div>
                    </div>

                    {/* Tools */}
                    <div className="tech-stack-group">
                        <p className="tech-stack-label">Tools</p>
                        <div className="tech-stack-list">
                            <TechStackCard Icon={SiDocker} name="Docker" />
                            <TechStackCard Icon={FaGitAlt} name="Git" />
                            <TechStackCard Icon={SiJira} name="Jira" />
                            <TechStackCard Icon={SiNginx} name="Nginx" />
                            <TechStackCard Icon={SiScikitlearn} name="scikit-learn" />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
