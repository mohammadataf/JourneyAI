import { type Theme, type ExperienceRoute } from "../../services/experienceService";
import "./ExperienceRouteList.css";

interface Props {
  experiences: ExperienceRoute[];
  selected: number;
  setSelected: React.Dispatch<React.SetStateAction<number>>;
  theme: Theme;
}

const TITLES: Record<Theme, string> = {
  scenic: "🌄 Scenic Routes",
  cafe: "☕ Cafe",
  heritage: "🏛 Heritage",
  adventure: "🥾 Adventure",
  hotel: "🏨 Hotels",
  restaurant: "🍽 Restaurants",
};

const ExperienceRouteList = ({
  experiences,
  selected,
  setSelected,
  theme,
}: Props) => {
  return (
    <div
      className="experience-panel"
      style={{
        position: "absolute",
        right: "15px",
        top: "20px",
        width: "270px",
        maxHeight: "calc(100vh - 40px)",
        overflowY: "auto",
        WebkitOverflowScrolling: "touch",
        scrollbarWidth: "none",
        zIndex: 1,
      }}
    >
      <h3
        style={{
          color: "#1f2937",
          marginBottom: "18px",
          fontSize: "20px",
          fontWeight: 700,
          background: "#fff",
          padding: "12px 16px",
          borderRadius: "14px",
          boxShadow: "0 8px 20px rgba(0,0,0,.08)",
          position: "sticky",
          top: 10,
          zIndex: 1000,
        }}
      >
        {TITLES[theme]}
      </h3>

      {experiences.map((exp, index) => (
        <div
          key={exp.poi.id}
          onClick={() => setSelected(index)}
          className={`experience-card ${
            index === selected ? "active" : ""
          }`}
        >
          <div className="experience-title">
            {exp.poi.name}
          </div>

          <div className="experience-info">
            ⭐ {exp.poi.rating ?? "N/A"}
          </div>

          <div className="experience-info">
            📍 {(exp.route.distance / 1000).toFixed(1)} km
          </div>
        </div>
      ))}
    </div>
  );
};

export default ExperienceRouteList;