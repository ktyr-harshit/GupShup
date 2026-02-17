import "../pages/SupportPages.css";

function PolicyPageLayout({ title, sections, activePath }) {
  return (
    <div className="sp-page">
      <header className="sp-header">
        <div className="sp-brand">
          <img className="sp-logo" src="/gupshup-logo.png" alt="Gupshup logo" />
          <h1>{title}</h1>
        </div>
        <nav className="sp-nav" aria-label="Policy links">
          <a className={activePath === "/privacy-policy" ? "active" : ""} href="/privacy-policy">Privacy Policy</a>
          <a className={activePath === "/terms" ? "active" : ""} href="/terms">Terms of Service</a>
          <a href="/help-center">Help Center</a>
        </nav>
      </header>

      <section className="sp-hero">
        <div className="sp-hero-left">
          <p className="sp-hero-kicker">Policy details</p>
          <h2>{title}</h2>
        </div>
        <img className="sp-hero-mark" src="/gupshup-logo.png" alt="Gupshup" />
      </section>

      <main className="sp-content-wrap">
        <article className="sp-content-card">
          <p><strong>Effective Date:</strong> January 15, 2026</p>
          {sections.map((section, index) => (
            <div key={section.heading || index}>
              {section.heading ? <h3>{section.heading}</h3> : null}
              {section.intro ? <p>{section.intro}</p> : null}
              {section.points ? (
                <ul>
                  {section.points.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
              ) : null}
              {section.text ? <p>{section.text}</p> : null}
            </div>
          ))}
        </article>
      </main>

      <footer className="sp-footer">
        <div className="sp-footer-links">
          <span>© 2026 GS Chat</span>
          <a href="/help-center">Help Center</a>
          <a href="/report-bug">Report a bug</a>
          <a href="/terms">Terms of Service</a>
          <a href="/privacy-policy">Privacy Policy</a>
          <a href="mailto:support@yourchatapp.com">Contact</a>
        </div>
      </footer>
    </div>
  );
}

export default PolicyPageLayout;
