export function scrollToElement(id) {
    const el = document.getElementById(id);

    // Relative to where window.scrollY is, go to the top of the elements bounding rect
    // e.g. top of boundingRect could be negative scroll relative to where current scroll is (i.e. scroll UP)
    const targetY = el.getBoundingClientRect().top + window.scrollY - 50;

    window.scrollTo(window.scrollX, targetY);
}
