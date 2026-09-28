from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from typing import List

from backend.models import Todo, TodoCreate, TodoUpdate

app = FastAPI(title="MyTodos API")

origins = [
    "http://localhost:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# In-memory list to store todos
todos: List[Todo] = []
next_id = 1


@app.get("/todos", response_model=List[Todo])
def get_todos():
    return todos


@app.post("/todos", response_model=Todo)
def create_todo(todo: TodoCreate):
    global next_id
    new_todo = Todo(id=next_id, title=todo.title, completed=False)
    todos.append(new_todo)
    next_id += 1
    return new_todo


@app.put("/todos/{todo_id}", response_model=Todo)
def update_todo(todo_id: int, todo: TodoUpdate):
    for idx, t in enumerate(todos):
        if t.id == todo_id:
            updated = t.copy()
            if todo.title is not None:
                if todo.title.strip() == "":
                    raise HTTPException(status_code=400, detail="Title cannot be empty")
                updated.title = todo.title
            if todo.completed is not None:
                updated.completed = todo.completed
            todos[idx] = updated
            return updated
    raise HTTPException(status_code=404, detail="Todo not found")


@app.delete("/todos/{todo_id}")
def delete_todo(todo_id: int):
    for idx, t in enumerate(todos):
        if t.id == todo_id:
            todos.pop(idx)
            return {"detail": "Todo deleted"}
    raise HTTPException(status_code=404, detail="Todo not found")
