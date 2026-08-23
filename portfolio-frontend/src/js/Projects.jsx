import {useRef} from "react";

import findMySoundPreview from "../img/findmysound-preview.mov";
import findMySoundPreviewFrame from "../img/findmysound-preview-frame.png";
import scholarSearchPreview from "../img/scholarsearch-preview.mov";
import scholarSearchPreviewFrame from "../img/scholarsearch-preview-frame.png";
import groupFlowPreviewFrame from "../img/group-flow-dashboard.png";
import sudokuCVPreviewFrame from "../img/cropped-sudokuCVPreviewFrame.png";
import cscsStats from "../img/wfh_to_burnout_stats.png";
import githubIcon from "../img/github-mark.svg";

import "../styles/project.css";

const projects = [
    {name: "FindMySound Web App", description: "A music discovery tool that connects to Spotify accounts to recommend new tracks. I designed the responsive UI and built animated visualizations with GSAP.", stack: "React · JavaScript · Spotify Web API · GSAP", previewImg: findMySoundPreviewFrame, previewVid: findMySoundPreview, link: "https://github.com/andrewpols/FindMySound"},
    {name: "ScholarSearch Web App", description: "A graph-based academic-paper search engine that visualizes citation networks with D3.js. I contributed to data collection, graph construction, request caching, and responsive results views.", stack: "React · TypeScript · D3.js · Node.js · Academic APIs", previewImg: scholarSearchPreviewFrame, previewVid: scholarSearchPreview, link: "https://github.com/GaminRick7/ScholarSearch"},
    {name: "GroupFlow Java App", description: "A group management app for students to organize meetings, tasks, and schedules. I built features for group creation, member invitations, and task management.", stack: "Java · MongoDB · Swing", previewImg: groupFlowPreviewFrame, previewVid: "", link: "https://github.com/ingrid534/GroupFlow"},
];

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
        <article className="project">
            <div className={`project-preview-container${project.previewVid ? " has-video" : ""}`} onMouseEnter={playPreview} onMouseLeave={resetPreview}>
                <img src={project.previewImg} alt={`${project.name} preview`} className="project-preview-frame"/>
                {project.previewVid && <video ref={videoRef} src={project.previewVid} muted loop playsInline className="project-preview-video"/>}
            </div>
            <div className="project-info-container">
                <div className="project-heading-row">
                    <h2 className="project-name">{project.name}</h2>
                    <a href={project.link} target="_blank" rel="noreferrer" className="project-github" aria-label={`View ${project.name} on GitHub`}><img src={githubIcon} alt=""/></a>
                </div>
                {project.previewVid && <p className="project-hover-text">Hover for a preview.</p>}
                <p className="project-desc">{project.description}</p>
                <p className="project-stack"><span>Stack</span>{project.stack}</p>
            </div>
        </article>
    );
}

export default function ProjectsComponent({embedded = false}) {
    return (
        <section id="projects-section">
            {embedded ? (
                <div className="portfolio-section-heading">
                    <p>02 / Projects</p>
                    <h2>Projects</h2>
                </div>
            ) : (
                <div className="projects-heading">
                    <p className="projects-kicker">Selected work</p>
                    <h1 id="projects-container-title">Projects</h1>
                    <h3>Hover over a project for a preview.</h3>
                </div>
            )}
            <div id="projects-container">{projects.map((project) => <Project key={project.name} project={project}/>)}</div>
        </section>
    );
}
