import { useState } from "react";
import { senya_logo } from "../assets/images";

const questions = [
  {
    question: "Which sign represents the letter 'A' in FSL?",
    image: "✊",
    options: ["✊ Closed fist", "✋ Open hand", "🤙 Shaka", "☝️ One finger"],
    correct: 0,
    explanation: "In FSL, the letter A is signed with a closed fist."
  },
  {
    question: "What does this sign mean?",
    image: "👋",
    options: ["Goodbye", "Hello / Hi", "Thank you", "Yes"],
    correct: 1,
    explanation: "A wave of the open hand means 'Hello' or 'Hi' in FSL!"
  },
  {
    question: "Which sign means 'Thank You' in FSL?",
    image: "🤲",
    options: ["🙌 Clap", "🤲 Open hands forward", "👌 OK sign", "✌️ Peace sign"],
    correct: 1,
    explanation: "Moving open hands forward toward the other person means 'Thank You'."
  },
];

export default function QuizMC({ nav }) {
  const [qi, setQi] = useState(0);
  const [selected, setSelected] = useState(null);
  const [revealed, setRevealed] = useState(false);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);

  const q = questions[qi];

  const choose = (i) => {
    if (revealed) return;
    setSelected(i);
    setRevealed(true);
    if (i === q.correct) setScore(s => s + 1);
  };

  const next = () => {
    if (qi < questions.length - 1) {
      setQi(qi + 1);
      setSelected(null);
      setRevealed(false);
    } else {
      setDone(true);
    }
  };

  if (done) {
    const pct = Math.round((score / questions.length) * 100);
    return (
      <div className="screen" style={{
        background: "linear-gradient(160deg, #EFF6FF, #F9FAFB)",
        alignItems: "center", justifyContent: "center", padding: 32, textAlign: "center"
      }}>
        <img src={senya_logo} alt="Senya" style={{
          width: 120, height: 120, objectFit: "contain",
          animation: "senya-bob 2.5s ease-in-out infinite"
        }} />
        <h1 style={{ fontFamily: "var(--font-head)", fontSize: 28, fontWeight: 800,
          color: "#111827", marginTop: 16 }}>
          {pct === 100 ? "Perfect! 🎉" : pct >= 66 ? "Great Job! 🌟" : "Keep Trying! 💪"}
        </h1>
        <p style={{ fontSize: 15, color: "#6B7280", marginTop: 8, fontWeight: 500 }}>
          You scored <strong>{score}</strong> out of <strong>{questions.length}</strong>
        </p>
        <div style={{
          background: "#fff", borderRadius: 20, padding: 20, margin: "20px 0",
          boxShadow: "0 4px 16px rgba(0,0,0,0.08)", width: "100%"
        }}>
          <div style={{ fontSize: 48, marginBottom: 8 }}>
            {pct === 100 ? "🏆" : pct >= 66 ? "⭐" : "📚"}
          </div>
          <div style={{ fontSize: 40, fontFamily: "var(--font-head)", fontWeight: 900, color: "#3B82F6" }}>
            {pct}%
          </div>
          <div style={{ fontSize: 13, color: "#9CA3AF", fontWeight: 600 }}>Accuracy</div>
          <div style={{
            display: "flex", justifyContent: "center", gap: 24, marginTop: 16
          }}>
            <div>
              <div style={{ fontSize: 20, fontWeight: 800, color: "#10B981" }}>+{score * 10}</div>
              <div style={{ fontSize: 11, color: "#9CA3AF", fontWeight: 600 }}>XP Earned</div>
            </div>
            <div style={{ width: 1, background: "#E5E7EB" }} />
            <div>
              <div style={{ fontSize: 20, fontWeight: 800, color: "#F59E0B" }}>{score}</div>
              <div style={{ fontSize: 11, color: "#9CA3AF", fontWeight: 600 }}>Correct</div>
            </div>
          </div>
        </div>
        <button className="btn-primary" onClick={() => nav("dashboard")}>Back to Home</button>
        <button className="btn-ghost" style={{ marginTop: 12 }}
          onClick={() => { setQi(0); setSelected(null); setRevealed(false); setScore(0); setDone(false); }}>
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="screen" style={{ background: "#F9FAFB" }}>
      {/* Header */}
      <div style={{
        background: "linear-gradient(135deg, #1D4ED8, #3B82F6)",
        padding: "52px 24px 24px"
      }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
          <button onClick={() => nav("dashboard")} style={{
            background: "rgba(255,255,255,0.15)", border: "none", borderRadius: 10,
            padding: "8px 14px", color: "#fff", cursor: "pointer",
            fontFamily: "var(--font-body)", fontSize: 13, fontWeight: 600
          }}>✕ Quit</button>
          <span style={{ color: "#fff", fontSize: 13, fontWeight: 700 }}>
            {qi + 1} / {questions.length}
          </span>
          <span style={{ color: "#FFD93D", fontWeight: 700, fontSize: 14 }}>⚡ {score * 10} XP</span>
        </div>
        <div className="xp-bar-wrap" style={{ background: "rgba(255,255,255,0.2)" }}>
          <div className="xp-bar-fill" style={{ width: `${((qi) / questions.length) * 100}%` }} />
        </div>
      </div>

      {/* Sign display */}
      <div style={{ padding: "24px 24px 16px" }}>
        <div style={{
          background: "#fff", borderRadius: 20, padding: 24, textAlign: "center",
          boxShadow: "0 4px 16px rgba(0,0,0,0.08)", marginBottom: 16
        }}>
          <div style={{ fontSize: 72, marginBottom: 12 }}>{q.image}</div>
          <p style={{ fontFamily: "var(--font-head)", fontSize: 17, fontWeight: 800,
            color: "#111827", lineHeight: 1.4 }}>{q.question}</p>
        </div>

        {/* Options */}
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {q.options.map((opt, i) => {
            let bg = "#fff", border = "1.5px solid #E5E7EB", color = "#374151";
            if (revealed) {
              if (i === q.correct) { bg = "#ECFDF5"; border = "2px solid #10B981"; color = "#065F46"; }
              else if (i === selected && i !== q.correct) { bg = "#FEF2F2"; border = "2px solid #EF4444"; color = "#991B1B"; }
            } else if (selected === i) {
              bg = "#EFF6FF"; border = "2px solid #3B82F6"; color = "#1D4ED8";
            }
            return (
              <button key={i} onClick={() => choose(i)} style={{
                padding: "15px 18px", border, borderRadius: 14,
                background: bg, cursor: revealed ? "default" : "pointer",
                textAlign: "left", fontFamily: "var(--font-body)",
                fontSize: 15, fontWeight: 700, color, transition: "all 0.2s",
                display: "flex", alignItems: "center", gap: 12
              }}>
                <span style={{
                  width: 28, height: 28, borderRadius: 8, flexShrink: 0,
                  background: revealed && i === q.correct ? "#10B981" :
                    revealed && i === selected && i !== q.correct ? "#EF4444" : "#F3F4F6",
                  color: revealed && (i === q.correct || i === selected) ? "#fff" : "#6B7280",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 12, fontWeight: 700
                }}>
                  {revealed && i === q.correct ? "✓" :
                    revealed && i === selected && i !== q.correct ? "✕" :
                    String.fromCharCode(65 + i)}
                </span>
                {opt}
              </button>
            );
          })}
        </div>

        {/* Explanation */}
        {revealed && (
          <div style={{
            background: selected === q.correct ? "#ECFDF5" : "#FEF2F2",
            border: `1.5px solid ${selected === q.correct ? "#BBF7D0" : "#FECACA"}`,
            borderRadius: 14, padding: 14, marginTop: 14,
            display: "flex", gap: 10, alignItems: "flex-start"
          }}>
            <span style={{ fontSize: 18 }}>
              {selected === q.correct ? "🎉" : "💡"}
            </span>
            <p style={{ fontSize: 14, fontWeight: 600,
              color: selected === q.correct ? "#065F46" : "#991B1B" }}>
              {q.explanation}
            </p>
          </div>
        )}
      </div>

      {revealed && (
        <div style={{ padding: "0 24px 40px" }}>
          <button className="btn-primary" onClick={next}>
            {qi < questions.length - 1 ? "Next Question →" : "See Results 🎉"}
          </button>
        </div>
      )}
    </div>
  );
}
