import React, { useRef } from "react"
import IngredientsList from "../Components/IngredientsList"
import ClaudeRecipe from "../Components/ClaudeRecipe"
import { getRecipeFromMistral } from "../ai";

export default function Main() {
    const [ingredients, setIngredients] = React.useState(
        []
    )
    const [recipe, setRecipe] = React.useState("")
    const recipeSection=React.useRef(null)

    React.useEffect(() => {
        if (recipe !== "" && recipeSection.current !== null) {
            recipeSection.current.scrollIntoView()
        }
    }, [recipe])

    async function getRecipe() {
        try {
          const recipeMarkdown = await getRecipeFromMistral(ingredients);
          setRecipe(recipeMarkdown);
        } catch (error) {
          console.error("Failed to fetch recipe:", error);
        }
      }

    function addIngredient(e) {
        e.preventDefault()
        const formData = new FormData(e.target);
        const newIngredient = formData.get("ingredient")
        setIngredients(prevIngredients => [...prevIngredients, newIngredient])
        e.target.reset()
    }

    return (
        <main>
            <form onSubmit={addIngredient} className="add-ingredient-form">
                <input
                    type="text"
                    placeholder="e.g. oregano"
                    aria-label="Add ingredient"
                    name="ingredient"
                />
                <button type="submit" >Add ingredient</button>
            </form>

            {ingredients.length > 0 &&
                <IngredientsList
                    recieperef={recipeSection}
                    ingredients={ingredients}
                    getRecipe={getRecipe}
                />
            }

            {recipe && <ClaudeRecipe recipe={recipe} />}
        </main>
    )
}