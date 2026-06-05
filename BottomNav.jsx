export default function BottomNav({ active, nav }) {
  const items = [
    { id: "dashboard", label: "Home", icon: HomeIcon },
    { id: "lessons", label: "Learn", icon: BookIcon },
    { id: "gesture", label: "Practice", icon: HandIcon },
    { id: "achievements", label: "Badges", icon: StarIcon },
    { id: "profile", label: "Me", icon: UserIcon },
  ];

  return (
    <nav className="bottom-nav">
      {items.map(({ id, label, icon: Icon }) => (
        <button
          key={id}
          className={active === id ? "active" : ""}
          onClick={() => nav(id)}
        >
          <Icon active={active === id} />
          <span>{label}</span>
        </button>
      ))}
    </nav>
  );
}

function HomeIcon({ active }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <path d="M3 12L12 3L21 12V21H15V15H9V21H3V12Z"
        fill={active ? "#2563EB" : "#D1D5DB"} />
    </svg>
  );
}
function BookIcon({ active }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <rect x="3" y="3" width="18" height="18" rx="3" fill={active ? "#2563EB" : "#D1D5DB"} />
      <path d="M7 8H17M7 12H13M7 16H15" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  );
}
function HandIcon({ active }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <path d="M9 3V14M12 5V14M15 7V14M18 10V14C18 17.314 15.314 20 12 20C8.686 20 6 17.314 6 14V3"
        stroke={active ? "#2563EB" : "#D1D5DB"} strokeWidth="2" strokeLinecap="round" fill="none"/>
    </svg>
  );
}
function StarIcon({ active }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"
        fill={active ? "#F59E0B" : "#D1D5DB"} />
    </svg>
  );
}
function UserIcon({ active }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="8" r="4" fill={active ? "#2563EB" : "#D1D5DB"}/>
      <path d="M4 20C4 16.686 7.582 14 12 14C16.418 14 20 16.686 20 20"
        stroke={active ? "#2563EB" : "#D1D5DB"} strokeWidth="2" strokeLinecap="round" fill="none"/>
    </svg>
  );
}
