interface Props {
  onClick: () => void;
  panelOpen: boolean;
}

const FloatingToggleButton = ({ onClick,panelOpen}: Props) => {
  return (
    <button
      onClick={onClick}
      style={{
        position: "absolute",
        left: panelOpen ? "-375px" : "5px",
        top: "50%",
        transform: "translateY(-50%)",
        width: "40px",
        height: "80px",
        border: "none",
        borderRadius: "0 18px 18px 0",
        background: "#2563EB",
        color: "#fff",
        fontSize: "26px",
        cursor: "pointer",
        zIndex: 1200,
        boxShadow: "0 10px 25px rgba(37,99,235,.35)",
         transition: "left 0.4s ease",
      }}
    >
      ❯
    </button>
  );
};

export default FloatingToggleButton;