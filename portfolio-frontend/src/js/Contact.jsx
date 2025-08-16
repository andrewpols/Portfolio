import "../styles/contact.css";

export default function Contact() {
    return (
        <div id="contact-container" style={{marginTop: "7.5em", marginBottom: "4em"}}>
            <h1>Get in Touch!</h1>
            <p className="mt-5">Whether you're a recruiter or just want to know more about me, feel free to contact me below.</p>

            <div id="contact-info-container">
                <div className="contact-info">
                    <p className="contact-description">EMAIL ME</p>
                    <a className="contact-field"
                       href="mailto:andrew.pols@mail.utoronto.ca">andrew.pols@mail.utoronto.ca</a>
                </div>

                <div className="contact-info">
                    <p className="contact-description">CALL ME</p>
                    <a className="contact-field" href="tel:+15198181374">+1 (519) 818-1374</a>
                </div>
            </div>

            <hr className="divider m-auto"/>

            <form id="input-contact-container" action="https://api.web3forms.com/submit" method="POST">
                <div id="sender-contact-info">

                    {/*Replace with your Access Key*/}
                    <input type="hidden" name="access_key" value="62cfa822-4318-4963-9147-0ac500f1158e"/>

                    <div className="input-label-container">
                        <label htmlFor="sender-name">Your Name</label>
                        <input required id="sender-name" type="text" name="name" autoComplete="true"/>
                    </div>


                    <div className="input-label-container">
                        <label htmlFor="sender-email">Your Email</label>
                        <input required id="sender-email" type="email" name="email" autoComplete="true"/>
                    </div>
                </div>

                <div className="input-label-container" id="sender-message-container">
                    <label htmlFor="sender-message"> Message</label>
                    <textarea required id="sender-message" type="text" name="message"/>
                </div>

                {/* Honeypot Spam Protection */}
                <input type="checkbox" name="botcheck" className="hidden" style={{display: "none"}}/>

                {/* Custom Confirmation / Success Page */}
                {/* <input type="hidden" name="redirect" value="https://mywebsite.com/thanks.html"> */}

                <button type="submit">Submit</button>

            </form>


        </div>
    );
}
