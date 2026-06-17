import { useState } from "react";
import { senya_logo, senya_teaching, senya_blue, senya_magnify } from "./images";

const tips = [
  {
    img: senya_logo,
    title: "Hi, I'm Senya!",
    body: "I'm your friendly guide on this FSL learning journey. I'll be right here whenever you need help!",
    color: "#3B82F6",
    iconImg: "/public/img/greet.png"
  },
  {
    img: senya_teaching,
    title: "Watch & Learn",
    body: "Each lesson shows you how a sign looks. Watch carefully, then try it yourself!",
    color: "#F59E0B",
    iconImg: "/public/img/lesson.png"
  },
  {
    img: senya_magnify,
    title: "Practice Makes Perfect",
    body: "Use the camera to practice your signs and get real-time feedback. Don't worry, you got this!",
    color: "#10B981",
    iconImg: "/public/img/camera.png"
  },
  {
    img: senya_blue,
    title: "Earn Badges!",
    body: "Complete lessons and quizzes to earn XP and unlock badges. Every sign learned is a victory!",
    color: "#8B5CF6",
    iconImg: "/public/img/badges.png"
  },
];

function GlassCard({ children, style }) {
  return (
    <div style={{
      background: "rgba(255,255,255,0.75)",
      border: "1px solid rgba(255,255,255,0.9)",
      borderRadius: 28,
      backdropFilter: "blur(12px)",
      boxShadow: "0 8px 32px rgba(0,0,0,0.08)",
      ...style,
    }}>
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

export default function Tutorial({ nav }) {
  const [step, setStep] = useState(0);
  const [show, setShow] = useState(true);
  const tip = tips[step];

  if (!show) {
    return (
      <div className="screen" style={{
        background: "linear-gradient(180deg, #a8d4f5 0%, #c5e3f7 25%, #daeefb 55%, #eaf5fd 80%, #f0f8ff 100%)",
        minHeight: "100vh",
        paddingBottom: 40,
      }}>
        <div style={{ padding: "52px 24px 0" }}>
          <PressableButton onClick={() => nav("dashboard")} style={{
            display: "flex", alignItems: "center", gap: 8,
            background: "rgba(255,255,255,0.9)",
            backdropFilter: "blur(8px)",
            border: "1px solid rgba(255,255,255,0.85)",
            borderRadius: 16,
            padding: "10px 16px",
            fontSize: 14,
            fontWeight: 600,
            color: "#0f3172",
            width: "auto",
          }}>
            ← Back to Dashboard
          </PressableButton>
          <h2 style={{
            fontFamily: "var(--font-head)",
            fontSize: 24,
            fontWeight: 800,
            color: "#0f3172",
            marginTop: 24,
            marginBottom: 4,
          }}>Senya's Tips</h2>
          <p style={{ color: "#4b7bbb", fontSize: 14, fontWeight: 500, marginBottom: 20 }}>
            Tap a tip to learn more from your guide.
          </p>
        </div>

        <div style={{ padding: "0 16px", display: "flex", flexDirection: "column", gap: 12 }}>
          {tips.map((t, i) => (
            <PressableButton
              key={i}
              onClick={() => { setStep(i); setShow(true); }}
              style={{
                display: "flex", alignItems: "center", gap: 14,
                background: "rgba(255,255,255,0.9)",
                backdropFilter: "blur(8px)",
                border: "1px solid rgba(255,255,255,0.85)",
                borderRadius: 20,
                padding: 16,
                width: "100%",
                textAlign: "left",
              }}
            >
              <div style={{
                width: 56, height: 56, borderRadius: 18,
                background: `${t.color}15`,
                display: "flex", alignItems: "center", justifyContent: "center",
                flexShrink: 0,
              }}>
                <img src={t.iconImg} alt="" style={{
                  width: 32, height: 32, objectFit: "contain",
                }} />
              </div>
              <div style={{ flex: 1, textAlign: "left" }}>
                <p style={{
                  fontFamily: "var(--font-head)",
                  fontSize: 16,
                  fontWeight: 800,
                  color: "#0f3172",
                  marginBottom: 2,
                }}>{t.title}</p>
                <p style={{ fontSize: 12, color: "#6B7280", marginTop: 2 }}>Tap to view tip</p>
              </div>
              <span style={{ color: "#9CA3AF", fontSize: 20 }}>›</span>
            </PressableButton>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="screen" style={{
      background: `linear-gradient(160deg, ${tip.color}12 0%, #a8d4f5 40%, #c5e3f7 70%, #daeefb 100%)`,
      minHeight: "100vh",
      position: "relative",
      display: "flex",
      flexDirection: "column",
    }}>
      {/* Skip Button */}
      <div style={{ padding: "52px 20px 0", display: "flex", justifyContent: "flex-end" }}>
        <PressableButton
          onClick={() => setShow(false)}
          style={{
            background: "rgba(255,255,255,0.7)",
            backdropFilter: "blur(8px)",
            border: "1px solid rgba(255,255,255,0.85)",
            borderRadius: 20,
            padding: "8px 18px",
            fontSize: 13,
            fontWeight: 600,
            color: "#4b7bbb",
          }}
        >
          All Tips ↗
        </PressableButton>
      </div>

      {/* Big Senya Image */}
      <div style={{ display: "flex", justifyContent: "center", padding: "20px 0 16px" }}>
        <div style={{
          width: 200,
          height: 200,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${tip.color}20 0%, ${tip.color}08 70%)`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: `0 12px 40px ${tip.color}25`,
          animation: "pulseGlow 2s ease-in-out infinite",
        }}>
          <img src={tip.img} alt="Senya" style={{
            width: 170,
            height: 170,
            objectFit: "contain",
            filter: "drop-shadow(0 8px 16px rgba(0,0,0,0.15))",
            animation: "senya-bob 2.5s ease-in-out infinite",
          }} />
        </div>
      </div>

      {/* Speech Bubble Card */}
      <div style={{ padding: "0 20px", flex: 1 }}>
        <GlassCard style={{
          padding: "28px 24px",
          position: "relative",
          marginBottom: 20,
        }}>
          {/* Speech bubble tail */}
          <div style={{
            position: "absolute", top: -12, left: "50%", transform: "translateX(-50%)",
            width: 24, height: 12, overflow: "hidden",
          }}>
            <div style={{
              width: 16, height: 16, background: "rgba(255,255,255,0.75)",
              transform: "rotate(45deg)", marginTop: -8, marginLeft: 4,
              border: "1px solid rgba(255,255,255,0.9)",
              borderTop: "none",
              borderLeft: "none",
            }} />
          </div>

          {/* Icon and Title */}
          <div style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            marginBottom: 16,
          }}>
            <div style={{
              width: 48,
              height: 48,
              borderRadius: 16,
              background: `${tip.color}15`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}>
              <img src={tip.iconImg} alt="" style={{
                width: 28,
                height: 28,
                objectFit: "contain",
              }} />
            </div>
            <h2 style={{
              fontFamily: "var(--font-head)",
              fontSize: 24,
              fontWeight: 800,
              color: "#0f3172",
              margin: 0,
            }}>
              {tip.title}
            </h2>
          </div>

          {/* Body Text */}
          <p style={{
            fontSize: 15,
            color: "#334155",
            lineHeight: 1.7,
            fontWeight: 500,
            margin: 0,
          }}>
            {tip.body}
          </p>

          {/* Progress Dots */}
          <div style={{
            display: "flex",
            justifyContent: "center",
            gap: 10,
            marginTop: 24,
          }}>
            {tips.map((_, i) => (
              <div
                key={i}
                onClick={() => setStep(i)}
                style={{
                  width: i === step ? 28 : 8,
                  height: 8,
                  borderRadius: 4,
                  background: i === step ? tip.color : "rgba(15,49,114,0.2)",
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                }}
              />
            ))}
          </div>
        </GlassCard>
      </div>

      {/* Navigation Buttons */}
      <div style={{ padding: "0 20px 40px", display: "flex", gap: 12 }}>
        {step > 0 && (
          <PressableButton
            onClick={() => setStep(step - 1)}
            style={{
              flex: 1,
              padding: "14px",
              borderRadius: 60,
              background: "rgba(255,255,255,0.7)",
              backdropFilter: "blur(8px)",
              border: "1px solid rgba(255,255,255,0.85)",
              fontSize: 15,
              fontWeight: 600,
              color: "#0f3172",
            }}
          >
            ← Back
          </PressableButton>
        )}
        <PressableButton
          onClick={() => {
            if (step < tips.length - 1) setStep(step + 1);
            else nav("dashboard");
          }}
          style={{
            flex: step > 0 ? 2 : 1,
            padding: "14px",
            borderRadius: 60,
            background: `linear-gradient(135deg, ${tip.color}, ${darken(tip.color)})`,
            color: "#fff",
            fontSize: 15,
            fontWeight: 600,
            border: "none",
            boxShadow: `0 6px 20px ${tip.color}40`,
          }}
        >
          {step < tips.length - 1 ? "Got it! Next →" : "Start Learning →"}
        </PressableButton>
      </div>

      <style>{`
        @keyframes senya-bob {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }
        @keyframes pulseGlow {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.85; }
        }
      `}</style>
    </div>
  );
}

function darken(hex) {
  const colors = {
    "#3B82F6": "#1D4ED8",
    "#F59E0B": "#B45309",
    "#10B981": "#047857",
    "#8B5CF6": "#6D28D9"
  };
  return colors[hex] || "#1D4ED8";
}