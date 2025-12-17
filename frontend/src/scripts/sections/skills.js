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


export default function Skills() {
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
        },
        {
            icon: "bi-people",
            title: "Team Collaboration",
            description: "Communicating effectively and coordinating work with others to achieve goals.",
        }
    ];

    return (
        <section className="skills" id="skills">
            <h1 className="skills-header">Core Expertise</h1>
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
