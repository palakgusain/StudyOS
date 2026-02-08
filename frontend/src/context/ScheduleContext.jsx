import { createContext, useContext, useState } from "react";

const ScheduleContext = createContext();

const initialSchedule = [
  { id: 1, title: "Java", duration: 90, start: "09:00" },
  { id: 2, title: "Break", duration: 15, start: "10:30" },
  { id: 3, title: "DSA", duration: 75, start: "10:45" },
  { id: 4, title: "Revision", duration: 30, start: "12:00" },
];

export const ScheduleProvider = ({ children }) => {
  const [schedule, setSchedule] = useState(initialSchedule);

  return (
    <ScheduleContext.Provider value={{ schedule, setSchedule }}>
      {children}
    </ScheduleContext.Provider>
  );
};

export const useSchedule = () => useContext(ScheduleContext);
