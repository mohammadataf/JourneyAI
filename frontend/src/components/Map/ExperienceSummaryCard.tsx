import {type ExperienceRoute } from "../../services/experienceService";
import { useState } from "react";

interface Props {
  experience: ExperienceRoute;
}

const ExperienceSummaryCard = ({ experience }: Props) => {
  const { poi, summary } = experience;
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
      {/* <h2
        style={{
          margin: 0,
          color: "#2c3e50",
        }}
      >
        {poi.name}
      </h2> */}

      {/* <p
        style={{
          margin: "4px 0 16px",
          color: "#888",
          fontSize: "14px",
        }}
      >
        {poi.address}
      </p> */}

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
      {showTips ? "Hide Travel Tips ▲" : "Show Travel Tips ▼"}
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