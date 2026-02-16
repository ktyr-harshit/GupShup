import { useState, useEffect } from "react";

function Dashboard() {
  const [personalUsername, setPersonalUsername] = useState("");
  const [needsUsername, setNeedsUsername] = useState(false);

  useEffect(() => {
    const savedUsername = localStorage.getItem("personalUsername");

    if (!savedUsername) {
      setNeedsUsername(true);
    }
  }, []);

  const handleConfirm = () => {
    if (!personalUsername) {
      alert("Username required");
      return;
    }

    localStorage.setItem("personalUsername", personalUsername);
    setNeedsUsername(false);
  };

  const handleLogout = () => {
    localStorage.clear();
    window.location.reload();
  };

  return (
    <div style={{ padding: "40px" }}>
      {needsUsername ? (
        <div className="modal-overlay">
          <div className="modal-card">
            <h1>Sign in to X</h1>

            <input
              type="text"
              placeholder="Enter unique username"
              value={personalUsername}
              onChange={(e) => setPersonalUsername(e.target.value)}
            />

            <button
              className="primary-btn"
              style={{ marginTop: "20px" }}
              onClick={handleConfirm}
            >
              Confirm
            </button>
          </div>
        </div>
      ) : (
        <>
          <h1>
            Welcome, {localStorage.getItem("personalUsername")}
          </h1>

          <button onClick={handleLogout}>
            Logout
          </button>
        </>
      )}
    </div>
  );
}

export default Dashboard;