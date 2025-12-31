import { useEffect, useMemo, useState } from "react";

function formatMonthYear(dateStr) {
    if (!dateStr) return "";
    const d = new Date(dateStr);
    if (Number.isNaN(d.getTime())) return dateStr;
    return d.toLocaleDateString(undefined, { year: "numeric", month: "short" });
}

function Achievements() {
    const [items, setItems] = useState([]);
    const [status, setStatus] = useState("idle"); // idle | loading | success | error
    const [query, setQuery] = useState("");
    const [errorMsg, setErrorMsg] = useState("");

    useEffect(() => {
        let mounted = true;

        async function load() {
            try {
                setStatus("loading");
                setErrorMsg("");

                const res = await fetch("/api/achievements", {
                    headers: { Accept: "application/json" },
                });

                if (!res.ok) throw new Error(`Request failed (${res.status})`);

                const data = await res.json();
                if (!mounted) return;

                setItems(Array.isArray(data) ? data : []);
                setStatus("success");
            } catch (err) {
                if (!mounted) return;
                setStatus("error");
                setErrorMsg(err?.message || "Failed to load achievements");
            }
        }

        load();
        return () => {
            mounted = false;
        };
    }, []);

    const filtered = useMemo(() => {
        const q = query.trim().toLowerCase();
        if (!q) return items;

        return items.filter((a) => {
            const title = (a.title || "").toLowerCase();
            const issuer = (a.issuer || "").toLowerCase();
            const desc = (a.description || "").toLowerCase();
            return title.includes(q) || issuer.includes(q) || desc.includes(q);
        });
    }, [items, query]);

    return (
        <section className="achievements" id="achievements">
            <div className="achievements-container">
                <header className="achievements-header">
                    <div className="achievements-heading">
                        <h2 className="achievements-title">Achievements</h2>
                        <p className="achievements-subtitle">
                            Certifications, awards, and milestones.
                        </p>
                    </div>

                    <div className="achievements-controls">
                        <div className="achievements-search">
                            <i className="bi bi-search achievements-search-icon" aria-hidden="true"></i>
                            <input
                                className="achievements-search-input"
                                type="text"
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                placeholder="Search achievements..."
                                aria-label="Search achievements"
                            />
                        </div>
                    </div>
                </header>

                {status === "loading" && (
                    <div className="achievements-state" role="status" aria-live="polite">
                        <div className="achievements-skeleton-grid">
                            {Array.from({ length: 6 }).map((_, idx) => (
                                <div className="achievements-skeleton-card" key={idx}>
                                    <div className="achievements-skeleton-inner">
                                        <div className="achievements-skeleton-img" />
                                        <div className="achievements-skeleton-text">
                                            <div className="achievements-skeleton-line line-lg" />
                                            <div className="achievements-skeleton-line line-md" />
                                            <div className="achievements-skeleton-line line-sm" />
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {status === "error" && (
                    <div className="achievements-state achievements-state-error" role="alert">
                        <div className="achievements-state-inner">
                            <i className="bi bi-exclamation-triangle achievements-state-icon" aria-hidden="true"></i>
                            <div>
                                <div className="achievements-state-title">Couldn’t load achievements</div>
                                <div className="achievements-state-text">{errorMsg}</div>
                            </div>
                        </div>
                    </div>
                )}

                {status === "success" && filtered.length === 0 && (
                    <div className="achievements-state">
                        <div className="achievements-state-inner">
                            <i className="bi bi-inbox achievements-state-icon" aria-hidden="true"></i>
                            <div>
                                <div className="achievements-state-title">No achievements found</div>
                                <div className="achievements-state-text">Try a different search.</div>
                            </div>
                        </div>
                    </div>
                )}

                {status === "success" && filtered.length > 0 && (
                    <div className="achievements-grid">
                        {filtered.map((a, idx) => (
                            <article className="achievements-card" key={`${a.title}-${a.issuer}-${idx}`}>
                                <div className="achievements-media">
                                    {a.image ? (
                                        <img
                                            className="achievements-img"
                                            src={a.image}
                                            alt={`${a.title || "Achievement"} image`}
                                            loading="lazy"
                                        />
                                    ) : (
                                        <div className="achievements-placeholder" aria-hidden="true">
                                            <i className="bi bi-award achievements-placeholder-icon" aria-hidden="true"></i>
                                        </div>
                                    )}
                                </div>

                                <div className="achievements-body">
                                    <div className="achievements-meta">
                    <span className="achievements-issuer">
                      <i className="bi bi-building" aria-hidden="true"></i>
                        {a.issuer || "—"}
                    </span>

                                        <span className="achievements-date">
                      <i className="bi bi-calendar3" aria-hidden="true"></i>
                                            {formatMonthYear(a.issue_date) || "—"}
                    </span>
                                    </div>

                                    <h3 className="achievements-card-title">{a.title}</h3>

                                    {a.description ? (
                                        <p className="achievements-desc">{a.description}</p>
                                    ) : (
                                        <p className="achievements-desc achievements-desc-muted">
                                            No description provided.
                                        </p>
                                    )}
                                </div>

                                <div className="achievements-shine" aria-hidden="true"></div>
                            </article>
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
}

export default Achievements;
