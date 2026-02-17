import { useMemo, useState } from "react";
import "./SupportPages.css";

const faqItems = [
  {
    id: "faq-reset-password",
    title: "FAQ: How do I reset my password?",
    answer: "Go to Sign In, click Forgot password, and follow the reset link sent to your registered email address.",
    keywords: "reset password forgot password sign in email",
  },
  {
    id: "faq-block-report",
    title: "FAQ: How can I block or report someone?",
    answer: "Open the user profile in chat, choose Block or Report, and include details so we can investigate faster.",
    keywords: "block report user abuse safety",
  },
  {
    id: "faq-delayed-messages",
    title: "FAQ: Why are messages delayed?",
    answer: "This usually happens on unstable networks. Reconnect to a stronger connection or restart the app to re-sync your session.",
    keywords: "delayed messages network reconnect session sync",
  },
  {
    id: "faq-delete-account",
    title: "FAQ: Can I delete my account permanently?",
    answer: "Yes. Go to account settings, select Delete account, and confirm. This action cannot be undone.",
    keywords: "delete account permanently remove account settings",
  },
  {
    id: "faq-legal-policies",
    title: "FAQ: Where do I find legal policies?",
    answer: "Use the footer links to open the Terms of Service and Privacy Policy pages.",
    keywords: "legal policies terms privacy policy links",
  },
];

const featureItems = [
  {
    id: "feature-real-time-chat",
    title: "Real time chat",
    tag: "Messaging",
    summary: "Live one-to-one and group messaging with instant delivery and read receipts.",
    detail:
      "GS real time chat keeps every conversation synchronized instantly across devices. You can create private chats, group rooms, share files, and see typing and read status in seconds. Smart notifications ensure you do not miss important updates while reducing noise from low-priority threads.",
    keywords: "real time chat instant messages group chat",
  },
  {
    id: "feature-audio-video-calling",
    title: "Audio video calling",
    tag: "Calling",
    summary: "Switch between voice and video calls with stable quality and low delay.",
    detail:
      "GS supports smooth audio and video calling for both personal and team conversations. Start voice calls, upgrade to video in one click, or join quick group calls when collaboration is urgent. Adaptive quality helps calls remain stable even when network conditions fluctuate.",
    keywords: "audio video calling voice call group call",
  },
  {
    id: "feature-end-to-end-encryption",
    title: "End to end encryption",
    tag: "Security",
    summary: "Private conversations are protected so only participants can access messages.",
    detail:
      "Sensitive conversations on GS are secured with end-to-end encryption to protect your message privacy. Encryption keys are managed so that chat content remains unreadable to third parties in transit. Combined with account safety controls, this helps keep personal and business communication protected.",
    keywords: "end to end encryption security privacy",
  },
  {
    id: "feature-microblogging",
    title: "Microblogging",
    tag: "Social",
    summary: "Post short updates, media, and thoughts that followers can react to quickly.",
    detail:
      "GS microblogging lets you publish concise posts, images, and links to share ideas in real time. Followers can comment, repost, and react, helping conversations spread naturally. This gives you a lightweight way to broadcast announcements and community updates without leaving the platform.",
    keywords: "microblogging posts feed social",
  },
  {
    id: "feature-chat-support",
    title: "Chat support",
    tag: "Support",
    summary: "Get quick support through in-app conversations whenever issues appear.",
    detail:
      "When you need help, GS chat support provides direct in-app assistance for account, billing, and technical issues. Support flows are designed for quick triage so your issue reaches the right team faster. You can share screenshots and context directly in the thread for more accurate resolution.",
    keywords: "chat support help center support team",
  },
  {
    id: "feature-whats-trending",
    title: "Whats trending",
    tag: "Discover",
    summary: "Track popular topics and fast-rising conversations across the community.",
    detail:
      "The trending panel highlights high-activity topics so you can follow what people are discussing right now. It updates continuously with fresh signals from across public conversations. This helps creators, teams, and users discover relevant discussions and respond at the right time.",
    keywords: "whats trending trends discover topics",
  },
];

function HelpCenterPage() {
  const [query, setQuery] = useState("");
  const [selectedFeature, setSelectedFeature] = useState(null);

  const searchIndex = useMemo(() => {
    const base = [
      { id: "community-guidelines", title: "Community Guidelines", keywords: "community guidelines rules safety respect" },
      ...faqItems.map((item) => ({ id: item.id, title: item.title, keywords: item.keywords })),
      ...featureItems.map((item) => ({ id: item.id, title: item.title, keywords: item.keywords })),
    ];
    return base;
  }, []);

  const suggestions = [
    "Community Guidelines",
    ...faqItems.map((item) => item.title),
    ...featureItems.map((item) => item.title),
  ];

  const handleSearchSubmit = (event) => {
    if (event.key !== "Enter") return;
    const q = query.trim().toLowerCase();
    if (!q) return;

    const match = searchIndex.find((item) => `${item.title} ${item.keywords}`.toLowerCase().includes(q));
    if (!match) return;

    const element = document.getElementById(match.id);
    if (!element) return;

    if (element.tagName === "DETAILS") {
      element.open = true;
    }

    element.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="sp-page">
      <header className="sp-header">
        <div className="sp-brand">
          <img className="sp-logo" src="/gupshup-logo.png" alt="Gupshup logo" />
          <h1>Help Center</h1>
        </div>
        <nav className="sp-nav">
          <a href="/privacy-policy">Privacy Policy</a>
          <a href="/terms">Terms of Service</a>
          <a href="/report-bug" className="active">Report a bug</a>
        </nav>
      </header>

      <section className="sp-hero">
        <div className="sp-hero-left">
          <p className="sp-hero-kicker">Contact us</p>
          <h2>We can help.</h2>
          <div className="sp-hero-search">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={handleSearchSubmit}
              list="helpSearchSuggestions"
              placeholder="Search"
              aria-label="Search all help articles"
            />
            <span className="sp-hero-search-icon">⌕</span>
          </div>
        </div>
        <img className="sp-hero-mark" src="/gupshup-logo.png" alt="Gupshup" />
      </section>

      <main>
        <section className="sp-panel-grid">
          <article id="community-guidelines" className="sp-panel">
            <h3>Community Guidelines</h3>
            <span className="sp-chip">Community Guidelines</span>
            {featureItems.map((f) => (
              <span className="sp-chip" key={f.id}>{f.title}</span>
            ))}
            <p>
              Our community is built for safe and meaningful real-time conversation. Keep discussions respectful, avoid personal attacks, and do not post threatening, hateful, or harassing content.
            </p>
            <p>
              Do not share private information such as phone numbers, OTP codes, addresses, passwords, or financial details. If someone pressures you for this data, stop chatting and report the account.
            </p>
            <p>
              Any attempt to distribute malware, run scams, impersonate another user, or bypass account security may result in immediate account suspension.
            </p>
            <p>
              Report harmful behavior using in-app reporting tools or through the Report a bug option in the menu. Our moderation team reviews reports and can remove content or restrict accounts.
            </p>
          </article>

          <article className="sp-panel">
            <h3>FAQs</h3>
            {faqItems.map((item, index) => (
              <details key={item.id} id={item.id} open={index === 0}>
                <summary>{item.title.replace("FAQ: ", "")}</summary>
                <p>{item.answer}</p>
              </details>
            ))}
          </article>
        </section>

        <section className="sp-content-wrap" style={{ marginTop: 6 }}>
          <h3 style={{ margin: "0 0 18px", fontSize: 42, letterSpacing: "-1px" }}>Whats on gs</h3>
          <div className="sp-feature-grid">
            {featureItems.map((item) => (
              <article className="sp-feature-card" id={item.id} key={item.id}>
                <div className="sp-feature-media"><img src="/gupshup-logo.png" alt="Gupshup" /></div>
                <div className="sp-feature-body">
                  <span className="sp-chip">{item.tag}</span>
                  <h4 className="sp-feature-title">{item.title}</h4>
                  <p className="sp-feature-summary">{item.summary}</p>
                  <button className="sp-feature-btn" type="button" onClick={() => setSelectedFeature(item)}>
                    Read more
                  </button>
                </div>
              </article>
            ))}
          </div>
        </section>
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

      <datalist id="helpSearchSuggestions">
        {suggestions.map((item) => (
          <option key={item} value={item} />
        ))}
      </datalist>

      <div className={`sp-modal${selectedFeature ? " open" : ""}`} aria-hidden={!selectedFeature}>
        <div className="sp-modal-card" role="dialog" aria-modal="true">
          <h4 style={{ margin: "0 0 10px", fontSize: 30 }}>{selectedFeature?.title || "Feature"}</h4>
          <p style={{ margin: 0, color: "#334155", lineHeight: 1.6 }}>{selectedFeature?.detail || ""}</p>
          <button className="sp-btn-dark" style={{ marginTop: 16 }} type="button" onClick={() => setSelectedFeature(null)}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

export default HelpCenterPage;
