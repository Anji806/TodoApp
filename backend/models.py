from pydantic import BaseModel, Field
from typing import Optional


class TodoBase(BaseModel):
    title: str = Field(..., min_length=1)
    completed: bool = False


class TodoCreate(BaseModel):
    title: str = Field(..., min_length=1)


class TodoUpdate(BaseModel):
    title: Optional[str] = None
    completed: Optional[bool] = None


class Todo(TodoBase):
    id: int

    class Config:
        orm_mode = True
