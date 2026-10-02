import "../styles/project.css";
import ProjectsComponent from "./Projects.jsx";
import Experiences from "./Experiences.jsx";

export default function Portfolio() {
    return (
        <div id="portfolio-page">
            <header className="portfolio-intro">
                <p className="portfolio-kicker">Selected work</p>
                <h1>Experience &amp; Projects</h1>
                <p>A selection of the teams I’ve supported and the products I’ve built along the way.</p>
            </header>
            <Experiences embedded />
            <ProjectsComponent embedded />
        </div>
    );
}
