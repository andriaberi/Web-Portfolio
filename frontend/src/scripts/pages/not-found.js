function NotFound() {
    return (
        <section className="notfound">
            <div className="notfound-container">
                <div className="notfound-badge" aria-hidden="true">
                    <i className="bi bi-exclamation-triangle"></i>
                </div>

                <h1 className="notfound-title">404</h1>
                <p className="notfound-subtitle">
                    Page not found. The link may be broken or the page may have been moved.
                </p>

                <div className="notfound-actions">
                    <a className="notfound-button" href="/">
                        <i className="bi bi-house-door"></i>
                        <span>Go Home</span>
                    </a>
                </div>
            </div>
        </section>
    );
}

export default NotFound;
