import "../styles/home.css";
import {Link} from "react-router-dom";

import AboutMe from "./AboutMe.jsx";

import {scrollToElement} from "./utilities.js";

export default function Home() {

    return (
        <div id="home-component">
            <WelcomeComponent/>
            <AboutMe/>
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

                        <div id="info-school-block">
                            <h2 id="info-school">Computer Science <br/> @ University of Toronto
                            </h2>

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

                </div>

            </div>

            <button id="mouse-scroll-btn" onClick={() => scrollToElement("about-me-section")}>
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
