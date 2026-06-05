import { useState } from "react";
import { senya_logo } from "../assets/images";
import BottomNav from "../components/BottomNav";

export default function Profile({ nav, user }) {
  const [notifs, setNotifs] = useState(true);
  const [sound, setSound] = useState(true);
  const [haptic, setHaptic] = useState(false);
  const [large, setLarge] = useState(false);

  const stats = [
    { label: "Lessons Done", value: "12", icon: "📚" },
    { label: "Total XP", value: user?.xp || "340", icon: "⚡" },
    { label: "Day Streak", value: user?.streak || "5", icon: "🔥" },
    { label: "Badges", value: "4", icon: "🏆" },
  ];

  return (
    <div className="screen" style={{ background: "#F9FAFB", paddingBottom: 80 }}>
      {/* Header */}
      <div style={{
        background: "linear-gradient(135deg, #1D4ED8, #60A5FA)",
        padding: "52px 24px 40px", textAlign: "center", position: "relative"
      }}>
        <div style={{
          position: "absolute", top: -30, right: -30, width: 120, height: 120,
          borderRadius: "50%", background: "rgba(255,255,255,0.07)"
        }} />
        <div style={{ position: "relative", display: "inline-block" }}>
          <div style={{
            width: 80, height: 80, borderRadius: "50%",
            background: "rgba(255,255,255,0.2)",
            display: "flex", alignItems: "center", justifyContent: "center",
            margin: "0 auto", border: "3px solid rgba(255,255,255,0.4)"
          }}>
            <img src={senya_logo} alt="Avatar" style={{
              width: 64, height: 64, objectFit: "contain"
            }} />
          </div>
          <button style={{
            position: "absolute", bottom: 0, right: -4,
            width: 24, height: 24, borderRadius: "50%",
            background: "#FFD93D", border: "2px solid #1D4ED8",
            cursor: "pointer", fontSize: 12, display: "flex",
            alignItems: "center", justifyContent: "center"
          }}>✏️</button>
        </div>
        <h2 style={{ color: "#fff", fontFamily: "var(--font-head)",
          fontSize: 22, fontWeight: 800, marginTop: 10 }}>
          {user?.name || "Maria Santos"}
        </h2>
        <p style={{ color: "rgba(255,255,255,0.75)", fontSize: 13, fontWeight: 500 }}>
          FSL Beginner Learner
        </p>
        <div style={{ display: "flex", justifyContent: "center", gap: 8, marginTop: 8 }}>
          <span style={{ background: "rgba(255,255,255,0.15)", borderRadius: 8,
            padding: "4px 12px", color: "#FFD93D", fontSize: 12, fontWeight: 700 }}>
            ⭐ Beginner
          </span>
          <span style={{ background: "rgba(255,255,255,0.15)", borderRadius: 8,
            padding: "4px 12px", color: "#fff", fontSize: 12, fontWeight: 600 }}>
            Member since 2026
          </span>
        </div>
      </div>

      {/* Stats */}
      <div style={{ padding: "0 20px", marginTop: -24 }}>
        <div className="card" style={{ padding: 16 }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 8 }}>
            {stats.map((s, i) => (
              <div key={i} style={{ textAlign: "center" }}>
                <div style={{ fontSize: 20 }}>{s.icon}</div>
                <div style={{ fontFamily: "var(--font-head)", fontSize: 20,
                  fontWeight: 800, color: "#111827" }}>{s.value}</div>
                <div style={{ fontSize: 10, color: "#9CA3AF", fontWeight: 600,
                  lineHeight: 1.2, marginTop: 2 }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Progress */}
      <div style={{ padding: "16px 20px 0" }}>
        <h3 style={{ fontFamily: "var(--font-head)", fontSize: 17, fontWeight: 800,
          color: "#111827", marginBottom: 12 }}>Learning Progress</h3>
        <div className="card" style={{ padding: 16 }}>
          {[
            { name: "FSL Alphabet", pct: 65, color: "#3B82F6" },
            { name: "Greetings", pct: 100, color: "#10B981" },
            { name: "Numbers", pct: 30, color: "#F59E0B" },
            { name: "Classroom Words", pct: 0, color: "#8B5CF6" },
          ].map((item, i) => (
            <div key={i} style={{ marginBottom: i < 3 ? 14 : 0 }}>
              <div style={{ display: "flex", justifyContent: "space-between",
                marginBottom: 5, alignItems: "center" }}>
                <span style={{ fontSize: 13, fontWeight: 700, color: "#374151" }}>{item.name}</span>
                <span style={{ fontSize: 12, fontWeight: 700, color: item.color }}>{item.pct}%</span>
              </div>
              <div className="xp-bar-wrap">
                <div className="xp-bar-fill" style={{
                  width: `${item.pct}%`,
                  background: `linear-gradient(90deg, ${item.color}99, ${item.color})`
                }} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Settings */}
      <div style={{ padding: "16px 20px 0" }}>
        <h3 style={{ fontFamily: "var(--font-head)", fontSize: 17, fontWeight: 800,
          color: "#111827", marginBottom: 12 }}>Settings</h3>
        <div className="card" style={{ overflow: "hidden" }}>
          {[
            { label: "Daily Reminders", sub: "Get notified to practice", val: notifs, set: setNotifs, icon: "🔔" },
            { label: "Sound Effects", sub: "Play sounds during lessons", val: sound, set: setSound, icon: "🔊" },
            { label: "Haptic Feedback", sub: "Vibrate on interactions", val: haptic, set: setHaptic, icon: "📳" },
            { label: "Large Text Mode", sub: "Bigger text for readability", val: large, set: setLarge, icon: "🔤" },
          ].map((item, i, arr) => (
            <div key={i} style={{
              display: "flex", alignItems: "center", gap: 14, padding: "14px 16px",
              borderBottom: i < arr.length - 1 ? "1px solid #F3F4F6" : "none"
            }}>
              <span style={{
                width: 36, height: 36, borderRadius: 10, fontSize: 18,
                background: "#F3F4F6", display: "flex", alignItems: "center",
                justifyContent: "center", flexShrink: 0
              }}>{item.icon}</span>
              <div style={{ flex: 1 }}>
                <p style={{ fontSize: 14, fontWeight: 700, color: "#111827" }}>{item.label}</p>
                <p style={{ fontSize: 11, color: "#9CA3AF", fontWeight: 500 }}>{item.sub}</p>
              </div>
              <Toggle value={item.val} onChange={item.set} />
            </div>
          ))}
        </div>
      </div>

      {/* Account actions */}
      <div style={{ padding: "16px 20px 0" }}>
        <div className="card" style={{ overflow: "hidden" }}>
          {[
            { label: "Language Preference", icon: "🌏", action: () => {} },
            { label: "Help & Support", icon: "💬", action: () => {} },
            { label: "About SEÑAS", icon: "ℹ️", action: () => {} },
          ].map((item, i, arr) => (
            <button key={i} onClick={item.action} style={{
              display: "flex", alignItems: "center", gap: 14, padding: "14px 16px",
              borderBottom: i < arr.length - 1 ? "1px solid #F3F4F6" : "none",
              background: "none", border: "none", cursor: "pointer",
              width: "100%", textAlign: "left"
            }}>
              <span style={{
                width: 36, height: 36, borderRadius: 10, fontSize: 18,
                background: "#F3F4F6", display: "flex", alignItems: "center",
                justifyContent: "center", flexShrink: 0
              }}>{item.icon}</span>
              <span style={{ flex: 1, fontSize: 14, fontWeight: 700, color: "#111827" }}>{item.label}</span>
              <span style={{ color: "#9CA3AF" }}>›</span>
            </button>
          ))}
        </div>
      </div>

      <div style={{ padding: "16px 20px 0" }}>
        <button className="btn-ghost" onClick={() => nav("onboarding")}
          style={{ color: "#EF4444", borderColor: "#FECACA" }}>
          Sign Out
        </button>
      </div>

      <BottomNav active="profile" nav={nav} />
    </div>
  );
}

function Toggle({ value, onChange }) {
  return (
    <div
      onClick={() => onChange(!value)}
      style={{
        width: 44, height: 24, borderRadius: 12, cursor: "pointer",
        background: value ? "#3B82F6" : "#D1D5DB", position: "relative",
        transition: "background 0.2s", flexShrink: 0
      }}
    >
      <div style={{
        position: "absolute", top: 3,
        left: value ? 23 : 3, width: 18, height: 18,
        borderRadius: "50%", background: "#fff",
        boxShadow: "0 1px 4px rgba(0,0,0,0.2)",
        transition: "left 0.2s"
      }} />
    </div>
  );
}
