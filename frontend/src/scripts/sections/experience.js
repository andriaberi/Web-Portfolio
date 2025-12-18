import React, { useEffect, useState } from "react";

function Experience() {
    const [experiences, setExperiences] = useState([]);
    const [expandedIndex, setExpandedIndex] = useState(null);

    // Fetch experience data from Django API
    useEffect(() => {
        fetch("/api/experience")
            .then((res) => res.json())
            .then((data) => setExperiences(data))
            .catch((err) => console.error("Error fetching experiences:", err));
    }, []);

    const toggleExpand = (index) => {
        setExpandedIndex(expandedIndex === index ? null : index);
    };

    return (
        <section className="experience" id="experience">
            <h1 className="section-title">Experience</h1>

            <div className="timeline">
                {experiences.map((exp, index) => (
                    <div
                        key={index}
                        className={`timeline-item ${expandedIndex === index ? "active" : ""}`}
                    >
                        <div className="timeline-dot"></div>

                        <div className="timeline-card">
                            <div className="card-header">
                                <div>
                                    <h3>{exp.title}</h3>
                                    <span className="company">{exp.company}</span>
                                </div>
                                <span className="date">
                  {new Date(exp.start_date).toLocaleString("default", { month: "short", year: "numeric" })} –{" "}
                                    {exp.is_current
                                        ? "Present"
                                        : new Date(exp.end_date).toLocaleString("default", { month: "short", year: "numeric" })}
                </span>
                            </div>

                            <p className="summary">{exp.summary}</p>

                            <button className="expand-btn" onClick={() => toggleExpand(index)}>
                                {expandedIndex === index ? "Hide Details" : "View Details"}
                            </button>

                            <div className="details">
                                {exp.details && exp.details.length > 0 && (
                                    <ul>
                                        {exp.details.map((bullet, i) => (
                                            <li key={i}>{bullet}</li>
                                        ))}
                                    </ul>
                                )}

                                {exp.tech_stack && exp.tech_stack.length > 0 && (
                                    <div className="tech">
                                        {exp.tech_stack.map((tech, i) => (
                                            <span key={i}>{tech}</span>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}

export default Experience;
