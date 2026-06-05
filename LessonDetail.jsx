import { useState } from "react";
import { senya_teaching, senya_logo } from "./images";

export default function LessonDetail({ lesson, nav, onBack }) {
  const [signIdx, setSignIdx] = useState(0);
  const [viewed, setViewed] = useState(new Set());
  const [finished, setFinished] = useState(false);

  const sign = lesson.signs[signIdx];
  const allViewed = viewed.size >= lesson.signs.length;

  const goTo = (i) => {
    setSignIdx(i);
    setViewed(prev => new Set([...prev, i]));
  };

  const next = () => {
    const nextIdx = signIdx + 1;
    if (nextIdx < lesson.signs.length) {
      goTo(nextIdx);
    } else {
      setFinished(true);
    }
  };

  // Mark first sign as viewed on load
  useState(() => { setViewed(new Set([0])); }, []);

  if (finished) {
    return (
      <div className="screen" style={{
        background: "linear-gradient(160deg, #EFF6FF, #F9FAFB)",
        alignItems: "center", justifyContent: "center",
        padding: 32, textAlign: "center"
      }}>
        <img src={senya_teaching} alt="Senya" style={{
          width: 130, height: 130, objectFit: "contain",
          animation: "senya-bob 2.5s ease-in-out infinite"
        }} />
        <h2 style={{ fontFamily: "var(--font-head)", fontSize: 26, fontWeight: 800,
          color: "#111827", marginTop: 16 }}>
          Signs Learned! 🎉
        </h2>
        <p style={{ fontSize: 15, color: "#6B7280", marginTop: 8, lineHeight: 1.6, fontWeight: 500 }}>
          You've reviewed all {lesson.signs.length} signs in <strong>{lesson.title}</strong>.
          Ready to test yourself?
        </p>

        <div style={{
          background: "#fff", borderRadius: 20, padding: 20, margin: "20px 0",
          boxShadow: "0 4px 16px rgba(0,0,0,0.06)", width: "100%",
          border: "1px solid #E5E7EB"
        }}>
          <div style={{ display: "flex", justifyContent: "space-around" }}>
            {[
              { label: "Signs", value: lesson.signs.length, icon: "✋" },
              { label: "XP Earned", value: `+${lesson.xp}`, icon: "⚡" },
              { label: "Time", value: lesson.duration, icon: "⏱" },
            ].map((s, i) => (
              <div key={i} style={{ textAlign: "center" }}>
                <div style={{ fontSize: 22 }}>{s.icon}</div>
                <div style={{ fontFamily: "var(--font-head)", fontSize: 22,
                  fontWeight: 800, color: "#111827" }}>{s.value}</div>
                <div style={{ fontSize: 11, color: "#9CA3AF", fontWeight: 600 }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ width: "100%", display: "flex", flexDirection: "column", gap: 12 }}>
          <button className="btn-primary" onClick={() => nav("quizmc")}>
            Take the Quiz →
          </button>
          <button className="btn-ghost" onClick={() => { setFinished(false); setSignIdx(0); setViewed(new Set([0])); }}>
            Review Again ↺
          </button>
          <button className="btn-ghost" onClick={onBack}>
            Back to Lessons
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="screen" style={{ background: "#F9FAFB" }}>
      {/* Header */}
      <div style={{
        background: `linear-gradient(135deg, ${lesson.color}cc, ${lesson.color})`,
        padding: "52px 24px 24px"
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
          <button onClick={onBack} style={{
            background: "rgba(255,255,255,0.2)", border: "none", borderRadius: 10,
            width: 36, height: 36, cursor: "pointer", fontSize: 18, color: "#fff",
            display: "flex", alignItems: "center", justifyContent: "center"
          }}>←</button>
          <div style={{ flex: 1 }}>
            <h1 style={{ fontFamily: "var(--font-head)", fontSize: 20, fontWeight: 800, color: "#fff" }}>
              {lesson.title}
            </h1>
            <p style={{ color: "rgba(255,255,255,0.75)", fontSize: 12, fontWeight: 500, marginTop: 2 }}>
              {lesson.category} · {lesson.signs.length} signs · +{lesson.xp} XP
            </p>
          </div>
          <img src={senya_logo} alt="Senya" style={{
            width: 44, height: 44, objectFit: "contain",
            animation: "senya-bob 2.5s ease-in-out infinite"
          }} />
        </div>

        {/* Progress dots */}
        <div style={{ display: "flex", gap: 6 }}>
          {lesson.signs.map((_, i) => (
            <div key={i} onClick={() => goTo(i)} style={{
              flex: 1, height: 6, borderRadius: 3, cursor: "pointer",
              background: i === signIdx
                ? "#fff"
                : viewed.has(i)
                ? "rgba(255,255,255,0.6)"
                : "rgba(255,255,255,0.25)",
              transition: "all 0.3s"
            }} />
          ))}
        </div>
        <p style={{ color: "rgba(255,255,255,0.7)", fontSize: 11, fontWeight: 600, marginTop: 6 }}>
          {signIdx + 1} of {lesson.signs.length}
        </p>
      </div>

      {/* Sign Card */}
      <div style={{ padding: "20px 24px", flex: 1 }}>
        <div style={{
          background: "#fff", borderRadius: 24, padding: 28, textAlign: "center",
          boxShadow: "0 6px 24px rgba(0,0,0,0.08)",
          border: "1px solid #F3F4F6", marginBottom: 16,
          animation: "fadeIn 0.3s ease"
        }} key={signIdx}>
          {/* Big emoji / sign display */}
          <div style={{
            width: 120, height: 120, borderRadius: "50%",
            background: `${lesson.color}12`,
            display: "flex", alignItems: "center", justifyContent: "center",
            margin: "0 auto 16px", fontSize: 64,
            boxShadow: `0 4px 20px ${lesson.color}20`
          }}>
            {sign.emoji}
          </div>

          <div style={{
            display: "inline-block",
            background: `${lesson.color}18`, borderRadius: 12,
            padding: "6px 20px", marginBottom: 12
          }}>
            <span style={{ fontFamily: "var(--font-head)", fontSize: 28,
              fontWeight: 900, color: lesson.color }}>
              {sign.letter}
            </span>
          </div>

          <p style={{ fontSize: 15, color: "#4B5563", lineHeight: 1.7,
            fontWeight: 500, marginTop: 4 }}>
            {sign.hint}
          </p>
        </div>

        {/* Senya tip bubble */}
        <div style={{
          display: "flex", gap: 10, alignItems: "flex-start",
          background: "#F0F9FF", borderRadius: 16, padding: 14,
          border: "1px solid #BAE6FD", marginBottom: 20
        }}>
          <img src={senya_logo} alt="" style={{
            width: 32, height: 32, objectFit: "contain", flexShrink: 0
          }} />
          <p style={{ fontSize: 13, color: "#0369A1", fontWeight: 600, lineHeight: 1.5 }}>
            💡 Practice this sign slowly at first. Watch the shape of your fingers carefully before speeding up!
          </p>
        </div>

        {/* Sign thumbnail strip */}
        <div>
          <p style={{ fontSize: 12, fontWeight: 700, color: "#9CA3AF", marginBottom: 10,
            textTransform: "uppercase", letterSpacing: "0.05em" }}>All signs in this lesson:</p>
          <div style={{ display: "flex", gap: 8, overflowX: "auto", paddingBottom: 4 }}>
            {lesson.signs.map((s, i) => (
              <button key={i} onClick={() => goTo(i)} style={{
                flexShrink: 0, width: 56, height: 56, borderRadius: 14,
                background: i === signIdx ? lesson.color : viewed.has(i) ? `${lesson.color}20` : "#F3F4F6",
                border: i === signIdx ? `2px solid ${lesson.color}` : "2px solid transparent",
                display: "flex", flexDirection: "column", alignItems: "center",
                justifyContent: "center", cursor: "pointer", gap: 2, transition: "all 0.2s"
              }}>
                <span style={{ fontSize: 20 }}>{s.emoji}</span>
                <span style={{
                  fontSize: 10, fontWeight: 700,
                  color: i === signIdx ? "#fff" : "#6B7280"
                }}>{s.letter}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom nav */}
      <div style={{ padding: "0 24px 40px", display: "flex", gap: 12 }}>
        {signIdx > 0 && (
          <button className="btn-ghost" onClick={() => goTo(signIdx - 1)}
            style={{ flex: 1 }}>← Back</button>
        )}
        <button className="btn-primary" onClick={next} style={{
          flex: 2,
          background: `linear-gradient(135deg, ${lesson.color}, ${lesson.color}cc)`
        }}>
          {signIdx < lesson.signs.length - 1 ? "Next Sign →" : "Finish Lesson ✓"}
        </button>
      </div>
    </div>
  );
}
