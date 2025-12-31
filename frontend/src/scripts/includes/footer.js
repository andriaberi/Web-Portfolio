import {smoothScrollTo} from "../helpers/smooth-scroll";

function Footer() {
    const year = new Date().getFullYear();

    const socials = [
        { icon: "bi-github", label: "GitHub", href: "https://github.com/andriaberi" },
        { icon: "bi-linkedin", label: "LinkedIn", href: "https://linkedin.com/in/andriaberidze/" },
        { icon: "bi-envelope", label: "Email", href: "mailto:andria24b@gmail.com" },
    ];

    const scrollToTop = () => {
        const target = document.getElementById("home");
        if (!target) return;
        if (/Mobi|Android/i.test(navigator.userAgent)) {
            target.scrollIntoView({ behavior: "smooth" });
        } else {
            smoothScrollTo(target.offsetTop, 1400);
        }
    };

    return (
        <footer className="footer">
            <div className="footer-container">
                <div className="footer-left">
                    <div className="footer-logo">Andriaberi</div>
                    <div className="footer-copy">© {year} Andria Beridze</div>
                </div>

                <div className="footer-right">
                    <a className="footer-top" onClick={scrollToTop}>
                        <span>Back to top</span>
                        <i className="bi bi-arrow-up"></i>
                    </a>

                    <div className="footer-socials">
                        {socials.map((s, i) => (
                            <a
                                key={i}
                                className="footer-social"
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
        </footer>
    );
}

export default Footer;
