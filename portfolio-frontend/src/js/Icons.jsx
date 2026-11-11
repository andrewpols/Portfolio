// Inline SVG icons so glyphs never fall back to emoji presentation.
export function ArrowUpRight({ size = 14 }) {
    return (
        <svg className="icon-arrow" width={size} height={size} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" aria-hidden="true" focusable="false">
            <path d="M4.5 11.5L11.5 4.5M5.5 4.5h6v6" />
        </svg>
    );
}

// Marks a still image that plays a short video on hover.
export function PlayBadge() {
    return (
        <span className="play-badge" aria-hidden="true">
            <svg width="10" height="11" viewBox="0 0 10 11" fill="currentColor" focusable="false"><path d="M1 0.8v9.4a.5.5 0 0 0 .76.43l7.6-4.7a.5.5 0 0 0 0-.86L1.76.37A.5.5 0 0 0 1 .8z" /></svg>
        </span>
    );
}
