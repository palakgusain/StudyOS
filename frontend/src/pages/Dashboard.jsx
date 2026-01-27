import React, { useEffect, useRef, useState } from "react";
import ChatSidebar from "../components/ChatSidebar";

const PLAN = [
  { task: "DSA – Arrays practice", duration: 60 },
  { task: "Java – OOP revision", duration: 40 },
  { task: "Quick revision", duration: 20 },
];

export default function Dashboard() {
  const user = JSON.parse(localStorage.getItem("user")) || { name: "Student" };
  const isDailyUser = !!localStorage.getItem("dailyDetails");

  /* ---------------- THEME ---------------- */
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const theme = localStorage.getItem("theme");
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
      setDark(true);
    }
  }, []);

  const toggleTheme = () => {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle("dark", next);
    localStorage.setItem("theme", next ? "dark" : "light");
  };

  /* ---------------- GREETING ---------------- */
  const hour = new Date().getHours();
  const greeting =
    hour < 12
      ? "Good morning"
      : hour < 17
      ? "Good afternoon"
      : hour < 22
      ? "Good evening"
      : "Good night";

  /* ---------------- TASK STATE ---------------- */
  const [activeIndex, setActiveIndex] = useState(0);
  const [runningIndex, setRunningIndex] = useState(null);
  const [remainingSec, setRemainingSec] = useState(null);

  const timerRef = useRef(null);

  const startTask = (index) => {
    if (timerRef.current) clearInterval(timerRef.current);

    setRunningIndex(index);
    setRemainingSec(PLAN[index].duration * 60);

    timerRef.current = setInterval(() => {
      setRemainingSec((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current);
          setRunningIndex(null);
          setRemainingSec(null);
          setActiveIndex((i) => i + 1);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const nextStartsInMin =
    runningIndex !== null
      ? Math.ceil(PLAN[runningIndex].duration)
      : null;

  /* ---------------- PROGRESS RING ---------------- */
  const totalTasks = PLAN.length;
  const completedTasks = activeIndex;
  const progress = Math.round((completedTasks / totalTasks) * 100);

  const radius = 32;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (progress / 100) * circumference;

  /* ---------------- STREAK + CALENDAR ---------------- */
  const streak = 7; // mock
  const [showCalendar, setShowCalendar] = useState(false);
  const [monthOffset, setMonthOffset] = useState(0);
  const calendarRef = useRef(null);

  useEffect(() => {
    const outside = (e) => {
      if (calendarRef.current && !calendarRef.current.contains(e.target)) {
        setShowCalendar(false);
      }
    };
    if (showCalendar) document.addEventListener("mousedown", outside);
    return () => document.removeEventListener("mousedown", outside);
  }, [showCalendar]);

  const today = new Date();
  const viewDate = new Date(
    today.getFullYear(),
    today.getMonth() + monthOffset,
    1
  );
  const daysInMonth = new Date(
    viewDate.getFullYear(),
    viewDate.getMonth() + 1,
    0
  ).getDate();

  return (
    <div className="min-h-screen flex bg-[#f6f7fb] dark:bg-[#0b1220]">
      <ChatSidebar />

      <div className="flex-1 px-10 py-8">
        {/* HEADER */}
        <div className="flex justify-between items-center mb-10">
          <div>
            <h1 className="text-3xl font-extrabold dark:text-white">
              {greeting}, {user.name} 👋
            </h1>
            <p className="text-slate-600 dark:text-slate-400">
              Your plan is ready. Follow it step by step.
            </p>
          </div>

          <div className="flex items-center gap-6 relative">
            {/* Progress Ring */}
            <svg width="80" height="80">
              <circle
                cx="40"
                cy="40"
                r={radius}
                stroke="#e5e7eb"
                strokeWidth="6"
                fill="none"
              />
              <circle
                cx="40"
                cy="40"
                r={radius}
                stroke="#4f46e5"
                strokeWidth="6"
                fill="none"
                strokeDasharray={circumference}
                strokeDashoffset={offset}
                strokeLinecap="round"
                transform="rotate(-90 40 40)"
              />
              <text
                x="50%"
                y="50%"
                textAnchor="middle"
                dominantBaseline="middle"
                className="fill-slate-800 dark:fill-white text-sm font-bold"
              >
                {progress}%
              </text>
            </svg>

            {/* Streak */}
            {isDailyUser && (
              <div
                className="cursor-pointer text-orange-500 font-semibold"
                onClick={() => setShowCalendar(true)}
              >
                🔥 {streak}

                {showCalendar && (
                  <div
                    ref={calendarRef}
                    className="absolute right-0 top-12 bg-white dark:bg-slate-900
                               border dark:border-slate-700 rounded-xl p-4
                               shadow-lg w-72 z-50"
                  >
                    <div className="flex justify-between mb-3">
                      <button onClick={() => setMonthOffset((m) => m - 1)}>
                        ◀
                      </button>
                      <p className="font-semibold text-sm dark:text-white">
                        {viewDate.toLocaleString("default", {
                          month: "long",
                          year: "numeric",
                        })}
                      </p>
                      <button onClick={() => setMonthOffset((m) => m + 1)}>
                        ▶
                      </button>
                    </div>

                    <div className="grid grid-cols-7 gap-2 text-xs">
                      {[...Array(daysInMonth)].map((_, i) => (
                        <div
                          key={i}
                          className={`h-8 w-8 flex items-center justify-center rounded-md
                            ${
                              i >= daysInMonth - streak
                                ? "bg-orange-500 text-white"
                                : "bg-slate-200 dark:bg-slate-700"
                            }
                          `}
                        >
                          {i + 1}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Theme */}
            <button
              onClick={toggleTheme}
              className="w-10 h-10 rounded-full bg-white dark:bg-slate-800
                         border dark:border-slate-700 flex items-center justify-center"
            >
              {dark ? "🌙" : "☀️"}
            </button>
          </div>
        </div>

        {/* TASK LIST */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 max-w-3xl">
          <h2 className="text-xl font-bold mb-6 dark:text-white">
            Today’s plan
          </h2>

          {PLAN.map((item, i) => {
            const isRunning = i === runningIndex;
            const isActive = i === activeIndex;
            const isNext = runningIndex !== null && i === runningIndex + 1;

            return (
              <div
                key={i}
                className={`flex items-center justify-between p-4 rounded-2xl mb-3
                  ${
                    isActive
                      ? "bg-indigo-50 dark:bg-indigo-950 border border-indigo-400"
                      : "bg-slate-100 dark:bg-slate-800 opacity-70"
                  }
                `}
              >
                <p className="font-semibold dark:text-white">
                  {item.task}
                </p>

                {isRunning && (
                  <span className="text-indigo-600 font-semibold">
                    In progress
                  </span>
                )}

                {isActive && !isRunning && (
                  <button
                    onClick={() => startTask(i)}
                    className="px-5 py-2 bg-indigo-600 text-white rounded-xl font-semibold"
                  >
                    Start
                  </button>
                )}

                {isNext && (
                  <span className="text-slate-500">
                    ⏳ Starts in {nextStartsInMin} min
                  </span>
                )}

                {i < activeIndex && (
                  <span className="text-green-600 font-medium">
                    ✓ Completed
                  </span>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
