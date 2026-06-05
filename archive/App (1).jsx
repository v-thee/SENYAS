import { useState } from "react";
import "./App.css";

// Screens
import Onboarding from "./screens/Onboarding";
import Login from "./screens/Login";
import Assessment from "./screens/Assessment";
import Dashboard from "./screens/Dashboard";
import Tutorial from "./screens/Tutorial";
import Lessons from "./screens/Lessons";
import QuizMC from "./screens/QuizMC";
import QuizDnD from "./screens/QuizDnD";
import GestureRecog from "./screens/GestureRecog";
import Achievements from "./screens/Achievements";
import Profile from "./screens/Profile";

const SCREENS = [
  "onboarding","login","assessment","dashboard","tutorial",
  "lessons","quizmc","quizdnd","gesture","achievements","profile"
];

export default function App() {
  const [screen, setScreen] = useState("onboarding");
  const [user, setUser] = useState({ name: "Maria", level: "Beginner", xp: 340, streak: 5 });

  const nav = (s) => setScreen(s);

  const screens = {
    onboarding: <Onboarding nav={nav} />,
    login: <Login nav={nav} setUser={setUser} />,
    assessment: <Assessment nav={nav} />,
    dashboard: <Dashboard nav={nav} user={user} />,
    tutorial: <Tutorial nav={nav} />,
    lessons: <Lessons nav={nav} />,
    quizmc: <QuizMC nav={nav} />,
    quizdnd: <QuizDnD nav={nav} />,
    gesture: <GestureRecog nav={nav} />,
    achievements: <Achievements nav={nav} user={user} />,
    profile: <Profile nav={nav} user={user} />,
  };

  return (
    <div className="app-shell">
      {/* Dev nav bar */}
      <div className="dev-nav">
        {SCREENS.map(s => (
          <button key={s} className={screen === s ? "active" : ""} onClick={() => nav(s)}>
            {s}
          </button>
        ))}
      </div>
      <div className="phone-frame">
        <div className="phone-screen">
          {screens[screen]}
        </div>
      </div>
    </div>
  );
}
