function Contact() {
    const email = "andria24b@gmail.com";
    const phone = "+1 (267) 632-6754";

    const socials = [
        { icon: "bi-envelope", label: "Email", href: `mailto:${email}` },
        { icon: "bi-linkedin", label: "LinkedIn", href: "https://linkedin.com/in/andriaberidze/" },
        { icon: "bi-github", label: "GitHub", href: "https://github.com/andriaberi" },
    ];

    return (
        <section className="contact" id="contact">
            <div className="contact-container">
                <div className="contact-grid">
                    <div className="contact-left">
                        <h1 className="contact-title">
                            Let’s have <br />
                            <span className="contact-title-accent">a Chat</span>
                        </h1>

                        <p className="contact-subtitle">
                            Want to talk about a project, ideas, or anything digital? Hit me up.
                        </p>

                        <a className="contact-cta" href={`mailto:${email}`}>
                            Let’s Chat
                        </a>
                    </div>

                    <div className="contact-right">
                        <div className="contact-block">
                            <div className="contact-kicker">GET IN TOUCH</div>

                            <a className="contact-row" href={`mailto:${email}`}>
                                <i className="bi bi-envelope"></i>
                                <span>{email}</span>
                            </a>

                            <a className="contact-row" href={`tel:${phone.replace(/\s/g, "")}`}>
                                <i className="bi bi-telephone"></i>
                                <span>{phone}</span>
                            </a>
                        </div>

                        <div className="contact-block">
                            <div className="contact-kicker">FOLLOW ME</div>

                            <div className="contact-icons">
                                {socials.map((s, i) => (
                                    <a
                                        key={i}
                                        className="contact-icon"
                                        href={s.href}
                                        target={s.href.startsWith("http") ? "_blank" : undefined}
                                        rel={s.href.startsWith("http") ? "noreferrer" : undefined}
                                        aria-label={s.label}
                                        title={s.label}
                                    >
                                        <i className={`bi ${s.icon}`}></i>
                                    </a>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Contact;
