import { type Theme } from "../../services/experienceService";

interface ExperienceSelectorProps {
  theme: Theme;
  onThemeChange: (theme: Theme) => void;
}

const ExperienceSelector = ({
  theme,
  onThemeChange,
}: ExperienceSelectorProps) => {
  return (
    <div
      style={{
        position: "absolute",
        top: 110,
        left: 10,
        zIndex: 1000,
        background: "white",
        padding: "8px",
        borderRadius: "8px",
        boxShadow: "0 2px 10px rgba(0,0,0,0.2)",
      }}
    >
      <label
        style={{
          display: "block",
          marginBottom: "5px",
          fontWeight: "bold",
        }}
      >
        Experience
      </label>

      <select
        value={theme}
        onChange={(e) =>
          onThemeChange(e.target.value as Theme)
        }
        style={{
          padding: "6px",
          width: "180px",
        }}
      >
        <option value="scenic">🌄 Scenic</option>
        <option value="cafe">☕ Cafe</option>
        <option value="heritage">🏛 Heritage</option>
        <option value="adventure">🥾 Adventure</option>
        <option value="family">👨‍👩‍👧 Family</option>
         <option value="hotel">Hotel</option>
         <option value="restaurant">Restaurant</option>
      </select>
    </div>
  );
};

export default ExperienceSelector;