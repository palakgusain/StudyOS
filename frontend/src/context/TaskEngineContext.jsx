import { createContext, useContext, useEffect, useRef, useState } from "react";

const TaskEngineContext = createContext();

export function TaskEngineProvider({ children }) {
  const today = new Date().toDateString();
  const storedDate = localStorage.getItem("taskDate");

  // 🔄 Reset if new day
  if (storedDate !== today) {
    localStorage.setItem("taskDate", today);
    localStorage.setItem("activeIndex", "0");
    localStorage.removeItem("runningIndex");
    localStorage.removeItem("endTime");
    localStorage.setItem("dayCompleted", "false");
  }

  const [activeIndex, setActiveIndex] = useState(
    Number(localStorage.getItem("activeIndex")) || 0
  );

  const [runningIndex, setRunningIndex] = useState(
    localStorage.getItem("runningIndex") !== null
      ? Number(localStorage.getItem("runningIndex"))
      : null
  );

  const [endTime, setEndTime] = useState(
    localStorage.getItem("endTime")
      ? Number(localStorage.getItem("endTime"))
      : null
  );

  const timerRef = useRef(null);

  /* ---------------- TIMER LOOP ---------------- */
  useEffect(() => {
    if (runningIndex !== null && endTime) {
      timerRef.current = setInterval(() => {
        const now = Date.now();

        if (now >= endTime) {
          clearInterval(timerRef.current);
          timerRef.current = null;

          const nextIndex = activeIndex + 1;

          setRunningIndex(null);
          setEndTime(null);
          setActiveIndex(nextIndex);

          localStorage.removeItem("runningIndex");
          localStorage.removeItem("endTime");
          localStorage.setItem("activeIndex", nextIndex);

          // 🔓 Unlock revision if all tasks done
          if (nextIndex >= 3) {
            localStorage.setItem("dayCompleted", "true");
          }
        }
      }, 1000);
    }

    return () => clearInterval(timerRef.current);
  }, [runningIndex, endTime, activeIndex]);

  /* ---------------- START TASK ---------------- */
  const startTask = (index, durationMin) => {
    const durationMs = durationMin * 60 * 1000;
    const end = Date.now() + durationMs;

    setRunningIndex(index);
    setEndTime(end);

    localStorage.setItem("runningIndex", index);
    localStorage.setItem("endTime", end);
  };

  return (
    <TaskEngineContext.Provider
      value={{
        activeIndex,
        runningIndex,
        endTime,
        startTask,
      }}
    >
      {children}
    </TaskEngineContext.Provider>
  );
}

export const useTaskEngine = () => useContext(TaskEngineContext);
