import { type Theme,type ExperienceRoute } from "../../services/experienceService";

interface Props {
  experiences: ExperienceRoute[];
  selected: number;
  setSelected: React.Dispatch<React.SetStateAction<number>>;
  theme:Theme
}

const TITLES: Record<Theme, string> = {
  scenic: "🌄 Scenic Routes",
  cafe: "☕ Cafe Routes",
  heritage: "🏛 Heritage Routes",
  adventure: "🥾 Adventure Routes",
  hotel :"Hotels",
  restaurant:"Restaurant",
};

const ExperienceRouteList  = ({
  experiences,
  selected,
  setSelected,
  theme
}: Props) => {
  return (
    <div
      style={{
        position: "absolute",
        top: 120,
        right: 20,
        zIndex: 1000,
        background: "white",
        padding: "12px",
        borderRadius: "10px",
        width: "260px",
        boxShadow: "0 2px 10px rgba(0,0,0,0.2)",
      }}
    >
      <h3>{TITLES[theme]}</h3>

      {experiences.map((exp, index) => (
        <div
          key={exp.poi.id}
          onClick={() => setSelected(index)}
          style={{
            padding: "10px",
            marginBottom: "8px",
            cursor: "pointer",
            borderRadius: "8px",
            background:
              selected === index ? "#d9f99d" : "#f5f5f5",
          }}
        >
          <strong>{exp.poi.name}</strong>

          <div>
            ⭐ {exp.poi.rating ?? "N/A"}
          </div>

          <div>
            {(exp.route.distance / 1000).toFixed(1)} km
          </div>
        </div>
      ))}
    </div>
  );
};

export default ExperienceRouteList ;