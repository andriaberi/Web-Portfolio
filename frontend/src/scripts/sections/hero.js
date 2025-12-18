import { useRef } from "react";
import HeroTyping from "../components/hero-typing";
import { smoothScrollTo } from "../helpers/smooth-scroll";
import heroImage from "../../images/hero-image.png";

export default function Hero() {
    const imageAreaRef = useRef(null);
    const rotatingFrameRef = useRef(null);
    const imageFrameRef = useRef(null);

    const isDesktop = () => {
        return window.innerWidth > 1024 && !/Mobi|Android|iPad|Tablet/i.test(navigator.userAgent);
    };

    const handleMouseMove = (e) => {
        const area = imageAreaRef.current;
        const frame = rotatingFrameRef.current;
        const image = imageFrameRef.current;

        if (!area || !frame || !image) return;

        const rect = area.getBoundingClientRect();
        const offsetX = e.clientX - rect.left; // mouse X inside area
        const offsetY = e.clientY - rect.top;  // mouse Y inside area

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const moveX = -(offsetX - centerX) / 40; // adjust sensitivity
        const moveY = -(offsetY - centerY) / 40;

        // opposite directions
        if (isDesktop()) area.style.transform = `translate(${moveX}px, ${moveY}px)`;
    };

    const handleMouseLeave = () => {
        if (rotatingFrameRef.current && imageFrameRef.current) {
            rotatingFrameRef.current.style.transform = "translate(-50%, -50%)";
            imageFrameRef.current.style.transform = "translate(0, 0)";
        }
    };

    const scrollToContact = () => {
        const target = document.getElementById("contact");
        if (!target) return;
        if (/Mobi|Android/i.test(navigator.userAgent)) {
            target.scrollIntoView({ behavior: "smooth" });
        } else {
            smoothScrollTo(target.offsetTop, 1400);
        }
    };

    return (
        <>
            <section className="home" id="home"></section>
            <section className="hero" id="hero">
                <div className="hero-content">
                    <div className="text-area">
                        <div className="location-tag">
                            <i className="bi bi-geo-alt"></i> Philadelphia, PA
                        </div>
                        <h1>Hi, I’m Andria</h1>
                        <HeroTyping />
                        <div className="button-container">
                            <a
                                href="documents/resume.pdf"
                                download="andria_beridze_resume.pdf"
                                className="hero-btn"
                            >
                                Download Resume
                            </a>
                            <a className="hero-btn" onClick={scrollToContact}>
                                Contact
                            </a>
                        </div>
                    </div>

                    <div
                        className="image-area reveal"
                        ref={imageAreaRef}
                        onMouseMove={handleMouseMove}
                        onMouseLeave={handleMouseLeave}
                    >
                        <div className="rotating-frame" ref={rotatingFrameRef}></div>
                        <div className="image-frame" ref={imageFrameRef}>
                            <img src={heroImage} alt="Hero" />
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
