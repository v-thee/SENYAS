import { useState, useRef, useEffect } from "react";
import BottomNav from "./BottomNav";
import LessonDetail from "./LessonDetail";
import { senya_logo } from "./images";
import {
  AlphabetIcon, NumbersIcon, GreetingIcon, ClassroomIcon,
} from "./icons";

/* ─── lesson data ─────────────────────────────────────────────────── */
export const lessonData = [
  {
    id: 1, category: "Greetings", title: "Hello & Goodbye",
    desc: "Essential everyday greetings in FSL",
    color: "#2563EB", iconBg: "#EFF6FF", duration: "4 min", xp: 15, done: true,
    signs: [
      { letter: "Hello",   hint: "Open hand, fingers together, wave gently from the wrist." },
      { letter: "Goodbye", hint: "Open hand raised, wave fingers down then back up." },
      { letter: "Good",    hint: "Flat hand moves forward from chin level downward." },
      { letter: "Morning", hint: "Forearm rises up like the sun — a gentle sweeping motion." },
    ],
  },
  {
    id: 2, category: "Alphabet", title: "Letters A–E",
    desc: "Learn the first 5 letters of the FSL alphabet",
    color: "#2563EB", iconBg: "#EFF6FF", duration: "5 min", xp: 20, done: true,
    signs: [
      { letter: "A", hint: "Closed fist, thumb resting on the side of the index finger." },
      { letter: "B", hint: "Four fingers held straight up, thumb folded across the palm." },
      { letter: "C", hint: "Curve your hand into a C shape — like holding a can." },
      { letter: "D", hint: "Index finger points up, other fingers and thumb form a circle." },
      { letter: "E", hint: "All fingers curl down toward the palm, thumb tucked under." },
    ],
  },
  {
    id: 3, category: "Greetings", title: "Thank You & Please",
    desc: "Polite expressions used in everyday conversations",
    color: "#1D4ED8", iconBg: "#EFF6FF", duration: "4 min", xp: 15, done: false, active: true,
    signs: [
      { letter: "Thank You", hint: "Flat hand moves forward from your chin, like blowing a kiss." },
      { letter: "Please",    hint: "Open hand rubs a small circle on the chest." },
      { letter: "Sorry",     hint: "Closed fist rubs a circle on the chest." },
      { letter: "Welcome",   hint: "Open hand sweeps inward toward the body." },
    ],
  },
  {
    id: 4, category: "Numbers", title: "Numbers 1–5",
    desc: "Count from one to five in FSL",
    color: "#6B7280", iconBg: "#F9FAFB", duration: "6 min", xp: 25, done: false,
    signs: [
      { letter: "1", hint: "Index finger points straight up." },
      { letter: "2", hint: "Index and middle fingers raised in a V shape." },
      { letter: "3", hint: "Thumb, index, and middle fingers extended." },
      { letter: "4", hint: "Four fingers extended, thumb folded across the palm." },
      { letter: "5", hint: "All five fingers spread open wide." },
    ],
  },
  {
    id: 5, category: "Alphabet", title: "Letters F–J",
    desc: "Continue with the next 5 alphabet signs",
    color: "#6B7280", iconBg: "#F9FAFB", duration: "5 min", xp: 20, done: false,
    signs: [
      { letter: "F", hint: "Index finger and thumb touch to form a circle, other fingers up." },
      { letter: "G", hint: "Index finger and thumb point sideways, parallel to the ground." },
      { letter: "H", hint: "Index and middle finger point sideways together, palm facing you." },
      { letter: "I", hint: "Pinky finger points up, all other fingers folded into a fist." },
      { letter: "J", hint: "Like I but trace a J shape in the air with your pinky." },
    ],
  },
  {
    id: 6, category: "Classroom", title: "Teacher & Student",
    desc: "Signs for classroom roles",
    color: "#6B7280", iconBg: "#F9FAFB", duration: "7 min", xp: 30, done: false,
    signs: [
      { letter: "Teacher", hint: "Both hands near temples, fingers spread — then move forward." },
      { letter: "Student", hint: "One hand like an open book, other hand traces reading." },
      { letter: "School",  hint: "Clap hands together twice in a slightly formal motion." },
      { letter: "Class",   hint: "Both hands circle outward in front of you." },
    ],
  },
  {
    id: 7, category: "Bonus", title: "Chest Challenge",
    desc: "Test everything you have learned in Unit 1 so far",
    color: "#6B7280", iconBg: "#F9FAFB", duration: "10 min", xp: 50, done: false, isChest: true,
    signs: [],
  },
  {
    id: 8, category: "Exam", title: "Unit Exam",
    desc: "Prove your mastery and unlock Unit 2",
    color: "#6B7280", iconBg: "#F9FAFB", duration: "12 min", xp: 100, done: false, isExam: true,
    signs: [],
  },
];

/* ─── node positions (cx as % of 380, cy in SVG units out of 720) ── */
const NODE_POSITIONS = [
  { cx: 50, cy: 680 },
  { cx: 24, cy: 600 },
  { cx: 74, cy: 510 },
  { cx: 26, cy: 420 },
  { cx: 70, cy: 335 },
  { cx: 28, cy: 248 },
  { cx: 68, cy: 158 },
];

const ROAD_PATH =
  "M 190 700 C 190 668, 92 648, 92 608 C 92 568, 280 548, 280 508 " +
  "C 280 468, 98 448, 98 408 C 98 368, 266 348, 266 308 " +
  "C 266 268, 100 248, 100 208 C 100 168, 258 148, 258 108 " +
  "C 258 72, 170 52, 170 24";

const SEGMENT_COUNT = NODE_POSITIONS.length - 1;

function CategoryIcon({ category, size = 22, color = "#fff" }) {
  const s = { width: size, height: size, color };
  switch (category) {
    case "Alphabet":  return <AlphabetIcon  {...s} />;
    case "Numbers":   return <NumbersIcon   {...s} />;
    case "Greetings": return <GreetingIcon  {...s} />;
    case "Classroom": return <ClassroomIcon {...s} />;
    default:          return null;
  }
}

/* ─── SplitRoad: done segment (dark solid) + undone (light dashed) ── */
function SplitRoad({ activeIdx }) {
  const pathRef = useRef(null);
  const [split, setSplit] = useState(null);

  useEffect(() => {
    if (!pathRef.current) return;
    const total   = pathRef.current.getTotalLength();
    const doneLen = (activeIdx / SEGMENT_COUNT) * total;
    setSplit({ total, doneLen });
  }, [activeIdx]);

  return (
    <g>
      <path ref={pathRef} d={ROAD_PATH} stroke="none" fill="none" />

      {/* UNDONE — light blue (full path, drawn first) */}
      <path d={ROAD_PATH} stroke="rgba(15,49,114,0.18)" strokeWidth="30" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <path d={ROAD_PATH} stroke="#a8c4e8" strokeWidth="22" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <path d={ROAD_PATH} stroke="rgba(255,255,255,0.45)" strokeWidth="3" fill="none" strokeLinecap="round" strokeDasharray="12,9" />

      {/* DONE — dark blue overlay, clipped to doneLen */}
      {split && split.doneLen > 0 && (
        <>
          <path d={ROAD_PATH} stroke="#0c2d82" strokeWidth="28" fill="none"
            strokeLinecap="round" strokeLinejoin="round"
            strokeDasharray={`${split.doneLen} ${split.total}`} strokeDashoffset="0" />
          <path d={ROAD_PATH} stroke="#1848c8" strokeWidth="24" fill="none"
            strokeLinecap="round" strokeLinejoin="round"
            strokeDasharray={`${split.doneLen} ${split.total}`} strokeDashoffset="0" />
          <path d={ROAD_PATH} stroke="rgba(255,255,255,0.9)" strokeWidth="3" fill="none"
            strokeLinecap="round"
            strokeDasharray={`12 ${split.total}`}
            strokeDashoffset={-(split.doneLen - 12)} />
        </>
      )}
    </g>
  );
}

export default function Lessons({ nav }) {
  const [openLesson, setOpenLesson] = useState(null);
  const [expandedId, setExpandedId] = useState(null);
  const [popupPos, setPopupPos]     = useState({ top: 0, left: 0, arrowLeft: 100, arrowDir: "top" });
  const svgRef  = useRef(null);
  const wrapRef = useRef(null);

  const totalDone    = lessonData.filter(l => l.done).length;
  const totalLessons = lessonData.length;
  const pct          = Math.round((totalDone / totalLessons) * 100);
  const activeIdx    = lessonData.findIndex(l => l.active);

  useEffect(() => {
    if (expandedId === null) return;
    const posIdx = expandedId - 1;
    const pos = NODE_POSITIONS[posIdx];
    if (!pos || !svgRef.current || !wrapRef.current) return;

    const svgRect  = svgRef.current.getBoundingClientRect();
    const wrapRect = wrapRef.current.getBoundingClientRect();
    const scaleX   = svgRect.width  / 380;
    const scaleY   = svgRect.height / 720;

    const nx = (pos.cx / 100) * 380 * scaleX + (svgRect.left - wrapRect.left);
    const ny = pos.cy * scaleY + (svgRect.top  - wrapRect.top);

    const CARD_W = 220;
    const CARD_H = 170;
    const GAP    = 14;

    let left = nx - CARD_W / 2;
    if (left < 8)                         left = 8;
    if (left + CARD_W > wrapRect.width - 8) left = wrapRect.width - CARD_W - 8;

    const arrowLeft = nx - left;
    let top = ny - CARD_H - GAP;
    let arrowDir = "bottom";
    if (top < 8) { top = ny + GAP + 10; arrowDir = "top"; }

    setPopupPos({ top, left, arrowLeft: Math.max(20, Math.min(arrowLeft, CARD_W - 20)), arrowDir });
  }, [expandedId]);

  if (openLesson) {
    return <LessonDetail lesson={openLesson} nav={nav} onBack={() => setOpenLesson(null)} />;
  }

  return (
    /* Outer shell: full height, no scroll */
    <div style={{
      display: "flex",
      flexDirection: "column",
      height: "100dvh",
      background: "linear-gradient(180deg, #a8d4f5 0%, #c5e3f7 25%, #daeefb 55%, #eaf5fd 80%, #f0f8ff 100%)",
      overflow: "hidden",
    }}>

      {/* ══ STICKY HEADER (never scrolls) ══ */}
      <div style={{ flexShrink: 0, zIndex: 20 }}>
        {/* Top bar */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "52px 20px 10px" }}>
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
              12
            </div>
            <button style={{ background: "none", border: "none", cursor: "pointer", color: "#4b7bbb" }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9"/>
                <path d="M13.73 21a2 2 0 01-3.46 0"/>
              </svg>
            </button>
          </div>
        </div>

        {/* Unit banner */}
        <div style={{ margin: "0 16px 8px", background: "rgba(255,255,255,0.6)", borderRadius: 16, padding: "14px 16px", border: "1px solid rgba(255,255,255,0.8)", backdropFilter: "blur(8px)", boxShadow: "0 2px 12px rgba(15,49,114,0.08)" }}>
          <p style={{ color: "#0f3172", fontSize: 18, fontWeight: 800, marginBottom: 2 }}>Unit 1: Basics</p>
          <p style={{ color: "#4b7bbb", fontSize: 12, marginBottom: 10 }}>Master the alphabet and essential greetings</p>
          <div style={{ background: "rgba(15,49,114,0.12)", borderRadius: 10, height: 10, overflow: "hidden" }}>
            <div style={{ height: "100%", width: `${pct}%`, background: "linear-gradient(90deg,#fbbf24,#f59e0b)", borderRadius: 10, transition: "width 0.5s" }} />
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", marginTop: 5 }}>
            <span style={{ color: "#4b7bbb", fontSize: 11, fontWeight: 600 }}>{totalDone} of {totalLessons} lessons done</span>
            <span style={{ color: "#4b7bbb", fontSize: 11, fontWeight: 600 }}>{pct}%</span>
          </div>
        </div>
      </div>

      {/* ══ SCROLLABLE ROAD AREA ══ */}
      <div style={{
        flex: 1,
        overflowY: "auto",
        overflowX: "hidden",
        paddingBottom: 72,
        /* hide scrollbar visually but keep it functional */
        scrollbarWidth: "none",
        msOverflowStyle: "none",
      }}>
        <style>{`
          div::-webkit-scrollbar { display: none; }
          @keyframes pulse {
            0%, 100% { opacity: 0.7; transform: scale(1); }
            50%       { opacity: 0.2; transform: scale(1.06); }
          }
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(4px) scale(0.97); }
            to   { opacity: 1; transform: translateY(0) scale(1); }
          }
        `}</style>

        <div ref={wrapRef} style={{ position: "relative", width: "100%" }}>
          <svg
            ref={svgRef}
            viewBox="0 0 380 720"
            style={{ display: "block", width: "100%", overflow: "visible" }}
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <filter id="nshadow" x="-40%" y="-40%" width="180%" height="180%">
                <feDropShadow dx="0" dy="4" stdDeviation="6" floodColor="rgba(15,49,114,0.28)" />
              </filter>
              <filter id="nodeshadow" x="-40%" y="-40%" width="180%" height="180%">
                <feDropShadow dx="0" dy="3" stdDeviation="5" floodColor="rgba(15,49,114,0.35)" />
              </filter>
            </defs>

            <SplitRoad activeIdx={activeIdx} />

            {lessonData.map((lesson, idx) => {
              const pos        = NODE_POSITIONS[idx];
              if (!pos) return null;
              const cx         = (pos.cx / 100) * 380;
              const cy         = pos.cy;
              const isActive   = !!lesson.active;
              const isSpecial  = !!(lesson.isChest || lesson.isExam);
              const isDone     = lesson.done;
              const isSelected = expandedId === lesson.id;

              return (
                <g key={lesson.id} style={{ cursor: "pointer" }}
                  onClick={() => setExpandedId(expandedId === lesson.id ? null : lesson.id)}>

                  {isActive && (
                    <circle cx={cx} cy={cy} r={44}
                      fill="rgba(255,255,255,0.18)"
                      style={{ animation: "pulse 2s ease-in-out infinite" }} />
                  )}
                  {isSelected && !isActive && (
                    <circle cx={cx} cy={cy} r={isSpecial ? 38 : 36} fill="rgba(255,255,255,0.25)" />
                  )}

                  {isSpecial ? (
                    <>
                      <rect x={cx-30} y={cy-30} width={60} height={60} rx={15}
                        fill={isDone ? "#1848c8" : "rgba(200,220,245,0.85)"}
                        filter="url(#nodeshadow)" />
                      {isDone && <rect x={cx-24} y={cy-24} width={48} height={48} rx={11} fill="#2563eb" />}
                    </>
                  ) : isDone ? (
                    <>
                      <circle cx={cx} cy={cy} r={32} fill="#1035a0" filter="url(#nodeshadow)" />
                      <circle cx={cx} cy={cy} r={26} fill="#1848c8" />
                    </>
                  ) : isActive ? (
                    <>
                      <circle cx={cx} cy={cy} r={34} fill="#0f3172" filter="url(#nodeshadow)" />
                      <circle cx={cx} cy={cy} r={28} fill="#1848c8" />
                    </>
                  ) : (
                    <circle cx={cx} cy={cy} r={28} fill="rgba(200,220,245,0.85)" filter="url(#nodeshadow)" />
                  )}

                  {isDone ? (
                    <polyline points={`${cx-10},${cy} ${cx-2},${cy+9} ${cx+11},${cy-9}`}
                      stroke="#fff" strokeWidth="3.5" fill="none"
                      strokeLinecap="round" strokeLinejoin="round" />
                  ) : isActive ? (
                    <>
                      <circle cx={cx} cy={cy} r={14} fill="none" stroke="rgba(255,255,255,0.25)" strokeWidth="1.5"/>
                      <polygon points={`${cx-6},${cy-10} ${cx+12},${cy} ${cx-6},${cy+10}`} fill="#93c5fd" />
                    </>
                  ) : isSpecial ? (
                    <>
                      <rect x={cx-9} y={cy-2} width={18} height={13} rx={3}
                        fill="none" stroke="#6b92cc" strokeWidth="2.2" />
                      <path d={`M ${cx-6} ${cy-2} C ${cx-6} ${cy-9}, ${cx+6} ${cy-9}, ${cx+6} ${cy-2}`}
                        fill="none" stroke="#6b92cc" strokeWidth="2.2" />
                      <circle cx={cx} cy={cy+4.5} r={2.2} fill="#6b92cc" />
                    </>
                  ) : (
                    <>
                      <rect x={cx-8} y={cy-2} width={16} height={12} rx={3}
                        fill="none" stroke="#8aaad6" strokeWidth="2" />
                      <path d={`M ${cx-5} ${cy-2} C ${cx-5} ${cy-8}, ${cx+5} ${cy-8}, ${cx+5} ${cy-2}`}
                        fill="none" stroke="#8aaad6" strokeWidth="2" />
                      <circle cx={cx} cy={cy+4} r={2} fill="#8aaad6" />
                    </>
                  )}

                  {isActive && (
                    <>
                      <rect x={cx-33} y={cy-54} width={66} height={19} rx={9.5} fill="#fbbf24" />
                      <text x={cx} y={cy-40} textAnchor="middle" fontSize={9.5} fontWeight={800} fill="#78350f" letterSpacing={0.6}>NEXT UP</text>
                    </>
                  )}

                  {isActive ? (
                    <>
                      <rect x={cx-44} y={cy+36} width={88} height={19} rx={9.5} fill="#1035a0" />
                      <text x={cx} y={cy+49} textAnchor="middle" fontSize={9.5} fontWeight={800} fill="#fff" letterSpacing={0.5}>
                        {lesson.title.toUpperCase()}
                      </text>
                    </>
                  ) : (
                    <text x={cx} y={isSpecial ? cy+46 : cy+44}
                      textAnchor="middle" fontSize={10} fontWeight={700} letterSpacing={0.4}
                      fill={isDone ? "#0f3172" : "#5b82b8"}>
                      {lesson.title.toUpperCase()}
                    </text>
                  )}
                </g>
              );
            })}

            {/* Senya mascot beside active node */}
            {activeIdx !== -1 && (() => {
              const pos    = NODE_POSITIONS[activeIdx];
              const cx     = (pos.cx / 100) * 380;
              const onRight = pos.cx > 50;
              return (
                <image
                  href={senya_logo}
                  x={onRight ? cx + 42 : cx - 94}
                  y={pos.cy - 50}
                  width={56} height={56}
                  preserveAspectRatio="xMidYMid meet"
                />
              );
            })()}
          </svg>

          {/* ── Popup card ── */}
          {expandedId !== null && (() => {
            const lesson  = lessonData.find(l => l.id === expandedId);
            if (!lesson) return null;
            const canOpen = lesson.done || lesson.active;
            const { top, left, arrowLeft, arrowDir } = popupPos;

            return (
              <div style={{
                position: "absolute", top, left,
                width: 220,
                background: "#fff",
                borderRadius: 16,
                boxShadow: "0 8px 32px rgba(15,49,114,0.22)",
                zIndex: 30,
                animation: "fadeIn 0.18s ease",
              }}>
                {arrowDir === "top" && (
                  <div style={{
                    position: "absolute", top: -10, left: arrowLeft - 10,
                    width: 0, height: 0,
                    borderLeft: "10px solid transparent",
                    borderRight: "10px solid transparent",
                    borderBottom: "10px solid #fff",
                    filter: "drop-shadow(0 -2px 2px rgba(15,49,114,0.10))",
                  }} />
                )}
                {arrowDir === "bottom" && (
                  <div style={{
                    position: "absolute", bottom: -10, left: arrowLeft - 10,
                    width: 0, height: 0,
                    borderLeft: "10px solid transparent",
                    borderRight: "10px solid transparent",
                    borderTop: "10px solid #fff",
                    filter: "drop-shadow(0 2px 2px rgba(15,49,114,0.10))",
                  }} />
                )}

                <div style={{ padding: 14 }}>
                  <button onClick={() => setExpandedId(null)} style={{ position: "absolute", top: 10, right: 12, background: "none", border: "none", color: "#D1D5DB", cursor: "pointer", padding: 2 }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
                    </svg>
                  </button>

                  <div style={{ display: "flex", gap: 10, alignItems: "center", marginBottom: 8 }}>
                    <div style={{ width: 42, height: 42, borderRadius: 11, background: lesson.iconBg, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, border: "1.5px solid rgba(37,99,235,0.10)" }}>
                      <CategoryIcon category={lesson.category} size={22} color={lesson.color} />
                    </div>
                    <div>
                      <p style={{ fontSize: 14, fontWeight: 800, color: "#0f1f4a", lineHeight: 1.2 }}>{lesson.title}</p>
                      <p style={{ fontSize: 11, color: "#2563eb", fontWeight: 600, marginTop: 1 }}>{lesson.category}</p>
                    </div>
                  </div>

                  <p style={{ fontSize: 11, color: "#6B7280", lineHeight: 1.5, marginBottom: 10, paddingTop: 8, borderTop: "0.5px solid #F3F4F6" }}>
                    {lesson.desc}
                  </p>

                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <div style={{ display: "flex", gap: 5 }}>
                      <span style={{ fontSize: 10, fontWeight: 600, padding: "3px 8px", borderRadius: 10, background: "#F3F4F6", color: "#6B7280", display: "flex", alignItems: "center", gap: 3 }}>
                        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                        {lesson.duration}
                      </span>
                      <span style={{ fontSize: 10, fontWeight: 600, padding: "3px 8px", borderRadius: 10, background: "#EEF2FF", color: "#4338CA" }}>
                        +{lesson.xp} XP
                      </span>
                    </div>
                    <button
                      onClick={() => canOpen && setOpenLesson(lesson)}
                      style={{
                        background: canOpen ? "#1848c8" : "#E5E7EB",
                        color: canOpen ? "#fff" : "#9CA3AF",
                        border: "none", borderRadius: 10, padding: "7px 14px",
                        fontSize: 12, fontWeight: 700, cursor: canOpen ? "pointer" : "default",
                        display: "flex", alignItems: "center", gap: 4,
                      }}
                    >
                      {lesson.done ? "Review" : canOpen ? "Start" : "Locked"}
                      {canOpen ? (
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                          <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
                        </svg>
                      ) : (
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                          <rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0110 0v4"/>
                        </svg>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            );
          })()}
        </div>
      </div>

      <BottomNav active="lessons" nav={nav} />
    </div>
  );
}