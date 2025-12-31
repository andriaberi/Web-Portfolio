import {smoothScrollTo} from "../helpers/smooth-scroll";

function ExpertiseCard({ icon, title, description }) {
    return (
        <div className="expertise-card">
            <div className="icon">
                <i className={`bi ${icon}`}></i>
            </div>
            <div className="content">
                <h3>{title}</h3>
                <p>{description}</p>
            </div>
        </div>
    );
}

export default function Expertise() {
    const expertiseList = [
        {
            icon: "bi-lightning-charge",
            title: "Problem Solving",
            description: "Breaking down complex problems into clear, efficient solutions.",
        },
        {
            icon: "bi-code-slash",
            title: "Software Engineering",
            description: "Designing and building scalable, maintainable systems.",
        },
        {
            icon: "bi-lightbulb",
            title: "Product Thinking",
            description: "Making technical decisions with users and real-world impact in mind.",
        }
    ];

    const principles = [
        "Build for clarity first, optimize when needed",
        "Ship small, iterate fast, measure impact",
        "Keep code readable and easy to maintain",
        "Think in systems, not just features",
    ];

    const highlights = [
        { icon: "bi-stack", label: "Full-stack mindset", value: "Backend → UI → deployment" },
        { icon: "bi-shield-check", label: "Reliable delivery", value: "Validation, error handling, tests" },
        { icon: "bi-speedometer2", label: "Performance aware", value: "Fast pages, efficient queries" },
    ];

    const scrollToProjects = () => {
        const target = document.getElementById("projects");
        if (!target) return;
        if (/Mobi|Android/i.test(navigator.userAgent)) {
            target.scrollIntoView({ behavior: "smooth" });
        } else {
            smoothScrollTo(target.offsetTop, 1400);
        }
    };

    const scrollToContact = () => {
        const target = document.getElementById("contact");
        if (!target) return;
        if (/Mobi|Android/i.test(navigator.userAgent)) {
            target.scrollIntoView({ behavior: "smooth" });
        } else {
            smoothScrollTo(target.offsetTop, 1400);
        }
    };

    return (
        <section className="expertise" id="expertise">
            <div className="expertise-top">
                <div className="expertise-text">
                    <h1 className="expertise-header">Core Expertise</h1>
                    <p className="expertise-subtitle">
                        I focus on building production-ready features that are clean, reliable, and easy to evolve —
                        from API design to UI polish.
                    </p>
                </div>

                <div className="expertise-highlights">
                    {highlights.map((h, i) => (
                        <div className="expertise-highlight" key={i}>
                            <div className="expertise-highlight-icon">
                                <i className={`bi ${h.icon}`}></i>
                            </div>
                            <div className="expertise-highlight-text">
                                <div className="expertise-highlight-label">{h.label}</div>
                                <div className="expertise-highlight-value">{h.value}</div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="expertise-work">
                <div className="expertise-principles">
                    <h2 className="expertise-subheader">How I work</h2>

                    <ul className="expertise-list">
                        {principles.map((p, idx) => (
                            <li className="expertise-list-item" key={idx}>
                                <i className="bi bi-check2-circle"></i>
                                <span>{p}</span>
                            </li>
                        ))}
                    </ul>

                    <div className="expertise-cta">
                        <a className="expertise-button" onClick={() => scrollToProjects()}>
                            <i className="bi bi-folder2-open"></i>
                            <span>View Projects</span>
                        </a>
                        <a className="expertise-link" onClick={() => scrollToContact()}>
                            Let’s build something <i className="bi bi-arrow-right"></i>
                        </a>
                    </div>
                </div>
            </div>

            {/* KEEP YOUR EXISTING CARDS SECTION EXACTLY */}
            <div className="core-expertise">
                {expertiseList.map((expertise, index) => (
                    <ExpertiseCard
                        key={index}
                        icon={expertise.icon}
                        title={expertise.title}
                        description={expertise.description}
                    />
                ))}
            </div>
        </section>
    );

}
