import resumePDF from "../img/AndrewPolsResume-ASIP-July9-2025.pdf"

export default function Resume() {
    return (
        <iframe
            src={resumePDF}
            loading="lazy"
            title="Andrew Pols Resume"
            frameBorder="0"
            style={{height: "100vh", width: "100vw", boxSizing: "border-box"}}
        ></iframe>
    );
}
