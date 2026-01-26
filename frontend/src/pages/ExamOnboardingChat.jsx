import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import ChatSidebar from "../components/ChatSidebar";

const steps = [
  {
    question: "Which exam are you preparing for?",
    key: "examName",
    placeholder: "e.g. Semester 5 ETE, GATE, SSC CGL",
  },
  {
    question: "How many subjects do you have?",
    key: "subjectCount",
    placeholder: "e.g. 5",
  },
  {
    question: "When does your exam start?",
    key: "startDate",
    placeholder: "e.g. 8 Jan 2026",
  },
  {
    question: "Which subject feels the hardest right now?",
    key: "hardestSubject",
    placeholder: "e.g. Java, DSA",
  },
];

export default function ExamOnboardingChat() {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const initialized = useRef(false);

  const [messages, setMessages] = useState([]);
  const [stepIndex, setStepIndex] = useState(0);
  const [input, setInput] = useState("");
  const [answers, setAnswers] = useState({});
  const [typing, setTyping] = useState(false);

  // Initial assistant message (prevent double render)
  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;

    setTyping(true);
    setTimeout(() => {
      setMessages([{ type: "assistant", text: steps[0].question }]);
      setTyping(false);
    }, 700);
  }, []);

  const handleSend = () => {
    if (!input.trim()) return;

    const currentStep = steps[stepIndex];

    setMessages((prev) => [...prev, { type: "user", text: input }]);
    setAnswers((prev) => ({ ...prev, [currentStep.key]: input }));
    setInput("");
    setTyping(true);

    const nextIndex = stepIndex + 1;
    setStepIndex(nextIndex);

    setTimeout(() => {
      if (nextIndex < steps.length) {
        setMessages((prev) => [
          ...prev,
          { type: "assistant", text: steps[nextIndex].question },
        ]);
        setTyping(false);
      } else {
        localStorage.setItem(
          "examOnboarding",
          JSON.stringify({
            ...answers,
            [currentStep.key]: input,
          })
        );
        navigate("/dashboard"); // later real dashboard
      }
    }, 800);
  };

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setMessages((prev) => [
      ...prev,
      {
        type: "user",
        file: {
          name: file.name,
          size: Math.round(file.size / 1024) + " KB",
        },
      },
    ]);

    e.target.value = "";
  };

  return (
    <div className="min-h-screen bg-paper flex">
      {/* Sidebar */}
      <ChatSidebar />

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col items-center">
        {/* Header */}
        <div className="w-full max-w-4xl px-6 py-5">
          <h1 className="font-heading font-extrabold text-2xl text-navy">
            Assistant
          </h1>
          <p className="font-body text-textMuted">
            Answer a few questions. I’ll plan the rest.
          </p>
        </div>

        {/* Chat Container */}
        <div className="w-full max-w-4xl flex-1 bg-surface rounded-3xl px-6 py-8 overflow-y-auto space-y-6">
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`flex items-start gap-4 ${
                msg.type === "user" ? "justify-end" : "justify-start"
              }`}
            >
              {msg.type === "assistant" && (
                <div className="w-9 h-9 rounded-full bg-accent/20 flex items-center justify-center font-bold text-accent">
                  A
                </div>
              )}

              <div
                className={`max-w-[70%] px-5 py-4 rounded-2xl font-body
                  ${
                    msg.type === "assistant"
                      ? "bg-white border text-textPrimary"
                      : "bg-navy text-white"
                  }
                `}
              >
                {msg.text && msg.text}
                {msg.file && (
                  <div className="flex items-center gap-3">
                    <span>📄</span>
                    <div>
                      <p className="text-sm font-semibold">
                        {msg.file.name}
                      </p>
                      <p className="text-xs opacity-70">
                        {msg.file.size}
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {msg.type === "user" && (
                <div className="w-9 h-9 rounded-full bg-navy text-white flex items-center justify-center font-bold">
                  U
                </div>
              )}
            </div>
          ))}

          {typing && (
            <div className="flex items-center gap-4">
              <div className="w-9 h-9 rounded-full bg-accent/20 flex items-center justify-center font-bold text-accent">
                A
              </div>
              <div className="bg-white border px-5 py-3 rounded-2xl font-body text-textMuted">
                typing…
              </div>
            </div>
          )}
        </div>

        {/* Input Bar */}
        <div className="w-full max-w-4xl px-6 py-4">
          <div className="flex items-center gap-3 bg-white border rounded-2xl px-4 py-3 shadow-sm">
            {/* Hidden file input */}
            <input
              type="file"
              ref={fileInputRef}
              className="hidden"
              onChange={handleFileSelect}
            />

            {/* Attachment button */}
            <button
              onClick={() => fileInputRef.current.click()}
              className="text-textMuted hover:text-navy"
            >
              📎
            </button>

            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={steps[stepIndex]?.placeholder || ""}
              className="flex-1 outline-none font-body"
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
            />

            <button
              onClick={handleSend}
              className="bg-accent text-white px-4 py-2 rounded-xl font-heading font-semibold"
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
