import { useState, useEffect } from "react";

/**
 * SplashScreen
 * Props:
 *   onDone — called when animation finishes, transitions to OnboardingSlides
 */
export default function SplashScreen({ onDone }) {
  const [phase, setPhase] = useState(0);
  // phase 0 → logo fades + scales in
  // phase 1 → tagline slides up
  // phase 2 → ripple rings expand
  // phase 3 → whole screen fades to white → onDone()

  useEffect(() => {
    let done = false;
    const t = [
      setTimeout(() => setPhase(1), 700),
      setTimeout(() => setPhase(2), 1500),
      setTimeout(() => setPhase(3), 2800),
      setTimeout(() => { if (!done) { done = true; onDone && onDone(); } }, 3400),
    ];
    return () => t.forEach(clearTimeout);
  }, []);

  return (
    <div style={{
      position: "fixed", inset: 0, zIndex: 9999,
      background: phase >= 3
        ? "#fff"
        : "linear-gradient(160deg,#0f2044 0%,#1035a0 45%,#1848c8 100%)",
      display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center",
      transition: phase >= 3 ? "background 0.5s ease" : "none",
      overflow: "hidden",
    }}>

      {/* Ambient glow blobs */}
      <div style={{ position:"absolute", top:"-15%", left:"-10%", width:"55%", aspectRatio:"1",
        borderRadius:"50%", background:"rgba(96,165,250,0.12)", filter:"blur(60px)", pointerEvents:"none" }} />
      <div style={{ position:"absolute", bottom:"-10%", right:"-10%", width:"50%", aspectRatio:"1",
        borderRadius:"50%", background:"rgba(251,191,36,0.08)", filter:"blur(50px)", pointerEvents:"none" }} />

      {/* Ripple rings */}
      {phase >= 2 && [0,1,2].map(i => (
        <div key={i} style={{
          position: "absolute",
          width: 200, height: 200,
          borderRadius: "50%",
          border: "1.5px solid rgba(255,255,255,0.18)",
          animation: `splashRipple 1.6s cubic-bezier(0.2,0.6,0.4,1) ${i*0.22}s infinite`,
          pointerEvents: "none",
        }} />
      ))}

      {/* Logo */}
      <div style={{
        position: "relative",
        animation: phase >= 1 ? "splashLogoIn 0.7s cubic-bezier(0.34,1.3,0.64,1)" : "none",
        opacity: phase >= 1 ? 1 : 0,
        transform: phase >= 3 ? "scale(0.7)" : "scale(1)",
        transition: phase >= 3 ? "transform 0.5s ease, opacity 0.5s ease" : "none",
      }}>
        {/* Glow ring behind logo */}
        <div style={{
          position: "absolute", inset: -16,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(96,165,250,0.25) 0%, transparent 70%)",
          filter: "blur(8px)",
          animation: "splashPulse 2.5s ease-in-out infinite",
        }} />
        <img
          src="./public/img/senyas_logo.png"
          alt="SEÑAS"
          style={{
            width: 130, height: 130, objectFit: "contain",
            filter: "drop-shadow(0 12px 32px rgba(0,0,0,0.35))",
            position: "relative",
            animation: phase >= 1 ? "senyaBob 3s ease-in-out infinite" : "none",
          }}
        />
      </div>

      {/* App name */}
      <div style={{
        marginTop: 24,
        opacity: phase >= 1 ? 1 : 0,
        transform: phase >= 1 ? "translateY(0)" : "translateY(20px)",
        transition: "opacity 0.6s ease 0.1s, transform 0.6s ease 0.1s",
        textAlign: "center",
      }}>
        <h1 style={{
          fontSize: 42, fontWeight: 900, letterSpacing: 6,
          color: "#fff", margin: 0, lineHeight: 1,
          textShadow: "0 4px 24px rgba(0,0,0,0.3)",
        }}>SEÑAS</h1>
        <p style={{
          color: "rgba(255,255,255,0.55)", fontSize: 13,
          fontWeight: 500, letterSpacing: 2,
          marginTop: 4, textTransform: "uppercase",
        }}>Filipino Sign Language</p>
      </div>

      {/* Tagline */}
      <div style={{
        marginTop: 16,
        opacity: phase >= 2 ? 1 : 0,
        transform: phase >= 2 ? "translateY(0)" : "translateY(12px)",
        transition: "opacity 0.5s ease, transform 0.5s ease",
        textAlign: "center", padding: "0 40px",
      }}>
        <p style={{
          color: "rgba(255,255,255,0.65)", fontSize: 14,
          fontWeight: 500, lineHeight: 1.6, margin: 0,
        }}>
          Learn · Practice · Connect
        </p>
      </div>

      {/* Loading dots */}
      {phase >= 2 && phase < 3 && (
        <div style={{ display:"flex", gap:6, marginTop:48 }}>
          {[0,1,2].map(i => (
            <div key={i} style={{
              width:6, height:6, borderRadius:"50%",
              background:"rgba(255,255,255,0.5)",
              animation:`splashDot 1.2s ease-in-out ${i*0.2}s infinite`,
            }} />
          ))}
        </div>
      )}

      <style>{`
        @keyframes splashLogoIn {
          0%   { transform: scale(0.3) rotate(-20deg); opacity: 0; }
          70%  { transform: scale(1.08) rotate(3deg); opacity: 1; }
          100% { transform: scale(1) rotate(0deg); opacity: 1; }
        }
        @keyframes splashRipple {
          0%   { transform: scale(1);   opacity: 0.6; }
          100% { transform: scale(3.5); opacity: 0; }
        }
        @keyframes splashPulse {
          0%,100% { opacity: 0.6; transform: scale(1); }
          50%     { opacity: 1;   transform: scale(1.12); }
        }
        @keyframes splashDot {
          0%,80%,100% { transform: scale(0.6); opacity: 0.3; }
          40%         { transform: scale(1.2); opacity: 1; }
        }
        @keyframes senyaBob {
          0%,100% { transform: translateY(0); }
          50%     { transform: translateY(-8px); }
        }
      `}</style>
    </div>
  );
}
