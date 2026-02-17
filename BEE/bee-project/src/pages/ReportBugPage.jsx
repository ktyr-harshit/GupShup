import { useState } from "react";
import "./SupportPages.css";
import { addBugReport } from "../utils/bugStorage";

function ReportBugPage() {
  const [form, setForm] = useState({ email: "", title: "", details: "" });
  const [modal, setModal] = useState({ open: false, title: "", message: "" });
  const [submitting, setSubmitting] = useState(false);

  const onChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const openModal = (title, message) => setModal({ open: true, title, message });

  const onSubmit = (event) => {
    event.preventDefault();
    const email = form.email.trim();
    const title = form.title.trim();
    const details = form.details.trim();

    if (!email || !title || !details) {
      openModal("Submission failed", "Fill the required fields");
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      openModal("Submission failed", "Incorrect credential");
      return;
    }

    try {
      setSubmitting(true);
      addBugReport({ email, title, details });
      openModal("Submitted successfully", "Submitted successfully");
      setForm({ email: "", title: "", details: "" });
    } catch (error) {
      console.error(error);
      openModal("Submission failed", "Error submitting report");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="sp-page" style={{ display: "grid", placeItems: "center", padding: 24 }}>
      <main className="sp-content-card" style={{ width: "min(780px, 100%)" }}>
        <h1 style={{ marginTop: 0 }}>Report a Bug</h1>
        <p style={{ color: "#475569", lineHeight: 1.6 }}>
          Share what happened, how to reproduce it, and which device/browser you are using. This helps us fix issues faster.
        </p>

        <form onSubmit={onSubmit}>
          <label htmlFor="email">Email</label>
          <input id="email" name="email" type="email" value={form.email} onChange={onChange} placeholder="you@example.com" style={{ width: "100%", marginTop: 6, marginBottom: 12, padding: "11px 12px", borderRadius: 10, border: "1px solid #cdd9e7" }} />

          <label htmlFor="title">Issue title</label>
          <input id="title" name="title" type="text" value={form.title} onChange={onChange} placeholder="Short summary" style={{ width: "100%", marginTop: 6, marginBottom: 12, padding: "11px 12px", borderRadius: 10, border: "1px solid #cdd9e7" }} />

          <label htmlFor="details">Details</label>
          <textarea id="details" name="details" value={form.details} onChange={onChange} placeholder="Steps to reproduce, expected result, actual result" style={{ width: "100%", marginTop: 6, minHeight: 180, marginBottom: 12, padding: "11px 12px", borderRadius: 10, border: "1px solid #cdd9e7" }} />

          <button className="sp-btn-dark" type="submit" disabled={submitting}>
            {submitting ? "Submitting..." : "Submit report"}
          </button>
        </form>

        <a href="/help-center" style={{ display: "inline-block", marginTop: 16, color: "#1d4e7a", textDecoration: "none" }}>
          Back to Help Center
        </a>
      </main>

      <div className={`sp-modal${modal.open ? " open" : ""}`} aria-hidden={!modal.open} onClick={(e) => e.target === e.currentTarget && setModal({ open: false, title: "", message: "" })}>
        <div className="sp-modal-card" role="dialog" aria-modal="true">
          <h2 style={{ margin: "0 0 8px" }}>{modal.title}</h2>
          <p style={{ margin: 0 }}>{modal.message}</p>
          <button className="sp-btn-dark" style={{ marginTop: 16 }} type="button" onClick={() => setModal({ open: false, title: "", message: "" })}>
            OK
          </button>
        </div>
      </div>
    </div>
  );
}

export default ReportBugPage;
