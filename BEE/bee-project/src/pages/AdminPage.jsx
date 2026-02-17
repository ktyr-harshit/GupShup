import { useMemo, useState } from "react";
import "./SupportPages.css";
import { loadBugReports, resolveBugReport, deleteBugReport } from "../utils/bugStorage";

function formatTime(value) {
  if (!value) return "Unknown time";
  return new Date(value).toLocaleString();
}

function AdminPage() {
  const [reports, setReports] = useState(() => loadBugReports());
  const [selectedId, setSelectedId] = useState(null);

  const pending = useMemo(() => reports.filter((r) => r.status !== "resolved"), [reports]);
  const resolved = useMemo(() => reports.filter((r) => r.status === "resolved"), [reports]);
  const selected = pending.find((item) => item.id === selectedId);

  const markResolved = (id) => {
    setReports(resolveBugReport(id));
    setSelectedId(null);
  };

  const removeResolved = (id) => {
    setReports(deleteBugReport(id));
  };

  return (
    <div className="sp-page">
      <header className="sp-header">
        <div className="sp-brand">
          <img className="sp-logo" src="/gupshup-logo.png" alt="Gupshup logo" />
          <h1>Admin Panel</h1>
        </div>
        <button onClick={() => (window.location.href = "/")} aria-label="Logout" title="Logout">↪</button>
      </header>

      <main className="sp-admin-layout">
        <section className="sp-admin-panel">
          <div className="sp-admin-head"><h2 style={{ margin: 0 }}>Reported Bugs</h2></div>
          <div className="sp-admin-body">
            {pending.length ? pending.map((report) => (
              <button key={report.id} type="button" className={`sp-bug-item${selectedId === report.id ? " active" : ""}`} onClick={() => setSelectedId(report.id)}>
                <span style={{ display: "block", fontSize: 16, fontWeight: 700 }}>{report.title}</span>
                <span style={{ display: "block", fontSize: 13, color: "#64748b" }}>{report.email} • {formatTime(report.createdAt)}</span>
              </button>
            )) : <p style={{ color: "#64748b", margin: 0 }}>No pending bug reports.</p>}
          </div>
        </section>

        <section className="sp-admin-panel">
          <div className="sp-admin-head"><h2 style={{ margin: 0 }}>Issue Details</h2></div>
          <div className="sp-detail-area">
            {selected ? (
              <>
                <h3 style={{ margin: "0 0 8px", fontSize: 26 }}>{selected.title}</h3>
                <p style={{ margin: "0 0 12px", color: "#64748b", fontSize: 14 }}>Reported by {selected.email} • {formatTime(selected.createdAt)}</p>
                <p style={{ margin: 0, lineHeight: 1.6, whiteSpace: "pre-wrap" }}>{selected.details}</p>
                <button className="sp-btn-dark" style={{ marginTop: 14 }} type="button" onClick={() => markResolved(selected.id)}>Mark as resolved</button>
              </>
            ) : (
              <p style={{ color: "#64748b", margin: 0 }}>Click a reported bug from the left panel to view full details here.</p>
            )}
          </div>
          <div className="sp-resolved-area">
            <h4 style={{ margin: "0 0 10px", fontSize: 20 }}>Resolved Issues</h4>
            <ul className="sp-resolved-list">
              {resolved.map((item) => (
                <li key={item.id}>
                  <span style={{ flex: 1 }}>{item.title} • {formatTime(item.updatedAt || item.createdAt)}</span>
                  <button className="sp-btn-danger" type="button" onClick={() => removeResolved(item.id)}>Delete</button>
                </li>
              ))}
            </ul>
            {!resolved.length ? <p style={{ color: "#64748b", margin: "10px 0 0" }}>No issues resolved yet.</p> : null}
          </div>
        </section>
      </main>

      <footer className="sp-footer">© 2026 @GSAdmin</footer>
    </div>
  );
}

export default AdminPage;
