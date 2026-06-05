import { useEffect } from "react";
import { senya_logo } from "./images";

export default function Splash({ nav }) {
  useEffect(() => {
    const t = setTimeout(() => nav("onboarding"), 2200);
    return () => clearTimeout(t);
  }, [nav]);

  return (
    <div style={{
      width: "100%", height: "100%",
      background: "linear-gradient(160deg, #1D4ED8 0%, #3B82F6 60%, #60A5FA 100%)",
      display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center",
      gap: 0, position: "relative", overflow: "hidden"
    }}>
      {/* BG circles */}
      {[
        { size: 240, top: -60, right: -60, opacity: 0.08 },
        { size: 160, bottom: 40, left: -40, opacity: 0.06 },
        { size: 80, top: 120, left: 40, opacity: 0.05 },
      ].map((c, i) => (
        <div key={i} style={{
          position: "absolute",
          width: c.size, height: c.size, borderRadius: "50%",
          background: "#fff", opacity: c.opacity,
          top: c.top, bottom: c.bottom, left: c.left, right: c.right
        }} />
      ))}

      {/* Logo */}
      <div style={{
        animation: "splashPop 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) 0.2s both"
      }}>
        <img src={senya_logo} alt="Senya" style={{
          width: 110, height: 110, objectFit: "contain",
          filter: "drop-shadow(0 8px 24px rgba(0,0,0,0.25))"
        }} />
      </div>

      <div style={{ animation: "fadeIn 0.5s ease 0.7s both", textAlign: "center", marginTop: 16 }}>
        <h1 style={{
          fontFamily: "var(--font-head)", fontSize: 40, fontWeight: 900,
          color: "#fff", letterSpacing: "-0.5px", lineHeight: 1
        }}>SEÑAS</h1>
        <p style={{ color: "rgba(255,255,255,0.75)", fontSize: 14, fontWeight: 500, marginTop: 6 }}>
          Filipino Sign Language Learning
        </p>
      </div>

      {/* Loading dots */}
      <div style={{
        display: "flex", gap: 8, marginTop: 48,
        animation: "fadeIn 0.4s ease 1.2s both"
      }}>
        {[0, 1, 2].map(i => (
          <div key={i} style={{
            width: 8, height: 8, borderRadius: "50%",
            background: "rgba(255,255,255,0.5)",
            animation: `dotBounce 1s ease-in-out ${i * 0.2}s infinite`
          }} />
        ))}
      </div>

      <style>{`
        @keyframes splashPop {
          from { transform: scale(0.4); opacity: 0; }
          to   { transform: scale(1);   opacity: 1; }
        }
        @keyframes dotBounce {
          0%, 100% { transform: translateY(0); opacity: 0.5; }
          50%       { transform: translateY(-8px); opacity: 1; }
        }
      `}</style>
    </div>
  );
}
