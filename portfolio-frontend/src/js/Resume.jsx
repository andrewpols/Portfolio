import { lazy, Suspense } from "react";
import { Link } from "react-router-dom";
import { RESUME_URL, RESUME_DOWNLOAD_URL, RESUME_FILENAME, useNativePdfViewer } from "./pdf.js";
import "../styles/work.css";

const PdfPages = lazy(() => import("./PdfPages.jsx"));

export default function Resume() {
    if (useNativePdfViewer()) {
        return (
            <iframe
                src={RESUME_URL}
                title="Andrew Pols resume"
                style={{ display: "block", width: "100%", height: "100vh", border: 0 }}
            />
        );
    }

    return (
        <div className="resume-view">
            <div className="resume-bar">
                <Link to="/">Back</Link>
                <a href={RESUME_DOWNLOAD_URL} download={RESUME_FILENAME}>Download</a>
            </div>
            <Suspense fallback={<p className="pdf-status">Loading resume…</p>}>
                <PdfPages />
            </Suspense>
        </div>
    );
}
