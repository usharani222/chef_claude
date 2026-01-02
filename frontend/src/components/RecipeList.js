import { useEffect, useState } from "react";
const API = "http://localhost:8000";

export default function RecipeList({ activeRecipe, setActiveRecipe }) {
  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState("");
  const [sortOrder, setSortOrder] = useState("latest"); // latest | oldest

  const fetchRecipes = async () => {
    const res = await fetch(`${API}/recipes/`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    const data = await res.json();
    setRecipes(Array.isArray(data) ? data : []);
  };

  useEffect(() => {
    fetchRecipes();
  }, []);

  const toggleRecipe = (recipe) => {
    if (activeRecipe?.id === recipe.id) {
      setActiveRecipe(null);
    } else {
      setActiveRecipe(recipe);
    }
  };

  const remove = async (id) => {
    await fetch(`${API}/recipes/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    if (activeRecipe?.id === id) setActiveRecipe(null);
    fetchRecipes();
  };

  const regenerate = async (id) => {
    const res = await fetch(`${API}/recipes/${id}/regenerate`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    const data = await res.json();
    setActiveRecipe(data);
    fetchRecipes();
  };

  // 🔍 SEARCH
  const filtered = recipes.filter((r) =>
    `${r.title} ${r.ingredients}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  // 🔁 SORT
  const sorted = [...filtered].sort((a, b) =>
    sortOrder === "latest" ? b.id - a.id : a.id - b.id
  );

  return (
    <>
      {/* SEARCH + SORT BAR */}
      <div className="search-row">
        <input
          className="search"
          placeholder="Search recipes..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <button
          className="sort-btn"
          onClick={() =>
            setSortOrder(sortOrder === "latest" ? "oldest" : "latest")
          }
        >
          {sortOrder === "latest" ? "Latest" : "Oldest"}
        </button>
      </div>

      {/* CARDS */}
      <div className="grid">
        {sorted.map((r) => (
          <div
            key={r.id}
            className={`card recipe-card ${
              activeRecipe?.id === r.id ? "selected" : ""
            }`}
            onClick={() => toggleRecipe(r)}
          >
            <h4>{r.title}</h4>

            <div className="actions">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  regenerate(r.id);
                }}
              >
                Again
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  remove(r.id);
                }}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
