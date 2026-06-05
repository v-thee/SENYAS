import { useState } from "react";
import { senya_logo } from "./images";

export default function Login({ nav, setUser }) {
  const [mode, setMode] = useState("login");
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const [name, setName] = useState("");

  const handle = () => {
    if (setUser && name) setUser(u => ({ ...u, name }));
    nav("assessment");
  };

  return (
    <div className="screen" style={{
      background: "linear-gradient(180deg, #EFF6FF 0%, #F9FAFB 40%)"
    }}>
      {/* Header art */}
      <div style={{
        padding: "48px 0 0", display: "flex", flexDirection: "column",
        alignItems: "center", gap: 8
      }}>
        <img src={senya_logo} alt="Senya" style={{
          width: 90, height: 90, objectFit: "contain",
          filter: "drop-shadow(0 4px 8px rgba(0,0,0,0.12))",
          animation: "senya-bob 2.5s ease-in-out infinite"
        }} />
        <div style={{ textAlign: "center" }}>
          <h1 style={{ fontFamily: "var(--font-head)", fontSize: 26, fontWeight: 800, color: "#111827" }}>
            SEÑAS
          </h1>
          <p style={{ fontSize: 13, color: "#6B7280", fontWeight: 500 }}>Filipino Sign Language Learning</p>
        </div>
      </div>

      {/* Card */}
      <div style={{ flex: 1, padding: "24px 24px 48px" }}>
        <div className="card" style={{ padding: 24 }}>
          {/* Tab */}
          <div style={{
            display: "flex", background: "#F3F4F6", borderRadius: 12,
            padding: 4, marginBottom: 24
          }}>
            {["login", "signup"].map(m => (
              <button key={m} onClick={() => setMode(m)} style={{
                flex: 1, padding: "10px 0", border: "none",
                borderRadius: 10, cursor: "pointer",
                fontFamily: "var(--font-body)", fontSize: 14, fontWeight: 700,
                background: mode === m ? "#fff" : "transparent",
                color: mode === m ? "#1D4ED8" : "#6B7280",
                boxShadow: mode === m ? "0 2px 6px rgba(0,0,0,0.08)" : "none",
                transition: "all 0.2s"
              }}>
                {m === "login" ? "Sign In" : "Sign Up"}
              </button>
            ))}
          </div>

          {/* Fields */}
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {mode === "signup" && (
              <Field label="Full Name" value={name} onChange={setName}
                placeholder="e.g. Maria Santos" type="text" icon="👤" />
            )}
            <Field label="Email" value={email} onChange={setEmail}
              placeholder="your@email.com" type="email" icon="✉️" />
            <Field label="Password" value={pw} onChange={setPw}
              placeholder="••••••••" type="password" icon="🔒" />

            {mode === "login" && (
              <div style={{ textAlign: "right" }}>
                <button style={{ background: "none", border: "none", color: "#3B82F6",
                  fontSize: 13, fontWeight: 600, cursor: "pointer", fontFamily: "var(--font-body)" }}>
                  Forgot password?
                </button>
              </div>
            )}
          </div>

          <button className="btn-primary" style={{ marginTop: 24 }} onClick={handle}>
            {mode === "login" ? "Sign In" : "Create Account"}
          </button>

          {/* Divider */}
          <div style={{ display: "flex", alignItems: "center", gap: 12, margin: "20px 0" }}>
            <div style={{ flex: 1, height: 1, background: "#E5E7EB" }} />
            <span style={{ fontSize: 12, color: "#9CA3AF", fontWeight: 600 }}>or continue with</span>
            <div style={{ flex: 1, height: 1, background: "#E5E7EB" }} />
          </div>

          <div style={{ display: "flex", gap: 12 }}>
            {["Google", "Facebook"].map(p => (
              <button key={p} style={{
                flex: 1, padding: "12px 0", border: "1.5px solid #E5E7EB",
                borderRadius: 12, background: "#fff", cursor: "pointer",
                fontSize: 13, fontWeight: 700, color: "#374151",
                fontFamily: "var(--font-body)", transition: "all 0.15s"
              }}>{p === "Google" ? "🔵 " : "🔷 "}{p}</button>
            ))}
          </div>
        </div>

        <p style={{ textAlign: "center", marginTop: 20, fontSize: 12, color: "#9CA3AF", lineHeight: 1.6 }}>
          By signing up, you agree to our{" "}
          <span style={{ color: "#3B82F6", fontWeight: 600 }}>Terms of Service</span> and{" "}
          <span style={{ color: "#3B82F6", fontWeight: 600 }}>Privacy Policy</span>
        </p>
      </div>
    </div>
  );
}

function Field({ label, value, onChange, placeholder, type, icon }) {
  return (
    <div>
      <label style={{ fontSize: 12, fontWeight: 700, color: "#374151",
        marginBottom: 6, display: "block" }}>{label}</label>
      <div style={{ position: "relative" }}>
        <span style={{ position: "absolute", left: 14, top: "50%",
          transform: "translateY(-50%)", fontSize: 16 }}>{icon}</span>
        <input
          type={type} value={value} onChange={e => onChange(e.target.value)}
          placeholder={placeholder}
          style={{
            width: "100%", padding: "13px 14px 13px 42px",
            border: "1.5px solid #E5E7EB", borderRadius: 12,
            fontSize: 15, fontFamily: "var(--font-body)", color: "#111827",
            background: "#FAFAFA", outline: "none", transition: "border 0.15s"
          }}
          onFocus={e => e.target.style.borderColor = "#3B82F6"}
          onBlur={e => e.target.style.borderColor = "#E5E7EB"}
        />
      </div>
    </div>
  );
}
