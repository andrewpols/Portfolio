import "../styles/work.css";
import ProjectsComponent from "./Projects.jsx";
import Experiences from "./Experiences.jsx";
import { ArrowDown } from "./Icons.jsx";
import { projects, experiences } from "./workData.js";

// Hash links scroll the page but leave keyboard focus on the index; move it to the target too. Focusing
// while the smooth scroll is still running can cancel or jump it (iOS Safari), so wait for it to finish.
function focusTarget(e) {
    const link = e.target.closest("a[href^='#']");
    const target = link && document.getElementById(link.hash.slice(1));
    if (!target) return;
    let done = false;
    const focus = () => {
        if (done) return;
        done = true;
        document.removeEventListener("scrollend", focus, true);
        clearTimeout(timer);
        target.focus({ preventScroll: true });
    };
    // scrollend isn't everywhere yet, and doesn't fire if the page is already at the target.
    const timer = setTimeout(focus, 900);
    document.addEventListener("scrollend", focus, true);
}

export default function Portfolio() {
    return (
        <div id="portfolio-page">
            <header className="work-index section">
                <h1 className="section-label">Work</h1>
                <nav className="section-body" aria-labelledby="index-label" onClick={focusTarget}>
                    <p className="index-label" id="index-label">On this page</p>
                    <ul className="index-list">
                        {experiences.map((e) => (
                            <li key={e.id}>
                                <a href={`#experience-${e.id}`}>
                                    <span className="index-name">{e.company}, {e.role}</span>
                                    <span className="index-meta">{e.period}</span>
                                    <ArrowDown />
                                </a>
                            </li>
                        ))}
                        {projects.map((p) => (
                            <li key={p.id}>
                                <a href={`#${p.id}`}>
                                    <span className="index-name">{p.name}</span>
                                    <span className="index-meta">{p.stack}</span>
                                    <ArrowDown />
                                </a>
                            </li>
                        ))}
                    </ul>
                </nav>
            </header>
            <Experiences />
            <ProjectsComponent />
        </div>
    );
}
