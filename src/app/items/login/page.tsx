"use client";

import { useState } from "react";
import { useRouter } from "next/navigation"; // Use useRouter for client-side navigation

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter(); // Initialize the router

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    // Hardcoded credentials
    const validUsername = "admin";
    const validPassword = "password";

    if (username === validUsername && password === validPassword) {
      localStorage.setItem("auth", "true"); // Store session in local storage
      router.push("/items/components"); // Navigate to the home page
    } else {
      setError("Invalid username or password.");
    }
  };

  return (
    <div
      style={{
        maxWidth: "400px",
        margin: "auto",
        padding: "20px",
        border: "1px solid #ddd",
        borderRadius: "8px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        backgroundColor: "#505050",
        color: "#f5f5f5",
      }}
    >
      <h2 style={{ textAlign: "center", marginBottom: "20px", color: "#FFD700" }}>Login</h2>
      <form onSubmit={handleLogin}>
        <div style={{ marginBottom: "15px" }}>
          <label
            style={{
              display: "block",
              marginBottom: "5px",
              fontWeight: "bold",
              color: "#FFD700",
            }}
          >
            Username
          </label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            placeholder="Enter your username"
            style={{
              width: "100%",
              padding: "12px",
              border: "1px solid #000",
              borderRadius: "5px",
              backgroundColor: "#404040",
              color: "#f5f5f5",
            }}
          />
        </div>
        <div style={{ marginBottom: "15px" }}>
          <label
            style={{
              display: "block",
              marginBottom: "5px",
              fontWeight: "bold",
              color: "#FFD700",
            }}
          >
            Password
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="Enter your password"
            style={{
              width: "100%",
              padding: "12px",
              border: "1px solid #000",
              borderRadius: "5px",
              backgroundColor: "#404040",
              color: "#f5f5f5",
            }}
          />
        </div>
        {error && (
          <p
            style={{
              color: "red",
              textAlign: "center",
              background: "#ffe0e0",
              padding: "10px",
              borderRadius: "5px",
            }}
          >
            {error}
          </p>
        )}
        <button
          type="submit"
          style={{
            width: "100%",
            padding: "12px",
            fontSize: "16px",
            fontWeight: "bold",
            color: "#FFD700",
            backgroundColor: "#000",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            transition: "background-color 0.3s ease",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#333")}
          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#000")}
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
