import { useState } from "react";
import { senya_blue } from "./images";
import BottomNav from "./BottomNav";
import {
  AlphabetIcon, GreetingIcon, NumbersIcon, ClassroomIcon,
  CheckIcon, LockIcon, StarIcon, TrophyIcon,
} from "./icons";

const lessons = [
  { title: "FSL Alphabet",    icon: "alpha", progress: 65,  color: "#2563EB", tag: "In Progress" },
  { title: "Greetings",       icon: "greet", progress: 65,  color: "#2563EB", tag: "In Progress" },  // CHANGED: from "Completed" to "In Progress"
  { title: "Numbers 1–10",    icon: "num",   progress: 30,  color: "#2563EB", tag: "In Progress" },
  { title: "Classroom Words", icon: "class", progress: 0,   color: "#6B7280", tag: "Locked"      },
];

const quickActions = [
  { label: "Multiple Choice", icon: "mc",    color: "#2563EB", screen: "quizmc"       },
  { label: "Drag & Drop",     icon: "dnd",   color: "#1D4ED8", screen: "quizdnd"      },
  { label: "Gesture Cam",     icon: "cam",   color: "#0f3172", screen: "gesture"      },
  { label: "My Badges",       icon: "badge", color: "#fbbf24", screen: "achievements" },
];

function getGreeting() {
  const h = new Date().getHours();
  if (h < 12) return "Good morning!";
  if (h < 17) return "Good afternoon!";
  return "Good evening!";
}

// FSL Alphabet Icon using alphabets.png
function AlphabetLessonIcon({ size = 44 }) {
  const imgPath = `/public/img/alphabet.png`;
  return (
    <img 
      src={imgPath}
      alt="FSL Alphabet"
      width={size}
      height={size}
      style={{ objectFit: "contain" }}
      onError={(e) => {
        console.error("Failed to load image:", imgPath);
        e.target.style.display = 'none';
      }}
    />
  );
}

// Greetings Icon using greet.png
function GreetingsLessonIcon({ size = 44 }) {
  const imgPath = `/public/img/greet.png`;
  return (
    <img 
      src={imgPath}
      alt="Greetings"
      width={size}
      height={size}
      style={{ objectFit: "contain" }}
      onError={(e) => {
        console.error("Failed to load image:", imgPath);
        e.target.style.display = 'none';
      }}
    />
  );
}

// Numbers Icon using numbers.png
function NumbersLessonIcon({ size = 44 }) {
  const imgPath = `/public/img/numbers.png`;
  return (
    <img 
      src={imgPath}
      alt="Numbers"
      width={size}
      height={size}
      style={{ objectFit: "contain" }}
      onError={(e) => {
        console.error("Failed to load image:", imgPath);
        e.target.style.display = 'none';
      }}
    />
  );
}

function LessonIcon({ icon, size = 22 }) {
  switch (icon) {
    case "alpha": return <AlphabetLessonIcon size={36} />;
    case "greet": return <GreetingsLessonIcon size={36} />;
    case "num":   return <NumbersLessonIcon size={36} />;
    case "class": return <ClassroomIcon size={size} color="#9CA3AF" />;
    default:      return null;
  }
}

// Multiple Choice Icon using multiple_choice.png
function MultipleChoiceIcon({ size = 44 }) {
  const imgPath = `/public/img/multiple_choice.png`;
  return (
    <img 
      src={imgPath}
      alt="Multiple Choice"
      width={size}
      height={size}
      style={{ objectFit: "contain" }}
      onError={(e) => {
        console.error("Failed to load image:", imgPath);
        e.target.style.display = 'none';
      }}
    />
  );
}

// Drag & Drop Icon using dragNdrop.png
function DragDropIcon({ size = 44 }) {
  const imgPath = `/public/img/dragNdrop.png`;
  return (
    <img 
      src={imgPath}
      alt="Drag & Drop"
      width={size}
      height={size}
      style={{ objectFit: "contain" }}
      onError={(e) => {
        console.error("Failed to load image:", imgPath);
        e.target.style.display = 'none';
      }}
    />
  );
}

// Gesture Cam Icon using camera.png
function CameraIcon({ size = 44 }) {
  const imgPath = `/public/img/camera.png`;
  return (
    <img 
      src={imgPath}
      alt="Gesture Cam"
      width={size}
      height={size}
      style={{ objectFit: "contain" }}
      onError={(e) => {
        console.error("Failed to load image:", imgPath);
        e.target.style.display = 'none';
      }}
    />
  );
}

// Badge Gallery Icon Component (using badges.png)
function BadgeGalleryIcon({ size = 44 }) {
  const imgPath = `/public/img/badges.png`;
  return (
    <img 
      src={imgPath}
      alt="badges"
      width={size}
      height={size}
      style={{ objectFit: "contain" }}
      onError={(e) => {
        console.error("Failed to load image:", imgPath);
        e.target.style.display = 'none';
      }}
    />
  );
}

// Level 1 Badge Icon Component (using level_1.png)
function LevelOneIcon({ size = 44 }) {
  const imgPath = `/public/img/level_1.png`;
  return (
    <img 
      src={imgPath}
      alt="Level 1"
      width={size}
      height={size}
      style={{ objectFit: "contain" }}
      onError={(e) => {
        console.error("Failed to load image:", imgPath);
        e.target.style.display = 'none';
      }}
    />
  );
}

function QuickIcon({ icon, color }) {
  if (icon === "mc") return <MultipleChoiceIcon size={40} />;
  if (icon === "dnd") return <DragDropIcon size={40} />;
  if (icon === "cam") return <CameraIcon size={40} />;
  if (icon === "badge") return <BadgeGalleryIcon size={40} />;
  return null;
}

function PressableButton({ onClick, style, children, disabled }) {
  const [pressed, setPressed] = useState(false);
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      onMouseDown={() => setPressed(true)}
      onMouseUp={() => setPressed(false)}
      onMouseLeave={() => setPressed(false)}
      onTouchStart={() => setPressed(true)}
      onTouchEnd={() => setPressed(false)}
      style={{
        ...style,
        transform: pressed ? "scale(0.97)" : "scale(1)",
        transition: "transform 0.12s ease",
      }}
    >
      {children}
    </button>
  );
}

function GlassCard({ children, style }) {
  return (
    <div style={{
      background: "rgba(255,255,255,0.62)",
      border: "1px solid rgba(255,255,255,0.85)",
      borderRadius: 20,
      backdropFilter: "blur(8px)",
      boxShadow: "0 2px 12px rgba(15,49,114,0.09)",
      ...style,
    }}>
      {children}
    </div>
  );
}

export default function Dashboard({ nav, user }) {
  const xp    = user?.xp    || 340;
  const xpMax = 500;
  const xpPct = Math.min((xp / xpMax) * 100, 100);

  return (
    <div style={{
      background: "linear-gradient(180deg,#a8d4f5 0%,#c5e3f7 25%,#daeefb 55%,#eaf5fd 80%,#f0f8ff 100%)",
      minHeight: "100vh",
      paddingBottom: 88,
    }}>

      {/* ── Top bar ── */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "52px 20px 12px" }}>
        <span style={{ color: "#0f3172", fontSize: 22, fontWeight: 800, letterSpacing: 2 }}>SEÑAS</span>
        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
          <button style={{ background: "none", border: "none", cursor: "pointer", color: "#4b7bbb" }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10"/>
              <line x1="12" y1="8" x2="12" y2="8" strokeWidth="3" strokeLinecap="round"/>
              <line x1="12" y1="12" x2="12" y2="16" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </button>
          <div style={{ background: "rgba(255,255,255,0.7)", borderRadius: 20, padding: "5px 12px", display: "flex", alignItems: "center", gap: 5, color: "#0f3172", fontSize: 13, fontWeight: 700, boxShadow: "0 1px 4px rgba(0,0,0,0.08)" }}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="#fb923c">
              <path d="M12 2c0 6-8 8-8 14a8 8 0 0016 0C20 10 12 8 12 2z"/>
            </svg>
            {user?.streak || 12}
          </div>
          <button style={{ background: "none", border: "none", cursor: "pointer", color: "#4b7bbb" }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9"/>
              <path d="M13.73 21a2 2 0 01-3.46 0"/>
            </svg>
          </button>
        </div>
      </div>

      {/* ══ COMBINED HERO + LEVEL CARD ══ */}
      <div style={{ margin: "0 16px 14px" }}>
        <GlassCard style={{ padding: "18px 20px 16px", position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", top: -40, right: -40, width: 180, height: 180, borderRadius: "50%", background: "rgba(37,99,235,0.06)", pointerEvents: "none" }} />
          <div style={{ position: "absolute", bottom: -30, left: -20, width: 110, height: 110, borderRadius: "50%", background: "rgba(37,99,235,0.04)", pointerEvents: "none" }} />

          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
            <div style={{ flex: 1, paddingRight: 8 }}>
              <p style={{ color: "#4b7bbb", fontSize: 13, fontWeight: 600 }}>{getGreeting()}</p>
              <h1 style={{ color: "#0f3172", fontSize: 26, fontWeight: 800, lineHeight: 1.15, marginTop: 2, fontFamily: "var(--font-head)" }}>
                Hello, {user?.name || "Maria"}!
              </h1>

              <div style={{ display: "flex", gap: 6, marginTop: 8, flexWrap: "wrap" }}>
                <span style={{ background: "rgba(15,49,114,0.10)", borderRadius: 8, padding: "4px 10px", fontSize: 11, fontWeight: 700, color: "#0f3172", display: "flex", alignItems: "center", gap: 4 }}>
                  <StarIcon size={12} color="#fbbf24" /> Beginner
                </span>
                <span style={{ background: "rgba(251,191,36,0.15)", borderRadius: 8, padding: "4px 10px", fontSize: 11, fontWeight: 700, color: "#92400E", display: "flex", alignItems: "center", gap: 4 }}>
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="#fb923c"><path d="M12 2c0 6-8 8-8 14a8 8 0 0016 0C20 10 12 8 12 2z"/></svg>
                  {user?.streak || 5} day streak
                </span>
              </div>
            </div>

            <img
              src={senya_blue}
              alt="Senya"
              onClick={() => nav("tutorial")}
              style={{
                width: 100,
                height: 100,
                objectFit: "contain",
                filter: "drop-shadow(0 4px 12px rgba(15,49,114,0.18))",
                animation: "senya-bob 2.5s ease-in-out infinite",
                cursor: "pointer",
                flexShrink: 0,
                marginTop: -6,
              }}
            />
          </div>

          <div style={{ height: 1, background: "rgba(15,49,114,0.08)", margin: "14px 0 12px" }} />

          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{ width: 44, height: 44, borderRadius: 12, background: "rgba(251,191,36,0.15)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <LevelOneIcon size={36} />
            </div>

            <div style={{ flex: 1 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 5 }}>
                <div>
                  <span style={{ display: "inline-flex", alignItems: "center", background: "#1848c8", borderRadius: 6, padding: "2px 8px", fontSize: 9, fontWeight: 800, color: "#fff", letterSpacing: 1, marginRight: 6 }}>
                    LEVEL 1
                  </span>
                  <span style={{ fontSize: 14, fontWeight: 800, color: "#0f3172", fontFamily: "var(--font-head)" }}>Novice Signer</span>
                </div>
                <span style={{ fontSize: 11, fontWeight: 700, color: "#4b7bbb" }}>{Math.round(xpPct)}%</span>
              </div>
              <div style={{ background: "rgba(15,49,114,0.12)", borderRadius: 99, height: 8, overflow: "hidden" }}>
                <div style={{ height: "100%", width: `${xpPct}%`, background: "linear-gradient(90deg,#fbbf24,#f59e0b)", borderRadius: 99, transition: "width 0.5s" }} />
              </div>
              <p style={{ fontSize: 10, color: "#4b7bbb", fontWeight: 600, marginTop: 4 }}>
                {xp} / {xpMax} XP · {xpMax - xp} XP to Intermediate
              </p>
            </div>
          </div>
        </GlassCard>
      </div>

      {/* ══ DAILY CHALLENGE ══ */}
      <div style={{ margin: "0 16px 14px" }}>
        <PressableButton
          onClick={() => nav("quizmc")}
          style={{
            width: "100%",
            background: "linear-gradient(135deg, #1035a0 0%, #1848c8 50%, #2563EB 100%)",
            border: "none",
            borderRadius: 20,
            padding: 0,
            cursor: "pointer",
            textAlign: "left",
            overflow: "hidden",
            boxShadow: "0 6px 24px rgba(15,49,114,0.32)",
            position: "relative",
          }}
        >
          <div style={{ position: "absolute", top: -28, right: -28, width: 120, height: 120, borderRadius: "50%", background: "rgba(255,255,255,0.06)", pointerEvents: "none" }} />
          <div style={{ position: "absolute", bottom: -20, left: 60, width: 90, height: 90, borderRadius: "50%", background: "rgba(255,255,255,0.05)", pointerEvents: "none" }} />
          <div style={{ position: "absolute", top: 20, right: 100, width: 40, height: 40, borderRadius: "50%", background: "rgba(255,255,255,0.04)", pointerEvents: "none" }} />

          <div style={{ padding: "20px 20px 18px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
              <div style={{ width: 28, height: 28, borderRadius: 8, background: "rgba(255,255,255,0.18)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="10" stroke="#fff" strokeWidth="2"/>
                  <circle cx="12" cy="12" r="6"  stroke="rgba(255,255,255,0.6)" strokeWidth="2"/>
                  <circle cx="12" cy="12" r="2"  fill="#fff"/>
                </svg>
              </div>
              <span style={{ fontSize: 11, fontWeight: 800, color: "rgba(255,255,255,0.75)", textTransform: "uppercase", letterSpacing: "0.08em" }}>
                Daily Challenge
              </span>
              <span style={{ marginLeft: "auto", background: "rgba(251,191,36,0.25)", borderRadius: 99, padding: "3px 10px", fontSize: 11, fontWeight: 800, color: "#fde68a" }}>
                +50 XP
              </span>
            </div>

            <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: 12 }}>
              <div style={{ flex: 1 }}>
                <p style={{ fontSize: 22, fontWeight: 800, color: "#fff", fontFamily: "var(--font-head)", lineHeight: 1.2, marginBottom: 6 }}>
                  Practice 5 Alphabet Signs
                </p>
                <p style={{ fontSize: 12, color: "rgba(255,255,255,0.65)", fontWeight: 500, lineHeight: 1.4 }}>
                  Sign A through E and earn your daily streak bonus.
                </p>

                <div style={{ display: "flex", gap: 5, marginTop: 12 }}>
                  {[1,2,3,4,5].map(n => (
                    <div key={n} style={{
                      width: 28, height: 6, borderRadius: 99,
                      background: n <= 2 ? "#fbbf24" : "rgba(255,255,255,0.2)",
                    }} />
                  ))}
                </div>
                <p style={{ fontSize: 10, color: "rgba(255,255,255,0.5)", fontWeight: 600, marginTop: 5 }}>2 of 5 completed</p>
              </div>

              <div style={{ flexShrink: 0, display: "flex", flexDirection: "column", alignItems: "center", gap: 10 }}>
                <div style={{ width: 72, height: 72, borderRadius: 20, background: "rgba(255,255,255,0.12)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <svg width="42" height="42" viewBox="0 0 24 24" fill="none">
                    <path d="M6 3v12M6 3c0-1.1.9-2 2-2s2 .9 2 2v6M10 3v6M10 3c0-1.1.9-2 2-2s2 .9 2 2v6M14 5c0-1.1.9-2 2-2s2 .9 2 2v8c0 3.3-2.7 6-6 6H9a6 6 0 01-6-6V9c0-1.1.9-2 2-2s2 .9 2 2" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <div style={{ background: "#fbbf24", borderRadius: 12, padding: "9px 18px", display: "flex", alignItems: "center", gap: 6 }}>
                  <span style={{ color: "#78350f", fontWeight: 800, fontSize: 14 }}>Start</span>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#78350f" strokeWidth="2.5">
                    <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </PressableButton>
      </div>

      {/* ── Continue Learning ── */}
      <div style={{ margin: "0 16px 14px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
          <h2 style={{ fontFamily: "var(--font-head)", fontSize: 17, fontWeight: 800, color: "#0f3172" }}>Continue Learning</h2>
          <PressableButton
            onClick={() => nav("lessons")}
            style={{ background: "none", border: "none", color: "#2563EB", fontSize: 13, fontWeight: 700, cursor: "pointer", fontFamily: "var(--font-body)", padding: "4px 0" }}
          >
            See All →
          </PressableButton>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {lessons.map((l, i) => {
            const isLocked    = l.tag === "Locked";
            const isCompleted = l.tag === "Completed";
            return (
              <PressableButton
                key={i}
                onClick={() => !isLocked && nav("lessons")}
                disabled={isLocked}
                style={{
                  display: "flex", alignItems: "center", gap: 12,
                  background: "rgba(255,255,255,0.62)",
                  border: "1px solid rgba(255,255,255,0.85)",
                  borderRadius: 14, padding: 13,
                  cursor: isLocked ? "not-allowed" : "pointer",
                  textAlign: "left", width: "100%",
                  opacity: isLocked ? 0.5 : 1,
                  backdropFilter: "blur(8px)",
                  boxShadow: "0 2px 8px rgba(15,49,114,0.07)",
                  fontFamily: "var(--font-body)",
                }}
              >
                <div style={{ width: 44, height: 44, borderRadius: 12, background: isLocked ? "rgba(15,49,114,0.06)" : "rgba(37,99,235,0.10)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  {isCompleted
                    ? <CheckIcon size={22} color="#2563EB" />
                    : isLocked
                    ? <LockIcon size={22} color="#9CA3AF" />
                    : <LessonIcon icon={l.icon} />}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 8 }}>
                    <p style={{ fontSize: 14, fontWeight: 700, color: "#0f3172", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{l.title}</p>
                    <span style={{
                      fontSize: 10, fontWeight: 700, padding: "3px 9px", borderRadius: 99, flexShrink: 0,
                      background: isCompleted ? "rgba(37,99,235,0.12)" : isLocked ? "rgba(15,49,114,0.07)" : "rgba(251,191,36,0.18)",
                      color: isCompleted ? "#1848c8" : isLocked ? "#6B7280" : "#92400E",
                    }}>
                      {l.tag}
                    </span>
                  </div>
                  <div style={{ background: "rgba(15,49,114,0.10)", borderRadius: 99, height: 5, overflow: "hidden", marginTop: 7 }}>
                    <div style={{ height: "100%", width: `${l.progress}%`, background: isCompleted ? "linear-gradient(90deg,#60a5fa,#2563EB)" : "linear-gradient(90deg,#fbbf24,#f59e0b)", borderRadius: 99 }} />
                  </div>
                  <p style={{ fontSize: 10, color: "#4b7bbb", marginTop: 3, fontWeight: 600 }}>{l.progress}% complete</p>
                </div>
              </PressableButton>
            );
          })}
        </div>
      </div>

      {/* ── Quick Practice ── */}
      <div style={{ margin: "0 16px 0" }}>
        <h2 style={{ fontFamily: "var(--font-head)", fontSize: 17, fontWeight: 800, color: "#0f3172", marginBottom: 10 }}>Quick Practice</h2>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
          {quickActions.map((q, i) => (
            <PressableButton
              key={i}
              onClick={() => nav(q.screen)}
              style={{
                background: "rgba(255,255,255,0.62)",
                border: "1px solid rgba(255,255,255,0.85)",
                borderRadius: 14, padding: "14px 10px",
                cursor: "pointer", textAlign: "center",
                backdropFilter: "blur(8px)",
                boxShadow: "0 2px 8px rgba(15,49,114,0.07)",
                display: "flex", flexDirection: "column", alignItems: "center", gap: 7,
                fontFamily: "var(--font-body)",
              }}
            >
              <div style={{ width: 44, height: 44, borderRadius: 12, background: "rgba(37,99,235,0.10)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <QuickIcon icon={q.icon} color={q.color} />
              </div>
              <p style={{ fontSize: 12, fontWeight: 700, color: "#0f3172" }}>{q.label}</p>
            </PressableButton>
          ))}
        </div>
      </div>

      <BottomNav active="dashboard" nav={nav} />
    </div>
  );
}