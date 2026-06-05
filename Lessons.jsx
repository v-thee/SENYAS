import { useState } from "react";
import BottomNav from "./BottomNav";
import LessonDetail from "./LessonDetail";
import { senya_teaching } from "./images";
import { AlphabetIcon, NumbersIcon, GreetingIcon, ClassroomIcon } from "./icons";

const categories = ["All", "Alphabet", "Numbers", "Greetings", "Classroom"];

function LessonCategoryIcon({ type }) {
  switch(type) {
    case "Alphabet": return <AlphabetIcon size={20} />;
    case "Numbers": return <NumbersIcon size={20} />;
    case "Greetings": return <GreetingIcon size={20} />;
    case "Classroom": return <ClassroomIcon size={20} />;
    default: return null;
  }
}

export const lessonData = [
  {
    id: 1, category: "Alphabet", title: "Letters A–E",
    desc: "Learn the first 5 letters of the FSL alphabet",
    color: "#3B82F6", duration: "5 min", xp: 20, done: true,
    signs: [
      { letter: "A", hint: "Closed fist, thumb resting on the side of the index finger." },
      { letter: "B", hint: "Four fingers held straight up, thumb folded across the palm." },
      { letter: "C", hint: "Curve your hand into a C shape — like holding a can." },
      { letter: "D", hint: "Index finger points up, other fingers and thumb form a circle." },
      { letter: "E", hint: "All fingers curl down toward the palm, thumb tucked under." },
    ]
  },
  {
    id: 2, category: "Alphabet", title: "Letters F–J",
    desc: "Continue with the next 5 alphabet signs",
    color: "#3B82F6", duration: "5 min", xp: 20, done: false,
    signs: [
      { letter: "F", hint: "Index finger and thumb touch to form a circle, other fingers up." },
      { letter: "G", hint: "Index finger and thumb point sideways, parallel to the ground." },
      { letter: "H", hint: "Index and middle finger point sideways together, palm facing you." },
      { letter: "I", hint: "Pinky finger points up, all other fingers folded into a fist." },
      { letter: "J", hint: "Like 'I' but trace a J shape in the air with your pinky." },
    ]
  },
  {
    id: 3, category: "Greetings", title: "Hello & Goodbye",
    desc: "Essential everyday greetings in FSL",
    color: "#10B981", duration: "4 min", xp: 15, done: true,
    signs: [
      { letter: "Hello", hint: "Open hand, fingers together, wave gently from the wrist." },
      { letter: "Goodbye", hint: "Open hand raised, wave fingers down then back up." },
      { letter: "Good", hint: "Flat hand moves forward from chin level downward." },
      { letter: "Morning", hint: "Forearm rises up like the sun — a gentle sweeping motion." },
    ]
  },
  {
    id: 4, category: "Greetings", title: "Thank You & Please",
    desc: "Polite expressions used in conversations",
    color: "#10B981", duration: "4 min", xp: 15, done: false,
    signs: [
      { letter: "Thank You", hint: "Flat hand moves forward from your chin, like blowing a kiss." },
      { letter: "Please", hint: "Open hand rubs a small circle on the chest." },
      { letter: "Sorry", hint: "Closed fist rubs a circle on the chest." },
      { letter: "Welcome", hint: "Open hand sweeps inward toward the body." },
    ]
  },
  {
    id: 5, category: "Numbers", title: "Numbers 1–5",
    desc: "Count from one to five in FSL",
    color: "#F59E0B", duration: "6 min", xp: 25, done: false,
    signs: [
      { letter: "1", hint: "Index finger points straight up." },
      { letter: "2", hint: "Index and middle fingers raised in a V shape." },
      { letter: "3", hint: "Thumb, index, and middle fingers extended." },
      { letter: "4", hint: "Four fingers extended, thumb folded across the palm." },
      { letter: "5", hint: "All five fingers spread open wide." },
    ]
  },
  {
    id: 6, category: "Numbers", title: "Numbers 6–10",
    desc: "Complete your basic number vocabulary",
    color: "#F59E0B", duration: "6 min", xp: 25, done: false,
    signs: [
      { letter: "6", hint: "Pinky and thumb extended, other fingers folded." },
      { letter: "7", hint: "Thumb touches the middle finger, others extended." },
      { letter: "8", hint: "Middle finger bends to touch thumb, others up." },
      { letter: "9", hint: "Index finger curls to touch thumb, forming a circle." },
      { letter: "10", hint: "Thumbs up, then shake or wiggle the hand slightly." },
    ]
  },
  {
    id: 7, category: "Classroom", title: "Teacher & Student",
    desc: "Signs for classroom roles",
    color: "#8B5CF6", duration: "7 min", xp: 30, done: false,
    signs: [
      { letter: "Teacher", hint: "Both hands near temples, fingers spread — then move forward." },
      { letter: "Student", hint: "One hand like an open book, other hand traces reading." },
      { letter: "School", hint: "Clap hands together twice in a slightly formal motion." },
      { letter: "Class", hint: "Both hands circle outward in front of you." },
    ]
  },
  {
    id: 8, category: "Classroom", title: "School Supplies",
    desc: "Book, pen, paper and more",
    color: "#8B5CF6", duration: "8 min", xp: 30, done: false,
    signs: [
      { letter: "Book", hint: "Both hands open flat then spread apart like opening a book." },
      { letter: "Pen", hint: "Pretend to write — pinch fingers together and move hand." },
      { letter: "Paper", hint: "One flat hand slides across the other flat hand." },
      { letter: "Bag", hint: "Mime lifting and placing a backpack strap on your shoulder." },
    ]
  },
];

export default function Lessons({ nav }) {
  const [cat, setCat] = useState("All");
  const [openLesson, setOpenLesson] = useState(null);
  const [selectedNode, setSelectedNode] = useState(null);

  const filtered = cat === "All" ? lessonData : lessonData.filter(l => l.category === cat);

  if (openLesson) {
    return <LessonDetail lesson={openLesson} nav={nav} onBack={() => setOpenLesson(null)} />;
  }

  const totalCompleted = lessonData.filter(l => l.done).length;
  const totalLessons = lessonData.length;
  const progressPercent = Math.round((totalCompleted / totalLessons) * 100);
  const nextIdx = lessonData.findIndex(l => !l.done);
  const activeIndex = nextIdx === -1 ? lessonData.length - 1 : nextIdx;

  return (
    <div className="screen" style={{ background: "#F9FAFB", paddingBottom: 80 }}>
      {/* Header */}
      <div style={{
        background: "linear-gradient(135deg, #1D4ED8, #3B82F6)",
        padding: "52px 24px 20px",
        position: "relative"
      }}>
        <div style={{
          position: "absolute", top: -20, right: -30, width: 200, height: 200,
          borderRadius: "50%", background: "rgba(255,255,255,0.07)"
        }} />
        <div style={{ position: "relative", zIndex: 1 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
            <div>
              <h1 style={{ fontFamily: "var(--font-head)", fontSize: 24, fontWeight: 800, color: "#fff" }}>
                Your Learning Path
              </h1>
              <p style={{ color: "rgba(255,255,255,0.75)", fontSize: 13, marginTop: 4, fontWeight: 500 }}>
                Progress: {totalCompleted} of {totalLessons} lessons
              </p>
            </div>
            <img src={senya_teaching} alt="Senya" style={{
              width: 60, height: 60, objectFit: "contain",
              filter: "drop-shadow(0 2px 6px rgba(0,0,0,0.2))",
              animation: "senya-bob 2.5s ease-in-out infinite"
            }} />
          </div>
          <div style={{ marginTop: 14 }}>
            <div style={{
              background: "rgba(255,255,255,0.2)", borderRadius: "10px",
              height: 12, overflow: "hidden", marginBottom: 6
            }}>
              <div style={{
                height: "100%", width: `${progressPercent}%`,
                background: "linear-gradient(90deg, #FFD93D, #FFC107)",
                borderRadius: "10px",
                transition: "width 0.5s ease"
              }} />
            </div>
            <p style={{ color: "rgba(255,255,255,0.8)", fontSize: 12, fontWeight: 600 }}>
              {progressPercent}% Complete
            </p>
          </div>
        </div>
      </div>

      {/* Category Tabs */}
      <div style={{ padding: "16px 20px 0", overflowX: "auto" }}>
        <div style={{ display: "flex", gap: 8, whiteSpace: "nowrap" }}>
          {categories.map(c => (
            <button key={c} onClick={() => setCat(c)} style={{
              padding: "8px 16px", borderRadius: 20,
              fontFamily: "var(--font-body)", fontSize: 13, fontWeight: 700,
              cursor: "pointer", transition: "all 0.2s",
              background: cat === c ? "#3B82F6" : "#fff",
              color: cat === c ? "#fff" : "#374151",
              boxShadow: cat === c ? "0 2px 8px rgba(59,130,246,0.3)" : "0 1px 3px rgba(0,0,0,0.06)",
              border: cat === c ? "2px solid transparent" : "2px solid #E5E7EB"
            }}>{c}</button>
          ))}
        </div>
      </div>

      {/* Roadmap Visualization */}
      <div style={{ padding: "24px 20px", position: "relative" }}>
        <div style={{
          display: "flex",
          flexDirection: "column",
          gap: 32,
          position: "relative",
          alignItems: "center"
        }}>
          {/* SVG Path */}
          <svg
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              width: "100%",
              height: "100%",
              pointerEvents: "none",
              zIndex: 0
            }}
            viewBox="0 0 350 2000"
            preserveAspectRatio="xMidYMid meet"
          >
            {/* Winding path */}
            <path
              d={`M 175 60 Q 100 120, 175 180 Q 250 240, 175 300 Q 100 360, 175 420 Q 250 480, 175 540 Q 100 600, 175 660 Q 250 720, 175 780 Q 100 840, 175 900 Q 250 960, 175 1020 Q 100 1080, 175 1140 Q 250 1200, 175 1260 Q 100 1320, 175 1380 Q 250 1440, 175 1500 Q 100 1560, 175 1620 Q 250 1680, 175 1740 Q 100 1800, 175 1860 Q 250 1920, 175 1980`}
              stroke="url(#pathGradient)"
              strokeWidth="4"
              fill="none"
              strokeLinecap="round"
              strokeDasharray="8,4"
              opacity="0.6"
            />
            <defs>
              <linearGradient id="pathGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#3B82F6" />
                <stop offset="100%" stopColor="#1D4ED8" />
              </linearGradient>
            </defs>
          </svg>

          {/* Lesson Nodes */}
          <div style={{ position: "relative", zIndex: 1, width: "100%" }}>
            {filtered.map((lesson, idx) => (
              <div
                key={lesson.id}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  marginBottom: 60,
                  position: "relative",
                  animation: `fadeIn 0.4s ease ${idx * 0.08}s both`
                }}
                onClick={() => setSelectedNode(selectedNode === lesson.id ? null : lesson.id)}
              >
                {/* Category Label */}
                <span
                  style={{
                    fontSize: 10,
                    fontWeight: 700,
                    color: "#9CA3AF",
                    textTransform: "uppercase",
                    letterSpacing: "0.5px",
                    marginBottom: 8
                  }}
                >
                  {lesson.category}
                </span>

                {/* Node Circle */}
                <button
                  onClick={() => setOpenLesson(lesson)}
                  style={{
                    width: 72,
                    height: 72,
                    borderRadius: "50%",
                    border: idx === activeIndex ? `4px solid #fff` : (lesson.done ? "none" : `3px solid ${lesson.color}`),
                    background: lesson.done
                      ? `linear-gradient(135deg, ${lesson.color}, ${lesson.color})`
                      : (idx === activeIndex ? `linear-gradient(135deg, ${lesson.color}22, ${lesson.color}14)` : "rgba(255,255,255,0.95)"),
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                    transition: "all 0.3s",
                    boxShadow: selectedNode === lesson.id
                      ? `0 8px 28px ${lesson.color}40`
                      : idx === activeIndex
                      ? `0 12px 36px ${lesson.color}2a`
                      : lesson.done
                      ? `0 4px 12px ${lesson.color}30`
                      : "0 2px 8px rgba(0,0,0,0.08)",
                    transform: selectedNode === lesson.id ? "scale(1.15)" : "scale(1)"
                  }}
                >
                  {lesson.done ? (
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3">
                      <path d="M20 6L9 17l-5-5" />
                    </svg>
                  ) : (
                    <LessonCategoryIcon type={lesson.category} />
                  )}
                </button>

                {/* Active mascot badge */}
                {idx === activeIndex && (
                  <div style={{
                    position: "absolute",
                    right: -44,
                    top: 8,
                    width: 72,
                    height: 72,
                    borderRadius: "50%",
                    background: "#fff",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    boxShadow: `0 12px 36px ${lesson.color}22`,
                    border: `6px solid rgba(255,255,255,0.9)`
                  }}>
                    <img src={senya_teaching} alt="Senya" style={{ width: 44, height: 44, objectFit: "contain" }} />
                  </div>
                )}

                {/* Lesson Title & Info */}
                <div
                  style={{
                    marginTop: 12,
                    textAlign: "center",
                    maxWidth: 140,
                    transition: "all 0.3s"
                  }}
                >
                  <p
                    style={{
                      fontSize: 14,
                      fontWeight: 800,
                      color: "#111827",
                      fontFamily: "var(--font-head)"
                    }}
                  >
                    {lesson.title}
                  </p>

                  {/* Expanded Info */}
                  {selectedNode === lesson.id && (
                    <div
                      style={{
                        marginTop: 10,
                        animation: "fadeIn 0.3s ease"
                      }}
                    >
                      <p
                        style={{
                          fontSize: 11,
                          color: "#6B7280",
                          marginBottom: 6
                        }}
                      >
                        {lesson.desc}
                      </p>
                      <div
                        style={{
                          display: "flex",
                          gap: 8,
                          justifyContent: "center",
                          flexWrap: "wrap"
                        }}
                      >
                        <span
                          style={{
                            fontSize: 10,
                            background: "#F3F4F6",
                            color: "#6B7280",
                            padding: "3px 10px",
                            borderRadius: 12,
                            fontWeight: 600
                          }}
                        >
                          ⏱ {lesson.duration}
                        </span>
                        <span
                          style={{
                            fontSize: 10,
                            background: `${lesson.color}15`,
                            color: lesson.color,
                            padding: "3px 10px",
                            borderRadius: 12,
                            fontWeight: 600
                          }}
                        >
                          +{lesson.xp} XP
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <BottomNav active="lessons" nav={nav} />
    </div>
  );
}
