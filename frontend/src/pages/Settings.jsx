import { useEffect, useState } from "react";
import ChatSidebar from "../components/ChatSidebar";
import { useTheme } from "../context/ThemeContext";

export default function Settings() {
  const { theme, toggleTheme } = useTheme();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [dailyHours, setDailyHours] = useState(4);
  const [snooze, setSnooze] = useState(30);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user")) || {};
    setName(user.name || "");
    setEmail(user.email || "");

    const prefs = JSON.parse(localStorage.getItem("prefs")) || {};
    setDailyHours(prefs.dailyHours || 4);
    setSnooze(prefs.snooze || 30);
  }, []);

  const saveSettings = () => {
    localStorage.setItem("user", JSON.stringify({ name, email }));
    localStorage.setItem(
      "prefs",
      JSON.stringify({ dailyHours, snooze })
    );
    alert("Settings saved");
  };

  const resetDay = () => {
    localStorage.setItem("activeIndex", "0");
    localStorage.setItem("dayCompleted", "false");
    window.location.reload();
  };

  const clearAll = () => {
    localStorage.clear();
    window.location.href = "/signup";
  };

  return (
    <div className="min-h-screen flex bg-[#f6f7fb] dark:bg-[#0b1220]">
      <ChatSidebar />

      <div className="flex-1 px-12 py-10 max-w-4xl">
        <h1 className="text-3xl font-extrabold mb-8 text-slate-900 dark:text-white">
          Settings
        </h1>

        {/* PROFILE */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 mb-6 border dark:border-slate-700">
          <h2 className="text-lg font-bold mb-4 text-slate-900 dark:text-white">
            Profile
          </h2>

          <div className="space-y-4">
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Name"
              className="w-full px-4 py-2 border rounded-xl
                         bg-white dark:bg-slate-800
                         text-slate-900 dark:text-white"
            />
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              className="w-full px-4 py-2 border rounded-xl
                         bg-white dark:bg-slate-800
                         text-slate-900 dark:text-white"
            />
          </div>
        </div>

        {/* STUDY PREFERENCES */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 mb-6 border dark:border-slate-700">
          <h2 className="text-lg font-bold mb-4 text-slate-900 dark:text-white">
            Study Preferences
          </h2>

          <div className="space-y-4 text-slate-600 dark:text-slate-400">
            <label className="block">
              Daily study hours
              <input
                type="number"
                value={dailyHours}
                onChange={(e) =>
                  setDailyHours(e.target.value)
                }
                className="w-full mt-1 px-4 py-2 border rounded-xl
                           bg-white dark:bg-slate-800
                           text-slate-900 dark:text-white"
              />
            </label>

            <label className="block">
              Default snooze (minutes)
              <input
                type="number"
                value={snooze}
                onChange={(e) => setSnooze(e.target.value)}
                className="w-full mt-1 px-4 py-2 border rounded-xl
                           bg-white dark:bg-slate-800
                           text-slate-900 dark:text-white"
              />
            </label>
          </div>
        </div>

        {/* THEME */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 mb-6 border dark:border-slate-700">
          <h2 className="text-lg font-bold mb-4 text-slate-900 dark:text-white">
            Appearance
          </h2>

          <button
            onClick={toggleTheme}
            className="px-5 py-2 bg-indigo-600 text-white rounded-xl"
          >
            Toggle {theme === "dark" ? "Light" : "Dark"} Mode
          </button>
        </div>

        {/* ACCOUNT */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border dark:border-slate-700">
          <h2 className="text-lg font-bold mb-4 text-slate-900 dark:text-white">
            Account & Data
          </h2>

          <div className="flex gap-4 flex-wrap">
            <button
              onClick={resetDay}
              className="px-5 py-2 bg-yellow-500 text-white rounded-xl"
            >
              Reset Today
            </button>

            <button
              onClick={clearAll}
              className="px-5 py-2 bg-red-600 text-white rounded-xl"
            >
              Clear All Data
            </button>
          </div>
        </div>

        <div className="mt-8">
          <button
            onClick={saveSettings}
            className="px-8 py-3 bg-indigo-600 text-white rounded-2xl font-bold"
          >
            Save Settings
          </button>
        </div>
      </div>
    </div>
  );
}
