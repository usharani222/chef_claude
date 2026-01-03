from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.db.init_db import init_db

app = FastAPI()
init_db()
# ✅ CORS MUST BE ADDED IMMEDIATELY AFTER app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "https://chefclaude-lilac.vercel.app/"
    ],
    allow_credentials=True,
    allow_methods=["*"],                      # POST, GET, OPTIONS
    allow_headers=["*"],                      # Authorization, Content-Type
)

# import routers AFTER middleware
from app.routes import auth, recipes, users

app.include_router(auth.router, prefix="/auth", tags=["Auth"])
app.include_router(recipes.router, prefix="/recipes", tags=["Recipes"])
app.include_router(users.router, prefix="/users", tags=["Users"])
