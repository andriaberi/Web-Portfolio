import aboutMeImage from "../../images/about-me-image.jpg";

function About() {
    return (
        <>
            <section className="about" id="about">
                <div className="image-area reveal">
                    <img src={ aboutMeImage } alt="About Me" />
                </div>
                <div className="text-area">
                    <h1 className="about-header">About <span style={{ color: "var(--secondary)" }}>Me</span></h1>
                    <div className="about-body">
                        <p>I’m a computer scientist based in Philadelphia, currently studying at Drexel University. My interest in software started with curiosity about how things work and grew into a passion for building systems that feel thoughtful, useful, and well designed.</p>
                        <p>As my journey has progressed — now in my second year of Computer Science — I’ve learned that writing code is only part of the process. I enjoy experimenting, building real projects, and improving ideas through iteration and feedback.</p>
                        <p>Outside of classes, I spend time learning about startups, product thinking, and the people behind the technology. I’m driven by curiosity, growth, and the challenge of turning ideas into something real.</p>
                    </div>

                </div>
            </section>
        </>
    )
}

export default About;