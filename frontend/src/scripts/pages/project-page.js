import React, { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import NotFound from "./not-found";

function safeUrl(src) {
    if (!src || typeof src !== "string") return "";
    const s = src.trim();
    if (!s) return "";
    if (s.startsWith("http://") || s.startsWith("https://")) return s;
    if (s.startsWith("/")) return s;
    if (s.startsWith("media/") || s.startsWith("static/")) return `/${s}`;
    return `/${s}`;
}

function isNotFoundPayload(data) {
    if (!data || typeof data !== "object" || Array.isArray(data)) return true;
    if (typeof data.detail === "string") return true;
    if (!data.title && !data.slug) return true;
    return false;
}

export default function ProjectPage() {
    const { slug } = useParams();

    const [project, setProject] = useState(null);
    const [status, setStatus] = useState("loading"); // loading | ready | notfound | error
    const [error, setError] = useState("");
    const [imgOk, setImgOk] = useState(true);

    useEffect(() => {
        const controller = new AbortController();

        async function load() {
            try {
                setStatus("loading");
                setError("");
                setProject(null);
                setImgOk(true);

                const res = await fetch(`/api/projects/${encodeURIComponent(slug)}`, {
                    headers: { Accept: "application/json" },
                    signal: controller.signal,
                });

                if (res.status === 404) {
                    setStatus("notfound");
                    return;
                }
                if (!res.ok) throw new Error(`Request failed: ${res.status}`);

                const data = await res.json();
                if (isNotFoundPayload(data)) {
                    setStatus("notfound");
                    return;
                }

                setProject(data);
                setStatus("ready");
            } catch (e) {
                if (controller.signal.aborted) return;
                setStatus("error");
                setError(e?.message || "Failed to load project.");
            }
        }

        if (slug) load();
        else setStatus("notfound");

        return () => controller.abort();
    }, [slug]);

    const tech = useMemo(() => {
        const t = project?.tech_stack;
        if (Array.isArray(t)) return t.filter(Boolean);
        if (typeof t === "string" && t.trim()) return t.split(",").map((x) => x.trim()).filter(Boolean);
        return [];
    }, [project]);

    const features = useMemo(() => {
        const f = project?.key_features;
        if (Array.isArray(f)) return f.filter(Boolean);
        if (typeof f === "string" && f.trim()) return f.split("\n").map((x) => x.trim()).filter(Boolean);
        return [];
    }, [project]);

    const architecture = useMemo(() => {
        const a = project?.architecture;
        if (!a) return [];

        // ✅ Your API: [{label, value}, ...]
        if (Array.isArray(a) && a.length && typeof a[0] === "object" && !Array.isArray(a[0])) {
            return a
                .map((row) => {
                    const left = row?.label ?? "";
                    const right = row?.value ?? "";
                    if (!left && !right) return null;
                    return [String(left), String(right)];
                })
                .filter(Boolean);
        }

        return [];
    }, [project]);

    const caseStudy = useMemo(() => {
        const cs = project?.case_study || {};
        const items = [
            ["Problem statement", cs.problem_statement || project?.problem_statement],
            ["Solution overview", cs.solution_overview || project?.solution_overview],
            ["Challenges", cs.challenges || project?.challenges],
            ["Outcome", cs.outcome || project?.outcome],
        ];
        return items.filter(([, v]) => !!v);
    }, [project]);

    if (status === "notfound") return <NotFound />;

    return (
        <main className="pp">
            <div className="pp-container">
                {/* Top bar */}
                <header className="pp-top">
                    <Link className="pp-back" to="/#projects" aria-label="Back to projects">
                        <i className="bi bi-arrow-left" aria-hidden="true" /> Back
                    </Link>

                    <nav className="pp-crumb" aria-label="Breadcrumb">
                        <Link to="/#projects">
                            <i className="bi bi-grid-3x3-gap" aria-hidden="true" /> Projects
                        </Link>
                        <span aria-hidden="true">/</span>
                        <span className="pp-crumb-current">{project?.title || slug}</span>
                    </nav>

                    <span className="pp-badge">
            <i className="bi bi-tag" aria-hidden="true" /> {project?.category || "Project"}
          </span>
                </header>

                {/* Loading / Error */}
                {status === "loading" && (
                    <section className="pp-shell">
                        <div className="pp-state">
                            <i className="bi bi-arrow-repeat" aria-hidden="true" /> Loading…
                        </div>
                    </section>
                )}

                {status === "error" && (
                    <section className="pp-shell">
                        <div className="pp-state pp-state-error">
                            <b>
                                <i className="bi bi-exclamation-triangle" aria-hidden="true" /> Couldn’t load project.
                            </b>
                            <div className="pp-muted">{error}</div>
                        </div>
                    </section>
                )}

                {/* Content */}
                {status === "ready" && project && (
                    <>
                        {/* Hero */}
                        <section className="pp-shell">
                            <div className="pp-hero">
                                <div className="pp-media">
                                    {project.thumbnail && imgOk ? (
                                        <img
                                            className="pp-img"
                                            src={safeUrl(project.thumbnail)}
                                            alt={`${project.title} thumbnail`}
                                            loading="lazy"
                                            onError={() => setImgOk(false)}
                                        />
                                    ) : (
                                        <div className="pp-media-fallback" aria-hidden="true">
                                            <i className="bi bi-image" aria-hidden="true" /> No thumbnail
                                        </div>
                                    )}
                                </div>

                                <div className="pp-main">
                                    <div className="pp-meta">
                                        {project.project_type ? (
                                            <span className="pp-chip">
                        <i className="bi bi-folder2-open" aria-hidden="true" /> {project.project_type}
                      </span>
                                        ) : null}

                                        {project.date_completed ? (
                                            <span className="pp-chip">
                        <i className="bi bi-calendar-check" aria-hidden="true" /> {project.date_completed}
                      </span>
                                        ) : null}

                                        {project.role ? (
                                            <span className="pp-chip">
                        <i className="bi bi-person-badge" aria-hidden="true" /> {project.role}
                      </span>
                                        ) : null}

                                        {project.team_size != null && project.team_size !== "" ? (
                                            <span className="pp-chip">
                        <i className="bi bi-people" aria-hidden="true" /> {project.team_size}
                      </span>
                                        ) : null}
                                    </div>

                                    <h1 className="pp-title">{project.title}</h1>
                                    <p className="pp-subtitle">{project.short_description || ""}</p>

                                    <div className="pp-cta">
                                        {project.github_url ? (
                                            <a className="pp-btn pp-btn-primary" href={project.github_url} target="_blank" rel="noreferrer">
                                                <i className="bi bi-github" aria-hidden="true" /> Repo <i className="bi bi-box-arrow-up-right" aria-hidden="true" />
                                            </a>
                                        ) : null}

                                        {project.live_url ? (
                                            <a className="pp-btn" href={project.live_url} target="_blank" rel="noreferrer">
                                                <i className="bi bi-globe2" aria-hidden="true" /> Live <i className="bi bi-box-arrow-up-right" aria-hidden="true" />
                                            </a>
                                        ) : null}

                                        {project.video_demo ? (
                                            <a className="pp-btn" href={project.video_demo} target="_blank" rel="noreferrer">
                                                <i className="bi bi-play-circle" aria-hidden="true" /> Demo <i className="bi bi-box-arrow-up-right" aria-hidden="true" />
                                            </a>
                                        ) : null}
                                    </div>
                                </div>

                                <aside className="pp-side">
                                    <h2 className="pp-h2">
                                        <i className="bi bi-info-circle" aria-hidden="true" /> Details
                                    </h2>

                                    <dl className="pp-dl">
                                        {project.project_type ? (
                                            <>
                                                <dt>Type</dt>
                                                <dd>{project.project_type}</dd>
                                            </>
                                        ) : null}

                                        {project.date_completed ? (
                                            <>
                                                <dt>Completed</dt>
                                                <dd>{project.date_completed}</dd>
                                            </>
                                        ) : null}
                                    </dl>

                                    {tech.length > 0 && (
                                        <>
                                            <h3 className="pp-h3">
                                                <i className="bi bi-code-slash" aria-hidden="true" /> Tech Stack
                                            </h3>

                                            <div className="pp-tags">
                                                {tech.map((t) => (
                                                    <span className="pp-tag" key={t}>
                            {t}
                          </span>
                                                ))}
                                            </div>
                                        </>
                                    )}
                                </aside>
                            </div>
                        </section>

                        {/* Sections */}
                        <section className="pp-grid">
                            <article className="pp-card">
                                <h2 className="pp-h2">
                                    <i className="bi bi-file-text" aria-hidden="true" /> Overview
                                </h2>
                                <p className="pp-p">{project.description || project.short_description || ""}</p>
                            </article>

                            {features.length > 0 && (
                                <article className="pp-card">
                                    <h2 className="pp-h2">
                                        <i className="bi bi-stars" aria-hidden="true" /> Key Features
                                    </h2>
                                    <ul className="pp-list">
                                        {features.map((f) => (
                                            <li key={f}>{f}</li>
                                        ))}
                                    </ul>
                                </article>
                            )}

                            {architecture.length > 0 && (
                                <article className="pp-card pp-card-wide">
                                    <h2 className="pp-h2">
                                        <i className="bi bi-diagram-3" aria-hidden="true" /> Architecture
                                    </h2>

                                    <div className="pp-rows">
                                        {architecture.map(([left, right], i) => (
                                            <div className="pp-row" key={`${left}-${i}`}>
                                                <div className="pp-row-left">{left}</div>
                                                <div className="pp-row-right">{right}</div>
                                            </div>
                                        ))}
                                    </div>
                                </article>
                            )}

                            {caseStudy.length > 0 && (
                                <article className="pp-card pp-card-wide">
                                    <h2 className="pp-h2">
                                        <i className="bi bi-clipboard-check" aria-hidden="true" /> Case Study
                                    </h2>

                                    <div className="pp-case">
                                        {caseStudy.map(([k, v]) => (
                                            <div className="pp-case-item" key={k}>
                                                <b>{k}:</b>
                                                <p>{v}</p>
                                            </div>
                                        ))}
                                    </div>
                                </article>
                            )}
                        </section>
                    </>
                )}
            </div>
        </main>
    );
}
