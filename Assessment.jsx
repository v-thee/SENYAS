import { useState } from "react";
import { senya_magnify, senya_blue } from "./images";

// ==================== YOUR CUSTOM 3D ICONS FROM /img FOLDER ====================

const iconContainerStyle = {
  width: 56,
  height: 56,
  borderRadius: 20,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  background: "white",
  boxShadow: "0 8px 16px rgba(0,0,0,0.1)",
  transition: "transform 0.2s, box-shadow 0.2s"
};

// Never tried it - never.png
const PlantIcon = () => (
  <div style={iconContainerStyle}>
    <img 
      src="/public/img/never.png"
      alt="never"
      width="44"
      height="44"
      style={{ filter: "drop-shadow(0 4px 6px rgba(0,0,0,0.1))" }}
    />
  </div>
);

// I know a few signs - few.png
const HandIcon = () => (
  <div style={iconContainerStyle}>
    <img 
      src="/public/img/few.png"
      alt="few signs"
      width="44"
      height="44"
      style={{ filter: "drop-shadow(0 4px 6px rgba(0,0,0,0.1))" }}
    />
  </div>
);

// I can hold basic conversation - conversation.png
const ChatIcon = () => (
  <div style={iconContainerStyle}>
    <img 
      src="/public/img/conversation.png"
      alt="conversation"
      width="44"
      height="44"
      style={{ filter: "drop-shadow(0 4px 6px rgba(0,0,0,0.1))" }}
    />
  </div>
);

// Quite experienced - experienced.png
const StarIcon = () => (
  <div style={iconContainerStyle}>
    <img 
      src="/public/img/experienced.png"
      alt="experienced"
      width="44"
      height="44"
      style={{ filter: "drop-shadow(0 4px 6px rgba(0,0,0,0.1))" }}
    />
  </div>
);

// Alphabet - alphabet.png
const AlphabetIcon = () => (
  <div style={iconContainerStyle}>
    <img 
      src="/public/img/alphabet.png"
      alt="alphabet"
      width="44"
      height="44"
      style={{ filter: "drop-shadow(0 4px 6px rgba(0,0,0,0.1))" }}
    />
  </div>
);

// Greeting - greet.png
const GreetingIcon = () => (
  <div style={iconContainerStyle}>
    <img 
      src="/public/img/greet.png"
      alt="greeting"
      width="44"
      height="44"
      style={{ filter: "drop-shadow(0 4px 6px rgba(0,0,0,0.1))" }}
    />
  </div>
);

// Classroom word - classroom.png
const ClassroomIcon = () => (
  <div style={iconContainerStyle}>
    <img 
      src="/public/img/classroom.png"
      alt="classroom"
      width="44"
      height="44"
      style={{ filter: "drop-shadow(0 4px 6px rgba(0,0,0,0.1))" }}
    />
  </div>
);

// Everything - everything.png
const BookIcon = () => (
  <div style={iconContainerStyle}>
    <img 
      src="/public/img/everything.png"
      alt="everything"
      width="44"
      height="44"
      style={{ filter: "drop-shadow(0 4px 6px rgba(0,0,0,0.1))" }}
    />
  </div>
);

// Timer / Time - time.png (used for all minute options)
const TimerIcon = () => (
  <div style={iconContainerStyle}>
    <img 
      src="/public/img/time.png"
      alt="time"
      width="44"
      height="44"
      style={{ filter: "drop-shadow(0 4px 6px rgba(0,0,0,0.1))" }}
    />
  </div>
);

const CheckIcon = () => (
  <div style={{
    background: "linear-gradient(135deg, #10B981 0%, #059669 100%)",
    borderRadius: 26,
    width: 32,
    height: 32,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    boxShadow: "0 4px 10px rgba(16,185,129,0.3)",
    marginLeft: "auto"
  }}>
    <img 
      src="https://cdn-icons-png.flaticon.com/512/190/190411.png"
      alt="check"
      width="18"
      height="18"
      style={{ filter: "brightness(0) invert(1)" }}
    />
  </div>
);

function AssessmentIcon({ type }) {
  switch(type) {
    case "plant": return <PlantIcon />;
    case "hand": return <HandIcon />;
    case "chat": return <ChatIcon />;
    case "star": return <StarIcon />;
    case "alpha": return <AlphabetIcon />;
    case "greet": return <GreetingIcon />;
    case "class": return <ClassroomIcon />;
    case "book": return <BookIcon />;
    case "timer": return <TimerIcon />;
    default: return <StarIcon />;
  }
}

const questions = [
  {
    question: "How familiar are you with Filipino Sign Language?",
    options: ["Never tried it", "I know a few signs", "I can hold basic conversations", "I am quite experienced"],
    iconTypes: ["plant", "hand", "chat", "star"]
  },
  {
    question: "What do you mainly want to learn?",
    options: ["Alphabet & Numbers", "Greetings", "Classroom Words", "Everything!"],
    iconTypes: ["alpha", "greet", "class", "book"]
  },
  {
    question: "How much time can you practice daily?",
    options: ["5–10 minutes", "15–20 minutes", "30 minutes", "1 hour or more"],
    iconTypes: ["timer", "timer", "timer", "timer"]
  },
];

export default function Assessment({ nav }) {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [selected, setSelected] = useState(null);
  const [showWelcome, setShowWelcome] = useState(false);
  const [animationProgress, setAnimationProgress] = useState(0);

  const q = questions[step];
  const progress = ((step) / questions.length) * 100;

  const next = () => {
    if (selected === null) return;
    const newAns = [...answers, selected];
    setAnswers(newAns);
    setSelected(null);
    if (step < questions.length - 1) {
      setStep(step + 1);
    } else {
      setShowWelcome(true);
      let progressValue = 0;
      const interval = setInterval(() => {
        progressValue += 3.33;
        setAnimationProgress(progressValue);
        if (progressValue >= 100) {
          clearInterval(interval);
          setTimeout(() => nav("dashboard"), 300);
        }
      }, 100);
    }
  };

  if (showWelcome) {
    return (
      <div className="screen" style={{
        background: "white",
        minHeight: "100vh",
        position: "relative",
        overflow: "hidden"
      }}>
        <div style={{
          position: "absolute",
          inset: 0,
          overflow: "hidden",
          background: "linear-gradient(180deg, #F0F9FF 0%, #FFFFFF 100%)"
        }}>
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              style={{
                position: "absolute",
                left: `${15 + (i * 15)}%`,
                top: `${20 + (i * 12)}%`,
                width: `${80 + i * 20}px`,
                height: `${80 + i * 20}px`,
                background: `rgba(59, 130, 246, 0.03)`,
                borderRadius: "50%",
                animation: `floatCircle ${10 + i * 1.5}s ease-in-out infinite`,
                animationDelay: `${i * 0.8}s`
              }}
            />
          ))}
        </div>

        <div style={{
          position: "relative",
          zIndex: 2,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "100vh",
          padding: "40px 24px"
        }}>
          <div style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: 4,
            background: "#EAECF0"
          }}>
            <div style={{
              width: `${animationProgress}%`,
              height: "100%",
              background: "linear-gradient(90deg, #3B82F6, #1E4F8A)",
              transition: "width 0.1s linear",
              borderRadius: 2
            }} />
          </div>

          <div style={{
            animation: "logoFloat 2s ease-in-out infinite",
            marginBottom: 32
          }}>
            <img src={senya_blue} alt="Senya" style={{
              width: 100,
              height: 100,
              objectFit: "contain"
            }} />
          </div>

          <div style={{
            textAlign: "center",
            animation: "fadeInUp 0.5s ease-out"
          }}>
            <h1 style={{
              fontSize: 28,
              fontWeight: 600,
              color: "#1E4F8A",
              marginBottom: 8,
              fontFamily: "var(--font-head)"
            }}>
              Welcome to
            </h1>
            <h2 style={{
              fontSize: 44,
              fontWeight: 700,
              color: "#1E4F8A",
              marginBottom: 12,
              fontFamily: "var(--font-head)",
              letterSpacing: -1
            }}>
              SEÑAS!
            </h2>
            <p style={{
              fontSize: 14,
              color: "#6B7280",
              marginTop: 8,
              fontWeight: 500
            }}>
              Your FSL journey begins now
            </p>
          </div>

          <div style={{
            display: "flex",
            gap: 10,
            marginTop: 48
          }}>
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: "50%",
                  background: "#3B82F6",
                  animation: `dotPulse 1.5s ease-in-out infinite`,
                  animationDelay: `${i * 0.2}s`
                }}
              />
            ))}
          </div>
        </div>

        <style>{`
          @keyframes logoFloat {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-6px); }
          }
          @keyframes fadeInUp {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
          }
          @keyframes dotPulse {
            0%, 100% { opacity: 0.3; transform: scale(0.8); }
            50% { opacity: 1; transform: scale(1.2); }
          }
          @keyframes floatCircle {
            0%, 100% { transform: translateY(0) translateX(0); }
            50% { transform: translateY(-15px) translateX(8px); }
          }
        `}</style>
      </div>
    );
  }

  if (answers.length === 3 && !showWelcome) {
    return (
      <div className="screen" style={{ background: "#F8FAFE", minHeight: "100vh" }}>
        <div style={{ padding: "40px 24px", maxWidth: 500, margin: "0 auto" }}>
          <div style={{
            background: "white",
            borderRadius: 32,
            padding: "40px 24px",
            textAlign: "center",
            boxShadow: "0 4px 20px rgba(0,0,0,0.04)",
            border: "1px solid #EAECF0"
          }}>
            <div style={{
              width: 80,
              height: 80,
              margin: "0 auto 24px",
              background: "linear-gradient(135deg, #10B98120 0%, #05966920 100%)",
              borderRadius: 40,
              display: "flex",
              alignItems: "center",
              justifyContent: "center"
            }}>
              <div style={{
                background: "linear-gradient(135deg, #10B981 0%, #059669 100%)",
                borderRadius: 40,
                width: 56,
                height: 56,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 8px 20px rgba(16,185,129,0.3)"
              }}>
                <img 
                  src="/public/img/experienced.png"
                  alt="star"
                  width="32"
                  height="32"
                  style={{ filter: "brightness(0) invert(1)" }}
                />
              </div>
            </div>
            
            <h2 style={{
              fontSize: 24,
              fontWeight: 700,
              color: "#1A1A2E",
              marginBottom: 8,
              fontFamily: "var(--font-head)"
            }}>
              You are all set!
            </h2>
            <p style={{
              fontSize: 14,
              color: "#666",
              marginBottom: 24,
              lineHeight: 1.5
            }}>
              Based on your answers, we have prepared your personalized learning path
            </p>
            
            <div style={{
              background: "linear-gradient(135deg, #FEF3C7 0%, #FDE68A 100%)",
              borderRadius: 18,
              padding: "16px",
              marginBottom: 24
            }}>
              <div style={{ fontSize: 12, color: "#92400E", fontWeight: 500, marginBottom: 4 }}>
                Starting XP Bonus
              </div>
              <div style={{ fontSize: 32, fontWeight: 700, color: "#B45309" }}>
                +150 XP
              </div>
            </div>
            
            <button
              onClick={() => setShowWelcome(true)}
              style={{
                background: "rgba(30, 79, 138, 0.9)",
                backdropFilter: "blur(12px)",
                color: "white",
                border: "1px solid rgba(255,255,255,0.2)",
                padding: "14px 32px",
                borderRadius: 60,
                fontSize: 16,
                fontWeight: 600,
                cursor: "pointer",
                width: "100%",
                transition: "all 0.3s ease",
                boxShadow: "0 8px 20px rgba(30,79,138,0.25)"
              }}
              onMouseEnter={(e) => { 
                e.currentTarget.style.background = "rgba(15, 61, 105, 0.95)";
                e.currentTarget.style.transform = "translateY(-2px)";
              }}
              onMouseLeave={(e) => { 
                e.currentTarget.style.background = "rgba(30, 79, 138, 0.9)";
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              Start Learning →
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="screen" style={{ background: "#F8FAFE", minHeight: "100vh" }}>
      <div style={{ padding: "48px 24px 0" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
          <button 
            onClick={() => step > 0 ? setStep(step-1) : nav("login")}
            style={{ 
              background: "rgba(255, 255, 255, 0.9)",
              backdropFilter: "blur(8px)",
              border: "1px solid rgba(255,255,255,0.3)",
              borderRadius: 14,
              width: 40,
              height: 40,
              cursor: "pointer",
              fontSize: 18,
              fontWeight: 500,
              transition: "all 0.2s"
            }}
            onMouseEnter={(e) => { 
              e.currentTarget.style.background = "rgba(255, 255, 255, 1)";
              e.currentTarget.style.transform = "scale(1.05)";
            }}
            onMouseLeave={(e) => { 
              e.currentTarget.style.background = "rgba(255, 255, 255, 0.9)";
              e.currentTarget.style.transform = "scale(1)";
            }}
          >
            ←
          </button>
          <div style={{ flex: 1 }}>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, fontWeight: 500, color: "#888", marginBottom: 8 }}>
              <span>Question {step + 1} of {questions.length}</span>
              <span style={{
                background: "#EFF6FF",
                padding: "2px 8px",
                borderRadius: 20,
                color: "#1E4F8A",
                fontWeight: 500
              }}>{Math.round(progress)}%</span>
            </div>
            <div style={{
              background: "#EAECF0",
              borderRadius: 10,
              height: 6,
              overflow: "hidden"
            }}>
              <div style={{
                width: `${progress}%`,
                height: "100%",
                background: "linear-gradient(90deg, #3B82F6, #1E4F8A)",
                borderRadius: 10,
                transition: "width 0.3s ease"
              }} />
            </div>
          </div>
        </div>

        <h2 style={{ fontFamily: "var(--font-head)", fontSize: 22, fontWeight: 700, color: "#1A1A2E", lineHeight: 1.3, marginBottom: 6 }}>
          Let's Set Up Your Learning Path
        </h2>
        <p style={{ fontSize: 14, color: "#666", fontWeight: 400 }}>
          Help Senya personalize your journey
        </p>
      </div>

      <div style={{ display: "flex", justifyContent: "center", padding: "20px 0 12px" }}>
        <div style={{ position: "relative" }}>
          <img src={senya_magnify} alt="Senya" style={{
            width: 85,
            height: 85,
            objectFit: "contain",
            filter: "drop-shadow(0 6px 12px rgba(0,0,0,0.08))",
            animation: "senya-bob 2.5s ease-in-out infinite"
          }} />
          <div style={{
            position: "absolute", top: -10, right: -65,
            background: "rgba(255,255,255,0.95)",
            backdropFilter: "blur(8px)",
            borderRadius: "12px 12px 12px 4px",
            padding: "6px 12px",
            boxShadow: "0 4px 10px rgba(0,0,0,0.06)",
            fontSize: 11,
            fontWeight: 500,
            color: "#555",
            whiteSpace: "nowrap",
            border: "1px solid rgba(255,255,255,0.3)"
          }}>
            No wrong answers
          </div>
        </div>
      </div>

      <div style={{ padding: "0 24px 24px", flex: 1 }}>
        <div style={{
          background: "rgba(255,255,255,0.95)",
          backdropFilter: "blur(10px)",
          borderRadius: 24,
          padding: 20,
          marginBottom: 18,
          boxShadow: "0 4px 12px rgba(0,0,0,0.04)",
          border: "1px solid rgba(255,255,255,0.3)"
        }}>
          <p style={{ fontSize: 17, fontWeight: 600, color: "#1A1A2E", fontFamily: "var(--font-head)", lineHeight: 1.4 }}>
            {q.question}
          </p>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 12 }} key={step}>
          {q.options.map((opt, i) => (
            <button key={i} onClick={() => setSelected(i)} style={{
              display: "flex", alignItems: "center", gap: 14,
              padding: "12px 18px",
              border: selected === i ? "2px solid #1E4F8A" : "1px solid rgba(0,0,0,0.05)",
              borderRadius: 24,
              background: selected === i ? "rgba(30,79,138,0.06)" : "rgba(255,255,255,0.9)",
              backdropFilter: "blur(8px)",
              cursor: "pointer",
              textAlign: "left",
              transition: "all 0.2s ease",
              boxShadow: selected === i ? "0 4px 12px rgba(30,79,138,0.1)" : "0 1px 3px rgba(0,0,0,0.02)",
              transform: selected === i ? "scale(1.01)" : "scale(1)"
            }}>
              <AssessmentIcon type={q.iconTypes[i]} />
              <span style={{ fontSize: 14, fontWeight: 500, color: selected === i ? "#1E4F8A" : "#1A1A2E", flex: 1 }}>{opt}</span>
              {selected === i && <CheckIcon />}
            </button>
          ))}
        </div>
      </div>

      <div style={{ padding: "0 24px 40px" }}>
        <button 
          onClick={next}
          style={{
            opacity: selected === null ? 0.5 : 1,
            cursor: selected === null ? "not-allowed" : "pointer",
            width: "100%",
            padding: "14px",
            fontSize: 15,
            fontWeight: 600,
            borderRadius: 60,
            background: selected === null ? "rgba(30, 79, 138, 0.4)" : "rgba(30, 79, 138, 0.85)",
            backdropFilter: "blur(12px)",
            color: "white",
            border: "1px solid rgba(255,255,255,0.2)",
            transition: "all 0.3s ease",
            boxShadow: selected === null ? "none" : "0 8px 20px rgba(30,79,138,0.25)"
          }}
          onMouseEnter={(e) => { 
            if (selected !== null) {
              e.currentTarget.style.background = "rgba(15, 61, 105, 0.95)";
              e.currentTarget.style.transform = "translateY(-2px)";
            }
          }}
          onMouseLeave={(e) => { 
            e.currentTarget.style.background = "rgba(30, 79, 138, 0.85)";
            e.currentTarget.style.transform = "translateY(0)";
          }}
        >
          {step < questions.length - 1 ? "Next Question →" : "See Your Results"}
        </button>
      </div>
    </div>
  );
}