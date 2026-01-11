export default function MoodFilter({ setSelectedMood }) {
  const moods = ["HAPPY", "SAD", "SCARED", "EXCITED", "RELAXED"];

  return (
    <div style={{ display: "flex", gap: "10px", margin: "20px 0" }}>
      {moods.map((mood) => (
        <button
          key={mood}
          onClick={() => setSelectedMood(mood)} // ✅ this is crucial
          style={{
            padding: "10px 20px",
            cursor: "pointer",
            backgroundColor: "#007bff",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
          }}
        >
          {mood}
        </button>
      ))}
    </div>
  );
}
