import { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import TermsPage from "./pages/TermsPage";
import PrivacyPolicyPage from "./pages/PrivacyPolicyPage";
import HelpCenterPage from "./pages/HelpCenterPage";
import ReportBugPage from "./pages/ReportBugPage";
import AdminPage from "./pages/AdminPage";

function HomePage() {
  const [modal, setModal] = useState(null);
  const [showUsernameModal, setShowUsernameModal] = useState(false);
  const [personalUsername, setPersonalUsername] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  const handleGoogleResponse = async (response) => {
    try {
      const res = await fetch("http://localhost:5000/api/auth/google", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token: response.credential }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Google login failed");
        return;
      }

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      setModal(null);
    } catch (err) {
      console.error(err);
      alert("Something went wrong");
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (window.google && document.getElementById("googleButtonDiv")) {
        window.google.accounts.id.initialize({
          client_id:
            "234548343118-jaofp1sntu3uqcnomsjurjgj6aoooblv.apps.googleusercontent.com",
          callback: handleGoogleResponse,
        });

        window.google.accounts.id.renderButton(
          document.getElementById("googleButtonDiv"),
          {
            theme: "outline",
            size: "large",
            width: "100%",
          }
        );

        clearInterval(interval);
      }
    }, 200);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (showUsernameModal) {
      const storedName = localStorage.getItem("username") || "user";
      const cleanName = storedName.replace(/\s+/g, "").toLowerCase();

      const randomSuggestions = [
        cleanName + Math.floor(Math.random() * 100),
        cleanName + "_" + Math.floor(Math.random() * 999),
        cleanName + "official",
        cleanName + Date.now().toString().slice(-3),
      ];

      setSuggestions(randomSuggestions);
    }
  }, [showUsernameModal]);

  return (
    <>
      <div className="layout">
        <div className="left-panel">
          <h1 className="logo">BEE</h1>
        </div>

        <div className="right-panel">
          <h1>Happening now</h1>
          <h2>Join today.</h2>

          <div id="googleButtonDiv"></div>

          <center>OR</center>

          <button className="primary-btn" onClick={() => setModal("signup")}>
            Create account
          </button>

          <p style={{ fontSize: "12px" }}>
            By signing up, you agree to the <a href="/terms">Terms of Service</a> and{" "}
            <a href="/privacy-policy">Privacy Policy</a>. Need help? Visit our{" "}
            <a href="/help-center">Help Center</a>.
          </p>

          <br />
          <h4>Already have an account?</h4>

          <button className="secondary-btn" onClick={() => setModal("login")}>
            Sign in
          </button>
        </div>
      </div>

      {modal && (
        <div className="modal-overlay">
          <div className="modal-card">
            <button className="close-btn" onClick={() => setModal(null)}>
              ✕
            </button>

            {modal === "login" ? (
              <Login setModal={setModal} />
            ) : (
              <Signup setModal={setModal} setShowUsernameModal={setShowUsernameModal} />
            )}
          </div>
        </div>
      )}

      {showUsernameModal && (
        <div className="modal-overlay">
          <div className="modal-card">
            <button className="close-btn" onClick={() => setModal(null)}>
              ✕
            </button>

            <h2>Create your account</h2>

            <input
              type="text"
              placeholder="Enter a Unique Username"
              value={personalUsername}
              onChange={(e) => setPersonalUsername(e.target.value)}
              style={{ marginTop: "20px" }}
            />

            <div style={{ marginTop: "15px" }}>
              <p className="suggestUserName-a">Some Suggested Usernames:</p>

              {suggestions.map((s, index) => (
                <p className="suggestUserName-b" key={index} onClick={() => setPersonalUsername(s)}>
                  {s}
                </p>
              ))}
            </div>

            <br />

            <button
              className="primary-btn"
              style={{ marginTop: "20px" }}
              onClick={async () => {
                try {
                  const token = localStorage.getItem("token");

                  const res = await fetch("http://localhost:5000/api/auth/set-username", {
                    method: "POST",
                    headers: {
                      "Content-Type": "application/json",
                      Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify({
                      personalUsername,
                    }),
                  });

                  const data = await res.json();

                  if (!res.ok) {
                    alert(data.message);
                    return;
                  }

                  alert("Account fully created 🎉");
                  setShowUsernameModal(false);
                } catch (err) {
                  console.error(err);
                  alert("Something went wrong");
                }
              }}
            >
              Create Account
            </button>
          </div>
        </div>
      )}
    </>
  );
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/terms" element={<TermsPage />} />
      <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
      <Route path="/help-center" element={<HelpCenterPage />} />
      <Route path="/report-bug" element={<ReportBugPage />} />
      <Route path="/admin" element={<AdminPage />} />
      <Route path="*" element={<HomePage />} />
    </Routes>
  );
}

export default App;
