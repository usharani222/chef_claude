import { useState } from "react";

const API = process.env.REACT_APP_API_URL;

export default function RecipeGenerator({ onGenerated }) {
  const [input, setInput] = useState("");
  const [ingredients, setIngredients] = useState([]);
  const [loading, setLoading] = useState(false);

  const addIngredient = () => {
    if (!input.trim()) return;
    setIngredients([...ingredients, input.trim()]);
    setInput("");
  };

  const removeIngredient = (i) => {
    setIngredients(ingredients.filter((_, idx) => idx !== i));
  };

  const generate = async () => {
    if (ingredients.length < 3) {
      alert("Add at least 3 ingredients");
      return;
    }

    setLoading(true);

    const res = await fetch(`${API}/recipes/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({
        title: "AI Generated Recipe",
        ingredients: ingredients.join(", "),
      }),
    });

    const data = await res.json();
    setLoading(false);
    setIngredients([]);
    onGenerated(data);
  };

  return (
    <div className="card">
      <input
        placeholder="Add ingredient"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button onClick={addIngredient}>Add</button>

      <div className="chips">
        {ingredients.map((ing, i) => (
          <span key={i} className="chip">
            {ing} <b onClick={() => removeIngredient(i)}>×</b>
          </span>
        ))}
      </div>

      <button disabled={loading} onClick={generate}>
        {loading ? "Generating..." : "Generate Recipe"}
      </button>
    </div>
  );
}
