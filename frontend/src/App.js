import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Welcome from "./pages/Welcome";
import Onboarding from "./pages/Onboarding";
import ExamOnboardingChat from "./pages/ExamOnboardingChat";
import ExamDetails from "./pages/ExamDetails";
import DailyOnboardingChat from "./pages/DailyOnboardingChat";
import DailyDetails from "./pages/DailyDetails";
import Dashboard from "./pages/Dashboard";
import Reminders from "./pages/Reminders";
import Notes from "./pages/Notes";
import RequireAuth from "./components/RequireAuth";
import RequireRevisionUnlock from "./components/RequireRevisionUnlock";
import Revision from "./pages/Revision";
import Settings from "./pages/Settings";


function App() {
  const isAuth = localStorage.getItem("isAuth") === "true";
  return (
    <BrowserRouter>
      <Routes>
        {/* Public */}
        <Route
          path="/signup"
          element={!isAuth ? <Signup /> : <Navigate to="/welcome" />}
        />
        <Route
          path="/login"
          element={!isAuth ? <Login /> : <Navigate to="/welcome" />}
        />

        {/* Protected */}
        <Route
          path="/welcome"
          element={
            <RequireAuth>
              <Welcome />
            </RequireAuth>
          }
        />

        <Route
          path="/onboarding"
          element={
            <RequireAuth>
              <Onboarding />
            </RequireAuth>
          }
        />

        <Route
          path="/onboarding/exam"
          element={
            <RequireAuth>
              <ExamOnboardingChat />
            </RequireAuth>
          }
        />

        <Route
          path="/exam-details"
          element={
            <RequireAuth>
              <ExamDetails />
            </RequireAuth>
          }
        />

        <Route
          path="/onboarding/daily"
          element={
            <RequireAuth>
              <DailyOnboardingChat />
            </RequireAuth>
          }
        />

        <Route
          path="/daily-details"
          element={
            <RequireAuth>
              <DailyDetails />
            </RequireAuth>
          }
        />

        <Route
          path="/dashboard"
          element={
            <RequireAuth>
              <Dashboard />
            </RequireAuth>
          }
        />

        <Route
          path="/notes"
          element={
            <RequireAuth>
              <Notes />
            </RequireAuth>
          }
        />

        <Route
          path="/reminders"
          element={
            <RequireAuth>
              <Reminders />
            </RequireAuth>
          }
        />

        <Route
  path="/revision"
  element={
    <RequireAuth>
      <RequireRevisionUnlock>
        <Revision />
      </RequireRevisionUnlock>
    </RequireAuth>
  }
/>

<Route path="/settings" element={<Settings />} />


        {/* Default */}
        <Route path="*" element={<Navigate to="/signup" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
