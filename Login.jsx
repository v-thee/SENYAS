import { useState } from "react";
import { senya_logo } from "./images";

// Local icon replacements (small, self-contained SVGs)
function Mail({ size = 18, color = "currentColor" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5">
      <path d="M3 7v10a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V7" />
      <path d="M21 7l-9 6L3 7" />
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

export default function Login({ nav, setUser }) {
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");

  const handle = () => {
    if (setUser) setUser(u => ({ ...u, name: "Student" }));
    nav("assessment");
  };

  return (
    <div className="screen" style={{
      background: "#F0F4F8",
      minHeight: "100vh",
      position: "relative"
    }}>
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
                  Did your teacher give you a code?
                </p>
                <p style={{
                  margin: "4px 0 0",
                  fontSize: 12,
                  color: "#9B6A1A",
                  lineHeight: 1.4
                }}>
                  Use your special email and password from class to sign in! ✨
                </p>
              </div>
            </div>

            {/* Input fields */}
            <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
              <Field 
                label="Email" 
                value={email} 
                onChange={setEmail}
                placeholder="your@email.com" 
                type="email" 
                icon={<Mail size={18} />}
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
          // Focus the input when clicking anywhere in the container
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