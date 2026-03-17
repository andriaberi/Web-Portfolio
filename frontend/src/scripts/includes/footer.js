function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer>
            <span className="footer-name">andriaberi</span>
            <span className="footer-copy">© {currentYear} Andria Beridze</span>
            <div className="footer-links">
                <a href="https://github.com/andriaberi" target="_blank">GitHub</a>
                <a href="https://linkedin.com/in/andriaberidze" target="_blank">LinkedIn</a>
                <a onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} style={{ cursor: 'pointer' }}>Back to top ↑</a>
            </div>
        </footer>
    )
}

export default Footer;