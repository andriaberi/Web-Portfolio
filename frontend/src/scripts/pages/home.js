import Navbar from '../includes/navbar'
import { getProjects, getAchievements, getMaxCodeforcesRating } from '../helpers/fetch'
import { useState, useEffect, useRef } from 'react'
import resume from '../../documents/resume.pdf'

function animateValue(setter, target, duration = 2000, isDecimal = false) {
    return new Promise(resolve => {
        const start = performance.now();

        const step = (now) => {
            const progress = Math.min((now - start) / duration, 1);

            const eased = 1 - Math.pow(1 - progress, 5); // ease-out

            const value = eased * target;

            setter(
                isDecimal
                    ? parseFloat((Math.round(value * 100) / 100).toFixed(2))
                    : Math.round(value)
            );

            if (progress < 1) requestAnimationFrame(step);
            else resolve();
        };

        requestAnimationFrame(step);
    });
}

function Home() {
    const [gpa, setGpa] = useState(0);
    const [rating, setRating] = useState(0);
    const [projectCount, setProjectCount] = useState(0);
    const [achievementCount, setAchievementCount] = useState(0);
    const [problemsSolved, setProblemsSolved] = useState(0);
    const hasRun = useRef(false);

    useEffect(() => {
        if (hasRun.current) return;
        hasRun.current = true;

        Promise.all([
            getProjects(),
            getAchievements(),
            getMaxCodeforcesRating(),
        ]).then(([projects, achievements, cf]) => {
            animateValue(setGpa, 4.0, 2000, true);
            animateValue(setRating, cf ?? 1900, 2000);
            animateValue(setProjectCount, projects.length, 2000);
            animateValue(setAchievementCount, achievements.length, 2000);
            animateValue(setProblemsSolved, 2000, 2500);
        });
    }, []);

    return (
        <>
            <Navbar activePage="home"/>
            <section className="hero" id="hero">
                <div className="hero-main">
                    <div className="hero-left">
                        <h1 className="hero-name">
                            Hi, I'm
                            <span>Andria</span>
                        </h1>
                        <div className="hero-tagline">
                            <span className="tagline-text">Computer Scientist &amp; Competitive Programmer</span>
                        </div>
                        <div className="button-container">
                            <a href={resume} download="andria_beridze_resume.pdf" className="hero-btn">Download Resume</a>
                            <a href="/about" className="hero-btn">About Me</a>
                        </div>
                    </div>
                </div>
                <div className="hero-bottom">
                    <div className="hb-stat">
                        <span className="hb-val">{rating}</span>
                        <span className="hb-label">Max Codeforces Rating</span>
                    </div>
                    <div className="hb-stat">
                        <span className="hb-val">{problemsSolved.toLocaleString()}{problemsSolved === 2000 ? '+' : ''}</span>
                        <span className="hb-label">Problems Solved</span>
                    </div>
                    <div className="hb-stat">
                        <span className="hb-val">{projectCount}</span>
                        <span className="hb-label">Projects Completed</span>
                    </div>
                    <div className="hb-stat">
                        <span className="hb-val">{achievementCount}</span>
                        <span className="hb-label">Awards & Achievements</span>
                    </div>
                    <div className="hb-stat">
                        <span className="hb-val">{gpa.toFixed(2)}</span>
                        <span className="hb-label">GPA · Drexel CS</span>
                    </div>
                </div>
            </section>
        </>
    );
}

export default Home;