import { useRef, useState } from "react";
import "../styles/contact.css";

export default function Contact() {
    const [status, setStatus] = useState("idle"); // idle | sending | sent | error | offline | limited
    const busy = useRef(false);

    async function handleSubmit(e) {
        e.preventDefault();
        if (busy.current) return; // a second Enter press or tap can't double-send
        const form = e.currentTarget;
        if (!navigator.onLine) {
            setStatus("offline");
            return;
        }
        busy.current = true;
        setStatus("sending");
        try {
            const res = await fetch("https://api.web3forms.com/submit", {
                method: "POST",
                headers: { Accept: "application/json" },
                body: new FormData(form),
            });
            if (res.status === 429) {
                setStatus("limited");
                return;
            }
            const json = await res.json();
            if (!res.ok || !json.success) throw new Error(json.message || "Request failed");
            form.reset(); // only on success, so a failed send never loses the message
            setStatus("sent");
        } catch {
            setStatus(navigator.onLine ? "error" : "offline");
        } finally {
            busy.current = false;
        }
    }

    // Editing after a result clears it, so a stale "Sent" or error never sits beside new text.
    const clearResult = () => setStatus((s) => (s === "sending" || s === "idle" ? s : "idle"));

    return (
        <div id="contact-page">
            <h1 className="contact-title">Get in touch.</h1>
            <p className="contact-intro">Email me, call, or send a message with the form.</p>

            <div id="contact-container">

                <div id="contact-info-container">
                <div className="contact-info">
                    <p className="contact-description">Email</p>
                    <a className="contact-field"
                       href="mailto:andrew.pols@mail.utoronto.ca">andrew.pols@mail.utoronto.ca</a>
                </div>

                <div className="contact-info">
                    <p className="contact-description">Phone</p>
                    <a className="contact-field" href="tel:+15198181374">+1 (519) 818-1374</a>
                </div>
                </div>

                

                <form id="input-contact-container" onSubmit={handleSubmit} onInput={clearResult}>
                <div id="sender-contact-info">

                    {/*Replace with your Access Key*/}
                    <input type="hidden" name="access_key" value="62cfa822-4318-4963-9147-0ac500f1158e"/>

                    <div className="input-label-container">
                        <label htmlFor="sender-name">Your name <span className="req" aria-hidden="true">*</span></label>
                        <input required id="sender-name" type="text" name="name" autoComplete="name" maxLength={100}/>
                    </div>


                    <div className="input-label-container">
                        <label htmlFor="sender-email">Your email <span className="req" aria-hidden="true">*</span></label>
                        <input required id="sender-email" type="email" name="email" autoComplete="email" maxLength={254}/>
                    </div>
                </div>

                <div className="input-label-container" id="sender-message-container">
                    <label htmlFor="sender-message">Message <span className="req" aria-hidden="true">*</span></label>
                    <textarea required id="sender-message" name="message" maxLength={5000}/>
                </div>

                {/* Honeypot Spam Protection */}
                <input type="checkbox" name="botcheck" className="hidden" style={{display: "none"}} tabIndex={-1} autoComplete="off" aria-hidden="true"/>

                {/* Custom Confirmation / Success Page */}
                {/* <input type="hidden" name="redirect" value="https://mywebsite.com/thanks.html"> */}

                <div className="form-actions">
                    <button type="submit" disabled={status === "sending"}>{status === "sending" ? "Sending…" : "Send message"}</button>
                    <p className={`form-status ${status}`} role="status" aria-live="polite">
                        {status === "sent" && "Sent. I'll get back to you soon."}
                        {status === "error" && "Couldn't send that. Your message is still here. Try again or email me directly."}
                        {status === "offline" && "You appear to be offline. Your message is still here. Send it once you're back online."}
                        {status === "limited" && "Too many messages from this connection. Wait a minute, or email me directly."}
                    </p>
                </div>

                </form>
            </div>
        </div>
    );
}
