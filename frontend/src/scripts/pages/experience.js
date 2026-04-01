import {useEffect, useState} from 'react';
import Navbar from '../includes/navbar';
import {getExperiences, getAchievements} from '../helpers/fetch';

function Experience() {
    const [experiences, setExperiences] = useState([]);
    const [achievements, setAchievements] = useState([]);
    const [openJobs, setOpenJobs] = useState({});

    useEffect(() => {
        getExperiences().then(data => setExperiences(data));
        getAchievements().then(data => setAchievements(data));
    }, []);

    const toggleJob = (index) => {
        setOpenJobs(prev => ({...prev, [index]: !prev[index]}));
    };

    return (
        <>
            <Navbar activePage="experience"/>
            <div className="page" id="page-exp">
                <div className="exp-page-header">
                    <h1 className="exp-page-title">Work &amp;<em>Co-ops</em></h1>
                    <p className="exp-page-sub">Drexel's co-op program provides 6-month industry rotations built into the
                        degree. Two remaining co-ops — September 2026 and September 2027.</p>
                </div>

                <div className="coops-timeline">
                    <h2 className="coops-title">Co-op <em>Timeline</em></h2>
                    <div className="timeline-grid">
                        <div className="tl-item">
                            <div className="tl-period">Sep 2025 – Mar 2026</div>
                            <div className="tl-company">Penn Mutual</div>
                            <div className="tl-role">Software Engineer Co-op · AWS Data Pipelines</div>
                            <span className="tl-status done">Done</span>
                        </div>
                        <div className="tl-item upcoming">
                            <div className="tl-period">Sep 2026 – Mar 2027</div>
                            <div className="tl-company">Co-op 2</div>
                            <div className="tl-role">Targeting Jane Street · Citadel · Google</div>
                            <span className="tl-status upcoming">Applying</span>
                        </div>
                        <div className="tl-item upcoming">
                            <div className="tl-period">Sep 2027 – Mar 2028</div>
                            <div className="tl-company">Co-op 3</div>
                            <div className="tl-role">Targeting Research Co-op or Return Offer</div>
                            <span className="tl-status upcoming">Future</span>
                        </div>
                    </div>
                </div>

                <div className="jobs-section">
                    <h2 className="jobs-section-title">All <em>Roles</em></h2>
                    <div className="jobs">
                        {experiences.map((exp, i) => (
                            <div
                                key={exp.index}
                                className={`job${openJobs[i] ? ' open' : ''}`}
                                onClick={() => toggleJob(i)}
                            >
                                <div className="job-bar">
                                    <div className="job-index">{exp.index}</div>
                                    <div className="job-main">
                                        <div className="job-title-row">
                                            <span className="job-title">{exp.title}</span>
                                            <span className="job-status">{exp.job_type}</span>
                                        </div>
                                        <div className="job-company">{exp.company} - {exp.location}</div>
                                    </div>
                                    <div className="job-dates">
                                        <span className="job-range">{exp.start_date} – {exp.end_date}</span>
                                        <span className="job-dur-label">{exp.duration_label}</span>
                                    </div>
                                </div>
                                <div className="job-drawer">
                                    <div className="drawer-inner">
                                        <div>
                                            {exp.details?.length > 0 && (
                                                <div className="bullets">
                                                    {exp.details.map((detail, j) => (
                                                        <div key={j} className="bullet">{detail}</div>
                                                    ))}
                                                </div>
                                            )}
                                            {exp.tech_stack?.length > 0 && (
                                                <>
                                                    <div className="stack-label">Stack</div>
                                                    <div className="stack-pills">
                                                        {exp.tech_stack.map((tech, j) => (
                                                            <span key={j} className="pill">{tech}</span>
                                                        ))}
                                                    </div>
                                                </>
                                            )}
                                        </div>
                                        {exp.metrics?.length > 0 && (
                                            <div>
                                                <div className="stack-label">Impact</div>
                                                <div className="metrics">
                                                    {exp.metrics.map((metric, j) => (
                                                        <div key={j}>
                                                            <div className="metric-val">{metric.value}</div>
                                                            <div className="metric-label">{metric.label}</div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="achievements-section">
                    <h2 className="ach-section-title">Achievements &amp;<em>Recognition</em></h2>
                    <div className="timeline">
                        {achievements.map((ach, i) => (
                            <div key={i} className="ach-row">
                                <div className="ach-date">
                                    <span className="ach-year">{ach.year}</span>
                                    <span className="ach-month">{ach.month}</span>
                                </div>
                                <div className="ach-node"></div>
                                <div className="ach-content">
                                    <div className="ach-issuer-row">
                                        <span className="ach-issuer">{ach.issuer}</span>
                                        <span className={`ach-type${ach.achievement_type === 'Academic' ? ' academic' : ''}`}>
                                            {ach.achievement_type}
                                        </span>
                                    </div>
                                    <div className="ach-name">{ach.title}</div>
                                    <div className="ach-desc">{ach.description}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}

export default Experience;