import { senya_blue } from "../assets/images";
import BottomNav from "../components/BottomNav";

const lessons = [
  { title: "FSL Alphabet", emoji: "🔤", progress: 65, color: "#3B82F6", tag: "In Progress" },
  { title: "Greetings", emoji: "👋", progress: 100, color: "#10B981", tag: "Completed" },
  { title: "Numbers 1–10", emoji: "🔢", progress: 30, color: "#F59E0B", tag: "In Progress" },
  { title: "Classroom Words", emoji: "🏫", progress: 0, color: "#8B5CF6", tag: "Locked" },
];

export default function Dashboard({ nav, user }) {
  return (
    <div className="screen" style={{ background: "#F9FAFB", paddingBottom: 80 }}>
      {/* Header */}
      <div style={{
        background: "linear-gradient(135deg, #1D4ED8 0%, #3B82F6 100%)",
        padding: "52px 24px 72px", position: "relative", overflow: "hidden"
      }}>
        {/* BG decoration */}
        <div style={{
          position: "absolute", top: -40, right: -40,
          width: 180, height: 180, borderRadius: "50%",
          background: "rgba(255,255,255,0.07)"
        }} />
        <div style={{
          position: "absolute", bottom: -20, left: -20,
          width: 120, height: 120, borderRadius: "50%",
          background: "rgba(255,255,255,0.05)"
        }} />

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
          <div>
            <p style={{ color: "rgba(255,255,255,0.75)", fontSize: 13, fontWeight: 600 }}>
              Good morning! 👋
            </p>
            <h1 style={{ color: "#fff", fontFamily: "var(--font-head)",
              fontSize: 24, fontWeight: 800, marginTop: 2 }}>
              {user?.name || "Maria"}!
            </h1>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 8 }}>
              <span style={{
                background: "rgba(255,255,255,0.15)", borderRadius: 8,
                padding: "4px 10px", fontSize: 12, fontWeight: 700, color: "#FFD93D"
              }}>⭐ Beginner</span>
              <span style={{
                background: "rgba(255,255,255,0.15)", borderRadius: 8,
                padding: "4px 10px", fontSize: 12, fontWeight: 700, color: "#fff"
              }}>🔥 {user?.streak || 5} day streak</span>
            </div>
          </div>
          <img src={senya_blue} alt="Senya" style={{
            width: 80, height: 80, objectFit: "contain",
            filter: "drop-shadow(0 4px 12px rgba(0,0,0,0.2))",
            animation: "senya-bob 2.5s ease-in-out infinite",
            cursor: "pointer"
          }} onClick={() => nav("tutorial")} />
        </div>
      </div>

      {/* XP Card */}
      <div style={{ padding: "0 20px", marginTop: -36 }}>
        <div className="card" style={{ padding: 18 }}>
          <div style={{ display: "flex", justifyContent: "space-between",
            alignItems: "center", marginBottom: 10 }}>
            <div>
              <p style={{ fontSize: 12, color: "#6B7280", fontWeight: 600 }}>Your XP Progress</p>
              <p style={{ fontFamily: "var(--font-head)", fontSize: 20, fontWeight: 800, color: "#111827" }}>
                {user?.xp || 340} / 500 XP
              </p>
            </div>
            <div style={{ textAlign: "right" }}>
              <p style={{ fontSize: 12, color: "#6B7280", fontWeight: 600 }}>Next Level</p>
              <p style={{ fontSize: 14, fontWeight: 800, color: "#3B82F6" }}>Intermediate</p>
            </div>
          </div>
          <div className="xp-bar-wrap" style={{ height: 10 }}>
            <div className="xp-bar-fill" style={{ width: `${((user?.xp || 340)/500)*100}%` }} />
          </div>
          <p style={{ fontSize: 11, color: "#9CA3AF", marginTop: 6, fontWeight: 600 }}>
            {500 - (user?.xp || 340)} XP to unlock Intermediate level
          </p>
        </div>
      </div>

      {/* Daily Challenge */}
      <div style={{ padding: "20px 20px 0" }}>
        <div style={{
          background: "linear-gradient(135deg, #FFF7ED, #FFEDD5)",
          border: "1.5px solid #FED7AA", borderRadius: 20, padding: 16,
          display: "flex", alignItems: "center", gap: 14
        }}>
          <div style={{
            width: 48, height: 48, borderRadius: 14,
            background: "#F59E0B", display: "flex",
            alignItems: "center", justifyContent: "center", fontSize: 22, flexShrink: 0
          }}>🎯</div>
          <div style={{ flex: 1 }}>
            <p style={{ fontSize: 12, color: "#92400E", fontWeight: 700 }}>Daily Challenge</p>
            <p style={{ fontSize: 15, fontWeight: 800, color: "#78350F", fontFamily: "var(--font-head)" }}>
              Practice 5 Alphabet Signs
            </p>
          </div>
          <button onClick={() => nav("quizmc")} style={{
            background: "#F59E0B", border: "none", borderRadius: 12,
            padding: "8px 14px", color: "#fff", fontWeight: 700, fontSize: 13,
            cursor: "pointer", fontFamily: "var(--font-body)"
          }}>Go →</button>
        </div>
      </div>

      {/* Continue Lessons */}
      <div style={{ padding: "20px 20px 0" }}>
        <div style={{ display: "flex", justifyContent: "space-between",
          alignItems: "center", marginBottom: 14 }}>
          <h2 style={{ fontFamily: "var(--font-head)", fontSize: 18, fontWeight: 800, color: "#111827" }}>
            Continue Learning
          </h2>
          <button onClick={() => nav("lessons")} style={{
            background: "none", border: "none", color: "#3B82F6",
            fontSize: 13, fontWeight: 700, cursor: "pointer", fontFamily: "var(--font-body)"
          }}>See All</button>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {lessons.map((l, i) => (
            <button key={i} onClick={() => nav("lessons")} style={{
              display: "flex", alignItems: "center", gap: 14,
              background: "#fff", border: "1px solid #E5E7EB",
              borderRadius: 16, padding: 14, cursor: "pointer",
              textAlign: "left", width: "100%", transition: "all 0.15s",
              opacity: l.tag === "Locked" ? 0.6 : 1
            }}>
              <div style={{
                width: 48, height: 48, borderRadius: 14, fontSize: 22,
                background: `${l.color}18`,
                display: "flex", alignItems: "center", justifyContent: "center",
                flexShrink: 0
              }}>{l.emoji}</div>
              <div style={{ flex: 1 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <p style={{ fontSize: 15, fontWeight: 700, color: "#111827" }}>{l.title}</p>
                  <span className={`tag tag-${l.tag === "Completed" ? "green" : l.tag === "Locked" ? "blue" : "yellow"}`}>
                    {l.tag}
                  </span>
                </div>
                <div style={{ marginTop: 6 }}>
                  <div className="xp-bar-wrap" style={{ height: 6 }}>
                    <div className="xp-bar-fill" style={{
                      width: `${l.progress}%`,
                      background: `linear-gradient(90deg, ${l.color}99, ${l.color})`
                    }} />
                  </div>
                  <p style={{ fontSize: 11, color: "#9CA3AF", marginTop: 3, fontWeight: 600 }}>
                    {l.progress}% complete
                  </p>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div style={{ padding: "20px 20px 0" }}>
        <h2 style={{ fontFamily: "var(--font-head)", fontSize: 18, fontWeight: 800,
          color: "#111827", marginBottom: 14 }}>Quick Practice</h2>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
          {[
            { label: "Multiple Choice", icon: "✅", color: "#3B82F6", screen: "quizmc" },
            { label: "Drag & Drop", icon: "🖱️", color: "#8B5CF6", screen: "quizdnd" },
            { label: "Gesture Cam", icon: "📷", color: "#10B981", screen: "gesture" },
            { label: "Achievements", icon: "🏆", color: "#F59E0B", screen: "achievements" },
          ].map((q, i) => (
            <button key={i} onClick={() => nav(q.screen)} style={{
              background: "#fff", border: "1px solid #E5E7EB", borderRadius: 16,
              padding: "16px 14px", cursor: "pointer", textAlign: "center",
              transition: "transform 0.15s"
            }}>
              <div style={{
                width: 44, height: 44, borderRadius: 12,
                background: `${q.color}15`, fontSize: 20,
                display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 8px"
              }}>{q.icon}</div>
              <p style={{ fontSize: 13, fontWeight: 700, color: "#374151" }}>{q.label}</p>
            </button>
          ))}
        </div>
      </div>

      <BottomNav active="dashboard" nav={nav} />
    </div>
  );
}
