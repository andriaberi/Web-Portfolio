import { useEffect, useState } from 'react';
import Navbar from '../includes/navbar';
import profilePicture from '../../images/about-me-image.jpg';
import { getBooks } from '../helpers/fetch';

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
                            <div className="fact"><span className="fact-val">Drexel University</span><span className="fact-key">Currently at</span></div>
                            <div className="fact"><span className="fact-val">June 2029</span><span className="fact-key">Graduation</span></div>
                            <div className="fact"><span className="fact-val">Georgian · Russian · English</span><span className="fact-key">Languages</span></div>
                            <div className="fact"><span className="fact-val">C++ · Python · JavaScript</span><span className="fact-key">Primary stack</span></div>
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
                                    <span className="pill">C++</span><span className="pill">Python</span><span className="pill">Scala</span>
                                    <span className="pill">C</span><span className="pill">Java</span><span className="pill">JavaScript</span>
                                    <span className="pill">C#</span><span className="pill">SQL</span><span className="pill">Bash</span>
                                </div>
                            </div>
                            <div className="skill-group">
                                <div className="skill-group-label">Frameworks &amp; Libraries</div>
                                <div className="skill-pills">
                                    <span className="pill">Django</span><span className="pill">React</span><span className="pill">PyTorch</span>
                                    <span className="pill">TensorFlow</span><span className="pill">Apache Spark</span><span className="pill">NumPy</span>
                                    <span className="pill">Pandas</span>
                                </div>
                            </div>
                            <div className="skill-group">
                                <div className="skill-group-label">Tools &amp; Platforms</div>
                                <div className="skill-pills">
                                    <span className="pill">AWS</span><span className="pill">Git</span><span className="pill">Linux</span>
                                    <span className="pill">VS Code</span><span className="pill">IntelliJ</span>
                                </div>
                            </div>
                            <div className="skill-group">
                                <div className="skill-group-label">Methodologies</div>
                                <div className="skill-pills">
                                    <span className="pill">Agile</span><span className="pill">Scrum</span><span className="pill">CI/CD</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default About;