import findMySoundPreview from "../img/findmysound-preview.mp4";
import findMySoundPreviewFrame from "../img/findmysound-preview-frame.webp";
import scholarSearchPreview from "../img/scholarsearch-preview.mp4";
import scholarSearchPreviewFrame from "../img/scholarsearch-preview-frame.webp";
import groupFlowPreviewFrame from "../img/group-flow-dashboard.webp";
import sudokuCVPreview from "../img/sudokucv-preview-small.mp4";
import sudokuCVPreviewFrame from "../img/cropped-sudokuCVPreviewFrame.webp";
import pokemonBattlePreview from "../img/PokemonDemo.mp4";
import dependencyGraphPreview from "../img/dependency-graph-preview.mp4";
import dependencyGraphPreviewFrame from "../img/dependency-graph-preview-frame.webp";
import ibmMark from "../img/ibm-logo.svg";
import pokemonBattlePreviewFrame from "../img/PokemonDemoFrame.webp";

export const projects = [
    {id: "findmysound", featured: true, name: "FindMySound Web App", description: "A music discovery tool that connects to Spotify accounts to recommend new tracks. I designed the responsive UI and built animated visualizations with GSAP.", stack: "Python · Django · React · scikit-learn", previewImg: findMySoundPreviewFrame, previewVid: findMySoundPreview, link: "https://github.com/andrewpols/FindMySound", alt: "FindMySound landing screen: 'your music taste, your songs, our curated recommendations' over a dark green background"},
    {id: "scholarsearch", featured: true, name: "ScholarSearch Web App", description: "A graph-based academic-paper search engine that visualizes citation networks with D3.js. I contributed to data collection, graph construction, request caching, and responsive results views.", stack: "Python · FastAPI · PostgreSQL · React · TypeScript", previewImg: scholarSearchPreviewFrame, previewVid: scholarSearchPreview, link: "https://github.com/GaminRick7/ScholarSearch", alt: "ScholarSearch citation graph of linked academic papers drawn as orange and blue nodes"},
    {id: "pokemon-battle-server", blurb: "Multiplayer, turn-based battles in C. Players are matched into lobbies over TCP sockets, and several battles run at once.", name: "Pokémon Battle Server", description: "A multiplayer, turn-based Pokémon battle server and client written in C. It matches players into lobbies over TCP sockets and runs several battles at once.", stack: "C · TCP Sockets · ncurses · UNIX", previewImg: pokemonBattlePreviewFrame, previewVid: pokemonBattlePreview, link: "https://github.com/andrewpols/pokemon-battle-server", alt: "Two terminal windows side by side showing the Pokémon Battle Server: both players' parties, their available moves, and one player waiting for the other to choose"},
    {id: "sudokucv", blurb: "Detects and solves Sudoku puzzles from images or live video, then overlays the solution. OpenCV finds the grid; Tesseract reads the digits.", name: "SudokuCV Java App", description: "A computer vision app that detects, solves, and overlays solutions on images or live video of Sudoku puzzles. I used OpenCV and Hough line transforms to find the grid and isolate each cell, then Tesseract OCR to read the digits.", stack: "Java · OpenCV · Tesseract OCR", previewImg: sudokuCVPreviewFrame, previewVid: sudokuCVPreview, link: "https://github.com/andrewpols/sudokucv", alt: "SudokuCV recognizing a Sudoku puzzle from a camera image"},
    {id: "groupflow", blurb: "A desktop app for student groups to organize meetings, tasks and schedules. I built group creation, invitations and task management.", name: "GroupFlow Java App", description: "A group management app for students to organize meetings, tasks, and schedules. I built features for group creation, member invitations, and task management.", stack: "Java · MongoDB · Swing", previewImg: groupFlowPreviewFrame, previewVid: "", link: "https://github.com/ingrid534/GroupFlow", alt: "GroupFlow dashboard with People, Meetings, Tasks and Schedules tiles"},
];

export const experiences = [
    {
        id: "ibm",
        company: "IBM",
        mark: ibmMark,
        role: "Software Developer Intern",
        period: "May 2026 – May 2027",
        location: "Markham, ON",
        summary:
            "Developing tools that help clients navigate their data and models on IBM Planning Analytics Workspace.",
        highlights: [
            "Built an interactive dependency graph for exploring relationships between Planning Analytics objects.",
            "Worked with TM1 APIs to collect and process dependency data and turn it into a visual graph.",
            "Collaborated with engineers, designers, and product management to develop and refine the feature through the development process.",
        ],
        link: "https://community.ibm.com/community/user/blogs/svetlana-pestsova/2026/10/21/see-how-your-model-fits-together-dependency-graph-now-available-for-modelers-in-planning-analytics-workbench",
        linkLabel: "Dependency graph blog post",
        previewImg: dependencyGraphPreviewFrame,
        previewVid: dependencyGraphPreview,
        previewAlt: "The Planning Analytics dependency graph for a cube, showing the dimensions, processes and cubes it connects to as boxes joined by lines",
        demoLink: "https://www.youtube.com/watch?v=q5qL6vr0j5c&t=9s",
        demoLabel: "Video walkthrough",
    }
];
