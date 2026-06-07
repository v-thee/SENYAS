import { useState, useEffect, useRef } from "react";
import { senya_blue, senya_teaching, senya_logo } from "./images";

/* ══ DATA ══════════════════════════════════════════════════════════════ */
const MODULE_SLIDES = [
  {
    title: "What is Filipino Sign Language?",
    body: "Filipino Sign Language (FSL) is the official sign language of the Philippines, recognized by law in 2018. It is a complete, natural language with its own grammar and vocabulary — distinct from English or American Sign Language.",
    iconKey: "Flag",
    color: "#2563EB",
  },
  {
    title: "The FSL Alphabet",
    body: "The FSL manual alphabet uses handshapes to represent each letter. Fingerspelling allows you to spell out words letter-by-letter — it's the foundation for learning FSL vocabulary.",
    iconKey: "Hand",
    color: "#059669",
  },
  {
    title: "Greetings in FSL",
    body: "Common greetings like 'Hello', 'Goodbye', 'Thank You', and 'Please' are among the first signs to learn. They open the door to everyday conversation with the Deaf community.",
    iconKey: "Wave",
    color: "#F59E0B",
  },
  {
    title: "Why Learn FSL?",
    body: "There are over 1 million Deaf Filipinos. Learning FSL promotes inclusion, bridges communication gaps, and shows respect for Deaf culture. Even basic signs can make a meaningful difference.",
    iconKey: "Heart",
    color: "#8B5CF6",
  },
];

const questions = [
  {
    question: "Which sign represents the letter 'A' in FSL?",
    imageUrl: "https://www.lifeprint.com/asl101/fingerspelling/american-sign-language-letters/a.jpg",
    options: ["Closed fist, thumb on side", "Open hand, fingers spread", "Index finger pointing up", "Peace sign"],
    correct: 0,
    feedbackCorrect: "That's right! 'A' is a closed fist with your thumb resting on the side of your index finger.",
    feedbackWrong: "Not quite! 'A' is a closed fist — thumb resting on the side. Visualize making the letter shape.",
  },
  {
    question: "What does the open hand wave gesture mean?",
    imageUrl: "https://www.lifeprint.com/asl101/fingerspelling/american-sign-language-letters/h.jpg",
    options: ["Goodbye", "Hello / Hi", "Thank you", "I love you"],
    correct: 1,
    feedbackCorrect: "Correct! An open hand wave is the universal greeting. You're doing great!",
    feedbackWrong: "Close! An open hand wave means 'Hello / Hi'. 'Goodbye' uses a different motion.",
  },
  {
    question: "Which sign means 'Thank You' in FSL?",
    imageUrl: "https://www.signingtime.com/wp-content/uploads/2015/11/thank-you-sign.jpg",
    options: ["Clapping hands", "Open hand moving forward from chin", "Thumbs up", "Index finger tapping chest"],
    correct: 1,
    feedbackCorrect: "Perfect! 'Thank You' moves an open flat hand forward from the chin — like blowing gratitude!",
    feedbackWrong: "Not this time! 'Thank You' is an open hand moving forward from the chin.",
  },
  {
    question: "How do you sign the letter 'B' in FSL?",
    imageUrl: "https://www.lifeprint.com/asl101/fingerspelling/american-sign-language-letters/b.jpg",
    options: ["Closed fist", "Four fingers up, thumb across palm", "Peace sign", "OK sign"],
    correct: 1,
    feedbackCorrect: "Excellent! 'B' uses four fingers held straight up, thumb folded across the palm.",
    feedbackWrong: "Almost! 'B' is four fingers pointing straight up with your thumb folded across your palm.",
  },
  {
    question: "What is the sign for 'Please' in FSL?",
    imageUrl: "https://www.signingtime.com/wp-content/uploads/2015/11/please-sign.jpg",
    options: ["Flat hand circling chest", "Fist pounding chest", "Two fingers tapping chin", "Open hand waving"],
    correct: 0,
    feedbackCorrect: "You got it! 'Please' is a flat hand making a small circle on the chest.",
    feedbackWrong: "Not quite! 'Please' is a flat open hand rubbing a circle on your chest.",
  },
];

// Sample student data for rankings
const STUDENT_RANKINGS = [
  { name: "Maria Santos", score: 50, rank: 1, avatar: "MS", isCurrentUser: false },
  { name: "Juan Dela Cruz", score: 48, rank: 2, avatar: "JD", isCurrentUser: false },
  { name: "Jose Rizal", score: 45, rank: 3, avatar: "JR", isCurrentUser: false },
  { name: "Andres Bonifacio", score: 42, rank: 4, avatar: "AB", isCurrentUser: false },
  { name: "Gabriela Silang", score: 40, rank: 5, avatar: "GS", isCurrentUser: false },
  { name: "Lapu-Lapu", score: 38, rank: 6, avatar: "LL", isCurrentUser: false },
  { name: "Emilio Aguinaldo", score: 35, rank: 7, avatar: "EA", isCurrentUser: false },
  { name: "Melchora Aquino", score: 32, rank: 8, avatar: "MA", isCurrentUser: false },
  { name: "Antonio Luna", score: 28, rank: 9, avatar: "AL", isCurrentUser: false },
  { name: "Gregorio Del Pilar", score: 25, rank: 10, avatar: "GD", isCurrentUser: true },
];

/* ══ HELPERS ═══════════════════════════════════════════════════════════ */
const Icon = {
  ArrowRight: (p) => <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>,
  ArrowLeft:  (p) => <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>,
  Trophy:     (p) => <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/><path d="M4 22h16"/><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/><path d="M18 2H6v7a6 6 0 0 0 12 0V2z"/></svg>,
  Star:       (p) => <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>,
  Check:      (p) => <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="8 12 11 15 16 9"/></svg>,
  X:          (p) => <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>,
  Zap:        (p) => <svg {...p} viewBox="0 0 24 24" fill="currentColor" stroke="none"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>,
  Home:       (p) => <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2h-5v-8H7v8H5a2 2 0 0 1-2-2z"/></svg>,
  Refresh:    (p) => <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M23 4v6h-6"/><path d="M1 20v-6h6"/><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10"/><path d="M20.49 15a9 9 0 0 1-14.85 3.36L1 14"/></svg>,
  Close:      (p) => <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>,
  Book:       (p) => <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>,
  Exit:       (p) => <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>,
  Info:       (p) => <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="8" strokeWidth="3"/><line x1="12" y1="12" x2="12" y2="16"/></svg>,
  Bell:       (p) => <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 01-3.46 0"/></svg>,
  Flame:      (p) => <svg {...p} viewBox="0 0 24 24" fill="currentColor" stroke="none"><path d="M12 2c0 6-8 8-8 14a8 8 0 0016 0C20 10 12 8 12 2z"/></svg>,
  Flag:       (p) => <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"/><line x1="4" y1="22" x2="4" y2="15"/></svg>,
  Hand:       (p) => <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 11V6a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v0"/><path d="M14 10V4a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v2"/><path d="M10 10.5V6a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v8"/><path d="M18 8a2 2 0 1 1 4 0v6a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.86-5.99-2.34l-3.6-3.6a2 2 0 0 1 2.83-2.82L7 15"/></svg>,
  Wave:       (p) => <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M7.5 4.27l9 5.15"/><path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"/><path d="m3.3 7 8.7 5 8.7-5"/><path d="M12 22V12"/></svg>,
  Heart:      (p) => <svg {...p} viewBox="0 0 24 24" fill="currentColor" stroke="none"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>,
  Sparkle:    (p) => <svg {...p} viewBox="0 0 24 24" fill="currentColor" stroke="none"><path d="M12 2l1.5 5.5L19 9l-5.5 1.5L12 16l-1.5-5.5L5 9l5.5-1.5z"/><path d="M5 3l.8 2.2L8 6l-2.2.8L5 9l-.8-2.2L2 6l2.2-.8z" opacity=".6"/><path d="M19 15l.8 2.2 2.2.8-2.2.8L19 21l-.8-2.2L16 18l2.2-.8z" opacity=".6"/></svg>,
  Award:      (p) => <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="6"/><path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11"/></svg>,
  Target:     (p) => <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>,
  Dumbbell:   (p) => <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 5v14"/><path d="M18 5v14"/><path d="M4 7h4"/><path d="M4 17h4"/><path d="M16 7h4"/><path d="M16 17h4"/><path d="M6 12h12"/></svg>,
  Brain:      (p) => <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96-.46 2.5 2.5 0 0 1-1.98-3.13A3 3 0 0 1 5 13V9a3 3 0 0 1 .56-1.78 2.5 2.5 0 0 1 3.94-3z"/><path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96-.46 2.5 2.5 0 0 0 1.98-3.13A3 3 0 0 0 19 13V9a3 3 0 0 0-.56-1.78 2.5 2.5 0 0 0-3.94-3z"/></svg>,
  Crown:      (p) => <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 4L7 9L12 4L17 9L22 4L19 20H5L2 4Z"/><circle cx="5" cy="5" r="1" fill="currentColor"/><circle cx="12" cy="5" r="1" fill="currentColor"/><circle cx="19" cy="5" r="1" fill="currentColor"/></svg>,
  Medal:      (p) => <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 15C15.866 15 19 11.866 19 8C19 4.13401 15.866 1 12 1C8.13401 1 5 4.13401 5 8C5 11.866 8.13401 15 12 15Z"/><path d="M12 15V23"/><path d="M9 21L12 18L15 21"/></svg>,
};

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
          Exit Quiz?
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

const SlideIcon = ({ iconKey, color, size = 40 }) => {
  const C = Icon[iconKey];
  return C ? <C width={size} height={size} style={{ color }} /> : null;
};

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

function Btn({ onClick, children, variant="primary", disabled, style:sx={} }) {
  const [p, setP] = useState(false);
  const styles = {
    primary: { background:"linear-gradient(135deg,#1035a0,#1848c8,#2563EB)", color:"#fff", boxShadow:"0 5px 18px rgba(15,49,114,0.28)" },
    ghost:   { background:"rgba(255,255,255,0.62)", color:"#0f3172", border:"1px solid rgba(255,255,255,0.85)", backdropFilter:"blur(8px)" },
    gold:    { background:"linear-gradient(135deg,#D97706,#F59E0B)", color:"#fff", boxShadow:"0 5px 16px rgba(245,158,11,0.35)" },
  }[variant] || {};
  return (
    <button onClick={onClick} disabled={disabled}
      onPointerDown={()=>setP(true)} onPointerUp={()=>setP(false)} onPointerLeave={()=>setP(false)}
      style={{ ...styles, ...sx, borderRadius:60, padding:"14px 24px", fontSize:15, fontWeight:700,
        cursor:disabled?"not-allowed":"pointer", opacity:disabled?0.5:1,
        transform:p?"scale(0.96)":"scale(1)", transition:"transform 0.1s ease",
        display:"flex", alignItems:"center", justifyContent:"center", gap:8,
        border:styles.border||"none", outline:"none", WebkitTapHighlightColor:"transparent", width:"100%" }}>
      {children}
    </button>
  );
}

/* ── Confetti ── */
function Confetti({ count=32 }) {
  const pieces = useRef(Array.from({ length:count }, (_,i) => ({
    x: 30+Math.random()*40, angle:(i/count)*360, dist:55+Math.random()*65,
    color:["#fbbf24","#34d399","#60a5fa","#f87171","#a78bfa","#fb923c"][i%6],
    size:5+Math.random()*6, delay:Math.random()*0.18,
    shape:Math.random()>0.5?"circle":"rect",
  }))).current;
  return (
    <div style={{ position:"absolute", inset:0, pointerEvents:"none", overflow:"hidden" }}>
      {pieces.map((p,i) => (
        <div key={i} style={{
          position:"absolute", left:`${p.x}%`, top:"45%",
          width:p.size, height:p.size,
          borderRadius:p.shape==="circle"?"50%":2,
          background:p.color,
          animation:`confettiBurst 0.8s cubic-bezier(0.22,1,0.36,1) ${p.delay}s both`,
          "--dx":`${Math.cos(p.angle*Math.PI/180)*p.dist}px`,
          "--dy":`${Math.sin(p.angle*Math.PI/180)*p.dist}px`,
        }} />
      ))}
    </div>
  );
}

/* ── Transition animation ── */
function TransitionAnim({ score, total, label, onDone }) {
  const [step, setStep] = useState(0);
  useEffect(() => {
    const t = [
      setTimeout(()=>setStep(1), 500),
      setTimeout(()=>setStep(2), 1600),
      setTimeout(()=>{ setStep(3); onDone(); }, 2100),
    ];
    return ()=>t.forEach(clearTimeout);
  }, []);

  return (
    <div style={{
      position:"absolute", inset:0, zIndex:300,
      background: step>=2 ? "#fff" : "linear-gradient(135deg,#0f2044 0%,#1848c8 100%)",
      display:"flex", flexDirection:"column",
      alignItems:"center", justifyContent:"center", gap:18,
      transition:"background 0.35s ease", overflow:"hidden",
    }}>
      {step>=1 && <Confetti count={44} />}

      <img src={senya_teaching} alt="Senya" style={{
        width:130, height:130, objectFit:"contain",
        filter:"drop-shadow(0 8px 24px rgba(0,0,0,0.25))",
        animation: step===0
          ? "senyaPop 0.5s cubic-bezier(0.34,1.5,0.64,1)"
          : "senyaBounce 0.55s ease-in-out infinite alternate",
      }} />

      {step>=1 && (
        <div style={{ textAlign:"center", animation:"fadeUp 0.3s ease" }}>
          <p style={{ color:step>=2?"#1848c8":"rgba(255,255,255,0.7)", fontSize:14, fontWeight:600, marginBottom:4 }}>
            {label}
          </p>
          {total !== undefined && (
            <p style={{ fontSize:64, fontWeight:900, lineHeight:1, color:step>=2?"#1848c8":"#fbbf24", animation:"countUp 0.5s cubic-bezier(0.34,1.3,0.64,1)" }}>
              {score}<span style={{ fontSize:28, opacity:0.6 }}>/{total}</span>
            </p>
          )}
          <p style={{ color:step>=2?"#64748b":"rgba(255,255,255,0.55)", fontSize:13, marginTop:4 }}>
            {total !== undefined ? "correct answers!" : ""}
          </p>
        </div>
      )}
    </div>
  );
}

/* ══ SCREEN 1: MODULE ══════════════════════════════════════════════════ */
const SenyaTips = [
  { icon: "Wave",    text: "Hi! I'm Senya. Let's learn about FSL before your quiz!" },
  { icon: "Hand",    text: "Fingerspelling is a superpower — you can sign any word!" },
  { icon: "Wave",    text: "Greetings open every conversation. Practice them daily!" },
  { icon: "Brain",   text: "You're almost ready for the quiz. You've got this!" },
];

// Helper component to render dynamic icon
function DynamicIcon({ iconName, size = 14, color = "#1848c8" }) {
  const IconComponent = Icon[iconName];
  if (!IconComponent) return null;
  return <IconComponent width={size} height={size} style={{ color, flexShrink: 0, marginTop: 1 }} />;
}

function ModuleScreen({ onStart, nav }) {
  const [slide, setSlide] = useState(0);
  const [showExitConfirm, setShowExitConfirm] = useState(false);
  const current = MODULE_SLIDES[slide];
  const isLast  = slide === MODULE_SLIDES.length - 1;
  const tip     = SenyaTips[slide];

  const handleExit = () => {
    setShowExitConfirm(true);
  };

  const handleConfirmExit = () => {
    setShowExitConfirm(false);
    nav("dashboard");
  };

  return (
    <div style={{
      minHeight:"100vh",
      background:"linear-gradient(180deg,#a8d4f5 0%,#c5e3f7 25%,#daeefb 55%,#eaf5fd 80%,#f0f8ff 100%)",
      display:"flex", flexDirection:"column", paddingBottom:32,
    }}>
      <ExitConfirmModal 
        isOpen={showExitConfirm}
        onClose={() => setShowExitConfirm(false)}
        onConfirm={handleConfirmExit}
      />
      <TopBar nav={nav} showExit={true} onExitClick={handleExit} />

      {/* Hero */}
      <div style={{ margin:"14px 16px 0" }}>
        <GlassCard style={{ padding:"22px 20px", position:"relative", overflow:"hidden" }}>
          <div style={{ position:"absolute", top:-30, right:-30, width:130, height:130, borderRadius:"50%", background:"rgba(37,99,235,0.06)", pointerEvents:"none" }} />

          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start" }}>
            <div style={{ flex:1, paddingRight:8 }}>
              <div style={{ display:"inline-flex", alignItems:"center", gap:6, background:"rgba(15,49,114,0.08)", borderRadius:8, padding:"4px 10px", marginBottom:8 }}>
                <Icon.Book width={13} height={13} style={{ color:"#1848c8" }} />
                <span style={{ fontSize:11, fontWeight:800, color:"#1848c8", letterSpacing:0.5 }}>MODULE</span>
              </div>
              <h1 style={{ fontSize:22, fontWeight:800, color:"#0f3172", lineHeight:1.2, marginBottom:6, fontFamily:"var(--font-head)" }}>
                Filipino Sign Language
              </h1>
              <p style={{ fontSize:12, color:"#4b7bbb", fontWeight:500, lineHeight:1.5 }}>
                Learn the basics before the quiz. {MODULE_SLIDES.length} slides · ~2 min read
              </p>
            </div>
            <img src={senya_blue} alt="Senya" style={{
              width:88, height:88, objectFit:"contain",
              filter:"drop-shadow(0 4px 12px rgba(15,49,114,0.18))",
              animation:"senyaBob 2.5s ease-in-out infinite",
              flexShrink:0,
            }} />
          </div>
        </GlassCard>
      </div>

      {/* Slide dots */}
      <div style={{ display:"flex", justifyContent:"center", gap:6, padding:"16px 0 0" }}>
        {MODULE_SLIDES.map((_,i) => (
          <div key={i} onClick={()=>setSlide(i)} style={{
            width: i===slide ? 22 : 8, height:8, borderRadius:99,
            background: i<=slide ? "#1848c8" : "rgba(15,49,114,0.15)",
            cursor:"pointer", transition:"all 0.3s ease",
          }} />
        ))}
      </div>

      {/* Slide content */}
      <div style={{ padding:"12px 16px 0", flex:1 }}>
        <GlassCard style={{ padding:"24px 20px", minHeight:220, display:"flex", flexDirection:"column", position:"relative", overflow:"hidden" }}>
          {/* Color accent */}
          <div style={{ position:"absolute", top:0, left:0, right:0, height:4, background:`linear-gradient(90deg,${current.color},${current.color}88)`, borderRadius:"20px 20px 0 0" }} />

          <div style={{ marginBottom:14, lineHeight:1 }}>
            <SlideIcon iconKey={current.iconKey} color={current.color} size={42} />
          </div>
          <h2 style={{ fontSize:18, fontWeight:800, color:"#0f3172", marginBottom:10, fontFamily:"var(--font-head)" }}>
            {current.title}
          </h2>
          <p style={{ fontSize:14, color:"#334155", lineHeight:1.7, flex:1 }}>{current.body}</p>

          {/* Slide counter */}
          <p style={{ fontSize:11, color:"#9CA3AF", fontWeight:600, marginTop:16, alignSelf:"flex-end" }}>
            {slide+1} / {MODULE_SLIDES.length}
          </p>
        </GlassCard>
      </div>

      {/* Senya + tip */}
      <div style={{ padding:"12px 16px 0", display:"flex", alignItems:"flex-end", gap:10 }}>
        <img src={senya_logo} alt="Senya" style={{
          width:64, height:64, objectFit:"contain",
          animation:"senyaBob 2.8s ease-in-out infinite", flexShrink:0,
        }} />
        <GlassCard style={{ flex:1, padding:"10px 14px", borderRadius:"14px 14px 14px 4px" }}>
          <div style={{ display:"flex", alignItems:"flex-start", gap:7 }}>
            <DynamicIcon iconName={tip.icon} size={14} color="#1848c8" />
            <p style={{ fontSize:12, color:"#0f3172", fontWeight:500, lineHeight:1.5, margin:0 }}>
              {tip.text}
            </p>
          </div>
        </GlassCard>
      </div>

      {/* Nav buttons */}
      <div style={{ padding:"14px 16px 0", display:"flex", gap:10 }}>
        {slide > 0 && (
          <Btn onClick={()=>setSlide(s=>s-1)} variant="ghost" style={{ flex:1, padding:"13px" }}>
            <Icon.ArrowLeft width={15} height={15} style={{ color:"#0f3172" }} /> Back
          </Btn>
        )}
        <Btn
          onClick={isLast ? onStart : ()=>setSlide(s=>s+1)}
          variant={isLast ? "gold" : "primary"}
          style={{ flex:2, padding:"14px" }}
        >
          {isLast ? (
            <>
              <Icon.Brain width={16} height={16} style={{ color:"#fff" }} />
              Start Quiz
            </>
          ) : (
            <>
              Next
              <Icon.ArrowRight width={15} height={15} style={{ color:"#fff" }} />
            </>
          )}
        </Btn>
      </div>
    </div>
  );
}

/* ══ SCREEN 2: QUIZ ════════════════════════════════════════════════════ */
function OptionCard({ option, index, isSelected, isRevealed, isCorrect, onClick }) {
  const [pressed, setPressed] = useState(false);
  const letter = String.fromCharCode(65+index);

  let cardBg="#rgba(255,255,255,0.62)", cardBorder="1px solid rgba(255,255,255,0.85)", textColor="#0f3172";
  let circleBg="rgba(15,49,114,0.08)", circleColor="#4b7bbb";
  if (isRevealed) {
    if (isCorrect) { cardBg="rgba(236,253,245,0.9)"; cardBorder="1.5px solid #6EE7B7"; textColor="#065F46"; circleBg="#10B981"; circleColor="#fff"; }
    else if (isSelected) { cardBg="rgba(254,242,242,0.9)"; cardBorder="1.5px solid #FCA5A5"; textColor="#991B1B"; circleBg="#EF4444"; circleColor="#fff"; }
    else { cardBg="rgba(255,255,255,0.35)"; textColor="#9CA3AF"; circleColor="#9CA3AF"; }
  } else if (isSelected) {
    cardBg="rgba(239,246,255,0.9)"; cardBorder="1.5px solid #93C5FD"; textColor="#1D4ED8"; circleBg="#2563EB"; circleColor="#fff";
  }

  return (
    <button onClick={onClick}
      onPointerDown={()=>setPressed(true)} onPointerUp={()=>setPressed(false)} onPointerLeave={()=>setPressed(false)}
      disabled={isRevealed}
      style={{ padding:"13px 16px", border:cardBorder, borderRadius:16, background:cardBg,
        backdropFilter:"blur(8px)", cursor:isRevealed?"default":"pointer",
        textAlign:"left", fontSize:14, fontWeight:600, color:textColor,
        transition:"all 0.2s ease", display:"flex", alignItems:"center", gap:12,
        transform:(!isRevealed&&pressed)?"scale(0.97)":"scale(1)",
        boxShadow:"0 2px 8px rgba(15,49,114,0.07)", width:"100%",
      }}
    >
      <div style={{ width:32, height:32, borderRadius:10, flexShrink:0,
        background:circleBg, display:"flex", alignItems:"center", justifyContent:"center",
        fontSize:13, fontWeight:800, color:circleColor, transition:"all 0.2s" }}>
        {isRevealed && isCorrect ? <Icon.Check width={16} height={16} style={{ color:"#fff" }} />
          : isRevealed && isSelected && !isCorrect ? <Icon.X width={16} height={16} style={{ color:"#fff" }} />
          : letter}
      </div>
      <span style={{ flex:1, lineHeight:1.4 }}>{option}</span>
    </button>
  );
}

function SenyaBubble({ revealed, isCorrect, feedback, phase }) {
  const [show, setShow] = useState(false);
  useEffect(() => {
    if (revealed) { const t=setTimeout(()=>setShow(true),120); return()=>clearTimeout(t); }
    setShow(false);
  }, [revealed, phase]);

  const bubbleBg     = !revealed?"rgba(255,255,255,0.75)":isCorrect?"rgba(236,253,245,0.88)":"rgba(254,242,242,0.88)";
  const bubbleBorder = !revealed?"rgba(255,255,255,0.9)":isCorrect?"#a7f3d0":"#fecaca";
  const textCol      = !revealed?"#0f3172":isCorrect?"#065f46":"#991b1b";
  const tailColor    = !revealed?"rgba(200,220,245,0.7)":isCorrect?"#a7f3d0":"#fecaca";

  return (
    <div style={{ display:"flex", alignItems:"flex-end", gap:10, padding:"0 16px" }}>
      <div style={{ flexShrink:0 }}>
        <img src={senya_teaching} alt="Senya" style={{
          width:100, height:100, objectFit:"contain",
          filter:"drop-shadow(0 5px 14px rgba(15,49,114,0.18))",
          animation: revealed
            ? isCorrect ? "senyaJump 0.5s cubic-bezier(0.34,1.5,0.64,1)"
                        : "senyaShake 0.4s ease"
            : "senyaBob 2.8s ease-in-out infinite",
        }} />
      </div>
      <div style={{ flex:1, position:"relative", background:bubbleBg,
        border:`1px solid ${bubbleBorder}`, borderRadius:"16px 16px 16px 4px",
        padding:"11px 14px", backdropFilter:"blur(8px)",
        boxShadow:"0 3px 14px rgba(15,49,114,0.10)", transition:"all 0.3s",
        animation:show?"fadeSlideUp 0.25s ease":undefined }}>
        <div style={{ position:"absolute", left:-7, bottom:12, width:0, height:0,
          borderTop:"7px solid transparent", borderBottom:"7px solid transparent",
          borderRight:`7px solid ${tailColor}` }} />
        <div style={{ position:"absolute", left:-5, bottom:13, width:0, height:0,
          borderTop:"6px solid transparent", borderBottom:"6px solid transparent",
          borderRight:`6px solid ${bubbleBg}` }} />
        <div style={{ display:"flex", alignItems:"flex-start", gap:7 }}>
          {revealed && isCorrect  && <Icon.Check width={15} height={15} style={{ color:"#10B981", flexShrink:0, marginTop:1 }} />}
          {revealed && !isCorrect && <Icon.X     width={15} height={15} style={{ color:"#EF4444", flexShrink:0, marginTop:1 }} />}
          <p style={{ fontSize:12.5, fontWeight:500, color:textCol, lineHeight:1.5, margin:0 }}>
            {revealed ? feedback : "Read carefully and pick the best answer!"}
          </p>
        </div>
      </div>
    </div>
  );
}

function QuizScreen({ onDone, nav }) {
  const [qi, setQi]         = useState(0);
  const [selected, setSel]  = useState(null);
  const [revealed, setRev]  = useState(false);
  const [score, setScore]   = useState(0);
  const [showAnim, setAnim] = useState(false);
  const [showExitConfirm, setShowExitConfirm] = useState(false);

  const q         = questions[qi];
  const isCorrect = selected === q.correct;

  const choose = (i) => {
    if (revealed) return;
    setSel(i); setRev(true);
    if (i===q.correct) setScore(s=>s+1);
  };

  const next = () => {
    if (qi < questions.length-1) { setQi(q=>q+1); setSel(null); setRev(false); }
    else setAnim(true);
  };

  const handleExit = () => {
    setShowExitConfirm(true);
  };

  const handleConfirmExit = () => {
    setShowExitConfirm(false);
    nav("dashboard");
  };

  return (
    <div style={{ position:"relative", minHeight:"100vh",
      background:"linear-gradient(180deg,#a8d4f5 0%,#c5e3f7 25%,#daeefb 55%,#eaf5fd 80%,#f0f8ff 100%)",
      display:"flex", flexDirection:"column", paddingBottom:28 }}>

      <ExitConfirmModal 
        isOpen={showExitConfirm}
        onClose={() => setShowExitConfirm(false)}
        onConfirm={handleConfirmExit}
      />

      {showAnim && (
        <TransitionAnim
          score={score} total={questions.length}
          label="You answered"
          onDone={()=>onDone(score)}
        />
      )}

      <TopBar nav={nav} showExit={true} onExitClick={handleExit} />

      {/* Progress */}
      <div style={{ padding:"14px 16px 0" }}>
        <GlassCard style={{ padding:"12px 16px" }}>
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:8 }}>
            <span style={{ fontSize:12, fontWeight:700, color:"#0f3172" }}>Question {qi+1} of {questions.length}</span>
            <div style={{ display:"flex", alignItems:"center", gap:4, background:"rgba(245,158,11,0.13)", borderRadius:99, padding:"4px 10px" }}>
              <Icon.Zap width={12} height={12} style={{ color:"#F59E0B" }} />
              <span style={{ fontSize:12, fontWeight:800, color:"#92400E" }}>{score*10} XP</span>
            </div>
          </div>
          <div style={{ display:"flex", gap:4 }}>
            {questions.map((_,i) => (
              <div key={i} style={{ flex:1, height:5, borderRadius:99,
                background: i<qi?"#22c55e":i===qi?"#2563EB":"rgba(15,49,114,0.10)",
                transition:"background 0.3s" }} />
            ))}
          </div>
        </GlassCard>
      </div>

      {/* Question */}
      <div style={{ padding:"12px 16px 0" }}>
        <GlassCard style={{ padding:"20px 18px", textAlign:"center" }}>
          <div style={{ width:110, height:110, borderRadius:20, margin:"0 auto 14px",
            background:"rgba(37,99,235,0.07)", border:"1.5px solid rgba(37,99,235,0.12)",
            display:"flex", alignItems:"center", justifyContent:"center", overflow:"hidden" }}>
            <img src={q.imageUrl} alt="FSL sign"
              style={{ width:"100%", height:"100%", objectFit:"contain" }}
              onError={e=>{ e.target.src="https://placehold.co/110x110/a8d4f5/0f3172?text=FSL"; }} />
          </div>
          <p style={{ fontSize:16, fontWeight:800, color:"#0f3172", lineHeight:1.4, margin:0 }}>{q.question}</p>
        </GlassCard>
      </div>

      {/* Options */}
      <div style={{ padding:"10px 16px 0", display:"flex", flexDirection:"column", gap:8 }}>
        {q.options.map((opt,i) => (
          <OptionCard key={`${qi}-${i}`} option={opt} index={i}
            isSelected={selected===i} isRevealed={revealed}
            isCorrect={i===q.correct} onClick={()=>choose(i)} />
        ))}
      </div>

      {/* Senya feedback */}
      <div style={{ padding:"14px 0 0" }}>
        <SenyaBubble revealed={revealed} isCorrect={isCorrect}
          feedback={revealed?(isCorrect?q.feedbackCorrect:q.feedbackWrong):""}
          phase={qi} />
      </div>

      {/* Next button */}
      {revealed && (
        <div style={{ padding:"12px 16px 0" }}>
          <Btn onClick={next} variant={isCorrect?"gold":"primary"}>
            {qi<questions.length-1?"Next Question":"See Results"}
            <Icon.ArrowRight width={16} height={16} style={{ color:"#fff" }} />
          </Btn>
        </div>
      )}
    </div>
  );
}

/* ══ SCREEN 3: RESULT WITH RANKINGS ═════════════════════════════════════ */
const ResultMsgs = [
  { icon:"Sparkle", text:"Incredible! You answered everything perfectly. You're a true SEÑAS star!" },
  { icon:"Award",   text:"Amazing work! You're really getting the hang of FSL signs." },
  { icon:"Target",  text:"Good effort! Review the ones you missed and try again!" },
  { icon:"Dumbbell",text:"Don't give up! Every mistake is a step toward mastery." },
];

function ResultScreen({ score, nav, onRetry }) {
  const total    = questions.length;
  const pct      = Math.round((score/total)*100);
  const xpEarned = score*10;
  const stars    = pct===100?3:pct>=80?2:pct>=50?1:0;
  const [stage, setStage] = useState(0);
  const [showExitConfirm, setShowExitConfirm] = useState(false);

  useEffect(()=>{
    const t1=setTimeout(()=>setStage(1),200);
    const t2=setTimeout(()=>setStage(2),600);
    return()=>{ clearTimeout(t1); clearTimeout(t2); };
  },[]);

  const { label, color } =
    pct===100?{ label:"Perfect Score!",  color:"#F59E0B" }:
    pct>=80  ?{ label:"Excellent!",      color:"#10B981" }:
    pct>=60  ?{ label:"Good Job!",       color:"#2563EB" }:
              { label:"Keep Practicing!",color:"#8B5CF6" };

  const msgIdx = pct===100?0:pct>=80?1:pct>=60?2:3;
  const msg    = ResultMsgs[msgIdx];
  const MsgIcon = Icon[msg.icon];

  // Get rank medal color
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
    nav("dashboard");
  };

  return (
    <div style={{
      minHeight:"100vh",
      background:"linear-gradient(160deg,#a8d4f5 0%,#c5e3f7 35%,#daeefb 65%,#f0f8ff 100%)",
      display:"flex", flexDirection:"column",
    }}>
      <ExitConfirmModal 
        isOpen={showExitConfirm}
        onClose={() => setShowExitConfirm(false)}
        onConfirm={handleConfirmExit}
      />
      <TopBar nav={nav} showExit={true} onExitClick={handleExit} />
      <div style={{ flex:1, display:"flex", alignItems:"center", justifyContent:"center", padding:20, position:"relative" }}>
        {stage>=1 && <Confetti count={36} />}

        <div style={{ maxWidth: 360, width: "100%" }}>
          {/* Result Card */}
          <GlassCard style={{ padding:"32px 24px", textAlign:"center", position:"relative", overflow:"hidden", marginBottom: 16 }}>

            <img src={senya_teaching} alt="Senya" style={{
              width:100, height:100, objectFit:"contain",
              filter:"drop-shadow(0 5px 16px rgba(15,49,114,0.18))",
              animation:stage>=1?"senyaJump 0.6s cubic-bezier(0.34,1.5,0.64,1)":"none",
              marginBottom:4,
            }} />

            <div style={{ animation:stage>=2?"trophyBounce 0.7s cubic-bezier(0.34,1.2,0.64,1) 0.2s both":"none", marginBottom:8 }}>
              <Icon.Trophy width={48} height={48} style={{ color:"#fbbf24" }} />
            </div>

            <div style={{ display:"flex", justifyContent:"center", gap:6, marginBottom:10 }}>
              {[0,1,2].map(i=>(
                <div key={i} style={{ animation:i<stars?`starPop 0.4s cubic-bezier(0.34,1.4,0.64,1) ${0.3+i*0.12}s both`:"none" }}>
                  <Icon.Star width={28} height={28} style={{ fill:i<stars?"#fbbf24":"#E5E7EB", stroke:i<stars?"#F59E0B":"#E5E7EB" }} />
                </div>
              ))}
            </div>

            <h2 style={{ fontSize:24, fontWeight:800, color, marginBottom:4, fontFamily:"var(--font-head)" }}>{label}</h2>

            <div style={{ display:"flex", alignItems:"center", margin:"16px 0", background:"rgba(15,49,114,0.05)", borderRadius:16, overflow:"hidden" }}>
              {[
                { val:pct+"%",    sub:"Accuracy" },
                { val:`${score}/${total}`, sub:"Correct"  },
                { val:xpEarned,   sub:"XP earned", color:"#F59E0B" },
              ].map((s,i)=>(
                <div key={i} style={{ flex:1, padding:"14px 8px", textAlign:"center", borderRight:i<2?"1px solid rgba(15,49,114,0.08)":"none" }}>
                  <p style={{ fontSize:28, fontWeight:900, color:s.color||"#0f3172", lineHeight:1 }}>{s.val}</p>
                  <p style={{ fontSize:11, color:"#4b7bbb", fontWeight:600, marginTop:2 }}>{s.sub}</p>
                </div>
              ))}
            </div>

            <div style={{ background:"rgba(15,49,114,0.05)", borderRadius:14, padding:"12px 14px", marginBottom:0, textAlign:"left", display:"flex", gap:10, alignItems:"flex-start" }}>
              <img src={senya_logo} alt="Senya" style={{ width:36, height:36, objectFit:"contain", flexShrink:0 }} />
              <div style={{ flex:1 }}>
                <div style={{ display:"flex", alignItems:"center", gap:5, marginBottom:4 }}>
                  {MsgIcon && <MsgIcon width={13} height={13} style={{ color:color, flexShrink:0 }} />}
                  <p style={{ fontSize:12.5, color:"#0f3172", lineHeight:1.55, margin:0, fontWeight:500 }}>{msg.text}</p>
                </div>
              </div>
            </div>

            <div style={{ display:"flex", gap:10, marginTop: 20 }}>
              <Btn onClick={()=>nav("dashboard")} variant="ghost" style={{ flex:1, padding:"13px" }}>
                <Icon.Home width={15} height={15} style={{ color:"#0f3172" }} /> Home
              </Btn>
              <Btn onClick={onRetry} variant="primary" style={{ flex:1.4, padding:"13px" }}>
                <Icon.Refresh width={15} height={15} style={{ color:"#fff" }} /> Try Again
              </Btn>
            </div>
          </GlassCard>

          {/* Rankings Section */}
          <GlassCard style={{ padding:"20px 20px", marginBottom: 20 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
              <Icon.Award width={20} height={20} style={{ color: "#F59E0B" }} />
              <h3 style={{ fontSize: 16, fontWeight: 800, color: "#0f3172", margin: 0 }}>Class Rankings</h3>
              <span style={{ fontSize: 10, fontWeight: 600, color: "#4b7bbb", background: "rgba(15,49,114,0.08)", borderRadius: 99, padding: "3px 8px", marginLeft: "auto" }}>
                Top 10
              </span>
            </div>

            {/* Table header */}
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

            {/* Rankings list */}
            <div>
              {STUDENT_RANKINGS.map((student) => (
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
                    {student.score}
                    <span style={{ fontSize: 9, color: "#9CA3AF", marginLeft: 2 }}>pts</span>
                  </div>
                </div>
              ))}
            </div>

            {/* User's rank highlight */}
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

/* ══ ROOT CONTROLLER ═══════════════════════════════════════════════════ */
export default function QuizMC({ nav }) {
  const [screen, setScreen] = useState("module");
  const [finalScore, setFinalScore] = useState(0);

  const handleQuizDone = (score) => {
    setFinalScore(score);
    setTimeout(() => setScreen("result"), 50);
  };

  if (screen === "module") return <ModuleScreen nav={nav} onStart={()=>setScreen("quiz")} />;
  if (screen === "quiz")   return <QuizScreen nav={nav} onDone={handleQuizDone} />;
  if (screen === "result") return <ResultScreen score={finalScore} nav={nav} onRetry={()=>setScreen("module")} />;
  return null;
}

/* ── Keyframes ── */
const _s = document.createElement("style");
_s.id = "quizmc-styles";
_s.textContent = `
  @keyframes senyaBob     { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-6px)} }
  @keyframes senyaJump    { 0%{transform:scale(0) rotate(-15deg);opacity:0} 70%{transform:scale(1.1) rotate(4deg)} 100%{transform:scale(1) rotate(0);opacity:1} }
  @keyframes senyaShake   { 0%,100%{transform:translateX(0)} 25%{transform:translateX(-5px)} 75%{transform:translateX(5px)} }
  @keyframes senyaBounce  { 0%{transform:translateY(0) scale(1)} 100%{transform:translateY(-10px) scale(1.04)} }
  @keyframes senyaPop     { 0%{transform:scale(0) rotate(-15deg);opacity:0} 70%{transform:scale(1.1) rotate(4deg)} 100%{transform:scale(1) rotate(0);opacity:1} }
  @keyframes fadeSlideUp  { 0%{transform:translateY(8px);opacity:0} 100%{transform:translateY(0);opacity:1} }
  @keyframes fadeUp       { 0%{transform:translateY(14px);opacity:0} 100%{transform:translateY(0);opacity:1} }
  @keyframes countUp      { 0%{transform:scale(0.5) translateY(20px);opacity:0} 100%{transform:scale(1) translateY(0);opacity:1} }
  @keyframes trophyBounce { 0%{transform:translateY(0)} 35%{transform:translateY(-14px)} 65%{transform:translateY(-6px)} 100%{transform:translateY(0)} }
  @keyframes starPop      { 0%{transform:scale(0) rotate(-30deg);opacity:0} 100%{transform:scale(1) rotate(0);opacity:1} }
  @keyframes confettiBurst{ 0%{transform:translate(0,0) rotate(0deg);opacity:1} 100%{transform:translate(var(--dx),var(--dy)) rotate(540deg);opacity:0} }
  @keyframes floatUp      { 0%,100%{transform:translateY(0);opacity:0.5} 50%{transform:translateY(-20px);opacity:0.8} }
  @keyframes modalPopIn {
    from { opacity: 0; transform: translate(-50%, -50%) scale(0.9); }
    to { opacity: 1; transform: translate(-50%, -50%) scale(1); }
  }
`;
if (!document.head.querySelector("#quizmc-styles")) document.head.appendChild(_s);