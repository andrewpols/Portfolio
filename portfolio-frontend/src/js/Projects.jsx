import {useRef} from "react";


import "../styles/work.css";
import { projects } from "./workData.js";
import { ArrowUpRight } from "./Icons.jsx";

function Project({project}) {
    const videoRef = useRef(null);
    const playPreview = () => {
        if (videoRef.current && !window.matchMedia("(hover: none)").matches) videoRef.current.play();
    };
    const resetPreview = () => {
        if (videoRef.current) {
            videoRef.current.pause();
            videoRef.current.currentTime = 0;
        }
    };

    return (
        <article className="project" id={project.id} tabIndex={-1}>
            <div className={`project-preview-container${project.previewVid ? " has-video" : ""}`} onMouseEnter={playPreview} onMouseLeave={resetPreview}>
                <img src={project.previewImg} alt={project.alt} className="project-preview-frame"/>
                {project.previewVid && <video ref={videoRef} src={project.previewVid} muted loop playsInline preload="none" poster={project.previewImg} aria-hidden="true" className="project-preview-video"/>}
            </div>
            <div className="project-info-container">
                <h3 className="project-name">{project.name}</h3>
                <p className="project-desc">{project.description}</p>
                <p className="project-stack">{project.stack}</p>
                <a href={project.link} target="_blank" rel="noreferrer" className="project-link">View on GitHub<ArrowUpRight /></a>
            </div>
        </article>
    );
}

export default function ProjectsComponent() {
    return (
        <section id="projects-section" className="section">
            <h2 className="section-label">Projects</h2>
            <div className="section-body" id="projects-container">
                {projects.map((project) => <Project key={project.name} project={project}/>)}
            </div>
        </section>
    );
}
