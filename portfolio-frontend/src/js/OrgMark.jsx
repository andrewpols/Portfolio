// A one-colour organisation mark. The SVG is used as a mask over the current text colour, so it follows the theme.
export default function OrgMark({ src, className = "" }) {
    return <span className={`org-mark ${className}`} style={{ "--mark": `url("${src}")` }} aria-hidden="true" />;
}
