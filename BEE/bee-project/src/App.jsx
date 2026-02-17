import { useState, useEffect } from "react";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";

function App() {
  const [modal, setModal] = useState(null);
  const [showUsernameModal, setShowUsernameModal] = useState(false);
  const [personalUsername, setPersonalUsername] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [prefillData, setPrefillData] = useState(null);
  const [dob, setDob] = useState({month: "", day: "", year: ""});
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem("token"));


  // 🔥 Google Login Handler
  const handleGoogleSignup = async (response) => {
    try {
      const res = await fetch("http://localhost:5000/api/auth/google", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token: response.credential }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Google signup failed");
        return;
      }

      setPrefillData({
        username: data.user.username,
        email: data.user.email,
      });

      setModal("signup");

    } catch (err) {
      console.error(err);
      alert("Something went wrong");
    }
  };

  // 🔥 Google SDK
  useEffect(() => {
    const interval = setInterval(() => {
      if (window.google && document.getElementById("googleSignupDiv")) {

        window.google.accounts.id.initialize({
          client_id:
            "234548343118-jaofp1sntu3uqcnomsjurjgj6aoooblv.apps.googleusercontent.com",
          callback: handleGoogleSignup,
        });

        window.google.accounts.id.renderButton(
          document.getElementById("googleSignupDiv"),
          {
            theme: "outline",
            size: "large",
            width: "100%",
            text: "signup_with",
          }
        );

        clearInterval(interval);
      }
    }, 200);

    return () => clearInterval(interval);
  }, []);

  // 🔥 Username Suggestion
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

  // 🔥 Light Mode / Dark Mode

  useEffect(() => {
  document.body.className = theme;
  localStorage.setItem("theme", theme);
}, [theme]);


  return (
  <>
    {!isAuthenticated && (
      <>
        <div className="layout">
          <div className="left-panel">
            <h1 className="logo">
              <img src="/darkModeLogoGupShup.png" alt="GupShup Logo" />
            </h1>
          </div>

          <button
            className="theme-toggle"
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
          >
            {theme === "light" ? "⚫️" : "⚪️"}
          </button>

          <div className="right-panel">
            <div className="mobile-logo">
              <img className="grey" src="/lightModeLogo.png" alt="GupShup Logo" />
              <img className="white" src="/greyLogo.png" alt="GupShup Logo" />
            </div>

            <h1>What's up?</h1>
            <h2>Let's share on GupShup</h2>

            <br />

            <div id="googleSignupDiv"></div>

            <center>OR</center>

            <button
              className="primary-btn"
              onClick={() => setModal("signup")}
            >
              Create account
            </button>
            
            <p style={{ fontSize: "12px" }}>
              By signing up, you agree to the{" "}
              <a href="/terms.html" target="_blank" rel="noopener noreferrer"> Terms of Service</a>{" "}
              and{" "}
              <a href="/terms.html" target="_blank" rel="noopener noreferrer"> Privacy Policy</a>.
            </p>

            <br />
            <h4>Already have an account?</h4>

            <button
              className="secondary-btn"
              onClick={() => setModal("login")}
            >
              Sign in
            </button>
          </div>
        </div>

        {modal && (
          <div className="modal-overlay">
            <div className="modal-card">
              <button
                className="close-btn"
                onClick={() => setModal(null)}
              >
                ✕
              </button>

              {modal === "login" ? (
                <Login setModal={setModal} />
              ) : (
                <Signup
                  setModal={setModal}
                  prefillData={prefillData}
                  setIsAuthenticated={setIsAuthenticated}
                />
              )}
            </div>
          </div>
        )}
      </>
    )}

    {/* Dashboard */}
    {isAuthenticated && (
      <Dashboard setIsAuthenticated={setIsAuthenticated} />
    )}
  </>
);

}

export default App;
