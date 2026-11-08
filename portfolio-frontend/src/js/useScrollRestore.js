import { useEffect, useLayoutEffect, useRef } from "react";

const key = (pathname) => `scroll:${pathname}`;

function wasReloaded() {
    const nav = performance.getEntriesByType?.("navigation")?.[0];
    return nav ? nav.type === "reload" || nav.type === "back_forward" : false;
}

// Keeps the visitor where they were across a refresh. Depending on the layout, either the document or
// #scroller scrolls, so both are tracked and restored; only one of them ever has a non-zero offset.
// Route changes still start at the top (handled by Layout).
export default function useScrollRestore(scrollerRef, pathname) {
    const pathRef = useRef(pathname);
    pathRef.current = pathname;

    useEffect(() => {
        const scroller = scrollerRef.current;
        let frame = 0;
        const save = () => {
            frame = 0;
            const y = Math.round((scroller?.scrollTop ?? 0) + window.scrollY);
            try { sessionStorage.setItem(key(pathRef.current), String(y)); } catch { /* storage unavailable */ }
        };
        const onScroll = () => { if (!frame) frame = requestAnimationFrame(save); };
        scroller?.addEventListener("scroll", onScroll, { passive: true });
        window.addEventListener("scroll", onScroll, { passive: true });
        window.addEventListener("pagehide", save);
        return () => {
            scroller?.removeEventListener("scroll", onScroll);
            window.removeEventListener("scroll", onScroll);
            window.removeEventListener("pagehide", save);
            if (frame) cancelAnimationFrame(frame);
        };
    }, [scrollerRef]);

    useLayoutEffect(() => {
        if (!wasReloaded()) return;
        let target = 0;
        try { target = Number(sessionStorage.getItem(key(pathRef.current))) || 0; } catch { /* storage unavailable */ }
        if (!target) return;

        if ("scrollRestoration" in history) history.scrollRestoration = "manual";
        const scroller = scrollerRef.current;
        const apply = () => {
            scroller?.scrollTo({ top: target, left: 0, behavior: "instant" });
            window.scrollTo({ top: target, left: 0, behavior: "instant" });
        };
        const reached = () => Math.abs((scroller?.scrollTop ?? 0) + window.scrollY - target) < 2;

        // Images and fonts can still be sizing the page, which clamps the first attempt. Retry until the
        // page is tall enough, and give up the moment the visitor scrolls themselves.
        let stop = false;
        let tries = 0;
        const cancel = () => { stop = true; };
        const events = ["wheel", "touchstart", "keydown", "mousedown"];
        events.forEach((e) => window.addEventListener(e, cancel, { passive: true, once: true }));
        const step = () => {
            if (stop) return;
            apply();
            if (!reached() && tries++ < 60) requestAnimationFrame(step);
        };
        step();
        return () => { stop = true; events.forEach((e) => window.removeEventListener(e, cancel)); };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
}
