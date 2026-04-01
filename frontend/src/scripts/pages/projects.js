import { useState, useEffect } from "react";
import Navbar from "../includes/navbar";
import { getProjects } from "../helpers/fetch";



// Map category IDs / display values to filter keys
function getCategoryKey(project) {
    const cat = (project.category_display || "").toLowerCase();
    if (cat.includes("web")) return "web";
    if (cat.includes("ai") || cat.includes("ml")) return "ai";
    if (cat.includes("system")) return "systems";
    return "other";
}

function ProjectCard({ project, index }) {
    const num = String(index + 1).padStart(2, "0");
    const hasGithub = project.github_url && project.github_url !== "null";
    const hasLive = project.live_url && project.live_url !== "null";

    return (
        <div className="project-card">
            <div className="project-img-wrap">
                <img
                    src={
                        project.thumbnail && project.thumbnail !== "null"
                            ? project.thumbnail
                            : `https://placehold.co/700x394/141414/222?text=${encodeURIComponent(project.title)}`
                    }
                    alt={project.title}
                    className="project-img"
                />
            </div>

            <div className="project-body">
                <div className="project-meta">
                    <span className={`project-tag ${getCategoryKey(project)}`}>
                        {project.category_display || "Project"}
                    </span>
                    <span className="project-num">{num}</span>
                </div>

                <h3 className="project-title">{project.title}</h3>

                <p className="project-desc">{project.short_description}</p>

                <div className="project-footer">
                    <div className="project-stack">
                        {(project.tech_stack || []).slice(0, 4).map((tech, i) => (
                            <span key={i}>{tech}</span>
                        ))}
                    </div>

                    <div className="project-links">
                        {hasGithub && (
                            <a
                                href={project.github_url}
                                target="_blank"
                                rel="noreferrer"
                                className="project-link"
                            >
                                GitHub →
                            </a>
                        )}
                        {hasLive && (
                            <a
                                href={project.live_url}
                                target="_blank"
                                rel="noreferrer"
                                className="project-link"
                            >
                                Live →
                            </a>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

function Projects() {
    const [projects, setProjects] = useState([]);
    const [activeFilter, setActiveFilter] = useState("all");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        getProjects()
            .then((data) => {
                setProjects(data);
                setLoading(false);
            })
            .catch((err) => {
                console.error(err);
                setError("Failed to load projects.");
                setLoading(false);
            });
    }, []);

    const filters = [
        { label: "All", value: "all" },
        ...Array.from(
            new Map(
                projects.map((p) => [
                    getCategoryKey(p),
                    { label: p.category_display, value: getCategoryKey(p) },
                ])
            ).values()
        ),
    ];

    const filtered =
        activeFilter === "all"
            ? projects
            : projects.filter((p) => getCategoryKey(p) === activeFilter);

    return (
        <>
            <Navbar activePage="projects" />

            <div className="page-projects" id="page-projects">
                <div className="projects-header">
                    <h1 className="projects-title">
                        Selected<em>Works</em>
                    </h1>

                    <div className="works-filters">
                        {filters.map((f) => (
                            <button
                                key={f.value}
                                className={`wf-btn${activeFilter === f.value ? " active" : ""}`}
                                onClick={() => setActiveFilter(f.value)}
                            >
                                {f.label}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="projects-grid">
                    {loading && (
                        <p className="projects-status">Loading...</p>
                    )}
                    {error && (
                        <p className="projects-status projects-error">{error}</p>
                    )}
                    {!loading && !error && filtered.length === 0 && (
                        <p className="projects-status">No projects found.</p>
                    )}
                    {!loading &&
                        !error &&
                        filtered.map((project, i) => (
                            <ProjectCard key={project.slug || i} project={project} index={i} />
                        ))}
                </div>
            </div>
        </>
    );
}

export default Projects;