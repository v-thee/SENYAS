import { useState, useEffect, useRef } from "react";
import { senya_teaching, senya_blue, senya_logo } from "./images";

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

// Icons matching QuizMC
const Icon = {
  Info: (p) => <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="8" strokeWidth="3"/><line x1="12" y1="12" x2="12" y2="16"/></svg>,
  Bell: (p) => <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 01-3.46 0"/></svg>,
  Flame: (p) => <svg {...p} viewBox="0 0 24 24" fill="currentColor" stroke="none"><path d="M12 2c0 6-8 8-8 14a8 8 0 0016 0C20 10 12 8 12 2z"/></svg>,
  Exit: (p) => <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>,
  ArrowRight: (p) => <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>,
  Check: (p) => <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>,
  Refresh: (p) => <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M23 4v6h-6M1 20v-6h6M3.51 9a9 9 0 0 1 14.85-3.36L23 10M20.49 15a9 9 0 0 1-14.85 3.36L1 14"/></svg>,
  Home: (p) => <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2h-5v-8H7v8H5a2 2 0 0 1-2-2z"/></svg>,
  Trophy: (p) => <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/><path d="M4 22h16"/><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/><path d="M18 2H6v7a6 6 0 0 0 12 0V2z"/></svg>,
  Star: (p) => <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>,
  Award: (p) => <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="8" r="6"/><path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11"/></svg>,
  Target: (p) => <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>,
  Crown: (p) => <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M2 4L7 9L12 4L17 9L22 4L19 20H5L2 4Z"/><circle cx="5" cy="5" r="1" fill="currentColor"/><circle cx="12" cy="5" r="1" fill="currentColor"/><circle cx="19" cy="5" r="1" fill="currentColor"/></svg>,
  Medal: (p) => <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 15C15.866 15 19 11.866 19 8C19 4.13401 15.866 1 12 1C8.13401 1 5 4.13401 5 8C5 11.866 8.13401 15 12 15Z"/><path d="M12 15V23"/><path d="M9 21L12 18L15 21"/></svg>,
  Brain: (p) => <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96-.46 2.5 2.5 0 0 1-1.98-3.13A3 3 0 0 1 5 13V9a3 3 0 0 1 .56-1.78 2.5 2.5 0 0 1 3.94-3z"/><path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96-.46 2.5 2.5 0 0 0 1.98-3.13A3 3 0 0 0 19 13V9a3 3 0 0 0-.56-1.78 2.5 2.5 0 0 0-3.94-3z"/></svg>,
};

const EnergyIcon = ({ size = 16 }) => (
  <img 
    src="/public/img/energy.png"
    alt="energy"
    width={size}
    height={size}
    style={{ objectFit: "contain" }}
  />
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

// TopBar component matching QuizMC exactly
function TopBar({ nav, showExit = false, onExitClick }) {
  return (
    <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", padding:"52px 20px 0" }}>
      <span style={{ color:"#0f3172", fontSize:22, fontWeight:800, letterSpacing:2 }}>SEÑAS</span>
      <div style={{ display:"flex", gap:8, alignItems:"center" }}>
        <button style={{ background:"none", border:"none", cursor:"pointer", padding:2 }}>
          <Icon.Info width={20} height={20} style={{ color:"#4b7bbb" }} />
        </button>
        <div style={{ background:"rgba(255,255,255,0.7)", borderRadius:20, padding:"5px 12px", display:"flex", alignItems:"center", gap:5, color:"#0f3172", fontSize:13, fontWeight:700, boxShadow:"0 1px 4px rgba(0,0,0,0.08)" }}>
          <Icon.Flame width={14} height={14} style={{ color:"#fb923c" }} />
          12
        </div>
        <button style={{ background:"none", border:"none", cursor:"pointer", padding:2 }}>
          <Icon.Bell width={20} height={20} style={{ color:"#4b7bbb" }} />
        </button>
        {showExit && (
          <button
            onClick={onExitClick}
            style={{
              background:"rgba(255,255,255,0.7)",
              border:"1px solid rgba(255,255,255,0.85)",
              borderRadius:12,
              cursor:"pointer",
              padding:"6px 10px",
              display:"flex",
              alignItems:"center",
              gap:5,
              color:"#0f3172",
              fontSize:12,
              fontWeight:700,
              boxShadow:"0 1px 4px rgba(0,0,0,0.08)",
              backdropFilter:"blur(8px)",
              WebkitTapHighlightColor:"transparent",
            }}
          >
            <Icon.Exit width={14} height={14} style={{ color:"#4b7bbb" }} />
            Exit
          </button>
        )}
      </div>
    </div>
  );
}

function GlassCard({ children, style }) {
  return (
    <div style={{ background:"rgba(255,255,255,0.62)", border:"1px solid rgba(255,255,255,0.85)", borderRadius:20, backdropFilter:"blur(8px)", boxShadow:"0 2px 12px rgba(15,49,114,0.09)", ...style }}>
      {children}
    </div>
  );
}

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

// Exit Confirmation Modal matching QuizMC
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

// Result Screen with Rankings - EXACTLY matching QuizMC
function ResultScreen({ score, total, onRestart, onHome }) {
  const totalQuestions = total;
  const xpEarned = score * 30;
  const pct = Math.round((score / totalQuestions) * 100);
  const stars = pct === 100 ? 3 : pct >= 80 ? 2 : pct >= 50 ? 1 : 0;
  const [stage, setStage] = useState(0);
  const [showExitConfirm, setShowExitConfirm] = useState(false);

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
    if (rank === 1) return <Icon.Crown width={14} height={14} style={{ color: "#F59E0B" }} />;
    if (rank === 2) return <Icon.Medal width={14} height={14} style={{ color: "#9CA3AF" }} />;
    if (rank === 3) return <Icon.Medal width={14} height={14} style={{ color: "#CD7F32" }} />;
    return <span style={{ fontSize: 12, fontWeight: 700, color: "#9CA3AF", width: 14, textAlign: "center" }}>{rank}</span>;
  };

  const handleExit = () => {
    setShowExitConfirm(true);
  };

  const handleConfirmExit = () => {
    setShowExitConfirm(false);
    onHome();
  };

  const resultMsgs = [
    { icon: "Sparkle", text: "Incredible! You answered everything perfectly. You're a true SEÑAS star!" },
    { icon: "Award", text: "Amazing work! You're really getting the hang of FSL signs." },
    { icon: "Target", text: "Good effort! Review the ones you missed and try again!" },
    { icon: "Dumbbell", text: "Don't give up! Every mistake is a step toward mastery." },
  ];

  const msgIdx = pct === 100 ? 0 : pct >= 80 ? 1 : pct >= 60 ? 2 : 3;
  const msg = resultMsgs[msgIdx];
  const MsgIcon = Icon[msg.icon];

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(160deg,#a8d4f5 0%,#c5e3f7 35%,#daeefb 65%,#f0f8ff 100%)",
      display: "flex", flexDirection: "column",
    }}>
      <ExitConfirmModal 
        isOpen={showExitConfirm}
        onClose={() => setShowExitConfirm(false)}
        onConfirm={handleConfirmExit}
      />
      <TopBar nav={onHome} showExit={true} onExitClick={handleExit} />
      
      <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", padding: 20, position: "relative" }}>
        {stage >= 1 && <Confetti count={36} />}

        <div style={{ maxWidth: 360, width: "100%" }}>
          {/* Result Card */}
          <GlassCard style={{ padding: "32px 24px", textAlign: "center", position: "relative", overflow: "hidden", marginBottom: 16 }}>
            <img src={senya_teaching} alt="Senya" style={{
              width: 100, height: 100, objectFit: "contain",
              filter: "drop-shadow(0 5px 16px rgba(15,49,114,0.18))",
              animation: stage >= 1 ? "senyaJump 0.6s cubic-bezier(0.34,1.5,0.64,1)" : "none",
              marginBottom: 4,
            }} />

            <div style={{ animation: stage >= 2 ? "trophyBounce 0.7s cubic-bezier(0.34,1.2,0.64,1) 0.2s both" : "none", marginBottom: 8 }}>
              <Icon.Trophy width={48} height={48} style={{ color: "#fbbf24" }} />
            </div>

            <div style={{ display: "flex", justifyContent: "center", gap: 6, marginBottom: 10 }}>
              {[0, 1, 2].map(i => (
                <div key={i} style={{ animation: i < stars ? `starPop 0.4s cubic-bezier(0.34,1.4,0.64,1) ${0.3 + i * 0.12}s both` : "none" }}>
                  <Icon.Star width={28} height={28} style={{ fill: i < stars ? "#fbbf24" : "#E5E7EB", stroke: i < stars ? "#F59E0B" : "#E5E7EB" }} />
                </div>
              ))}
            </div>

            <h2 style={{ fontSize: 24, fontWeight: 800, color, marginBottom: 4, fontFamily: "var(--font-head)" }}>{label}</h2>

            <div style={{ display: "flex", alignItems: "center", margin: "16px 0", background: "rgba(15,49,114,0.05)", borderRadius: 16, overflow: "hidden" }}>
              {[
                { val: pct + "%", sub: "Accuracy" },
                { val: `${score}/${totalQuestions}`, sub: "Correct" },
                { val: xpEarned, sub: "XP earned", color: "#F59E0B" },
              ].map((s, i) => (
                <div key={i} style={{ flex: 1, padding: "14px 8px", textAlign: "center", borderRight: i < 2 ? "1px solid rgba(15,49,114,0.08)" : "none" }}>
                  <p style={{ fontSize: 28, fontWeight: 900, color: s.color || "#0f3172", lineHeight: 1 }}>{s.val}</p>
                  <p style={{ fontSize: 11, color: "#4b7bbb", fontWeight: 600, marginTop: 2 }}>{s.sub}</p>
                </div>
              ))}
            </div>

            <div style={{ background: "rgba(15,49,114,0.05)", borderRadius: 14, padding: "12px 14px", marginBottom: 0, textAlign: "left", display: "flex", gap: 10, alignItems: "flex-start" }}>
              <img src={senya_logo} alt="Senya" style={{ width: 36, height: 36, objectFit: "contain", flexShrink: 0 }} />
              <div style={{ flex: 1 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 5, marginBottom: 4 }}>
                  {MsgIcon && <MsgIcon width={13} height={13} style={{ color: color, flexShrink: 0 }} />}
                  <p style={{ fontSize: 12.5, color: "#0f3172", lineHeight: 1.55, margin: 0, fontWeight: 500 }}>{msg.text}</p>
                </div>
              </div>
            </div>

            <div style={{ display: "flex", gap: 10, marginTop: 20 }}>
              <Btn onClick={onHome} variant="ghost" style={{ flex: 1, padding: "13px" }}>
                <Icon.Home width={15} height={15} style={{ color: "#0f3172" }} /> Home
              </Btn>
              <Btn onClick={onRestart} variant="primary" style={{ flex: 1.4, padding: "13px" }}>
                <Icon.Refresh width={15} height={15} style={{ color: "#fff" }} /> Try Again
              </Btn>
            </div>
          </GlassCard>

          {/* Rankings Section */}
          <GlassCard style={{ padding: "20px 20px", marginBottom: 20 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
              <Icon.Award width={20} height={20} style={{ color: "#F59E0B" }} />
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
              letterSpacing: 0.5,
            }}>
              <span>Rank</span>
              <span>Student</span>
              <span style={{ textAlign: "right" }}>Score</span>
            </div>

            <div>
              {STUDENT_RANKINGS.map((student) => {
                const updatedStudent = student.isCurrentUser 
                  ? { ...student, score: xpEarned }
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
                      transition: "background 0.2s",
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
                      {student.isCurrentUser ? xpEarned : student.score}
                      <span style={{ fontSize: 9, color: "#9CA3AF", marginLeft: 2 }}>pts</span>
                    </div>
                  </div>
                );
              })}
            </div>

            <div style={{
              marginTop: 16,
              padding: "12px 0 8px",
              borderTop: "1px solid rgba(15,49,114,0.08)",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <Icon.Target width={14} height={14} style={{ color: "#2563EB" }} />
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
          </GlassCard>
        </div>
      </div>
    </div>
  );
}

// Btn component for consistent button styling
function Btn({ onClick, children, variant = "primary", disabled, style: sx = {} }) {
  const [p, setP] = useState(false);
  const styles = {
    primary: { background: "linear-gradient(135deg,#1035a0,#1848c8,#2563EB)", color: "#fff", boxShadow: "0 5px 18px rgba(15,49,114,0.28)" },
    ghost: { background: "rgba(255,255,255,0.62)", color: "#0f3172", border: "1px solid rgba(255,255,255,0.85)", backdropFilter: "blur(8px)" },
    gold: { background: "linear-gradient(135deg,#D97706,#F59E0B)", color: "#fff", boxShadow: "0 5px 16px rgba(245,158,11,0.35)" },
  }[variant] || {};
  
  return (
    <button onClick={onClick} disabled={disabled}
      onPointerDown={() => setP(true)} onPointerUp={() => setP(false)} onPointerLeave={() => setP(false)}
      style={{ ...styles, ...sx, borderRadius: 60, padding: "14px 24px", fontSize: 15, fontWeight: 700,
        cursor: disabled ? "not-allowed" : "pointer", opacity: disabled ? 0.5 : 1,
        transform: p ? "scale(0.96)" : "scale(1)", transition: "transform 0.1s ease",
        display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
        border: styles.border || "none", outline: "none", WebkitTapHighlightColor: "transparent", width: "100%" }}>
      {children}
    </button>
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

      <TopBar nav={nav} showExit={true} onExitClick={handleExit} />

      {/* Header Banner - Matching QuizMC module header style */}
      <div style={{
        background: "linear-gradient(135deg, #7C3AED, #8B5CF6)",
        margin: "14px 16px 0",
        borderRadius: 20,
        padding: "18px 20px",
        position: "relative",
        overflow: "hidden",
      }}>
        <div style={{ position: "absolute", top: -30, right: -30, width: 130, height: 130, borderRadius: "50%", background: "rgba(255,255,255,0.06)", pointerEvents: "none" }} />
        
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
          <h2 style={{ color: "#fff", fontSize: 20, fontWeight: 800, fontFamily: "var(--font-head)" }}>Drag & Drop</h2>
          <div style={{ display: "flex", alignItems: "center", gap: 6, background: "rgba(255,255,255,0.15)", borderRadius: 20, padding: "4px 12px" }}>
            <EnergyIcon size={16} />
            <span style={{ color: "#FFD93D", fontWeight: 700, fontSize: 13 }}>+30 XP</span>
          </div>
        </div>

        <div style={{ background: "rgba(255,255,255,0.2)", borderRadius: 99, height: 6, marginBottom: 8 }}>
          <div style={{
            width: `${((ci + 1) / challenges.length) * 100}%`,
            height: "100%",
            background: "linear-gradient(90deg, #C4B5FD, #DDD6FE)",
            borderRadius: 99,
            transition: "width 0.3s",
          }} />
        </div>
        
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <span style={{ color: "rgba(255,255,255,0.7)", fontSize: 11 }}>Challenge {ci + 1} of {challenges.length}</span>
          <span style={{ color: "rgba(255,255,255,0.7)", fontSize: 11 }}>{bank.length} words left</span>
        </div>
      </div>

      <div style={{ padding: "20px 16px", flex: 1 }}>
        {/* Senya hint */}
        <GlassCard style={{
          display: "flex",
          gap: 14,
          alignItems: "center",
          padding: "14px 18px",
          marginBottom: 20,
        }}>
          <img src={senya_teaching} alt="Senya" style={{
            width: 60,
            height: 60,
            objectFit: "contain",
            animation: "senya-bob 2.5s ease-in-out infinite",
          }} />
          <div style={{ flex: 1 }}>
            <p style={{ fontSize: 14, color: "#4C1D95", fontWeight: 600, lineHeight: 1.4 }}>
              {c.prompt}
            </p>
          </div>
        </GlassCard>

        {/* Feedback */}
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
            {result === "correct" ? (
              <Icon.Check width={16} height={16} style={{ color: "#10B981" }} />
            ) : (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#EF4444" strokeWidth="2.5">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            )}
            <span style={{ fontSize: 13, color: result === "correct" ? "#065F46" : "#991B1B" }}>
              {feedback}
            </span>
          </div>
        )}

        {/* Drop Slots */}
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

        {/* Word Bank */}
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

      {/* Actions */}
      <div style={{ padding: "0 16px 32px", display: "flex", flexDirection: "column", gap: 10 }}>
        {!result ? (
          <>
            <Btn
              onClick={check}
              disabled={!isComplete}
              variant="primary"
              style={{
                opacity: isComplete ? 1 : 0.5,
                cursor: isComplete ? "pointer" : "not-allowed",
              }}
            >
              <Icon.Check width={16} height={16} style={{ color: "#fff" }} /> Check Answer
            </Btn>
            <Btn onClick={reset} variant="ghost" style={{ padding: "12px" }}>
              <Icon.Refresh width={15} height={15} style={{ color: "#0f3172" }} /> Reset
            </Btn>
          </>
        ) : (
          <>
            <Btn onClick={next} variant="primary">
              {ci < challenges.length - 1 ? "Next Challenge" : "See Results"}
              <Icon.ArrowRight width={16} height={16} style={{ color: "#fff" }} />
            </Btn>
            {result === "wrong" && (
              <Btn onClick={reset} variant="ghost" style={{ padding: "12px" }}>
                <Icon.Refresh width={15} height={15} style={{ color: "#0f3172" }} /> Try Again
              </Btn>
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