import { useState, useEffect } from "react";

function Login({ setModal }) {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

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

      localStorage.setItem("token", data.token);
      localStorage.setItem("userEmail", form.email);

      alert("Login successful!");
      setModal(null);

    } catch (err) {
      console.error(err);
      setError("Something went wrong");
    }
  };

  useEffect(() => {
    if (window.google && document.getElementById("googleLoginDiv")) {
      window.google.accounts.id.initialize({
        client_id:
          "234548343118-jaofp1sntu3uqcnomsjurjgj6aoooblv.apps.googleusercontent.com",
        callback: async (response) => {
          try {
            const res = await fetch("http://localhost:5000/api/auth/google", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ token: response.credential }),
            });

            const data = await res.json();

            if (!res.ok) {
              alert(data.message);
              return;
            }

            localStorage.setItem("token", data.token);
            localStorage.setItem("user", JSON.stringify(data.user));

            alert("Google Login Successful!");
            setModal(null);

          } catch (err) {
            console.error(err);
            alert("Google login failed");
          }
        },
      });

      window.google.accounts.id.renderButton(
        document.getElementById("googleLoginDiv"),
        {
          theme: "outline",
          size: "large",
          width: "100%",
        }
      );
    }
  }, []);

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
          type={showPassword ? "text" : "password"}
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
        />

        <div style={{ marginTop: "10px" }}>
  <label style={{ fontSize: "14px" }}>
    <input
      type="checkbox"
      checked={showPassword}
      onChange={() => setShowPassword(!showPassword)}
      style={{ marginRight: "6px" }}
    />
    Show Password
  </label>
</div>


        <button type="submit" className="primary-btn" style={{ marginTop: "20px" }}>
          Login
        </button>
      </form>

      <center style={{ margin: "15px 0" }}>OR</center>

      <div id="googleLoginDiv"></div>

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