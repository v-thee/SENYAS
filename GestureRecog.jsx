import { useState, useRef, useEffect } from "react";
import { senya_logo, senya_blue } from "./images";

const signs = [
  { letter: "A", hint: "Make a closed fist with your thumb on the side" },
  { letter: "B", hint: "Hold up 4 fingers straight with thumb folded in" },
  { letter: "C", hint: "Curve your hand like the letter C" },
  { letter: "D", hint: "Point index finger up, others curled" },
  { letter: "E", hint: "All fingers curled, thumb across" },
];

// ========== SVG ICONS ==========
const CameraIcon = ({ size = 24, color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
    <circle cx="12" cy="13" r="4" />
  </svg>
);

const CheckCircleIcon = ({ size = 24, color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <polyline points="8 12 11 15 16 9" />
  </svg>
);

const XCircleIcon = ({ size = 24, color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

const HandIcon = ({ size = 24, color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18.84 4.61a3 3 0 0 0-4.24 0L8 11.18V7.5a3 3 0 0 0-6 0v6.5c0 2.5 1 5 3.5 6.5a12 12 0 0 0 7 2h4a4 4 0 0 0 4-4v-5.5a3 3 0 0 0-1.66-2.66z" />
    <path d="M12 13v-6" />
    <path d="M16 11v-3" />
  </svg>
);

const TrophyIcon = ({ size = 24, color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
    <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
    <path d="M4 22h16" />
    <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" />
    <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" />
    <path d="M18 2H6v7a6 6 0 0 0 12 0V2z" />
    <circle cx="12" cy="9" r="2" fill={color} fillOpacity="0.3" />
  </svg>
);

const StarIcon = ({ size = 24, color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={color} stroke="none">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
);

const ArrowRightIcon = ({ size = 24, color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="12" x2="19" y2="12" />
    <polyline points="12 5 19 12 12 19" />
  </svg>
);

const ArrowLeftIcon = ({ size = 24, color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="19" y1="12" x2="5" y2="12" />
    <polyline points="12 19 5 12 12 5" />
  </svg>
);

const AlertCircleIcon = ({ size = 24, color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <line x1="12" y1="8" x2="12" y2="12" />
    <line x1="12" y1="16" x2="12.01" y2="16" />
  </svg>
);

const PlayIcon = ({ size = 24, color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="5 3 19 12 5 21 5 3" />
  </svg>
);

const SparklesIcon = ({ size = 24, color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 3L14 8L19 10L14 12L12 17L10 12L5 10L10 8L12 3Z" />
    <path d="M19 4L20 7L23 8L20 9L19 12L18 9L15 8L18 7L19 4Z" />
  </svg>
);

const RefreshIcon = ({ size = 24, color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M23 4v6h-6" />
    <path d="M1 20v-6h6" />
    <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10" />
    <path d="M20.49 15a9 9 0 0 1-14.85 3.36L1 14" />
  </svg>
);

const HomeIcon = ({ size = 24, color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2h-5v-8H7v8H5a2 2 0 0 1-2-2z" />
  </svg>
);

const ScanIcon = ({ size = 24, color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
    <line x1="9" y1="3" x2="9" y2="21" />
    <line x1="15" y1="3" x2="15" y2="21" />
    <line x1="3" y1="9" x2="21" y2="9" />
    <line x1="3" y1="15" x2="21" y2="15" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

const FingerprintIcon = ({ size = 24, color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 10v4" />
    <path d="M8 12v2" />
    <path d="M16 11v3" />
    <path d="M4 15c1.5 1 4 2 8 2s6.5-1 8-2" />
    <path d="M4 11c1.5-1 4-2 8-2s6.5 1 8 2" />
    <path d="M3 18c1.5 1.5 4 2 9 2s7.5-.5 9-2" />
  </svg>
);

const ConfettiIcon = ({ size = 24, color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5">
    <circle cx="12" cy="12" r="3" fill={color} fillOpacity="0.5" />
    <path d="M18 6L20 4" stroke={color} strokeWidth="2" />
    <path d="M6 18L4 20" stroke={color} strokeWidth="2" />
    <path d="M20 20L18 18" stroke={color} strokeWidth="2" />
    <path d="M4 4L6 6" stroke={color} strokeWidth="2" />
  </svg>
);

const AlphabetIcon = ({ size = 24, color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2">
    <rect x="3" y="3" width="18" height="18" rx="2" />
    <text x="12" y="17" textAnchor="middle" fill={color} fontSize="12" fontWeight="bold">A</text>
  </svg>
);

const NumbersIcon = ({ size = 24, color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2">
    <rect x="3" y="3" width="18" height="18" rx="2" />
    <text x="12" y="17" textAnchor="middle" fill={color} fontSize="12" fontWeight="bold">123</text>
  </svg>
);

const BasicWordsIcon = ({ size = 24, color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2">
    <rect x="3" y="3" width="18" height="18" rx="2" />
    <text x="12" y="17" textAnchor="middle" fill={color} fontSize="10" fontWeight="bold">ABC</text>
  </svg>
);

const SentenceIcon = ({ size = 24, color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2">
    <rect x="3" y="3" width="18" height="18" rx="2" />
    <text x="12" y="16" textAnchor="middle" fill={color} fontSize="8" fontWeight="bold">Hello</text>
  </svg>
);

const LockIcon = ({ size = 24, color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
  </svg>
);

const PlaceHandIcon = ({ size = 24, color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3" />
  </svg>
);

// ========== BUTTON COMPONENT ==========
const InteractiveButton = ({ onClick, children, variant = "primary", disabled = false, style = {} }) => {
  const [isPressed, setIsPressed] = useState(false);
  
  const variants = {
    primary: { background: "linear-gradient(135deg, #2563EB, #1D4ED8)", color: "#fff" },
    success: { background: "linear-gradient(135deg, #10B981, #059669)", color: "#fff" },
    secondary: { background: "rgba(255,255,255,0.15)", color: "#fff" },
    outline: { background: "transparent", color: "#2563EB", border: "2px solid #2563EB" },
  };
  
  const variantStyle = variants[variant] || variants.primary;
  
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      onMouseDown={() => setIsPressed(true)}
      onMouseUp={() => setIsPressed(false)}
      onMouseLeave={() => setIsPressed(false)}
      onTouchStart={() => setIsPressed(true)}
      onTouchEnd={() => setIsPressed(false)}
      style={{
        ...variantStyle,
        ...style,
        borderRadius: 60,
        padding: "14px 24px",
        fontSize: 16,
        fontWeight: 700,
        cursor: disabled ? "not-allowed" : "pointer",
        opacity: disabled ? 0.5 : 1,
        transform: isPressed ? "scale(0.97)" : "scale(1)",
        transition: "transform 0.12s ease",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 10,
        border: variantStyle.border || "none",
        fontFamily: "var(--font-body)",
      }}
    >
      {children}
    </button>
  );
};

// ========== LESSON CARD COMPONENT ==========
const LessonCard = ({ icon: Icon, title, subtitle, progress, isLocked = false, onClick }) => {
  return (
    <div
      onClick={!isLocked ? onClick : undefined}
      style={{
        background: isLocked ? "rgba(255,255,255,0.5)" : "rgba(255,255,255,0.85)",
        borderRadius: 20,
        padding: "14px 16px",
        flex: 1,
        minWidth: 140,
        textAlign: "center",
        cursor: isLocked ? "not-allowed" : "pointer",
        opacity: isLocked ? 0.6 : 1,
        transition: "transform 0.2s, box-shadow 0.2s",
        border: isLocked ? "1px solid rgba(156,163,175,0.5)" : "1px solid rgba(255,255,255,0.6)",
        backdropFilter: "blur(8px)",
      }}
      onMouseEnter={(e) => {
        if (!isLocked) {
          e.currentTarget.style.transform = "translateY(-4px)";
          e.currentTarget.style.boxShadow = "0 8px 20px rgba(0,0,0,0.1)";
        }
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = "none";
      }}
    >
      <div style={{ position: "relative", display: "inline-block" }}>
        <Icon size={32} color={isLocked ? "#9CA3AF" : "#2563EB"} />
        {isLocked && (
          <div style={{
            position: "absolute",
            top: -8,
            right: -12,
            background: "rgba(0,0,0,0.6)",
            borderRadius: "50%",
            padding: 2,
          }}>
            <LockIcon size={14} color="#fff" />
          </div>
        )}
      </div>
      <p style={{ fontWeight: 700, color: isLocked ? "#9CA3AF" : "#0f3172", marginTop: 10, fontSize: 14 }}>{title}</p>
      <p style={{ fontSize: 11, color: isLocked ? "#9CA3AF" : "#4b7bbb", marginTop: 2 }}>{subtitle}</p>
      {!isLocked && (
        <>
          <div style={{ background: "rgba(37,99,235,0.15)", borderRadius: 99, height: 4, marginTop: 10, overflow: "hidden" }}>
            <div style={{ width: `${progress}%`, height: "100%", background: "linear-gradient(90deg, #2563EB, #60A5FA)", borderRadius: 99 }} />
          </div>
          <p style={{ fontSize: 10, color: "#2563EB", marginTop: 5, fontWeight: 600 }}>{progress}% complete</p>
        </>
      )}
      {isLocked && (
        <p style={{ fontSize: 10, color: "#9CA3AF", marginTop: 8 }}>Complete previous lesson</p>
      )}
    </div>
  );
};

// ========== IMPROVED GESTURE FEEDBACK BUBBLE (LESS CRAMPED) ==========
const GestureFeedbackBubble = ({ message, type = "info", isVisible = true }) => {
  const [isAnimating, setIsAnimating] = useState(false);
  
  useEffect(() => {
    if (isVisible) {
      setIsAnimating(true);
      const timer = setTimeout(() => setIsAnimating(false), 300);
      return () => clearTimeout(timer);
    }
  }, [isVisible, message]);
  
  const typeStyles = {
    info: {
      background: "linear-gradient(135deg, #1E293B, #0F172A)",
      borderColor: "#3B82F6",
      iconBg: "rgba(59,130,246,0.15)",
      iconColor: "#3B82F6",
    },
    success: {
      background: "linear-gradient(135deg, #064E3B, #022C22)",
      borderColor: "#10B981",
      iconBg: "rgba(16,185,129,0.15)",
      iconColor: "#10B981",
    },
    error: {
      background: "linear-gradient(135deg, #7F1D1D, #450A0A)",
      borderColor: "#EF4444",
      iconBg: "rgba(239,68,68,0.15)",
      iconColor: "#EF4444",
    },
    detecting: {
      background: "linear-gradient(135deg, #451A03, #2E0A00)",
      borderColor: "#F59E0B",
      iconBg: "rgba(245,158,11,0.15)",
      iconColor: "#F59E0B",
    }
  };
  
  const style = typeStyles[type] || typeStyles.info;
  
  return (
    <div style={{
      background: style.background,
      borderRadius: 28,
      padding: "20px 24px",
      borderLeft: `5px solid ${style.borderColor}`,
      animation: isAnimating ? "pulseGlow 0.3s ease-in-out" : "none",
      boxShadow: "0 12px 28px rgba(0,0,0,0.25)",
      backdropFilter: "blur(10px)",
      position: "relative",
      overflow: "hidden",
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
        <div style={{
          width: 56,
          height: 56,
          borderRadius: 56,
          background: style.iconBg,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
        }}>
          {type === "info" && <ScanIcon size={28} color={style.iconColor} />}
          {type === "success" && <CheckCircleIcon size={28} color={style.iconColor} />}
          {type === "error" && <XCircleIcon size={28} color={style.iconColor} />}
          {type === "detecting" && <FingerprintIcon size={28} color={style.iconColor} />}
        </div>
        <div style={{ flex: 1 }}>
          <p style={{ color: "#F1F5F9", fontSize: 15, fontWeight: 500, lineHeight: 1.45, margin: 0 }}>
            {message}
          </p>
        </div>
      </div>
      {/* Animated pulse line */}
      <div style={{
        position: "absolute",
        bottom: 0,
        left: 0,
        height: 3,
        background: `linear-gradient(90deg, ${style.borderColor}, transparent)`,
        animation: "slideRight 2s ease-in-out infinite",
        width: "100%",
        borderRadius: 3,
      }} />
    </div>
  );
};

// ========== PRE-ACHIEVEMENT ANIMATION ==========
const PreAchievementAnimation = ({ onComplete, score, totalSigns }) => {
  const [stage, setStage] = useState(0);
  
  useEffect(() => {
    const timer1 = setTimeout(() => setStage(1), 300);
    const timer2 = setTimeout(() => setStage(2), 800);
    const timer3 = setTimeout(() => setStage(3), 1300);
    const timer4 = setTimeout(() => onComplete(), 2000);
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
    };
  }, []);
  
  const percentCorrect = (score / totalSigns) * 100;
  let message = "";
  let messageColor = "";
  
  if (percentCorrect === 100) { message = "PERFECT SCORE!"; messageColor = "#F59E0B"; }
  else if (percentCorrect >= 80) { message = "GREAT JOB!"; messageColor = "#10B981"; }
  else { message = "WELL DONE!"; messageColor = "#3B82F6"; }
  
  return (
    <div style={{
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: "linear-gradient(135deg, #0f172a, #1e1b4b)",
      zIndex: 3000,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      borderRadius: "inherit",
    }}>
      {stage >= 1 && (
        <div style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none", borderRadius: "inherit" }}>
          {[...Array(40)].map((_, i) => (
            <div
              key={i}
              style={{
                position: "absolute",
                width: Math.random() * 8 + 4,
                height: Math.random() * 8 + 4,
                background: `hsl(${Math.random() * 360}, 70%, 60%)`,
                borderRadius: Math.random() > 0.5 ? "50%" : "0",
                left: `${Math.random() * 100}%`,
                top: "-10px",
                animation: `confetti ${Math.random() * 2 + 1.5}s ease-out forwards`,
                animationDelay: `${Math.random() * 0.5}s`,
              }}
            />
          ))}
        </div>
      )}
      
      <div style={{
        textAlign: "center",
        animation: stage === 0 ? "scaleUp 0.3s ease-out" : 
                   stage === 1 ? "pulseGlow 0.5s ease-in-out" : 
                   stage === 2 ? "bounceIn 0.4s ease-out" : "slideUp 0.3s ease-out",
      }}>
        {stage === 0 && (
          <div style={{ width: 80, height: 80, margin: "0 auto", animation: "spin 1s linear infinite" }}>
            <FingerprintIcon size={80} color="#60A5FA" />
          </div>
        )}
        {stage === 1 && (
          <div style={{ animation: "bounceIn 0.3s ease-out" }}>
            <ConfettiIcon size={70} color="#fbbf24" />
          </div>
        )}
        {stage >= 2 && (
          <>
            <div style={{ animation: "trophyBounce 0.6s ease-in-out" }}>
              <TrophyIcon size={90} color="#fbbf24" />
            </div>
            <h2 style={{ color: messageColor, fontSize: 28, fontWeight: 900, marginTop: 20, letterSpacing: 2 }}>
              {message}
            </h2>
            <p style={{ color: "#94A3B8", fontSize: 14, marginTop: 10 }}>Calculating your achievements...</p>
          </>
        )}
      </div>
    </div>
  );
};

// ========== ANIMATED RESULT MODAL ==========
const AnimatedResultModal = ({ isVisible, isSuccess, onComplete }) => {
  const [animationStage, setAnimationStage] = useState(0);
  
  useEffect(() => {
    if (isVisible) {
      setAnimationStage(0);
      const timer1 = setTimeout(() => setAnimationStage(1), 200);
      const timer2 = setTimeout(() => setAnimationStage(2), 500);
      const timer3 = setTimeout(() => { setAnimationStage(3); onComplete(); }, 1200);
      return () => {
        clearTimeout(timer1);
        clearTimeout(timer2);
        clearTimeout(timer3);
      };
    }
  }, [isVisible]);
  
  if (!isVisible) return null;
  
  return (
    <div style={{
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: animationStage >= 2 ? (isSuccess ? "rgba(16,185,129,0.3)" : "rgba(239,68,68,0.3)") : "rgba(0,0,0,0.7)",
      backdropFilter: animationStage >= 2 ? "blur(4px)" : "blur(8px)",
      zIndex: 2000,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      borderRadius: "inherit",
    }}>
      <div style={{
        background: "linear-gradient(135deg, #1E293B, #0F172A)",
        borderRadius: 48,
        padding: "32px 40px",
        textAlign: "center",
        transform: `scale(${animationStage === 0 ? 0.7 : animationStage === 1 ? 1.1 : 1})`,
        opacity: animationStage === 3 ? 0 : 1,
        transition: "all 0.3s cubic-bezier(0.34, 1.2, 0.64, 1)",
        border: `2px solid ${isSuccess ? "#10B981" : "#EF4444"}`,
      }}>
        {animationStage === 0 && (
          <div style={{ width: 70, height: 70, margin: "0 auto", animation: "spin 0.8s linear infinite" }}>
            <FingerprintIcon size={70} color={isSuccess ? "#10B981" : "#F59E0B"} />
          </div>
        )}
        {animationStage === 1 && (
          <div style={{ animation: "bounceIn 0.3s ease-out" }}>
            {isSuccess ? <CheckCircleIcon size={70} color="#10B981" /> : <XCircleIcon size={70} color="#EF4444" />}
          </div>
        )}
        {animationStage >= 1 && (
          <>
            <p style={{ color: "#fff", fontSize: 24, fontWeight: 800, marginTop: 14 }}>
              {isSuccess ? "Correct!" : "Try Again"}
            </p>
            <p style={{ color: "#94A3B8", fontSize: 12, marginTop: 6 }}>
              {isSuccess ? "Great job! Keep going!" : "Almost there! Watch the guide."}
            </p>
          </>
        )}
      </div>
    </div>
  );
};

// ========== MAIN COMPONENT ==========
export default function GestureRecognitionFlow({ nav }) {
  const [screen, setScreen] = useState("intro");
  const [cameraAllowed, setCameraAllowed] = useState(false);
  const [cameraError, setCameraError] = useState(null);
  const [phase, setPhase] = useState("ready");
  const [signIdx, setSignIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [showResultModal, setShowResultModal] = useState(false);
  const [showPreAchievement, setShowPreAchievement] = useState(false);
  const [lastResult, setLastResult] = useState(null);
  const [isDetecting, setIsDetecting] = useState(false);
  const [selectedLesson, setSelectedLesson] = useState(null);
  
  const videoRef = useRef(null);
  const streamRef = useRef(null);
  const detectionTimeoutRef = useRef(null);

  const sign = signs[signIdx];
  const totalSigns = signs.length;

  useEffect(() => {
    return () => {
      if (streamRef.current) streamRef.current.getTracks().forEach(track => track.stop());
      if (detectionTimeoutRef.current) clearTimeout(detectionTimeoutRef.current);
    };
  }, []);

  const startCamera = async () => {
    setCameraError(null);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: "user" } });
      if (videoRef.current) videoRef.current.srcObject = stream;
      streamRef.current = stream;
      setCameraAllowed(true);
      setTimeout(() => setScreen("practice"), 100);
    } catch (err) {
      setCameraError("Camera access denied. Please allow camera to practice gestures.");
    }
  };

  const startDetection = () => {
    setPhase("detecting");
    setIsDetecting(true);
    detectionTimeoutRef.current = setTimeout(() => {
      const success = Math.random() > 0.2;
      setLastResult(success);
      setShowResultModal(true);
      setIsDetecting(false);
    }, 2000);
  };
  
  const handleResultComplete = () => {
    setShowResultModal(false);
    if (lastResult) { setPhase("success"); setScore(s => s + 1); }
    else { setPhase("fail"); }
  };

  const nextSign = () => {
    if (detectionTimeoutRef.current) clearTimeout(detectionTimeoutRef.current);
    if (signIdx < totalSigns - 1) {
      setSignIdx(signIdx + 1);
      setPhase("ready");
      setIsDetecting(false);
    } else {
      setShowPreAchievement(true);
    }
  };
  
  const handlePreAchievementComplete = () => {
    setShowPreAchievement(false);
    setScreen("achievement");
  };

  const retrySign = () => { setPhase("ready"); setIsDetecting(false); };
  const restartPractice = () => { setSignIdx(0); setScore(0); setPhase("ready"); setIsDetecting(false); setScreen("practice"); };
  
  const getFeedbackType = () => {
    if (phase === "detecting") return "detecting";
    if (phase === "success") return "success";
    if (phase === "fail") return "error";
    return "info";
  };
  
  const getFeedbackMessage = () => {
    if (phase === "detecting") return "🔍 Analyzing your hand position... Please keep your hand steady in the frame!";
    if (phase === "success") return "🎉 Perfect match! Great form! Moving to the next sign...";
    if (phase === "fail") return "💪 Almost there! Make sure your fingers are positioned like the example shows. Try again!";
    return `👋 Ready to practice? Show me the sign for letter ${sign.letter}. I'll watch your hand!`;
  };
  
  const handleLessonSelect = (lesson) => {
    setSelectedLesson(lesson);
    setScreen("camera-permission");
  };

  // ========== INTRO SCREEN ==========
  if (screen === "intro") {
    const lessons = [
      { id: "alphabet", title: "Alphabets", subtitle: "Fingerspelling A-Z", progress: 20, icon: AlphabetIcon, isLocked: false },
      { id: "numbers", title: "Numbers", subtitle: "Counting 1–100", progress: 1, icon: NumbersIcon, isLocked: false },
      { id: "basicWords", title: "Basic Words", subtitle: "Common signs", progress: 0, icon: BasicWordsIcon, isLocked: true },
      { id: "sentences", title: "Sentences", subtitle: "Full phrases", progress: 0, icon: SentenceIcon, isLocked: true },
    ];

    return (
      <div style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #E8F4FD 0%, #D4EAF8 50%, #C5E3F7 100%)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
      }}>
        <div style={{ maxWidth: 450, width: "100%" }}>
          <div style={{ textAlign: "center", marginBottom: 32 }}>
            <img src={senya_logo} alt="Senya" style={{
              width: 100,
              height: 100,
              objectFit: "contain",
              margin: "0 auto 12px",
              filter: "drop-shadow(0 8px 20px rgba(15,49,114,0.2))",
            }} />
            <h1 style={{ fontSize: 32, fontWeight: 800, color: "#0f3172", marginBottom: 4 }}>SEÑAS</h1>
            <p style={{ color: "#2563EB", fontSize: 16, fontWeight: 600 }}>Let's Practice Your Signs!</p>
          </div>

          <div style={{
            background: "rgba(255,255,255,0.85)",
            borderRadius: 24,
            padding: "16px 20px",
            marginBottom: 28,
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
              <SparklesIcon size={22} color="#fbbf24" />
              <span style={{ fontWeight: 800, color: "#0f3172" }}>Pro Tip</span>
            </div>
            <p style={{ color: "#334155", fontSize: 13, lineHeight: 1.5 }}>
              Practicing for just 5 minutes a day is more effective than an hour once a week!
            </p>
          </div>

          <div style={{ marginBottom: 16 }}>
            <p style={{ fontWeight: 700, color: "#0f3172", marginBottom: 12, fontSize: 15 }}>Choose a category to practice the gestures you've learned:</p>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
              {lessons.map((lesson) => (
                <LessonCard
                  key={lesson.id}
                  icon={lesson.icon}
                  title={lesson.title}
                  subtitle={lesson.subtitle}
                  progress={lesson.progress}
                  isLocked={lesson.isLocked}
                  onClick={() => handleLessonSelect(lesson)}
                />
              ))}
            </div>
          </div>

          <p style={{ marginTop: 24, color: "#64748B", fontSize: 12, textAlign: "center" }}>
            Don't be afraid to make mistakes — that's how we learn!
          </p>
        </div>
      </div>
    );
  }

  // ========== CAMERA PERMISSION SCREEN ==========
  if (screen === "camera-permission") {
    return (
      <div style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #E8F4FD 0%, #D4EAF8 50%, #C5E3F7 100%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
      }}>
        <div style={{
          background: "rgba(255,255,255,0.92)",
          borderRadius: 36,
          padding: "32px 24px",
          maxWidth: 340,
          width: "100%",
          textAlign: "center",
        }}>
          <div style={{ width: 80, height: 80, background: "linear-gradient(135deg, #2563EB, #1D4ED8)", borderRadius: 60, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px" }}>
            <CameraIcon size={44} color="#fff" />
          </div>
          
          <h2 style={{ color: "#0f3172", fontSize: 22, fontWeight: 800, marginBottom: 10 }}>Allow Camera Access?</h2>
          <p style={{ color: "#475569", fontSize: 14, lineHeight: 1.5, marginBottom: 24 }}>
            We use your camera to check your hand signs and help you practice. Your camera is only used during practice and is not recorded.
          </p>

          {cameraError && (
            <div style={{ background: "#FEF2F2", borderRadius: 14, padding: 12, marginBottom: 20, display: "flex", alignItems: "center", gap: 8 }}>
              <AlertCircleIcon size={18} color="#EF4444" />
              <p style={{ color: "#DC2626", fontSize: 12 }}>{cameraError}</p>
            </div>
          )}

          <div style={{ display: "flex", gap: 12, justifyContent: "center" }}>
            <InteractiveButton onClick={() => setScreen("intro")} variant="outline" style={{ padding: "10px 22px" }}>Cancel</InteractiveButton>
            <InteractiveButton onClick={startCamera} variant="primary" style={{ padding: "10px 26px" }}>Continue →</InteractiveButton>
          </div>
        </div>
      </div>
    );
  }

  // ========== PRACTICE SCREEN ==========
  if (screen === "practice") {
    return (
      <div style={{
        minHeight: "100vh",
        background: "linear-gradient(180deg, #0F172A 0%, #1E293B 100%)",
        display: "flex",
        flexDirection: "column",
        position: "relative",
      }}>
        {showPreAchievement && <PreAchievementAnimation onComplete={handlePreAchievementComplete} score={score} totalSigns={totalSigns} />}
        <AnimatedResultModal isVisible={showResultModal} isSuccess={lastResult} onComplete={handleResultComplete} />

        {/* Header */}
        <div style={{ 
          padding: "50px 16px 16px", 
          display: "flex", 
          justifyContent: "space-between", 
          alignItems: "center", 
          background: "rgba(15,23,42,0.8)",
          position: "relative"
        }}>
          <InteractiveButton onClick={() => setScreen("intro")} variant="secondary" style={{ padding: "6px 14px", fontSize: 12 }}>
            <ArrowLeftIcon size={14} color="#fff" /> Back
          </InteractiveButton>
          
          <div style={{ 
            position: "absolute", 
            left: 0, 
            right: 0, 
            textAlign: "center", 
            pointerEvents: "none",
            zIndex: 0
          }}>
            <p style={{ color: "#94A3B8", fontSize: 11, fontWeight: 600 }}>MODULE {signIdx + 1}</p>
            <h2 style={{ color: "#FFD93D", fontSize: 20, fontWeight: 800 }}>Sign '{sign.letter}'</h2>
          </div>
          
          <div style={{ 
            background: "linear-gradient(135deg, #2563EB, #1D4ED8)", 
            borderRadius: 40, 
            padding: "6px 14px",
            zIndex: 1
          }}>
            <span style={{ color: "#fff", fontWeight: 800, fontSize: 14 }}>{score}/{totalSigns}</span>
          </div>
        </div>

        {/* LARGER CAMERA - 4:3 Frame */}
        <div style={{ padding: "16px 16px 8px 16px" }}>
          <div style={{
            position: "relative",
            borderRadius: 32,
            overflow: "hidden",
            background: "#000",
            aspectRatio: "4 / 3",
            width: "100%",
            maxWidth: "100%",
            border: `3px solid ${phase === "success" ? "#10B981" : phase === "fail" ? "#EF4444" : phase === "detecting" ? "#F59E0B" : "#334155"}`,
            boxShadow: "0 12px 28px rgba(0,0,0,0.3)",
          }}>
            <video ref={videoRef} autoPlay playsInline muted style={{ width: "100%", height: "100%", objectFit: "cover", transform: "scaleX(-1)" }} />
            
            {/* Hand guide overlay */}
            <div style={{ 
              position: "absolute", 
              inset: 0, 
              border: "2px dashed rgba(59,130,246,0.5)", 
              borderRadius: 28, 
              margin: 10, 
              pointerEvents: "none", 
              background: "rgba(37,99,235,0.05)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "column",
              gap: 8
            }}>
              <PlaceHandIcon size={48} color="rgba(59,130,246,0.6)" />
              <div style={{ 
                background: "linear-gradient(135deg, #2563EB, #3B82F6)", 
                padding: "5px 16px", 
                borderRadius: 24, 
                fontSize: 12, 
                color: "#fff", 
                fontWeight: 700,
                letterSpacing: 1
              }}>
                PLACE HAND HERE
              </div>
            </div>
            
            {/* Scanning indicator */}
            {phase === "detecting" && (
              <>
                <div style={{ position: "absolute", top: 12, right: 12, background: "rgba(245,158,11,0.95)", borderRadius: 40, padding: "6px 14px", display: "flex", alignItems: "center", gap: 8 }}>
                  <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#fff", animation: "pulse 0.8s ease-in-out infinite" }} />
                  <span style={{ color: "#fff", fontSize: 12, fontWeight: 800, letterSpacing: 1 }}>SCANNING</span>
                </div>
                <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "100%", background: "linear-gradient(180deg, transparent 0%, rgba(245,158,11,0.15) 50%, transparent 100%)", animation: "scan 1.5s ease-in-out infinite", pointerEvents: "none" }} />
              </>
            )}
            
            {/* Result overlay on camera */}
            {(phase === "success" || phase === "fail") && !showResultModal && (
              <div style={{
                position: "absolute",
                bottom: 16,
                left: 16,
                right: 16,
                background: phase === "success" ? "rgba(16,185,129,0.9)" : "rgba(239,68,68,0.9)",
                borderRadius: 40,
                padding: "10px 16px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 10,
                backdropFilter: "blur(8px)",
                animation: "slideUp 0.3s ease-out"
              }}>
                {phase === "success" ? <CheckCircleIcon size={20} color="#fff" /> : <XCircleIcon size={20} color="#fff" />}
                <span style={{ color: "#fff", fontWeight: 700, fontSize: 14 }}>
                  {phase === "success" ? "Correct! Great job!" : "Incorrect. Try again!"}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Sign Card */}
        <div style={{ padding: "8px 16px" }}>
          <div style={{ 
            background: "rgba(30,41,59,0.9)", 
            borderRadius: 20, 
            padding: 16, 
            display: "flex", 
            gap: 16, 
            alignItems: "center",
            border: "1px solid #334155",
            backdropFilter: "blur(10px)"
          }}>
            <div style={{ 
              width: 56, 
              height: 56, 
              borderRadius: 18, 
              background: "linear-gradient(135deg, #1D4ED8, #3B82F6)", 
              display: "flex", 
              alignItems: "center", 
              justifyContent: "center", 
              flexShrink: 0,
              boxShadow: "0 4px 12px rgba(37,99,235,0.3)"
            }}>
              <AlphabetIcon size={32} color="#fff" />
            </div>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                <p style={{ color: "#94A3B8", fontSize: 12, fontWeight: 600 }}>Practice signing</p>
                <span style={{ 
                  background: "linear-gradient(135deg, #2563EB, #3B82F6)", 
                  borderRadius: 8, 
                  padding: "3px 12px", 
                  color: "#fff", 
                  fontSize: 18, 
                  fontWeight: 800 
                }}>{sign.letter}</span>
              </div>
              <p style={{ color: "#CBD5E1", fontSize: 13, lineHeight: 1.45 }}>💡 {sign.hint}</p>
            </div>
          </div>
        </div>

        {/* Senya + Feedback - Stacked vertically for less cramped feel */}
        <div style={{ padding: "16px" }}>
          {/* Senya centered above feedback */}
          <div style={{ display: "flex", justifyContent: "center", marginBottom: 20 }}>
            <div style={{ position: "relative" }}>
              <img src={senya_blue} alt="Senya" style={{
                width: 160,
                height: 160,
                objectFit: "contain",
                filter: "drop-shadow(0 12px 24px rgba(0,0,0,0.3))",
                animation: phase === "detecting" ? "senyaThink 1.5s ease-in-out infinite" : "senyaBob 2.5s ease-in-out infinite",
              }} />
              {phase === "detecting" && (
                <div style={{ 
                  position: "absolute", 
                  top: -15, 
                  right: -10, 
                  fontSize: 32, 
                  animation: "float 1s ease-in-out infinite",
                  filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.2))"
                }}>💭</div>
              )}
            </div>
          </div>
          
          {/* Feedback Bubble - Full width, spacious */}
          <GestureFeedbackBubble 
            message={getFeedbackMessage()} 
            type={getFeedbackType()}
            isVisible={true}
          />
        </div>

        {/* Action Buttons */}
        <div style={{ padding: "8px 16px 32px", marginTop: "auto" }}>
          {phase === "ready" && !isDetecting && (
            <InteractiveButton onClick={startDetection} variant="primary" style={{ width: "100%", padding: "16px", fontSize: 16 }}>
              <ScanIcon size={22} color="#fff" /> Start Detection
            </InteractiveButton>
          )}
          {phase === "detecting" && (
            <InteractiveButton disabled variant="primary" style={{ width: "100%", padding: "16px", opacity: 0.7 }}>
              <div style={{ width: 22, height: 22, borderRadius: "50%", border: "3px solid rgba(255,255,255,0.3)", borderTopColor: "#fff", animation: "spin 0.8s linear infinite" }} />
              Analyzing Hand Sign...
            </InteractiveButton>
          )}
          {(phase === "success" || phase === "fail") && !showResultModal && !showPreAchievement && (
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <InteractiveButton onClick={nextSign} variant={phase === "success" ? "success" : "primary"} style={{ width: "100%", padding: "16px", fontSize: 16 }}>
                {signIdx < totalSigns - 1 ? "Next Sign" : "See Results"} <ArrowRightIcon size={18} color="#fff" />
              </InteractiveButton>
              {phase === "fail" && (
                <InteractiveButton onClick={retrySign} variant="outline" style={{ width: "100%", padding: "14px", fontSize: 14 }}>
                  <RefreshIcon size={18} color="#2563EB" /> Try Again
                </InteractiveButton>
              )}
            </div>
          )}
        </div>
      </div>
    );
  }

  // ========== ACHIEVEMENT SCREEN ==========
  if (screen === "achievement") {
    const percentCorrect = (score / totalSigns) * 100;
    let level = "Novice Signer";
    let levelColor = "#8B5CF6";
    if (percentCorrect === 100) { level = "Quick Learner"; levelColor = "#F59E0B"; }
    else if (percentCorrect >= 80) { level = "Skilled Signer"; levelColor = "#10B981"; }

    return (
      <div style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #E8F4FD 0%, #D4EAF8 50%, #C5E3F7 100%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
      }}>
        <div style={{
          background: "rgba(255,255,255,0.92)",
          borderRadius: 44,
          padding: "36px 24px",
          maxWidth: 360,
          width: "100%",
          textAlign: "center",
        }}>
          <div style={{ animation: "bounceIn 0.6s ease-out" }}>
            <TrophyIcon size={70} color="#fbbf24" />
          </div>
          <h1 style={{ fontSize: 30, fontWeight: 800, color: "#0f3172", marginTop: 12 }}>Good Job! 🎉</h1>
          <div style={{ background: "linear-gradient(135deg, rgba(37,99,235,0.08), rgba(37,99,235,0.02))", borderRadius: 24, padding: "16px", margin: "20px 0" }}>
            <p style={{ fontSize: 40, fontWeight: 900, color: "#2563EB" }}>{score}/{totalSigns}</p>
            <p style={{ color: "#4b7bbb", fontWeight: 600, fontSize: 13 }}>Correct Signs</p>
          </div>
          <div style={{ display: "flex", justifyContent: "center", marginBottom: 20 }}>
            <div style={{ background: `linear-gradient(135deg, ${levelColor}20, ${levelColor}08)`, borderRadius: 40, padding: "8px 18px", display: "flex", alignItems: "center", gap: 6 }}>
              <StarIcon size={16} color={levelColor} />
              <span style={{ fontWeight: 800, color: levelColor }}>{level} Level 2</span>
            </div>
          </div>
          <p style={{ color: "#475569", fontSize: 14, marginBottom: 28 }}>Keep it up! You're mastering these signs!</p>
          <div style={{ display: "flex", gap: 12 }}>
            <InteractiveButton onClick={restartPractice} variant="outline" style={{ flex: 1, padding: "12px" }}><RefreshIcon size={16} color="#2563EB" /> Again</InteractiveButton>
            <InteractiveButton onClick={() => setScreen("intro")} variant="primary" style={{ flex: 1, padding: "12px" }}><HomeIcon size={16} color="#fff" /> Home</InteractiveButton>
          </div>
        </div>
      </div>
    );
  }

  return null;
}

// Add global styles for animations
const style = document.createElement('style');
style.textContent = `
  @keyframes spin { to { transform: rotate(360deg); } }
  @keyframes pulse { 0%,100% { opacity: 1; } 50% { opacity: 0.5; } }
  @keyframes pulseGlow { 0%,100% { transform: scale(1); } 50% { transform: scale(1.02); } }
  @keyframes scan { 0% { transform: translateY(-100%); } 100% { transform: translateY(100%); } }
  @keyframes scaleUp { from { transform: scale(0.9); opacity: 0; } to { transform: scale(1); opacity: 1; } }
  @keyframes slideUp { from { transform: translateY(20px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
  @keyframes slideRight { 0% { transform: translateX(-100%); } 100% { transform: translateX(100%); } }
  @keyframes bounceIn { 0% { transform: scale(0.3); opacity: 0; } 50% { transform: scale(1.1); } 100% { transform: scale(1); opacity: 1; } }
  @keyframes float { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-8px); } }
  @keyframes senyaBob { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-6px); } }
  @keyframes senyaThink { 0%,100% { transform: translateY(0) rotate(0deg); } 50% { transform: translateY(-6px) rotate(5deg); } }
  @keyframes trophyBounce { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-15px); } }
  @keyframes confetti { 0% { transform: translateY(0) rotate(0deg); opacity: 1; } 100% { transform: translateY(80vh) rotate(360deg); opacity: 0; } }
`;
document.head.appendChild(style);