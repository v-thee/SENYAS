import { useState } from "react";
import "./App.css";

import SplashScreen from "./SplashScreen";
import AppOnboarding from "./AppOnboarding";
import Login from "./Login";
import Assessment from "./Assessment";
import Dashboard from "./Dashboard";
import Tutorial from "./Tutorial";
import Lessons from "./Lessons";
import QuizMC from "./QuizMC";
import QuizDnD from "./QuizDnD";
import GestureRecog from "./GestureRecog";
import Achievements from "./Achievements";
import Profile from "./Profile";

export default function App() {
  const [screen, setScreen] = useState("splash");
  const [user, setUser] = useState({ name: "Maria", level: "Beginner", xp: 340, streak: 5 });

  const nav = (s) => setScreen(s);

  const screens = {
    splash:       <SplashScreen onDone={() => nav("onboarding")} />,
    onboarding:   <AppOnboarding onComplete={() => nav("login")} />,
    login:        <Login nav={nav} setUser={setUser} />,
    assessment:   <Assessment nav={nav} />,
    dashboard:    <Dashboard nav={nav} user={user} />,
    tutorial:     <Tutorial nav={nav} />,
    lessons:      <Lessons nav={nav} />,
    quizmc:       <QuizMC nav={nav} />,
    quizdnd:      <QuizDnD nav={nav} />,
    gesture:      <GestureRecog nav={nav} />,
    achievements: <Achievements nav={nav} user={user} />,
    profile:      <Profile nav={nav} user={user} />,
  };

  return (
    <div className="app-shell">
      <div className="phone-frame">
        <div className="phone-screen">
          {screens[screen]}
        </div>
      </div>
    </div>
  );
}
