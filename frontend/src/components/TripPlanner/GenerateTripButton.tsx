interface Props {
  onClick: () => void;
  loading?: boolean;
}

const GenerateTripButton = ({
  onClick,
  loading = false,
}: Props) => {
  return (
    <button
      onClick={onClick}
      disabled={loading}
      style={{
        width: "100%",
        marginTop: "10px",
        padding: "16px",
        border: "none",
        borderRadius: "14px",
        background: loading
          ? "#93C5FD"
          : "#2563EB",
        color: "#fff",
        fontSize: "16px",
        fontWeight: 700,
        cursor: loading
          ? "not-allowed"
          : "pointer",
        transition: ".25s",
        boxShadow:
          "0 10px 24px rgba(37,99,235,.25)",
      }}
    >
      {loading
        ? "Planning Your Trip..."
        : "✨ Generate My Trip"}
    </button>
  );
};

export default GenerateTripButton;