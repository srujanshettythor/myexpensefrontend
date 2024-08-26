import React, { useState } from "react";
import { Link } from "react-router-dom";

const Signup = ({ onSignup }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    onSignup(email, password); // Pass the email and password to the parent component
  };

  return (
    <div style={styles.authContainer}>
      <form style={styles.authForm} onSubmit={handleSubmit}>
        <h2 style={styles.heading}>Sign Up</h2>
        <div style={styles.inputContainer}>
          <label>Email Address</label>
          <input
            type="email"
            placeholder="me@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={styles.input}
          />
        </div>
        <div style={styles.inputContainer}>
          <label>Password</label>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={styles.input}
          />
        </div>
        <div style={styles.inputContainer}>
          <label>Confirm Password</label>
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            style={styles.input}
          />
        </div>
        <button type="submit" style={styles.submitBtn}>
          Submit
        </button>
        <p style={styles.switchPage}>
          Already have an account? <Link to="/">Log In</Link>
        </p>
      </form>
    </div>
  );
};

const styles = {
  authContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    backgroundColor: "#f0f0f0",
  },
  authForm: {
    backgroundColor: "white",
    padding: "2rem",
    borderRadius: "8px",
    boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
    width: "350px",
  },
  heading: {
    textAlign: "center",
    marginBottom: "1.5rem",
    fontSize: "24px",
    color: "#333",
  },
  inputContainer: {
    marginBottom: "1rem",
  },
  input: {
    width: "100%",
    padding: "0.75rem",
    border: "1px solid #ddd",
    borderRadius: "4px",
  },
  submitBtn: {
    width: "100%",
    padding: "0.75rem",
    backgroundColor: "#6c5ce7",
    color: "white",
    border: "none",
    borderRadius: "4px",
    fontSize: "16px",
    cursor: "pointer",
    transition: "background-color 0.3s ease",
  },
  submitBtnHover: {
    backgroundColor: "#5a4bcf",
  },
  switchPage: {
    textAlign: "center",
    marginTop: "1rem",
  },
};

export default Signup;
