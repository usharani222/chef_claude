from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.db.database import get_db
from app.db.models import Recipe
from app.schemas.recipe import RecipeCreate, RecipeResponse as RecipeOut
from app.auth.dependencies import get_current_user
from app.db.models import User
from app.services.ai_service import generate_recipe

router = APIRouter(tags=["Recipes"])

@router.post("/", response_model=RecipeOut)
def create_recipe(
    recipe: RecipeCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    instructions = generate_recipe(recipe.ingredients)

    new_recipe = Recipe(
        title=instructions["title"],
        ingredients=recipe.ingredients,
        instructions=instructions["instructions"],
        user_id=current_user.id
    )

    db.add(new_recipe)
    db.commit()
    db.refresh(new_recipe)
    return new_recipe


@router.get("/", response_model=list[RecipeOut])
def get_my_recipes(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    return db.query(Recipe).filter(
        Recipe.user_id == current_user.id
    ).all()


@router.delete("/{recipe_id}")
def delete_recipe(
    recipe_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    recipe = db.query(Recipe).filter(
        Recipe.id == recipe_id,
        Recipe.user_id == current_user.id
    ).first()

    if not recipe:
        raise HTTPException(status_code=404, detail="Recipe not found")

    db.delete(recipe)
    db.commit()
    return {"message": "Recipe deleted"}
