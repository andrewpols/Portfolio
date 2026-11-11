import { useEffect, useRef, useState } from "react";

const reducedMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const noHover = () => window.matchMedia("(hover: none)").matches;

// Muted preview video.
// - With a mouse it plays on hover and rewinds on leave.
// - On touch screens, where hover doesn't exist, it plays while mostly in view and pauses once scrolled away.
// - With { autoplayOnce: true } a mouse user also sees it play through once the first time it scrolls into view,
//   then it returns to its still frame.
// Visitors who prefer reduced motion only ever see the still frame.
// Spread `hover` on the element that should trigger hover; `shown` is true while an automatic play is on screen.
export default function usePreview({ inView = true, autoplayOnce = false } = {}) {
    const ref = useRef(null);
    const [shown, setShown] = useState(false);

    // The still frame shows until the video is really playing, then the video fades in over it.
    useEffect(() => {
        const video = ref.current;
        if (!video) return;
        const on = () => setShown(true);
        const off = () => setShown(false);
        video.addEventListener("playing", on);
        video.addEventListener("pause", off);
        video.addEventListener("ended", off);
        return () => {
            video.removeEventListener("playing", on);
            video.removeEventListener("pause", off);
            video.removeEventListener("ended", off);
        };
    }, []);

    // Touch screens: loop while mostly in view.
    useEffect(() => {
        const video = ref.current;
        if (!inView || !video || !noHover() || reducedMotion()) return;
        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) video.play().catch(() => {});
            else video.pause();
        }, { threshold: 0.6 });
        observer.observe(video);
        return () => observer.disconnect();
    }, [inView]);

    // Mouse screens: one automatic play the first time it is mostly in view.
    useEffect(() => {
        const video = ref.current;
        if (!autoplayOnce || !video || noHover() || reducedMotion()) return;
        const finish = () => {
            video.loop = true;
            video.currentTime = 0;
            setShown(false);
        };
        const observer = new IntersectionObserver(([entry]) => {
            if (!entry.isIntersecting) return;
            observer.disconnect();
            video.loop = false;
            video.addEventListener("ended", finish, { once: true });
            video.play().then(() => setShown(true)).catch(finish);
        }, { threshold: 0.6 });
        observer.observe(video);
        return () => { observer.disconnect(); video.removeEventListener("ended", finish); };
    }, [autoplayOnce]);

    const play = () => {
        const video = ref.current;
        if (!video || noHover() || reducedMotion()) return;
        video.loop = true; // hovering takes over from an automatic play
        video.play().catch(() => {});
    };
    const reset = () => {
        const video = ref.current;
        if (!video || noHover()) return;
        video.pause();
        video.currentTime = 0;
        setShown(false);
    };
    return { ref, shown, hover: { onMouseEnter: play, onMouseLeave: reset } };
}
