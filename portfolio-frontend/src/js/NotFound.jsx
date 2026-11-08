import { Link } from "react-router-dom";
import "../styles/work.css";

export default function NotFound() {
    return (
        <div className="page-head">
            <h1 className="page-title">Not found</h1>
            <p>There's nothing at this address.</p>
            <div className="hero-actions">
                <Link to="/" className="btn btn-primary">Home</Link>
                <Link to="/portfolio" className="btn">See my work</Link>
            </div>
        </div>
    );
}
