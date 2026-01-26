import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ExamDetails() {
  const navigate = useNavigate();
  const syllabusRef = useRef(null);
  const datesheetRef = useRef(null);

  const [subjects, setSubjects] = useState([
    { name: "Java", difficulty: "Hard", priority: true },
  ]);

  const addSubject = () => {
    setSubjects([...subjects, { name: "", difficulty: "Medium", priority: false }]);
  };

  const updateSubject = (index, field, value) => {
    const updated = [...subjects];
    updated[index][field] = value;
    setSubjects(updated);
  };

  const removeSubject = (index) => {
    setSubjects(subjects.filter((_, i) => i !== index));
  };

  const handleGenerate = () => {
    localStorage.setItem("examDetails", JSON.stringify({ subjects }));
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen bg-paper px-6 py-10 flex justify-center">
      <div className="w-full max-w-4xl">
        {/* Header */}
        <h1 className="heading-xl text-4xl mb-2">
          Exam details
        </h1>
        <p className="font-body text-textMuted mb-8">
          Add your subjects and upload exam documents.  
          I’ll use this to create your study plan.
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

          <div className="space-y-4">
            {subjects.map((sub, i) => (
              <div
                key={i}
                className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center bg-surface rounded-2xl p-4"
              >
                <input
                  type="text"
                  value={sub.name}
                  placeholder="Subject name"
                  onChange={(e) => updateSubject(i, "name", e.target.value)}
                  className="input"
                />

                <select
                  value={sub.difficulty}
                  onChange={(e) => updateSubject(i, "difficulty", e.target.value)}
                  className="input"
                >
                  <option>Easy</option>
                  <option>Medium</option>
                  <option>Hard</option>
                </select>

                <label className="flex items-center gap-2 font-body text-sm">
                  <input
                    type="checkbox"
                    checked={sub.priority}
                    onChange={(e) =>
                      updateSubject(i, "priority", e.target.checked)
                    }
                  />
                  High priority
                </label>

                <button
                  onClick={() => removeSubject(i)}
                  className="text-sm text-red-500 hover:underline"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* UPLOADS */}
        <div className="grid md:grid-cols-2 gap-6 mb-10">
          {/* Syllabus */}
          <div className="bg-white border rounded-3xl p-6">
            <h3 className="font-heading font-bold text-lg mb-2">
              Upload syllabus
            </h3>
            <p className="font-body text-sm text-textMuted mb-4">
              PDF / image — optional but recommended
            </p>

            <input type="file" ref={syllabusRef} className="hidden" />
            <button
              onClick={() => syllabusRef.current.click()}
              className="btn-primary w-full"
            >
              Upload syllabus
            </button>
          </div>

          {/* Datesheet */}
          <div className="bg-white border rounded-3xl p-6">
            <h3 className="font-heading font-bold text-lg mb-2">
              Upload datesheet
            </h3>
            <p className="font-body text-sm text-textMuted mb-4">
              Exam schedule document
            </p>

            <input type="file" ref={datesheetRef} className="hidden" />
            <button
              onClick={() => datesheetRef.current.click()}
              className="btn-primary w-full"
            >
              Upload datesheet
            </button>
          </div>
        </div>

        {/* CTA */}
        <button
          onClick={handleGenerate}
          className="w-full bg-navy text-white py-4 rounded-2xl font-heading font-bold text-lg hover:opacity-90 transition"
        >
          Generate my study plan
        </button>
      </div>
    </div>
  );
}
