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
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        marginTop: "50px",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <h2 style={{ marginBottom: "20px" }}>Log In to Streamtube</h2>
      <form
        onSubmit={(e) => handleLogin(e, false)}
        style={{
          display: "flex",
          flexDirection: "column",
          width: "300px",
          gap: "10px",
        }}
      >
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{
            padding: "10px",
            border: "1px solid gray",
            borderRadius: "10px",
            fontSize: "16px",
          }}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{
            padding: "10px",
            border: "1px solid gray",
            borderRadius: "10px",
            fontSize: "16px",
          }}
          required
        />
        <button
          type="submit"
          style={{
            padding: "10px",
            borderRadius: "10px",
            backgroundColor: "darkred",
            color: "white",
            border: "none",
            fontSize: "16px",
            cursor: "pointer",
          }}
        >
          Log in
        </button>
      </form>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <p style={{ marginTop: "10px" }}>
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
      <hr style={{ width: "300px", margin: "20px 0" }} />
      <button
        onClick={() => handleLogin(null, true)} // Skip login
        style={{
          padding: "10px 20px",
          backgroundColor: "#007bff",
          color: "#fff",
          border: "none",
          borderRadius: "10px",
          fontSize: "16px",
          cursor: "pointer",
        }}
      >
        Login as Guest
      </button>
    </div>
  );
}

export default Login;
