import "../styles/home.css";
import myPortrait from "../img/greatball.png"
import {Link} from "react-router-dom";

import {gsap} from "gsap";
import {useGSAP} from "@gsap/react";
// import MotionPathPlugin from "gsap/MotionPathPlugin";
// import {MotionPathHelper} from "gsap/MotionPathHelper";

import ProjectsComponent from "./Projects.jsx";
import AboutMe from "./AboutMe.jsx";

import Contact from "./Contact.jsx";

import {scrollToElement} from "./utilities.js";

export default function Home() {

    gsap.registerPlugin(useGSAP);

    useGSAP(() => {

        gsap.to("#mouse-scroll-btn", {
            scrollTrigger: {
                trigger: "#mouse-scroll-btn",
                start: "top 20%",
                toggleActions: "play none none reverse"
            },
            opacity: 0,
        })

    }, []);

    return (
        <div id="home-component">
            <WelcomeComponent/>

            <ProjectsComponent/>

            <AboutMe/>


            <section id="contact-section">
                <Contact/>
            </section>
        </div>
    );
}


function WelcomeComponent() {
    return (
        <section id="welcome-section">
            <div id="welcome-container">
                <div id="info-container">

                    <div id="text-info">

                        <div id="intro-name-container">
                            <h3 id="intro-name">
                                Hey, I'm
                            </h3>
                            <hr/>
                        </div>


                        <h1 id="info-name">
                            Andrew Pols
                        </h1>

                        <h2 id="info-school">Computer Science + Statistics Student <br/> @ University of Toronto
                        </h2>
                    </div>


                    <div className="contact-buttons-container">
                        <button className="button-with-link" style={{display: "none"}}>
                            <Link to="/contact">Get in Touch</Link>
                        </button>

                        <button id="resume-btn" className="button-with-link" style={{display: "none"}}>
                            <Link to="/resume" target="_blank">Resume</Link>
                        </button>

                        <button id="projects-btn-scroll" onClick={() => scrollToElement("projects-section")}>
                            View My Projects
                        </button>
                    </div>

                </div>

                <div id="picture-container">
                    <img id="andrew-portrait" src={myPortrait} alt="andrew-pols-picture"/>

                    <div className="contact-buttons-container">
                        <button className="button-with-link">
                            <Link to="/contact">Get in Touch</Link>
                        </button>

                        <button id="resume-btn" className="button-with-link">
                            <Link to="/resume" target="_blank">Resume</Link>
                        </button>
                    </div>

                </div>
            </div>

            <button id="mouse-scroll-btn" onClick={() => scrollToElement("projects-section")}>
                <div className="mouse_scroll">
                    <div className="mouse">
                        <div className="wheel"></div>
                    </div>
                    <div>
                        <span className="m_scroll_arrows unu"></span>
                        <span className="m_scroll_arrows doi"></span>
                        <span className="m_scroll_arrows trei"></span>
                    </div>
                </div>
            </button>

        </section>
    );
}
