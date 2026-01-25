import React from "react";

export default function Layout({ children }) {
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <aside className="w-20 bg-white border-r flex flex-col items-center py-6 gap-8">
        <div className="w-10 h-10 bg-primary rounded-xl"></div>

        <nav className="flex flex-col gap-6 text-muted text-xl">
          <span>🏠</span>
          <span>📅</span>
          <span>📘</span>
          <span>📝</span>
          <span>📊</span>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
