import React, { useState, useEffect } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "./firebaseConfig";

function Login({ setPage, setDocId }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [currentImage, setCurrentImage] = useState(0);

  // Daftar gambar untuk background
  const images = [
    "/images/1.jpg",
    "/images/2.jpg",
    "/images/3.jpg",
  ];

  // Mengatur pergantian background setiap 5 detik
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prevImage) => (prevImage + 1) % images.length); // Loop kembali ke gambar pertama
    }, 5000); // Ganti setiap 5000ms (5 detik)

    return () => clearInterval(interval); // Membersihkan interval saat komponen di-unmount
  }, [images.length]);

  const handleLogin = async (e, skipLogin = false) => {
    e && e.preventDefault();

    if (skipLogin) {
      setDocId("NajrJFyow3UVUTxomku8wUjjYBT2");
      setPage("Home");
      return;
    }

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
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
      className="min-h-screen flex items-center justify-center bg-cover bg-center transition-all duration-1000"
      style={{
        backgroundImage: `url(${images[currentImage]})`, // Ambil gambar berdasarkan state
      }}
    >
      <div className="w-full max-w-md p-8 bg-white bg-opacity-65 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-center mb-8">
          Log In to Streamtube
        </h1>
        <form onSubmit={(e) => handleLogin(e, false)} className="space-y-6">
          <div>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-200"
              required
            />
          </div>
          <div>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-200"
              required
            />
          </div>
          {error && (
            <p className="text-red-500 text-sm text-center">{error}</p>
          )}
          <button
            type="submit"
            className="w-full bg-red-800 hover:bg-red-900 text-white font-medium py-3 px-4 rounded-full transition-colors"
          >
            Log In
          </button>
        </form>
        <p className="text-center mt-4 text-sm">
          Don't have an account?{" "}
          <button
            onClick={handleSignUpClick}
            className="text-[#A10D00] underline focus:outline-none"
          >
            Sign Up
          </button>
        </p>
        <hr className="my-6" />
      </div>
    </div>
  );
}

export default Login;
