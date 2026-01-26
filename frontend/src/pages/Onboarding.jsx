import React from "react";
import { useNavigate } from "react-router-dom";

export default function Onboarding() {
  const navigate = useNavigate();

  const selectMode = (mode) => {
    localStorage.setItem("studyMode", mode);

    if (mode === "exam") {
      navigate("/onboarding/exam");
    } else {
      navigate("/onboarding/daily");
    }
  };

  return (
    <div className="min-h-screen bg-paper flex items-center justify-center px-6">
      <div className="max-w-6xl w-full grid md:grid-cols-2 gap-12 items-center">
        
        {/* LEFT CONTENT */}
        <div>
          <div className="mb-4">
            <div className="h-1 w-20 bg-accent rounded-full"></div>
          </div>

          <h1 className="heading-xl text-4xl mb-6">
            Choose your study style
          </h1>

          <p className="font-body text-lg text-textMuted max-w-md">
            Everyone studies differently.  
            Tell us how you are preparing right now,  
            and we’ll plan everything accordingly.
          </p>
        </div>

        {/* RIGHT OPTIONS */}
        <div className="grid gap-6">
          
          {/* EXAM MODE */}
          <div
            onClick={() => selectMode("exam")}
            className="cursor-pointer bg-gradient-to-br from-white to-surface
                       border border-gray-300 rounded-3xl p-8
                       hover:shadow-lg hover:-translate-y-1 transition-all"
          >
            <div className="flex items-start gap-4">
              <div className="text-3xl">📚</div>
              <div>
                <h2 className="font-heading font-bold text-2xl text-navy mb-2">
                  Exam-focused preparation
                </h2>
                <p className="font-body text-textMuted">
                  You have exams, a syllabus, and deadlines.  
                  We’ll create a structured timetable with revision and tests.
                </p>
              </div>
            </div>
          </div>

          {/* DAILY MODE */}
          <div
            onClick={() => selectMode("daily")}
            className="cursor-pointer bg-gradient-to-br from-white to-surface
                       border border-gray-300 rounded-3xl p-8
                       hover:shadow-lg hover:-translate-y-1 transition-all"
          >
            <div className="flex items-start gap-4">
              <div className="text-3xl">🧠</div>
              <div>
                <h2 className="font-heading font-bold text-2xl text-navy mb-2">
                  Daily / skill-based study
                </h2>
                <p className="font-body text-textMuted">
                  You want to learn skills consistently  
                  without exam pressure, at your own pace.
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
