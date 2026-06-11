import { useState } from "react";
import { senya_logo } from "./images";

// Local icon replacements (small, self-contained SVGs)
function IdCard({ size = 18, color = "currentColor" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5">
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="M8 10h8" />
      <path d="M8 14h5" />
      <circle cx="16" cy="14" r="2" />
    </svg>
  );
}

function Lock({ size = 18, color = "currentColor" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5">
      <rect x="3" y="11" width="18" height="10" rx="2" />
      <path d="M7 11V8a5 5 0 0 1 10 0v3" />
    </svg>
  );
}

function GraduationCap({ size = 20, color = "currentColor" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5">
      <path d="M12 2L1 7l11 5 9-4.09V17" />
      <path d="M21 7v6" />
      <path d="M7 21h10" />
    </svg>
  );
}

function ChevronRight({ size = 18, color = "currentColor" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="9 18 15 12 9 6" />
    </svg>
  );
}

// PressableButton component for the modal
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
          Exit Login?
        </h3>
        <p style={{
          fontSize: 13, color: "#6B7280", fontWeight: 500,
          lineHeight: 1.55, marginBottom: 24,
        }}>
          You'll need to sign in again to continue your learning journey.
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

export default function Login({ nav, setUser }) {
  const [lrn, setLrn] = useState("");
  const [pw, setPw] = useState("");
  const [showExitConfirm, setShowExitConfirm] = useState(false);

  const handle = () => {
    if (setUser) setUser(u => ({ ...u, name: "Student" }));
    nav("assessment");
  };

  const handleExit = () => {
    setShowExitConfirm(true);
  };

  return (
    <div className="screen" style={{
      background: "#F0F4F8",
      minHeight: "100vh",
      position: "relative"
    }}>
      {/* Exit Confirmation Modal */}
      <ExitConfirmModal 
        isOpen={showExitConfirm}
        onClose={() => setShowExitConfirm(false)}
        onConfirm={() => {
          setShowExitConfirm(false);
          nav("onboarding");
        }}
      />

      {/* Minimalist subtle gradient overlay */}
      <div style={{
        position: "absolute",
        inset: 0,
        background: "radial-gradient(circle at 20% 80%, rgba(30, 79, 138, 0.03) 0%, rgba(255,255,255,0) 70%)",
        pointerEvents: "none"
      }} />

      {/* Content */}
      <div style={{ position: "relative", zIndex: 2 }}>
        {/* Header: Logo & Title */}
        <div style={{
          padding: "40px 24px 20px 24px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 4
        }}>
          <div style={{
            background: "rgba(30, 79, 138, 0.08)",
            borderRadius: 60,
            padding: 12,
            marginBottom: 8
          }}>
            <img src={senya_logo} alt="Senya" style={{
              width: 64,
              height: 64,
              objectFit: "contain"
            }} />
          </div>
          <h1 style={{
            fontFamily: "var(--font-head)",
            fontSize: 32,
            fontWeight: 800,
            letterSpacing: -0.5,
            color: "#1A2C3E",
            marginTop: 8,
            marginBottom: 0
          }}>
            SEÑAS
          </h1>
          <p style={{
            fontSize: 12,
            color: "#6B7C8E",
            fontWeight: 500,
            marginTop: 2
          }}>
            Filipino Sign Language Learning
          </p>
        </div>

        {/* Main card */}
        <div style={{ padding: "20px 20px 32px" }}>
          <div style={{
            background: "#FFFFFF",
            borderRadius: 32,
            padding: "28px 24px",
            boxShadow: "0 4px 20px rgba(0,0,0,0.04), 0 1px 2px rgba(0,0,0,0.03)",
            border: "1px solid #E8EDF2"
          }}>
            {/* Friendly teacher note card */}
            <div style={{
              background: "#FFF8ED",
              borderRadius: 20,
              padding: "14px 18px",
              marginBottom: 28,
              border: "1px solid #FFE8CC",
              display: "flex",
              alignItems: "center",
              gap: 12
            }}>
              <div style={{
                background: "rgba(255, 200, 100, 0.15)",
                borderRadius: 40,
                padding: 8,
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
              }}>
                <GraduationCap size={22} color="#D4891A" />
              </div>
              <div>
                <p style={{
                  margin: 0,
                  fontSize: 13,
                  fontWeight: 600,
                  color: "#C47A1A"
                }}>
                  Need your LRN?
                </p>
                <p style={{
                  margin: "4px 0 0",
                  fontSize: 12,
                  color: "#9B6A1A",
                  lineHeight: 1.4
                }}>
                  Your Learner Reference Number (LRN) is provided by your teacher. Ask them if you need help! ✨
                </p>
              </div>
            </div>

            {/* Input fields */}
            <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
              <Field 
                label="Learner Reference Number (LRN)" 
                value={lrn} 
                onChange={setLrn}
                placeholder="Enter your LRN (e.g.: 121544140011)" 
                type="text" 
                icon={<IdCard size={13} />}
              />
              <Field 
                label="Password" 
                value={pw} 
                onChange={setPw}
                placeholder="••••••••" 
                type="password" 
                icon={<Lock size={18} />}
              />

              <div style={{ textAlign: "right", marginTop: -4 }}>
                <button style={{
                  background: "none",
                  border: "none",
                  color: "#1E4F8A",
                  fontSize: 12,
                  fontWeight: 600,
                  cursor: "pointer",
                  fontFamily: "var(--font-body)"
                }}>
                  Forgot password? Ask your teacher 🧑‍🏫
                </button>
              </div>
            </div>

            {/* Primary CTA */}
            <button
              onClick={handle}
              style={{
                marginTop: 28,
                background: "#1E4F8A",
                padding: "14px 0",
                borderRadius: 60,
                fontWeight: 700,
                fontSize: 16,
                color: "white",
                border: "none",
                width: "100%",
                cursor: "pointer",
                fontFamily: "var(--font-body)",
                transition: "all 0.2s",
                boxShadow: "0 2px 8px rgba(30,79,138,0.2)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 8
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background = "#0F3D69";
                e.currentTarget.style.transform = "scale(1.01)";
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = "#1E4F8A";
                e.currentTarget.style.transform = "scale(1)";
              }}
            >
              Sign in
              <ChevronRight size={18} />
            </button>
          </div>

          <p style={{
            textAlign: "center",
            marginTop: 24,
            fontSize: 11,
            color: "#8A9AAA",
            lineHeight: 1.5
          }}>
            By signing in, you agree to our{" "}
            <span style={{ color: "#1E4F8A", fontWeight: 600, cursor: "pointer" }}>Terms</span> and{" "}
            <span style={{ color: "#1E4F8A", fontWeight: 600, cursor: "pointer" }}>Privacy Policy</span>
          </p>
        </div>
      </div>

      <style>{`
        @keyframes modalPopIn {
          from {
            opacity: 0;
            transform: translate(-50%, -50%) scale(0.9);
          }
          to {
            opacity: 1;
            transform: translate(-50%, -50%) scale(1);
          }
        }
      `}</style>
    </div>
  );
}

function Field({ label, value, onChange, placeholder, type, icon }) {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div>
      <label style={{
        fontSize: 12,
        fontWeight: 600,
        color: "#4A5C6E",
        marginBottom: 6,
        display: "block",
        letterSpacing: 0.3
      }}>
        {label}
      </label>
      <div 
        style={{ 
          position: "relative",
          cursor: "text"
        }}
        onClick={(e) => {
          const input = e.currentTarget.querySelector('input');
          if (input) input.focus();
        }}
      >
        <div style={{
          position: "absolute",
          left: 16,
          top: "50%",
          transform: "translateY(-50%)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: isFocused ? "#1E4F8A" : "#9AABB8",
          transition: "color 0.15s",
          pointerEvents: "none",
          zIndex: 1
        }}>
          {icon}
        </div>
        <input
          type={type}
          value={value}
          onChange={e => onChange(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder={placeholder}
          style={{
            width: "100%",
            padding: "14px 14px 14px 44px",
            border: `1.5px solid ${isFocused ? "#1E4F8A" : "#DFE5EC"}`,
            borderRadius: 60,
            fontSize: 14,
            fontFamily: "var(--font-body)",
            color: "#1A2C3E",
            background: "#FFFFFF",
            outline: "none",
            transition: "all 0.15s",
            boxShadow: isFocused ? "0 0 0 3px rgba(30,79,138,0.1)" : "none"
          }}
        />
      </div>
    </div>
  );
}