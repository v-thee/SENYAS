import { useState } from "react";
import { senya_magnify } from "./images";

const challenges = [
  {
    prompt: "Arrange these signs to say: 'Hello, my name is Maria'",
    words: ["Maria", "Hello", "Name", "My"],
    correct: ["Hello", "My", "Name", "Maria"],
    emojis: ["👋","🙋","📛","👤"]
  },
  {
    prompt: "Order the alphabet signs from A to E",
    words: ["C", "A", "E", "B", "D"],
    correct: ["A", "B", "C", "D", "E"],
    emojis: ["🅰️","🅱️","©️","🔷","🔹"]
  },
];

export default function QuizDnD({ nav }) {
  const [ci, setCi] = useState(0);
  const [slots, setSlots] = useState([null, null, null, null]);
  const [bank, setBank] = useState([...challenges[0].words]);
  const [dragging, setDragging] = useState(null);
  const [fromSlot, setFromSlot] = useState(null);
  const [result, setResult] = useState(null);

  const c = challenges[ci];

  const addToSlot = (word, slotIdx) => {
    const emptySlot = slotIdx !== undefined ? slotIdx : slots.indexOf(null);
    if (emptySlot === -1) return;
    const newSlots = [...slots];
    newSlots[emptySlot] = word;
    setSlots(newSlots);
    setBank(bank.filter(w => w !== word));
  };

  const removeFromSlot = (slotIdx) => {
    const word = slots[slotIdx];
    if (!word) return;
    const newSlots = [...slots];
    newSlots[slotIdx] = null;
    setSlots(newSlots);
    setBank([...bank, word]);
  };

  const check = () => {
    const correct = slots.every((w, i) => w === c.correct[i]);
    setResult(correct ? "correct" : "wrong");
  };

  const reset = () => {
    setSlots([null, null, null, null]);
    setBank([...c.words]);
    setResult(null);
  };

  const next = () => {
    if (ci < challenges.length - 1) {
      setCi(ci + 1);
      const nc = challenges[ci + 1];
      setSlots(Array(nc.correct.length).fill(null));
      setBank([...nc.words]);
      setResult(null);
    } else {
      nav("gesture");
    }
  };

  const slotCount = c.correct.length;
  const currentSlots = slots.slice(0, slotCount);

  return (
    <div className="screen" style={{ background: "#F9FAFB" }}>
      {/* Header */}
      <div style={{
        background: "linear-gradient(135deg, #7C3AED, #8B5CF6)",
        padding: "52px 24px 24px"
      }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
          <button onClick={() => nav("dashboard")} style={{
            background: "rgba(255,255,255,0.15)", border: "none", borderRadius: 10,
            padding: "8px 14px", color: "#fff", cursor: "pointer",
            fontFamily: "var(--font-body)", fontSize: 13, fontWeight: 600
          }}>✕ Quit</button>
          <h2 style={{ color: "#fff", fontFamily: "var(--font-head)", fontSize: 18, fontWeight: 800 }}>
            Drag & Drop
          </h2>
          <span style={{ color: "#FFD93D", fontWeight: 700 }}>⚡ +30 XP</span>
        </div>
        <div className="xp-bar-wrap" style={{ background: "rgba(255,255,255,0.2)" }}>
          <div className="xp-bar-fill"
            style={{ width: `${((ci)/challenges.length)*100}%`,
              background: "linear-gradient(90deg, #C4B5FD, #DDD6FE)" }} />
        </div>
      </div>

      <div style={{ padding: "20px 24px", flex: 1 }}>
        {/* Senya hint */}
        <div style={{
          display: "flex", gap: 12, alignItems: "center",
          background: "#F5F3FF", borderRadius: 16, padding: 14, marginBottom: 20
        }}>
          <img src={senya_magnify} alt="Senya" style={{
            width: 44, height: 44, objectFit: "contain",
            animation: "senya-bob 2.5s ease-in-out infinite"
          }} />
          <p style={{ fontSize: 14, color: "#4C1D95", fontWeight: 600, lineHeight: 1.4 }}>
            {c.prompt}
          </p>
        </div>

        {/* Drop Slots */}
        <div style={{ marginBottom: 24 }}>
          <p style={{ fontSize: 12, fontWeight: 700, color: "#6B7280", marginBottom: 10,
            textTransform: "uppercase", letterSpacing: "0.05em" }}>Build the sentence:</p>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            {currentSlots.map((word, i) => (
              <div
                key={i}
                onClick={() => word && removeFromSlot(i)}
                style={{
                  minWidth: 70, height: 52, borderRadius: 12,
                  border: result === "correct" ? "2px solid #10B981" :
                    result === "wrong" && word !== c.correct[i] ? "2px solid #EF4444" :
                    word ? "2px solid #8B5CF6" : "2px dashed #C4B5FD",
                  background: result === "correct" ? "#ECFDF5" :
                    result === "wrong" && word !== c.correct[i] ? "#FEF2F2" :
                    word ? "#F5F3FF" : "#FAFAFA",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  cursor: word ? "pointer" : "default",
                  transition: "all 0.2s", padding: "0 12px"
                }}
              >
                {word ? (
                  <span style={{ fontSize: 14, fontWeight: 700,
                    color: result === "correct" ? "#065F46" :
                      result === "wrong" && word !== c.correct[i] ? "#991B1B" : "#5B21B6" }}>
                    {word}
                  </span>
                ) : (
                  <span style={{ fontSize: 11, color: "#C4B5FD", fontWeight: 600 }}>
                    {i + 1}
                  </span>
                )}
              </div>
            ))}
          </div>

          {result && (
            <div style={{
              marginTop: 12, padding: "12px 16px", borderRadius: 12,
              background: result === "correct" ? "#ECFDF5" : "#FEF2F2",
              border: `1.5px solid ${result === "correct" ? "#BBF7D0" : "#FECACA"}`,
              display: "flex", alignItems: "center", gap: 8
            }}>
              <span style={{ fontSize: 18 }}>{result === "correct" ? "🎉" : "💡"}</span>
              <p style={{ fontSize: 14, fontWeight: 600,
                color: result === "correct" ? "#065F46" : "#991B1B" }}>
                {result === "correct"
                  ? "Amazing! That's correct!"
                  : `Correct order: ${c.correct.join(" → ")}`}
              </p>
            </div>
          )}
        </div>

        {/* Word Bank */}
        <div>
          <p style={{ fontSize: 12, fontWeight: 700, color: "#6B7280", marginBottom: 10,
            textTransform: "uppercase", letterSpacing: "0.05em" }}>Word bank:</p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
            {bank.map((word, i) => (
              <button
                key={word + i}
                onClick={() => addToSlot(word)}
                disabled={!!result}
                style={{
                  padding: "10px 16px", borderRadius: 12,
                  border: "1.5px solid #DDD6FE",
                  background: "#fff", cursor: "pointer",
                  fontFamily: "var(--font-body)", fontSize: 14, fontWeight: 700,
                  color: "#5B21B6", transition: "all 0.15s",
                  boxShadow: "0 2px 6px rgba(139,92,246,0.15)",
                  opacity: result ? 0.5 : 1
                }}
              >
                {word}
              </button>
            ))}
            {bank.length === 0 && !result && (
              <p style={{ fontSize: 13, color: "#9CA3AF", fontStyle: "italic" }}>
                All words placed! Check your answer.
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Actions */}
      <div style={{ padding: "0 24px 40px", display: "flex", flexDirection: "column", gap: 10 }}>
        {!result ? (
          <>
            <button className="btn-primary"
              onClick={check}
              style={{
                background: "linear-gradient(135deg, #7C3AED, #8B5CF6)",
                opacity: currentSlots.every(s => s !== null) ? 1 : 0.5
              }}>
              Check Answer ✓
            </button>
            <button className="btn-ghost" onClick={reset}>Reset ↺</button>
          </>
        ) : (
          <>
            <button className="btn-primary"
              style={{ background: "linear-gradient(135deg, #7C3AED, #8B5CF6)" }}
              onClick={next}>
              {ci < challenges.length - 1 ? "Next Challenge →" : "Continue 🎉"}
            </button>
            {result === "wrong" && (
              <button className="btn-ghost" onClick={reset}>Try Again ↺</button>
            )}
          </>
        )}
      </div>
    </div>
  );
}
