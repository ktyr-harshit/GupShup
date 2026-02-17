import { useState, useEffect } from "react";

function Dashboard({ setIsAuthenticated }) {
  const [personalUsername, setPersonalUsername] = useState("");
  const [needsUsername, setNeedsUsername] = useState(false);
  const [error, setError] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  const [dob, setDob] = useState({
    month: "",
    day: "",
    year: "",
  });

  useEffect(() => {
  if (needsUsername) {
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
}, [needsUsername]);


  useEffect(() => {
    const savedUsername = localStorage.getItem("personalUsername");

    if (!savedUsername) {
      setNeedsUsername(true);
    }
  }, []);

  const handleConfirm = () => {
    setError("");

  if (!dob.month || !dob.day || !dob.year) {
    setError("Date of birth is required");
    return;
  }

  const monthIndex = [
    "January","February","March","April","May","June",
    "July","August","September","October","November","December"
  ].indexOf(dob.month);

  const selectedDate = new Date(
    dob.year,
    monthIndex,
    dob.day
  );

  if (
    selectedDate.getFullYear() != dob.year ||
    selectedDate.getMonth() != monthIndex ||
    selectedDate.getDate() != dob.day
  ) {
    setError("Invalid date selected");
    return;
  }

  const today = new Date();
  let age = today.getFullYear() - dob.year;

  const monthDifference = today.getMonth() - monthIndex;
  if (
    monthDifference < 0 ||
    (monthDifference === 0 && today.getDate() < dob.day)
  ) {
    age--;
  }

  if (age < 13) {
    setError("You must be at least 13 years old");
    return;
  }

  if (!personalUsername) {
    setError("Username required");
    return;
  }

  localStorage.setItem("personalUsername", personalUsername);
  setNeedsUsername(false);
  /*window.location.href = "/";*/
};

const handleLogout = () => {
  localStorage.clear();
  setIsAuthenticated(false);
};


  return (
    <>
      {needsUsername ? (
        <div className="modal-overlay">
          <div className="modal-card">
            <h1>Create your account</h1>

            {error && <p className="error-msg">{error}</p>}

            {/* DOB */}
            <div className="dob-section">
              <label>Date of birth</label>

              <div className="dob-inputs">
                <select
                  value={dob.month}
                  onChange={(e) =>
                    setDob({ ...dob, month: e.target.value })
                  }
                >
                  <option value="">Month</option>
                  {[
                    "January","February","March","April","May","June",
                    "July","August","September","October","November","December"
                  ].map((m, i) => (
                    <option key={i} value={m}>{m}</option>
                  ))}
                </select>

                <select
                  value={dob.day}
                  onChange={(e) =>
                    setDob({ ...dob, day: e.target.value })
                  }
                >
                  <option value="">Day</option>
                  {Array.from({ length: 31 }, (_, i) => i + 1).map((d) => (
                    <option key={d} value={d}>{d}</option>
                  ))}
                </select>

                <select
                  value={dob.year}
                  onChange={(e) =>
                    setDob({ ...dob, year: e.target.value })
                  }
                >
                  <option value="">Year</option>
                  {Array.from({ length: 100 }, (_, i) => {
                    const year = new Date().getFullYear() - i;
                    return <option key={year} value={year}>{year}</option>;
                  })}
                </select>
              </div>
            </div>

            {/* Username */}
            <input
              type="text"
              placeholder="Enter unique username"
              value={personalUsername}
              onChange={(e) => setPersonalUsername(e.target.value)}
              style={{ marginTop: "20px" }}
            />

            <div style={{ marginTop: "15px" }}>
  <p className="suggestUserName-a">Some Suggested Usernames:</p>

  {suggestions.map((s, index) => (
    <p
      key={index}
      className="suggestUserName-b"
      onClick={() => setPersonalUsername(s)}
    >
      {s}
    </p>
  ))}
</div>


            <button
              className="primary-btn"
              style={{ marginTop: "20px" }}
              onClick={handleConfirm}
            >
              Create Account
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
    </>
  );
}

export default Dashboard;