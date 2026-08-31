type Props = {
  icon: string;
  title: string;
  onClick?: () => void;
};

export default function CategoryCard({
  icon,
  title,
  onClick,
}: Props) {
  return (
    <div
      onClick={onClick}
      style={{
        background: "#fff",
        borderRadius: 16,
        padding: 20,
        textAlign: "center",
        cursor: "pointer",
        boxShadow: "0 2px 10px rgba(0,0,0,0.08)",
        transition: "0.2s",
      }}
    >
      <div style={{ fontSize: 40 }}>{icon}</div>

      <h3>{title}</h3>
    </div>
  );
}