import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "./firebaseConfig";

function Login({ setPage,setDocId }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const handleLogin = async (e) => {
    e.preventDefault();

    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        alert("Login Successful!");
        // You can redirect the user to another page or perform further actions
        const uid = userCredential.user.uid;
        setDocId(uid)
        setPage("Home")
    } catch (err) {
        setError(err.message);
    }
  };
  const handleclick=()=>{
    setPage("SignUp")
  }
  return (
    <div style={{ padding: "20px" }}>
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
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
        <button onClick={handleclick} style={{ background: "none", border: "none", color: "blue", textDecoration: "underline", cursor: "pointer" }}>
          Sign Up
        </button>
      </p>
    </div>
  );
}

export default Login;
