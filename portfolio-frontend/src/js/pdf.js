export const RESUME_URL = "/AndrewPolsResume.pdf";
// Same file, served by vercel.json (and the dev server in vite.config.js) as application/octet-stream with
// Content-Disposition: attachment. Safari previews anything labelled application/pdf, so the generic type
// is what makes it save the file instead.
export const RESUME_DOWNLOAD_URL = "/download/AndrewPolsResume.pdf";
export const RESUME_FILENAME = "AndrewPolsResume.pdf";

// Desktop browsers show a PDF natively in an iframe. Phones and tablets don't scale it to the screen
// (iOS Safari draws it at full size, Android Chrome shows nothing), so they get pages drawn by pdf.js.
export function useNativePdfViewer() {
    if (typeof navigator === "undefined") return true;
    if (navigator.pdfViewerEnabled === false) return false;
    return !window.matchMedia("(pointer: coarse)").matches;
}
