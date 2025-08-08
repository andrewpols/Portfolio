import {Outlet, Link, useLocation} from "react-router-dom";

import "../styles/layout.css";

import {gsap} from "gsap";
import {useGSAP} from "@gsap/react";
import {ScrollTrigger} from "gsap/ScrollTrigger";


import {useEffect, useLayoutEffect} from "react";


import {RiMenu3Fill} from "react-icons/ri";
import {IoMdClose} from "react-icons/io";
import {HiExternalLink} from "react-icons/hi";


import githubIcon from "../img/github-mark.svg";
import linkedinIcon from "../img/iconmonstr-linkedin-3.svg";

import {scrollToElement} from "./utilities.js";


export default function Layout() {

    const location = useLocation();

    useLayoutEffect(() => {
        if (location.pathname === "/resume") {
            document.getElementById("header").style.visibility = "hidden";
            document.getElementById("footer").style.display = "none";
        } else {
            document.getElementById("header").style.visibility = "visible";
            document.getElementById("footer").style.display = ""; // "" reverts to CSS default
        }

        window.scrollTo({
            top: 0,
            left: 0,
            behavior: "instant"
        });
    }, [location.pathname]);

    gsap.registerPlugin(useGSAP, ScrollTrigger);


    useGSAP(() => {
        gsap
            .timeline(
                {
                    scrollTrigger: {
                        scrub: 1,
                        trigger: "#header-scroll-animation",
                        start: "top 55%",
                        end: "top: 30%"
                    }
                }
            )
            .to("#header", {
                width: "70%",
            })

    }, []);


    useEffect(() => {
        const updateDividerOnScroll = () => {
            if (window.scrollY > 40) {
                document.getElementById("header-divider").classList.add("shown")
            } else {
                document.getElementById("header-divider").classList.remove("shown")
            }
        }

        window.addEventListener("scroll", updateDividerOnScroll);

        return () => {
            window.removeEventListener("scroll", updateDividerOnScroll);
        }

    }, []);

    const handleMenuToggle = () => {
        const menu = document.getElementById("menu");

        menu.classList.toggle("shown")
    }


    return (
        <>
            <div id="Layout">
                <nav id="header">
                    <div id="big-screen-header">
                        <div className="header-icon" style={{marginLeft: "3em"}}>
                            <Link className="header-link" to="/" onClick={() => scrollToElement("welcome-section")}>
                                Home
                            </Link>
                        </div>

                        <ul id="big-screen-list">
                            <li>
                                <Link className="header-link lrg-external-react-link" to="/resume" target="_blank">
                                    Resume
                                    <HiExternalLink className="external-img"/>
                                </Link>
                            </li>

                            <li>
                                <Link className="header-link" to="/"
                                      onClick={() => {
                                          setTimeout(() => {
                                              scrollToElement("projects-section");
                                          }, 50)

                                      }
                                      }>Portfolio
                                </Link>
                            </li>

                            <li>
                                <Link className="header-link" to="/"
                                      onClick={() => {
                                          setTimeout(() => {
                                              scrollToElement("about-me-section");
                                          }, 50)
                                      }}>About Me
                                </Link>
                            </li>
                        </ul>

                        <div className="header-icon" style={{marginRight: "3em"}}>
                            <Link className="header-link" to="/contact">Contact</Link>
                        </div>
                    </div>

                    <div id="small-screen-header">
                        <h1 style={{fontSize: "2.5em"}}>Icon</h1>
                        <button className="icon-button" id="menu-btn" style={{zIndex: 0}} onClick={handleMenuToggle}>
                            <RiMenu3Fill/>
                        </button>

                        <div id="menu">
                            <button id="close-menu-btn" className="icon-button" onClick={handleMenuToggle}>
                                <IoMdClose/>
                            </button>
                            <ul id="menu-items">
                                <li>
                                    <Link to="/" onClick={() => {
                                        handleMenuToggle();
                                        scrollToElement("welcome-section");
                                    }}>Home</Link>
                                </li>


                                <li>
                                    <Link className="external-react-link" to="/resume" target="_blank" onClick={handleMenuToggle}>
                                        Resume
                                        <HiExternalLink className="external-img"/>
                                    </Link>
                                </li>

                                <li>
                                    <Link to="/"
                                          onClick={() => {
                                              setTimeout(() => {
                                                  handleMenuToggle();
                                                  scrollToElement("projects-section");
                                              }, 50)
                                          }}
                                    >
                                        Portfolio
                                    </Link>
                                </li>

                                <li>
                                    <Link to="/"
                                          onClick={() => {
                                              setTimeout(() => {
                                                  handleMenuToggle();
                                                  scrollToElement("about-me-section");

                                              }, 50)
                                          }}
                                    >
                                        About Me
                                    </Link>
                                </li>

                                <li>
                                    <Link to="/contact"
                                          onClick={handleMenuToggle}
                                    >Contact</Link>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <hr className="divider" id="header-divider" style={{margin: 0, visibility: "hidden"}}/>

                </nav>

                <div id="header-scroll-animation"></div>

                <div id="outlet">
                    <Outlet/>
                </div>

                <div id="footer">
                    <div id="copyright-text">
                        <p>&copy; 2025 Andrew Pols. All Rights Reserved.</p>
                    </div>

                    <div id="external-socials-container">
                        <a className="external-social-link" href="http://www.github.com/andrewpols" target="_blank">
                            <div className="external-social">
                                <img src={githubIcon} alt="github-icon"/>
                                <h3 className="external-social-text">GitHub</h3>
                            </div>
                        </a>

                        <a className="external-social-link" href="https://www.linkedin.com/in/andrewpols/"
                           target="_blank">
                            <div className="external-social">
                                <img src={linkedinIcon} alt="linkedin-icon"/>
                                <h3 className="external-social-text">LinkedIn</h3>
                            </div>
                        </a>

                    </div>

                </div>
            </div>
        </>
    );
}
