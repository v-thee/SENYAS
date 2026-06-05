import { useState } from "react";
import { senya_logo, senya_teaching, senya_blue, senya_magnify } from "../assets/images";

const tips = [
  {
    img: senya_logo,
    title: "Hi, I'm Senya! 👋",
    body: "I'm your friendly guide on this FSL learning journey. I'll be right here whenever you need help!",
    color: "#3B82F6",
  },
  {
    img: senya_teaching,
    title: "Watch & Learn 📚",
    body: "Each lesson shows you how a sign looks. Watch carefully, then try it yourself!",
    color: "#F59E0B",
  },
  {
    img: senya_magnify,
    title: "Practice Makes Perfect 🔍",
    body: "Use the camera to practice your signs and get real-time feedback. Don't worry, you got this!",
    color: "#10B981",
  },
  {
    img: senya_blue,
    title: "Earn Badges! ⭐",
    body: "Complete lessons and quizzes to earn XP and unlock badges. Every sign learned is a victory!",
    color: "#8B5CF6",
  },
];

export default function Tutorial({ nav }) {
  const [step, setStep] = useState(0);
  const [show, setShow] = useState(true);
  const tip = tips[step];

  if (!show) {
    return (
      <div className="screen" style={{ background: "#F9FAFB" }}>
        {/* Floating Senya helper visible on dashboard-like bg */}
        <div style={{ padding: "52px 24px 0" }}>
          <button onClick={() => nav("dashboard")} style={{
            display: "flex", alignItems: "center", gap: 8,
            background: "#F3F4F6", border: "none", borderRadius: 12,
            padding: "10px 16px", cursor: "pointer", fontFamily: "var(--font-body)",
            fontSize: 14, fontWeight: 600, color: "#374151"
          }}>← Back to Dashboard</button>
          <h2 style={{ fontFamily: "var(--font-head)", fontSize: 22, fontWeight: 800,
            color: "#111827", marginTop: 16 }}>Senya's Tips</h2>
          <p style={{ color: "#6B7280", fontSize: 14, marginTop: 4 }}>
            Tap a tip to learn more from your guide.
          </p>
        </div>
        <div style={{ padding: "20px 24px", display: "flex", flexDirection: "column", gap: 14 }}>
          {tips.map((t, i) => (
            <button key={i} onClick={() => { setStep(i); setShow(true); }} style={{
              display: "flex", alignItems: "center", gap: 14,
              background: "#fff", border: "1.5px solid #E5E7EB",
              borderRadius: 18, padding: 16, cursor: "pointer", textAlign: "left",
              transition: "all 0.15s"
            }}>
              <img src={t.img} alt="" style={{
                width: 52, height: 52, objectFit: "contain",
                filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.1))"
              }} />
              <div>
                <p style={{ fontFamily: "var(--font-head)", fontSize: 16, fontWeight: 800,
                  color: "#111827" }}>{t.title}</p>
                <p style={{ fontSize: 12, color: "#6B7280", marginTop: 2 }}>Tap to view tip</p>
              </div>
              <span style={{ marginLeft: "auto", fontSize: 20 }}>›</span>
            </button>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="screen" style={{
      background: `linear-gradient(160deg, ${tip.color}18 0%, #F9FAFB 60%)`,
      position: "relative"
    }}>
      {/* Skip */}
      <div style={{ padding: "52px 24px 0", display: "flex", justifyContent: "flex-end" }}>
        <button onClick={() => setShow(false)} style={{
          background: "rgba(0,0,0,0.06)", border: "none", borderRadius: 20,
          padding: "6px 16px", fontSize: 13, fontWeight: 600, color: "#6B7280",
          fontFamily: "var(--font-body)", cursor: "pointer"
        }}>All Tips ↗</button>
      </div>

      {/* Senya Big */}
      <div style={{ display: "flex", justifyContent: "center", padding: "24px 0 16px" }}>
        <div style={{
          width: 160, height: 160, borderRadius: "50%",
          background: `${tip.color}18`,
          display: "flex", alignItems: "center", justifyContent: "center",
          boxShadow: `0 8px 32px ${tip.color}30`
        }}>
          <img src={tip.img} alt="Senya" style={{
            width: 140, height: 140, objectFit: "contain",
            filter: "drop-shadow(0 4px 8px rgba(0,0,0,0.12))",
            animation: "senya-bob 2.5s ease-in-out infinite"
          }} />
        </div>
      </div>

      {/* Speech bubble */}
      <div style={{ padding: "0 28px" }}>
        <div style={{
          background: "#fff", borderRadius: 20, padding: 22,
          boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
          border: `2px solid ${tip.color}30`, position: "relative"
        }}>
          <div style={{
            position: "absolute", top: -10, left: "50%", transform: "translateX(-50%)",
            width: 20, height: 10, overflow: "hidden"
          }}>
            <div style={{
              width: 14, height: 14, background: "#fff",
              transform: "rotate(45deg)", marginTop: 3,
              border: `2px solid ${tip.color}30`, margin: "3px auto"
            }} />
          </div>
          <h2 style={{
            fontFamily: "var(--font-head)", fontSize: 22, fontWeight: 800,
            color: "#111827", marginBottom: 10
          }}>{tip.title}</h2>
          <p style={{ fontSize: 15, color: "#4B5563", lineHeight: 1.7, fontWeight: 500 }}>
            {tip.body}
          </p>
        </div>

        {/* Step dots */}
        <div style={{ display: "flex", justifyContent: "center", gap: 8, marginTop: 20 }}>
          {tips.map((_, i) => (
            <div key={i} onClick={() => setStep(i)} style={{
              width: i === step ? 24 : 8, height: 8, borderRadius: 4,
              background: i === step ? tip.color : "#D1D5DB",
              cursor: "pointer", transition: "all 0.3s"
            }} />
          ))}
        </div>
      </div>

      {/* Nav */}
      <div style={{ padding: "24px 28px 40px", display: "flex", gap: 12, marginTop: "auto" }}>
        {step > 0 && (
          <button className="btn-ghost" onClick={() => setStep(step - 1)}
            style={{ flex: 1 }}>← Back</button>
        )}
        <button className="btn-primary" onClick={() => {
          if (step < tips.length - 1) setStep(step + 1);
          else nav("dashboard");
        }} style={{
          flex: 2,
          background: `linear-gradient(135deg, ${tip.color}, ${darken(tip.color)})`
        }}>
          {step < tips.length - 1 ? "Got it! Next →" : "Let's Go! 🚀"}
        </button>
      </div>
    </div>
  );
}

function darken(hex) {
  const m = { "#3B82F6":"#1D4ED8", "#F59E0B":"#B45309", "#10B981":"#047857", "#8B5CF6":"#6D28D9" };
  return m[hex] || "#1D4ED8";
}
