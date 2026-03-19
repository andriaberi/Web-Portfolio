import {useEffect, useState} from 'react';
import Navbar from '../includes/navbar';
import profilePicture from '../../images/about-me-image.jpg';
import {getBooks} from '../helpers/fetch';

function About() {
    const [books, setBooks] = useState([]);

    useEffect(() => {
        getBooks().then(data => setBooks(data));
    }, []);

    return (
        <>
            <Navbar activePage="about"/>
            <section className="page-about">
                <div className="about-hero">
                    <div className="image-area">
                        <img src={profilePicture} alt="Andria Beridze profile picture"/>
                    </div>
                    <div className="text-area">
                        <h1 className="about-header">About <span>Me</span></h1>
                        <div className="about-body">
                            <p>Computer science student at Drexel University, Philadelphia. My interest in software
                                started with curiosity about how things work — and grew into a passion for building
                                systems that feel thoughtful, useful, and fast.</p>
                            <p>I love the intersection of rigorous algorithmic thinking and practical engineering. I
                                compete internationally in competitive programming, ship real products, and iterate
                                constantly — learning through feedback as much as through code.</p>
                            <p>Originally from Georgia. I think in three languages and code in about eight.</p>
                        </div>
                        <div className="about-facts-grid">
                            <div className="fact"><span className="fact-val">Drexel University</span><span
                                className="fact-key">Currently at</span></div>
                            <div className="fact"><span className="fact-val">June 2029</span><span
                                className="fact-key">Graduation</span></div>
                            <div className="fact"><span className="fact-val">Georgian · Russian · English</span><span
                                className="fact-key">Languages</span></div>
                            <div className="fact"><span className="fact-val">C++ · Python · JavaScript</span><span
                                className="fact-key">Primary stack</span></div>
                        </div>
                    </div>
                </div>
                <div className="about-body-grid">
                    <div className="about-col">
                        <h2 className="about-col-title">Reading <em>List</em></h2>
                        <div className="reading-list">
                            {books.map((book, i) => {
                                const statusClass =
                                    book.status === 'reading' ? ' reading' :
                                        book.status === 'done' ? ' done' : '';
                                const statusLabel =
                                    book.status === 'up next' ? 'Up next' :
                                        book.status.charAt(0).toUpperCase() + book.status.slice(1);

                                return (
                                    <div className="book-item" key={i}>
                                        <span className={`book-status${statusClass}`}>{statusLabel}</span>
                                        <div className="book-info">
                                            <div className="book-title">{book.title}</div>
                                            <div className="book-author">{book.author}</div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                    <div className="about-col">
                        <h2 className="about-col-title">Technical <em>Skills</em></h2>
                        <div className="skills-grid">
                            <div className="skill-group">
                                <div className="skill-group-label">Languages</div>
                                <div className="skill-pills">
                                    <span className="pill">C++</span><span className="pill">Python</span><span
                                    className="pill">Scala</span>
                                    <span className="pill">C</span><span className="pill">Java</span><span
                                    className="pill">JavaScript</span>
                                    <span className="pill">C#</span><span className="pill">SQL</span><span
                                    className="pill">Bash</span>
                                </div>
                            </div>
                            <div className="skill-group">
                                <div className="skill-group-label">Frameworks &amp; Libraries</div>
                                <div className="skill-pills">
                                    <span className="pill">Django</span><span className="pill">React</span><span
                                    className="pill">PyTorch</span>
                                    <span className="pill">TensorFlow</span><span
                                    className="pill">Apache Spark</span><span className="pill">NumPy</span>
                                    <span className="pill">Pandas</span>
                                </div>
                            </div>
                            <div className="skill-group">
                                <div className="skill-group-label">Tools &amp; Platforms</div>
                                <div className="skill-pills">
                                    <span className="pill">AWS</span><span className="pill">Git</span><span
                                    className="pill">Linux</span>
                                    <span className="pill">VS Code</span><span className="pill">IntelliJ</span>
                                </div>
                            </div>
                            <div className="skill-group">
                                <div className="skill-group-label">Methodologies</div>
                                <div className="skill-pills">
                                    <span className="pill">Agile</span><span className="pill">Scrum</span><span
                                    className="pill">CI/CD</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <section className="about-expertise" id="expertise">
                    <div className="expertise-top">
                        <div className="expertise-text"><h2 className="expertise-header">Core <span>Expertise</span></h2><p
                            className="expertise-subtitle">I focus on building production-ready features that are clean,
                            reliable, and easy to evolve — from API design to UI polish.</p></div>
                        <div className="expertise-highlights">
                            <div className="expertise-highlight">
                                <div className="expertise-highlight-icon"><i className="bi bi-stack"></i></div>
                                <div className="expertise-highlight-text">
                                    <div className="expertise-highlight-label">Full-stack mindset</div>
                                    <div className="expertise-highlight-value">Backend → UI → deployment</div>
                                </div>
                            </div>
                            <div className="expertise-highlight">
                                <div className="expertise-highlight-icon"><i className="bi bi-shield-check"></i></div>
                                <div className="expertise-highlight-text">
                                    <div className="expertise-highlight-label">Reliable delivery</div>
                                    <div className="expertise-highlight-value">Validation, error handling, tests</div>
                                </div>
                            </div>
                            <div className="expertise-highlight">
                                <div className="expertise-highlight-icon"><i className="bi bi-speedometer2"></i></div>
                                <div className="expertise-highlight-text">
                                    <div className="expertise-highlight-label">Performance aware</div>
                                    <div className="expertise-highlight-value">Fast pages, efficient queries</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="expertise-work">
                        <div className="expertise-principles"><h2 className="expertise-subheader">How I work</h2>
                            <ul className="expertise-list">
                                <li className="expertise-list-item"><i className="bi bi-check2-circle"></i><span>Build for clarity first, optimize when needed</span>
                                </li>
                                <li className="expertise-list-item"><i className="bi bi-check2-circle"></i><span>Ship small, iterate fast, measure impact</span>
                                </li>
                                <li className="expertise-list-item"><i className="bi bi-check2-circle"></i><span>Keep code readable and easy to maintain</span>
                                </li>
                                <li className="expertise-list-item"><i className="bi bi-check2-circle"></i><span>Think in systems, not just features</span>
                                </li>
                            </ul>
                            <div className="expertise-cta"><a className="expertise-button"><i
                                className="bi bi-folder2-open"></i><span>View Projects</span></a><a className="expertise-link">Let’s
                                build something <i className="bi bi-arrow-right"></i></a></div>
                        </div>
                    </div>
                </section>
            </section>
        </>
    );
}

export default About;