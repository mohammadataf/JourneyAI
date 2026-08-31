interface POISummary {
  id: string;
  name: string;
  category?: string;
  summary?: string;
  whySelected?: string;
  whyBest?: string;
  famousFor?: string;
}

interface Props {
  poi: POISummary;
  onClose: () => void;
}

const POISummaryCard = ({ poi, onClose }: Props) => {
  return (
    <div
      style={{
        position: "absolute",
        top: "80px",
        right: "30px",
        width: "340px",
        background: "#ffffff",
        borderRadius: "18px",
        padding: "20px",
        boxShadow: "0 20px 60px rgba(0,0,0,0.25)",
        zIndex: 9999,
      }}
    >
      {/* Close */}
      <button
        onClick={onClose}
        style={{
          position: "absolute",
          top: "10px",
          right: "12px",
          border: "none",
          background: "transparent",
          fontSize: "20px",
          cursor: "pointer",
          color: "#6B7280",
        }}
      >
        ×
      </button>

      {/* Category */}
      {poi.category && (
        <div
          style={{
            display: "inline-block",
            padding: "5px 10px",
            borderRadius: "20px",
            background: "#EFF6FF",
            color: "#1D6BE6",
            fontSize: "12px",
            fontWeight: 600,
            textTransform: "capitalize",
            marginBottom: "10px",
          }}
        >
          {poi.category}
        </div>
      )}

      {/* Name */}
      <h3
        style={{
          margin: "0 30px 8px 0",
          fontSize: "21px",
          fontWeight: 700,
          color: "#111827",
        }}
      >
        {poi.name}
      </h3>

      {/* Summary */}
      {poi.summary && (
        <p
          style={{
            margin: "0 0 16px",
            color: "#4B5563",
            fontSize: "14px",
            lineHeight: 1.5,
          }}
        >
          {poi.summary}
        </p>
      )}

      {/* Why Selected */}
      {poi.whySelected && (
        <div style={{ marginBottom: "14px" }}>
          <div
            style={{
              fontSize: "13px",
              fontWeight: 700,
              color: "#111827",
              marginBottom: "4px",
            }}
          >
            ✨ Why JourneyAI selected it
          </div>

          <p
            style={{
              margin: 0,
              fontSize: "13px",
              lineHeight: 1.5,
              color: "#4B5563",
            }}
          >
            {poi.whySelected}
          </p>
        </div>
      )}

      {/* Why Best */}
      {poi.whyBest && (
        <div style={{ marginBottom: "14px" }}>
          <div
            style={{
              fontSize: "13px",
              fontWeight: 700,
              color: "#111827",
              marginBottom: "4px",
            }}
          >
            ⭐ Why it's a good choice
          </div>

          <p
            style={{
              margin: 0,
              fontSize: "13px",
              lineHeight: 1.5,
              color: "#4B5563",
            }}
          >
            {poi.whyBest}
          </p>
        </div>
      )}

      {/* Famous For */}
      {poi.famousFor && (
        <div>
          <div
            style={{
              fontSize: "13px",
              fontWeight: 700,
              color: "#111827",
              marginBottom: "4px",
            }}
          >
            📍 Famous for
          </div>

          <p
            style={{
              margin: 0,
              fontSize: "13px",
              lineHeight: 1.5,
              color: "#4B5563",
            }}
          >
            {poi.famousFor}
          </p>
        </div>
      )}
    </div>
  );
};

export default POISummaryCard;