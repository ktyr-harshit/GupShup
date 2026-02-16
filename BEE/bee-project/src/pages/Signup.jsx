import { useState } from "react";

function Signup({ setModal, setShowUsernameModal }) {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    month: "",
    day: "",
    year: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // 🔥 FULL VALIDATION (UNCHANGED)
  const validate = () => {
    if (!form.username || !form.email || !form.password || !form.confirmPassword)
      return "All fields are required";

    if (!/\S+@\S+\.\S+/.test(form.email))
      return "Email is invalid";

    const strongPassword =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    if (!strongPassword.test(form.password)) {
      return "Password must be at least 8 characters, include uppercase, lowercase, number and special character";
    }

    if (form.password !== form.confirmPassword)
      return "Passwords do not match";

    if (!form.month || !form.day || !form.year)
      return "Date of birth is required";

    const monthIndex = [
      "January","February","March","April","May","June",
      "July","August","September","October","November","December"
    ].indexOf(form.month);

    const selectedDate = new Date(
      form.year,
      monthIndex,
      form.day
    );

    if (
      selectedDate.getFullYear() != form.year ||
      selectedDate.getMonth() != monthIndex ||
      selectedDate.getDate() != form.day
    ) {
      return "Invalid date selected";
    }

    const today = new Date();
    let age = today.getFullYear() - form.year;

    const monthDifference = today.getMonth() - monthIndex;
    if (
      monthDifference < 0 ||
      (monthDifference === 0 && today.getDate() < form.day)
    ) {
      age--;
    }

    if (age < 18) {
      return "You must be at least 18 years old";
    }

    return null;
  };

  // 🔥 SUBMIT HANDLER
  const handleSubmit = async (e) => {
    e.preventDefault();

    const errorMessage = validate();
    if (errorMessage) {
      setError(errorMessage);
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: form.username,
          email: form.email,
          password: form.password,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message);
        return;
      }

      // ✅ Store token
      localStorage.setItem("token", data.token);
      localStorage.setItem("userEmail", form.email);
      localStorage.setItem("username", form.username);

      // 🔥 CLOSE FIRST CARD
      setModal(null);

      // 🔥 OPEN USERNAME CARD
      setShowUsernameModal(true);

    } catch (err) {
      console.error(err);
      setError("Something went wrong");
    }
  };

  return (
    <div className="form-card">
      <h2>Create your account</h2>

      {error && <p className="error-msg">{error}</p>}

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          placeholder="Name"
          value={form.username}
          onChange={handleChange}
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
        />

        <div className="dob-section">
          <br/>
          <label>Date of birth</label>

          <div className="dob-inputs">
            <select name="month" value={form.month} onChange={handleChange}>
              <option value="">Month</option>
              {[
                "January","February","March","April","May","June",
                "July","August","September","October","November","December"
              ].map((m, i) => (
                <option key={i} value={m}>{m}</option>
              ))}
            </select>

            <select name="day" value={form.day} onChange={handleChange}>
              <option value="">Day</option>
              {Array.from({ length: 31 }, (_, i) => i + 1).map((d) => (
                <option key={d} value={d}>{d}</option>
              ))}
            </select>

            <select name="year" value={form.year} onChange={handleChange}>
              <option value="">Year</option>
              {Array.from({ length: 100 }, (_, i) => {
                const year = new Date().getFullYear() - i;
                return <option key={year} value={year}>{year}</option>;
              })}
            </select>
          </div>
        </div>

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
        />

        <small style={{ fontSize: "12px", color: "gray" }}>
          Must contain 8+ characters, uppercase, lowercase, number & special character.
        </small>

        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          value={form.confirmPassword}
          onChange={handleChange}
        />

        <br/>
        <button type="submit" className="primary-btn">
          Next...
        </button>
      </form>
    </div>
  );
}

export default Signup;
