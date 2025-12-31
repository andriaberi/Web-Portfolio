import { useState, useRef, useEffect } from "react";
import { smoothScrollTo } from "../helpers/smooth-scroll";

function Navbar() {
    const navItems = [
        { label: "Home", icon: "bi-house" },
        { label: "About", icon: "bi-person" },
        { label: "Experience", icon: "bi-briefcase" },
        { label: "Expertise", icon: "bi-cpu" },
        { label: "Projects", icon: "bi-rocket" },
        { label: "Achievements", icon: "bi-award" },
        { label: "Contact", icon: "bi-telephone" },
    ];

    const [activeIndex, setActiveIndex] = useState(0);
    const [hoverIndex, setHoverIndex] = useState(null);
    const [indicatorStyle, setIndicatorStyle] = useState({});

    const navRef = useRef(null);
    const isProgrammaticScroll = useRef(false);
    const scrollTargetIndex = useRef(null);
    const clickedIndexRef = useRef(null);
    const lastHash = useRef("");

    const slugify = (label) => label.trim().toLowerCase().replace(/\s+/g, "-");

    // nav indicator position
    useEffect(() => {
        let index = hoverIndex ?? activeIndex;

        // If a nav item was clicked and scroll hasn't reached it yet, show clicked index
        if (clickedIndexRef.current !== null) {
            index = clickedIndexRef.current;
        }

        const nav = navRef.current;
        if (!nav) return;

        const item = nav.children[index];
        if (!item) return;

        setIndicatorStyle({
            width: item.offsetWidth + "px",
            transform: `translateX(${item.offsetLeft}px)`,
            transition: "var(--transition-slow)",
        });
    }, [hoverIndex, activeIndex]);

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

            navItems.forEach((item, index) => {
                const section = document.getElementById(slugify(item.label));
                if (!section) return;

                const rect = section.getBoundingClientRect();
                const sectionCenter = rect.top + window.scrollY + rect.height / 2;

                const distance = Math.abs(viewportCenter - sectionCenter);
                if (distance < closestDistance) {
                    closestDistance = distance;
                    closestIndex = index;
                }
            });

            // Programmatic scroll lock
            if (isProgrammaticScroll.current) {
                const targetSection = document.getElementById(
                    slugify(navItems[scrollTargetIndex.current].label)
                );
                if (!isSectionInView(targetSection)) return; // wait until target is visible

                // Target reached → unlock
                isProgrammaticScroll.current = false;
                clickedIndexRef.current = null;
                scrollTargetIndex.current = null;
            }

            setActiveIndex(closestIndex);

            // Update url hash (without jump)
            const nextHash = `#${slugify(navItems[closestIndex].label)}`;
            if (lastHash.current !== nextHash) {
                window.history.replaceState(null, "", nextHash);
                lastHash.current = nextHash;
            }
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        handleScroll(); // initial check

        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Nav click handler
    const handleNavClick = (index) => {
        isProgrammaticScroll.current = true;
        scrollTargetIndex.current = index;
        clickedIndexRef.current = index; // indicator follows clicked section until scroll reaches it
        setHoverIndex(null);

        const slug = slugify(navItems[index].label);
        const target = document.getElementById(slug);
        if (!target) return;

        // update URL immediately on click
        window.history.replaceState(null, "", `#${slug}`);
        lastHash.current = `#${slug}`;

        if (/Mobi|Android/i.test(navigator.userAgent)) {
            target.scrollIntoView({ behavior: "smooth" });
        } else {
            smoothScrollTo(target.offsetTop, 1400);
        }
    };

    return (
        <nav className="navbar" aria-label="Primary navigation">
            <ul className="nav-items" ref={navRef}>
                {navItems.map((item, index) => {
                    const slug = slugify(item.label);

                    return (
                        <li
                            key={slug}
                            className="nav-item"
                            onMouseEnter={() => {
                                if (!isProgrammaticScroll.current) {
                                    setHoverIndex(index);
                                }
                            }}
                            onMouseLeave={() => setHoverIndex(null)}
                            onClick={() => handleNavClick(index)}
                        >
                            <a className="nav-link">
                                <i className={`bi ${item.icon}`} />
                            </a>
                            <span className="nav-label">{item.label}</span>
                        </li>
                    );
                })}
            </ul>

            <span className="nav-indicator" style={indicatorStyle} />
        </nav>
    );
}

export default Navbar;
