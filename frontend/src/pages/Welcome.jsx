import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const quotes = [
  {
    text: "Discipline is the bridge between goals and accomplishment.",
    author: "Jim Rohn",
  },
  {
    text: "Success is the sum of small efforts repeated day in and day out.",
    author: "Robert Collier",
  },
  {
    text: "We are what we repeatedly do. Excellence is a habit.",
    author: "Aristotle",
  },
  {
    text: "The secret of getting ahead is getting started.",
    author: "Mark Twain",
  },
  {
    text: "It always seems impossible until it’s done.",
    author: "Nelson Mandela",
  },
];

export default function Welcome() {
  const navigate = useNavigate();
  const [quote, setQuote] = useState(null);
  const [show, setShow] = useState(false);
  const [animateOut, setAnimateOut] = useState(false);

  useEffect(() => {
    const dayIndex = new Date().getDate() % quotes.length;
    setQuote(quotes[dayIndex]);

    // start enter animation
    setTimeout(() => setShow(true), 200);

    // exit animation
    const exitTimer = setTimeout(() => {
      setAnimateOut(true);
    }, 8500);

    // redirect
    const redirectTimer = setTimeout(() => {
      navigate("/signup"); // later -> onboarding/dashboard
    }, 10000);

    return () => {
      clearTimeout(exitTimer);
      clearTimeout(redirectTimer);
    };
  }, [navigate]);

  if (!quote) return null;

  return (
    <div className="min-h-screen bg-paper flex items-center justify-center px-6 overflow-hidden">
      <div
        className={`text-center max-w-xl transform transition-all duration-[1200ms] ease-out
          ${
            show
              ? "opacity-100 scale-100"
              : "opacity-0 scale-95"
          }
          ${
            animateOut
              ? "opacity-0 scale-105"
              : ""
          }`}
      >
        {/* Heading */}
        <h1
          className={`heading-xl text-5xl mb-4 transition-all duration-700 delay-200
            ${show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"}
          `}
        >
          Welcome to StudyOS
        </h1>

        {/* Accent line */}
        <div
          className={`h-1 w-16 bg-accent mx-auto mb-6 rounded-full transition-all duration-700 delay-300
            ${show ? "opacity-100 scale-100" : "opacity-0 scale-90"}
          `}
        />

        {/* Tagline */}
        <p
          className={`font-body text-lg text-textPrimary mb-10 transition-all duration-700 delay-500
            ${show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"}
          `}
        >
          We plan. You execute.
        </p>

        {/* Quote */}
        <blockquote
          className={`font-body italic text-lg text-textMuted transition-all duration-700 delay-700
            ${show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"}
          `}
        >
          “{quote.text}”
          <br />
          <span className="not-italic text-sm mt-2 block text-textMuted">
            — {quote.author}
          </span>
        </blockquote>
      </div>
    </div>
  );
}
