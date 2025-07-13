import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/Login.css";

const Register = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      return setMessage("Please fill all fields");
    }

    try {
      const response = await axios.post(
        "http://localhost:3000/register",
        {
          email,
          password,
        },
        { withCredentials: true }
      );

      setMessage(response.data.message);

      setTimeout(() => {
        navigate("/login");
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
      <h2>Create your account</h2>
      <p>Join the platform and access your dashboard.</p>

      <form onSubmit={handleRegister} className="login-form">
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
        <button className="login-button">Register</button>
        {message && <p className="login-message">{message}</p>}
      </form>

      <div className="auth-text">
        Already have an account?{" "}
        <span className="auth-link" onClick={() => navigate("/login")}>
          Login
        </span>
      </div>
    </div>
  );
};

export default Register;
