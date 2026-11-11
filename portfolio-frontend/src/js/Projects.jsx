import { Fragment } from "react";
import "../styles/work.css";
import { projects } from "./workData.js";
import { ArrowUpRight, PlayBadge } from "./Icons.jsx";
import usePreview from "./usePreview.js";

// The tech stack: each item is its own unbreakable span, so a wrap never splits a name.
function Stack({ stack }) {
    return (
        <p className="stack project-stack">
            {stack.split(" · ").map((item, i) => <Fragment key={item}>{i > 0 && " "}<span>{item}</span></Fragment>)}
        </p>
    );
}

function ProjectName({ project }) {
    return (
        <h3 className="project-name">
            <a href={project.link} target="_blank" rel="noreferrer" aria-label={`${project.name}, on GitHub`}>{project.name}<ArrowUpRight /></a>
        </h3>
    );
}

// The two lead projects: a preview over its text, side by side.
function Featured({ project }) {
    const { ref, shown, hover } = usePreview();

    return (
        <article className="project-feature" id={project.id} tabIndex={-1} {...hover}>
            <div className={`preview${project.previewVid ? " has-video" : ""}${shown ? " is-playing" : ""}`}>
                <img src={project.previewImg} alt={project.alt} className="preview-frame" loading="lazy" decoding="async"/>
                {project.previewVid && <video ref={ref} src={project.previewVid} muted loop playsInline preload="none" poster={project.previewImg} aria-hidden="true" className="preview-video"/>}
                {project.previewVid && <PlayBadge />}
            </div>
            <ProjectName project={project}/>
            <p className="project-desc">{project.description}</p>
            <Stack stack={project.stack}/>
        </article>
    );
}

// The rest: a one-line mention each, name and stack.
function Row({ project }) {
    return (
        <li>
            <article className="project-row" id={project.id} tabIndex={-1}>
                <ProjectName project={project}/>
                <Stack stack={project.stack}/>
                <p className="project-desc project-blurb">{project.blurb}</p>
            </article>
        </li>
    );
}

export default function ProjectsComponent() {
    const featured = projects.filter((p) => p.featured);
    const rest = projects.filter((p) => !p.featured);

    return (
        <section id="projects-section" className="page block">
            <h2 className="block-title">Projects</h2>
            <div className="block-body" id="projects-container">
                <div className="project-featured">
                    {featured.map((project) => <Featured key={project.id} project={project}/>)}
                </div>
                <ul className="project-index">
                    {rest.map((project) => <Row key={project.id} project={project}/>)}
                </ul>
            </div>
        </section>
    );
}
