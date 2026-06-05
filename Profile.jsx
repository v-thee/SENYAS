import { useState } from "react";
import { senya_logo } from "./images";
import BottomNav from "./BottomNav";
import { BookIcon, ZapIcon, FlameIcon, TrophyIcon } from "./icons";

export default function Profile({ nav, user }) {
  const [notifs, setNotifs] = useState(true);
  const [sound, setSound] = useState(true);
  const [haptic, setHaptic] = useState(false);
  const [large, setLarge] = useState(false);

  const stats = [
    { label: "Lessons Done", value: "12", icon: BookIcon },
    { label: "Total XP", value: user?.xp || "340", icon: ZapIcon },
    { label: "Day Streak", value: user?.streak || "5", icon: FlameIcon },
    { label: "Badges", value: "4", icon: TrophyIcon },
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
          }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="#1D4ED8"><path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25z"/><path d="M20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/></svg>
          </button>
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
            padding: "4px 12px", color: "#FFD93D", fontSize: 12, fontWeight: 700, display: "flex", alignItems: "center", gap: 4 }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="#FFD93D"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" /></svg>
            Beginner
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
            {stats.map((s, i) => {
              const Icon = s.icon;
              return (
                <div key={i} style={{ textAlign: "center" }}>
                  <div style={{ display: "flex", justifyContent: "center", marginBottom: 6 }}>
                    <Icon size={20} />
                  </div>
                  <div style={{ fontFamily: "var(--font-head)", fontSize: 20,
                    fontWeight: 800, color: "#111827" }}>{s.value}</div>
                  <div style={{ fontSize: 10, color: "#9CA3AF", fontWeight: 600,
                    lineHeight: 1.2, marginTop: 2 }}>{s.label}</div>
                </div>
              );
            })}
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
            { label: "Daily Reminders", sub: "Get notified to practice", val: notifs, set: setNotifs },
            { label: "Sound Effects", sub: "Play sounds during lessons", val: sound, set: setSound },
            { label: "Haptic Feedback", sub: "Vibrate on interactions", val: haptic, set: setHaptic },
            { label: "Large Text Mode", sub: "Bigger text for readability", val: large, set: setLarge },
          ].map((item, i, arr) => (
            <div key={i} style={{
              display: "flex", alignItems: "center", gap: 14, padding: "14px 16px",
              borderBottom: i < arr.length - 1 ? "1px solid #F3F4F6" : "none"
            }}>
              <span style={{
                width: 36, height: 36, borderRadius: 10,
                background: "#F3F4F6", display: "flex", alignItems: "center",
                justifyContent: "center", flexShrink: 0
              }}>
                {i === 0 && <svg width="18" height="18" viewBox="0 0 24 24" fill="#9CA3AF" opacity="0.8"><path d="M18 8A6 6 0 0 0 6 8m12 0a10 10 0 0 1-20 0m20 0c0 5 0 9-6 9s-6-4-6-9" /></svg>}
                {i === 1 && <svg width="18" height="18" viewBox="0 0 24 24" fill="#9CA3AF" opacity="0.8"><path d="M13 3H4a1 1 0 0 0-1 1v16a1 1 0 0 0 1 1h10m0 0h6a1 1 0 0 0 1-1V9m0 0a1 1 0 0 0-1-1h-6" /></svg>}
                {i === 2 && <svg width="18" height="18" viewBox="0 0 24 24" fill="#9CA3AF" opacity="0.8"><rect x="4" y="4" width="16" height="16" rx="1" fill="none" stroke="#9CA3AF" strokeWidth="2"/><path d="M9 9h6v6H9z" fill="#9CA3AF" opacity="0.3"/></svg>}
                {i === 3 && <svg width="18" height="18" viewBox="0 0 24 24" fill="#9CA3AF" opacity="0.8"><text x="6" y="18" fontSize="14" fontWeight="bold">A</text></svg>}
              </span>
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
            { label: "Language Preference", action: () => {} },
            { label: "Help & Support", action: () => {} },
            { label: "About SEÑAS", action: () => {} },
          ].map((item, i, arr) => (
            <button key={i} onClick={item.action} style={{
              display: "flex", alignItems: "center", gap: 14, padding: "14px 16px",
              borderBottom: i < arr.length - 1 ? "1px solid #F3F4F6" : "none",
              background: "none", border: "none", cursor: "pointer",
              width: "100%", textAlign: "left"
            }}>
              <span style={{
                width: 36, height: 36, borderRadius: 10,
                background: "#F3F4F6", display: "flex", alignItems: "center",
                justifyContent: "center", flexShrink: 0
              }}>
                {i === 0 && <svg width="18" height="18" viewBox="0 0 24 24" fill="#9CA3AF" opacity="0.8"><circle cx="12" cy="12" r="9" fill="none" stroke="#9CA3AF" strokeWidth="2"/><path d="M12 2a10 10 0 0 1 10 10" fill="#9CA3AF" opacity="0.3"/></svg>}
                {i === 1 && <svg width="18" height="18" viewBox="0 0 24 24" fill="#9CA3AF" opacity="0.8"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" fill="none" stroke="#9CA3AF" strokeWidth="2"/></svg>}
                {i === 2 && <svg width="18" height="18" viewBox="0 0 24 24" fill="#9CA3AF" opacity="0.8"><circle cx="12" cy="12" r="10" fill="none" stroke="#9CA3AF" strokeWidth="2"/><text x="11" y="15" fontSize="14" fontWeight="bold" fill="#9CA3AF">i</text></svg>}
              </span>
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
