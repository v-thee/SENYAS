import { senya_blue } from "./images";
import BottomNav from "./BottomNav";
import { AlphabetIcon, GreetingIcon, NumbersIcon, ClassroomIcon, CheckIcon, LockIcon, StarIcon, TrophyIcon } from "./icons";

const lessons = [
  { title: "FSL Alphabet", icon: "alpha", progress: 65, color: "#3B82F6", tag: "In Progress" },
  { title: "Greetings", icon: "greet", progress: 100, color: "#10B981", tag: "Completed" },
  { title: "Numbers 1–10", icon: "num", progress: 30, color: "#F59E0B", tag: "In Progress" },
  { title: "Classroom Words", icon: "class", progress: 0, color: "#8B5CF6", tag: "Locked" },
];

function getGreeting() {
  const h = new Date().getHours();
  if (h < 12) return "Good morning!";
  if (h < 17) return "Good afternoon!";
  return "Good evening!";
}

function LessonIcon({ icon, size = 22 }) {
  switch (icon) {
    case "alpha": return <AlphabetIcon size={size} color="#3B82F6" />;
    case "greet": return <GreetingIcon size={size} color="#10B981" />;
    case "num": return <NumbersIcon size={size} />;
    case "class": return <ClassroomIcon size={size} />;
    default: return null;
  }
}

export default function Dashboard({ nav, user }) {
  return (
    <div className="screen" style={{ background: "#F9FAFB", paddingBottom: 80 }}>
      {/* Header */}
      <div style={{
        background: "linear-gradient(135deg, #1D4ED8 0%, #3B82F6 100%)",
        padding: "52px 24px 72px", position: "relative", overflow: "hidden"
      }}>
        <div style={{ position: "absolute", top: -40, right: -40, width: 180, height: 180,
          borderRadius: "50%", background: "rgba(255,255,255,0.07)" }} />
        <div style={{ position: "absolute", bottom: -20, left: -20, width: 120, height: 120,
          borderRadius: "50%", background: "rgba(255,255,255,0.05)" }} />
        <div style={{ position: "absolute", top: 60, right: 140, width: 60, height: 60,
          borderRadius: "50%", background: "rgba(255,255,255,0.04)" }} />

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
          <div>
            <p style={{ color: "rgba(255,255,255,0.75)", fontSize: 13, fontWeight: 600 }}>
              {getGreeting()}
            </p>
            <h1 style={{ color: "#fff", fontFamily: "var(--font-head)",
              fontSize: 26, fontWeight: 800, marginTop: 2 }}>
              {user?.name || "Maria"}!
            </h1>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 10, flexWrap: "wrap" }}>
              <span style={{ background: "rgba(255,255,255,0.15)", borderRadius: 8,
                padding: "4px 10px", fontSize: 12, fontWeight: 700, color: "#FFD93D", display: "flex", alignItems: "center", gap: 4 }}>
                <StarIcon size={14} color="#FFD93D" /> Beginner
              </span>
              <span style={{ background: "rgba(255,255,255,0.15)", borderRadius: 8,
                padding: "4px 10px", fontSize: 12, fontWeight: 700, color: "#fff", display: "flex", alignItems: "center", gap: 4 }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="#fff"><path d="M12 2c1 2 2 4 2 7 0 3-1 6-3 8 1 2 2 4 2 6 0 4-2 6-2 6s-2-2-2-6c0-2 1-4 2-6-2-2-3-5-3-8 0-3 1-5 2-7z" /></svg>
                {user?.streak || 5} day streak
              </span>
            </div>
          </div>
          <img src={senya_blue} alt="Senya" style={{
            width: 84, height: 84, objectFit: "contain",
            filter: "drop-shadow(0 4px 12px rgba(0,0,0,0.2))",
            animation: "senya-bob 2.5s ease-in-out infinite",
            cursor: "pointer"
          }} onClick={() => nav("tutorial")} />
        </div>
      </div>

      {/* XP Card — floats over the header */}
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
      <div style={{ padding: "16px 20px 0" }}>
        <div style={{
          background: "linear-gradient(135deg, #FFF7ED, #FFEDD5)",
          border: "1.5px solid #FED7AA", borderRadius: 20, padding: 16,
          display: "flex", alignItems: "center", gap: 14
        }}>
          <div style={{
            width: 50, height: 50, borderRadius: 14, background: "#F59E0B",
            display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0
          }}>
            <svg width="28" height="28" viewBox="0 0 24 24" fill="#fff"><circle cx="12" cy="12" r="2" /><path d="M12 5a7 7 0 0 1 7 7m0 0a7 7 0 0 1-7 7m0 0a7 7 0 0 1-7-7m0 0a7 7 0 0 1 7-7" fill="none" stroke="#fff" strokeWidth="2"/></svg>
          </div>
          <div style={{ flex: 1 }}>
            <p style={{ fontSize: 11, color: "#92400E", fontWeight: 700,
              textTransform: "uppercase", letterSpacing: "0.04em" }}>Daily Challenge</p>
            <p style={{ fontSize: 15, fontWeight: 800, color: "#78350F",
              fontFamily: "var(--font-head)", marginTop: 2 }}>
              Practice 5 Alphabet Signs
            </p>
          </div>
          <button onClick={() => nav("quizmc")} style={{
            background: "#F59E0B", border: "none", borderRadius: 12,
            padding: "10px 16px", color: "#fff", fontWeight: 700, fontSize: 13,
            cursor: "pointer", fontFamily: "var(--font-body)",
            boxShadow: "0 2px 8px rgba(245,158,11,0.4)"
          }}>Go →</button>
        </div>
      </div>

      {/* Continue Lessons */}
      <div style={{ padding: "16px 20px 0" }}>
        <div style={{ display: "flex", justifyContent: "space-between",
          alignItems: "center", marginBottom: 14 }}>
          <h2 style={{ fontFamily: "var(--font-head)", fontSize: 18, fontWeight: 800, color: "#111827" }}>
            Continue Learning
          </h2>
          <button onClick={() => nav("lessons")} style={{
            background: "none", border: "none", color: "#3B82F6",
            fontSize: 13, fontWeight: 700, cursor: "pointer", fontFamily: "var(--font-body)"
          }}>See All →</button>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {lessons.map((l, i) => (
            <button key={i} onClick={() => nav("lessons")} style={{
              display: "flex", alignItems: "center", gap: 14,
              background: "#fff", border: "1.5px solid #E5E7EB",
              borderRadius: 16, padding: 14, cursor: "pointer",
              textAlign: "left", width: "100%", transition: "all 0.15s",
              opacity: l.tag === "Locked" ? 0.55 : 1
            }}>
              <div style={{
                width: 48, height: 48, borderRadius: 14,
                background: `${l.color}18`,
                display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0
              }}>
                {l.tag === "Completed" ? <CheckIcon size={24} /> : l.tag === "Locked" ? <LockIcon size={24} color="#9CA3AF" /> : <LessonIcon icon={l.icon} />}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <p style={{ fontSize: 15, fontWeight: 700, color: "#111827" }}>{l.title}</p>
                  <span style={{
                    fontSize: 11, fontWeight: 700, padding: "3px 10px", borderRadius: 20,
                    background: l.tag === "Completed" ? "#ECFDF5" : l.tag === "Locked" ? "#F3F4F6" : "#FFFBEB",
                    color: l.tag === "Completed" ? "#065F46" : l.tag === "Locked" ? "#6B7280" : "#92400E"
                  }}>{l.tag}</span>
                </div>
                <div style={{ marginTop: 6 }}>
                  <div className="xp-bar-wrap" style={{ height: 5 }}>
                    <div className="xp-bar-fill" style={{
                      width: `${l.progress}%`,
                      background: `linear-gradient(90deg, ${l.color}80, ${l.color})`
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
      <div style={{ padding: "16px 20px 0" }}>
        <h2 style={{ fontFamily: "var(--font-head)", fontSize: 18, fontWeight: 800,
          color: "#111827", marginBottom: 14 }}>Quick Practice</h2>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
          {[
            { label: "Multiple Choice", icon: "mc", color: "#3B82F6", screen: "quizmc" },
            { label: "Drag & Drop", icon: "dnd", color: "#8B5CF6", screen: "quizdnd" },
            { label: "Gesture Cam", icon: "cam", color: "#10B981", screen: "gesture" },
            { label: "My Badges", icon: "badge", color: "#F59E0B", screen: "achievements" },
          ].map((q, i) => (
            <button key={i} onClick={() => nav(q.screen)} style={{
              background: "#fff", border: "1.5px solid #E5E7EB", borderRadius: 16,
              padding: "16px 14px", cursor: "pointer", textAlign: "center",
              transition: "transform 0.15s, box-shadow 0.15s"
            }}>
              <div style={{
                width: 46, height: 46, borderRadius: 13,
                background: `${q.color}14`,
                display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 8px"
              }}>
                {q.icon === "mc" && <svg width="22" height="22" viewBox="0 0 24 24" fill={q.color}><rect x="3" y="3" width="18" height="18" rx="2" fill="none" stroke={q.color} strokeWidth="2"/><path d="M9 12l2 2 4-4" stroke={q.color} strokeWidth="2" fill="none"/></svg>}
                {q.icon === "dnd" && <svg width="22" height="22" viewBox="0 0 24 24" fill={q.color} opacity="0.8"><rect x="3" y="3" width="8" height="8" rx="1"/><rect x="13" y="3" width="8" height="8" rx="1"/><rect x="3" y="13" width="8" height="8" rx="1"/><rect x="13" y="13" width="8" height="8" rx="1"/></svg>}
                {q.icon === "cam" && <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={q.color} strokeWidth="2"><path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"/><circle cx="12" cy="13" r="3"/></svg>}
                {q.icon === "badge" && <TrophyIcon size={22} color={q.color} />}
              </div>
              <p style={{ fontSize: 13, fontWeight: 700, color: "#374151" }}>{q.label}</p>
            </button>
          ))}
        </div>
      </div>

      <BottomNav active="dashboard" nav={nav} />
    </div>
  );
}
