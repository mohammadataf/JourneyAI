interface Props {
  selectedInterests: string[];
  setSelectedInterests: React.Dispatch<
    React.SetStateAction<string[]>
  >;
}

const INTERESTS = [
  {
    id: "scenic",
    label: "Scenic",
    icon: "🌄",
  },
  {
    id: "cafe",
    label: "Cafe",
    icon: "☕",
  },
  {
    id: "food",
    label: "Food",
    icon: "🍽",
  },
  {
    id: "photography",
    label: "Photography",
    icon: "📸",
  },
];

const InterestSelector = ({
  selectedInterests,
  setSelectedInterests,
}: Props) => {
  const toggleInterest = (id: string) => {
    if (selectedInterests.includes(id)) {
      setSelectedInterests(
        selectedInterests.filter(
          (interest) => interest !== id
        )
      );
    } else {
      setSelectedInterests([
        ...selectedInterests,
        id,
      ]);
    }
  };

  return (
    <div style={{ marginBottom: "28px" }}>
      <h3
        style={{
          margin: "0 0 14px",
          fontSize: "17px",
          fontWeight: 600,
          color: "#111827",
        }}
      >
        🌄 Interests
      </h3>

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "10px",
        }}
      >
        {INTERESTS.map((interest) => {
          const active =
            selectedInterests.includes(
              interest.id
            );

          return (
            <button
              key={interest.id}
              onClick={() =>
                toggleInterest(interest.id)
              }
              style={{
                padding: "10px 16px",
                borderRadius: "12px",
                border: active
                  ? "2px solid #2563EB"
                  : "1px solid #E5E7EB",

                background: active
                  ? "#EFF6FF"
                  : "#ffffff",

                color: active
                  ? "#2563EB"
                  : "#374151",

                fontWeight: 600,
                cursor: "pointer",
                transition: ".25s",

                display: "flex",
                alignItems: "center",
                gap: "8px",
              }}
            >
              <span>{interest.icon}</span>
              <span>{interest.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default InterestSelector;