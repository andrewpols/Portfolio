import { NavLink, Link, Outlet, useLocation } from "react-router-dom";
import { useEffect, useRef, useState } from "react";

import "../styles/layout.css";
import { ArrowUpRight, MenuIcon } from "./Icons.jsx";

const links = [
    { to: "/", label: "Home", end: true },
    { to: "/portfolio", label: "Work" },
    { to: "/contact", label: "Contact" },
    { to: "/resume", label: "Resume", external: true },
];

const titles = { "/": "Andrew Pols", "/portfolio": "Work · Andrew Pols", "/contact": "Contact · Andrew Pols", "/resume": "Resume · Andrew Pols" };

export default function Layout() {
    const { pathname } = useLocation();

    useEffect(() => {
        document.title = titles[pathname.replace(/\/$/, "") || "/"] ?? "Not found · Andrew Pols";
    }, [pathname]);
    const [open, setOpen] = useState(false);
    const isResume = pathname === "/resume";
    const toggleRef = useRef(null);
    const scrollerRef = useRef(null);
    const navRef = useRef(null);

    useEffect(() => {
        if (!open) return;
        const onKey = (e) => {
            if (e.key === "Escape") {
                setOpen(false);
                toggleRef.current?.focus();
            }
        };
        document.addEventListener("keydown", onKey);
        navRef.current?.querySelector("a")?.focus();
        const prevOverflow = document.documentElement.style.overflow;
        document.documentElement.style.overflow = "hidden";
        return () => {
            document.removeEventListener("keydown", onKey);
            document.documentElement.style.overflow = prevOverflow;
        };
    }, [open]);

    useEffect(() => {
        scrollerRef.current?.scrollTo({ top: 0, left: 0, behavior: "instant" });
        window.scrollTo({ top: 0, left: 0, behavior: "instant" });
        setOpen(false);
    }, [pathname]);

    return (
        <div id="Layout">
            {!isResume && <a href="#outlet" className="skip-link" onClick={(e) => { e.preventDefault(); document.getElementById("outlet")?.focus(); }}>Skip to content</a>}
            {!isResume && (
                <header id="header">
                    <Link to="/" className="wordmark" aria-label="Andrew Pols, home">Andrew Pols</Link>

                    <button
                        ref={toggleRef}
                        className="menu-toggle"
                        aria-label={open ? "Close menu" : "Open menu"}
                        aria-expanded={open}
                        aria-controls="site-nav"
                        onClick={() => setOpen((o) => !o)}
                    >
                        <MenuIcon open={open} />
                    </button>

                    <nav id="site-nav" ref={navRef} className={open ? "open" : ""} aria-label="Primary">
                        {links.map((l) => (
                            <NavLink
                                key={l.to}
                                to={l.to}
                                end={l.end}
                                target={l.external ? "_blank" : undefined}
                                className={({ isActive }) => "nav-link" + (isActive ? " active" : "")}
                            >
                                {l.label}{l.external && <ArrowUpRight />}
                            </NavLink>
                        ))}
                    </nav>
                </header>
            )}

            <div id="scroller" ref={scrollerRef}>
            <main id="outlet" tabIndex={-1} className={isResume ? "is-resume" : ""}>
                <Outlet />
            </main>

            {!isResume && (
                <footer id="footer">
                    <div className="footer-row">
                        <p>&copy; 2026 Andrew Pols</p>
                        <div className="footer-links">
                            <a href="https://github.com/andrewpols" target="_blank" rel="noreferrer">GitHub<ArrowUpRight /></a>
                            <a href="https://www.linkedin.com/in/andrewpols/" target="_blank" rel="noreferrer">LinkedIn<ArrowUpRight /></a>
                            <a href="mailto:andrew.pols@mail.utoronto.ca">Email</a>
                        </div>
                    </div>
                </footer>
            )}
            </div>
        </div>
    );
}
