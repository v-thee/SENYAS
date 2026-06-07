import { useState } from "react";
import { senya_blue, senya_teaching, senya_logo } from "./images";

const slides = [
  {
    img: senya_logo,
    title: "Welcome to SEÑAS!",
    subtitle: "Your friendly Filipino Sign Language learning companion",
    accent: "#3B82F6",
    bg: "linear-gradient(160deg, #EFF6FF 0%, #DBEAFE 100%)",
  },
  {
    img: senya_teaching,
    title: "Learn at Your Own Pace",
    subtitle: "Watch, practice, and master FSL with interactive lessons and real-time feedback",
    accent: "#F59E0B",
    bg: "linear-gradient(160deg, #FFFBEB 0%, #FEF3C7 100%)",
  },
  {
    img: senya_blue,
    title: "Earn Badges & Grow!",
    subtitle: "Track your progress, collect achievements, and celebrate every milestone",
    accent: "#10B981",
    bg: "linear-gradient(160deg, #ECFDF5 0%, #D1FAE5 100%)",
  },
];

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
          Skip Onboarding?
        </h3>
        <p style={{
          fontSize: 13, color: "#6B7280", fontWeight: 500,
          lineHeight: 1.55, marginBottom: 24,
        }}>
          You'll miss the introduction to SEÑAS. You can always view tips later in the app.
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
            Skip
          </PressableButton>
        </div>
      </div>
    </>
  );
}

export default function Onboarding({ nav }) {
  const [idx, setIdx] = useState(0);
  const [showSkipConfirm, setShowSkipConfirm] = useState(false);
  const slide = slides[idx];

  const next = () => {
    if (idx < slides.length - 1) setIdx(idx + 1);
    else nav("login");
  };

  const handleSkip = () => {
    setShowSkipConfirm(true);
  };

  const handleConfirmSkip = () => {
    setShowSkipConfirm(false);
    nav("login");
  };

  return (
    <div className="screen" style={{ background: slide.bg, transition: "background 0.5s" }}>
      {/* Exit Confirmation Modal */}
      <ExitConfirmModal 
        isOpen={showSkipConfirm}
        onClose={() => setShowSkipConfirm(false)}
        onConfirm={handleConfirmSkip}
      />

      {/* Skip */}
      <div style={{ display: "flex", justifyContent: "flex-end", padding: "52px 24px 0" }}>
        <button
          onClick={handleSkip}
          style={{ background: "rgba(0,0,0,0.06)", border: "none", borderRadius: 20,
            padding: "6px 16px", fontSize: 13, fontWeight: 600, color: "#6B7280",
            fontFamily: "var(--font-body)", cursor: "pointer" }}
        >Skip</button>
      </div>

      {/* Mascot */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center",
        justifyContent: "center", padding: "0 32px", gap: 24 }}>
        <div style={{ position: "relative" }}>
          <div style={{
            width: 200, height: 200, borderRadius: "50%",
            background: "rgba(255,255,255,0.5)", backdropFilter: "blur(8px)",
            display: "flex", alignItems: "center", justifyContent: "center",
            boxShadow: "0 8px 32px rgba(0,0,0,0.08)"
          }}>
            <img src={slide.img} alt="Senya" style={{
              width: 180, height: 180, objectFit: "contain",
              animation: "senya-bob 2.5s ease-in-out infinite"
            }} />
          </div>
        </div>

        <div style={{ textAlign: "center", animation: "fadeIn 0.4s ease" }} key={idx}>
          <h1 style={{
            fontFamily: "var(--font-head)", fontSize: 28, fontWeight: 800,
            color: "#111827", marginBottom: 12, lineHeight: 1.2
          }}>{slide.title}</h1>
          <p style={{ fontSize: 15, color: "#4B5563", lineHeight: 1.6, fontWeight: 500 }}>
            {slide.subtitle}
          </p>
        </div>

        {/* Dots */}
        <div style={{ display: "flex", gap: 8, marginTop: 8 }}>
          {slides.map((_, i) => (
            <div key={i} onClick={() => setIdx(i)} style={{
              width: i === idx ? 24 : 8, height: 8,
              borderRadius: 4, cursor: "pointer",
              background: i === idx ? slide.accent : "#D1D5DB",
              transition: "all 0.3s"
            }} />
          ))}
        </div>
      </div>

      {/* CTA */}
      <div style={{ padding: "0 24px 48px" }}>
        <button className="btn-primary" onClick={next}
          style={{ background: `linear-gradient(135deg, ${slide.accent}, ${shade(slide.accent)})` }}>
          {idx < slides.length - 1 ? "Next →" : "Get Started!"}
        </button>
        {idx === 0 && (
          <button className="btn-ghost" onClick={handleSkip}
            style={{ marginTop: 12 }}>
            I already have an account
          </button>
        )}
      </div>

      <style>{`
        @keyframes senya-bob {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-6px); }
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes modalPopIn {
          from { opacity: 0; transform: translate(-50%, -50%) scale(0.9); }
          to { opacity: 1; transform: translate(-50%, -50%) scale(1); }
        }
      `}</style>
    </div>
  );
}

function shade(hex) {
  // Simple darkening
  const map = { "#3B82F6": "#1D4ED8", "#F59E0B": "#B45309", "#10B981": "#047857" };
  return map[hex] || "#1D4ED8";
}