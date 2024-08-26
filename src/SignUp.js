import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth"; // Import Firebase method
import { auth } from "./firebase"; // Import auth instance from firebase.js

const SignUp = () => {
  const [email, setEmail] = useState(""); // State to hold email
  const [password, setPassword] = useState(""); // State to hold password
  const [error, setError] = useState(""); // State to hold any error message

  // Define the handleSignUp function inside the component
  const handleSignUp = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      console.log("User created successfully:", user);
    } catch (error) {
      setError(error.message); // Set the error message in the state
      console.error("Error during sign-up:", error.message);
    }
  };

  return (
    <div>
      <h1>Sign Up</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}{" "}
      {/* Display error message if exists */}
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />
      <button onClick={handleSignUp}>Sign Up</button>
    </div>
  );
};

export default SignUp;
