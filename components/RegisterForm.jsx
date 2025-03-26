"use client";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

// Import the CSS file
import "../styles/css/LoginForm.css";

export default function RegisterForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !email || !password) {
      setError("All fields are required");
      return;
    }
    try {
      const resUserExists = await fetch("/api/userExists", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const { user } = await resUserExists.json();
      if (user) {
        setError("User already exists");
        return;
      }

      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      if (res.ok) {
        e.target.reset();
        router.push("/");
      } else {
        console.log("User registration failed");
      }
    } catch (error) {
      console.log("An error occurred", error);
    }
  };

  return (
    <div className="login-page">
      <div className="login-form-container">
        <h1>Register</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <input
            className="login-form-input"
            onChange={(e) => setName(e.target.value)}
            type="text"
            placeholder="Full Name"
          />
          <input
            className="login-form-input"
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="Email"
          />
          <input
            className="login-form-input"
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Password"
          />
          {error && <div className="error-message">{error}</div>}
          <button className="login-form-button">Register</button>
        </form>
        <div className="register-link">
          <p>
            Already have an account?{" "}
            <Link href="/" className="hover:underline">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
