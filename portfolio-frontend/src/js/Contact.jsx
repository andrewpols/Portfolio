import { useState } from "react";
import "../styles/contact.css";

export default function Contact() {
    const [status, setStatus] = useState("idle"); // idle | sending | sent | error

    async function handleSubmit(e) {
        e.preventDefault();
        const form = e.currentTarget;
        setStatus("sending");
        try {
            const res = await fetch("https://api.web3forms.com/submit", {
                method: "POST",
                headers: { Accept: "application/json" },
                body: new FormData(form),
            });
            const json = await res.json();
            if (!res.ok || !json.success) throw new Error(json.message || "Request failed");
            form.reset();
            setStatus("sent");
        } catch {
            setStatus("error");
        }
    }

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

                

                <form id="input-contact-container" onSubmit={handleSubmit} noValidate={false}>
                <div id="sender-contact-info">

                    {/*Replace with your Access Key*/}
                    <input type="hidden" name="access_key" value="62cfa822-4318-4963-9147-0ac500f1158e"/>

                    <div className="input-label-container">
                        <label htmlFor="sender-name">Your name <span className="req" aria-hidden="true">*</span></label>
                        <input required id="sender-name" type="text" name="name" autoComplete="name"/>
                    </div>


                    <div className="input-label-container">
                        <label htmlFor="sender-email">Your email <span className="req" aria-hidden="true">*</span></label>
                        <input required id="sender-email" type="email" name="email" autoComplete="email"/>
                    </div>
                </div>

                <div className="input-label-container" id="sender-message-container">
                    <label htmlFor="sender-message">Message <span className="req" aria-hidden="true">*</span></label>
                    <textarea required id="sender-message" name="message"/>
                </div>

                {/* Honeypot Spam Protection */}
                <input type="checkbox" name="botcheck" className="hidden" style={{display: "none"}}/>

                {/* Custom Confirmation / Success Page */}
                {/* <input type="hidden" name="redirect" value="https://mywebsite.com/thanks.html"> */}

                <div className="form-actions">
                    <button type="submit" disabled={status === "sending"}>{status === "sending" ? "Sending…" : "Send message"}</button>
                    <p className={`form-status ${status}`} role="status" aria-live="polite">
                        {status === "sent" && "Sent. I'll get back to you soon."}
                        {status === "error" && "Couldn't send that. Try again or email me directly."}
                    </p>
                </div>

                </form>
            </div>
        </div>
    );
}
