import { useEffect, useState } from "react";
import ChatSidebar from "../components/ChatSidebar";
import { useTheme } from "../context/ThemeContext";

export default function Settings() {
  const { theme, toggleTheme } = useTheme();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [dailyHours, setDailyHours] = useState(4);
  const [snooze, setSnooze] = useState(30);
  const [notifications, setNotifications] = useState(true);

  // NEW: study mode
  const [studyMode, setStudyMode] = useState("daily");

  // NEW: password fields
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user")) || {};
    setName(user.name || "");
    setEmail(user.email || "");
    setStudyMode(user.studyMode || "daily");

    const prefs = JSON.parse(localStorage.getItem("prefs")) || {};
    setDailyHours(prefs.dailyHours || 4);
    setSnooze(prefs.snooze || 30);
    setNotifications(prefs.notifications ?? true);
  }, []);

  const saveSettings = () => {
    localStorage.setItem(
      "user",
      JSON.stringify({ name, email, studyMode })
    );

    localStorage.setItem(
      "prefs",
      JSON.stringify({
        dailyHours,
        snooze,
        notifications,
      })
    );

    alert("Settings saved");
  };

  // NEW: password change
  const handlePasswordChange = async () => {
    if (!currentPassword || !newPassword) {
      alert("Fill both password fields");
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/api/auth/password", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          currentPassword,
          newPassword,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message);
        return;
      }

      alert("Password updated successfully");
      setCurrentPassword("");
      setNewPassword("");
    } catch (err) {
      alert("Server error");
    }
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
        {/* PAGE TITLE */}
        <h1 className="text-3xl font-extrabold mb-10 text-slate-900 dark:text-white">
          Settings
        </h1>

        {/* PROFILE */}
        <Section title="Profile">
          <div className="space-y-4">
            <Input label="Name" value={name} setValue={setName} />
            <Input label="Email" value={email} setValue={setEmail} />
          </div>
        </Section>

        {/* STUDY PREFERENCES */}
        <Section title="Study Preferences">
          <div className="space-y-4">
            {/* NEW: Study mode selector */}
            <label className="block">
              <span className="text-slate-600 dark:text-slate-400">
                Study mode
              </span>
              <select
                value={studyMode}
                onChange={(e) => setStudyMode(e.target.value)}
                className="w-full mt-1 px-4 py-2 border rounded-xl
                           bg-white dark:bg-slate-800
                           text-slate-900 dark:text-white"
              >
                <option value="daily">Daily discipline</option>
                <option value="exam">Exam focused</option>
              </select>
            </label>

            <Input
              label="Daily study hours"
              type="number"
              value={dailyHours}
              setValue={setDailyHours}
            />
            <Input
              label="Default snooze (minutes)"
              type="number"
              value={snooze}
              setValue={setSnooze}
            />
          </div>
        </Section>

        {/* CHANGE PASSWORD */}
        <Section title="Change Password">
          <div className="space-y-4">
            <Input
              label="Current password"
              type="password"
              value={currentPassword}
              setValue={setCurrentPassword}
            />
            <Input
              label="New password"
              type="password"
              value={newPassword}
              setValue={setNewPassword}
            />

            <button
              onClick={handlePasswordChange}
              className="px-6 py-2 bg-indigo-600 text-white rounded-xl font-semibold"
            >
              Update Password
            </button>
          </div>
        </Section>

        {/* APPEARANCE */}
        <Section title="Appearance">
          <div className="flex items-center justify-between">
            <span className="text-slate-700 dark:text-slate-300">
              Theme
            </span>

            <button
              onClick={toggleTheme}
              className="px-5 py-2 bg-indigo-600 text-white rounded-xl font-semibold"
            >
              {theme === "dark" ? "Light Mode" : "Dark Mode"}
            </button>
          </div>
        </Section>

        {/* NOTIFICATIONS */}
        <Section title="Notifications">
          <div className="flex items-center justify-between">
            <span className="text-slate-700 dark:text-slate-300">
              Task reminders
            </span>

            <Toggle
              enabled={notifications}
              setEnabled={setNotifications}
            />
          </div>
        </Section>

        {/* ACCOUNT */}
        <Section title="Account & Data">
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
        </Section>

        {/* SAVE BUTTON */}
        <div className="mt-10">
          <button
            onClick={saveSettings}
            className="w-full py-4 bg-indigo-600 text-white rounded-2xl font-bold text-lg"
          >
            Save Settings
          </button>
        </div>
      </div>
    </div>
  );
}

/* ---------------- COMPONENTS ---------------- */

function Section({ title, children }) {
  return (
    <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 mb-6 border dark:border-slate-700">
      <h2 className="text-lg font-bold mb-4 text-slate-900 dark:text-white">
        {title}
      </h2>
      {children}
    </div>
  );
}

function Input({ label, value, setValue, type = "text" }) {
  return (
    <label className="block">
      <span className="text-slate-600 dark:text-slate-400">
        {label}
      </span>
      <input
        type={type}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="w-full mt-1 px-4 py-2 border rounded-xl
                   bg-white dark:bg-slate-800
                   text-slate-900 dark:text-white"
      />
    </label>
  );
}

function Toggle({ enabled, setEnabled }) {
  return (
    <button
      onClick={() => setEnabled(!enabled)}
      className={`w-12 h-7 flex items-center rounded-full p-1 transition
        ${enabled ? "bg-indigo-600" : "bg-slate-300"}`}
    >
      <div
        className={`bg-white w-5 h-5 rounded-full shadow-md transform transition
          ${enabled ? "translate-x-5" : ""}`}
      />
    </button>
  );
}
