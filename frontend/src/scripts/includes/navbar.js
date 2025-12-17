import { useState, useRef, useEffect } from "react";
import { smoothScrollTo } from "../helpers/smooth-scroll";

function Navbar() {
    const navItems = [
        { label: "Home", icon: "bi-house" },
        { label: "About", icon: "bi-person" },
        { label: "Expertise", icon: "bi-cpu" },
        { label: "Experience", icon: "bi-briefcase" },
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

    const slugify = (label) =>
        label.trim().toLowerCase().replace(/\s+/g, "-");

    // INDICATOR POSITION (hover > active)
    useEffect(() => {
        const index = hoverIndex ?? activeIndex;
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

    // SCROLL → ACTIVE SECTION (LOCKED)
    useEffect(() => {
        const sections = navItems
            .map((item) => document.getElementById(slugify(item.label)))
            .filter(Boolean);

        if (!sections.length) return;

        const observer = new IntersectionObserver(
            (entries) => {
                const visible = entries
                    .filter((e) => e.isIntersecting)
                    .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

                if (!visible) return;

                const index = navItems.findIndex(
                    (item) => slugify(item.label) === visible.target.id
                );

                if (index === -1) return;

                if (isProgrammaticScroll.current) {
                    if (index !== scrollTargetIndex.current) return;

                    // Target reached → unlock
                    isProgrammaticScroll.current = false;
                    scrollTargetIndex.current = null;
                }

                setActiveIndex(index);
                window.history.replaceState(null, "", `#${slugify(navItems[index].label)}`);
            },
            {
                threshold: 0.6,
            }
        );

        sections.forEach((section) => observer.observe(section));
        return () => observer.disconnect();
    }, []);

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
                            onClick={() => {
                                isProgrammaticScroll.current = true;
                                scrollTargetIndex.current = index;
                                setActiveIndex(index);
                                setHoverIndex(null);

                                const target = document.getElementById(slug);
                                if (/Mobi|Android/i.test(navigator.userAgent)) {
                                    document.getElementById(slug)?.scrollIntoView({ behavior: "smooth" });
                                } else {
                                    smoothScrollTo(target.offsetTop, 1400);
                                }

                            }}
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
