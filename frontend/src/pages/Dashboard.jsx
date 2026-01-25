import React from "react";

export default function Dashboard() {
  const schedule = [
    {
      time: "4:00 – 5:00",
      task: "Java – OOP",
      isActive: true,
    },
    {
      time: "5:15 – 6:00",
      task: "LeetCode – 2 Medium",
      isActive: false,
    },
    {
      time: "6:30 – 7:30",
      task: "Backend – Express",
      isActive: false,
    },
  ];

  return (
    <div>
      {/* Heading */}
      <h1 className="text-2xl font-semibold mb-1">Today’s Focus</h1>
      <p className="text-muted mb-8">
        Follow the plan. No negotiations.
      </p>

      {/* Timeline */}
      <div className="space-y-4">
        {schedule.map((item, index) => (
          <div
            key={index}
            className={`rounded-xl p-5 flex justify-between items-center transition-all
              ${
                item.isActive
                  ? "bg-white border-l-4 border-primary shadow-md scale-[1.02]"
                  : "bg-white opacity-70"
              }
            `}
          >
            <div>
              <p className="text-muted text-sm">{item.time}</p>
              <p className="font-medium">{item.task}</p>
            </div>

            {item.isActive && (
              <span className="text-xs font-semibold text-primary bg-primary/10 px-3 py-1 rounded-full">
                In Progress
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
