import React, { useEffect, useMemo, useState } from "react";

function Projects() {
    const [projects, setProjects] = useState([]);
    const [activeFilter, setActiveFilter] = useState("all");
    const [status, setStatus] = useState("loading"); // loading | ready | error
    const [error, setError] = useState("");

    useEffect(() => {
        let cancelled = false;

        async function load() {
            try {
                setStatus("loading");
                setError("");

                const res = await fetch("/api/projects", {
                    headers: { Accept: "application/json" },
                });

                if (!res.ok) throw new Error(`Request failed: ${res.status}`);

                const data = await res.json();
                if (cancelled) return;

                setProjects(Array.isArray(data) ? data : []);
                setStatus("ready");
            } catch (e) {
                if (cancelled) return;
                setStatus("error");
                setError(e?.message || "Failed to load projects.");
            }
        }

        load();
        return () => {
            cancelled = true;
        };
    }, []);

    const categories = useMemo(() => {
        const set = new Set();
        projects.forEach((p) => p?.category && set.add(p.category));
        return ["all", ...Array.from(set)];
    }, [projects]);

    const visible =
        activeFilter === "all"
            ? projects
            : projects.filter((p) => p?.category === activeFilter);

    return (
        <section className="projects" id="projects">
            <div className="projects-container">
                <header className="projects-header">
                    <h2>Selected Works</h2>
                    <p>A mix of design, code, and creative problem solving.</p>
                </header>

                <nav className="projects-filters" aria-label="Project categories">
                    {categories.map((cat) => (
                        <button
                            key={cat}
                            type="button"
                            className={`filter-btn ${activeFilter === cat ? "active" : ""}`}
                            onClick={() => setActiveFilter(cat)}
                        >
                            {cat === "all" ? "All" : cat}
                        </button>
                    ))}
                </nav>

                {status === "loading" && (
                    <div className="projects-state">
                        <p className="text-muted">Loading projects…</p>
                    </div>
                )}

                {status === "error" && (
                    <div className="projects-state">
                        <p className="text-error">Couldn’t load projects.</p>
                        <p className="text-muted">{error}</p>
                    </div>
                )}

                {status === "ready" && visible.length === 0 && (
                    <div className="projects-state">
                        <p className="text-muted">No projects found for this category.</p>
                    </div>
                )}

                {status === "ready" && visible.length > 0 && (
                    <div className="projects-grid">
                        {visible.map((project) => (
                            <article key={project.slug} className="project-card fade-in">
                                <div className="card-img">
                                    {project.thumbnail ? (
                                        <img
                                            src={project.thumbnail}
                                            alt={`${project.title} thumbnail`}
                                            loading="lazy"
                                        />
                                    ) : (
                                        <div className="card-img-placeholder" aria-hidden="true">
                                            Project Preview
                                        </div>
                                    )}
                                </div>

                                <div className="card-content">
                                    <span className="card-tag">{project.category || "Project"}</span>
                                    <h3>{project.title}</h3>
                                    <p>{project.short_description}</p>

                                    <a className="card-link" href={`/projects/${project.slug}`}>
                                        View Project <span aria-hidden="true">→</span>
                                    </a>
                                </div>
                            </article>
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
}

export default Projects;
