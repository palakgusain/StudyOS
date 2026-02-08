import { useState } from "react";
import ChatSidebar from "../components/ChatSidebar";
import { useSchedule } from "../context/ScheduleContext";


/* ---------- HELPERS ---------- */
const toMinutes = (time) => {
  const [h, m] = time.split(":").map(Number);
  return h * 60 + m;
};

const toTime = (mins) => {
  const h = String(Math.floor(mins / 60)).padStart(2, "0");
  const m = String(mins % 60).padStart(2, "0");
  return `${h}:${m}`;
};

/* ---------- INITIAL ---------- */
const initialSchedule = [
  { id: 1, title: "Java", duration: 90, start: "09:00" },
  { id: 2, title: "Break", duration: 15, start: "10:30" },
  { id: 3, title: "DSA", duration: 75, start: "10:45" },
  { id: 4, title: "Revision", duration: 30, start: "12:00" },
];

export default function Reminders() {
  

const { schedule, setSchedule } = useSchedule();


  const [activeTask, setActiveTask] = useState(null);
  const [editedTime, setEditedTime] = useState("");
  const [modalMode, setModalMode] = useState("edit");

  /* ---------- TOTAL HOURS ---------- */
  const totalMinutes = schedule
    .filter((t) => t.title !== "Break")
    .reduce((sum, t) => sum + t.duration, 0);

  const totalStudyText = `${Math.floor(totalMinutes / 60)}h ${
    totalMinutes % 60
  }m`;

  /* ---------- SAVE TIME ---------- */
  const saveTimeChange = () => {
    const updated = [...schedule];
    let startMin = toMinutes(editedTime);

    for (let i = activeTask.index; i < updated.length; i++) {
      updated[i].start = toTime(startMin);
      startMin += updated[i].duration;
    }

    setSchedule(updated);
    setActiveTask(null);
  };

  /* ---------- SNOOZE ---------- */
  const snoozeTask = (mins) => {
    const base = toMinutes(activeTask.start);
    const newTime = toTime(base + mins);

    const updated = [...schedule];
    let startMin = toMinutes(newTime);

    for (let i = activeTask.index; i < updated.length; i++) {
      updated[i].start = toTime(startMin);
      startMin += updated[i].duration;
    }

    setSchedule(updated);
    setActiveTask(null);
  };

  /* ---------- DATE ---------- */
  const today = new Date();
  const dayText = today.toLocaleDateString("en-US", {
    weekday: "long",
    day: "numeric",
    month: "short",
  });

  return (
    <div className="min-h-screen flex bg-[#f6f7fb] dark:bg-[#0b1220]">
      <ChatSidebar />

      <div className="flex-1 px-12 py-10">
        {/* HEADER */}
        <div className="flex justify-between mb-8">
          <div>
            <h1 className="text-3xl font-extrabold dark:text-white">
              Today’s Tasks
            </h1>
            <p className="text-slate-500 dark:text-slate-400 mt-1">
              Total study time: {totalStudyText}
            </p>
          </div>

          <div className="text-slate-500 dark:text-slate-400">
            {dayText}
          </div>
        </div>

        {/* TASK LIST */}
        <div className="space-y-5 max-w-2xl">
          {schedule.map((task, index) => (
            <div
              key={task.id}
              className="bg-white dark:bg-slate-900 border
                         border-slate-200 dark:border-slate-700
                         rounded-2xl p-5"
            >
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="font-semibold text-lg dark:text-white">
                    {task.title}
                  </h2>
                  <p className="text-sm text-slate-500">
                    {task.start} –{" "}
                    {toTime(toMinutes(task.start) + task.duration)}
                  </p>
                </div>

                <div className="flex gap-3 text-xl">
                  {/* EDIT */}
                  <button
                    title="Edit"
                    onClick={() => {
                      setActiveTask({ ...task, index });
                      setEditedTime(task.start);
                      setModalMode("edit");
                    }}
                  >
                    ✏️
                  </button>

                  {/* SNOOZE */}
                  <button
                    title="Snooze"
                    onClick={() => {
                      setActiveTask({ ...task, index });
                      setModalMode("snooze");
                    }}
                  >
                    ⏰
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* MODAL */}
      {activeTask && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={() => setActiveTask(null)}
          />

          <div className="relative bg-white dark:bg-slate-900
                          rounded-3xl p-6 w-[360px] z-10">
            <h2 className="text-xl font-bold mb-3 dark:text-white">
              {modalMode === "edit" ? "Edit Task Time" : "Snooze Task"}
            </h2>

            <p className="text-slate-500 mb-4">
              {activeTask.title}
            </p>

            {modalMode === "edit" && (
              <>
                <label className="text-sm text-slate-600 dark:text-slate-400">
                  Start Time
                </label>

                <input
                  type="time"
                  value={editedTime}
                  onChange={(e) => setEditedTime(e.target.value)}
                  className="w-full mt-2 px-3 py-2 rounded-lg
                             bg-white dark:bg-slate-800
                             border dark:border-slate-700
                             dark:text-white"
                />

                <button
                  onClick={saveTimeChange}
                  className="mt-6 w-full py-2 rounded-xl
                             bg-indigo-600 text-white font-semibold"
                >
                  Save Changes
                </button>
              </>
            )}

            {modalMode === "snooze" && (
              <div className="flex gap-3 justify-center mt-4">
                <button
                  onClick={() => snoozeTask(10)}
                  className="px-4 py-2 border rounded-lg"
                >
                  +10 min
                </button>

                <button
                  onClick={() => snoozeTask(30)}
                  className="px-4 py-2 border rounded-lg"
                >
                  +30 min
                </button>

                <button
                  onClick={() => snoozeTask(60)}
                  className="px-4 py-2 border rounded-lg"
                >
                  +1 hour
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
