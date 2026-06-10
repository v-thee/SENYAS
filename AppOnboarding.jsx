import { useState } from "react";
import OnboardingSlides from "./OnboardingSlides";
import RoleSelect       from "./RoleSelect";
import Splash           from "./Splash"; // existing student splash/entry screen
import Onboarding       from "./Onboarding"; // legacy onboarding entry the user prefers

/**
 * AppOnboarding — root entry point.
 * Flow:  SplashScreen → OnboardingSlides → RoleSelect → (student: Splash | teacher: popup inside RoleSelect)
 */
export default function AppOnboarding({ onComplete }) {
  const [step, setStep] = useState("slides");
  // steps: "slides" | "role" | "studentSplash" | "onboardingOriginal"

  if (step === "slides") return <OnboardingSlides onDone={() => setStep("role")} />;
  // When the user picks Student, show the lightweight Splash (3s) then continue
  if (step === "role") return <RoleSelect onStudent={() => setStep("studentSplash")} />;
  if (step === "studentSplash")
    return (
      <Splash nav={(target) => {
        if (target === "onboarding") setStep("onboardingOriginal");
      }} />
    );
  if (step === "onboardingOriginal")
    return (
      <Onboarding
        nav={(target) => {
          // Onboarding expects `nav('login')` to finish — forward to onComplete
          if (target === "login") onComplete && onComplete();
        }}
      />
    );

  return null;
}