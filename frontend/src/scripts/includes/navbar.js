import { useState, useRef, useEffect } from "react";
import { smoothScrollTo } from "../helpers/smooth-scroll";

function Navbar() {
    const navItems = ["Home", "About", "Experience", "Expertise", "Projects", "Achievements", "Contact"];

    const [activeIndex, setActiveIndex] = useState(0);
    const [menuOpen, setMenuOpen] = useState(false);

    const navRef = useRef(null);
    const isProgrammaticScroll = useRef(false);
    const scrollTargetIndex = useRef(null);
    const clickedIndexRef = useRef(null);
    const lastHash = useRef("");

    const slugify = (label) => label.trim().toLowerCase().replace(/\s+/g, "-");

    const toggleMenu = () => {
        setMenuOpen((prev) => !prev);
    };

    // Scroll spy & url update
    useEffect(() => {
        const isSectionInView = (section) => {
            if (!section) return false;
            const rect = section.getBoundingClientRect();
            const viewportCenter = window.innerHeight / 2;
            return rect.top <= viewportCenter && rect.bottom >= viewportCenter;
        };

        const handleScroll = () => {
            const viewportCenter = window.scrollY + window.innerHeight / 2;

            let closestIndex = 0;
            let closestDistance = Infinity;

            navItems.forEach((label, index) => {
                const section = document.getElementById(slugify(label));
                if (!section) return;

                const rect = section.getBoundingClientRect();
                const sectionCenter = rect.top + window.scrollY + rect.height / 2;

                const distance = Math.abs(viewportCenter - sectionCenter);
                if (distance < closestDistance) {
                    closestDistance = distance;
                    closestIndex = index;
                }
            });

            if (isProgrammaticScroll.current) {
                const targetSection = document.getElementById(
                    slugify(navItems[scrollTargetIndex.current])
                );
                if (!isSectionInView(targetSection)) return;

                isProgrammaticScroll.current = false;
                clickedIndexRef.current = null;
                scrollTargetIndex.current = null;
            }

            setActiveIndex(closestIndex);

            const nextHash = `#${slugify(navItems[closestIndex])}`;
            if (lastHash.current !== nextHash) {
                window.history.replaceState(null, "", nextHash);
                lastHash.current = nextHash;
            }
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        handleScroll();

        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => {
        document.body.style.overflow = menuOpen ? "hidden" : "";
        return () => { document.body.style.overflow = ""; };
    }, [menuOpen]);

    const handleNavClick = (index) => {
        isProgrammaticScroll.current = true;
        scrollTargetIndex.current = index;
        clickedIndexRef.current = index;

        const slug = slugify(navItems[index]);
        const target = document.getElementById(slug);
        if (!target) return;

        window.history.replaceState(null, "", `#${slug}`);
        lastHash.current = `#${slug}`;

        if (/Mobi|Android/i.test(navigator.userAgent)) {
            target.scrollIntoView({ behavior: "smooth" });
        } else {
            smoothScrollTo(target.offsetTop, 1400);
        }

        setActiveIndex(index);
        setMenuOpen(false); // close mobile menu on nav click
    };

    return (
        <nav className="navbar" aria-label="Primary navigation">
            <span className="nav-logo">Andria <span>Beridze</span></span>

            {/* Desktop nav list */}
            <ul className="nav-items" ref={navRef}>
                {navItems.map((label, index) => {
                    const slug = slugify(label);
                    return (
                        <li
                            key={slug}
                            className={`nav-item${activeIndex === index ? " active" : ""}`}
                            onClick={() => handleNavClick(index)}
                        >
                            <a className="nav-link">{label.toUpperCase()}</a>
                        </li>
                    );
                })}
            </ul>

            {/* Hamburger button */}
            <div
                className={`nav-hamburger${menuOpen ? " open" : ""}`}
                id="hamburger"
                onClick={toggleMenu}
                aria-label="Toggle mobile menu"
                aria-expanded={menuOpen}
            >
                <span></span>
                <span></span>
                <span></span>
            </div>

            {/* Mobile menu */}
            <div className={`mobile-menu${menuOpen ? " open" : ""}`} aria-hidden={!menuOpen}>
                <ul className="mobile-nav-items">
                    {navItems.map((label, index) => {
                        const slug = slugify(label);
                        return (
                            <li
                                key={slug}
                                className={`mobile-nav-item${activeIndex === index ? " active" : ""}`}
                                onClick={() => handleNavClick(index)}
                            >
                                <a className="mobile-nav-link">{label.toUpperCase()}</a>
                            </li>
                        );
                    })}
                </ul>
            </div>
        </nav>
    );
}

export default Navbar;
