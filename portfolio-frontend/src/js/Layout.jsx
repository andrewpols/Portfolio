import { NavLink, Outlet, useLocation } from "react-router-dom";

import "../styles/layout.css";

import { useLayoutEffect } from "react";


import { IoMdClose } from "react-icons/io";
import { RiMenu3Fill } from "react-icons/ri";


import githubIcon from "../img/github-mark.svg";
import linkedinIcon from "../img/iconmonstr-linkedin-3.svg";
import blueIcon from "/favicon_io/apple-touch-icon.png";

import { scrollToElement } from "./utilities.js";


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



    const handleMenuToggle = () => {
        const menu = document.getElementById("menu");

        menu.classList.toggle("shown")
    }


    return (
        <>
            <div id="Layout">
                <nav id="header">
                    <div id="big-screen-header">
                        <div id="brand-wrapper">
                            <NavLink id="desktop-brand-link" to="/" className={({isActive}) => isActive ? "active" : ""} onClick={() => scrollToElement("welcome-section")}>
                                <img id="desktop-brand-icon" src={blueIcon} alt="brand"/>
                            </NavLink>
                        </div>
                        
                        <div id="middle-cluster">
                            <ul id="big-screen-list">
                                <li>
                                    <NavLink className={({isActive}) => "header-link" + (isActive ? " active" : "")} to="/">
                                        Home
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink className={({isActive}) => "header-link" + (isActive ? " active" : "")} to="/portfolio">
                                        Experience
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink className={({isActive}) => "header-link header-external" + (isActive ? " active" : "")} to="/resume" target="_blank">
                                        Resume
                                    </NavLink>
                                </li>
                            </ul>
                        </div>

                        <div id="resume-wrapper">
                            <NavLink className={({isActive}) => "header-link" + (isActive ? " active" : "")} to="/contact">
                                Contact
                            </NavLink>
                        </div>
                    </div>

                    <div id="small-screen-header">
                        <NavLink id="mobile-brand-link" to="/" onClick={() => scrollToElement("welcome-section")} aria-label="Home">
                            <img id="brand-icon" src={blueIcon} alt="brand"/>
                        </NavLink>
                        <button className="icon-button" id="menu-btn" onClick={handleMenuToggle}>
                            <RiMenu3Fill/>
                        </button>

                        <div id="menu">
                            <button id="close-menu-btn" className="icon-button" onClick={handleMenuToggle}>
                                <IoMdClose/>
                            </button>
                            <ul id="menu-items">
                                <li><NavLink to="/" onClick={handleMenuToggle} className={({isActive}) => isActive ? "active" : ""}>Home</NavLink></li>
                                <li><NavLink to="/portfolio" onClick={handleMenuToggle} className={({isActive}) => isActive ? "active" : ""}>Experience</NavLink></li>
                                <li><NavLink to="/contact" onClick={handleMenuToggle} className={({isActive}) => isActive ? "active" : ""}>Contact</NavLink></li>
                                <li><NavLink to="/resume" target="_blank" onClick={handleMenuToggle} className={({isActive}) => isActive ? "active" : ""}>Resume</NavLink></li>
                            </ul>
                        </div>
                    </div>

                </nav>

                <div id="outlet">
                    <Outlet/>
                </div>

                <div id="footer">
                    <div id="copyright-text">
                        <p>&copy; 2026 Andrew Pols. All Rights Reserved.</p>
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
