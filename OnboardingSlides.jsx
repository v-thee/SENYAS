import { useState, useEffect, useRef } from "react";

const SLIDES = [
  {
    id: 0,
    senya: "./img/senya_blue.png",
    senyaStyle: { width:160, height:160, bottom:0, right:0 },
    accent: "#2563EB",
    accentLight: "rgba(37,99,235,0.10)",
    tag: "Welcome",
    title: "Your gateway to Filipino Sign Language",
    body: "SEÑAS is a learning platform that makes FSL accessible to everyone — students, teachers, and curious learners alike.",
    bubbleText: "Hi, I'm Senya! I'll be with you every step of the way. 👋",
    bg: "linear-gradient(160deg,#a8d4f5 0%,#c5e3f7 30%,#daeefb 65%,#f0f8ff 100%)",
  },
  {
    id: 1,
    senya: "./img/senya_teaching.png",
    senyaStyle: { width:150, height:150, bottom:0, right:-8 },
    accent: "#059669",
    accentLight: "rgba(5,150,105,0.10)",
    tag: "Learn",
    title: "Interactive lessons at your own pace",
    body: "Work through structured modules on the FSL alphabet, greetings, numbers, and more. Each lesson builds on the last.",
    bubbleText: "Every expert was once a beginner. Let's start small! ✏️",
    bg: "linear-gradient(160deg,#a8f0d0 0%,#c5f0e0 30%,#dafaed 65%,#f0fff8 100%)",
    highlights: ["FSL Alphabet","Greetings","Numbers","Classroom Signs"],
  },
  {
    id: 2,
    senya: "./img/senya_magnify.png",
    senyaStyle: { width:155, height:155, bottom:0, right:-4 },
    accent: "#F59E0B",
    accentLight: "rgba(245,158,11,0.10)",
    tag: "Practice",
    title: "Real-time hand sign recognition",
    body: "Use your camera to practice hand signs. SEÑAS watches your gestures and gives you instant feedback on your form.",
    bubbleText: "Hold your hand steady and I'll tell you how you did! 🔍",
    bg: "linear-gradient(160deg,#fef3c7 0%,#fde68a 20%,#fefce8 55%,#fffdf0 100%)",
    highlights: ["Camera detection","Live scoring","Form feedback"],
  },
  {
    id: 3,
    senya: "./img/senya_blue.png",
    senyaStyle: { width:160, height:160, bottom:0, right:0 },
    accent: "#8B5CF6",
    accentLight: "rgba(139,92,246,0.10)",
    tag: "Achieve",
    title: "Earn badges, level up, stay motivated",
    body: "Track your XP, collect achievement badges, and maintain learning streaks. Celebrate every milestone on your FSL journey.",
    bubbleText: "I'll cheer you on every step of the way! 🏆",
    bg: "linear-gradient(160deg,#ede9fe 0%,#ddd6fe 20%,#f5f3ff 60%,#fafafa 100%)",
    highlights: ["XP system","Achievement badges","Daily streaks"],
  },
];

function GlassCard({ children, style }) {
  return (
    <div style={{
      background:"rgba(255,255,255,0.62)",
      border:"1px solid rgba(255,255,255,0.85)",
      borderRadius:20,
      backdropFilter:"blur(10px)",
      boxShadow:"0 2px 14px rgba(15,49,114,0.10)",
      ...style,
    }}>{children}</div>
  );
}

function PressBtn({ onClick, children, style, variant="primary" }) {
  const [p,setP] = useState(false);
  const base = variant==="primary"
    ? { background:"linear-gradient(135deg,#1035a0,#1848c8,#2563EB)", color:"#fff", boxShadow:"0 5px 18px rgba(15,49,114,0.28)" }
    : { background:"rgba(255,255,255,0.62)", color:"#0f3172", border:"1px solid rgba(255,255,255,0.85)", backdropFilter:"blur(8px)" };
  return (
    <button onClick={onClick}
      onPointerDown={()=>setP(true)} onPointerUp={()=>setP(false)} onPointerLeave={()=>setP(false)}
      style={{ ...base, ...style, border:base.border||"none", borderRadius:60,
        cursor:"pointer", fontWeight:700, fontSize:15,
        display:"flex", alignItems:"center", justifyContent:"center", gap:8,
        transform:p?"scale(0.96)":"scale(1)", transition:"transform 0.12s ease",
        outline:"none", WebkitTapHighlightColor:"transparent" }}>
      {children}
    </button>
  );
}

/**
 * OnboardingSlides
 * Props:
 *   onDone — called when user taps "Get Started" on last slide → goes to RoleSelect
 */
export default function OnboardingSlides({ onDone }) {
  const [current, setCurrent] = useState(0);
  const [animDir, setAnimDir] = useState(1); // 1=forward -1=back
  const [visible, setVisible] = useState(true);
  const slide = SLIDES[current];
  const isLast = current === SLIDES.length - 1;

  const goTo = (idx) => {
    if (idx === current) return;
    setAnimDir(idx > current ? 1 : -1);
    setVisible(false);
    setTimeout(() => { setCurrent(idx); setVisible(true); }, 220);
  };

  const next = () => {
    if (isLast) { onDone(); return; }
    goTo(current + 1);
  };
  const back = () => { if (current > 0) goTo(current - 1); };

  const skip = () => onDone();

  return (
    <div style={{
      minHeight:"100vh", width:"100%",
      background: slide.bg,
      display:"flex", flexDirection:"column",
      transition:"background 0.5s ease",
      position:"relative", overflow:"hidden",
    }}>
      {/* Top bar */}
      <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between",
        padding:"52px 20px 0", flexShrink:0 }}>
        <span style={{ color:"#0f3172", fontSize:22, fontWeight:800, letterSpacing:2 }}>SEÑAS</span>
        {!isLast && (
          <button onClick={skip} style={{ background:"rgba(255,255,255,0.55)", border:"1px solid rgba(255,255,255,0.85)",
            borderRadius:20, padding:"6px 16px", color:"#4b7bbb", fontSize:13,
            fontWeight:600, cursor:"pointer", backdropFilter:"blur(8px)" }}>
            Skip
          </button>
        )}
      </div>

      {/* Dot indicators */}
      <div style={{ display:"flex", justifyContent:"center", gap:6, padding:"20px 0 0" }}>
        {SLIDES.map((_,i) => (
          <div key={i} onClick={()=>goTo(i)} style={{
            width: i===current?24:8, height:8, borderRadius:99,
            background: i<=current ? slide.accent : "rgba(15,49,114,0.15)",
            cursor:"pointer", transition:"all 0.3s ease",
          }} />
        ))}
      </div>

      {/* Main card — animated on transition */}
      <div style={{
        flex:1, padding:"16px 16px 0",
        display:"flex", flexDirection:"column",
        opacity: visible ? 1 : 0,
        transform: visible
          ? "translateX(0) scale(1)"
          : `translateX(${animDir*30}px) scale(0.97)`,
        transition:"opacity 0.22s ease, transform 0.22s ease",
      }}>
        <GlassCard style={{ padding:"22px 20px", position:"relative", overflow:"hidden", flex:1, display:"flex", flexDirection:"column" }}>
          {/* Accent top bar */}
          <div style={{ position:"absolute", top:0, left:0, right:0, height:4,
            background:`linear-gradient(90deg,${slide.accent},${slide.accent}66)`,
            borderRadius:"20px 20px 0 0" }} />

          {/* Tag */}
          <div style={{ display:"inline-flex", alignItems:"center", gap:6,
            background:slide.accentLight, borderRadius:8,
            padding:"4px 12px", marginBottom:10, alignSelf:"flex-start" }}>
            <div style={{ width:6, height:6, borderRadius:"50%", background:slide.accent }} />
            <span style={{ fontSize:11, fontWeight:800, color:slide.accent, letterSpacing:0.8 }}>
              {slide.tag.toUpperCase()}
            </span>
          </div>

          <h2 style={{ fontSize:22, fontWeight:800, color:"#0f3172",
            fontFamily:"var(--font-head)", lineHeight:1.25, marginBottom:10 }}>
            {slide.title}
          </h2>

          <p style={{ fontSize:14, color:"#334155", lineHeight:1.7, marginBottom:14 }}>
            {slide.body}
          </p>

          {/* Feature chips */}
          {slide.highlights && (
            <div style={{ display:"flex", gap:7, flexWrap:"wrap", marginBottom:14 }}>
              {slide.highlights.map((h,i) => (
                <div key={i} style={{
                  background:slide.accentLight, borderRadius:99,
                  padding:"5px 12px", fontSize:12, fontWeight:700, color:slide.accent,
                  border:`1px solid ${slide.accent}22`,
                }}>✦ {h}</div>
              ))}
            </div>
          )}

          {/* Senya illustration — right aligned, sits at bottom of card */}
          <div style={{ flex:1, display:"flex", alignItems:"flex-end", justifyContent:"flex-end",
            position:"relative", minHeight:130 }}>
            <img src={slide.senya} alt="Senya"
              style={{
                objectFit:"contain",
                filter:`drop-shadow(0 8px 20px rgba(15,49,114,0.18))`,
                animation:"senyaBob 3s ease-in-out infinite",
                ...slide.senyaStyle,
              }} />
          </div>
        </GlassCard>
      </div>

      {/* Senya speech bubble */}
      <div style={{ padding:"12px 16px 0", display:"flex", alignItems:"flex-end", gap:10,
        opacity:visible?1:0, transition:"opacity 0.3s ease 0.1s" }}>
        <img src="./img/senyas_logo.png" alt="Senya"
          style={{ width:52, height:52, objectFit:"contain",
            animation:"senyaBob 2.8s ease-in-out infinite", flexShrink:0 }} />
        <GlassCard style={{ flex:1, padding:"10px 14px", borderRadius:"14px 14px 14px 4px",
          position:"relative" }}>
          {/* Tail */}
          <div style={{ position:"absolute", left:-6, bottom:10, width:0, height:0,
            borderTop:"6px solid transparent", borderBottom:"6px solid transparent",
            borderRight:"6px solid rgba(200,220,245,0.7)" }} />
          <div style={{ position:"absolute", left:-4, bottom:11, width:0, height:0,
            borderTop:"5px solid transparent", borderBottom:"5px solid transparent",
            borderRight:"5px solid rgba(255,255,255,0.62)" }} />
          <p style={{ fontSize:12.5, color:"#0f3172", fontWeight:500, lineHeight:1.5, margin:0 }}>
            {slide.bubbleText}
          </p>
        </GlassCard>
      </div>

      {/* Nav buttons */}
      <div style={{ padding:"14px 16px 28px", display:"flex", gap:10 }}>
        {current > 0 && (
          <PressBtn onClick={back} variant="ghost" style={{ flex:1, padding:"13px" }}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/>
            </svg>
            Back
          </PressBtn>
        )}
        <PressBtn onClick={next} style={{ flex:2, padding:"14px",
          background:isLast
            ? "linear-gradient(135deg,#D97706,#F59E0B)"
            : "linear-gradient(135deg,#1035a0,#1848c8,#2563EB)",
          boxShadow:isLast?"0 5px 16px rgba(245,158,11,0.35)":"0 5px 18px rgba(15,49,114,0.28)",
          color:"#fff" }}>
          {isLast ? "Get Started 🤙" : "Next"}
          {!isLast && (
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
            </svg>
          )}
        </PressBtn>
      </div>

      <style>{`
        @keyframes senyaBob { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-8px)} }
      `}</style>
    </div>
  );
}
