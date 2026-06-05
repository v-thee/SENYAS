import { useState } from "react";
import { senya_logo } from "./images";

const signs = [
  { letter: "A", hint: "Make a closed fist with your thumb on the side", emoji: "✊" },
  { letter: "B", hint: "Hold up 4 fingers straight with thumb folded in", emoji: "🖐️" },
  { letter: "C", hint: "Curve your hand like the letter C", emoji: "🤌" },
];

export default function GestureRecog({ nav }) {
  const [phase, setPhase] = useState("ready"); // ready | detecting | success | fail
  const [signIdx, setSignIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [attempts, setAttempts] = useState(0);

  const sign = signs[signIdx];

  const startDetect = () => {
    setPhase("detecting");
    // Simulate detection after 3 seconds
    setTimeout(() => {
      const success = Math.random() > 0.3;
      setPhase(success ? "success" : "fail");
      setAttempts(a => a + 1);
      if (success) setScore(s => s + 1);
    }, 3000);
  };

  const next = () => {
    if (signIdx < signs.length - 1) {
      setSignIdx(signIdx + 1);
      setPhase("ready");
    } else {
      nav("achievements");
    }
  };

  return (
    <div className="screen" style={{ background: "#0F172A" }}>
      {/* Header */}
      <div style={{
        padding: "52px 24px 16px",
        display: "flex", justifyContent: "space-between", alignItems: "center"
      }}>
        <button onClick={() => nav("dashboard")} style={{
          background: "rgba(255,255,255,0.1)", border: "none", borderRadius: 10,
          padding: "8px 14px", color: "#fff", cursor: "pointer",
          fontFamily: "var(--font-body)", fontSize: 13, fontWeight: 600
        }}>← Back</button>
        <h2 style={{ color: "#fff", fontFamily: "var(--font-head)", fontSize: 18, fontWeight: 800 }}>
          Gesture Practice
        </h2>
        <span style={{ color: "#FFD93D", fontWeight: 700, fontSize: 14 }}>
          {score}/{signs.length}
        </span>
      </div>

      {/* Camera Area */}
      <div style={{ padding: "0 20px" }}>
        <div style={{
          background: "#1E293B", borderRadius: 24, overflow: "hidden",
          position: "relative", height: 300,
          border: phase === "success" ? "3px solid #10B981" :
            phase === "fail" ? "3px solid #EF4444" :
            phase === "detecting" ? "3px solid #3B82F6" :
            "2px solid #334155"
        }}>
          {/* Fake camera view */}
          <div style={{
            width: "100%", height: "100%",
            background: "linear-gradient(135deg, #1E293B 0%, #0F172A 100%)",
            display: "flex", alignItems: "center", justifyContent: "center",
            position: "relative"
          }}>
            {/* Grid overlay */}
            <div style={{
              position: "absolute", inset: 0,
              backgroundImage: "linear-gradient(rgba(59,130,246,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(59,130,246,0.04) 1px, transparent 1px)",
              backgroundSize: "30px 30px"
            }} />

            {/* Hand frame guide */}
            <div style={{
              width: 160, height: 200, border: "2px dashed rgba(59,130,246,0.5)",
              borderRadius: 16, position: "relative",
              display: "flex", alignItems: "center", justifyContent: "center"
            }}>
              {phase === "detecting" ? (
                <div style={{ textAlign: "center" }}>
                  <div style={{
                    width: 60, height: 60, borderRadius: "50%",
                    border: "3px solid #3B82F6",
                    borderTopColor: "transparent",
                    animation: "spin 1s linear infinite",
                    margin: "0 auto 12px"
                  }} />
                  <p style={{ color: "#93C5FD", fontSize: 13, fontWeight: 600 }}>Detecting...</p>
                </div>
              ) : phase === "success" ? (
                <div style={{ textAlign: "center" }}>
                  <div style={{ fontSize: 56 }}>✅</div>
                  <p style={{ color: "#4ADE80", fontSize: 14, fontWeight: 700, marginTop: 8 }}>Correct!</p>
                </div>
              ) : phase === "fail" ? (
                <div style={{ textAlign: "center" }}>
                  <div style={{ fontSize: 56 }}>❌</div>
                  <p style={{ color: "#F87171", fontSize: 14, fontWeight: 700, marginTop: 8 }}>Try again</p>
                </div>
              ) : (
                <div style={{ textAlign: "center" }}>
                  <div style={{ fontSize: 56, opacity: 0.3 }}>🤚</div>
                  <p style={{ color: "#475569", fontSize: 13, fontWeight: 600, marginTop: 8 }}>
                    Place hand here
                  </p>
                </div>
              )}

              {/* Corner markers */}
              {["tl","tr","bl","br"].map(pos => (
                <div key={pos} style={{
                  position: "absolute",
                  top: pos.includes("t") ? -2 : "auto",
                  bottom: pos.includes("b") ? -2 : "auto",
                  left: pos.includes("l") ? -2 : "auto",
                  right: pos.includes("r") ? -2 : "auto",
                  width: 16, height: 16,
                  borderTop: pos.includes("t") ? "3px solid #3B82F6" : "none",
                  borderBottom: pos.includes("b") ? "3px solid #3B82F6" : "none",
                  borderLeft: pos.includes("l") ? "3px solid #3B82F6" : "none",
                  borderRight: pos.includes("r") ? "3px solid #3B82F6" : "none",
                  borderRadius: pos === "tl" ? "4px 0 0 0" : pos === "tr" ? "0 4px 0 0" :
                    pos === "bl" ? "0 0 0 4px" : "0 0 4px 0"
                }} />
              ))}
            </div>

            {/* Status badge */}
            {phase === "detecting" && (
              <div style={{
                position: "absolute", top: 12, right: 12,
                background: "#3B82F6", borderRadius: 20, padding: "4px 12px",
                display: "flex", alignItems: "center", gap: 6
              }}>
                <div style={{
                  width: 6, height: 6, borderRadius: "50%", background: "#fff",
                  animation: "pulse 1s ease-in-out infinite"
                }} />
                <span style={{ color: "#fff", fontSize: 11, fontWeight: 700 }}>LIVE</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Sign Card */}
      <div style={{ padding: "16px 20px" }}>
        <div style={{
          background: "#1E293B", borderRadius: 20, padding: 20,
          display: "flex", gap: 16, alignItems: "center"
        }}>
          <div style={{
            width: 60, height: 60, borderRadius: 14,
            background: "linear-gradient(135deg, #1D4ED8, #3B82F6)",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 28, flexShrink: 0
          }}>{sign.emoji}</div>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <p style={{ color: "#94A3B8", fontSize: 12, fontWeight: 600 }}>Sign the letter</p>
              <span style={{
                background: "#3B82F6", borderRadius: 8, padding: "2px 10px",
                color: "#fff", fontSize: 14, fontWeight: 800, fontFamily: "var(--font-head)"
              }}>{sign.letter}</span>
            </div>
            <p style={{ color: "#CBD5E1", fontSize: 13, marginTop: 4, lineHeight: 1.5 }}>
              💡 {sign.hint}
            </p>
          </div>
        </div>
      </div>

      {/* Senya guide */}
      <div style={{ padding: "0 20px 12px", display: "flex", gap: 12, alignItems: "center" }}>
        <img src={senya_logo} alt="Senya" style={{
          width: 40, height: 40, objectFit: "contain",
          animation: "senya-bob 2.5s ease-in-out infinite"
        }} />
        <div style={{
          background: "#1E293B", borderRadius: "12px 12px 12px 2px",
          padding: "10px 14px", flex: 1
        }}>
          <p style={{ color: "#94A3B8", fontSize: 13, fontWeight: 500, lineHeight: 1.4 }}>
            {phase === "success" ? "🎉 Excellent! You got it right!" :
              phase === "fail" ? "💪 Almost there! Try once more." :
              phase === "detecting" ? "👀 I'm watching your hand movement..." :
              "👋 When ready, tap the button below and sign!"}
          </p>
        </div>
      </div>

      {/* Action */}
      <div style={{ padding: "0 24px 40px", marginTop: "auto" }}>
        {phase === "ready" && (
          <button className="btn-primary" onClick={startDetect}>
            📷 Start Detection
          </button>
        )}
        {phase === "detecting" && (
          <button disabled style={{
            width: "100%", padding: 16, border: "none", borderRadius: 50,
            background: "#334155", color: "#64748B", fontSize: 16, fontWeight: 700,
            fontFamily: "var(--font-body)", cursor: "not-allowed"
          }}>Detecting sign…</button>
        )}
        {(phase === "success" || phase === "fail") && (
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            <button className="btn-primary" onClick={next}>
              {signIdx < signs.length - 1 ? "Next Sign →" : "See Achievements 🏆"}
            </button>
            {phase === "fail" && (
              <button className="btn-ghost"
                onClick={() => setPhase("ready")}
                style={{ color: "#94A3B8", borderColor: "#334155" }}>
                Try Again ↺
              </button>
            )}
          </div>
        )}
      </div>

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes pulse { 0%,100% { opacity:1; } 50% { opacity:0.3; } }
      `}</style>
    </div>
  );
}
