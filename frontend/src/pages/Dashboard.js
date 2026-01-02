import { useState } from "react";
import RecipeGenerator from "../components/RecipeGenerator";
import RecipeList from "../components/RecipeList";

export default function Dashboard() {
  const [activeRecipe, setActiveRecipe] = useState(null);

  return (
    <div className="container">
      <RecipeGenerator onGenerated={setActiveRecipe} />

      {activeRecipe && (
        <div className="card main-recipe">
          <h2>{activeRecipe.title}</h2>
          <p className="ingredients">
            <b>Ingredients:</b> {activeRecipe.ingredients}
          </p>
          <pre className="instructions">{activeRecipe.instructions}</pre>
        </div>
      )}

      <RecipeList
        activeRecipe={activeRecipe}
        setActiveRecipe={setActiveRecipe}
      />
    </div>
  );
}
