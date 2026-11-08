import "../styles/home.css";
import { Link } from "react-router-dom";

import AboutMe from "./AboutMe.jsx";
import { ArrowUpRight } from "./Icons.jsx";

export default function Home() {
    return (
        <div id="home-component">
            <section id="welcome-section">
                <h1 className="hero-name">Andrew Pols</h1>
                <p className="hero-role">
                    Third-year Computer Science student at the University of Toronto. Currently a software developer intern at IBM on the Planning Analytics team.
                </p>
                <div className="hero-actions">
                    <Link to="/work" className="btn btn-primary">View my work</Link>
                    <Link to="/resume" target="_blank" className="btn">Resume<ArrowUpRight /></Link>
                </div>
            </section>

            <AboutMe />
        </div>
    );
}
