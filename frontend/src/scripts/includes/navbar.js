import {useEffect, useState} from "react";

function Navbar({ activePage }) {
    const navItems = ["Home", "About", "Experience", "CP", "Projects", "Now"];

    const slugify = (label) => label.trim().toLowerCase().replace(/\s+/g, "-");

    const [menuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => {
        setMenuOpen((prev) => !prev);
    };

    useEffect(() => {
        document.body.style.overflow = menuOpen ? "hidden" : "";
        return () => { document.body.style.overflow = ""; };
    }, [menuOpen]);

    return (
        <>
            <nav className="navbar" id="navbar">
                <div className="nav-logo">
                    <a href="/">Andria <span>Beridze</span></a>
                </div>
                <ul className="nav-items">
                    {
                        navItems.map((label) => {
                            const slug = slugify(label);
                            return (
                                <li
                                    key={slug}
                                    className={`nav-item${slug === slugify(activePage) ? " active" : ""}`}
                                >
                                    <a href={`/${slug === "home" ? "" : slug}`}>{label.toUpperCase()}</a>
                                </li>
                            );
                        })
                    }
                </ul>

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

                <div className={`mobile-menu${menuOpen ? " open" : ""}`} aria-hidden={!menuOpen}>
                    <ul className="mobile-nav-items">
                        {navItems.map((label) => {
                            const slug = slugify(label);
                            return (
                                <li
                                    key={slug}
                                    className={`mobile-nav-item${slugify(activePage) === slug ? " active" : ""}`}
                                >
                                    <a href={`/${slug === "home" ? "" : slug}`}>{label.toUpperCase()}</a>
                                </li>
                            );
                        })}
                    </ul>
                </div>
            </nav>
        </>
    )
}

export default Navbar;