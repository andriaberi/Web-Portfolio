import { useState, useRef, useEffect } from "react";
import { smoothScrollTo } from "../helpers/smooth-scroll";

function Navbar() {
    const navItems = ["Home", "About", "Experience", "Expertise", "Projects", "Achievements", "Contact"];

    const [activeIndex, setActiveIndex] = useState(0);

    const navRef = useRef(null);
    const isProgrammaticScroll = useRef(false);
    const scrollTargetIndex = useRef(null);
    const clickedIndexRef = useRef(null);
    const lastHash = useRef("");

    const slugify = (label) => label.trim().toLowerCase().replace(/\s+/g, "-");

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
    };

    return (
        <nav className="navbar" aria-label="Primary navigation">
            <ul className="nav-items" ref={navRef}>
                {navItems.map((label, index) => {
                    const slug = slugify(label);

                    return (
                        <li
                            key={slug}
                            className={`nav-item${activeIndex === index ? " active" : ""}`}
                            onClick={() => handleNavClick(index)}
                        >
                            <a className="nav-link">{label}</a>
                        </li>
                    );
                })}
            </ul>
        </nav>
    );
}

export default Navbar;