from pydantic import BaseModel
from typing import Optional

class RecipeCreate(BaseModel):
    title: Optional[str] = None
    ingredients: str

class RecipeResponse(RecipeCreate):
    id: int
    title: str
    ingredients: str
    instructions: str
    user_id: int

    class Config:
        from_attributes = True
