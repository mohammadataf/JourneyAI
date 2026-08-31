interface Props {
  selectedTime: string;
  setSelectedTime: React.Dispatch<React.SetStateAction<string>>;
}

const TIMES = [
  "1 Hour",
  "2 Hours",
  "3 Hours",
  "4 Hours",
  "6 Hours",
  "Full Day",
];

const TimeSelector = ({
  selectedTime,
  setSelectedTime,
}: Props) => {
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
        ⏰ Time Available
      </h3>

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "10px",
        }}
      >
        {TIMES.map((time) => {
          const active = selectedTime === time;

          return (
            <button
              key={time}
              onClick={() => setSelectedTime(time)}
              style={{
                padding: "10px 18px",
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
              }}
            >
              {time}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default TimeSelector;