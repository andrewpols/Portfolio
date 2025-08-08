import findMySoundPreview from "../img/findmysound-preview.mov";
import findMySoundPreviewFrame from "../img/findmysound-preview-frame.png";

import scholarSearchPreview from "../img/scholarsearch-preview.mov";
import scholarSearchPreviewFrame from "../img/scholarsearch-preview-frame.png";

import sudokuCVPreviewFrame from "../img/cropped-sudokuCVPreviewFrame.png";

import cscsStats from "../img/wfh_to_burnout_stats.png";

import {IoMdClose} from "react-icons/io";
import {GrPrevious} from "react-icons/gr";
import {GrNext} from "react-icons/gr";

import "../styles/project.css";
import "../styles/carousel.css"

import {useEffect} from "react";
import {useLocation} from "react-router-dom";

function removeWhiteSpace(s) {
    return s.replace(/\s+/g, '');
}

function Modal({projectName, toggleProjectModal, projectDescription}) {
    return (
        <div id={`${removeWhiteSpace(projectName)}-modal`} className="modal-container">
            <div style={{
                display: "flex",
                flexDirection: "column",
                gap: 0,
                alignItems: "start",
                position: "relative"
            }} className="project-info-container-modal">

                <button className="icon-button modal-close-btn" onClick={toggleProjectModal}>
                    <IoMdClose/>
                </button>

                <h2 style={{marginBottom: 0}} className="project-name">{projectName}</h2>
                <h3 className="project-desc-modal" style={{
                    fontWeight: 400,
                    fontSize: "1.1em",
                    marginTop: "0.5em",
                    textAlign: "left",
                    whiteSpace: "pre-line",
                }}>{projectDescription}</h3>

            </div>
        </div>
    )
}

export default function ProjectsComponent() {

    const Project = ({projectName, projectDescription, projectPreviewImg, projectPreviewVid}) => {

        const projectNameTrimmed = removeWhiteSpace(projectName);

        const toggleProjectModal = () => {
            const modal = document.getElementById(`${projectNameTrimmed}-modal`);


            if (window.innerWidth < 1000)
                modal.classList.toggle("open");
        }

        const projectDetails =
            <div style={{
                display: "flex",
                flexDirection: "column",
                gap: 0,
                alignItems: "start",
                marginRight: "4em"
            }} className="project-info-container">
                <h2 style={{marginBottom: 0}} className="project-name">{projectName}</h2>
                <h3 className="project-desc">{projectDescription}</h3>

            </div>


        return (
            <>
                <button className="project-info-btn" onClick={toggleProjectModal}>
                    <div className="project" id={projectName}>

                        <div className="project-preview-container">
                            <img id={`${projectNameTrimmed}-preview-frame`} src={projectPreviewImg}
                                 width="100%"
                                 alt="find-my-sound-preview"
                                 className="project-preview-frame"
                            />
                            {projectPreviewVid && <video src={projectPreviewVid} muted loop width="100%"
                                                         id={`${projectNameTrimmed}-preview`}></video>}
                        </div>

                        {projectDetails}
                    </div>
                </button>
            </>
        );
    }


    const projects = [
        {
            name: "FindMySound Web App",
            description: `FindMySound is a music discovery tool that connects to users’ Spotify accounts to recommend new tracks. On the frontend, I designed responsive UI/UX, and implemented animated visualizations with GSAP.

This project sharpened my ability to manage user bases with authentication, integrate third-party APIs, manage real-time data, and create engaging, user-focused web experiences.`,
            previewImg: findMySoundPreviewFrame,
            previewVid: findMySoundPreview
        },
        {
            name: "ScholarSearch Web App",
            description: `ScholarSearch is a graph-based search engine for academic papers that visualizes citation networks using D3.js. Users can explore research topics through an interactive web interface, where highly cited papers are emphasized within the graph.

I contributed toward the app’s backend through the collection of API-accessible data, the construction of each query graph, and optimizing query requests from the user through caching. I also configured the frontend to better display results across screen sizes.`,
            previewImg: scholarSearchPreviewFrame,
            previewVid: scholarSearchPreview
        },
        {
            name: "Canadian Social Connection Survey",
            description: `A statistical analysis project exploring social well-being and work habits in Canada. I performed multiple linear regression and bootstrapping using Statsmodels to uncover significant patterns in self-reported survey data.

Key finding: individuals working from home reported a higher sense of accomplishment relative to burnout. I visualized results using histograms and KDE plots with Matplotlib to clearly communicate insights.`,
            previewImg: cscsStats,
            previewVid: ""
        },
        {
            name: "Computer Vision Sudoku",
            description: `A computer vision app that detects, solves, and overlays solutions on images or live video of Sudoku puzzles. I used OpenCV techniques like Hough Line Transforms to detect grid lines and isolate digits, then applied image processing to map and solve the board in real time.`,
            previewImg: sudokuCVPreviewFrame,
            previewVid: ""
        }
    ];

    const location = useLocation();

    useEffect(() => {
        let carousel;
        // Prevents multiple carousel instances
        if ((!window.carouselInstances || window.carouselInstances.length === 0)) {
            const projectContainer = document.getElementById("projects-container");
            carousel = new Carousel(projectContainer);
            window.carouselInstances.push(carousel);
        }

        projects.forEach((proj) => {
            const projectPreviewVideo = document.getElementById(`${removeWhiteSpace(proj.name)}-preview`);
            const projectPreviewFrame = document.getElementById(`${removeWhiteSpace(proj.name)}-preview-frame`);
            const projectContainer = document.getElementById(proj.name);

            // for both mobile and desktop
            if (projectPreviewVideo) {
                // initial thumbnail-style; image visible until user hovers over it:::image => display:none, video => display:block; reverse on mouseleave
                projectPreviewVideo.style.display = "none";
            }


            // Only proceed if user is NOT on a touchscreen device (don't want to trigger mobile to play the video as its buggy)
            if (!('ontouchstart' in window) && projectPreviewVideo) {

                projectContainer.addEventListener(("mouseover"), () => {
                    projectPreviewFrame.style.display = "none";
                    projectPreviewVideo.play();
                    projectPreviewVideo.style.display = "block";
                })

                projectContainer.addEventListener(("mouseleave"), () => {
                    projectPreviewVideo.pause();
                    projectPreviewVideo.style.display = "none";
                    projectPreviewFrame.style.display = "block";
                    projectPreviewVideo.currentTime = 0;
                })
            }

            return () => {
                projectContainer.removeEventListener(("mouseenter"), () => {
                    projectPreviewVideo.play();
                });

                projectContainer.removeEventListener(("mouseleave"), () => {
                    projectPreviewVideo.pause();
                });


            }
        });

        return () => {
            if (carousel) {
                carousel.destroy();
            }
            window.carouselInstances = [];
        }
    }, [projects, location.pathname]);


    return (
        <section id="projects-section">
            <h1 id="projects-container-title">Projects</h1>

            <div id="projects-container">

                <div className="carousel-wrapper">
                    <div className="carousel-track">
                        {/*<div className="carousel-item">1</div>*/}
                        {/*<div className="carousel-item">2</div>*/}
                        {/*<div className="carousel-item">3</div>*/}
                        {/*<div className="carousel-item">4</div>*/}
                        {/*<div className="carousel-item">5</div>*/}

                        {
                            projects.map((proj, i) => (
                                <div className="carousel-item" key={i}>
                                    <Project
                                        projectName={proj.name}
                                        projectDescription={proj.description}
                                        projectPreviewImg={proj.previewImg}
                                        projectPreviewVid={proj.previewVid}
                                    />
                                </div>
                            ))
                        }

                    </div>
                    <div className="carousel-btns">
                        <button className="carousel-prev-btn"><GrPrevious/></button>
                        <button className="carousel-next-btn"><GrNext/></button>
                    </div>
                </div>
            </div>

            {
                projects.map((proj, i) => (
                    <Modal key={i}
                           projectName={proj.name}
                           projectDescription={proj.description}
                           toggleProjectModal={() => {
                               const modal = document.getElementById(`${removeWhiteSpace(proj.name)}-modal`);


                               if (window.innerWidth < 1000)
                                   modal.classList.toggle("open");
                           }}
                    />
                ))
            }

        </section>
    );
}


class Carousel {
    el = null;
    carouselTrack = null;
    size = 1; // how many items to show at a time in the carousel (maximum items.length - 1)
    items = [];
    currentIndex = 1;
    isMoving = false;

    handlePrev = null;
    handleNext = null;

    // Layout:
    // [E*, A, B, C, D, E, A*]

    // Explanation:
    // E* and A* are clones of the last and first nodes respectively; once we reach either clone, we transform
    // without animation to the opposite end, thus simulating continuity.

    // e.g. A -> E* triggers an immediate switch to E, where we can then move again, either to D or to A*.


    constructor(el) {
        this.el = el;
        this.carouselTrack = el.querySelector(".carousel-track");

        window.carouselInstances = window.carouselInstances || [];

        this.init()
    }

    async init() {
        await this.build();

        await this.getSize();
        await this.adjustResize();


        // ensure in starting position.
        this.carouselTrack.style.transform = "translateX(-100vw)";

        const prevBtn = this.el.querySelector(".carousel-prev-btn");
        const nextBtn = this.el.querySelector(".carousel-next-btn");

        this.handlePrev = () => this.prev();
        this.handleNext = () => this.next();

        prevBtn.addEventListener("click", this.handlePrev);
        nextBtn.addEventListener("click", this.handleNext);
    }

    async destroy() {
        const prevBtn = this.el.querySelector(".carousel-prev-btn");
        const nextBtn = this.el.querySelector(".carousel-next-btn");
        prevBtn.removeEventListener("click", this.handlePrev);
        nextBtn.removeEventListener("click", this.handleNext);

        // 2. Null out stored event handler references
        this.handlePrev = null;
        this.handleNext = null;

        // 3. Clear carousel-specific styles or inline transforms if needed
        if (this.innerCarousel) {
            this.innerCarousel.style.transform = "";
            this.innerCarousel.style.transition = "";
        }

        // 4. Null internal references to allow garbage collection
        this.items = null;
        this.innerCarousel = null;
        this.el = null;
    }

    async getSize() {
        const numItems = this.items.length;

        this.carouselTrack.style.width = numItems * 100 + "vw";
    }

    async adjustResize() {
        window.addEventListener("resize", () => {

            // this will get reset to the animated transition on cycle() anyway;
            // prevents uneeded animations when resizing so transform can just snap in position without delay
            this.carouselTrack.style.transition = "none";

            this.carouselTrack.style.transform = `translateX(${-this.currentIndex * 100}vw)`
        })
    }

    async build() {
        this.items = this.carouselTrack.getElementsByClassName("carousel-item");

        const hasClones = Array.from(this.items).some(item => item.dataset.clone === "true");
        if (hasClones) return;

        const lastItemClone = this.items[this.items.length - 1].cloneNode(true);
        const firstItemClone = this.items[0].cloneNode(true);

        lastItemClone.dataset.clone = "true";
        firstItemClone.dataset.clone = "true";

        this.carouselTrack.prepend(lastItemClone);
        this.carouselTrack.append(firstItemClone);

        this.items = this.carouselTrack.getElementsByClassName("carousel-item");
    }

    async cycle(direction = "next") {

        if (this.isMoving) return;

        this.isMoving = true;

        if (this.carouselTrack.style.transition === "none") {
            this.carouselTrack.style.transition = ""; // resets transition to default CSS
        }

        if (direction === "next") {
            this.currentIndex++;
            this.carouselTrack.style.transform = `translateX(${-this.currentIndex * 100}vw)`

            if (this.currentIndex === this.items.length - 1) {
                setTimeout(() => {
                    this.currentIndex = 1;
                    this.carouselTrack.style.transition = "none";
                    this.carouselTrack.style.transform = "translateX(-100vw)";
                }, 800)
            }

        } else if (direction === "prev") {
            this.currentIndex--;
            this.carouselTrack.style.transform = `translateX(${-this.currentIndex * 100}vw)`;

            if (this.currentIndex === 0) {
                setTimeout(() => {
                    this.currentIndex = this.items.length - 2;
                    this.carouselTrack.style.transition = "none";
                    this.carouselTrack.style.transform = `translateX(-${(this.items.length - 2) * 100}vw)`;
                }, 800)
            }

        }

        const handleSlideTransition = () => {
            this.isMoving = false;
        }

        this.carouselTrack.addEventListener("transitionend", handleSlideTransition, {once: true})

        // Fallback timeout in case transitionend doesn't fire (especially on last slide since we snap without transition)
        setTimeout(() => {
            if (this.isMoving) {
                this.isMoving = false;
                this.carouselTrack.removeEventListener("transitionend", handleSlideTransition);
            }
        }, 800);

    }

    async next() {
        this.cycle("next");
    }

    async prev() {
        this.cycle("prev");
    }

}
