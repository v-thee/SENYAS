import { useState } from "react";
import { senya_logo } from "./images";

const questions = [
  {
    question: "Which sign represents the letter 'A' in FSL?",
    imageUrl: "https://www.lifeprint.com/asl101/fingerspelling/american-sign-language-letters/a.jpg",
    options: ["Closed fist with thumb resting on side", "Open hand with fingers spread", "Index finger pointing up", "Peace sign"],
    correct: 0,
  },
  {
    question: "What does the open hand wave gesture typically mean?",
    imageUrl: "https://www.lifeprint.com/asl101/fingerspelling/american-sign-language-letters/h.jpg",
    options: ["Goodbye", "Hello / Hi", "Thank you", "I love you"],
    correct: 1,
  },
  {
    question: "Which sign means 'Thank You' in FSL?",
    imageUrl: "https://www.signingtime.com/wp-content/uploads/2015/11/thank-you-sign.jpg",
    options: ["Clapping hands together", "Open hands moving forward from chin", "Thumbs up gesture", "Index finger tapping chest"],
    correct: 1,
  },
  {
    question: "How do you sign the letter 'B' in FSL?",
    imageUrl: "https://www.lifeprint.com/asl101/fingerspelling/american-sign-language-letters/b.jpg",
    options: ["Closed fist", "Four fingers up with thumb across palm", "Peace sign", "OK sign"],
    correct: 1,
  },
  {
    question: "What is the sign for 'Please' in FSL?",
    imageUrl: "https://www.signingtime.com/wp-content/uploads/2015/11/please-sign.jpg",
    options: ["Flat hand circling chest", "Fist pounding chest", "Two fingers tapping chin", "Open hand waving"],
    correct: 0,
  },
];

/* ── Icons ─────────────────────────────────────────────────────────── */
const Icon = {
  Close: (p) => (
    <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
    </svg>
  ),
  ArrowRight: (p) => (
    <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
    </svg>
  ),
  Trophy: (p) => (
    <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/>
      <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/>
      <path d="M4 22h16"/>
      <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/>
      <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/>
      <path d="M18 2H6v7a6 6 0 0 0 12 0V2z"/>
    </svg>
  ),
  Star: (p) => (
    <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" fill="currentColor"/>
    </svg>
  ),
  Check: (p) => (
    <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"/><polyline points="8 12 11 15 16 9"/>
    </svg>
  ),
  X: (p) => (
    <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"/>
      <line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/>
    </svg>
  ),
  Zap: (p) => (
    <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
    </svg>
  ),
  Home: (p) => (
    <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2h-5v-8H7v8H5a2 2 0 0 1-2-2z"/>
    </svg>
  ),
  Refresh: (p) => (
    <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M23 4v6h-6"/><path d="M1 20v-6h6"/>
      <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10"/>
      <path d="M20.49 15a9 9 0 0 1-14.85 3.36L1 14"/>
    </svg>
  ),
};

/* ── Custom Button with press effect ── */
function Btn({ onClick, children, variant = "primary", disabled, style: sx = {} }) {
  const [pressed, setPressed] = useState(false);
  const base = {
    primary: { background: "linear-gradient(135deg, #1E40AF, #2563EB)", color: "#fff", boxShadow: "0 4px 12px rgba(37,99,235,0.3)" },
    outline: { background: "transparent", color: "#2563EB", border: "2px solid #2563EB", boxShadow: "none" },
  }[variant] || {};
  return (
    <button
      onClick={onClick} disabled={disabled}
      onPointerDown={() => setPressed(true)}
      onPointerUp={() => setPressed(false)}
      onPointerLeave={() => setPressed(false)}
      style={{
        ...base, ...sx,
        borderRadius: 60, padding: "14px 24px",
        fontSize: 15, fontWeight: 700,
        cursor: disabled ? "not-allowed" : "pointer",
        opacity: disabled ? 0.5 : 1,
        transform: pressed ? "scale(0.97)" : "scale(1)",
        transition: "transform 0.1s ease, opacity 0.15s, box-shadow 0.2s",
        display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
        border: base.border || "none",
        outline: "none", WebkitTapHighlightColor: "transparent",
        width: "100%",
      }}
    >{children}</button>
  );
}

function OptionCard({ option, index, isSelected, isRevealed, isCorrect, onClick }) {
  const [hovered, setHovered] = useState(false);
  const [localPressed, setLocalPressed] = useState(false);

  let bg = "#fff", border = "1.5px solid #E2E8F0", color = "#334155";
  if (isRevealed) {
    if (isCorrect) { bg = "#ECFDF5"; border = "2px solid #10B981"; color = "#065F46"; }
    else if (isSelected && !isCorrect) { bg = "#FEF2F2"; border = "2px solid #EF4444"; color = "#991B1B"; }
  } else if (isSelected) {
    bg = "#EFF6FF"; border = "2px solid #3B82F6"; color = "#1D4ED8";
  }

  const letter = String.fromCharCode(65 + index);

  return (
    <button
      onClick={onClick}
      onPointerEnter={() => setHovered(true)}
      onPointerLeave={() => { setHovered(false); setLocalPressed(false); }}
      onPointerDown={() => setLocalPressed(true)}
      onPointerUp={() => setLocalPressed(false)}
      disabled={isRevealed}
      style={{
        padding: "16px 18px", border, borderRadius: 16,
        background: bg, cursor: isRevealed ? "default" : "pointer",
        textAlign: "left", fontSize: 15, fontWeight: 600, color,
        transition: "all 0.2s cubic-bezier(0.34,1.2,0.64,1)",
        display: "flex", alignItems: "center", gap: 14,
        transform: (!isRevealed && (hovered || localPressed)) ? "translateX(4px)" : "translateX(0)",
        opacity: (!isRevealed && localPressed) ? 0.85 : 1,
        boxShadow: (!isRevealed && hovered) ? "0 4px 12px rgba(0,0,0,0.1)" : "none",
      }}
    >
      <div style={{
        width: 32, height: 32, borderRadius: 12, flexShrink: 0,
        background: isRevealed && isCorrect ? "#10B981" :
          isRevealed && isSelected && !isCorrect ? "#EF4444" :
          isSelected && !isRevealed ? "#3B82F6" :
          hovered && !isRevealed ? "#E2E8F0" : "#F1F5F6",
        color: isRevealed && (isCorrect || (isSelected && !isCorrect)) ? "#fff" :
          isSelected && !isRevealed ? "#fff" : "#64748B",
        display: "flex", alignItems: "center", justifyContent: "center",
        fontSize: 14, fontWeight: 800, transition: "all 0.2s",
      }}>
        {isRevealed && isCorrect ? <Icon.Check width={16} height={16} style={{ color: "#fff" }} /> :
          isRevealed && isSelected && !isCorrect ? <Icon.X width={16} height={16} style={{ color: "#fff" }} /> :
          letter}
      </div>
      {option}
    </button>
  );
}

export default function QuizMC({ nav }) {
  const [qi, setQi] = useState(0);
  const [selected, setSelected] = useState(null);
  const [revealed, setRevealed] = useState(false);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);
  const [pressedQuit, setPressedQuit] = useState(false);

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
    const xpEarned = score * 10;
    return (
      <div style={{
        minHeight: "100vh",
        background: "linear-gradient(160deg, #a8d4f5 0%, #c5e3f7 35%, #daeefb 65%, #f0f8ff 100%)",
        display: "flex", alignItems: "center", justifyContent: "center", padding: 20,
      }}>
        <div style={{
          background: "#fff", borderRadius: 36, padding: "36px 24px",
          maxWidth: 360, width: "100%", textAlign: "center",
          boxShadow: "0 16px 56px rgba(15,49,114,0.15)",
          animation: "popIn 0.4s cubic-bezier(0.34,1.3,0.64,1)",
        }}>
          <img src={senya_logo} alt="Senya" style={{
            width: 100, height: 100, objectFit: "contain", margin: "0 auto",
            filter: "drop-shadow(0 4px 16px rgba(15,49,114,0.15))",
          }} />
          
          <div style={{ marginTop: 8 }}>
            <Icon.Trophy width={48} height={48} style={{ color: "#fbbf24", margin: "0 auto" }} />
          </div>

          <div style={{ display: "flex", justifyContent: "center", gap: 8, marginTop: 12, marginBottom: 8 }}>
            {[0,1,2].map(i => (
              <Icon.Star key={i} width={28} height={28} style={{ 
                color: pct === 100 ? "#fbbf24" : i < (pct >= 80 ? 2 : pct >= 50 ? 1 : 0) ? "#fbbf24" : "#E5E7EB",
                fill: "currentColor"
              }} />
            ))}
          </div>

          <h2 style={{ fontSize: 26, fontWeight: 800, color: pct === 100 ? "#F59E0B" : pct >= 80 ? "#10B981" : pct >= 60 ? "#2563EB" : "#8B5CF6", marginBottom: 4 }}>
            {pct === 100 ? "Perfect Score!" : pct >= 80 ? "Excellent!" : pct >= 60 ? "Good Job!" : "Keep Going!"}
          </h2>

          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 20, margin: "16px 0", padding: "16px", background: "#F8FAFC", borderRadius: 20 }}>
            <div style={{ textAlign: "center" }}>
              <p style={{ fontSize: 36, fontWeight: 900, color: "#0f3172", lineHeight: 1 }}>{pct}%</p>
              <p style={{ fontSize: 12, color: "#6B7280", fontWeight: 600 }}>Accuracy</p>
            </div>
            <div style={{ width: 1, background: "#E2E8F0", height: 40 }} />
            <div style={{ textAlign: "center" }}>
              <p style={{ fontSize: 36, fontWeight: 900, color: "#0f3172", lineHeight: 1 }}>{score}/{questions.length}</p>
              <p style={{ fontSize: 12, color: "#6B7280", fontWeight: 600 }}>Correct</p>
            </div>
          </div>

          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, marginBottom: 24 }}>
            <Icon.Zap width={16} height={16} style={{ color: "#f59e0b" }} />
            <span style={{ fontSize: 13, fontWeight: 700, color: "#f59e0b" }}>+{xpEarned} XP earned</span>
          </div>

          <div style={{ display: "flex", gap: 10 }}>
            <Btn onClick={() => nav("dashboard")} variant="outline" style={{ flex: 1, padding: "12px" }}>
              <Icon.Home width={15} height={15} /> Home
            </Btn>
            <Btn onClick={() => { setQi(0); setSelected(null); setRevealed(false); setScore(0); setDone(false); }} variant="primary" style={{ flex: 1.4, padding: "12px" }}>
              <Icon.Refresh width={15} height={15} /> Try Again
            </Btn>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(170deg, #f0f8ff 0%, #e8f4fd 50%, #daeefb 100%)",
      display: "flex", flexDirection: "column",
    }}>
      {/* Header */}
      <div style={{
        background: "linear-gradient(135deg, #1E40AF, #2563EB)",
        padding: "52px 20px 24px 20px",
        borderRadius: "0 0 28px 28px",
      }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
          <button
            onClick={() => nav("dashboard")}
            onPointerDown={() => setPressedQuit(true)}
            onPointerUp={() => setPressedQuit(false)}
            onPointerLeave={() => setPressedQuit(false)}
            style={{
              background: "rgba(255,255,255,0.15)", border: "none", borderRadius: 12,
              padding: "8px 16px", color: "#fff", cursor: "pointer",
              fontSize: 13, fontWeight: 600, display: "flex", alignItems: "center", gap: 6,
              transform: pressedQuit ? "scale(0.96)" : "scale(1)",
              transition: "transform 0.1s ease",
            }}
          >
            <Icon.Close width={14} height={14} /> Quit
          </button>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <span style={{ color: "#fff", fontSize: 13, fontWeight: 700, background: "rgba(255,255,255,0.2)", padding: "4px 12px", borderRadius: 20 }}>
              {qi + 1} / {questions.length}
            </span>
            <div style={{ display: "flex", alignItems: "center", gap: 4, background: "rgba(255,255,255,0.2)", padding: "4px 12px", borderRadius: 20 }}>
              <Icon.Zap width={12} height={12} style={{ color: "#FFD93D" }} />
              <span style={{ color: "#FFD93D", fontWeight: 700, fontSize: 13 }}>{score * 10} XP</span>
            </div>
          </div>
        </div>
        <div style={{ background: "rgba(255,255,255,0.25)", borderRadius: 99, height: 6, overflow: "hidden" }}>
          <div style={{ width: `${((qi) / questions.length) * 100}%`, height: "100%", background: "#fbbf24", borderRadius: 99, transition: "width 0.4s ease" }} />
        </div>
      </div>

      {/* Question Card */}
      <div style={{ padding: "24px 20px 16px" }}>
        <div style={{
          background: "#fff", borderRadius: 24, padding: 28, textAlign: "center",
          boxShadow: "0 8px 24px rgba(0,0,0,0.08)", marginBottom: 20,
        }}>
          <img 
            src={q.imageUrl} 
            alt={`FSL sign`}
            style={{
              width: 120, height: 120, objectFit: "contain", marginBottom: 12, display: "inline-block",
              borderRadius: 16,
            }}
            onError={(e) => { e.target.src = "https://placehold.co/120x120/3B82F6/white?text=FSL+Sign"; }}
          />
          <p style={{
            fontSize: 18, fontWeight: 800, color: "#111827", lineHeight: 1.4,
          }}>{q.question}</p>
        </div>

        {/* Options */}
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {q.options.map((opt, i) => (
            <OptionCard
              key={i}
              option={opt}
              index={i}
              isSelected={selected === i}
              isRevealed={revealed}
              isCorrect={i === q.correct}
              onClick={() => choose(i)}
            />
          ))}
        </div>
      </div>

      {revealed && (
        <div style={{ padding: "0 20px 40px", marginTop: "auto" }}>
          <Btn onClick={next} variant="primary">
            {qi < questions.length - 1 ? "Next Question" : "See Results"}
            <Icon.ArrowRight width={16} height={16} style={{ color: "#fff" }} />
          </Btn>
        </div>
      )}
    </div>
  );
}

/* ── Global keyframes ──────────────────────────────────────────────── */
const _style = document.createElement("style");
_style.textContent = `
  @keyframes popIn { 0%{transform:scale(0.85);opacity:0} 100%{transform:scale(1);opacity:1} }
`;
if (!document.head.querySelector("#quiz-styles")) {
  _style.id = "quiz-styles";
  document.head.appendChild(_style);
}