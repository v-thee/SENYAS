import { useState, useEffect, useRef } from "react";
import { senya_teaching } from "./images";

const challenges = [
  {
    prompt: "Arrange these signs to say: 'Hello, my name is Maria'",
    words: ["Maria", "Hello", "Name", "My"],
    correct: ["Hello", "My", "Name", "Maria"],
  },
  {
    prompt: "Order the alphabet signs from A to E",
    words: ["C", "A", "E", "B", "D"],
    correct: ["A", "B", "C", "D", "E"],
  },
];

// Student rankings data
const STUDENT_RANKINGS = [
  { name: "Maria Santos", score: 100, rank: 1, avatar: "MS", isCurrentUser: false },
  { name: "Juan Dela Cruz", score: 95, rank: 2, avatar: "JD", isCurrentUser: false },
  { name: "Jose Rizal", score: 90, rank: 3, avatar: "JR", isCurrentUser: false },
  { name: "Andres Bonifacio", score: 85, rank: 4, avatar: "AB", isCurrentUser: false },
  { name: "Gabriela Silang", score: 80, rank: 5, avatar: "GS", isCurrentUser: false },
  { name: "You", score: 75, rank: 6, avatar: "⭐", isCurrentUser: true },
  { name: "Lapu-Lapu", score: 70, rank: 7, avatar: "LL", isCurrentUser: false },
  { name: "Emilio Aguinaldo", score: 65, rank: 8, avatar: "EA", isCurrentUser: false },
];

// Icons
const CheckIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

const RefreshIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
    <path d="M23 4v6h-6M1 20v-6h6M3.51 9a9 9 0 0 1 14.85-3.36L23 10M20.49 15a9 9 0 0 1-14.85 3.36L1 14" />
  </svg>
);

const ArrowIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
    <line x1="5" y1="12" x2="19" y2="12" />
    <polyline points="12 5 19 12 12 19" />
  </svg>
);

const DragIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="9" cy="12" r="1" />
    <circle cx="9" cy="5" r="1" />
    <circle cx="9" cy="19" r="1" />
    <circle cx="15" cy="12" r="1" />
    <circle cx="15" cy="5" r="1" />
    <circle cx="15" cy="19" r="1" />
  </svg>
);

const EnergyIcon = ({ size = 40 }) => (
  <img 
    src="/img/energy.png"
    alt="energy"
    width={size}
    height={size}
    style={{ objectFit: "contain" }}
  />
);

const TrophyIcon = () => (
  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#F59E0B" strokeWidth="2">
    <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
    <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
    <path d="M4 22h16" />
    <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" />
    <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" />
    <path d="M18 2H6v7a6 6 0 0 0 12 0V2z" />
  </svg>
);

const CrownIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#F59E0B" strokeWidth="2">
    <path d="M2 4L7 9L12 4L17 9L22 4L19 20H5L2 4Z" />
    <circle cx="5" cy="5" r="1" fill="#F59E0B" />
    <circle cx="12" cy="5" r="1" fill="#F59E0B" />
    <circle cx="19" cy="5" r="1" fill="#F59E0B" />
  </svg>
);

const MedalIcon = ({ color }) => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2">
    <path d="M12 15C15.866 15 19 11.866 19 8C19 4.13401 15.866 1 12 1C8.13401 1 5 4.13401 5 8C5 11.866 8.13401 15 12 15Z" />
    <path d="M12 15V23" />
    <path d="M9 21L12 18L15 21" />
  </svg>
);

const HomeIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2h-5v-8H7v8H5a2 2 0 0 1-2-2z" />
  </svg>
);

// PressableButton component for modal
function PressableButton({ onClick, style, children, disabled }) {
  const [pressed, setPressed] = useState(false);
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      onMouseDown={() => setPressed(true)}
      onMouseUp={() => setPressed(false)}
      onMouseLeave={() => setPressed(false)}
      onTouchStart={() => setPressed(true)}
      onTouchEnd={() => setPressed(false)}
      style={{
        ...style,
        transform: pressed ? "scale(0.97)" : "scale(1)",
        transition: "transform 0.12s ease",
        cursor: disabled ? "not-allowed" : "pointer",
        outline: "none",
      }}
    >
      {children}
    </button>
  );
}

// Exit Confirmation Modal
function ExitConfirmModal({ isOpen, onClose, onConfirm }) {
  if (!isOpen) return null;

  return (
    <>
      <div style={{
        position: "fixed", inset: 0,
        background: "rgba(0,0,0,0.45)",
        backdropFilter: "blur(5px)",
        zIndex: 1200,
      }} onClick={onClose} />
      <div style={{
        position: "fixed", top: "50%", left: "50%",
        transform: "translate(-50%, -50%)",
        width: "88%", maxWidth: 340,
        background: "rgba(255,255,255,0.97)",
        backdropFilter: "blur(20px)",
        borderRadius: 28,
        padding: "28px 24px 24px",
        zIndex: 1201,
        boxShadow: "0 20px 48px rgba(0,0,0,0.18)",
        border: "1px solid rgba(255,255,255,0.6)",
        animation: "modalPopIn 0.3s cubic-bezier(0.34,1.3,0.64,1)",
        textAlign: "center",
      }} onClick={e => e.stopPropagation()}>
        <div style={{
          width: 60, height: 60, borderRadius: "50%",
          background: "rgba(239,68,68,0.10)",
          border: "1.5px solid rgba(239,68,68,0.18)",
          display: "flex", alignItems: "center", justifyContent: "center",
          margin: "0 auto 16px",
        }}>
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#DC2626" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
            <polyline points="16 17 21 12 16 7"/>
            <line x1="21" y1="12" x2="9" y2="12"/>
          </svg>
        </div>
        <h3 style={{
          fontSize: 20, fontWeight: 800, color: "#0f3172",
          fontFamily: "var(--font-head)", marginBottom: 8,
        }}>
          Exit Challenge?
        </h3>
        <p style={{
          fontSize: 13, color: "#6B7280", fontWeight: 500,
          lineHeight: 1.55, marginBottom: 24,
        }}>
          Your progress will be lost. Are you sure you want to exit?
        </p>
        <div style={{ display: "flex", gap: 12 }}>
          <PressableButton onClick={onClose} style={{
            flex: 1, padding: "13px",
            background: "rgba(15,49,114,0.07)",
            border: "1px solid rgba(15,49,114,0.10)",
            borderRadius: 40, fontSize: 14, fontWeight: 700,
            color: "#0f3172",
          }}>
            Stay
          </PressableButton>
          <PressableButton onClick={onConfirm} style={{
            flex: 1.3, padding: "13px",
            background: "linear-gradient(135deg, #DC2626, #EF4444)",
            border: "none", borderRadius: 40,
            fontSize: 14, fontWeight: 700, color: "#fff",
            boxShadow: "0 4px 14px rgba(220,38,38,0.3)",
          }}>
            Exit
          </PressableButton>
        </div>
      </div>
    </>
  );
}

// Confetti Component
function Confetti({ count = 32 }) {
  const pieces = useRef(Array.from({ length: count }, (_, i) => ({
    x: 30 + Math.random() * 40,
    angle: (i / count) * 360,
    dist: 55 + Math.random() * 65,
    color: ["#fbbf24", "#34d399", "#60a5fa", "#f87171", "#a78bfa", "#fb923c"][i % 6],
    size: 5 + Math.random() * 6,
    delay: Math.random() * 0.18,
    shape: Math.random() > 0.5 ? "circle" : "rect",
  }))).current;

  return (
    <div style={{ position: "absolute", inset: 0, pointerEvents: "none", overflow: "hidden", zIndex: 200 }}>
      {pieces.map((p, i) => (
        <div key={i} style={{
          position: "absolute", left: `${p.x}%`, top: "45%",
          width: p.size, height: p.size,
          borderRadius: p.shape === "circle" ? "50%" : 2,
          background: p.color,
          animation: `confettiBurst 0.8s cubic-bezier(0.22,1,0.36,1) ${p.delay}s both`,
          "--dx": `${Math.cos(p.angle * Math.PI / 180) * p.dist}px`,
          "--dy": `${Math.sin(p.angle * Math.PI / 180) * p.dist}px`,
        }} />
      ))}
    </div>
  );
}

// Transition Animation Component
function TransitionAnim({ score, total, onDone }) {
  const [step, setStep] = useState(0);
  useEffect(() => {
    const t = [
      setTimeout(() => setStep(1), 500),
      setTimeout(() => setStep(2), 1600),
      setTimeout(() => { setStep(3); onDone(); }, 2100),
    ];
    return () => t.forEach(clearTimeout);
  }, []);

  return (
    <div style={{
      position: "absolute", inset: 0, zIndex: 300,
      background: step >= 2 ? "#fff" : "linear-gradient(135deg,#0f2044 0%,#1848c8 100%)",
      display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center", gap: 18,
      transition: "background 0.35s ease", overflow: "hidden",
    }}>
      {step >= 1 && <Confetti count={44} />}

      <img src={senya_teaching} alt="Senya" style={{
        width: 130, height: 130, objectFit: "contain",
        filter: "drop-shadow(0 8px 24px rgba(0,0,0,0.25))",
        animation: step === 0
          ? "senyaPop 0.5s cubic-bezier(0.34,1.5,0.64,1)"
          : "senyaBounce 0.55s ease-in-out infinite alternate",
      }} />

      {step >= 1 && (
        <div style={{ textAlign: "center", animation: "fadeUp 0.3s ease" }}>
          <p style={{ color: step >= 2 ? "#1848c8" : "rgba(255,255,255,0.7)", fontSize: 14, fontWeight: 600, marginBottom: 4 }}>
            Challenge Complete!
          </p>
          <p style={{
            fontSize: 64, fontWeight: 900, lineHeight: 1,
            color: step >= 2 ? "#1848c8" : "#fbbf24",
            animation: "countUp 0.5s cubic-bezier(0.34,1.3,0.64,1)",
          }}>
            {score}<span style={{ fontSize: 28, opacity: 0.6 }}>/{total}</span>
          </p>
          <p style={{ color: step >= 2 ? "#64748b" : "rgba(255,255,255,0.55)", fontSize: 13, marginTop: 4 }}>
            correct answers!
          </p>
        </div>
      )}
    </div>
  );
}

// Result Screen with Rankings
function ResultScreen({ score, total, onRestart, onHome }) {
  const totalXP = score * 30;
  const pct = Math.round((score / total) * 100);
  const stars = pct === 100 ? 3 : pct >= 80 ? 2 : pct >= 50 ? 1 : 0;
  const [stage, setStage] = useState(0);

  useEffect(() => {
    const t1 = setTimeout(() => setStage(1), 200);
    const t2 = setTimeout(() => setStage(2), 600);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  const { label, color } =
    pct === 100 ? { label: "Perfect Score!", color: "#F59E0B" } :
    pct >= 80 ? { label: "Excellent!", color: "#10B981" } :
    pct >= 60 ? { label: "Good Job!", color: "#2563EB" } :
    { label: "Keep Practicing!", color: "#8B5CF6" };

  const getRankIcon = (rank) => {
    if (rank === 1) return <CrownIcon />;
    if (rank === 2) return <MedalIcon color="#9CA3AF" />;
    if (rank === 3) return <MedalIcon color="#CD7F32" />;
    return <span style={{ fontSize: 12, fontWeight: 700, color: "#9CA3AF", width: 14, textAlign: "center" }}>{rank}</span>;
  };

  return (
    <div style={{
      background: "linear-gradient(180deg, #a8d4f5 0%, #c5e3f7 25%, #daeefb 55%, #eaf5fd 80%, #f0f8ff 100%)",
      minHeight: "100vh",
      paddingBottom: 40,
    }}>
      <div style={{ padding: "40px 16px", maxWidth: 500, margin: "0 auto" }}>
        {/* Result Card */}
        <div style={{
          background: "rgba(255,255,255,0.62)",
          backdropFilter: "blur(8px)",
          borderRadius: 32,
          padding: "32px 24px",
          textAlign: "center",
          border: "1px solid rgba(255,255,255,0.85)",
          marginBottom: 16,
          position: "relative",
          overflow: "hidden",
        }}>
          {stage >= 1 && <Confetti count={36} />}

          <img src={senya_teaching} alt="Senya" style={{
            width: 100, height: 100, objectFit: "contain",
            animation: stage >= 1 ? "senyaJump 0.6s cubic-bezier(0.34,1.5,0.64,1)" : "none",
            marginBottom: 8,
          }} />

          <div style={{ animation: stage >= 2 ? "trophyBounce 0.7s cubic-bezier(0.34,1.2,0.64,1) 0.2s both" : "none", marginBottom: 8 }}>
            <TrophyIcon />
          </div>

          <div style={{ display: "flex", justifyContent: "center", gap: 6, marginBottom: 10 }}>
            {[0, 1, 2].map(i => (
              <div key={i} style={{ animation: i < stars ? `starPop 0.4s cubic-bezier(0.34,1.4,0.64,1) ${0.3 + i * 0.12}s both` : "none" }}>
                <svg width="28" height="28" viewBox="0 0 24 24" fill={i < stars ? "#fbbf24" : "#E5E7EB"} stroke={i < stars ? "#F59E0B" : "#E5E7EB"} strokeWidth="2">
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                </svg>
              </div>
            ))}
          </div>

          <h2 style={{ fontSize: 26, fontWeight: 800, color, marginBottom: 8, fontFamily: "var(--font-head)" }}>{label}</h2>

          <div style={{
            display: "flex",
            alignItems: "center",
            margin: "16px 0",
            background: "rgba(15,49,114,0.05)",
            borderRadius: 16,
            overflow: "hidden",
          }}>
            {[
              { val: pct + "%", sub: "Accuracy" },
              { val: `${score}/${total}`, sub: "Correct" },
              { val: totalXP, sub: "XP earned", color: "#F59E0B" },
            ].map((s, i) => (
              <div key={i} style={{
                flex: 1,
                padding: "14px 8px",
                textAlign: "center",
                borderRight: i < 2 ? "1px solid rgba(15,49,114,0.08)" : "none",
              }}>
                <p style={{ fontSize: 28, fontWeight: 900, color: s.color || "#0f3172", lineHeight: 1 }}>{s.val}</p>
                <p style={{ fontSize: 11, color: "#4b7bbb", fontWeight: 600, marginTop: 2 }}>{s.sub}</p>
              </div>
            ))}
          </div>

          <div style={{ display: "flex", gap: 10 }}>
            <button onClick={onHome} style={{
              flex: 1,
              padding: "13px",
              borderRadius: 40,
              background: "rgba(255,255,255,0.62)",
              backdropFilter: "blur(8px)",
              color: "#0f3172",
              border: "1px solid rgba(139,92,246,0.3)",
              fontSize: 14,
              fontWeight: 600,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 6,
            }}>
              <HomeIcon /> Home
            </button>
            <button onClick={onRestart} style={{
              flex: 1.4,
              padding: "13px",
              borderRadius: 40,
              background: "linear-gradient(135deg, #7C3AED, #8B5CF6)",
              color: "#fff",
              border: "none",
              fontSize: 14,
              fontWeight: 600,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 6,
              boxShadow: "0 4px 12px rgba(139,92,246,0.3)",
            }}>
              <RefreshIcon /> Try Again
            </button>
          </div>
        </div>

        {/* Rankings Section */}
        <div style={{
          background: "rgba(255,255,255,0.62)",
          backdropFilter: "blur(8px)",
          borderRadius: 24,
          padding: "20px",
          border: "1px solid rgba(255,255,255,0.85)",
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#F59E0B" strokeWidth="2">
              <circle cx="12" cy="8" r="6" />
              <path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11" />
            </svg>
            <h3 style={{ fontSize: 16, fontWeight: 800, color: "#0f3172", margin: 0 }}>Class Rankings</h3>
            <span style={{ fontSize: 10, fontWeight: 600, color: "#4b7bbb", background: "rgba(15,49,114,0.08)", borderRadius: 99, padding: "3px 8px", marginLeft: "auto" }}>
              Top {STUDENT_RANKINGS.length}
            </span>
          </div>

          <div style={{
            display: "grid",
            gridTemplateColumns: "48px 1fr 64px",
            padding: "8px 0",
            borderBottom: "1px solid rgba(15,49,114,0.08)",
            marginBottom: 8,
            fontSize: 10,
            fontWeight: 700,
            color: "#4b7bbb",
            textTransform: "uppercase",
          }}>
            <span>Rank</span>
            <span>Student</span>
            <span style={{ textAlign: "right" }}>Score</span>
          </div>

          <div>
            {STUDENT_RANKINGS.map((student) => {
              const updatedStudent = student.isCurrentUser 
                ? { ...student, score: totalXP }
                : student;
              
              return (
                <div
                  key={student.rank}
                  style={{
                    display: "grid",
                    gridTemplateColumns: "48px 1fr 64px",
                    alignItems: "center",
                    padding: "10px 0",
                    borderRadius: 10,
                    background: student.isCurrentUser ? "rgba(37,99,235,0.08)" : "transparent",
                    borderBottom: student.rank !== STUDENT_RANKINGS.length ? "1px solid rgba(15,49,114,0.04)" : "none",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                    {getRankIcon(student.rank)}
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <div style={{
                      width: 28,
                      height: 28,
                      borderRadius: 99,
                      background: student.isCurrentUser ? "#2563EB" : "rgba(15,49,114,0.10)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 11,
                      fontWeight: 700,
                      color: student.isCurrentUser ? "#fff" : "#4b7bbb",
                    }}>
                      {student.avatar}
                    </div>
                    <span style={{
                      fontSize: 13,
                      fontWeight: student.isCurrentUser ? 800 : 600,
                      color: student.isCurrentUser ? "#2563EB" : "#0f3172",
                    }}>
                      {student.name}
                      {student.isCurrentUser && (
                        <span style={{
                          fontSize: 9,
                          fontWeight: 600,
                          color: "#2563EB",
                          background: "rgba(37,99,235,0.12)",
                          borderRadius: 99,
                          padding: "2px 6px",
                          marginLeft: 8,
                        }}>You</span>
                      )}
                    </span>
                  </div>
                  <div style={{
                    textAlign: "right",
                    fontWeight: student.isCurrentUser ? 800 : 600,
                    color: student.isCurrentUser ? "#2563EB" : "#0f3172",
                  }}>
                    {student.isCurrentUser ? totalXP : student.score}
                    <span style={{ fontSize: 9, color: "#9CA3AF", marginLeft: 2 }}>pts</span>
                  </div>
                </div>
              );
            })}
          </div>

          <div style={{
            marginTop: 16,
            paddingTop: 12,
            borderTop: "1px solid rgba(15,49,114,0.08)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#2563EB" strokeWidth="2">
                <circle cx="12" cy="12" r="10" />
                <circle cx="12" cy="12" r="6" />
                <circle cx="12" cy="12" r="2" />
              </svg>
              <span style={{ fontSize: 11, fontWeight: 600, color: "#4b7bbb" }}>Your Position</span>
            </div>
            <div style={{
              background: "rgba(37,99,235,0.10)",
              borderRadius: 99,
              padding: "4px 12px",
              display: "flex",
              alignItems: "center",
              gap: 4,
            }}>
              <span style={{ fontSize: 11, fontWeight: 800, color: "#2563EB" }}>#{STUDENT_RANKINGS.find(s => s.isCurrentUser)?.rank}</span>
              <span style={{ fontSize: 10, color: "#4b7bbb" }}>out of {STUDENT_RANKINGS.length}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function QuizDnD({ nav }) {
  const [ci, setCi] = useState(0);
  const [slots, setSlots] = useState([null, null, null, null]);
  const [bank, setBank] = useState([...challenges[0].words]);
  const [result, setResult] = useState(null);
  const [feedback, setFeedback] = useState("");
  const [showAnim, setShowAnim] = useState(false);
  const [finalScore, setFinalScore] = useState(0);
  const [showExitConfirm, setShowExitConfirm] = useState(false);

  const c = challenges[ci];

  const handleDragStart = (e, word) => {
    e.dataTransfer.setData("text/plain", word);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e, slotIndex) => {
    e.preventDefault();
    if (result) return;
    const word = e.dataTransfer.getData("text/plain");
    if (!word || slots[slotIndex]) return;
    
    setBank(bank.filter(w => w !== word));
    const newSlots = [...slots];
    newSlots[slotIndex] = word;
    setSlots(newSlots);
  };

  const removeFromSlot = (slotIdx) => {
    if (result) return;
    const word = slots[slotIdx];
    if (!word) return;
    setSlots([...slots.slice(0, slotIdx), null, ...slots.slice(slotIdx + 1)]);
    setBank([...bank, word]);
  };

  const check = () => {
    const isCorrect = slots.every((w, i) => w === c.correct[i]);
    if (isCorrect) {
      setResult("correct");
      setFeedback("Perfect! Great job arranging the signs correctly!");
    } else {
      setResult("wrong");
      setFeedback(`Almost there! The correct order is: ${c.correct.join(" → ")}`);
    }
  };

  const reset = () => {
    setSlots([null, null, null, null]);
    setBank([...c.words]);
    setResult(null);
    setFeedback("");
  };

  const next = () => {
    if (ci < challenges.length - 1) {
      setCi(ci + 1);
      setSlots([null, null, null, null]);
      setBank([...challenges[ci + 1].words]);
      setResult(null);
      setFeedback("");
    } else {
      const score = slots.filter((w, i) => w === c.correct[i]).length;
      setFinalScore(score);
      setShowAnim(true);
    }
  };

  const handleExit = () => {
    setShowExitConfirm(true);
  };

  const handleConfirmExit = () => {
    setShowExitConfirm(false);
    nav("dashboard");
  };

  const currentSlots = slots.slice(0, c.correct.length);
  const isComplete = currentSlots.every(s => s !== null);

  if (showAnim) {
    return (
      <TransitionAnim
        score={finalScore}
        total={challenges.length}
        onDone={() => setShowAnim(false)}
      />
    );
  }

  if (showAnim === false && result === "correct" && ci === challenges.length - 1 && finalScore > 0) {
    return (
      <ResultScreen
        score={finalScore}
        total={challenges.length}
        onRestart={() => {
          setCi(0);
          setSlots([null, null, null, null]);
          setBank([...challenges[0].words]);
          setResult(null);
          setFeedback("");
          setShowAnim(false);
          setFinalScore(0);
        }}
        onHome={() => nav("dashboard")}
      />
    );
  }

  return (
    <div style={{
      background: "linear-gradient(180deg, #a8d4f5 0%, #c5e3f7 25%, #daeefb 55%, #eaf5fd 80%, #f0f8ff 100%)",
      minHeight: "100vh",
      paddingBottom: 40,
    }}>
      <ExitConfirmModal 
        isOpen={showExitConfirm}
        onClose={() => setShowExitConfirm(false)}
        onConfirm={handleConfirmExit}
      />

      <div style={{
        background: "linear-gradient(135deg, #7C3AED, #8B5CF6)",
        padding: "52px 20px 24px",
      }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
          <button onClick={handleExit} style={{
            background: "rgba(255,255,255,0.15)",
            border: "1px solid rgba(255,255,255,0.3)",
            borderRadius: 12,
            padding: "8px 14px",
            color: "#fff",
            fontSize: 13,
            fontWeight: 600,
            cursor: "pointer",
          }}>✕ Quit</button>
          <h2 style={{ color: "#fff", fontSize: 18, fontWeight: 800 }}>Drag & Drop</h2>
          <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
            <EnergyIcon size={40} />
            <span style={{ color: "#FFD93D", fontWeight: 700 }}>+30 XP</span>
          </div>
        </div>
        <div style={{ background: "rgba(255,255,255,0.2)", borderRadius: 99, height: 6 }}>
          <div style={{
            width: `${((ci + 1) / challenges.length) * 100}%`,
            height: "100%",
            background: "linear-gradient(90deg, #C4B5FD, #DDD6FE)",
            borderRadius: 99,
            transition: "width 0.3s",
          }} />
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", marginTop: 8 }}>
          <span style={{ color: "rgba(255,255,255,0.7)", fontSize: 11 }}>Challenge {ci + 1} of {challenges.length}</span>
          <span style={{ color: "rgba(255,255,255,0.7)", fontSize: 11 }}>{bank.length} words left</span>
        </div>
      </div>

      <div style={{ padding: "20px 16px", flex: 1 }}>
        <div style={{
          display: "flex",
          gap: 12,
          alignItems: "center",
          background: "rgba(255,255,255,0.62)",
          backdropFilter: "blur(8px)",
          borderRadius: 16,
          padding: 14,
          marginBottom: 20,
          border: "1px solid rgba(255,255,255,0.85)"
        }}>
          <img src={senya_teaching} alt="Senya" style={{
            width: 60,
            height: 60,
            objectFit: "contain",
            animation: "senya-bob 2.5s ease-in-out infinite"
          }} />
          <p style={{ fontSize: 14, color: "#4C1D95", fontWeight: 600, lineHeight: 1.4 }}>
            {c.prompt}
          </p>
        </div>

        {feedback && (
          <div style={{
            marginBottom: 16,
            padding: "10px 14px",
            borderRadius: 12,
            background: result === "correct" ? "rgba(16,185,129,0.15)" : "rgba(239,68,68,0.1)",
            border: `1px solid ${result === "correct" ? "#10B981" : "#EF4444"}`,
            display: "flex",
            alignItems: "center",
            gap: 8
          }}>
            <span style={{ fontSize: 16 }}>{result === "correct" ? "✓" : "⚠️"}</span>
            <span style={{ fontSize: 13, color: result === "correct" ? "#065F46" : "#991B1B" }}>
              {feedback}
            </span>
          </div>
        )}

        <div style={{ marginBottom: 24 }}>
          <p style={{ fontSize: 12, fontWeight: 700, color: "#0f3172", marginBottom: 10 }}>
            Build the sentence:
          </p>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            {currentSlots.map((word, i) => (
              <div
                key={i}
                onDragOver={handleDragOver}
                onDrop={(e) => handleDrop(e, i)}
                onClick={() => word && removeFromSlot(i)}
                style={{
                  minWidth: 80,
                  height: 52,
                  borderRadius: 12,
                  border: result === "correct"
                    ? "2px solid #10B981"
                    : result === "wrong" && word && word !== c.correct[i]
                    ? "2px solid #EF4444"
                    : word
                    ? "2px solid #8B5CF6"
                    : "2px dashed #C4B5FD",
                  background: result === "correct"
                    ? "rgba(16,185,129,0.1)"
                    : result === "wrong" && word && word !== c.correct[i]
                    ? "rgba(239,68,68,0.1)"
                    : word
                    ? "rgba(139,92,246,0.08)"
                    : "rgba(255,255,255,0.5)",
                  backdropFilter: "blur(4px)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: word ? "pointer" : "default",
                  padding: "0 12px"
                }}
              >
                {word ? (
                  <span style={{
                    fontSize: 14,
                    fontWeight: 700,
                    color: result === "correct" ? "#065F46" : result === "wrong" && word !== c.correct[i] ? "#991B1B" : "#5B21B6"
                  }}>
                    {word}
                  </span>
                ) : (
                  <span style={{ fontSize: 11, color: "#C4B5FD", fontWeight: 600 }}>{i + 1}</span>
                )}
              </div>
            ))}
          </div>
        </div>

        <div>
          <p style={{ fontSize: 12, fontWeight: 700, color: "#0f3172", marginBottom: 10 }}>
            Word bank:
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
            {bank.map((word, i) => (
              <div
                key={word + i}
                draggable={!result}
                onDragStart={(e) => handleDragStart(e, word)}
                style={{
                  padding: "10px 16px",
                  borderRadius: 12,
                  background: result ? "rgba(139,92,246,0.2)" : "linear-gradient(135deg, #7C3AED, #8B5CF6)",
                  cursor: result ? "not-allowed" : "grab",
                  fontSize: 14,
                  fontWeight: 700,
                  color: result ? "#9CA3AF" : "#fff",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 6,
                  boxShadow: result ? "none" : "0 2px 8px rgba(139,92,246,0.3)"
                }}
              >
                <DragIcon />
                {word}
              </div>
            ))}
            {bank.length === 0 && !result && (
              <p style={{ fontSize: 13, color: "#9CA3AF", fontStyle: "italic" }}>
                All words placed! Check your answer.
              </p>
            )}
          </div>
        </div>
      </div>

      <div style={{ padding: "0 16px 32px", display: "flex", flexDirection: "column", gap: 10 }}>
        {!result ? (
          <>
            <button
              onClick={check}
              disabled={!isComplete}
              style={{
                width: "100%",
                padding: "14px",
                borderRadius: 60,
                background: isComplete ? "linear-gradient(135deg, #7C3AED, #8B5CF6)" : "rgba(139,92,246,0.4)",
                color: "#fff",
                border: "none",
                fontSize: 15,
                fontWeight: 600,
                cursor: isComplete ? "pointer" : "not-allowed",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 8
              }}
            >
              <CheckIcon /> Check Answer
            </button>
            <button
              onClick={reset}
              style={{
                width: "100%",
                padding: "12px",
                borderRadius: 60,
                background: "rgba(255,255,255,0.62)",
                backdropFilter: "blur(8px)",
                color: "#5B21B6",
                border: "1px solid rgba(139,92,246,0.3)",
                fontSize: 14,
                fontWeight: 600,
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 6
              }}
            >
              <RefreshIcon /> Reset
            </button>
          </>
        ) : (
          <>
            <button
              onClick={next}
              style={{
                width: "100%",
                padding: "14px",
                borderRadius: 60,
                background: "linear-gradient(135deg, #7C3AED, #8B5CF6)",
                color: "#fff",
                border: "none",
                fontSize: 15,
                fontWeight: 600,
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 8
              }}
            >
              {ci < challenges.length - 1 ? "Next Challenge" : "See Results"}
              <ArrowIcon />
            </button>
            {result === "wrong" && (
              <button
                onClick={reset}
                style={{
                  width: "100%",
                  padding: "12px",
                  borderRadius: 60,
                  background: "rgba(255,255,255,0.62)",
                  backdropFilter: "blur(8px)",
                  color: "#5B21B6",
                  border: "1px solid rgba(139,92,246,0.3)",
                  fontSize: 14,
                  fontWeight: 600,
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 6
                }}
              >
                <RefreshIcon /> Try Again
              </button>
            )}
          </>
        )}
      </div>

      <style>{`
        @keyframes senya-bob {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-6px); }
        }
        @keyframes senyaJump {
          0% { transform: scale(0) rotate(-15deg); opacity: 0; }
          70% { transform: scale(1.1) rotate(4deg); }
          100% { transform: scale(1) rotate(0); opacity: 1; }
        }
        @keyframes senyaBounce {
          0% { transform: translateY(0) scale(1); }
          100% { transform: translateY(-10px) scale(1.04); }
        }
        @keyframes senyaPop {
          0% { transform: scale(0) rotate(-15deg); opacity: 0; }
          70% { transform: scale(1.1) rotate(4deg); }
          100% { transform: scale(1) rotate(0); opacity: 1; }
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(14px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes countUp {
          0% { transform: scale(0.5) translateY(20px); opacity: 0; }
          100% { transform: scale(1) translateY(0); opacity: 1; }
        }
        @keyframes trophyBounce {
          0% { transform: translateY(0); }
          35% { transform: translateY(-14px); }
          65% { transform: translateY(-6px); }
          100% { transform: translateY(0); }
        }
        @keyframes starPop {
          0% { transform: scale(0) rotate(-30deg); opacity: 0; }
          100% { transform: scale(1) rotate(0); opacity: 1; }
        }
        @keyframes confettiBurst {
          0% { transform: translate(0,0) rotate(0deg); opacity: 1; }
          100% { transform: translate(var(--dx), var(--dy)) rotate(540deg); opacity: 0; }
        }
        @keyframes modalPopIn {
          from { opacity: 0; transform: translate(-50%, -50%) scale(0.9); }
          to { opacity: 1; transform: translate(-50%, -50%) scale(1); }
        }
      `}</style>
    </div>
  );
}