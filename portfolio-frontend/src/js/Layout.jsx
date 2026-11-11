import { Link, Outlet, useLocation } from "react-router-dom";
import { useEffect, useRef } from "react";

import "../styles/layout.css";
import { ArrowUpRight } from "./Icons.jsx";

const links = [
    { to: "/#experiences-section", label: "experience" },
    { to: "/#education-section", label: "education" },
    { to: "/#projects-section", label: "projects" },
    { to: "/#about-me-section", label: "about" },
    { to: "/resume", label: "resume", external: true },
];

const titles = { "/": "Andrew Pols", "/resume": "Resume · Andrew Pols" };

function scrollToHash(hash, behavior) {
    let id = "";
    try { id = decodeURIComponent(hash.slice(1)); } catch { return false; }
    const target = id && document.getElementById(id);
    if (!target) return false;
    target.scrollIntoView({ block: "start", behavior });
    // The fragment has done its job; keep the address bar clean.
    history.replaceState(history.state, "", window.location.pathname + window.location.search);
    return true;
}

export default function Layout() {
    const { pathname, key, hash } = useLocation();
    const isResume = pathname === "/resume";

    useEffect(() => {
        document.title = titles[pathname.replace(/\/$/, "") || "/"] ?? "Not found · Andrew Pols";
    }, [pathname]);

    // A reload or back/forward returns to where you were. The browser's own restore fails here because the page is
    // shorter than it will be (the listening section only appears once its data arrives), so restore by hand and
    // keep trying as the page grows, until it lands, the visitor scrolls, or a few seconds pass.
    useEffect(() => {
        if (!("scrollRestoration" in history)) return;
        history.scrollRestoration = "manual";
        const keyFor = () => `scroll:${window.location.pathname}`;
        const read = () => { try { return Number(sessionStorage.getItem(keyFor())) || 0; } catch { return 0; } };
        const write = (y) => { try { sessionStorage.setItem(keyFor(), String(Math.round(y))); } catch { /* storage unavailable */ } };

        const navType = performance.getEntriesByType("navigation")[0]?.type;
        const target = !window.location.hash && (navType === "reload" || navType === "back_forward") ? read() : 0;

        let tracking = target === 0;
        let frame = 0;
        const onScroll = () => {
            if (!tracking || frame) return;
            frame = requestAnimationFrame(() => { frame = 0; write(window.scrollY); });
        };
        const onHide = () => { if (tracking) write(window.scrollY); };

        let observer;
        const stop = () => {
            observer?.disconnect();
            clearTimeout(timer);
            for (const e of ["wheel", "touchstart", "keydown", "mousedown"]) window.removeEventListener(e, stop);
            tracking = true;
        };
        const attempt = () => {
            const max = document.documentElement.scrollHeight - window.innerHeight;
            window.scrollTo({ top: Math.min(target, Math.max(max, 0)), left: 0, behavior: "instant" });
            if (max >= target) stop();
        };
        let timer = 0;
        if (target > 0) {
            attempt();
            if (!tracking) {
                observer = new ResizeObserver(attempt);
                observer.observe(document.body);
                timer = setTimeout(stop, 4000);
                for (const e of ["wheel", "touchstart", "keydown", "mousedown"]) window.addEventListener(e, stop, { passive: true });
            }
        }

        window.addEventListener("scroll", onScroll, { passive: true });
        window.addEventListener("pagehide", onHide);
        return () => {
            stop();
            cancelAnimationFrame(frame);
            window.removeEventListener("scroll", onScroll);
            window.removeEventListener("pagehide", onHide);
        };
    }, []);

    // Landing on /#section (a shared link, or the old /work and /contact URLs after their redirect) scrolls to that section.
    useEffect(() => {
        const initial = window.location.hash;
        if (initial) requestAnimationFrame(() => scrollToHash(initial, "instant"));
    }, []);

    // Every navigation starts at the top unless it targets a section. The first key is the page load, where a refresh
    // keeps its position. Staying on the same page glides; arriving on a different page jumps.
    const lastKey = useRef(key);
    const lastPath = useRef(pathname);
    useEffect(() => {
        if (lastKey.current === key) return;
        const samePage = lastPath.current === pathname;
        lastKey.current = key;
        lastPath.current = pathname;
        const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        const behavior = samePage && !reduced ? "smooth" : "instant";
        if (hash && scrollToHash(hash, behavior)) return;
        window.scrollTo({ top: 0, left: 0, behavior });
    }, [key, pathname, hash]);

    return (
        <div id="Layout">
            {!isResume && <a href="#outlet" className="skip-link" onClick={(e) => { e.preventDefault(); document.getElementById("outlet")?.focus(); }}>Skip to content</a>}
            {!isResume && (
                <header id="header">
                    <div className="page header-inner">
                        <Link to="/" className="wordmark" onClick={() => { if (pathname === "/") window.scrollTo({ top: 0, behavior: "smooth" }); }}>Andrew Pols</Link>
                        <nav id="site-nav" aria-label="Primary">
                            {links.map((l) => (
                                <Link key={l.to} to={l.to} target={l.external ? "_blank" : undefined} className="nav-link">
                                    {l.label}{l.external && <ArrowUpRight />}
                                </Link>
                            ))}
                        </nav>
                    </div>
                </header>
            )}

            <main id="outlet" tabIndex={-1}>
                <Outlet />
            </main>

            {!isResume && (
                <footer id="contact-section" className="page">
                    <div className="footer-row">
                        <p>&copy; 2026 Andrew Pols</p>
                        <p className="footer-links">
                            <a href="mailto:andrew.pols@mail.utoronto.ca" className="text-link">andrew.pols@mail.utoronto.ca</a>
                            <a href="tel:+15198181374" className="text-link">+1 (519) 818-1374</a>
                        </p>
                    </div>
                </footer>
            )}
        </div>
    );
}
