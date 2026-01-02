export default function IngredientChips({ ingredients, remove }) {
  return (
    <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
      {ingredients.map((ing, i) => (
        <div key={i} style={chip}>
          {ing}
          <span onClick={() => remove(i)} style={x}>×</span>
        </div>
      ))}
    </div>
  );
}

const chip = {
  background: "#f2f2f2",
  padding: "6px 12px",
  borderRadius: "999px",
  display: "flex",
  gap: "8px",
  alignItems: "center",
};

const x = {
  cursor: "pointer",
  fontWeight: "bold",
};
