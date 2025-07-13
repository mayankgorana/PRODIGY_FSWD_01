import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/Login.css";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      return setMessage("Please fill all fields");
    }

    try {
      const response = await axios.post(
        "http://localhost:3000/login",
        {
          email,
          password,
        },
        { withCredentials: true }
      );

      setMessage(response.data.message);

      setTimeout(() => {
        navigate("/dashboard");
      }, 1000);
    } catch (error) {
      if (error.response?.data?.error) {
        setMessage(error.response.data.error);
      } else {
        setMessage("Something went wrong.");
      }
    }
  };

  return (
    <div className="login-container">
      <h2>Sign in with email</h2>
      <p>Access your dashboard and data securely.</p>

      <form onSubmit={handleLogin} className="login-form">
        <input
          type="email"
          placeholder="✉ Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="login-input"
        />
        <input
          type="password"
          placeholder="🔒 Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="login-input"
        />
        <button className="login-button">Get Started</button>
        {message && <p className="login-message">{message}</p>}
      </form>

      <div className="auth-text">
        Don't have an account?{" "}
        <span className="auth-link" onClick={() => navigate("/register")}>
          Sign up
        </span>
      </div>
    </div>
  );
};

export default Login;
