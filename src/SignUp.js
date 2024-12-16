import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "./firebaseConfig";

function SignUp({ setPage }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSignUp = async (e) => {
    e.preventDefault();

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      alert("Sign-Up Successful! You can now log in.");
      setPage("Login"); // Navigate to Login page
    } catch (err) {
      setError(err.message);
    }
  };
  const handleclick=()=>{
    setPage("Login")
  }
  return (
    <div style={{ padding: "20px" }}>
      <h1>Sign Up</h1>
      <form onSubmit={handleSignUp}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">Sign Up</button>
      </form>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <p>
        Already have an account?{" "}
        <button onClick={handleclick} style={{ background: "none", border: "none", color: "blue", textDecoration: "underline", cursor: "pointer" }}>
          Log In
        </button>
      </p>
    </div>
  );
}

export default SignUp;
