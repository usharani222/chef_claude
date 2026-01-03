import { useState } from "react";

const API = process.env.REACT_APP_API_URL;

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const endpoint = isLogin ? "/auth/login" : "/auth/register";

    let response;

    if (isLogin) {
      // ✅ LOGIN (OAuth2 requires form-urlencoded + username key)
      response = await fetch(API + endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          username: form.email, // email used as username
          password: form.password,
        }),
      });
    } else {
      // ✅ REGISTER (JSON is fine)
      response = await fetch(API + endpoint, {
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
    }

    const data = await response.json();

    if (!response.ok) {
      alert(data.detail || "Authentication failed");
      return;
    }

    if (isLogin) {
      localStorage.setItem("token", data.access_token);
      window.location.reload();
    } else {
      alert("Registration successful. Please login.");
      setIsLogin(true);
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "100px auto", textAlign: "center" }}>
      <h2>{isLogin ? "Login" : "Register"}</h2>

      <form onSubmit={handleSubmit}>
        {!isLogin && (
          <input
            type="text"
            placeholder="Username"
            value={form.username}
            onChange={(e) =>
              setForm({ ...form, username: e.target.value })
            }
            required
            style={{ width: "100%", marginBottom: "10px" }}
          />
        )}

        <input
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          required
          style={{ width: "100%", marginBottom: "10px" }}
        />

        <input
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          required
          style={{ width: "100%", marginBottom: "10px" }}
        />

        <button type="submit" style={{ width: "100%" }}>
          {isLogin ? "Login" : "Register"}
        </button>
      </form>

      <button
        onClick={() => setIsLogin(!isLogin)}
        style={{ marginTop: "15px", width: "100%" }}
      >
        {isLogin ? "Create account" : "Back to login"}
      </button>
    </div>
  );
}
