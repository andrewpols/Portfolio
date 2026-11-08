// Inline SVG icons so glyphs never fall back to emoji presentation.
export function ArrowUpRight({ size = 14 }) {
    return (
        <svg className="icon-arrow" width={size} height={size} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" aria-hidden="true" focusable="false">
            <path d="M4.5 11.5L11.5 4.5M5.5 4.5h6v6" />
        </svg>
    );
}

export function MenuIcon({ open }) {
    return (
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="square" aria-hidden="true" focusable="false">
            {open ? <path d="M4 4l12 12M16 4L4 16" /> : <path d="M3 6h14M3 10h14M3 14h14" />}
        </svg>
    );
}

export function ArrowDown({ size = 14 }) {
    return (
        <svg className="icon-arrow" width={size} height={size} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" aria-hidden="true" focusable="false">
            <path d="M8 3v10M3.5 8.5L8 13l4.5-4.5" />
        </svg>
    );
}
