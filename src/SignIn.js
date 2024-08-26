import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth"; // Import Firebase method for sign in
import { auth } from "./firebase"; // Import auth instance from firebase.js

const SignIn = () => {
  const [email, setEmail] = useState(""); // State to hold email
  const [password, setPassword] = useState(""); // State to hold password
  const [error, setError] = useState(""); // State to hold any error message

  // Define the handleSignIn function inside the component
  const handleSignIn = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      console.log("User signed in successfully:", user);
    } catch (error) {
      setError(error.message); // Set the error message in the state
      console.error("Error during sign-in:", error.message);
    }
  };

  return (
    <div>
      <h1>Sign In</h1>
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
      <button onClick={handleSignIn}>Sign In</button>
    </div>
  );
};

export default SignIn;
