import React from "react";

export default function AuthLayout({ children }) {
  return (
    <div className="min-h-screen flex">
      {/* LEFT PANEL – BRAND / PHILOSOPHY */}
      <div className="hidden md:flex w-1/2 bg-paper items-center justify-center px-20">
        <div>
          <h1 className="heading-xl text-5xl mb-4">
  StudyOS
</h1>


          <p className="font-body text-lg text-textPrimary mb-6">
            We plan. You execute.
          </p>

          {/* Accent line (ONLY ONE YELLOW USAGE) */}
          <div className="h-1 w-16 bg-accent rounded-full"></div>
        </div>
      </div>

      {/* RIGHT PANEL – FORM AREA */}
      <div className="w-full md:w-1/2 flex items-center justify-center px-6">
        <div className="w-full max-w-md">
          {children}
        </div>
      </div>
    </div>
  );
}
