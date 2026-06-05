import { senya_blue } from "../assets/images";
import BottomNav from "../components/BottomNav";

const badges = [
  { name: "First Step", emoji: "👣", desc: "Complete your first lesson", earned: true, color: "#10B981", xp: 10 },
  { name: "Alphabet Star", emoji: "⭐", desc: "Learn all 26 FSL alphabet signs", earned: true, color: "#F59E0B", xp: 50 },
  { name: "Streak Starter", emoji: "🔥", desc: "Practice 3 days in a row", earned: true, color: "#EF4444", xp: 20 },
  { name: "Quiz Whiz", emoji: "🧠", desc: "Score 100% on any quiz", earned: false, color: "#8B5CF6", xp: 30 },
  { name: "Sign Detective", emoji: "🔍", desc: "Use gesture recognition 10 times", earned: false, color: "#3B82F6", xp: 40 },
  { name: "Greeter", emoji: "👋", desc: "Complete the Greetings module", earned: true, color: "#06B6D4", xp: 25 },
  { name: "Number Ninja", emoji: "🔢", desc: "Learn numbers 1–10", earned: false, color: "#F97316", xp: 35 },
  { name: "Week Warrior", emoji: "🗓️", desc: "7-day learning streak", earned: false, color: "#EC4899", xp: 60 },
];

const milestones = [
  { label: "50 XP", done: true },
  { label: "100 XP", done: true },
  { label: "250 XP", done: true },
  { label: "500 XP", done: false },
  { label: "1000 XP", done: false },
];

export default function Achievements({ nav, user }) {
  const earned = badges.filter(b => b.earned).length;

  return (
    <div className="screen" style={{ background: "#F9FAFB", paddingBottom: 80 }}>
      {/* Header */}
      <div style={{
        background: "linear-gradient(135deg, #92400E, #F59E0B)",
        padding: "52px 24px 32px", position: "relative", overflow: "hidden"
      }}>
        <div style={{
          position: "absolute", top: -30, right: -30, width: 140, height: 140,
          borderRadius: "50%", background: "rgba(255,255,255,0.07)"
        }} />
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
          <div>
            <h1 style={{ fontFamily: "var(--font-head)", fontSize: 26, fontWeight: 800, color: "#fff" }}>
              Achievements
            </h1>
            <p style={{ color: "rgba(255,255,255,0.8)", fontSize: 14, marginTop: 4, fontWeight: 500 }}>
              {earned} of {badges.length} badges earned
            </p>
            <div style={{
              background: "rgba(255,255,255,0.15)", borderRadius: 10,
              padding: "6px 14px", display: "inline-block", marginTop: 10
            }}>
              <span style={{ color: "#fff", fontWeight: 800, fontSize: 16 }}>
                ⚡ {user?.xp || 340} Total XP
              </span>
            </div>
          </div>
          <img src={senya_blue} alt="Senya" style={{
            width: 72, height: 72, objectFit: "contain",
            filter: "drop-shadow(0 4px 8px rgba(0,0,0,0.2))",
            animation: "senya-bob 2.5s ease-in-out infinite"
          }} />
        </div>
      </div>

      {/* Milestones */}
      <div style={{ padding: "20px 20px 0" }}>
        <h3 style={{ fontFamily: "var(--font-head)", fontSize: 17, fontWeight: 800,
          color: "#111827", marginBottom: 14 }}>XP Milestones</h3>
        <div style={{ display: "flex", gap: 0, alignItems: "center" }}>
          {milestones.map((m, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", flex: i < milestones.length - 1 ? 1 : 0 }}>
              <div style={{
                width: 36, height: 36, borderRadius: "50%", flexShrink: 0,
                background: m.done ? "#F59E0B" : "#E5E7EB",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 14, boxShadow: m.done ? "0 2px 8px rgba(245,158,11,0.4)" : "none",
                border: m.done ? "none" : "2px solid #D1D5DB"
              }}>
                {m.done ? "⭐" : "○"}
              </div>
              {i < milestones.length - 1 && (
                <div style={{
                  height: 3, flex: 1,
                  background: milestones[i+1]?.done ? "#F59E0B" : "#E5E7EB",
                  transition: "background 0.3s"
                }} />
              )}
            </div>
          ))}
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", marginTop: 6 }}>
          {milestones.map((m, i) => (
            <span key={i} style={{
              fontSize: 10, fontWeight: 700,
              color: m.done ? "#92400E" : "#9CA3AF",
              flex: i < milestones.length - 1 ? 1 : 0,
              textAlign: "center"
            }}>{m.label}</span>
          ))}
        </div>
      </div>

      {/* Badges Grid */}
      <div style={{ padding: "20px 20px 0" }}>
        <h3 style={{ fontFamily: "var(--font-head)", fontSize: 17, fontWeight: 800,
          color: "#111827", marginBottom: 14 }}>Badges</h3>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
          {badges.map((b, i) => (
            <div key={i} className="card" style={{
              padding: 16, opacity: b.earned ? 1 : 0.6,
              filter: b.earned ? "none" : "grayscale(0.5)",
              position: "relative", overflow: "hidden"
            }}>
              {b.earned && (
                <div style={{
                  position: "absolute", top: 8, right: 8,
                  background: "#10B981", borderRadius: 6, padding: "2px 6px",
                  fontSize: 10, fontWeight: 700, color: "#fff"
                }}>✓ Earned</div>
              )}
              <div style={{
                width: 52, height: 52, borderRadius: 14,
                background: b.earned ? `${b.color}18` : "#F3F4F6",
                fontSize: 26, display: "flex", alignItems: "center",
                justifyContent: "center", marginBottom: 10
              }}>
                {b.earned ? b.emoji : "🔒"}
              </div>
              <p style={{ fontFamily: "var(--font-head)", fontSize: 14, fontWeight: 800,
                color: b.earned ? "#111827" : "#9CA3AF" }}>{b.name}</p>
              <p style={{ fontSize: 11, color: "#6B7280", marginTop: 3, lineHeight: 1.4 }}>{b.desc}</p>
              <p style={{ fontSize: 11, color: b.earned ? b.color : "#9CA3AF",
                fontWeight: 700, marginTop: 6 }}>+{b.xp} XP</p>
            </div>
          ))}
        </div>
      </div>

      <BottomNav active="achievements" nav={nav} />
    </div>
  );
}
