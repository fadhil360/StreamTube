import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "./firebaseConfig";

function Login({ setPage, setDocId }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e, skipLogin = false) => {
    e && e.preventDefault(); // Prevent form submission

    if (skipLogin) {
      // Skip login and set default values
      setDocId("NajrJFyow3UVUTxomku8wUjjYBT2");
      setPage("Home");
      return;
    }

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      alert("Login Successful!");
      const uid = userCredential.user.uid;
      setDocId(uid);
      setPage("Home");
    } catch (err) {
      setError(err.message);
    }
  };

  const handleSignUpClick = () => {
    setPage("SignUp");
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Login</h1>
      <form onSubmit={(e) => handleLogin(e, false)}>
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
        <button type="submit">Login</button>
      </form>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <p>
        Don't have an account?{" "}
        <button
          onClick={handleSignUpClick}
          style={{
            background: "none",
            border: "none",
            color: "blue",
            textDecoration: "underline",
            cursor: "pointer",
          }}
        >
          Sign Up
        </button>
      </p>
      <hr />
      <button
        onClick={() => handleLogin(null, true)} // Skip login
        style={{
          padding: "10px 20px",
          backgroundColor: "#007bff",
          color: "#fff",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
          marginTop: "10px",
        }}
      >
        Login as Guest
      </button>
    </div>
  );
}

export default Login;
