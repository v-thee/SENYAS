import { useState, useRef, useEffect, useCallback } from "react";
import { senya_blue } from "./images";
import BottomNav from "./BottomNav";

// Custom icons for stats using your image files
function LessonIcon({ size = 20 }) {
  return (
    <img 
      src="/img/lesson.png"
      alt="lessons"
      width={size}
      height={size}
      style={{ objectFit: "contain" }}
    />
  );
}

function EnergyIcon({ size = 20 }) {
  return (
    <img 
      src="/img/energy.png"
      alt="energy"
      width={size}
      height={size}
      style={{ objectFit: "contain" }}
    />
  );
}

function StreakIcon({ size = 20 }) {
  return (
    <img 
      src="/img/streak.png"
      alt="streak"
      width={size}
      height={size}
      style={{ objectFit: "contain" }}
    />
  );
}

function BadgeIcon({ size = 20 }) {
  return (
    <img 
      src="/img/badges.png"
      alt="badges"
      width={size}
      height={size}
      style={{ objectFit: "contain" }}
    />
  );
}

function BellIcon({ size = 20 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="#4b7bbb" strokeWidth="2">
      <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
      <path d="M13.73 21a2 2 0 0 1-3.46 0" />
    </svg>
  );
}

function SoundIcon({ size = 20 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="#4b7bbb" strokeWidth="2">
      <path d="M13 3H4a1 1 0 0 0-1 1v16a1 1 0 0 0 1 1h10m0 0h6a1 1 0 0 0 1-1V9m0 0a1 1 0 0 0-1-1h-6" />
    </svg>
  );
}

function HapticIcon({ size = 20 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="#4b7bbb" strokeWidth="2">
      <rect x="4" y="4" width="16" height="16" rx="1" />
      <path d="M9 9h6v6H9z" fill="#4b7bbb" opacity="0.2" />
    </svg>
  );
}

function TextIcon({ size = 20 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="#4b7bbb" strokeWidth="2">
      <text x="7" y="18" fontSize="16" fontWeight="bold" fill="#4b7bbb">A</text>
    </svg>
  );
}

function LanguageIcon({ size = 20 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="#4b7bbb" strokeWidth="2">
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18M12 3a15 15 0 0 0 0 18 15 15 0 0 0 0-18z" />
    </svg>
  );
}

function HelpIcon({ size = 20 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="#4b7bbb" strokeWidth="2">
      <circle cx="12" cy="12" r="10" />
      <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
      <line x1="12" y1="17" x2="12.01" y2="17" />
    </svg>
  );
}

function InfoIcon({ size = 20 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="#4b7bbb" strokeWidth="2">
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="8" x2="12" y2="8" strokeWidth="3" />
      <line x1="12" y1="12" x2="12" y2="16" />
    </svg>
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
        cursor: disabled ? "not-allowed" : "pointer",
        outline: "none",
      }}
    >
      {children}
    </button>
  );
}

function GlassToggle({ value, onChange }) {
  const [pressed, setPressed] = useState(false);
  return (
    <div
      onClick={() => onChange(!value)}
      onMouseDown={() => setPressed(true)}
      onMouseUp={() => setPressed(false)}
      onMouseLeave={() => setPressed(false)}
      style={{
        width: 52, height: 28, borderRadius: 14, cursor: "pointer",
        background: value
          ? "linear-gradient(135deg, #3B82F6, #1D4ED8)"
          : "rgba(15,49,114,0.15)",
        backdropFilter: "blur(4px)",
        position: "relative",
        transition: "all 0.2s",
        flexShrink: 0,
        border: "1px solid rgba(255,255,255,0.3)",
        transform: pressed ? "scale(0.95)" : "scale(1)",
      }}
    >
      <div style={{
        position: "absolute", top: 2,
        left: value ? 26 : 2, width: 22, height: 22,
        borderRadius: "50%", background: "#fff",
        boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
        transition: "left 0.2s, transform 0.1s",
        display: "flex", alignItems: "center", justifyContent: "center",
      }}>
        {value && (
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#1D4ED8" strokeWidth="3">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        )}
      </div>
    </div>
  );
}

/* ══ IMAGE CROP MODAL ══════════════════════════════════════════════════ */
function ImageCropModal({ isOpen, imageSrc, onClose, onConfirm }) {
  const canvasRef = useRef(null);
  const [scale, setScale] = useState(1);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);
  const dragStart = useRef(null);
  const imgRef = useRef(null);
  const SIZE = 260; // canvas display size

  // Load image natural dimensions
  const [imgNatural, setImgNatural] = useState({ w: 1, h: 1 });
  useEffect(() => {
    if (!imageSrc) return;
    const img = new Image();
    img.onload = () => {
      setImgNatural({ w: img.naturalWidth, h: img.naturalHeight });
      // Reset position/scale on new image
      const minDim = Math.min(img.naturalWidth, img.naturalHeight);
      const initScale = SIZE / minDim;
      setScale(initScale);
      setOffset({ x: 0, y: 0 });
    };
    img.src = imageSrc;
    imgRef.current = img;
  }, [imageSrc]);

  // Draw canvas
  useEffect(() => {
    if (!canvasRef.current || !imageSrc || !imgRef.current) return;
    const ctx = canvasRef.current.getContext("2d");
    const dpr = window.devicePixelRatio || 1;
    const canvas = canvasRef.current;
    canvas.width = SIZE * dpr;
    canvas.height = SIZE * dpr;
    ctx.scale(dpr, dpr);

    ctx.clearRect(0, 0, SIZE, SIZE);

    // Clip to circle
    ctx.save();
    ctx.beginPath();
    ctx.arc(SIZE / 2, SIZE / 2, SIZE / 2, 0, Math.PI * 2);
    ctx.clip();

    const drawW = imgNatural.w * scale;
    const drawH = imgNatural.h * scale;
    const x = SIZE / 2 - drawW / 2 + offset.x;
    const y = SIZE / 2 - drawH / 2 + offset.y;
    ctx.drawImage(imgRef.current, x, y, drawW, drawH);
    ctx.restore();

    // Circle border overlay
    ctx.beginPath();
    ctx.arc(SIZE / 2, SIZE / 2, SIZE / 2 - 1, 0, Math.PI * 2);
    ctx.strokeStyle = "rgba(255,255,255,0.6)";
    ctx.lineWidth = 2;
    ctx.stroke();
  }, [scale, offset, imgNatural, imageSrc]);

  const getEventPos = (e) => {
    if (e.touches) return { x: e.touches[0].clientX, y: e.touches[0].clientY };
    return { x: e.clientX, y: e.clientY };
  };

  const onPointerDown = useCallback((e) => {
    e.preventDefault();
    const pos = getEventPos(e);
    dragStart.current = { x: pos.x - offset.x, y: pos.y - offset.y };
    setDragging(true);
  }, [offset]);

  const onPointerMove = useCallback((e) => {
    if (!dragging || !dragStart.current) return;
    e.preventDefault();
    const pos = getEventPos(e);
    setOffset({
      x: pos.x - dragStart.current.x,
      y: pos.y - dragStart.current.y,
    });
  }, [dragging]);

  const onPointerUp = useCallback(() => {
    setDragging(false);
    dragStart.current = null;
  }, []);

  const handleConfirm = () => {
    // Render final crop at 300×300
    const OUT = 300;
    const outCanvas = document.createElement("canvas");
    outCanvas.width = OUT;
    outCanvas.height = OUT;
    const ctx = outCanvas.getContext("2d");
    ctx.beginPath();
    ctx.arc(OUT / 2, OUT / 2, OUT / 2, 0, Math.PI * 2);
    ctx.clip();
    const ratio = OUT / SIZE;
    const drawW = imgNatural.w * scale * ratio;
    const drawH = imgNatural.h * scale * ratio;
    const x = OUT / 2 - (imgNatural.w * scale / 2 - offset.x) * ratio;
    const y = OUT / 2 - (imgNatural.h * scale / 2 - offset.y) * ratio;
    ctx.drawImage(imgRef.current, x, y, drawW, drawH);
    onConfirm(outCanvas.toDataURL("image/jpeg", 0.92));
  };

  if (!isOpen) return null;

  return (
    <>
      <div style={{
        position: "fixed", inset: 0,
        background: "rgba(0,0,0,0.6)",
        backdropFilter: "blur(6px)",
        zIndex: 1100,
      }} onClick={onClose} />
      <div style={{
        position: "fixed", top: "50%", left: "50%",
        transform: "translate(-50%, -50%)",
        width: "92%", maxWidth: 360,
        background: "rgba(255,255,255,0.97)",
        backdropFilter: "blur(20px)",
        borderRadius: 32,
        padding: "24px 24px 28px",
        zIndex: 1101,
        boxShadow: "0 20px 48px rgba(0,0,0,0.22)",
        border: "1px solid rgba(255,255,255,0.5)",
        animation: "modalPopIn 0.3s cubic-bezier(0.34,1.3,0.64,1)",
      }} onClick={e => e.stopPropagation()}>

        {/* Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
          <h3 style={{ fontSize: 20, fontWeight: 800, color: "#0f3172", fontFamily: "var(--font-head)" }}>
            Crop Photo
          </h3>
          <button onClick={onClose} style={{
            background: "rgba(0,0,0,0.06)", border: "none", borderRadius: 12,
            width: 32, height: 32, cursor: "pointer",
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#6B7280" strokeWidth="2.5" strokeLinecap="round">
              <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        </div>
        <p style={{ fontSize: 12, color: "#6B7280", marginBottom: 20, fontWeight: 500 }}>
          Drag to reposition · Use slider to zoom
        </p>

        {/* Canvas crop area */}
        <div style={{ display: "flex", justifyContent: "center", marginBottom: 20 }}>
          <div style={{
            width: SIZE, height: SIZE, borderRadius: "50%",
            overflow: "hidden", cursor: dragging ? "grabbing" : "grab",
            boxShadow: "0 4px 24px rgba(15,49,114,0.18)",
            border: "3px solid rgba(255,255,255,0.8)",
            userSelect: "none",
            touchAction: "none",
          }}
            onMouseDown={onPointerDown}
            onMouseMove={onPointerMove}
            onMouseUp={onPointerUp}
            onMouseLeave={onPointerUp}
            onTouchStart={onPointerDown}
            onTouchMove={onPointerMove}
            onTouchEnd={onPointerUp}
          >
            <canvas
              ref={canvasRef}
              style={{ width: SIZE, height: SIZE, display: "block" }}
            />
          </div>
        </div>

        {/* Zoom slider */}
        <div style={{ marginBottom: 24, padding: "0 4px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round">
              <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
              <line x1="11" y1="8" x2="11" y2="14"/><line x1="8" y1="11" x2="14" y2="11"/>
            </svg>
            <input
              type="range"
              min={Math.max(SIZE / Math.max(imgNatural.w, imgNatural.h), 0.2)}
              max={4}
              step={0.01}
              value={scale}
              onChange={e => setScale(parseFloat(e.target.value))}
              style={{
                flex: 1, accentColor: "#2563EB", height: 4, cursor: "pointer",
              }}
            />
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#4b7bbb" strokeWidth="2" strokeLinecap="round">
              <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
              <line x1="11" y1="8" x2="11" y2="14"/><line x1="8" y1="11" x2="14" y2="11"/>
            </svg>
          </div>
        </div>

        {/* Actions */}
        <div style={{ display: "flex", gap: 12 }}>
          <PressableButton onClick={onClose} style={{
            flex: 1, padding: "12px",
            background: "rgba(0,0,0,0.05)", borderRadius: 40,
            fontSize: 14, fontWeight: 600, color: "#6B7280", border: "none",
          }}>
            Cancel
          </PressableButton>
          <PressableButton onClick={handleConfirm} style={{
            flex: 1.5, padding: "12px",
            background: "linear-gradient(135deg, #1D4ED8, #2563EB)",
            borderRadius: 40, fontSize: 14, fontWeight: 600,
            color: "#fff", border: "none",
            boxShadow: "0 4px 14px rgba(29,78,216,0.3)",
          }}>
            Apply
          </PressableButton>
        </div>
      </div>
    </>
  );
}

/* ══ SIGN OUT CONFIRMATION ═════════════════════════════════════════════ */
function SignOutConfirmModal({ isOpen, onClose, onConfirm }) {
  if (!isOpen) return null;
  return (
    <>
      <div style={{
        position: "fixed", inset: 0,
        background: "rgba(0,0,0,0.45)",
        backdropFilter: "blur(5px)",
        zIndex: 1200,
      }} onClick={onClose} />
      <div style={{
        position: "fixed", top: "50%", left: "50%",
        transform: "translate(-50%, -50%)",
        width: "88%", maxWidth: 340,
        background: "rgba(255,255,255,0.97)",
        backdropFilter: "blur(20px)",
        borderRadius: 28,
        padding: "28px 24px 24px",
        zIndex: 1201,
        boxShadow: "0 20px 48px rgba(0,0,0,0.18)",
        border: "1px solid rgba(255,255,255,0.6)",
        animation: "modalPopIn 0.3s cubic-bezier(0.34,1.3,0.64,1)",
        textAlign: "center",
      }} onClick={e => e.stopPropagation()}>

        {/* Icon */}
        <div style={{
          width: 60, height: 60, borderRadius: "50%",
          background: "rgba(239,68,68,0.10)",
          border: "1.5px solid rgba(239,68,68,0.18)",
          display: "flex", alignItems: "center", justifyContent: "center",
          margin: "0 auto 16px",
        }}>
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#DC2626" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
            <polyline points="16 17 21 12 16 7"/>
            <line x1="21" y1="12" x2="9" y2="12"/>
          </svg>
        </div>

        <h3 style={{
          fontSize: 20, fontWeight: 800, color: "#0f3172",
          fontFamily: "var(--font-head)", marginBottom: 8,
        }}>
          Sign Out?
        </h3>
        <p style={{
          fontSize: 13, color: "#6B7280", fontWeight: 500,
          lineHeight: 1.55, marginBottom: 24,
        }}>
          You'll need to sign in again to continue your learning streak.
        </p>

        <div style={{ display: "flex", gap: 12 }}>
          <PressableButton onClick={onClose} style={{
            flex: 1, padding: "13px",
            background: "rgba(15,49,114,0.07)",
            border: "1px solid rgba(15,49,114,0.10)",
            borderRadius: 40, fontSize: 14, fontWeight: 700,
            color: "#0f3172",
          }}>
            Stay
          </PressableButton>
          <PressableButton onClick={onConfirm} style={{
            flex: 1.3, padding: "13px",
            background: "linear-gradient(135deg, #DC2626, #EF4444)",
            border: "none", borderRadius: 40,
            fontSize: 14, fontWeight: 700, color: "#fff",
            boxShadow: "0 4px 14px rgba(220,38,38,0.3)",
          }}>
            Sign Out
          </PressableButton>
        </div>
      </div>
    </>
  );
}

/* ══ EDIT PROFILE MODAL ════════════════════════════════════════════════ */
function EditProfileModal({ isOpen, onClose, user, onUpdateUser }) {
  const [nickname, setNickname] = useState(user?.nickname || "");
  const [showBadges, setShowBadges] = useState(user?.showBadges !== false);
  const [avatarPreview, setAvatarPreview] = useState(null);
  const [pendingImageSrc, setPendingImageSrc] = useState(null);
  const [showCrop, setShowCrop] = useState(false);
  const fileInputRef = useRef(null);

  if (!isOpen) return null;

  const handleSave = () => {
    onUpdateUser({
      ...user,
      nickname,
      showBadges,
      customAvatar: avatarPreview || user?.customAvatar,
    });
    onClose();
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      setPendingImageSrc(reader.result);
      setShowCrop(true);
    };
    reader.readAsDataURL(file);
    // Reset input so same file can be re-selected
    e.target.value = "";
  };

  const handleCropConfirm = (croppedDataUrl) => {
    setAvatarPreview(croppedDataUrl);
    setShowCrop(false);
    setPendingImageSrc(null);
  };

  return (
    <>
      {/* Crop modal sits above edit modal */}
      <ImageCropModal
        isOpen={showCrop}
        imageSrc={pendingImageSrc}
        onClose={() => { setShowCrop(false); setPendingImageSrc(null); }}
        onConfirm={handleCropConfirm}
      />

      <div style={{
        position: "fixed", top: 0, left: 0, right: 0, bottom: 0,
        background: "rgba(0,0,0,0.5)",
        backdropFilter: "blur(4px)",
        zIndex: 1000,
        display: "flex", alignItems: "center", justifyContent: "center",
        padding: "20px",
      }} onClick={onClose} />

      <div style={{
        position: "fixed", top: "50%", left: "50%",
        transform: "translate(-50%, -50%)",
        width: "90%", maxWidth: 380,
        background: "rgba(255,255,255,0.95)",
        backdropFilter: "blur(20px)",
        borderRadius: 32, padding: "24px",
        zIndex: 1001,
        boxShadow: "0 20px 40px rgba(0,0,0,0.2)",
        border: "1px solid rgba(255,255,255,0.5)",
        animation: "modalPopIn 0.3s cubic-bezier(0.34,1.3,0.64,1)",
      }} onClick={e => e.stopPropagation()}>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
          <h3 style={{ fontSize: 20, fontWeight: 800, color: "#0f3172", fontFamily: "var(--font-head)" }}>
            Edit Profile
          </h3>
          <button onClick={onClose} style={{
            background: "rgba(0,0,0,0.05)", border: "none", borderRadius: 12,
            width: 32, height: 32, cursor: "pointer", fontSize: 18,
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>✕</button>
        </div>

        {/* Avatar */}
        <div style={{ textAlign: "center", marginBottom: 24 }}>
          <div style={{
            width: 100, height: 100, borderRadius: "50%",
            background: "linear-gradient(135deg, #1035a0, #2563EB)",
            display: "flex", alignItems: "center", justifyContent: "center",
            margin: "0 auto 12px",
            border: "3px solid rgba(255,255,255,0.5)",
            boxShadow: "0 8px 20px rgba(0,0,0,0.15)",
            overflow: "hidden",
          }}>
            <img
              src={avatarPreview || user?.customAvatar || senya_blue}
              alt="Avatar"
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </div>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            style={{ display: "none" }}
            onChange={handleImageUpload}
          />
          <PressableButton
            onClick={() => fileInputRef.current?.click()}
            style={{
              background: "rgba(59,130,246,0.1)",
              border: "1px solid rgba(59,130,246,0.3)",
              borderRadius: 40, padding: "8px 16px",
              fontSize: 12, fontWeight: 600, color: "#2563EB",
            }}
          >
            Change Picture
          </PressableButton>
        </div>

        {/* Nickname */}
        <div style={{ marginBottom: 20 }}>
          <label style={{ fontSize: 13, fontWeight: 600, color: "#1F2937", marginBottom: 6, display: "block" }}>
            Display Name
          </label>
          <input
            type="text"
            value={nickname}
            onChange={e => setNickname(e.target.value)}
            placeholder="Enter a nickname"
            style={{
              width: "100%", padding: "12px 16px",
              border: "1px solid rgba(0,0,0,0.1)", borderRadius: 16,
              fontSize: 14, background: "rgba(255,255,255,0.8)", outline: "none",
            }}
          />
          <p style={{ fontSize: 10, color: "#9CA3AF", marginTop: 4 }}>
            *Your real name cannot be changed
          </p>
        </div>

        {/* Badge toggle */}
        <div style={{
          display: "flex", alignItems: "center", justifyContent: "space-between",
          padding: "12px 0",
          borderTop: "1px solid rgba(0,0,0,0.05)",
          borderBottom: "1px solid rgba(0,0,0,0.05)",
          marginBottom: 24,
        }}>
          <div>
            <p style={{ fontSize: 14, fontWeight: 600, color: "#1F2937" }}>Show Badges</p>
            <p style={{ fontSize: 11, color: "#6B7280" }}>Display your earned badges on profile</p>
          </div>
          <GlassToggle value={showBadges} onChange={setShowBadges} />
        </div>

        <div style={{ display: "flex", gap: 12 }}>
          <PressableButton onClick={onClose} style={{
            flex: 1, padding: "12px",
            background: "rgba(0,0,0,0.05)", borderRadius: 40,
            fontSize: 14, fontWeight: 600, color: "#6B7280",
          }}>
            Cancel
          </PressableButton>
          <PressableButton onClick={handleSave} style={{
            flex: 1.5, padding: "12px",
            background: "linear-gradient(135deg, #1D4ED8, #2563EB)",
            borderRadius: 40, fontSize: 14, fontWeight: 600, color: "#fff",
          }}>
            Save Changes
          </PressableButton>
        </div>
      </div>

      <style>{`
        @keyframes modalPopIn {
          from { opacity: 0; transform: translate(-50%, -50%) scale(0.9); }
          to   { opacity: 1; transform: translate(-50%, -50%) scale(1); }
        }
      `}</style>
    </>
  );
}

/* ══ PROFILE SCREEN ════════════════════════════════════════════════════ */
export default function Profile({ nav, user: initialUser }) {
  const [user, setUser] = useState(initialUser || {
    name: "Maria Santos",
    nickname: "",
    xp: 340,
    streak: 5,
    showBadges: true,
  });
  const [notifs, setNotifs]   = useState(true);
  const [sound, setSound]     = useState(true);
  const [haptic, setHaptic]   = useState(false);
  const [large, setLarge]     = useState(false);
  const [isModalOpen, setIsModalOpen]       = useState(false);
  const [showSignOutConfirm, setShowSignOutConfirm] = useState(false);

  const stats = [
    { label: "Lessons Done", value: "12",              icon: LessonIcon, color: "#3B82F6" },
    { label: "Total XP",     value: user?.xp || "340", icon: EnergyIcon, color: "#F59E0B" },
    { label: "Day Streak",   value: user?.streak || "5", icon: StreakIcon, color: "#EF4444" },
    { label: "Badges",       value: "4",               icon: BadgeIcon,  color: "#8B5CF6" },
  ];

  const displayName = user?.nickname || user?.name || "Maria Santos";
  const showBadgesSection = user?.showBadges !== false;

  const settingsItems = [
    { label: "Daily Reminders",  sub: "Get notified to practice",   val: notifs, set: setNotifs, icon: BellIcon   },
    { label: "Sound Effects",    sub: "Play sounds during lessons",  val: sound,  set: setSound,  icon: SoundIcon  },
    { label: "Haptic Feedback",  sub: "Vibrate on interactions",     val: haptic, set: setHaptic, icon: HapticIcon },
    { label: "Large Text Mode",  sub: "Bigger text for readability", val: large,  set: setLarge,  icon: TextIcon   },
  ];

  const accountItems = [
    { label: "Language Preference", icon: LanguageIcon },
    { label: "Help & Support",      icon: HelpIcon     },
    { label: "About SEÑAS",         icon: InfoIcon     },
  ];

  return (
    <div className="screen" style={{
      background: "linear-gradient(180deg, #a8d4f5 0%, #c5e3f7 25%, #daeefb 55%, #eaf5fd 80%, #f0f8ff 100%)",
      minHeight: "100vh",
      paddingBottom: 88,
    }}>
      <EditProfileModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        user={user}
        onUpdateUser={setUser}
      />

      <SignOutConfirmModal
        isOpen={showSignOutConfirm}
        onClose={() => setShowSignOutConfirm(false)}
        onConfirm={() => { setShowSignOutConfirm(false); nav("onboarding"); }}
      />

      {/* Header */}
      <div style={{
        background: "linear-gradient(135deg, #1035a0 0%, #1848c8 50%, #2563EB 100%)",
        padding: "52px 24px 40px",
        textAlign: "center",
        position: "relative",
        overflow: "hidden",
      }}>
        <div style={{ position: "absolute", top: -30, right: -30, width: 150, height: 150, borderRadius: "50%", background: "rgba(255,255,255,0.06)" }} />
        <div style={{ position: "absolute", bottom: -40, left: -40, width: 120, height: 120, borderRadius: "50%", background: "rgba(255,255,255,0.04)" }} />

        <div style={{ position: "relative", display: "inline-block" }}>
          <div style={{
            width: 88, height: 88, borderRadius: "50%",
            background: "rgba(255,255,255,0.15)",
            display: "flex", alignItems: "center", justifyContent: "center",
            margin: "0 auto",
            border: "3px solid rgba(255,255,255,0.3)",
            boxShadow: "0 8px 20px rgba(0,0,0,0.15)",
            overflow: "hidden",
          }}>
            <img src={user?.customAvatar || senya_blue} alt="Avatar" style={{
              width: "100%", height: "100%", objectFit: "cover",
            }} />
          </div>
          <PressableButton
            onClick={() => setIsModalOpen(true)}
            style={{
              position: "absolute", bottom: 0, right: -4,
              width: 32, height: 32, borderRadius: "50%",
              background: "#FBBF24", border: "2.5px solid #1848c8",
              display: "flex", alignItems: "center", justifyContent: "center",
              boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="#1848c8">
              <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25z"/>
              <path d="M20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/>
            </svg>
          </PressableButton>
        </div>

        <h2 style={{ color: "#fff", fontFamily: "var(--font-head)", fontSize: 24, fontWeight: 800, marginTop: 12 }}>
          {displayName}
        </h2>
        <p style={{ color: "rgba(255,255,255,0.8)", fontSize: 13, fontWeight: 500 }}>
          FSL Beginner Learner
        </p>

        <div style={{ display: "flex", justifyContent: "center", gap: 8, marginTop: 10 }}>
          <span style={{
            background: "rgba(255,255,255,0.15)", borderRadius: 8, padding: "4px 12px",
            color: "#FBBF24", fontSize: 12, fontWeight: 700,
            display: "flex", alignItems: "center", gap: 4, backdropFilter: "blur(4px)",
          }}>
            <EnergyIcon size={12} /> Beginner
          </span>
          <span style={{
            background: "rgba(255,255,255,0.15)", borderRadius: 8, padding: "4px 12px",
            color: "#fff", fontSize: 12, fontWeight: 600, backdropFilter: "blur(4px)",
          }}>
            Member since 2026
          </span>
        </div>
      </div>

      {/* Stats */}
      <div style={{ padding: "0 16px", marginTop: -24 }}>
        <GlassCard style={{ padding: 20 }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 8 }}>
            {stats.map((s, i) => {
              const IconComp = s.icon;
              return (
                <div key={i} style={{ textAlign: "center" }}>
                  <div style={{
                    width: 44, height: 44, borderRadius: 14,
                    background: `${s.color}15`,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    margin: "0 auto 8px",
                  }}>
                    <IconComp size={22} />
                  </div>
                  <div style={{ fontFamily: "var(--font-head)", fontSize: 22, fontWeight: 800, color: "#0f3172" }}>{s.value}</div>
                  <div style={{ fontSize: 10, color: "#6B7280", fontWeight: 600, lineHeight: 1.2, marginTop: 2 }}>{s.label}</div>
                </div>
              );
            })}
          </div>
        </GlassCard>
      </div>

      {/* Progress */}
      <div style={{ padding: "20px 16px 0" }}>
        <h3 style={{ fontFamily: "var(--font-head)", fontSize: 17, fontWeight: 800, color: "#0f3172", marginBottom: 12 }}>
          Learning Progress
        </h3>
        <GlassCard style={{ padding: 20 }}>
          {[
            { name: "FSL Alphabet",    pct: 65,  color: "#3B82F6" },
            { name: "Greetings",       pct: 100, color: "#10B981" },
            { name: "Numbers",         pct: 30,  color: "#F59E0B" },
            { name: "Classroom Words", pct: 0,   color: "#8B5CF6" },
          ].map((item, i) => (
            <div key={i} style={{ marginBottom: i < 3 ? 16 : 0 }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6, alignItems: "center" }}>
                <span style={{ fontSize: 13, fontWeight: 700, color: "#1F2937" }}>{item.name}</span>
                <span style={{ fontSize: 12, fontWeight: 700, color: item.color }}>{item.pct}%</span>
              </div>
              <div style={{ background: "rgba(15,49,114,0.10)", borderRadius: 99, height: 6, overflow: "hidden" }}>
                <div style={{
                  width: `${item.pct}%`, height: "100%",
                  background: `linear-gradient(90deg, ${item.color}99, ${item.color})`,
                  borderRadius: 99, transition: "width 0.3s",
                }} />
              </div>
            </div>
          ))}
        </GlassCard>
      </div>

      {/* Badges */}
      {showBadgesSection && (
        <div style={{ padding: "20px 16px 0" }}>
          <h3 style={{ fontFamily: "var(--font-head)", fontSize: 17, fontWeight: 800, color: "#0f3172", marginBottom: 12 }}>
            Recent Badges
          </h3>
          <GlassCard style={{ padding: 20 }}>
            <div style={{ display: "flex", justifyContent: "space-around", alignItems: "center" }}>
              {[
                { src: "/img/first_step.png",     label: "First Step"     },
                { src: "/img/alphabet_star.png",  label: "Alphabet Star"  },
                { src: "/img/streak1.png",        label: "Streak Starter" },
                { src: "/img/greetings.png",      label: "Greeter"        },
              ].map((b, i) => (
                <div key={i} style={{ textAlign: "center" }}>
                  <img src={b.src} alt={b.label} width="48" height="48" style={{ borderRadius: 12 }} />
                  <p style={{ fontSize: 10, color: "#6B7280", marginTop: 4 }}>{b.label}</p>
                </div>
              ))}
            </div>
          </GlassCard>
        </div>
      )}

      {/* Settings */}
      <div style={{ padding: "20px 16px 0" }}>
        <h3 style={{ fontFamily: "var(--font-head)", fontSize: 17, fontWeight: 800, color: "#0f3172", marginBottom: 12 }}>
          Settings
        </h3>
        <GlassCard style={{ overflow: "hidden", padding: 0 }}>
          {settingsItems.map((item, i, arr) => {
            const IconComp = item.icon;
            return (
              <div key={i} style={{
                display: "flex", alignItems: "center", gap: 14,
                padding: "16px 18px",
                borderBottom: i < arr.length - 1 ? "1px solid rgba(15,49,114,0.08)" : "none",
              }}>
                <div style={{
                  width: 40, height: 40, borderRadius: 12,
                  background: "rgba(15,49,114,0.08)",
                  display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
                }}>
                  <IconComp size={20} />
                </div>
                <div style={{ flex: 1 }}>
                  <p style={{ fontSize: 14, fontWeight: 700, color: "#1F2937" }}>{item.label}</p>
                  <p style={{ fontSize: 11, color: "#6B7280", fontWeight: 500, marginTop: 2 }}>{item.sub}</p>
                </div>
                <GlassToggle value={item.val} onChange={item.set} />
              </div>
            );
          })}
        </GlassCard>
      </div>

      {/* Account actions */}
      <div style={{ padding: "20px 16px 0" }}>
        <GlassCard style={{ overflow: "hidden", padding: 0 }}>
          {accountItems.map((item, i, arr) => {
            const IconComp = item.icon;
            return (
              <PressableButton key={i} onClick={() => {}} style={{
                display: "flex", alignItems: "center", gap: 14,
                padding: "16px 18px", width: "100%", textAlign: "left",
                background: "transparent", border: "none",
                borderBottom: i < arr.length - 1 ? "1px solid rgba(15,49,114,0.08)" : "none",
              }}>
                <div style={{
                  width: 40, height: 40, borderRadius: 12,
                  background: "rgba(15,49,114,0.08)",
                  display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
                }}>
                  <IconComp size={20} />
                </div>
                <span style={{ flex: 1, fontSize: 14, fontWeight: 600, color: "#1F2937" }}>{item.label}</span>
                <span style={{ color: "#9CA3AF", fontSize: 18 }}>›</span>
              </PressableButton>
            );
          })}
        </GlassCard>
      </div>

      {/* Sign Out */}
      <div style={{ padding: "20px 16px 40px" }}>
        <PressableButton
          onClick={() => setShowSignOutConfirm(true)}
          style={{
            width: "100%", padding: "14px", fontSize: 15, fontWeight: 600,
            borderRadius: 60, background: "rgba(239,68,68,0.1)",
            color: "#DC2626", border: "1px solid rgba(239,68,68,0.2)",
            backdropFilter: "blur(8px)",
          }}
        >
          Sign Out
        </PressableButton>
      </div>

      <BottomNav active="profile" nav={nav} />
    </div>
  );
}