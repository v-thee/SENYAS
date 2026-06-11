import { useState, useEffect } from "react";

/**
 * RoleSelect
 * Props:
 *   onStudent  — navigate to existing Onboarding.jsx
 *   onTeacher  — show teacher popup (handled internally; no redirect)
 *
 * Responsive: mobile-first card layout that widens on desktop (≥768px).
 */
export default function RoleSelect({ onStudent }) {
  const [isMobile, setIsMobile]     = useState(window.innerWidth < 768);
  const [selected, setSelected]     = useState(null);   // "student" | "teacher"
  const [showPopup, setShowPopup]   = useState(false);
  const [popupStep, setPopupStep]   = useState(0);       // 0=idle 1=entering 2=visible
  const [cardAnim, setCardAnim]     = useState(false);

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    // stagger card entrance
    const t = setTimeout(() => setCardAnim(true), 120);
    return () => clearTimeout(t);
  }, []);

  const pickRole = (role) => {
    setSelected(role);
    if (role === "teacher") {
      setShowPopup(true);
      setTimeout(() => setPopupStep(1), 10);
      setTimeout(() => setPopupStep(2), 180);
    }
    if (role === "student") {
      setTimeout(() => onStudent(), 350);
    }
  };

  const closePopup = () => {
    setPopupStep(1);
    setTimeout(() => { setPopupStep(0); setShowPopup(false); setSelected(null); }, 250);
  };

  /* ── Layout tokens ── */
  const maxW      = isMobile ? "100%" : 480;
  const px        = isMobile ? 20 : 32;
  const cardGap   = isMobile ? 14 : 20;
  const heroSize  = isMobile ? 100 : 130;
  const titleSize = isMobile ? 24 : 30;

  return (
    <div style={{
      minHeight:"100vh", width:"100%",
      background:"linear-gradient(180deg,#a8d4f5 0%,#c5e3f7 25%,#daeefb 55%,#eaf5fd 80%,#f0f8ff 100%)",
      display:"flex", flexDirection:"column", alignItems:"center",
      position:"relative", overflow:"hidden",
    }}>
      {/* bg blobs */}
      <div style={{ position:"absolute", top:-80, left:-80, width:320, height:320,
        borderRadius:"50%", background:"rgba(37,99,235,0.07)", filter:"blur(40px)", pointerEvents:"none" }} />
      <div style={{ position:"absolute", bottom:-60, right:-60, width:280, height:280,
        borderRadius:"50%", background:"rgba(245,158,11,0.07)", filter:"blur(40px)", pointerEvents:"none" }} />

      {/* ── Content wrapper — constrained width on desktop ── */}
      <div style={{ width:"100%", maxWidth:maxW, padding:`52px ${px}px 40px`, display:"flex", flexDirection:"column", flex:1 }}>

        {/* Top bar */}
        <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:isMobile?20:28 }}>
          <span style={{ color:"#0f3172", fontSize:22, fontWeight:800, letterSpacing:2 }}>SEÑAS</span>
          <div style={{ display:"flex", gap:8, alignItems:"center" }}>
            <button style={{ background:"none", border:"none", cursor:"pointer", padding:2 }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#4b7bbb" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"/>
                <line x1="12" y1="8" x2="12" y2="8" strokeWidth="3"/>
                <line x1="12" y1="12" x2="12" y2="16"/>
              </svg>
            </button>
          </div>
        </div>

        {/* Hero */}
        <div style={{ display:"flex", flexDirection:"column", alignItems:"center", textAlign:"center", marginBottom:isMobile?24:32 }}>
          <div style={{ position:"relative", marginBottom:14 }}>
            {/* glow */}
            <div style={{ position:"absolute", inset:-20, borderRadius:"50%",
              background:"radial-gradient(circle,rgba(37,99,235,0.15) 0%,transparent 70%)",
              filter:"blur(10px)" }} />
            <img src="./img/senya_blue.png" alt="Senya"
              style={{ width:heroSize, height:heroSize, objectFit:"contain",
                filter:"drop-shadow(0 8px 24px rgba(15,49,114,0.20))",
                animation:"senyaBob 3s ease-in-out infinite", position:"relative" }} />
          </div>

          <div style={{
            display:"inline-flex", alignItems:"center", gap:6,
            background:"rgba(15,49,114,0.08)", borderRadius:99,
            padding:"4px 14px", marginBottom:10,
          }}>
            <div style={{ width:6, height:6, borderRadius:"50%", background:"#1848c8",
              animation:"pulse 2s ease-in-out infinite" }} />
            <span style={{ fontSize:11, fontWeight:800, color:"#1848c8", letterSpacing:0.8 }}>
              CHOOSE YOUR ROLE
            </span>
          </div>

          <h1 style={{ fontSize:titleSize, fontWeight:800, color:"#0f3172",
            fontFamily:"var(--font-head)", lineHeight:1.2, margin:"0 0 8px" }}>
            Who are you learning for?
          </h1>
          <p style={{ fontSize:14, color:"#4b7bbb", fontWeight:500, lineHeight:1.6, maxWidth:300, margin:0 }}>
            Your experience will be tailored to your role.
          </p>
        </div>

        {/* Role cards */}
        <div style={{ display:"flex", flexDirection:"column", gap:cardGap }}>

          {/* ── STUDENT CARD ── */}
          <RoleCard
            role="student"
            selected={selected}
            visible={cardAnim}
            delay={0}
            onClick={()=>pickRole("student")}
            accent="#2563EB"
            accentLight="rgba(37,99,235,0.08)"
            borderActive="#93C5FD"
            icon={
              <img src="./img/student.png" alt="Student Senya"
                style={{ width:72, height:72, objectFit:"contain",
                  filter:"drop-shadow(0 4px 12px rgba(15,49,114,0.18))",
                  animation:"senyaBob 2.5s ease-in-out infinite" }} />
            }
            label="STUDENT"
            title="I'm here to learn"
            desc="Access lessons, quizzes, gesture recognition, and earn badges as you progress through FSL."
            chips={["Self-paced lessons","Hand-sign quizzes","Achievement badges"]}
            cta="Start Learning →"
            ctaStyle={{ background:"linear-gradient(135deg,#1035a0,#1848c8)", color:"#fff",
              boxShadow:"0 4px 16px rgba(15,49,114,0.28)" }}
          />

          {/* ── TEACHER CARD ── */}
          <RoleCard
            role="teacher"
            selected={selected}
            visible={cardAnim}
            delay={80}
            onClick={()=>pickRole("teacher")}
            accent="#059669"
            accentLight="rgba(5,150,105,0.08)"
            borderActive="#6EE7B7"
            icon={
              <img src="./img/teacher.png" alt="Teacher Senya"
                style={{ width:72, height:72, objectFit:"contain",
                  filter:"drop-shadow(0 4px 12px rgba(5,150,105,0.20))",
                  animation:"senyaBob 2.8s ease-in-out infinite" }} />
            }
            label="TEACHER"
            title="I'm here to teach"
            desc="Manage classes, monitor student progress, assign lessons, and track performance from a web dashboard."
            chips={["Class management","Student analytics","Progress tracking"]}
            cta="Go to Dashboard →"
            ctaStyle={{ background:"linear-gradient(135deg,#047857,#059669)", color:"#fff",
              boxShadow:"0 4px 16px rgba(5,150,105,0.28)" }}
            badge="Web"
          />
        </div>

        {/* Footer note */}
        <p style={{ textAlign:"center", fontSize:11, color:"#9CA3AF",
          fontWeight:500, marginTop:20, lineHeight:1.5 }}>
          You can always change your role in Settings later.
        </p>
      </div>

      {/* ══ TEACHER POPUP ══ */}
      {showPopup && (
        <>
          {/* Backdrop */}
          <div onClick={closePopup} style={{
            position:"fixed", inset:0, zIndex:400,
            background:"rgba(15,30,80,0.45)",
            backdropFilter:"blur(4px)",
            opacity: popupStep>=2?1:0,
            transition:"opacity 0.25s ease",
          }} />

          {/* Modal */}
          <div style={{
            position:"fixed",
            ...(isMobile
              ? { bottom:0, left:0, right:0, borderRadius:"28px 28px 0 0" }
              : { top:"50%", left:"50%", transform:`translate(-50%,${popupStep>=2?"-50%":"-40%"})`,
                  width:440, borderRadius:28 }),
            zIndex:500,
            background:"rgba(255,255,255,0.96)",
            backdropFilter:"blur(16px)",
            boxShadow:"0 24px 64px rgba(15,49,114,0.22)",
            padding:"28px 24px 32px",
            opacity: popupStep>=2?1:0,
            transition:"opacity 0.25s ease, transform 0.3s cubic-bezier(0.34,1.2,0.64,1)",
            ...(isMobile && {
              transform:`translateY(${popupStep>=2?0:"100%"})`,
              transition:"transform 0.35s cubic-bezier(0.34,1.2,0.64,1), opacity 0.25s ease",
            }),
          }}>
            {/* Handle (mobile only) */}
            {isMobile && (
              <div style={{ width:40, height:4, borderRadius:99, background:"#E5E7EB",
                margin:"0 auto 20px" }} />
            )}

            {/* Senya */}
            <div style={{ textAlign:"center", marginBottom:16 }}>
              <img src="./img/senyas_logo.png" alt="Senya"
                style={{ width:80, height:80, objectFit:"contain",
                  filter:"drop-shadow(0 4px 14px rgba(15,49,114,0.15))",
                  animation:"senyaBob 2.5s ease-in-out infinite" }} />
            </div>

            {/* Web badge */}
            <div style={{ display:"flex", justifyContent:"center", marginBottom:10 }}>
              <div style={{ display:"inline-flex", alignItems:"center", gap:6,
                background:"rgba(5,150,105,0.10)", borderRadius:8, padding:"4px 14px" }}>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#059669" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"/>
                  <line x1="2" y1="12" x2="22" y2="12"/>
                  <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
                </svg>
                <span style={{ fontSize:11, fontWeight:800, color:"#059669", letterSpacing:0.8 }}>
                  WEB DASHBOARD
                </span>
              </div>
            </div>

            <h2 style={{ fontSize:20, fontWeight:800, color:"#0f3172", textAlign:"center",
              marginBottom:8, fontFamily:"var(--font-head)" }}>
              You're heading to the teacher portal!
            </h2>
            <p style={{ fontSize:13, color:"#475569", textAlign:"center",
              lineHeight:1.7, marginBottom:20 }}>
              The SEÑAS teacher dashboard is a web-based platform. You'll be redirected to log in and manage your classes, track student progress, and assign lessons.
            </p>

            {/* Feature list */}
            <div style={{ background:"rgba(15,49,114,0.04)", borderRadius:16,
              padding:"14px 16px", marginBottom:20 }}>
              {[
                { icon:"📋", text:"Manage classes and student rosters" },
                { icon:"📊", text:"View detailed progress analytics" },
                { icon:"📝", text:"Assign and grade FSL lessons" },
                { icon:"🔔", text:"Send announcements to students" },
              ].map((item,i) => (
                <div key={i} style={{ display:"flex", alignItems:"center", gap:10,
                  padding:"7px 0", borderBottom:i<3?"0.5px solid rgba(15,49,114,0.08)":"none" }}>
                  <span style={{ fontSize:16, width:24, textAlign:"center" }}>{item.icon}</span>
                  <span style={{ fontSize:13, color:"#334155", fontWeight:500 }}>{item.text}</span>
                </div>
              ))}
            </div>

            {/* URL display */}
            <div style={{ background:"rgba(5,150,105,0.06)", border:"1px solid rgba(5,150,105,0.15)",
              borderRadius:12, padding:"10px 14px", marginBottom:20,
              display:"flex", alignItems:"center", gap:10 }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#059669" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/>
                <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>
              </svg>
              <span style={{ fontSize:13, fontWeight:600, color:"#047857", fontFamily:"monospace" }}>
                teacher.senas.edu.ph
              </span>
            </div>

            {/* Buttons */}
            <div style={{ display:"flex", gap:10 }}>
              <PopupBtn onClick={closePopup} variant="ghost">
                ← Back
              </PopupBtn>
              <PopupBtn onClick={()=>{ window.open("https://teacher.senas.edu.ph","_blank"); closePopup(); }} variant="green">
                Open Dashboard →
              </PopupBtn>
            </div>
          </div>
        </>
      )}

      <style>{`
        @keyframes senyaBob { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-8px)} }
        @keyframes pulse    { 0%,100%{opacity:1} 50%{opacity:0.3} }
        @keyframes fadeUp   { 0%{transform:translateY(16px);opacity:0} 100%{transform:translateY(0);opacity:1} }
      `}</style>
    </div>
  );
}

/* ── Role Card sub-component ── */
function RoleCard({ role, selected, visible, delay, onClick, accent, accentLight, borderActive,
  icon, label, title, desc, chips, cta, ctaStyle, badge }) {
  const [pressed, setPressed] = useState(false);
  const isSelected = selected === role;
  const isOther    = selected && selected !== role;

  return (
    <div
      onClick={onClick}
      onPointerDown={()=>setPressed(true)}
      onPointerUp={()=>setPressed(false)}
      onPointerLeave={()=>setPressed(false)}
      style={{
        background:"rgba(255,255,255,0.66)",
        border:`1.5px solid ${isSelected ? borderActive : "rgba(255,255,255,0.85)"}`,
        borderRadius:20,
        backdropFilter:"blur(10px)",
        boxShadow: isSelected
          ? `0 6px 24px ${accent}28`
          : "0 2px 14px rgba(15,49,114,0.09)",
        padding:"20px 18px",
        cursor:"pointer",
        transition:"all 0.2s ease",
        transform: !visible
          ? "translateY(24px)" : pressed
          ? "scale(0.98)" : isSelected
          ? "scale(1.01)" : "scale(1)",
        opacity: !visible ? 0 : isOther ? 0.5 : 1,
        transitionDelay: `${delay}ms`,
        position:"relative", overflow:"hidden",
      }}
    >
      {/* Accent top strip */}
      <div style={{ position:"absolute", top:0, left:0, right:0, height:3,
        background:`linear-gradient(90deg,${accent},${accent}66)`,
        borderRadius:"20px 20px 0 0" }} />

      {/* Web badge */}
      {badge && (
        <div style={{ position:"absolute", top:14, right:14,
          background:accentLight, borderRadius:8, padding:"3px 10px" }}>
          <span style={{ fontSize:10, fontWeight:800, color:accent, letterSpacing:0.8 }}>
            🌐 {badge}
          </span>
        </div>
      )}

      <div style={{ display:"flex", gap:14, alignItems:"flex-start" }}>
        {/* Icon */}
        <div style={{ width:76, height:76, borderRadius:18,
          background:accentLight, display:"flex", alignItems:"center",
          justifyContent:"center", flexShrink:0 }}>
          {icon}
        </div>

        <div style={{ flex:1 }}>
          {/* Label */}
          <div style={{ display:"inline-flex", alignItems:"center", gap:5,
            background:accentLight, borderRadius:6, padding:"2px 10px", marginBottom:6 }}>
            <span style={{ fontSize:10, fontWeight:800, color:accent, letterSpacing:0.8 }}>{label}</span>
          </div>
          <p style={{ fontSize:16, fontWeight:800, color:"#0f3172", margin:"0 0 4px" }}>{title}</p>
          <p style={{ fontSize:12.5, color:"#475569", lineHeight:1.55, margin:0 }}>{desc}</p>
        </div>
      </div>

      {/* Feature chips */}
      <div style={{ display:"flex", gap:6, flexWrap:"wrap", marginTop:12, marginBottom:14 }}>
        {chips.map((c,i) => (
          <div key={i} style={{ background:accentLight, borderRadius:99,
            padding:"4px 11px", fontSize:11, fontWeight:700, color:accent,
            border:`1px solid ${accent}20` }}>
            ✓ {c}
          </div>
        ))}
      </div>

      {/* CTA button */}
      <div style={{ ...ctaStyle, borderRadius:60, padding:"11px 20px",
        fontSize:14, fontWeight:800, textAlign:"center",
        transition:"transform 0.12s", transform:pressed?"scale(0.97)":"scale(1)" }}>
        {cta}
      </div>
    </div>
  );
}

/* ── Popup button ── */
function PopupBtn({ onClick, children, variant }) {
  const [p,setP]=useState(false);
  const style = variant==="green"
    ? { background:"linear-gradient(135deg,#047857,#059669)", color:"#fff", boxShadow:"0 4px 14px rgba(5,150,105,0.3)" }
    : { background:"rgba(15,49,114,0.06)", color:"#4b7bbb", border:"1px solid rgba(15,49,114,0.12)" };
  return (
    <button onClick={onClick}
      onPointerDown={()=>setP(true)} onPointerUp={()=>setP(false)} onPointerLeave={()=>setP(false)}
      style={{ ...style, flex:1, borderRadius:60, padding:"12px 16px",
        fontSize:14, fontWeight:700, cursor:"pointer",
        display:"flex", alignItems:"center", justifyContent:"center",
        border:style.border||"none", outline:"none",
        transform:p?"scale(0.96)":"scale(1)", transition:"transform 0.1s" }}>
      {children}
    </button>
  );
}
