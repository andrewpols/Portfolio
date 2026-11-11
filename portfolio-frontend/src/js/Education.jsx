import "../styles/work.css";
import OrgMark from "./OrgMark.jsx";
import uoftMark from "../img/uoft-symbol.svg";

export default function Education() {
    return (
        <section id="education-section" className="page block">
            <h2 className="block-title">Education</h2>
            <div className="block-body education">
                <div className="education-head">
                    <h3 className="education-school"><OrgMark src={uoftMark} className="org-mark-tall" /><span>University of Toronto</span></h3>
                    <p className="meta nowrap when-wide">Third year</p>
                </div>
                <p className="education-degree">HBSc, Computer Science &amp; Statistics<span className="meta when-narrow">Third year</span></p>
                <dl className="education-facts">
                    <dt>GPA</dt>
                    <dd>4.00 / 4.00</dd>
                    <dt>Honours</dt>
                    <dd>Dean&rsquo;s List, 4&nbsp;consecutive&nbsp;semesters</dd>
                    <dt>Coursework</dt>
                    <dd>Software Design, Computer Organization, Software Tools and Systems Programming</dd>
                </dl>
            </div>
        </section>
    );
}
