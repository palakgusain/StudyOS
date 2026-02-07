import { useEffect, useState } from "react";
import ChatSidebar from "../components/ChatSidebar";

const INITIAL_REVISION = [
  {
    id: 1,
    topic: "Binary Search",
    summary:
      "Binary Search works on sorted arrays by repeatedly dividing the search space in half.",
    flashcard: {
      question: "When can Binary Search be applied?",
      answer: "Only when the array is sorted.",
    },
    quiz: {
      question: "Time complexity of Binary Search?",
      options: ["O(n)", "O(log n)", "O(n log n)", "O(1)"],
      correct: 1,
    },
    confidence: 2,
  },
  {
    id: 2,
    topic: "Encapsulation",
    summary:
      "Encapsulation binds data and methods together and restricts access.",
    flashcard: {
      question: "What does encapsulation protect?",
      answer: "Internal object state from direct access.",
    },
    quiz: {
      question: "Which keyword supports encapsulation?",
      options: ["public", "private", "static", "final"],
      correct: 1,
    },
    confidence: 2,
  },
];

export default function Revision() {
  const unlocked = localStorage.getItem("dayCompleted") === "true";
  const [cards, setCards] = useState([]);
  const [showFlash, setShowFlash] = useState(null);
  const [quizAnswer, setQuizAnswer] = useState({});
  const [completed, setCompleted] = useState(null);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("revisionCards"));
    setCards(saved || INITIAL_REVISION);
  }, []);

  useEffect(() => {
    localStorage.setItem("revisionCards", JSON.stringify(cards));
  }, [cards]);

  if (!unlocked) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">🔒</div>
          <h1 className="text-2xl font-bold">Revision Locked</h1>
          <p className="text-slate-500 mt-2">
            Complete today’s plan to unlock revision.
          </p>
        </div>
      </div>
    );
  }

  const updateConfidence = (id, value) => {
    setCards((prev) =>
      prev.map((c) =>
        c.id === id ? { ...c, confidence: value } : c
      )
    );
  };

  const handleQuiz = (cardId, optionIndex) => {
    setQuizAnswer({ ...quizAnswer, [cardId]: optionIndex });
    setCards((prev) =>
      prev.map((c) =>
        c.id === cardId
          ? {
              ...c,
              confidence:
                optionIndex === c.quiz.correct ? 3 : 1,
            }
          : c
      )
    );
  };

  // 🔥 Finish revision and trigger streak animation
  const finishRevision = () => {
    const streak = Number(localStorage.getItem("streak")) || 0;
    const newStreak = streak + 1;

    localStorage.setItem("streak", newStreak);
    localStorage.setItem("revisionCompleted", "true");

    setCompleted(newStreak);

    setTimeout(() => {
      window.location.href = "/dashboard";
    }, 3000);
  };

  return (
    <div className="min-h-screen flex bg-[#f6f7fb] dark:bg-[#0b1220]">
      <ChatSidebar />

      <div className="flex-1 px-12 py-10 max-w-4xl">
        <h1 className="text-3xl font-extrabold mb-2 dark:text-white">
          Revision
        </h1>
        <p className="text-slate-500 mb-8">
          Revise smart. Recall actively. Strengthen memory.
        </p>

        {/* ---------- QUICK SUMMARY ---------- */}
        <h2 className="text-xl font-bold mb-4 dark:text-white">
          Quick Summary
        </h2>

        {cards.map((card) => (
          <div
            key={card.id}
            className="bg-white dark:bg-slate-900 rounded-3xl p-6 mb-6
                       border dark:border-slate-700"
          >
            <h3 className="text-lg font-bold mb-2 dark:text-white">
              {card.topic}
            </h3>
            <p className="text-slate-600 dark:text-slate-400 mb-4">
              {card.summary}
            </p>

            <div className="flex gap-3">
              <button
                onClick={() => updateConfidence(card.id, 3)}
                className="px-4 py-2 bg-green-100 text-green-700 rounded-xl"
              >
                Easy
              </button>
              <button
                onClick={() => updateConfidence(card.id, 2)}
                className="px-4 py-2 bg-yellow-100 text-yellow-700 rounded-xl"
              >
                Needs revision
              </button>
              <button
                onClick={() => updateConfidence(card.id, 1)}
                className="px-4 py-2 bg-red-100 text-red-700 rounded-xl"
              >
                Didn’t understand
              </button>
            </div>
          </div>
        ))}

        {/* ---------- FLASHCARDS ---------- */}
        <h2 className="text-xl font-bold mt-10 mb-4 dark:text-white">
          Flashcards
        </h2>

        {cards.map((card) => (
          <div
            key={card.id}
            className="bg-indigo-50 dark:bg-indigo-950 rounded-3xl p-6 mb-6"
          >
            <p className="font-semibold mb-3">
              {showFlash === card.id
                ? card.flashcard.answer
                : card.flashcard.question}
            </p>

            <button
              onClick={() =>
                setShowFlash(
                  showFlash === card.id ? null : card.id
                )
              }
              className="px-4 py-2 bg-indigo-600 text-white rounded-xl"
            >
              {showFlash === card.id ? "Hide" : "Reveal"}
            </button>
          </div>
        ))}

        {/* ---------- QUIZ ---------- */}
        <h2 className="text-xl font-bold mt-10 mb-4 dark:text-white">
          Quick Quiz
        </h2>

        {cards.map((card) => (
          <div
            key={card.id}
            className="bg-white dark:bg-slate-900 rounded-3xl p-6 mb-6
                       border dark:border-slate-700"
          >
            <p className="font-semibold mb-4">
              {card.quiz.question}
            </p>

            {card.quiz.options.map((opt, i) => (
              <button
                key={i}
                onClick={() => handleQuiz(card.id, i)}
                className={`block w-full text-left px-4 py-2 mb-2 rounded-xl
                  ${
                    quizAnswer[card.id] === i
                      ? i === card.quiz.correct
                        ? "bg-green-500 text-white"
                        : "bg-red-500 text-white"
                      : "bg-slate-100 dark:bg-slate-800"
                  }
                `}
              >
                {opt}
              </button>
            ))}
          </div>
        ))}

        {/* Finish button */}
        <div className="mt-8">
          <button
            onClick={finishRevision}
            className="px-6 py-3 bg-indigo-600 text-white rounded-2xl font-bold"
          >
            Finish Revision
          </button>
        </div>
      </div>

      {/* 🔥 STREAK CELEBRATION */}
      {completed && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white dark:bg-slate-900 rounded-3xl px-16 py-14 text-center shadow-2xl animate-scaleUp">
            <div className="text-6xl mb-4">🔥</div>

            <h2 className="text-4xl font-extrabold dark:text-white">
              {completed} Day Streak!
            </h2>

            <p className="text-slate-500 mt-3 text-lg">
              You stayed consistent today.
            </p>
          </div>
        </div>
      )}

      <style>{`
        @keyframes scaleUp {
          0% {
            transform: scale(0.8);
            opacity: 0;
          }
          100% {
            transform: scale(1);
            opacity: 1;
          }
        }

        .animate-scaleUp {
          animation: scaleUp 0.5s ease-out;
        }
      `}</style>
    </div>
  );
}
