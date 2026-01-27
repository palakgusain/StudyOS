import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function DailyDetails() {
  const navigate = useNavigate();

  const dailyOnboarding =
    JSON.parse(localStorage.getItem("dailyOnboarding")) || {};

  const [subjects, setSubjects] = useState([
    {
      name: "",
      priority: "Medium",
      syllabus: null,
      notes: "",
    },
  ]);

  const addSubject = () => {
    setSubjects([
      ...subjects,
      { name: "", priority: "Medium", syllabus: null, notes: "" },
    ]);
  };

  const updateSubject = (index, field, value) => {
    const updated = [...subjects];
    updated[index][field] = value;
    setSubjects(updated);
  };

  const removeSubject = (index) => {
    setSubjects(subjects.filter((_, i) => i !== index));
  };

  const handleCreatePlan = () => {
    localStorage.setItem(
      "dailyDetails",
      JSON.stringify({
        subjects,
        dailyTime: dailyOnboarding.dailyTime,
      })
    );
    navigate("/dashboard"); // dashboard next
  };

  return (
    <div className="min-h-screen bg-paper px-6 py-10 flex justify-center">
      <div className="w-full max-w-4xl">
        {/* Header */}
        <h1 className="heading-xl text-4xl mb-2">
          Daily study details
        </h1>
        <p className="font-body text-textMuted mb-8">
          Add your subjects, priorities, and optional syllabus.  
          I’ll turn this into a balanced daily routine.
        </p>

        {/* SUBJECTS */}
        <div className="bg-white rounded-3xl border p-6 mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-heading font-bold text-xl text-navy">
              Subjects
            </h2>
            <button
              onClick={addSubject}
              className="btn-accent px-4 py-2 text-sm"
            >
              + Add subject
            </button>
          </div>

          <div className="space-y-6">
            {subjects.map((sub, i) => (
              <div
                key={i}
                className="bg-surface rounded-2xl p-5 space-y-4"
              >
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
                  <input
                    type="text"
                    value={sub.name}
                    placeholder="Subject / skill name"
                    onChange={(e) =>
                      updateSubject(i, "name", e.target.value)
                    }
                    className="input"
                  />

                  <select
                    value={sub.priority}
                    onChange={(e) =>
                      updateSubject(i, "priority", e.target.value)
                    }
                    className="input"
                  >
                    <option>High</option>
                    <option>Medium</option>
                    <option>Low</option>
                  </select>

                  <button
                    onClick={() =>
                      document.getElementById(`daily-syllabus-${i}`).click()
                    }
                    className="btn-primary text-sm"
                  >
                    Upload syllabus
                  </button>

                  <button
                    onClick={() => removeSubject(i)}
                    className="text-sm text-red-500 hover:underline"
                  >
                    Remove
                  </button>
                </div>

                {/* Hidden syllabus input */}
                <input
                  type="file"
                  id={`daily-syllabus-${i}`}
                  className="hidden"
                  onChange={(e) =>
                    updateSubject(i, "syllabus", e.target.files[0])
                  }
                />

                {sub.syllabus && (
                  <p className="text-sm text-textMuted">
                    📄 {sub.syllabus.name}
                  </p>
                )}

                {/* Notes */}
                <textarea
                  rows="2"
                  value={sub.notes}
                  placeholder="Optional notes (topics to focus, weak areas, etc.)"
                  onChange={(e) =>
                    updateSubject(i, "notes", e.target.value)
                  }
                  className="input"
                />
              </div>
            ))}
          </div>
        </div>

        {/* DAILY TIME SUMMARY */}
        {dailyOnboarding.dailyTime && (
          <div className="bg-white border rounded-2xl p-4 mb-8">
            <p className="font-body text-sm text-textMuted">
              Daily time commitment
            </p>
            <p className="font-heading font-bold text-lg text-navy">
              ⏱ {dailyOnboarding.dailyTime} per day
            </p>
          </div>
        )}

        {/* CTA */}
        <button
          onClick={handleCreatePlan}
          className="w-full bg-navy text-white py-4 rounded-2xl font-heading font-bold text-lg hover:opacity-90 transition"
        >
          Create my daily study plan
        </button>
      </div>
    </div>
  );
}
