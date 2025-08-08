import "../styles/about-me.css";

import reactIcon from "../img/techstack/React-icon.svg";
import nodeIcon from "../img/techstack/Node.js.svg";
import pythonIcon from "../img/techstack/python-icon.svg";
import djangoIcon from "../img/techstack/django-icon.svg";
import scikitIcon from "../img/techstack/scikit-icon.svg";
import javaIcon from "../img/techstack/java-icon.svg";
import nginxIcon from "../img/techstack/nginx-icon.svg";
import gitIcon from "../img/techstack/git-icon.svg";

export default function AboutMe() {
    return (
        <section id="about-me-section">
            <div id="about-me-container">
                <div id="about-me-intro">
                    <div id="about-me-text">
                        <h1 id="about-me-title">About Me</h1>
                        <p id="about-me-desc">
                            I'm a second-year CS + Stats student at UofT passionate about developing purposeful
                            technologies for others. I am a well-rounded candidate with a 4.0/4.0 cGPA paired with
                            several robust projects that combine Data Science, Computer Science, and Software
                            Engineering fundamentals.
                        </p>
                    </div>

                    <div id="about-me-picture">
                        <h1>Icon</h1>
                    </div>
                </div>

                {/*<div id="about-me-cards-container">*/}

                {/*    <div className="about-me-card">*/}
                {/*        <h2>Education</h2>*/}
                {/*        <p>Lorem Ipsum...</p>*/}
                {/*    </div>*/}

                {/*    <div className="about-me-card">*/}
                {/*        <h2>Interests</h2>*/}
                {/*        <p>Lorem Ipsum...</p>*/}
                {/*    </div>*/}

                {/*    <div className="about-me-card">*/}
                {/*        <h2>Education</h2>*/}
                {/*        <p>Lorem Ipsum...</p>*/}
                {/*    </div>*/}

                {/*</div>*/}
            </div>


            <div id="tech-stack-section">
                <h1>Tech Stack</h1>


                <div id="tech-stack">
                    <div className="language-div">
                        <img src={reactIcon} alt={"react-icon"}/>
                        <h2>React</h2>
                    </div>

                    <div className="language-div">
                        <img src={nodeIcon} alt={"react-icon"}/>
                        <h2>Node.js</h2>
                    </div>

                    <div className="language-div">
                        <img src={pythonIcon} alt={"react-icon"}/>
                        <h2>Python</h2>
                    </div>

                    <div className="language-div">
                        <img src={djangoIcon} alt={"react-icon"}/>
                        <h2>Django</h2>
                    </div>

                    <div className="language-div">
                        <img src={scikitIcon} alt={"react-icon"}/>
                        <h2>Scikit-learn</h2>
                    </div>

                    <div className="language-div">
                        <img src={javaIcon} alt={"react-icon"}/>
                        <h2>Java</h2>
                    </div>

                    <div className="language-div">
                        <img src={nginxIcon} alt={"react-icon"}/>
                        <h2>Nginx</h2>
                    </div>

                    <div className="language-div">
                        <img src={gitIcon} alt={"react-icon"}/>
                        <h2>Git</h2>
                    </div>

                </div>
            </div>
        </section>
    );
}
