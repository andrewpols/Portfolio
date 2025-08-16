import "../styles/about-me.css";

import reactIcon from "../img/techstack/React-icon.svg";
import nodeIcon from "../img/techstack/Node.js.svg";
import pythonIcon from "../img/techstack/python-icon.svg";
import djangoIcon from "../img/techstack/django-icon.svg";
import scikitIcon from "../img/techstack/scikit-icon.svg";
import javaIcon from "../img/techstack/java-icon.svg";
import nginxIcon from "../img/techstack/nginx-icon.svg";
import gitIcon from "../img/techstack/git-icon.svg";

import {EducationCard} from "./EducationCard.jsx";

function TechStackCard({icon, name}) {
    return (
        <div className="bg-black flex items-center justify-center m-0">
            <div
                className="w-34 h-30 sm:w-[25vw] sm:h-24 bg-gradient-to-br from-gray-800 via-slate-900 to-gray-950 rounded-sm shadow-2xl hover:shadow-blue-500/10 transition-all duration-500 cursor-pointer relative overflow-hidden group hover:scale-105 hover:border-blue-400/40">
                <div
                    className="min-w-max absolute inset-0 bg-gradient-to-br from-blue-900/10 via-transparent to-blue-800/5 opacity-80"></div>

                {/* Animated shine effect */}
                <div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-400/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] duration-0 transition-transform group-hover:duration-800 skew-x-12"></div>

                {/* Inner shadow for depth */}
                <div className="absolute inset-0 rounded-sm shadow-inner shadow-black/40"></div>

                {/* Content area */}
                <div className="min-w-maxrelative z-10 h-full flex items-center justify-center">
                    <div
                        className="w-full h-full bg-gradient-to-br from-blue-500/5 to-transparent rounded-sm border border-blue-400/10 flex items-center justify-center gap-2">
                        <img src={icon} alt={`${name}-icon`} className="sm:w-12 sm:h-12 w-16 h-16"/>
                        <p className="text-[1.5em] font-medium whitespace-nowrap hidden sm:block">{name}</p>
                    </div>
                </div>
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
                        <p id="about-me-desc" className="mt-5 mr-20">
                            I'm a second-year CS + Stats student at UofT passionate about developing purposeful
                            technologies for others. I am a well-rounded candidate with a 4.0/4.0 cGPA paired with
                            several robust projects that combine Data Science, Computer Science, and Software
                            Engineering fundamentals.
                        </p>
                    </div>

                    <div id="about-me-picture">
                        <EducationCard
                            institution="University of Toronto"
                            degree="Bachelor of Science"
                            field="Computer Science"
                            startDate="2024"
                            endDate="2028"
                            gpa="4.0/4.0"
                            location="Toronto, ON"
                            courses={[
                                {code: "CSC111", name: "Foundations of Computer Science"},
                                {code: "MAT137", name: "Calculus with Proofs"},
                                {code: "STA130", name: "Intro. to Data Science"},
                                {code: "MAT223", name: "Linear Algebra"},
                            ]}
                            achievements={[
                                "Dean's List for 2 consecutive semesters",
                                "University of Toronto Scholar: $10,000",

                            ]}
                        />
                    </div>
                </div>

                {/*<div id="about-me-cards-container">*/}

                {/*    <div className="about-me-card">*/}
                {/*        <h2>Education</h2>*/}
                {/*        <p>Lorem Ipsum...</p>*/}
                {/*    </div>*/}

                {/*    <div className="about-me-card">*/}
                {/*        <h2>Interests</h2>*/}
                {/*        <p>Lorem Ipsum...</p>*/}
                {/*    </div>*/}

                {/*    <div className="about-me-card">*/}
                {/*        <h2>Education</h2>*/}
                {/*        <p>Lorem Ipsum...</p>*/}
                {/*    </div>*/}

                {/*</div>*/}
            </div>


            <div id="tech-stack-section">
                <h1>Tech Stack</h1>


                <div id="tech-stack">
                    <TechStackCard icon={reactIcon} name="React"/>
                    <TechStackCard icon={pythonIcon} name="Python"/>
                    <TechStackCard icon={djangoIcon} name="Django"/>
                    <TechStackCard icon={scikitIcon} name="Scikit-learn"/>
                    <TechStackCard icon={javaIcon} name="Java"/>
                    <TechStackCard icon={nginxIcon} name="Nginx"/>
                    <TechStackCard icon={gitIcon} name="Git"/>
                </div>
            </div>
        </section>
    );
}
