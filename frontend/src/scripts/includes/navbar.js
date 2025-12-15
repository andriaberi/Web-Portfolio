import { useState, useRef, useEffect } from "react";

function Navbar() {
    const navItems = [
        { label: "Home", icon: "bi-house" },
        { label: "About", icon: "bi-person" },
        { label: "Skills", icon: "bi-cpu" },
        { label: "Experience", icon: "bi-briefcase" },
        { label: "Projects", icon: "bi-rocket" },
        { label: "Achievements", icon: "bi-award" },
        { label: "Contact", icon: "bi-telephone" },
    ];

    const [activeIndex, setActiveIndex] = useState(0); // clicked item
    const [hoverIndex, setHoverIndex] = useState(null); // hovered item

    const navRef = useRef(null);
    const [indicatorStyle, setIndicatorStyle] = useState({});

    const slugify = (label) =>
        label.trim().toLowerCase().replace(/\s+/g, "-");

    // Update indicator position
    useEffect(() => {
        const index = hoverIndex !== null ? hoverIndex : activeIndex;
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

    return (
        <nav className="navbar" id="navbar" aria-label="Primary navigation">
            <ul className="nav-items" ref={navRef}>
                {navItems.map((item, index) => {
                    const slug = slugify(item.label);

                    return (
                        <li
                            key={slug}
                            className={`nav-item`}
                            onMouseEnter={() => setHoverIndex(index)}
                            onMouseLeave={() => setHoverIndex(null)}
                            onClick={() => setActiveIndex(index)}
                        >
                            <a href={`#${slug}`} className="nav-link">
                                <i className={`bi ${item.icon}`} aria-hidden="true"></i>
                            </a>
                            <span className="nav-label">{item.label}</span>
                        </li>
                    );
                })}
            </ul>
            <span
                className="nav-indicator"
                style={{
                    ...indicatorStyle,
                }}
            ></span>
        </nav>
    );
}

export default Navbar;
