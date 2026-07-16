import { useState } from "react";
import type { ExperienceRoute } from "../../services/experienceService";
import type { ExperienceSummary } from "../../services/summaryService";

interface Props {
  experience: ExperienceRoute;
  summary: ExperienceSummary;
}

const ExperienceSummaryCard = ({
  experience,
  summary,
}: Props) => {

  const { poi } = experience;

  const [showTips, setShowTips] = useState(false);

  return (
    <div
      style={{
        position: "fixed",
        bottom: 5,
        left: "37.5%",
        transform: "translateX(-50%)",
        width: "1100px",
        minHeight: "50px",
        background: "#fff",
        borderRadius: "16px",
        boxShadow: "0 10px 25px rgba(0,0,0,0.18)",
        padding: "10px 18px",
        zIndex: 1000,
      }}
    >
      {/* <h2>{poi.name}</h2> */}

      {/* <p>{poi.address}</p> */}

      <h3
        style={{
          margin: "0 0 10px",
          color: "#4caf50",
        }}
      >
        {summary.headline}
      </h3>

      <p
        style={{
          margin: 0,
          lineHeight: 1.6,
          color: "#444",
        }}
      >
        {summary.summary}
      </p>

      {summary.tips.length > 0 && (
        <>
          <button
            onClick={() => setShowTips(!showTips)}
            style={{
              marginTop: "12px",
              padding: "6px 10px",
              border: "none",
              borderRadius: "8px",
              background: "#4caf50",
              color: "#fff",
              cursor: "pointer",
              fontWeight: 600,
            }}
          >
            {showTips
              ? "Hide Travel Tips ▲"
              : "Show Travel Tips ▼"}
          </button>

          {showTips && (
            <ul
              style={{
                marginTop: "12px",
                paddingLeft: "20px",
                color: "#555",
              }}
            >
              {summary.tips.map((tip, index) => (
                <li
                  key={index}
                  style={{
                    marginBottom: "8px",
                  }}
                >
                  {tip}
                </li>
              ))}
            </ul>
          )}
        </>
      )}
    </div>
  );
};

export default ExperienceSummaryCard;