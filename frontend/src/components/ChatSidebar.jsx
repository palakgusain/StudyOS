import { useNavigate } from "react-router-dom";
const dayCompleted = localStorage.getItem("dayCompleted") === "true";

export default function ChatSidebar() {
  const navigate = useNavigate();

  return (
    <div className="w-16 bg-white dark:bg-slate-900 border-r dark:border-slate-800
                    flex flex-col items-center py-6 gap-6">

      {/* Dashboard */}
      <button
        onClick={() => navigate("/dashboard")}
        className="text-xl hover:scale-110 transition"
        title="Dashboard"
      >
        🏠
      </button>

      {/* Notes */}
      <button
        onClick={() => navigate("/notes")}
        className="text-xl hover:scale-110 transition"
        title="Notes"
      >
        📝
      </button>

      {/* Reminders */}
      <button
        onClick={() => navigate("/reminders")}
        className="text-xl hover:scale-110 transition"
        title="Reminders"
      >
        ⏰
      </button>

      <div className="flex-1" />

      {/* Revision (locked for now) */}
      <button
  onClick={() => {
    if (dayCompleted) navigate("/revision");
  }}
  className={`text-xl transition ${
    dayCompleted
      ? "hover:scale-110 cursor-pointer"
      : "opacity-30 cursor-not-allowed"
  }`}
  title={
    dayCompleted
      ? "Revision"
      : "Complete today's plan to unlock revision"
  }
>
  📚
</button>


      {/* Settings (UNLOCKED) */}
      <button
        onClick={() => navigate("/settings")}
        className="text-xl hover:scale-110 transition"
        title="Settings"
      >
        ⚙️
      </button>
    </div>
  );
}
