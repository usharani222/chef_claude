from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.db.init_db import init_db

app = FastAPI()

# ✅ CORS FIRST
app.add_middleware(
    CORSMiddleware,
    allow_origins=["https://chefclaude-lilac.vercel.app"],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ✅ DB init AFTER app is ready
@app.on_event("startup")
def on_startup():
    init_db()

from app.routes import auth, recipes, users

app.include_router(auth.router, prefix="/auth", tags=["Auth"])
app.include_router(recipes.router, prefix="/recipes", tags=["Recipes"])
app.include_router(users.router, prefix="/users", tags=["Users"])
