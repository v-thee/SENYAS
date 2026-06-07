import { useState, useRef, useEffect } from "react";
import { senya_logo, senya_teaching } from "./images";
import BottomNav from "./BottomNav";

const signs = [
  { letter: "A", hint: "Make a closed fist with your thumb resting on the side" },
  { letter: "B", hint: "Hold 4 fingers straight up, thumb folded across palm" },
  { letter: "C", hint: "Curve your hand into a C shape like holding a can" },
  { letter: "D", hint: "Point index finger up, other fingers curled to touch thumb" },
  { letter: "E", hint: "All fingers curled down toward palm, thumb tucked under" },
];

/* ── Icons ─────────────────────────────────────────────────────────── */
const Icon = {
  Camera: (p) => (
    <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/>
      <circle cx="12" cy="13" r="4"/>
    </svg>
  ),
  Check: (p) => (
    <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"/><polyline points="8 12 11 15 16 9"/>
    </svg>
  ),
  X: (p) => (
    <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"/>
      <line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/>
    </svg>
  ),
  Arrow: (p) => (
    <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
    </svg>
  ),
  ArrowLeft: (p) => (
    <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/>
    </svg>
  ),
  Refresh: (p) => (
    <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M23 4v6h-6"/><path d="M1 20v-6h6"/>
      <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10"/>
      <path d="M20.49 15a9 9 0 0 1-14.85 3.36L1 14"/>
    </svg>
  ),
  Trophy: (p) => (
    <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/>
      <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/>
      <path d="M4 22h16"/>
      <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/>
      <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/>
      <path d="M18 2H6v7a6 6 0 0 0 12 0V2z"/>
    </svg>
  ),
  Home: (p) => (
    <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2h-5v-8H7v8H5a2 2 0 0 1-2-2z"/>
    </svg>
  ),
  Scan: (p) => (
    <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 7V5a2 2 0 0 1 2-2h2"/><path d="M17 3h2a2 2 0 0 1 2 2v2"/>
      <path d="M21 17v2a2 2 0 0 1-2 2h-2"/><path d="M7 21H5a2 2 0 0 1-2-2v-2"/>
      <circle cx="12" cy="12" r="3"/>
    </svg>
  ),
  Lock: (p) => (
    <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
    </svg>
  ),
  Star: (p) => (
    <svg {...p} viewBox="0 0 24 24" stroke="none">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" fill="currentColor"/>
    </svg>
  ),
  Hand: (p) => (
    <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 11V6a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v0"/>
      <path d="M14 10V4a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v2"/>
      <path d="M10 10.5V6a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v8"/>
      <path d="M18 8a2 2 0 1 1 4 0v6a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.86-5.99-2.34l-3.6-3.6a2 2 0 0 1 2.83-2.82L7 15"/>
    </svg>
  ),
  Bulb: (p) => (
    <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 18h6"/><path d="M10 22h4"/>
      <path d="M12 2a7 7 0 0 1 7 7c0 2.62-1.4 4.91-3.5 6.18V17a1 1 0 0 1-1 1H9.5a1 1 0 0 1-1-1v-1.82A7 7 0 0 1 12 2z"/>
    </svg>
  ),
  Abc: (p) => (
    <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 7V4h8v3"/><path d="M8 4v16"/><path d="M5 20h6"/>
      <path d="M15 8h4a2 2 0 0 1 0 4h-4v4h4a2 2 0 0 1 0 4h-4"/>
    </svg>
  ),
  Hash: (p) => (
    <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="4" y1="9" x2="20" y2="9"/><line x1="4" y1="15" x2="20" y2="15"/>
      <line x1="10" y1="3" x2="8" y2="21"/><line x1="16" y1="3" x2="14" y2="21"/>
    </svg>
  ),
  Book: (p) => (
    <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>
    </svg>
  ),
  Msg: (p) => (
    <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
    </svg>
  ),
  Alert: (p) => (
    <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"/>
      <line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
    </svg>
  ),
  Sparkle: (p) => (
    <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 3L14 8L19 10L14 12L12 17L10 12L5 10L10 8L12 3Z"/>
      <path d="M19 4L20 6L22 7L20 8L19 10L18 8L16 7L18 6L19 4Z"/>
    </svg>
  ),
  Info: (p) => (
    <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"/>
      <line x1="12" y1="8" x2="12" y2="8" strokeWidth="3"/>
      <line x1="12" y1="12" x2="12" y2="16"/>
    </svg>
  ),
  Bell: (p) => (
    <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9"/>
      <path d="M13.73 21a2 2 0 01-3.46 0"/>
    </svg>
  ),
};

const LESSONS = [
  { id: "alphabet", title: "Alphabet",    sub: "Fingerspelling A–Z", progress: 20, Icon: Icon.Abc,  locked: false, color: "#2563EB", bg: "#EFF6FF" },
  { id: "numbers",  title: "Numbers",     sub: "Counting 1–100",     progress: 1,  Icon: Icon.Hash, locked: false, color: "#059669", bg: "#ECFDF5" },
  { id: "words",    title: "Basic Words", sub: "Common signs",       progress: 0,  Icon: Icon.Book, locked: true,  color: "#6B7280", bg: "#F9FAFB" },
  { id: "phrases",  title: "Sentences",   sub: "Full phrases",       progress: 0,  Icon: Icon.Msg,  locked: true,  color: "#6B7280", bg: "#F9FAFB" },
];

/* ── Shared top bar — same across all screens ── */
function TopBar() {
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "52px 20px 0" }}>
      <span style={{ color: "#0f3172", fontSize: 22, fontWeight: 800, letterSpacing: 2 }}>SEÑAS</span>
      <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
        {/* Info */}
        <button style={{ background: "none", border: "none", cursor: "pointer", color: "#4b7bbb", padding: 2 }}>
          <Icon.Info width={20} height={20} style={{ color: "#4b7bbb" }} />
        </button>
        {/* Streak pill */}
        <div style={{ background: "rgba(255,255,255,0.7)", borderRadius: 20, padding: "5px 12px", display: "flex", alignItems: "center", gap: 5, color: "#0f3172", fontSize: 13, fontWeight: 700, boxShadow: "0 1px 4px rgba(0,0,0,0.08)" }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="#fb923c">
            <path d="M12 2c0 6-8 8-8 14a8 8 0 0016 0C20 10 12 8 12 2z"/>
          </svg>
          12
        </div>
        {/* Bell */}
        <button style={{ background: "none", border: "none", cursor: "pointer", color: "#4b7bbb", padding: 2 }}>
          <Icon.Bell width={20} height={20} style={{ color: "#4b7bbb" }} />
        </button>
      </div>
    </div>
  );
}

/* ── Btn ─────────────────────────────────────────────────────────────── */
function Btn({ onClick, children, variant = "primary", disabled, style: sx = {} }) {
  const [pressed, setPressed] = useState(false);
  const base = {
    primary: { background: "#1848c8", color: "#fff" },
    success: { background: "#059669", color: "#fff" },
    danger:  { background: "#DC2626", color: "#fff" },
    ghost:   { background: "#F1F5F9", color: "#334155", border: "1px solid #E2E8F0" },
    outline: { background: "transparent", color: "#1848c8", border: "2px solid #1848c8" },
  }[variant] || {};
  return (
    <button
      onClick={onClick} disabled={disabled}
      onPointerDown={() => setPressed(true)}
      onPointerUp={() => setPressed(false)}
      onPointerLeave={() => setPressed(false)}
      style={{
        ...base, ...sx,
        borderRadius: 60, padding: "13px 22px",
        fontSize: 15, fontWeight: 700,
        cursor: disabled ? "not-allowed" : "pointer",
        opacity: disabled ? 0.5 : 1,
        transform: pressed ? "scale(0.96)" : "scale(1)",
        transition: "transform 0.1s ease, opacity 0.15s",
        display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
        border: base.border || "none",
        outline: "none", WebkitTapHighlightColor: "transparent",
      }}
    >{children}</button>
  );
}

/* ── Progress ring ───────────────────────────────────────────────────── */
function Ring({ pct, size = 80, stroke = 7, color = "#1848c8" }) {
  const r = (size - stroke) / 2;
  const circ = 2 * Math.PI * r;
  return (
    <svg width={size} height={size} style={{ transform: "rotate(-90deg)" }}>
      <circle cx={size/2} cy={size/2} r={r} fill="none" stroke="#E2E8F0" strokeWidth={stroke}/>
      <circle cx={size/2} cy={size/2} r={r} fill="none" stroke={color} strokeWidth={stroke}
        strokeDasharray={circ} strokeDashoffset={circ * (1 - pct / 100)}
        strokeLinecap="round" style={{ transition: "stroke-dashoffset 0.8s ease" }}/>
    </svg>
  );
}

/* ── Confetti burst ────────────────────────────────────────────────── */
function Confetti({ count = 28 }) {
  const pieces = useRef(
    Array.from({ length: count }, (_, i) => ({
      x: 40 + Math.random() * 20,
      angle: (i / count) * 360,
      dist: 60 + Math.random() * 60,
      color: ["#fbbf24","#34d399","#60a5fa","#f87171","#a78bfa","#fb923c"][i % 6],
      size: 5 + Math.random() * 5,
      delay: Math.random() * 0.15,
      shape: Math.random() > 0.5 ? "circle" : "rect",
    }))
  ).current;

  return (
    <div style={{ position: "absolute", inset: 0, pointerEvents: "none", overflow: "hidden" }}>
      {pieces.map((p, i) => (
        <div key={i} style={{
          position: "absolute",
          left: `${p.x}%`, top: "48%",
          width: p.size, height: p.size,
          borderRadius: p.shape === "circle" ? "50%" : 2,
          background: p.color,
          animation: `confettiBurst 0.7s cubic-bezier(0.22,1,0.36,1) ${p.delay}s both`,
          "--dx": `${Math.cos(p.angle * Math.PI/180) * p.dist}px`,
          "--dy": `${Math.sin(p.angle * Math.PI/180) * p.dist}px`,
        }} />
      ))}
    </div>
  );
}

/* ── Result overlay ──────────────────────────────────────────────────── */
function ResultOverlay({ visible, success }) {
  const [stage, setStage] = useState(0);
  useEffect(() => {
    if (!visible) { setStage(0); return; }
    setStage(1);
    const t = setTimeout(() => setStage(2), 180);
    return () => clearTimeout(t);
  }, [visible]);
  if (!visible) return null;

  return (
    <div style={{
      position: "absolute", inset: 0, zIndex: 60,
      background: success ? "rgba(236,253,245,0.92)" : "rgba(254,242,242,0.92)",
      display: "flex", alignItems: "center", justifyContent: "center",
      flexDirection: "column", gap: 10,
      backdropFilter: "blur(6px)",
      animation: "fadeInOverlay 0.18s ease",
    }}>
      {stage >= 1 && success && <Confetti />}
      <div style={{
        width: 88, height: 88, borderRadius: "50%",
        background: success ? "#10B981" : "#EF4444",
        display: "flex", alignItems: "center", justifyContent: "center",
        animation: stage >= 1 ? "resultPop 0.35s cubic-bezier(0.34,1.56,0.64,1)" : "none",
      }}>
        {success
          ? <Icon.Check width={44} height={44} style={{ color: "#fff" }} />
          : <Icon.X     width={44} height={44} style={{ color: "#fff" }} />
        }
      </div>
      <p style={{
        fontSize: 20, fontWeight: 800,
        color: success ? "#065f46" : "#991b1b",
        animation: stage >= 2 ? "fadeUp 0.25s ease" : "none",
      }}>
        {success ? "Correct!" : "Not quite!"}
      </p>
      <img src={senya_teaching} alt="Senya"
        style={{
          width: 72, height: 72, objectFit: "contain",
          animation: "senyaPop 0.4s cubic-bezier(0.34,1.4,0.64,1) 0.1s both",
        }}
      />
    </div>
  );
}

/* ── Pre-achievement animation — contained inside the screen ─────────── */
function PreAchievementAnim({ score, total, onDone }) {
  const [step, setStep] = useState(0);
  useEffect(() => {
    const timers = [
      setTimeout(() => setStep(1), 600),
      setTimeout(() => setStep(2), 1700),
      setTimeout(() => { setStep(3); onDone(); }, 2100),
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <div style={{
      position: "absolute", inset: 0, zIndex: 200,
      background: step >= 2
        ? "#fff"
        : "linear-gradient(135deg, #0f2044 0%, #1848c8 100%)",
      display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center", gap: 16,
      transition: "background 0.35s ease",
      overflow: "hidden",
    }}>
      {step >= 1 && <Confetti count={40} />}

      <img src={senya_teaching} alt="Senya" style={{
        width: 120, height: 120, objectFit: "contain",
        animation: step === 0
          ? "senyaPop 0.5s cubic-bezier(0.34,1.5,0.64,1)"
          : step >= 1
          ? "senyaBounce 0.5s ease-in-out infinite alternate"
          : "none",
        filter: "drop-shadow(0 8px 24px rgba(0,0,0,0.25))",
      }} />

      {step >= 1 && (
        <div style={{ textAlign: "center", animation: "fadeUp 0.3s ease" }}>
          <p style={{ color: step >= 2 ? "#1848c8" : "rgba(255,255,255,0.7)", fontSize: 14, fontWeight: 600, marginBottom: 4 }}>
            You got
          </p>
          <p style={{
            fontSize: 64, fontWeight: 900, lineHeight: 1,
            color: step >= 2 ? "#1848c8" : "#fbbf24",
            animation: "countUp 0.5s cubic-bezier(0.34,1.3,0.64,1)",
          }}>
            {score}<span style={{ fontSize: 28, opacity: 0.6 }}>/{total}</span>
          </p>
          <p style={{ color: step >= 2 ? "#64748b" : "rgba(255,255,255,0.6)", fontSize: 13, marginTop: 4 }}>
            correct signs!
          </p>
        </div>
      )}
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════════
   INTRO SCREEN
══════════════════════════════════════════════════════════════════════ */
function IntroScreen({ nav, onSelect }) {
  return (
    <div style={{
      minHeight: "100vh", paddingBottom: 72,
      background: "linear-gradient(160deg, #a8d4f5 0%, #c5e3f7 35%, #daeefb 65%, #f0f8ff 100%)",
      display: "flex", flexDirection: "column",
    }}>
      <TopBar />

      <div style={{ textAlign: "center", padding: "20px 20px 4px" }}>
        <img src={senya_logo} alt="Senya" style={{ width: 80, height: 80, objectFit: "contain", filter: "drop-shadow(0 8px 20px rgba(15,49,114,0.18))", animation: "bob 3s ease-in-out infinite" }} />
        <p style={{ color: "#1848c8", fontSize: 15, fontWeight: 700, marginTop: 6 }}>Practice your hand signs!</p>
      </div>

      <div style={{ margin: "12px 20px", background: "rgba(255,255,255,0.7)", borderRadius: 18, padding: "13px 16px", display: "flex", alignItems: "flex-start", gap: 10, border: "1px solid rgba(255,255,255,0.9)", backdropFilter: "blur(8px)" }}>
        <Icon.Sparkle width={20} height={20} style={{ color: "#fbbf24", flexShrink: 0, marginTop: 1 }} />
        <p style={{ fontSize: 12.5, color: "#334155", lineHeight: 1.5, margin: 0 }}>
          <strong style={{ color: "#0f3172" }}>Pro tip:</strong> 5 minutes daily beats one long session. Consistency is key!
        </p>
      </div>

      <div style={{ padding: "8px 20px", flex: 1 }}>
        <p style={{ fontWeight: 700, color: "#0f3172", fontSize: 14, marginBottom: 12 }}>Choose a category:</p>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
          {LESSONS.map((l, i) => (
            <div key={l.id} onClick={() => !l.locked && onSelect(l)}
              style={{
                background: l.locked ? "rgba(255,255,255,0.45)" : "rgba(255,255,255,0.82)",
                borderRadius: 18, padding: "16px 14px",
                cursor: l.locked ? "not-allowed" : "pointer",
                opacity: l.locked ? 0.6 : 1,
                border: "1px solid rgba(255,255,255,0.85)",
                backdropFilter: "blur(6px)",
                boxShadow: l.locked ? "none" : "0 2px 12px rgba(15,49,114,0.08)",
                transition: "transform 0.18s, box-shadow 0.18s",
                animation: `fadeUp 0.4s ease ${i * 0.07}s both`,
                position: "relative", overflow: "hidden",
              }}
              onPointerEnter={e => { if (!l.locked) { e.currentTarget.style.transform = "translateY(-3px)"; e.currentTarget.style.boxShadow = "0 8px 24px rgba(15,49,114,0.14)"; }}}
              onPointerLeave={e => { e.currentTarget.style.transform = ""; e.currentTarget.style.boxShadow = ""; }}
            >
              <div style={{ position: "relative", display: "inline-flex", marginBottom: 10 }}>
                <div style={{ width: 44, height: 44, borderRadius: 12, background: l.bg, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <l.Icon width={22} height={22} style={{ color: l.color }} />
                </div>
                {l.locked && (
                  <div style={{ position: "absolute", top: -5, right: -8, background: "#9CA3AF", borderRadius: "50%", width: 18, height: 18, display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <Icon.Lock width={10} height={10} style={{ color: "#fff" }} />
                  </div>
                )}
              </div>
              <p style={{ fontWeight: 800, color: l.locked ? "#9CA3AF" : "#0f3172", fontSize: 13, marginBottom: 2 }}>{l.title}</p>
              <p style={{ fontSize: 11, color: l.locked ? "#9CA3AF" : "#4b7bbb", marginBottom: l.locked ? 0 : 8 }}>{l.sub}</p>
              {!l.locked && (
                <>
                  <div style={{ background: "rgba(15,49,114,0.1)", borderRadius: 99, height: 4, overflow: "hidden" }}>
                    <div style={{ width: `${l.progress}%`, height: "100%", background: `linear-gradient(90deg, ${l.color}, ${l.color}99)`, borderRadius: 99 }} />
                  </div>
                  <p style={{ fontSize: 10, color: l.color, marginTop: 4, fontWeight: 600 }}>{l.progress}% complete</p>
                </>
              )}
              {l.locked && <p style={{ fontSize: 10, color: "#9CA3AF" }}>Complete previous lesson</p>}
            </div>
          ))}
        </div>
      </div>
      <BottomNav active="signs" nav={nav} />
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════════
   PERMISSION SCREEN
══════════════════════════════════════════════════════════════════════ */
function PermissionScreen({ onAllow, onBack, error }) {
  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(160deg, #a8d4f5 0%, #daeefb 60%, #f0f8ff 100%)",
      display: "flex", flexDirection: "column",
    }}>
      <TopBar />
      <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }}>
        <div style={{ background: "rgba(255,255,255,0.95)", borderRadius: 32, padding: "32px 24px", maxWidth: 340, width: "100%", textAlign: "center", boxShadow: "0 12px 48px rgba(15,49,114,0.12)", animation: "popIn 0.3s ease" }}>
          <div style={{ width: 72, height: 72, background: "#EFF6FF", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 18px" }}>
            <Icon.Camera width={36} height={36} style={{ color: "#1848c8" }} />
          </div>
          <h2 style={{ color: "#0f3172", fontSize: 20, fontWeight: 800, marginBottom: 8 }}>Camera Access</h2>
          <p style={{ color: "#475569", fontSize: 13, lineHeight: 1.6, marginBottom: 20 }}>
            We use your camera to analyze your hand signs in real time. Your video is <strong>never recorded or stored</strong>.
          </p>
          {error && (
            <div style={{ background: "#FEF2F2", borderRadius: 12, padding: "10px 14px", marginBottom: 16, display: "flex", alignItems: "center", gap: 8, textAlign: "left" }}>
              <Icon.Alert width={16} height={16} style={{ color: "#DC2626", flexShrink: 0 }} />
              <p style={{ color: "#DC2626", fontSize: 12, margin: 0 }}>{error}</p>
            </div>
          )}
          <div style={{ display: "flex", gap: 10 }}>
            <Btn onClick={onBack} variant="outline" style={{ flex: 1, padding: "11px" }}>Cancel</Btn>
            <Btn onClick={onAllow} variant="primary" style={{ flex: 1.6, padding: "11px" }}>
              Allow Camera <Icon.Arrow width={14} height={14} style={{ color: "#fff" }} />
            </Btn>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════════
   PRACTICE SCREEN — IMPROVED UI + larger Senya
══════════════════════════════════════════════════════════════════════ */
function PracticeScreen({ onBack, videoRef, phase, sign, signIdx, score, totalSigns, onDetect, onNext, onRetry, showResult, resultSuccess }) {
  const [hintOpen, setHintOpen] = useState(false);

  const borderColor = {
    ready:     "#c7ddf5",
    detecting: "#F59E0B",
    success:   "#10B981",
    fail:      "#EF4444",
  }[phase] || "#c7ddf5";

  const shadowColor = {
    detecting: "rgba(245,158,11,0.25)",
    success:   "rgba(16,185,129,0.28)",
    fail:      "rgba(239,68,68,0.22)",
    ready:     "rgba(15,49,114,0.10)",
  }[phase] || "rgba(15,49,114,0.10)";

  return (
    <div style={{
      height: "100vh", overflow: "hidden",
      background: "linear-gradient(170deg, #a8d4f5 0%, #c5e3f7 30%, #daeefb 65%, #f0f8ff 100%)",
      display: "flex", flexDirection: "column",
      position: "relative",
    }}>
      <ResultOverlay visible={showResult} success={resultSuccess} />

      {/* ── Header ── */}
      <div style={{ padding: "48px 16px 10px", display: "flex", alignItems: "center", gap: 10, flexShrink: 0 }}>
        <button onClick={onBack} style={{
          background: "rgba(255,255,255,0.6)", border: "1px solid rgba(255,255,255,0.9)",
          backdropFilter: "blur(8px)", borderRadius: 12, width: 38, height: 38,
          display: "flex", alignItems: "center", justifyContent: "center",
          cursor: "pointer", flexShrink: 0, boxShadow: "0 2px 8px rgba(15,49,114,0.10)",
        }}>
          <Icon.ArrowLeft width={18} height={18} style={{ color: "#0f3172" }} />
        </button>

        <div style={{ flex: 1 }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 5 }}>
            <span style={{ color: "#4b7bbb", fontSize: 11, fontWeight: 700, letterSpacing: 0.3 }}>
              Sign {signIdx + 1} of {totalSigns}
            </span>
            <span style={{ color: "#f59e0b", fontSize: 11, fontWeight: 700 }}>{score} correct</span>
          </div>
          {/* Segmented progress dots */}
          <div style={{ display: "flex", gap: 3 }}>
            {signs.map((_, i) => (
              <div key={i} style={{
                flex: 1, height: 5, borderRadius: 99,
                background: i < signIdx
                  ? "#22c55e"
                  : i === signIdx
                  ? (phase === "detecting" ? "#F59E0B" : "#1848c8")
                  : "rgba(15,49,114,0.12)",
                transition: "background 0.3s",
              }} />
            ))}
          </div>
        </div>

        {/* Score badge */}
        <div style={{
          background: "linear-gradient(135deg,#1035a0,#1848c8)", borderRadius: 14,
          padding: "6px 14px", flexShrink: 0,
          boxShadow: "0 3px 10px rgba(15,49,114,0.28)",
        }}>
          <span style={{ color: "#fff", fontWeight: 800, fontSize: 14 }}>{score}/{totalSigns}</span>
        </div>
      </div>

      {/* ── Letter pill + hint ── */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, padding: "0 16px 10px", flexShrink: 0 }}>
        <div style={{
          background: "linear-gradient(135deg,#1035a0,#1848c8)",
          borderRadius: 18, padding: "7px 28px",
          display: "flex", alignItems: "center", gap: 10,
          boxShadow: "0 4px 14px rgba(15,49,114,0.3)",
        }}>
          <span style={{ color: "rgba(255,255,255,0.65)", fontSize: 13, fontWeight: 600 }}>Sign</span>
          <span style={{ color: "#fff", fontSize: 30, fontWeight: 900, letterSpacing: -0.5 }}>{sign.letter}</span>
        </div>

        <div style={{ position: "relative" }}>
          <button
            onClick={() => setHintOpen(h => !h)}
            style={{
              width: 42, height: 42, borderRadius: "50%",
              background: hintOpen ? "#fef9c3" : "rgba(255,255,255,0.65)",
              border: hintOpen ? "2px solid #fbbf24" : "1.5px solid rgba(255,255,255,0.9)",
              backdropFilter: "blur(8px)",
              display: "flex", alignItems: "center", justifyContent: "center",
              cursor: "pointer", transition: "all 0.2s",
              boxShadow: "0 2px 8px rgba(15,49,114,0.10)",
            }}
          >
            <Icon.Bulb width={18} height={18} style={{ color: hintOpen ? "#d97706" : "#4b7bbb" }} />
          </button>
          {hintOpen && (
            <div style={{
              position: "absolute", bottom: "calc(100% + 10px)", left: "50%",
              transform: "translateX(-50%)",
              background: "#fff", borderRadius: 14, padding: "10px 14px",
              width: 220, boxShadow: "0 8px 28px rgba(15,49,114,0.15)",
              border: "1px solid #fef08a",
              animation: "hintPop 0.2s cubic-bezier(0.34,1.4,0.64,1)",
              zIndex: 40,
            }}>
              <div style={{ position: "absolute", bottom: -7, left: "50%", transform: "translateX(-50%)", width: 0, height: 0, borderLeft: "7px solid transparent", borderRight: "7px solid transparent", borderTop: "7px solid #fff", filter: "drop-shadow(0 2px 1px rgba(0,0,0,0.06))" }} />
              <div style={{ display: "flex", gap: 6, alignItems: "flex-start" }}>
                <Icon.Bulb width={14} height={14} style={{ color: "#d97706", flexShrink: 0, marginTop: 1 }} />
                <p style={{ fontSize: 12, color: "#334155", lineHeight: 1.5, margin: 0 }}>{sign.hint}</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ── Camera frame ── */}
      <div style={{ padding: "0 14px", flexShrink: 0 }}>
        <div style={{
          position: "relative", borderRadius: 24, overflow: "hidden",
          background: "#d4e8f8",
          aspectRatio: "4 / 3", width: "100%",
          border: `2.5px solid ${borderColor}`,
          boxShadow: `0 6px 28px ${shadowColor}`,
          transition: "border-color 0.3s, box-shadow 0.4s",
        }}>
          <video ref={videoRef} autoPlay playsInline muted style={{ width: "100%", height: "100%", objectFit: "cover", transform: "scaleX(-1)", display: "block" }} />

          {/* Subtle grid overlay */}
          <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(15,49,114,0.03) 1px,transparent 1px),linear-gradient(90deg,rgba(15,49,114,0.03) 1px,transparent 1px)", backgroundSize: "30px 30px", pointerEvents: "none" }} />

          {/* Corner brackets */}
          {["tl","tr","bl","br"].map(c => (
            <div key={c} style={{
              position: "absolute",
              top: c.startsWith("t") ? 10 : "auto", bottom: c.startsWith("b") ? 10 : "auto",
              left: c.endsWith("l") ? 10 : "auto",  right: c.endsWith("r") ? 10 : "auto",
              width: 22, height: 22,
              borderTop:    c.startsWith("t") ? `3px solid ${borderColor}` : "none",
              borderBottom: c.startsWith("b") ? `3px solid ${borderColor}` : "none",
              borderLeft:   c.endsWith("l")   ? `3px solid ${borderColor}` : "none",
              borderRight:  c.endsWith("r")   ? `3px solid ${borderColor}` : "none",
              borderRadius: c==="tl"?"6px 0 0 0":c==="tr"?"0 6px 0 0":c==="bl"?"0 0 0 6px":"0 0 6px 0",
              transition: "border-color 0.3s",
            }} />
          ))}

          {/* Scan line */}
          {phase === "detecting" && (
            <div style={{
              position: "absolute", left: 0, right: 0, height: 3,
              background: "linear-gradient(90deg, transparent, #F59E0B, transparent)",
              animation: "scanLine 1.4s ease-in-out infinite",
              boxShadow: "0 0 12px rgba(245,158,11,0.8)",
            }} />
          )}

          {/* Scanning pill */}
          {phase === "detecting" && (
            <div style={{ position: "absolute", top: 10, left: "50%", transform: "translateX(-50%)", background: "rgba(245,158,11,0.96)", borderRadius: 20, padding: "5px 14px", display: "flex", alignItems: "center", gap: 6, backdropFilter: "blur(8px)", boxShadow: "0 2px 10px rgba(245,158,11,0.4)" }}>
              <div style={{ width: 7, height: 7, borderRadius: "50%", background: "#fff", animation: "blink 0.7s ease-in-out infinite" }} />
              <span style={{ color: "#fff", fontSize: 11, fontWeight: 800, letterSpacing: 0.5 }}>SCANNING</span>
            </div>
          )}

          {/* Success/fail pill */}
          {(phase === "success" || phase === "fail") && (
            <div style={{
              position: "absolute", bottom: 10, left: 10, right: 10,
              background: phase === "success" ? "rgba(16,185,129,0.94)" : "rgba(239,68,68,0.92)",
              borderRadius: 28, padding: "8px 14px",
              display: "flex", alignItems: "center", gap: 8,
              backdropFilter: "blur(6px)",
              animation: "slideUpIn 0.25s ease",
              boxShadow: phase === "success" ? "0 4px 16px rgba(16,185,129,0.3)" : "0 4px 16px rgba(239,68,68,0.3)",
            }}>
              {phase === "success"
                ? <Icon.Check width={16} height={16} style={{ color: "#fff" }} />
                : <Icon.X     width={16} height={16} style={{ color: "#fff" }} />
              }
              <span style={{ color: "#fff", fontSize: 12, fontWeight: 700 }}>
                {phase === "success" ? "Correct! Great job!" : "Not quite — try again!"}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* ── Senya + feedback ── */}
      <div style={{ flex: 1, padding: "10px 14px 0", display: "flex", alignItems: "center", gap: 12, minHeight: 0 }}>
        <div style={{ flexShrink: 0, display: "flex", alignItems: "flex-end", justifyContent: "center" }}>
          <img
            src={senya_teaching}
            alt="Senya"
            style={{
              width: 110,
              height: 110,
              objectFit: "contain",
              animation: phase === "detecting"
                ? "senyaThink 1.2s ease-in-out infinite"
                : phase === "success"
                ? "senyaPop 0.4s cubic-bezier(0.34,1.5,0.64,1)"
                : "bob 2.8s ease-in-out infinite",
              filter: "drop-shadow(0 5px 14px rgba(15,49,114,0.18))",
            }}
          />
        </div>

        {/* Speech bubble */}
        <div style={{
          flex: 1,
          position: "relative",
          background: {
            ready:     "rgba(255,255,255,0.75)",
            detecting: "rgba(255,251,235,0.85)",
            success:   "rgba(236,253,245,0.85)",
            fail:      "rgba(254,242,242,0.85)",
          }[phase],
          borderRadius: 16,
          borderBottomLeftRadius: 4,
          padding: "11px 13px",
          backdropFilter: "blur(8px)",
          boxShadow: "0 3px 14px rgba(15,49,114,0.10)",
          border: `1px solid ${phase==="detecting"?"#fde68a":phase==="success"?"#a7f3d0":phase==="fail"?"#fecaca":"rgba(255,255,255,0.9)"}`,
          transition: "all 0.3s",
        }}>
          <div style={{
            position: "absolute", left: -7, bottom: 10,
            width: 0, height: 0,
            borderTop: "7px solid transparent",
            borderBottom: "7px solid transparent",
            borderRight: `7px solid ${phase==="detecting"?"#fde68a":phase==="success"?"#a7f3d0":phase==="fail"?"#fecaca":"rgba(200,220,245,0.7)"}`,
          }} />
          <div style={{
            position: "absolute", left: -5, bottom: 11,
            width: 0, height: 0,
            borderTop: "6px solid transparent",
            borderBottom: "6px solid transparent",
            borderRight: `6px solid ${phase==="detecting"?"rgba(255,251,235,0.85)":phase==="success"?"rgba(236,253,245,0.85)":phase==="fail"?"rgba(254,242,242,0.85)":"rgba(255,255,255,0.75)"}`,
          }} />

          <div style={{ display: "flex", alignItems: "flex-start", gap: 7 }}>
            {phase === "detecting" && <div style={{ width: 14, height: 14, borderRadius: "50%", border: "2px solid #F59E0B", borderTopColor: "transparent", animation: "spin 0.7s linear infinite", flexShrink: 0, marginTop: 2 }} />}
            {phase === "success"   && <Icon.Check width={14} height={14} style={{ color: "#10B981", flexShrink: 0, marginTop: 2 }} />}
            {phase === "fail"      && <Icon.X     width={14} height={14} style={{ color: "#EF4444", flexShrink: 0, marginTop: 2 }} />}
            {phase === "ready"     && <Icon.Scan  width={14} height={14} style={{ color: "#4b7bbb", flexShrink: 0, marginTop: 2 }} />}
            <p style={{
              fontSize: 12.5, fontWeight: 500, margin: 0, lineHeight: 1.5,
              color: phase==="detecting"?"#92400e":phase==="success"?"#065f46":phase==="fail"?"#991b1b":"#0f3172",
            }}>
              {{
                ready:     `Show me the sign for "${sign.letter}"!`,
                detecting: "Hold still — I'm checking your hand…",
                success:   "Perfect! Great form, keep it up!",
                fail:      "Almost there! Check the hint and try again.",
              }[phase]}
            </p>
          </div>
        </div>
      </div>

      {/* ── Action buttons ── */}
      <div style={{ padding: "10px 14px 28px", flexShrink: 0 }}>
        {phase === "ready" && (
          <Btn onClick={onDetect} variant="primary" style={{ width: "100%", padding: "15px", boxShadow: "0 5px 18px rgba(15,49,114,0.28)" }}>
            <Icon.Scan width={18} height={18} style={{ color: "#fff" }} /> Start Detection
          </Btn>
        )}
        {phase === "detecting" && (
          <Btn disabled variant="primary" style={{ width: "100%", padding: "15px", opacity: 0.65 }}>
            <div style={{ width: 18, height: 18, borderRadius: "50%", border: "2.5px solid rgba(255,255,255,0.35)", borderTopColor: "#fff", animation: "spin 0.7s linear infinite" }} />
            Analyzing…
          </Btn>
        )}
        {(phase === "success" || phase === "fail") && !showResult && (
          <div style={{ display: "flex", gap: 8 }}>
            {phase === "fail" && (
              <Btn onClick={onRetry} variant="ghost" style={{ flex: 1, padding: "13px" }}>
                <Icon.Refresh width={15} height={15} style={{ color: "#334155" }} /> Retry
              </Btn>
            )}
            <Btn onClick={onNext} variant={phase === "success" ? "success" : "primary"} style={{ flex: 2, padding: "13px", boxShadow: "0 4px 14px rgba(15,49,114,0.22)" }}>
              {signIdx < totalSigns - 1 ? "Next Sign" : "See Results"}
              <Icon.Arrow width={15} height={15} style={{ color: "#fff" }} />
            </Btn>
          </div>
        )}
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════════
   ACHIEVEMENT SCREEN
══════════════════════════════════════════════════════════════════════ */
function AchievementScreen({ score, total, onRestart, onHome }) {
  const pct = (score / total) * 100;
  const [stage, setStage] = useState(0);

  useEffect(() => {
    const t1 = setTimeout(() => setStage(1), 200);
    const t2 = setTimeout(() => setStage(2), 600);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  const { label, color } =
    pct === 100 ? { label: "Perfect Score!", color: "#F59E0B" } :
    pct >= 80   ? { label: "Excellent!",     color: "#10B981" } :
    pct >= 60   ? { label: "Good Job!",      color: "#2563EB" } :
                  { label: "Keep Going!",    color: "#8B5CF6" };

  const stars = pct === 100 ? 3 : pct >= 80 ? 2 : pct >= 50 ? 1 : 0;

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(160deg, #a8d4f5 0%, #c5e3f7 35%, #f0f8ff 100%)",
      display: "flex", flexDirection: "column",
    }}>
      <TopBar />
      <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", padding: 20, position: "relative" }}>
        {stage >= 1 && <Confetti count={36} />}
        <div style={{
          background: "#fff", borderRadius: 36, padding: "36px 24px",
          maxWidth: 360, width: "100%", textAlign: "center",
          boxShadow: "0 16px 56px rgba(15,49,114,0.15)",
          animation: "popIn 0.4s cubic-bezier(0.34,1.3,0.64,1)",
          position: "relative", overflow: "hidden",
        }}>
          <img src={senya_teaching} alt="Senya" style={{
            width: 88, height: 88, objectFit: "contain",
            animation: stage >= 1 ? "senyaPop 0.5s cubic-bezier(0.34,1.5,0.64,1)" : "none",
            filter: "drop-shadow(0 4px 16px rgba(15,49,114,0.15))",
          }} />

          <div style={{ animation: stage >= 2 ? "trophyBounce 0.7s cubic-bezier(0.34,1.2,0.64,1)" : "none", marginTop: 4 }}>
            <Icon.Trophy width={52} height={52} style={{ color: "#fbbf24" }} />
          </div>

          <div style={{ display: "flex", justifyContent: "center", gap: 6, marginTop: 6, marginBottom: 6 }}>
            {[0,1,2].map(i => (
              <div key={i} style={{ animation: stage >= 2 && i < stars ? `starPop 0.4s cubic-bezier(0.34,1.4,0.64,1) ${0.1 + i * 0.13}s both` : "none" }}>
                <Icon.Star width={30} height={30} style={{ color: i < stars ? "#fbbf24" : "#E5E7EB" }} />
              </div>
            ))}
          </div>

          <h2 style={{ fontSize: 26, fontWeight: 800, color, marginBottom: 4 }}>{label}</h2>

          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 20, margin: "16px 0", padding: "16px", background: "#F8FAFC", borderRadius: 20 }}>
            <div style={{ position: "relative", width: 80, height: 80, display: "flex", alignItems: "center", justifyContent: "center" }}>
              {stage >= 2 && <Ring pct={Math.round(pct)} size={80} stroke={7} color={color} />}
              {stage < 2  && <Ring pct={0} size={80} stroke={7} color={color} />}
              <div style={{ position: "absolute", textAlign: "center" }}>
                <p style={{ fontSize: 18, fontWeight: 900, color, lineHeight: 1 }}>{score}</p>
                <p style={{ fontSize: 10, color: "#9CA3AF", fontWeight: 600 }}>/{total}</p>
              </div>
            </div>
            <div style={{ textAlign: "left" }}>
              <p style={{ fontSize: 30, fontWeight: 900, color: "#0f3172" }}>{Math.round(pct)}%</p>
              <p style={{ fontSize: 12, color: "#6B7280" }}>Accuracy</p>
              <div style={{ display: "flex", alignItems: "center", gap: 4, marginTop: 4 }}>
                <Icon.Star width={12} height={12} style={{ color: "#fbbf24" }} />
                <span style={{ fontSize: 12, fontWeight: 700, color: "#f59e0b" }}>+{score * 10} XP earned</span>
              </div>
            </div>
          </div>

          <p style={{ color: "#64748B", fontSize: 13, marginBottom: 20 }}>Keep practicing to master all signs!</p>

          <div style={{ display: "flex", gap: 10 }}>
            <Btn onClick={onRestart} variant="outline" style={{ flex: 1, padding: "12px" }}>
              <Icon.Refresh width={15} height={15} style={{ color: "#1848c8" }} /> Again
            </Btn>
            <Btn onClick={onHome} variant="primary" style={{ flex: 1.4, padding: "12px" }}>
              <Icon.Home width={15} height={15} style={{ color: "#fff" }} /> Home
            </Btn>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════════
   ROOT CONTROLLER
══════════════════════════════════════════════════════════════════════ */
export default function GestureRecognitionFlow({ nav }) {
  const [screen, setScreen]               = useState("intro");
  const [camError, setCamError]           = useState(null);
  const [phase, setPhase]                 = useState("ready");
  const [signIdx, setSignIdx]             = useState(0);
  const [score, setScore]                 = useState(0);
  const [showResult, setShowResult]       = useState(false);
  const [resultSuccess, setResultSuccess] = useState(false);
  const [showPreAnim, setShowPreAnim]     = useState(false);
  const videoRef  = useRef(null);
  const streamRef = useRef(null);
  const timerRef  = useRef(null);

  const sign       = signs[signIdx];
  const totalSigns = signs.length;

  useEffect(() => () => {
    streamRef.current?.getTracks().forEach(t => t.stop());
    clearTimeout(timerRef.current);
  }, []);

  const startCamera = async () => {
    setCamError(null);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: "user" } });
      if (videoRef.current) videoRef.current.srcObject = stream;
      streamRef.current = stream;
      setScreen("practice");
    } catch {
      setCamError("Camera access denied. Please allow camera to practice.");
    }
  };

  const handleDetect = () => {
    setPhase("detecting");
    timerRef.current = setTimeout(() => {
      const ok = Math.random() > 0.3;
      setResultSuccess(ok);
      setShowResult(true);
      setTimeout(() => {
        setShowResult(false);
        setPhase(ok ? "success" : "fail");
        if (ok) setScore(s => s + 1);
      }, 900);
    }, 1800);
  };

  const handleNext = () => {
    clearTimeout(timerRef.current);
    if (signIdx < totalSigns - 1) {
      setSignIdx(i => i + 1);
      setPhase("ready");
    } else {
      setShowPreAnim(true);
    }
  };

  const handleRetry  = () => { clearTimeout(timerRef.current); setPhase("ready"); };
  const handleRestart = () => { setSignIdx(0); setScore(0); setPhase("ready"); setScreen("practice"); };

  if (screen === "intro")       return <IntroScreen nav={nav} onSelect={() => setScreen("permission")} />;
  if (screen === "permission")  return <PermissionScreen onAllow={startCamera} onBack={() => setScreen("intro")} error={camError} />;
  if (screen === "achievement") return <AchievementScreen score={score} total={totalSigns} onRestart={handleRestart} onHome={() => { setSignIdx(0); setScore(0); setPhase("ready"); setScreen("intro"); }} />;

  return (
    <div style={{ position: "relative", height: "100vh", overflow: "hidden" }}>
      <PracticeScreen
        onBack={() => setScreen("intro")}
        videoRef={videoRef}
        phase={phase}
        sign={sign}
        signIdx={signIdx}
        score={score}
        totalSigns={totalSigns}
        onDetect={handleDetect}
        onNext={handleNext}
        onRetry={handleRetry}
        showResult={showResult}
        resultSuccess={resultSuccess}
      />
      {showPreAnim && (
        <PreAchievementAnim
          score={score}
          total={totalSigns}
          onDone={() => { setShowPreAnim(false); setScreen("achievement"); }}
        />
      )}
    </div>
  );
}

/* ── Global keyframes ──────────────────────────────────────────────── */
const _style = document.createElement("style");
_style.textContent = `
  @keyframes bob          { 0%,100%{transform:translateY(0)}   50%{transform:translateY(-7px)} }
  @keyframes spin         { to{transform:rotate(360deg)} }
  @keyframes blink        { 0%,100%{opacity:1} 50%{opacity:0.25} }
  @keyframes scanLine     { 0%{top:-4px} 100%{top:100%} }
  @keyframes popIn        { 0%{transform:scale(0.78);opacity:0} 100%{transform:scale(1);opacity:1} }
  @keyframes fadeUp       { 0%{transform:translateY(14px);opacity:0} 100%{transform:translateY(0);opacity:1} }
  @keyframes fadeInOverlay{ 0%{opacity:0} 100%{opacity:1} }
  @keyframes resultPop    { 0%{transform:scale(0.4);opacity:0} 70%{transform:scale(1.12)} 100%{transform:scale(1);opacity:1} }
  @keyframes senyaPop     { 0%{transform:scale(0) rotate(-15deg);opacity:0} 70%{transform:scale(1.1) rotate(4deg)} 100%{transform:scale(1) rotate(0);opacity:1} }
  @keyframes senyaThink   { 0%,100%{transform:rotate(-4deg) translateY(0)} 50%{transform:rotate(4deg) translateY(-5px)} }
  @keyframes senyaBounce  { 0%{transform:translateY(0) scale(1)} 100%{transform:translateY(-10px) scale(1.04)} }
  @keyframes trophyBounce { 0%{transform:translateY(0)} 35%{transform:translateY(-16px)} 65%{transform:translateY(-7px)} 100%{transform:translateY(0)} }
  @keyframes starPop      { 0%{transform:scale(0) rotate(-30deg);opacity:0} 100%{transform:scale(1) rotate(0);opacity:1} }
  @keyframes slideUpIn    { 0%{transform:translateY(10px);opacity:0} 100%{transform:translateY(0);opacity:1} }
  @keyframes countUp      { 0%{transform:scale(0.5) translateY(20px);opacity:0} 100%{transform:scale(1) translateY(0);opacity:1} }
  @keyframes hintPop      { 0%{transform:translateX(-50%) scale(0.85);opacity:0} 100%{transform:translateX(-50%) scale(1);opacity:1} }
  @keyframes confettiBurst{ 0%{transform:translate(0,0) rotate(0deg);opacity:1} 100%{transform:translate(var(--dx),var(--dy)) rotate(540deg);opacity:0} }
`;
document.head.appendChild(_style);