import { useState } from "react";

function Login({setModal}) {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const validate = () => {
    if (!form.email || !form.password)
      return "All fields are required";

    if (!/\S+@\S+\.\S+/.test(form.email))
      return "Email is invalid";

    return null;
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  const errorMessage = validate();
  if (errorMessage) {
    setError(errorMessage);
    return;
  }

  try {
    const res = await fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: form.email,
        password: form.password,
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      setError(data.message);
      return;
    }

    // ✅ Store in localStorage
    localStorage.setItem("token", data.token);
    localStorage.setItem("userEmail", form.email);

    alert("Login successful!");
  } catch (err) {
    console.error(err);
    setError("Something went wrong");
  }
};

  return (
    <div className="form-card">
      <h1>Sign in to X</h1>

      {error && <p className="error-msg">{error}</p>}

      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
        />

        <button type="submit" className="primary-btn" style={{marginTop: "20px"}}>
          Login
        </button>
      </form>
      <p>
        Don't have an account?{" "}
        <span
          style={{ color: "blue", cursor: "pointer" }}
          onClick={() => setModal("signup")}
        >
          Signup
        </span>
      </p>
    </div>
  );
}

export default Login;