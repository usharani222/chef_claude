export default function RecipeCard({ recipe }) {
  return (
    <div className="card">
      <h4>{recipe.title}</h4>
      <p>{recipe.ingredients}</p>

      <button onClick={() => open(recipe)}>Open</button>
      <button onClick={() => del(recipe.id)}>Delete</button>
    </div>
  );
}
