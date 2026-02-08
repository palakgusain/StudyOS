import React from "react";
import { useNavigate } from "react-router-dom";
import AuthLayout from "../components/AuthLayout";
import GoogleIcon from "../assets/google.svg";
import { useState } from "react";



export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleGoogleAuth = () => {
    alert("Google authentication will be enabled soon.");
  };

  const handleLogin = async (e) => {
  e.preventDefault();

  try {
    const res = await fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      alert(data.message || "Login failed");
      return;
    }

    // Save token and user
    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(data.user));
    localStorage.setItem("isAuth", "true");

    navigate("/welcome");
  } catch (err) {
    alert("Server error");
  }
};


  return (
    <AuthLayout>
      <h2 className="heading-lg text-2xl mb-6">
        Log in to your account
      </h2>

      <form className="space-y-4" onSubmit={handleLogin}>

        {/* Email */}
        <input
  type="email"
  placeholder="Email"
  value={email}
  onChange={(e) => setEmail(e.target.value)}
  className="w-full mb-4 p-3 border rounded"
/>

<input
  type="password"
  placeholder="Password"
  value={password}
  onChange={(e) => setPassword(e.target.value)}
  className="w-full mb-6 p-3 border rounded"
/>


        {/* Login Button */}
        <button
          type="submit"
          className="w-full py-3 rounded-xl font-heading font-semibold bg-navy text-white hover:opacity-90 transition"
        >
          Log In
        </button>
      </form>

      {/* Divider */}
      <div className="my-6 flex items-center gap-3">
        <div className="flex-1 h-px bg-gray-300"></div>
        <span className="text-sm text-textMuted">or</span>
        <div className="flex-1 h-px bg-gray-300"></div>
      </div>

      {/* Google Login */}
      <button
        onClick={handleGoogleAuth}
        className="w-full border border-gray-300 py-3 rounded-xl flex items-center justify-center gap-3 bg-white hover:bg-gray-50 transition"
      >
        <img src={GoogleIcon} alt="Google" className="w-5 h-5" />
        <span className="font-heading font-semibold text-sm text-textPrimary">
          Continue with Google
        </span>
      </button>

      {/* Signup link */}
      <p className="text-sm text-center text-textMuted mt-6">
        New to StudyOS?{" "}
        <span
          onClick={() => navigate("/signup")}
          className="text-navy font-semibold cursor-pointer"
        >
          Create an account
        </span>
      </p>
    </AuthLayout>
  );
}
