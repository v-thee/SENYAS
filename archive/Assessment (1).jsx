import { useState } from "react";
import { senya_magnify } from "../assets/images";

const questions = [
  {
    question: "How familiar are you with Filipino Sign Language?",
    options: ["Never tried it", "I know a few signs", "I can hold basic conversations", "I'm quite experienced"],
    icons: ["🌱","✋","💬","⭐"]
  },
  {
    question: "What do you mainly want to learn?",
    options: ["Alphabet & Numbers", "Greetings", "Classroom Words", "Everything!"],
    icons: ["🔤","👋","🏫","📚"]
  },
  {
    question: "How much time can you practice daily?",
    options: ["5–10 minutes", "15–20 minutes", "30 minutes", "1 hour or more"],
    icons: ["⏱️","🕐","🕧","🕙"]
  },
];

export default function Assessment({ nav }) {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [selected, setSelected] = useState(null);

  const q = questions[step];
  const progress = ((step) / questions.length) * 100;

  const next = () => {
    if (selected === null) return;
    const newAns = [...answers, selected];
    setAnswers(newAns);
    setSelected(null);
    if (step < questions.length - 1) setStep(step + 1);
    else nav("dashboard");
  };

  return (
    <div className="screen" style={{ background: "#F9FAFB" }}>
      {/* Top */}
      <div style={{ padding: "52px 24px 0" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
          <button onClick={() => step > 0 ? setStep(step-1) : nav("login")}
            style={{ background: "#F3F4F6", border: "none", borderRadius: 12,
              width: 40, height: 40, cursor: "pointer", fontSize: 18 }}>←</button>
          <div style={{ flex: 1 }}>
            <div style={{ display: "flex", justifyContent: "space-between",
              fontSize: 12, fontWeight: 700, color: "#6B7280", marginBottom: 6 }}>
              <span>Question {step + 1} of {questions.length}</span>
              <span>{Math.round(progress)}%</span>
            </div>
            <div className="xp-bar-wrap">
              <div className="xp-bar-fill" style={{ width: `${progress}%` }} />
            </div>
          </div>
        </div>

        <h2 style={{ fontFamily: "var(--font-head)", fontSize: 22, fontWeight: 800,
          color: "#111827", lineHeight: 1.3, marginBottom: 6 }}>
          Let's Set Up Your Learning Path
        </h2>
        <p style={{ fontSize: 13, color: "#6B7280", fontWeight: 500 }}>
          Help Senya personalize your journey!
        </p>
      </div>

      {/* Senya helper */}
      <div style={{ display: "flex", justifyContent: "center", padding: "20px 0 8px" }}>
        <div style={{ position: "relative" }}>
          <img src={senya_magnify} alt="Senya" style={{
            width: 100, height: 100, objectFit: "contain",
            filter: "drop-shadow(0 4px 12px rgba(0,0,0,0.1))",
            animation: "senya-bob 2.5s ease-in-out infinite"
          }} />
          <div style={{
            position: "absolute", top: -8, right: -60,
            background: "#fff", borderRadius: "12px 12px 12px 2px",
            padding: "8px 12px", boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
            fontSize: 12, fontWeight: 600, color: "#374151", whiteSpace: "nowrap"
          }}>
            No wrong answers! 😊
          </div>
        </div>
      </div>

      {/* Question */}
      <div style={{ padding: "0 24px 24px", flex: 1 }}>
        <div className="card" style={{ padding: 20, marginBottom: 16 }}>
          <p style={{ fontSize: 17, fontWeight: 800, color: "#111827",
            fontFamily: "var(--font-head)", lineHeight: 1.4 }}>
            {q.question}
          </p>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 12 }} key={step}>
          {q.options.map((opt, i) => (
            <button key={i} onClick={() => setSelected(i)} style={{
              display: "flex", alignItems: "center", gap: 14,
              padding: "16px 18px", border: selected === i
                ? "2px solid #3B82F6" : "1.5px solid #E5E7EB",
              borderRadius: 16, background: selected === i ? "#EFF6FF" : "#fff",
              cursor: "pointer", textAlign: "left", transition: "all 0.2s",
              boxShadow: selected === i ? "0 0 0 3px rgba(59,130,246,0.15)" : "none",
              animation: `fadeIn 0.3s ease ${i * 0.07}s both`
            }}>
              <span style={{
                width: 40, height: 40, borderRadius: 12, fontSize: 20,
                background: selected === i ? "#DBEAFE" : "#F3F4F6",
                display: "flex", alignItems: "center", justifyContent: "center",
                flexShrink: 0, transition: "background 0.2s"
              }}>{q.icons[i]}</span>
              <span style={{ fontSize: 15, fontWeight: 600,
                color: selected === i ? "#1D4ED8" : "#374151" }}>{opt}</span>
              {selected === i && (
                <span style={{ marginLeft: "auto", color: "#3B82F6", fontSize: 18 }}>✓</span>
              )}
            </button>
          ))}
        </div>
      </div>

      <div style={{ padding: "0 24px 40px" }}>
        <button className="btn-primary" onClick={next}
          style={{ opacity: selected === null ? 0.5 : 1 }}>
          {step < questions.length - 1 ? "Next Question →" : "Start Learning! 🎉"}
        </button>
      </div>
    </div>
  );
}
