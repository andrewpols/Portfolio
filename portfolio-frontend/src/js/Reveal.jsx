// Plain wrapper: sections render immediately, no scroll animation.
export default function Reveal({ children, className = "", as: Tag = "div", ...rest }) { // eslint-disable-line no-unused-vars
    return <Tag className={className} {...rest}>{children}</Tag>;
}
