import React, { useState } from "react";
import AuthLayout from "../components/AuthLayout";
import GoogleIcon from "../assets/google.svg";

const countries = [
  { name: "India", code: "+91" },
  { name: "United States", code: "+1" },
  { name: "United Kingdom", code: "+44" },
];

export default function Signup() {
  const [countryCode, setCountryCode] = useState("+91");
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);

  return (
    <AuthLayout>
      <h2 className="heading-lg text-2xl mb-6">
        Create your account
      </h2>

      <form className="space-y-4">
        {/* Name */}
        <div className="flex gap-3">
          <input
            type="text"
            placeholder="First name"
            className="input w-1/2"
            required
          />
          <input
            type="text"
            placeholder="Last name"
            className="input w-1/2"
            required
          />
        </div>

        {/* Country */}
        <select
          className="input"
          value={countryCode}
          onChange={(e) => setCountryCode(e.target.value)}
          required
        >
          {countries.map((c) => (
            <option key={c.code} value={c.code}>
              {c.name}
            </option>
          ))}
        </select>

        {/* Phone + Country Code */}
        <div className="flex items-center">
          <div className="px-4 py-3 bg-surface border border-r-0 border-gray-300 rounded-l-xl font-body">
            {countryCode}
          </div>

          <input
            type="tel"
            placeholder="Phone number"
            className="flex-1 px-4 py-3 border border-gray-300 rounded-r-xl focus:outline-none focus:ring-2 focus:ring-accent"
            required
          />

          <button
            type="button"
            onClick={() => setOtpSent(true)}
            className="ml-3 btn-primary px-4 text-sm"
          >
            Send OTP
          </button>
        </div>

        {/* OTP */}
        {otpSent && (
          <div className="flex gap-3">
            <input
              type="text"
              placeholder="Enter OTP"
              className="input flex-1"
              required
            />
            <button
              type="button"
              onClick={() => setOtpVerified(true)}
              className="btn-accent px-4 text-sm"
            >
              Verify
            </button>
          </div>
        )}

        {/* Email */}
        <input
          type="email"
          placeholder="Email address"
          className="input"
          required
        />

        {/* Password */}
        <input
          type="password"
          placeholder="Create password"
          className="input"
          required
        />

        {/* Submit */}
        <button
          type="submit"
          disabled={!otpVerified}
          className={`w-full py-3 rounded-xl font-heading font-semibold mt-2 transition
            ${
              otpVerified
                ? "bg-navy text-white hover:opacity-90"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }
          `}
        >
          Create Account
        </button>
      </form>

      {/* Divider */}
      <div className="my-6 flex items-center gap-3">
        <div className="flex-1 h-px bg-gray-300"></div>
        <span className="text-sm text-textMuted">or</span>
        <div className="flex-1 h-px bg-gray-300"></div>
      </div>

      {/* Google Signup */}
      <button className="w-full border border-gray-300 py-3 rounded-xl flex items-center justify-center gap-3 bg-white hover:bg-gray-50 transition">
        <img src={GoogleIcon} alt="Google" className="w-5 h-5" />
        <span className="font-heading font-semibold text-sm text-textPrimary">
          Sign up with Google
        </span>
      </button>

      {/* Login Link */}
      <p className="text-sm text-center text-textMuted mt-6">
        Already have an account?{" "}
        <span className="text-navy font-semibold cursor-pointer">
          Log in
        </span>
      </p>
    </AuthLayout>
  );
}
