import { useState } from "react";
import BottomNav from "../components/BottomNav";
import { senya_teaching } from "../assets/images";

const categories = ["All", "Alphabet", "Numbers", "Greetings", "Classroom"];

const lessonData = [
  {
    category: "Alphabet",
    title: "Letters A–E",
    desc: "Learn the first 5 letters of the FSL alphabet",
    emoji: "🔤", color: "#3B82F6", duration: "5 min", xp: 20, done: true
  },
  {
    category: "Alphabet",
    title: "Letters F–J",
    desc: "Continue with the next 5 alphabet signs",
    emoji: "🔡", color: "#3B82F6", duration: "5 min", xp: 20, done: false
  },
  {
    category: "Greetings",
    title: "Hello & Goodbye",
    desc: "Essential everyday greetings in FSL",
    emoji: "👋", color: "#10B981", duration: "4 min", xp: 15, done: true
  },
  {
    category: "Greetings",
    title: "Thank You & Please",
    desc: "Polite expressions used in conversations",
    emoji: "🙏", color: "#10B981", duration: "4 min", xp: 15, done: false
  },
  {
    category: "Numbers",
    title: "Numbers 1–5",
    desc: "Count from one to five in FSL",
    emoji: "🔢", color: "#F59E0B", duration: "6 min", xp: 25, done: false
  },
  {
    category: "Numbers",
    title: "Numbers 6–10",
    desc: "Complete your basic number vocabulary",
    emoji: "🔟", color: "#F59E0B", duration: "6 min", xp: 25, done: false
  },
  {
    category: "Classroom",
    title: "Teacher & Student",
    desc: "Signs for classroom roles",
    emoji: "🏫", color: "#8B5CF6", duration: "7 min", xp: 30, done: false
  },
  {
    category: "Classroom",
    title: "School Supplies",
    desc: "Book, pen, paper and more",
    emoji: "✏️", color: "#8B5CF6", duration: "8 min", xp: 30, done: false
  },
];

export default function Lessons({ nav }) {
  const [cat, setCat] = useState("All");
  const [active, setActive] = useState(null);

  const filtered = cat === "All" ? lessonData : lessonData.filter(l => l.category === cat);

  return (
    <div className="screen" style={{ background: "#F9FAFB", paddingBottom: 80 }}>
      {/* Header */}
      <div style={{
        background: "linear-gradient(135deg, #1D4ED8, #3B82F6)",
        padding: "52px 24px 24px"
      }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <h1 style={{ fontFamily: "var(--font-head)", fontSize: 24, fontWeight: 800, color: "#fff" }}>
              FSL Lessons
            </h1>
            <p style={{ color: "rgba(255,255,255,0.75)", fontSize: 13, marginTop: 4, fontWeight: 500 }}>
              {lessonData.filter(l => l.done).length} of {lessonData.length} completed
            </p>
          </div>
          <img src={senya_teaching} alt="Senya" style={{
            width: 64, height: 64, objectFit: "contain",
            filter: "drop-shadow(0 2px 6px rgba(0,0,0,0.2))",
            animation: "senya-bob 2.5s ease-in-out infinite"
          }} />
        </div>

        {/* Overall progress */}
        <div style={{ marginTop: 12 }}>
          <div className="xp-bar-wrap" style={{ background: "rgba(255,255,255,0.2)" }}>
            <div className="xp-bar-fill"
              style={{ width: `${(lessonData.filter(l=>l.done).length/lessonData.length)*100}%` }} />
          </div>
        </div>
      </div>

      {/* Category Tabs */}
      <div style={{ padding: "16px 20px 0", overflowX: "auto" }}>
        <div style={{ display: "flex", gap: 8, whiteSpace: "nowrap" }}>
          {categories.map(c => (
            <button key={c} onClick={() => setCat(c)} style={{
              padding: "8px 18px", borderRadius: 20, border: "none",
              fontFamily: "var(--font-body)", fontSize: 13, fontWeight: 700,
              cursor: "pointer", transition: "all 0.2s",
              background: cat === c ? "#3B82F6" : "#fff",
              color: cat === c ? "#fff" : "#374151",
              boxShadow: cat === c ? "0 2px 8px rgba(59,130,246,0.3)" : "0 1px 3px rgba(0,0,0,0.06)",
              border: cat === c ? "none" : "1.5px solid #E5E7EB"
            }}>{c}</button>
          ))}
        </div>
      </div>

      {/* Lessons */}
      <div style={{ padding: "16px 20px 0", display: "flex", flexDirection: "column", gap: 14 }}>
        {filtered.map((l, i) => (
          <div key={i} style={{ position: "relative" }}>
            <button onClick={() => setActive(active === i ? null : i)} style={{
              width: "100%", background: l.done ? "#F0FDF4" : "#fff",
              border: l.done ? "1.5px solid #BBF7D0" : "1.5px solid #E5E7EB",
              borderRadius: 18, padding: 16, cursor: "pointer", textAlign: "left",
              transition: "all 0.2s"
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                <div style={{
                  width: 52, height: 52, borderRadius: 14,
                  background: `${l.color}18`, fontSize: 24,
                  display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0
                }}>
                  {l.done ? "✅" : l.emoji}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <p style={{ fontSize: 15, fontWeight: 800, color: "#111827",
                      fontFamily: "var(--font-head)" }}>{l.title}</p>
                    <span className="tag" style={{
                      background: `${l.color}18`, color: l.color, fontSize: 11, fontWeight: 700
                    }}>{l.category}</span>
                  </div>
                  <p style={{ fontSize: 12, color: "#6B7280", marginTop: 3 }}>{l.desc}</p>
                  <div style={{ display: "flex", gap: 12, marginTop: 6 }}>
                    <span style={{ fontSize: 11, color: "#9CA3AF", fontWeight: 600 }}>⏱ {l.duration}</span>
                    <span style={{ fontSize: 11, color: "#F59E0B", fontWeight: 600 }}>⚡ +{l.xp} XP</span>
                  </div>
                </div>
              </div>

              {/* Expanded */}
              {active === i && (
                <div style={{
                  marginTop: 14, paddingTop: 14,
                  borderTop: "1px solid #E5E7EB"
                }}>
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 10, marginBottom: 14 }}>
                    {["Watch Signs","Listen","Practice"].map((s, j) => (
                      <div key={j} style={{
                        background: `${l.color}10`, borderRadius: 12,
                        padding: "10px 8px", textAlign: "center"
                      }}>
                        <div style={{ fontSize: 18 }}>
                          {["👁️","👂","✋"][j]}
                        </div>
                        <p style={{ fontSize: 11, fontWeight: 700, color: l.color, marginTop: 4 }}>{s}</p>
                      </div>
                    ))}
                  </div>
                  <button className="btn-primary" onClick={() => nav("quizmc")}
                    style={{ background: `linear-gradient(135deg, ${l.color}, ${l.color}cc)` }}>
                    {l.done ? "Review Lesson" : "Start Lesson →"}
                  </button>
                </div>
              )}
            </button>
          </div>
        ))}
      </div>

      <BottomNav active="lessons" nav={nav} />
    </div>
  );
}
