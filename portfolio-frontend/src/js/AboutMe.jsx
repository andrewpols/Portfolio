import "../styles/about-me.css";

import NowPlaying from "./NowPlaying.jsx";

export default function AboutMe() {
    return (
        <>
            <section id="about-me-section" className="page block">
                <h2 className="block-title">About</h2>
                <div className="block-body" id="about-me-desc">
                    <p>
                        I&rsquo;m motivated by challenging problems in domains that impact people at a large scale. At IBM, that&rsquo;s the FP&amp;A sector, but I&rsquo;ve also solved problems in research and music through personal projects.
                    </p>
                    <p>
                        Outside of work, I&rsquo;m usually listening to something. The music I love shapes how I make decisions and how I write code.
                    </p>
                </div>
            </section>

            <NowPlaying />
        </>
    );
}
