import { useState } from "react";
import { senya_blue, senya_teaching, senya_logo } from "./images";

const slides = [
  {
    img: senya_logo,
    title: "Welcome to SEÑAS!",
    subtitle: "Your friendly Filipino Sign Language learning companion",
    accent: "#3B82F6",
    bg: "linear-gradient(160deg, #EFF6FF 0%, #DBEAFE 100%)",
  },
  {
    img: senya_teaching,
    title: "Learn at Your Own Pace",
    subtitle: "Watch, practice, and master FSL with interactive lessons and real-time feedback",
    accent: "#F59E0B",
    bg: "linear-gradient(160deg, #FFFBEB 0%, #FEF3C7 100%)",
  },
  {
    img: senya_blue,
    title: "Earn Badges & Grow!",
    subtitle: "Track your progress, collect achievements, and celebrate every milestone",
    accent: "#10B981",
    bg: "linear-gradient(160deg, #ECFDF5 0%, #D1FAE5 100%)",
  },
];

export default function Onboarding({ nav }) {
  const [idx, setIdx] = useState(0);
  const slide = slides[idx];

  const next = () => {
    if (idx < slides.length - 1) setIdx(idx + 1);
    else nav("login");
  };

  return (
    <div className="screen" style={{ background: slide.bg, transition: "background 0.5s" }}>
      {/* Skip */}
      <div style={{ display: "flex", justifyContent: "flex-end", padding: "52px 24px 0" }}>
        <button
          onClick={() => nav("login")}
          style={{ background: "rgba(0,0,0,0.06)", border: "none", borderRadius: 20,
            padding: "6px 16px", fontSize: 13, fontWeight: 600, color: "#6B7280",
            fontFamily: "var(--font-body)", cursor: "pointer" }}
        >Skip</button>
      </div>

      {/* Mascot */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center",
        justifyContent: "center", padding: "0 32px", gap: 24 }}>
        <div style={{ position: "relative" }}>
          <div style={{
            width: 200, height: 200, borderRadius: "50%",
            background: "rgba(255,255,255,0.5)", backdropFilter: "blur(8px)",
            display: "flex", alignItems: "center", justifyContent: "center",
            boxShadow: "0 8px 32px rgba(0,0,0,0.08)"
          }}>
            <img src={slide.img} alt="Senya" style={{
              width: 180, height: 180, objectFit: "contain",
              animation: "senya-bob 2.5s ease-in-out infinite"
            }} />
          </div>
        </div>

        <div style={{ textAlign: "center", animation: "fadeIn 0.4s ease" }} key={idx}>
          <h1 style={{
            fontFamily: "var(--font-head)", fontSize: 28, fontWeight: 800,
            color: "#111827", marginBottom: 12, lineHeight: 1.2
          }}>{slide.title}</h1>
          <p style={{ fontSize: 15, color: "#4B5563", lineHeight: 1.6, fontWeight: 500 }}>
            {slide.subtitle}
          </p>
        </div>

        {/* Dots */}
        <div style={{ display: "flex", gap: 8, marginTop: 8 }}>
          {slides.map((_, i) => (
            <div key={i} onClick={() => setIdx(i)} style={{
              width: i === idx ? 24 : 8, height: 8,
              borderRadius: 4, cursor: "pointer",
              background: i === idx ? slide.accent : "#D1D5DB",
              transition: "all 0.3s"
            }} />
          ))}
        </div>
      </div>

      {/* CTA */}
      <div style={{ padding: "0 24px 48px" }}>
        <button className="btn-primary" onClick={next}
          style={{ background: `linear-gradient(135deg, ${slide.accent}, ${shade(slide.accent)})` }}>
          {idx < slides.length - 1 ? "Next →" : "Get Started!"}
        </button>
        {idx === 0 && (
          <button className="btn-ghost" onClick={() => nav("login")}
            style={{ marginTop: 12 }}>
            I already have an account
          </button>
        )}
      </div>
    </div>
  );
}

function shade(hex) {
  // Simple darkening
  const map = { "#3B82F6": "#1D4ED8", "#F59E0B": "#B45309", "#10B981": "#047857" };
  return map[hex] || "#1D4ED8";
}
