import findMySoundPreview from "../img/findmysound-preview.mp4";
import findMySoundPreviewFrame from "../img/findmysound-preview-frame.png";
import scholarSearchPreview from "../img/scholarsearch-preview.mp4";
import scholarSearchPreviewFrame from "../img/scholarsearch-preview-frame.png";
import groupFlowPreviewFrame from "../img/group-flow-dashboard.png";

export const projects = [
    {id: "findmysound", name: "FindMySound Web App", description: "A music discovery tool that connects to Spotify accounts to recommend new tracks. I designed the responsive UI and built animated visualizations with GSAP.", stack: "React · JavaScript · Spotify Web API · GSAP", previewImg: findMySoundPreviewFrame, previewVid: findMySoundPreview, link: "https://github.com/andrewpols/FindMySound", alt: "FindMySound landing screen: 'your music taste, your songs, our curated recommendations' over a dark green background"},
    {id: "scholarsearch", name: "ScholarSearch Web App", description: "A graph-based academic-paper search engine that visualizes citation networks with D3.js. I contributed to data collection, graph construction, request caching, and responsive results views.", stack: "React · TypeScript · D3.js · Node.js · Academic APIs", previewImg: scholarSearchPreviewFrame, previewVid: scholarSearchPreview, link: "https://github.com/GaminRick7/ScholarSearch", alt: "ScholarSearch citation graph of linked academic papers drawn as orange and blue nodes"},
    {id: "groupflow", name: "GroupFlow Java App", description: "A group management app for students to organize meetings, tasks, and schedules. I built features for group creation, member invitations, and task management.", stack: "Java · MongoDB · Swing", previewImg: groupFlowPreviewFrame, previewVid: "", link: "https://github.com/ingrid534/GroupFlow", alt: "GroupFlow dashboard with People, Meetings, Tasks and Schedules tiles"},
];

export const experiences = [
    {
        id: "ibm",
        company: "IBM",
        role: "Software Developer Intern",
        period: "May 2026 - May 2027",
        location: "Toronto, ON",
        summary:
            "Developing tools that help clients navigate their data and models on IBM Planning Analytics Workspace.",
        highlights: [
            "Built an interactive dependency graph for exploring relationships between Planning Analytics objects.",
            "Worked with TM1 APIs to collect and process dependency data and turn it into a visual graph.",
            "Collaborated with engineers, designers, and product management to develop and refine the feature through the development process.",
        ],
    }
];
