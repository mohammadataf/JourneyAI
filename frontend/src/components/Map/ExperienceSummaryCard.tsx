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

  const [expanded, setExpanded] = useState(false);
  const [showTips, setShowTips] = useState(false);

  return (
    <div
      style={{
        position: "fixed",
        bottom: 8,
        left: "42.5%",
        transform: "translateX(-50%)",
        width: "950px",
        maxWidth: "90vw",
        height: !expanded? "115px": showTips? "450px": "260px",
        background: "#fff",
        borderRadius: "18px",
        boxShadow: "0 12px 30px rgba(0,0,0,.18)",
        overflow: "hidden",
        transition: "height .35s ease",
        display: "flex",
        flexDirection: "column",
        zIndex: 1000,
      }}
    >
      {/* Header */}
      <div
        style={{
          padding: "14px 22px 16px",
          borderBottom: expanded
            ? "1px solid #e5e7eb"
            : "none",
          flexShrink: 0,
        }}
      >
         <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: "16px",
            //  padding:"12px"
          }}
        >
          <h2
            style={{
               
              color: "#16a34a",
              fontSize: "22px",
              fontWeight: 700,
            }}
          >
            {summary.headline}
          </h2>

          <div
            style={{
              color: "#6b7280",
              fontSize: "14px",
              whiteSpace: "nowrap",
            }}
          >
            📍 {poi.name}
          </div>
        </div>

         

      <p
          style={{
            // marginTop: 14,
            marginBottom: 0,
            color: "#4b5563",
            lineHeight: 1.7,
            fontSize: "15px",
          }}
        >
  {expanded? summary.summary: `${summary.summary.slice(0, 240)}...`}
      {!expanded && (
        <>
          ...{" "}
          <span
            onClick={() => setExpanded(true)}
            style={{
              color: "#2563eb",
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            Show More
          </span>
        </>
      )}
</p>

 
      </div>

      {expanded && (
        <>
          {/* Scrollable Body */}
          <div
            style={{
              flex: 1,
              overflowY: "auto",
              padding: "20px 22px",
            }}
          >
            

             <div
  onClick={() => setShowTips(!showTips)}
  style={{
    // marginTop: "8px",
    // marginBottom: "16px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    cursor: "pointer",
    fontWeight: 700,
    fontSize: "20px",
    color: "#111827",
  }}
>
  <span>💡 Travel Tips</span>
  <span>{showTips ? "▲" : "▼"}</span>
</div>

{showTips && (
  <div
    style={{
      display: "flex",
      flexDirection: "column",
      gap: "12px",
    }}
  >
    {summary.tips.map((tip, index) => (
      <div
        key={index}
        style={{
          display: "flex",
          alignItems: "flex-start",
          gap: "12px",
          background: "#f9fafb",
          borderRadius: "12px",
          padding: "14px 16px",
        }}
      >
        <span
          style={{
            color: "#16a34a",
            fontWeight: 700,
          }}
        >
          ✓
        </span>

        <span
          style={{
            color: "#4b5563",
            lineHeight: 1.7,
          }}
        >
          {tip}
        </span>
      </div>
    ))}
  </div>
)}
          </div>

          {/* Footer */}
          <div
            style={{
              borderTop: "1px solid #e5e7eb",
              padding: "14px 22px",
              background: "#fff",
              flexShrink: 0,
              display: "flex",
              justifyContent: "center",
            }}
          >
            <button
              onClick={() => setExpanded(false)}
              style={{
                border: "none",
                background: "none",
                color: "#2563eb",
                fontWeight: 600,
                cursor: "pointer",
                fontSize: "15px",
              }}
            >
              Show Less ▲
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default ExperienceSummaryCard;