import "../styles/home.css";
import { Link } from "react-router-dom";

import Experiences from "./Experiences.jsx";
import ProjectsComponent from "./Projects.jsx";
import Education from "./Education.jsx";
import AboutMe from "./AboutMe.jsx";
import { ArrowUpRight } from "./Icons.jsx";

export default function Home() {
    return (
        <div id="home-component">
            <section id="welcome-section" className="page intro">
                <h1>Andrew Pols</h1>
                <p className="intro-line">
                    Software developer intern at IBM.
                    <br />
                    Computer Science at the University of Toronto.
                </p>
                <p className="links-row">
                    <Link to="/resume" target="_blank" className="text-link links-primary">Resume<ArrowUpRight /></Link>
                    <a href="https://github.com/andrewpols" target="_blank" rel="noreferrer" className="text-link">GitHub<ArrowUpRight /></a>
                    <a href="https://www.linkedin.com/in/andrewpols/" target="_blank" rel="noreferrer" className="text-link">LinkedIn<ArrowUpRight /></a>
                    <a href="mailto:andrew.pols@mail.utoronto.ca" className="text-link">Email</a>
                </p>
            </section>

            <Experiences />
            <Education />
            <ProjectsComponent />
            <AboutMe />
        </div>
    );
}
