from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.schemas.user import UserCreate, UserResponse
from app.db import models
from app.db.database import get_db
# from app.auth.password import hash_password

router = APIRouter(prefix="/users", tags=["Users"])

@router.get("/", response_model=list[UserResponse])
def list_users(db: Session = Depends(get_db)):
    return db.query(models.User).all()

@router.get("/{id}", response_model=UserResponse)
def get_user_by_id(id: int, db: Session = Depends(get_db)):
    user = db.query(models.User).filter(models.User.id == id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return user

# @router.post("/register", response_model=UserResponse)
# def add_user(user: UserCreate, db: Session = Depends(get_db)):
#     existing = db.query(models.User).filter(models.User.email == user.email).first()
#     if existing:
#         raise HTTPException(status_code=400, detail="Email already registered")

#     db_user = models.User(
#         username=user.username,
#         email=user.email,
#         password_hash=user.password 
#     )

#     db.add(db_user)
#     db.commit()
#     db.refresh(db_user)
#     return db_user

@router.delete("/{id}")
def delete_user_by_id(id: int, db: Session = Depends(get_db)):
    user = db.query(models.User).filter(models.User.id == id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    db.delete(user)
    db.commit()
    return {"message": "User deleted successfully"}
