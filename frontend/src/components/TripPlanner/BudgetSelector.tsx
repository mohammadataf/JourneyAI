interface Props {
  selectedBudget: string;
  setSelectedBudget: React.Dispatch<React.SetStateAction<string>>;
}

const BUDGETS = [
  "₹500",
  "₹1000",
  "₹2000",
  "₹5000",
  "Custom",
];

const BudgetSelector = ({
  selectedBudget,
  setSelectedBudget,
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
        💰 Budget
      </h3>

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "10px",
        }}
      >
        {BUDGETS.map((budget) => {
          const active = selectedBudget === budget;

          return (
            <button
              key={budget}
              onClick={() => setSelectedBudget(budget)}
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
              {budget}
            </button>
          );
        })}
      </div>

      {selectedBudget === "Custom" && (
        <input
          type="number"
          placeholder="Enter your budget"
          style={{
            width: "100%",
            marginTop: "14px",
            padding: "12px",
            borderRadius: "12px",
            border: "1px solid #E5E7EB",
            fontSize: "15px",
            boxSizing: "border-box",
          }}
        />
      )}
    </div>
  );
};

export default BudgetSelector;