import React, { useState, useEffect } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "./firebaseConfig";

function SignUp({ setPage }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
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

  const handleSignUp = async (e) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      alert("Sign-Up Successful! You can now log in.");
      setPage("Login"); // Navigate to Login page
    } catch (err) {
      setError("Failed to create account");
      console.error(err);
    }
  };

  const handleClick = () => {
    setPage("Login");
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center transition-all duration-1000"
      style={{
        backgroundImage: `url(${images[currentImage]})`, // Ambil gambar berdasarkan state
      }}
    >
      <div className="w-full max-w-md p-8 bg-white bg-opacity-60 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-center mb-8">
          Register to Streamtube
        </h1>
        <form onSubmit={handleSignUp} className="space-y-6">
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
          <div>
            <input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
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
            Sign Up
          </button>
        </form>
        <p className="text-center mt-4 text-sm">
          Already have an account?{" "}
          <button
            onClick={handleClick}
            className="text-[#A10D00] underline focus:outline-none"
          >
            Log In
          </button>
        </p>
      </div>
    </div>
  );
}

export default SignUp;
