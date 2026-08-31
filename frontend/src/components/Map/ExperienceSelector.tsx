import { type Theme } from "../../services/experienceService";

interface ExperienceSelectorProps {
  theme: Theme;
  onThemeChange: (theme: Theme) => void;
}

const experiences: {
  value: Theme;
  label: string;
  icon: string;
}[] = [
  { value: "scenic", label: "Scenic", icon: "🌄" },
  { value: "cafe", label: "Cafe", icon: "☕" },
  { value: "heritage", label: "Heritage", icon: "🏛" },
  { value: "adventure", label: "Adventure", icon: "🥾" },
  { value: "hotel", label: "Hotel", icon: "🏨" },
  { value: "restaurant", label: "Restaurant", icon: "🍽️" },
];

const ExperienceSelector = ({
  theme,
  onThemeChange,
}: ExperienceSelectorProps) => {
  return (
    <div style={{ width: "100%" }}>
      <div
        style={{
          fontWeight: 600,
          marginBottom: "12px",
          color: "#374151",
          fontSize: "15px",
        }}
      >
        Experience Type
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "10px",
        }}
      >
        {experiences.map((item) => {
          const active = theme === item.value;

          return (
            <button
              key={item.value}
              onClick={() => onThemeChange(item.value)}
              style={{
                border: active
                  ? "2px solid #2563EB"
                  : "1px solid #E5E7EB",
                background: active ? "#EFF6FF" : "#fff",
                borderRadius: "12px",
                padding: "12px 8px",
                cursor: "pointer",
                transition: "0.2s",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "6px",
              }}
            >
              <span style={{ fontSize: "22px" }}>{item.icon}</span>

              <span
                style={{
                  fontSize: "12px",
                  fontWeight: active ? 600 : 500,
                  color: active ? "#2563EB" : "#374151",
                }}
              >
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default ExperienceSelector;