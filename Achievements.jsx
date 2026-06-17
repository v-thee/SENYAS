import { useState } from "react";
import { senya_blue } from "./images";
import BottomNav from "./BottomNav";
import { ZapIcon, LockIcon, TrophyIcon, CheckIcon } from "./icons";

// Updated badges with your custom images from /img folder
const badges = [
  { name: "First Step",     image: "first_step.png",  desc: "Complete your first lesson",          earned: true,  color: "#10B981", xp: 10  },
  { name: "Alphabet Star",  image: "alphabet_star.png", desc: "Learn all 26 FSL alphabet signs",     earned: true,  color: "#F59E0B", xp: 50  },
  { name: "Streak Starter", image: "streak1.png",     desc: "Practice 3 days in a row",            earned: true,  color: "#EF4444", xp: 20  },
  { name: "Greeter",        image: "greetings.png",   desc: "Complete the Greetings module",       earned: true,  color: "#06B6D4", xp: 25  },
  { name: "Quiz Whiz",      icon: "brain",            desc: "Score 100% on any quiz",              earned: false, color: "#8B5CF6", xp: 30  },
  { name: "Sign Detective", icon: "search",           desc: "Use gesture recognition 10 times",    earned: false, color: "#2563EB", xp: 40  },
  { name: "Number Ninja",   icon: "num",              desc: "Learn numbers 1–10",                  earned: false, color: "#F97316", xp: 35  },
  { name: "Week Warrior",   icon: "cal",              desc: "7-day learning streak",               earned: false, color: "#EC4899", xp: 60  },
];

const milestones = [
  { label: "50 XP",   done: true  },
  { label: "100 XP",  done: true  },
  { label: "250 XP",  done: true  },
  { label: "500 XP",  done: false },
  { label: "1000 XP", done: false },
];

function TopBar() {
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "52px 20px 0" }}>
      <span style={{ color: "#0f3172", fontSize: 22, fontWeight: 800, letterSpacing: 2 }}>SEÑAS</span>
      <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
        <button style={{ background: "none", border: "none", cursor: "pointer", padding: 2 }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#4b7bbb" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10"/>
            <line x1="12" y1="8" x2="12" y2="8" strokeWidth="3"/>
            <line x1="12" y1="12" x2="12" y2="16"/>
          </svg>
        </button>
        <div style={{ background: "rgba(255,255,255,0.7)", borderRadius: 20, padding: "5px 12px", display: "flex", alignItems: "center", gap: 5, color: "#0f3172", fontSize: 13, fontWeight: 700, boxShadow: "0 1px 4px rgba(0,0,0,0.08)" }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="#fb923c">
            <path d="M12 2c0 6-8 8-8 14a8 8 0 0016 0C20 10 12 8 12 2z"/>
          </svg>
          12
        </div>
        <button style={{ background: "none", border: "none", cursor: "pointer", padding: 2 }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#4b7bbb" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9"/>
            <path d="M13.73 21a2 2 0 01-3.46 0"/>
          </svg>
        </button>
      </div>
    </div>
  );
}

// Badges Gallery Icon using badges.png
function BadgesGalleryIcon({ size = 40 }) {
  return (
    <img 
      src={`/public/img/badges.png`}
      alt="badges"
      width={size}
      height={size}
      style={{ objectFit: "contain" }}
    />
  );
}

// Custom badge component with your images
function CustomBadgeIcon({ image, color, size = 56 }) {
  return (
    <div style={{ position: "relative", width: size, height: size, display: "flex", alignItems: "center", justifyContent: "center" }}>
      {/* Outer glow */}
      <div style={{
        position: "absolute",
        width: size + 6,
        height: size + 6,
        borderRadius: (size + 6) * 0.35,
        background: `radial-gradient(circle, ${color}40 0%, ${color}00 70%)`,
        filter: "blur(4px)",
        zIndex: 0,
      }} />
      
      {/* Main badge with inner shadow for dimension */}
      <div style={{
        position: "relative",
        width: size,
        height: size,
        borderRadius: size * 0.35,
        background: `white`,
        boxShadow: `0 8px 16px -6px ${color}80, inset 0 2px 4px rgba(255,255,255,0.6), inset 0 -2px 4px rgba(0,0,0,0.05)`,
        zIndex: 1,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}>
        <img 
          src={`/img/${image}`}
          alt="badge"
          width={size - 16}
          height={size - 16}
          style={{ objectFit: "contain" }}
        />
      </div>
      
      {/* Cute sparkling star */}
      <div style={{
        position: "absolute",
        top: -4,
        right: -4,
        fontSize: 12,
        filter: "drop-shadow(0 2px 2px rgba(0,0,0,0.1))",
      }}>
        ✨
      </div>
    </div>
  );
}

// Locked badge component using locked.png image (no mini lock)
function LockedBadgeIcon({ size = 56 }) {
  return (
    <div style={{ position: "relative", width: size, height: size, display: "flex", alignItems: "center", justifyContent: "center" }}>
      {/* Outer glow */}
      <div style={{
        position: "absolute",
        width: size + 6,
        height: size + 6,
        borderRadius: (size + 6) * 0.35,
        background: "rgba(156,163,175,0.2)",
        filter: "blur(4px)",
        zIndex: 0,
      }} />
      
      {/* Main badge with greyed out style */}
      <div style={{
        position: "relative",
        width: size,
        height: size,
        borderRadius: size * 0.35,
        background: `rgba(156,163,175,0.15)`,
        boxShadow: `inset 0 2px 4px rgba(255,255,255,0.4), inset 0 -2px 4px rgba(0,0,0,0.05)`,
        zIndex: 1,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}>
        <img 
          src={`/img/locked.png`}
          alt="locked"
          width={size - 16}
          height={size - 16}
          style={{ objectFit: "contain", opacity: 0.7 }}
        />
      </div>
    </div>
  );
}

// SVG icon badges for locked ones (brain, search, num, cal) - these will be shown when earned
function SvgBadgeIcon({ icon, color, size = 56 }) {
  const r = size / 2;
  
  const icons = {
    brain: (
      <>
        <path
          d={`M${r-12} ${r+10}C${r-19} ${r+10} ${r-21} ${r+3} ${r-18} ${r-2}C${r-20} ${r-5} ${r-20} ${r-10} ${r-15} ${r-11}C${r-15} ${r-15} ${r-11} ${r-18} ${r-7} ${r-16}C${r-6} ${r-19} ${r-2} ${r-20} ${r} ${r-18}C${r+2} ${r-20} ${r+6} ${r-19} ${r+7} ${r-16}C${r+11} ${r-18} ${r+15} ${r-15} ${r+15} ${r-11}C${r+20} ${r-10} ${r+20} ${r-5} ${r+18} ${r-2}C${r+21} ${r+3} ${r+19} ${r+10} ${r+12} ${r+10}Z`}
          fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
        />
        <line x1={r} y1={r - 18} x2={r} y2={r + 10} stroke={color} strokeWidth="2" strokeLinecap="round" />
        <path d={`M${r-16} ${r-4}C${r-13} ${r-1} ${r-10} ${r-2} ${r-9} ${r-5}`} stroke={color} strokeWidth="2" strokeLinecap="round" fill="none" />
        <path d={`M${r+16} ${r-4}C${r+13} ${r-1} ${r+10} ${r-2} ${r+9} ${r-5}`} stroke={color} strokeWidth="2" strokeLinecap="round" fill="none" />
      </>
    ),
    search: (
      <>
        <circle cx={r - 5} cy={r - 5} r="11" fill="none" stroke={color} strokeWidth="4" strokeLinecap="round" />
        <circle cx={r - 5} cy={r - 5} r="5" fill={color} opacity="0.2" />
        <line x1={r + 3} y1={r + 3} x2={r + 14} y2={r + 14} stroke={color} strokeWidth="5" strokeLinecap="round" />
      </>
    ),
    num: (
      <>
        <rect x={r - 20} y={r - 16} width="16" height="20" rx="5" fill={color} />
        <text x={r - 12} y={r - 1} fontSize="12" fontWeight="800" fill="white" textAnchor="middle" fontFamily="sans-serif">1</text>
        <rect x={r - 8}  y={r - 10} width="16" height="20" rx="5" fill={color} />
        <text x={r}      y={r + 5}  fontSize="12" fontWeight="800" fill="white" textAnchor="middle" fontFamily="sans-serif">2</text>
        <rect x={r + 4}  y={r - 18} width="16" height="20" rx="5" fill={color} />
        <text x={r + 12} y={r - 3}  fontSize="12" fontWeight="800" fill="white" textAnchor="middle" fontFamily="sans-serif">3</text>
      </>
    ),
    cal: (
      <>
        <rect x={r - 20} y={r - 14} width="40" height="30" rx="8" fill="none" stroke={color} strokeWidth="2.5" />
        <line x1={r - 20} y1={r - 5} x2={r + 20} y2={r - 5} stroke={color} strokeWidth="2" />
        <line x1={r - 9} y1={r - 19} x2={r - 9} y2={r - 9} stroke={color} strokeWidth="3" strokeLinecap="round" />
        <line x1={r + 9} y1={r - 19} x2={r + 9} y2={r - 9} stroke={color} strokeWidth="3" strokeLinecap="round" />
        <circle cx={r - 13} cy={r + 3}  r="3" fill={color} />
        <circle cx={r}      cy={r + 3}  r="3" fill={color} />
        <circle cx={r + 13} cy={r + 3}  r="3" fill={color} />
        <circle cx={r - 13} cy={r + 11} r="3" fill={color} />
        <circle cx={r}      cy={r + 11} r="3" fill={color} />
        <circle cx={r + 13} cy={r + 11} r="3" fill={color} />
      </>
    ),
  };

  return (
    <div style={{ position: "relative", width: size, height: size, display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div style={{
        position: "absolute",
        width: size + 6,
        height: size + 6,
        borderRadius: (size + 6) * 0.35,
        background: `radial-gradient(circle, ${color}30 0%, ${color}00 70%)`,
        filter: "blur(4px)",
        zIndex: 0,
      }} />
      
      <div style={{
        position: "relative",
        width: size,
        height: size,
        borderRadius: size * 0.35,
        background: `linear-gradient(145deg, ${color}15, ${color}08)`,
        boxShadow: `0 8px 16px -6px ${color}40, inset 0 2px 4px rgba(255,255,255,0.6), inset 0 -2px 4px rgba(0,0,0,0.05)`,
        zIndex: 1,
      }}>
        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} style={{ display: "block" }}>
          <rect x="2" y="2" width={size - 4} height={size - 4} rx={size * 0.32} fill="none" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5" />
          {icons[icon]}
        </svg>
      </div>
      
      <div style={{
        position: "absolute",
        top: -4,
        right: -4,
        fontSize: 12,
        filter: "drop-shadow(0 2px 2px rgba(0,0,0,0.1))",
      }}>
        ✨
      </div>
    </div>
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

function PressableButton({ onClick, style, children, disabled }) {
  const [pressed, setPressed] = useState(false);
  return (
    <button
      onClick={onClick} disabled={disabled}
      onMouseDown={() => setPressed(true)}
      onMouseUp={() => setPressed(false)}
      onMouseLeave={() => setPressed(false)}
      onTouchStart={() => setPressed(true)}
      onTouchEnd={() => setPressed(false)}
      style={{ ...style, transform: pressed ? "scale(0.96)" : "scale(1)", transition: "transform 0.12s ease" }}
    >
      {children}
    </button>
  );
}

export default function Achievements({ nav, user }) {
  const [filter, setFilter] = useState("all");
  const earned   = badges.filter(b => b.earned).length;
  const totalXP  = user?.xp || 340;
  const xpToNext = 500 - totalXP;

  const filtered = badges.filter(b =>
    filter === "all"    ? true :
    filter === "earned" ? b.earned :
    !b.earned
  );

  return (
    <div style={{
      background: "linear-gradient(180deg,#a8d4f5 0%,#c5e3f7 25%,#daeefb 55%,#eaf5fd 80%,#f0f8ff 100%)",
      minHeight: "100vh",
      paddingBottom: 88,
    }}>
      <TopBar />

      {/* Hero banner */}
      <div style={{ margin: "14px 16px 0" }}>
        <GlassCard style={{ padding: "18px 20px", position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", top: -30, right: -30, width: 130, height: 130, borderRadius: "50%", background: "rgba(245,158,11,0.07)", pointerEvents: "none" }} />
          <div style={{ position: "absolute", bottom: -20, left: 20, width: 80, height: 80, borderRadius: "50%", background: "rgba(37,99,235,0.05)", pointerEvents: "none" }} />

          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
            <div style={{ flex: 1, paddingRight: 8 }}>
              <p style={{ color: "#4b7bbb", fontSize: 12, fontWeight: 600, marginBottom: 2 }}>Your collection</p>
              <h1 style={{ fontSize: 24, fontWeight: 800, color: "#0f3172", fontFamily: "var(--font-head)", lineHeight: 1.15, marginBottom: 10 }}>
                Achievements
              </h1>
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                <div style={{ background: "rgba(245,158,11,0.13)", borderRadius: 10, padding: "5px 12px", display: "flex", alignItems: "center", gap: 5 }}>
                  <BadgesGalleryIcon size={40} />
                  <span style={{ fontSize: 12, fontWeight: 800, color: "#92400E" }}>{earned}/{badges.length} badges</span>
                </div>
                <div style={{ background: "rgba(37,99,235,0.10)", borderRadius: 10, padding: "5px 12px", display: "flex", alignItems: "center", gap: 5 }}>
                  <ZapIcon size={14} color="#2563EB" />
                  <span style={{ fontSize: 12, fontWeight: 800, color: "#1848c8" }}>{totalXP} XP</span>
                </div>
              </div>
            </div>
            <img
              src={senya_blue}
              alt="Senya"
              onClick={() => nav("tutorial")}
              style={{
                width: 90, height: 90, objectFit: "contain",
                filter: "drop-shadow(0 4px 12px rgba(15,49,114,0.16))",
                animation: "senya-bob 2.5s ease-in-out infinite",
                cursor: "pointer", flexShrink: 0,
              }}
            />
          </div>
        </GlassCard>
      </div>

      {/* XP Milestones */}
      <div style={{ padding: "16px 16px 0" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
          <h2 style={{ fontSize: 16, fontWeight: 800, color: "#0f3172" }}>XP Milestones</h2>
          <span style={{ fontSize: 11, fontWeight: 700, color: "#4b7bbb", background: "rgba(15,49,114,0.08)", borderRadius: 99, padding: "3px 10px" }}>
            {xpToNext} XP to next
          </span>
        </div>

        <GlassCard style={{ padding: "18px 16px" }}>
          <div style={{ display: "flex", alignItems: "center" }}>
            {milestones.map((m, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", flex: i < milestones.length - 1 ? 1 : 0 }}>
                <div style={{
                  width: 36, height: 36, borderRadius: "50%", flexShrink: 0,
                  background: m.done ? "linear-gradient(135deg,#D97706,#F59E0B)" : "rgba(15,49,114,0.08)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  boxShadow: m.done ? "0 3px 10px rgba(245,158,11,0.35)" : "none",
                  border: m.done ? "none" : "2px solid rgba(15,49,114,0.15)",
                  transition: "all 0.3s",
                }}>
                  {m.done
                    ? <CheckIcon size={16} color="#fff" />
                    : <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="rgba(15,49,114,0.3)" strokeWidth="2"><circle cx="12" cy="12" r="8"/></svg>
                  }
                </div>
                {i < milestones.length - 1 && (
                  <div style={{
                    flex: 1, height: 4, borderRadius: 99,
                    background: milestones[i + 1]?.done
                      ? "linear-gradient(90deg,#F59E0B,#D97706)"
                      : "rgba(15,49,114,0.10)",
                    transition: "background 0.3s",
                  }} />
                )}
              </div>
            ))}
          </div>

          <div style={{ display: "flex", marginTop: 8 }}>
            {milestones.map((m, i) => (
              <span key={i} style={{
                fontSize: 9, fontWeight: 700, textAlign: "center",
                color: m.done ? "#92400E" : "#9CA3AF",
                flex: i < milestones.length - 1 ? 1 : 0,
                minWidth: 36,
              }}>
                {m.label}
              </span>
            ))}
          </div>

          <div style={{ marginTop: 14 }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 5 }}>
              <span style={{ fontSize: 10, fontWeight: 700, color: "#4b7bbb", textTransform: "uppercase", letterSpacing: 0.8 }}>Current progress</span>
              <span style={{ fontSize: 11, fontWeight: 800, color: "#0f3172" }}>{totalXP} / 500 XP</span>
            </div>
            <div style={{ background: "rgba(15,49,114,0.10)", borderRadius: 99, height: 8, overflow: "hidden" }}>
              <div style={{ height: "100%", width: `${Math.min((totalXP / 500) * 100, 100)}%`, background: "linear-gradient(90deg,#fbbf24,#f59e0b)", borderRadius: 99, transition: "width 0.6s" }} />
            </div>
          </div>
        </GlassCard>
      </div>

      {/* Filter tabs */}
      <div style={{ padding: "16px 16px 0" }}>
        <div style={{ display: "flex", gap: 8 }}>
          {[
            { key: "all",    label: `All (${badges.length})` },
            { key: "earned", label: `Earned (${earned})` },
            { key: "locked", label: `Locked (${badges.length - earned})` },
          ].map(tab => (
            <PressableButton
              key={tab.key}
              onClick={() => setFilter(tab.key)}
              style={{
                flex: 1, padding: "9px 4px",
                background: filter === tab.key ? "#1848c8" : "rgba(255,255,255,0.62)",
                border: filter === tab.key ? "none" : "1px solid rgba(255,255,255,0.85)",
                borderRadius: 12,
                color: filter === tab.key ? "#fff" : "#4b7bbb",
                fontSize: 12, fontWeight: 700, cursor: "pointer",
                backdropFilter: "blur(8px)",
                boxShadow: filter === tab.key ? "0 3px 12px rgba(15,49,114,0.25)" : "0 2px 8px rgba(15,49,114,0.07)",
              }}
            >
              {tab.label}
            </PressableButton>
          ))}
        </div>
      </div>

      {/* Badges grid */}
      <div style={{ padding: "14px 16px 0" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
          {filtered.map((b, i) => (
            <GlassCard
              key={i}
              style={{
                padding: 16,
                opacity: b.earned ? 1 : 0.85,
                position: "relative",
                overflow: "hidden",
                transition: "opacity 0.2s",
              }}
            >
              {/* Earned ribbon */}
              {b.earned && (
                <div style={{
                  position: "absolute", top: 0, right: 0,
                  background: "linear-gradient(135deg,#059669,#10B981)",
                  borderRadius: "0 20px 0 12px",
                  padding: "4px 10px",
                  fontSize: 9, fontWeight: 800, color: "#fff",
                  letterSpacing: 0.5,
                }}>
                  ✓ EARNED
                </div>
              )}

              {/* Badge icon */}
              <div style={{ marginBottom: 10, display: "flex", justifyContent: "center" }}>
                {b.earned ? (
                  b.image ? (
                    <CustomBadgeIcon image={b.image} color={b.color} size={56} />
                  ) : (
                    <SvgBadgeIcon icon={b.icon} color={b.color} size={56} />
                  )
                ) : (
                  <LockedBadgeIcon size={56} />
                )}
              </div>

              <p style={{ fontSize: 13, fontWeight: 800, color: b.earned ? "#0f3172" : "#9CA3AF", marginBottom: 3, lineHeight: 1.2 }}>
                {b.name}
              </p>
              <p style={{ fontSize: 10.5, color: "#6B7280", lineHeight: 1.45, marginBottom: 8 }}>
                {b.desc}
              </p>

              <div style={{
                display: "inline-flex", alignItems: "center", gap: 4,
                background: b.earned ? `${b.color}15` : "rgba(15,49,114,0.06)",
                borderRadius: 99, padding: "3px 10px",
              }}>
                <ZapIcon size={11} color={b.earned ? b.color : "#9CA3AF"} />
                <span style={{ fontSize: 11, fontWeight: 800, color: b.earned ? b.color : "#9CA3AF" }}>
                  +{b.xp} XP
                </span>
              </div>
            </GlassCard>
          ))}
        </div>

        {filtered.length === 0 && (
          <GlassCard style={{ padding: "32px 20px", textAlign: "center", marginTop: 0 }}>
            <div style={{ fontSize: 40, marginBottom: 10 }}>🔍</div>
            <p style={{ fontSize: 14, fontWeight: 700, color: "#0f3172", marginBottom: 4 }}>No badges here yet</p>
            <p style={{ fontSize: 12, color: "#6B7280" }}>Keep learning to unlock more!</p>
          </GlassCard>
        )}
      </div>

      {/* Motivational footer card */}
      <div style={{ padding: "16px 16px 0" }}>
        <div style={{
          background: "linear-gradient(135deg,#1035a0,#1848c8,#2563EB)",
          borderRadius: 20, padding: "18px 20px",
          display: "flex", alignItems: "center", gap: 14,
          boxShadow: "0 6px 20px rgba(15,49,114,0.28)",
          position: "relative", overflow: "hidden",
        }}>
          <div style={{ position: "absolute", top: -20, right: -20, width: 100, height: 100, borderRadius: "50%", background: "rgba(255,255,255,0.05)" }} />
          <div style={{ width: 46, height: 46, borderRadius: 13, background: "rgba(255,255,255,0.15)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
            <BadgesGalleryIcon size={40} />
          </div>
          <div style={{ flex: 1 }}>
            <p style={{ fontSize: 14, fontWeight: 800, color: "#fff", marginBottom: 2 }}>
              {badges.length - earned} badges left to unlock!
            </p>
            <p style={{ fontSize: 11, color: "rgba(255,255,255,0.65)" }}>
              Keep practicing to earn them all.
            </p>
          </div>
          <PressableButton
            onClick={() => nav("lessons")}
            style={{
              background: "#fbbf24", border: "none", borderRadius: 12,
              padding: "9px 14px", color: "#78350f",
              fontSize: 12, fontWeight: 800, cursor: "pointer", flexShrink: 0,
            }}
          >
            Practice →
          </PressableButton>
        </div>
      </div>

      <BottomNav active="achievements" nav={nav} />
    </div>
  );
}