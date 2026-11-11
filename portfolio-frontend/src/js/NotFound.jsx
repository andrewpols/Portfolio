import { Link } from "react-router-dom";

export default function NotFound() {
    return (
        <div className="page intro">
            <h1>Not found</h1>
            <p className="intro-line">There’s nothing at this address.</p>
            <p className="links-row"><Link to="/" className="text-link">Home</Link></p>
        </div>
    );
}
