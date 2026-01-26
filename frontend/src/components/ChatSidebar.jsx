import { useNavigate } from "react-router-dom";

export default function ChatSidebar() {
  const navigate = useNavigate();

  return (
    <div className="w-16 bg-white border-r flex flex-col items-center py-6 gap-6">
      
      <button
        onClick={() => navigate("/dashboard")}
        className="text-xl hover:scale-110 transition"
        title="Dashboard"
      >
        🏠
      </button>

      <button
        className="text-xl hover:scale-110 transition"
        title="Quick Notes"
      >
        📝
      </button>

      <button
        className="text-xl hover:scale-110 transition"
        title="Reminders"
      >
        ⏰
      </button>

      <div className="flex-1" />

      {/* Locked / Disabled */}
      <div className="text-xl opacity-30" title="Revision (locked)">
        📚
      </div>

      <div className="text-xl opacity-30" title="Settings (locked)">
        ⚙️
      </div>
    </div>
  );
}
