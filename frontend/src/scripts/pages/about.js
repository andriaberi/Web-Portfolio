import Navbar from '../includes/navbar'

import profilePicture from '../../images/about-me-image.jpg'

function About() {
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
            </section>
        </>
    );
}

export default About;