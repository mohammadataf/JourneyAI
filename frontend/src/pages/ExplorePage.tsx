const categories = [
  { id: "cafe", name: "Cafe", icon: "☕" },
  { id: "restaurant", name: "Restaurant", icon: "🍴" },
  { id: "hotel", name: "Hotel", icon: "🏨" },
  { id: "scenic", name: "Scenic", icon: "🌄" },
  { id: "heritage", name: "Heritage", icon: "🏛️" },
  { id: "shopping", name: "Shopping", icon: "🛒" },
  { id: "hospital", name: "Hospital", icon: "🏥" },
  { id: "atm", name: "ATM", icon: "🏧" },
  { id: "petrol_pump", name: "Petrol Pump", icon: "⛽" },
];

export default function ExplorePage() {
  return (
    <div style={{ padding: "24px" }}>
      <h1>Explore</h1>
      <p>What would you like to explore?</p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))",
          gap: "16px",
          marginTop: "24px",
        }}
      >
        {categories.map((category) => (
          <button
            key={category.id}
            style={{
              padding: "20px",
              fontSize: "18px",
              borderRadius: "12px",
              cursor: "pointer",
            }}
          >
            <div style={{ fontSize: "32px" }}>{category.icon}</div>
            <div>{category.name}</div>
          </button>
        ))}
      </div>
    </div>
  );
}