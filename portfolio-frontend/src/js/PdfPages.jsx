import { useEffect, useRef, useState } from "react";
import * as pdfjs from "pdfjs-dist";
import { RESUME_URL, RESUME_DOWNLOAD_URL, RESUME_FILENAME } from "./pdf.js";

const w = new Worker(new URL("pdfjs-dist/build/pdf.worker.min.mjs", import.meta.url), { type: "module" });
pdfjs.GlobalWorkerOptions.workerPort = w;

// Draws every page of the resume at the width of the screen, so it fits without sideways scrolling
// and pinch-zoom works like on any other page.
export default function PdfPages() {
    const holder = useRef(null);
    const [state, setState] = useState("loading"); // loading | ready | error

    useEffect(() => {
        let cancelled = false;
        let task;

        async function render() {
            try {
                task = pdfjs.getDocument({ url: RESUME_URL });
                const pdf = await task.promise;
                const width = holder.current.clientWidth;
                const dpr = Math.min(window.devicePixelRatio || 1, 3);
                holder.current.replaceChildren();

                for (let n = 1; n <= pdf.numPages; n++) {
                    const page = await pdf.getPage(n);
                    if (cancelled) return;
                    const base = page.getViewport({ scale: 1 });
                    const viewport = page.getViewport({ scale: (width * dpr) / base.width });
                    const canvas = document.createElement("canvas");
                    canvas.width = Math.floor(viewport.width);
                    canvas.height = Math.floor(viewport.height);
                    canvas.className = "pdf-page";
                    holder.current.appendChild(canvas);
                    await page.render({ canvasContext: canvas.getContext("2d"), viewport }).promise;
                }
                if (!cancelled) setState("ready");
            } catch {
                if (!cancelled) setState("error");
            }
        }

        render();
        return () => {
            cancelled = true;
            task?.destroy();
        };
    }, []);

    return (
        <>
            <div ref={holder} className="pdf-pages" role="img" aria-label="Andrew Pols's resume, shown as page images. Use the Download link above for a copy a screen reader can read." />
            {state === "loading" && <p className="pdf-status">Loading resume…</p>}
            {state === "error" && (
                <p className="pdf-status">
                    Couldn&rsquo;t show the resume here. <a href={RESUME_URL} target="_blank" rel="noreferrer">Open the PDF</a> or{" "}
                    <a href={RESUME_DOWNLOAD_URL} download={RESUME_FILENAME}>download it</a>.
                </p>
            )}
        </>
    );
}
