import React from "react";

export default function IngredientsList({recieperef, ingredients, getRecipe}) {
  const ingredientsListItems = ingredients.map(ingredient => (
    <li key={ingredient}>{ingredient}</li>
  ));
  
  return (
    <section>
      <h2>Ingredients on hand:</h2>
      <ul className="ingredients-list" aria-live="polite">{ingredientsListItems}</ul>
      {ingredientsListItems.length > 3 && (
        <div className="get-recipe-container">
          <div ref={recieperef}>
            <h3>Ready for a recipe?</h3>
            <p>Generate a recipe from your list of ingredients.</p>
          </div>
          <button onClick={getRecipe}>Get a recipe</button>
        </div>
      )}
    </section>
  );
}
