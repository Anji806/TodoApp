# MyTodos

A simple full-stack Todo application to learn how a React frontend communicates with a Python FastAPI backend.

Overview

- Frontend: React (Vite), JavaScript, plain CSS
- Backend: FastAPI, Python, in-memory storage (list)

Architecture

React frontend (http://localhost:5173) uses fetch() to call FastAPI backend (http://localhost:8000).

Project structure

mytodos/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── TodoForm.jsx
│   │   │   ├── TodoItem.jsx
│   │   │   └── TodoList.jsx
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── package.json
│   └── vite.config.js
│
├── backend/
│   ├── main.py
│   ├── models.py
│   └── requirements.txt
│
├── README.md
└── .gitignore

Where todo data is stored

- Todos are stored in an in-memory Python list inside the FastAPI application. No database is used.
- Data is temporary and will be lost when the backend restarts.

How the frontend communicates with the backend

- The frontend uses the browser fetch() API to call REST endpoints exposed by FastAPI:
  - GET /todos
  - POST /todos
  - PUT /todos/{todo_id}
  - DELETE /todos/{todo_id}

Setup

Prerequisites

- Node.js and npm
- Python 3.8+

Backend

1. Create a virtual environment:

   python -m venv .venv
   source .venv/bin/activate   # macOS/Linux
   .venv\Scripts\activate    # Windows

2. Install dependencies:

   pip install -r backend/requirements.txt

3. Run the backend:

   uvicorn backend.main:app --reload --port 8000

Frontend

1. Change to the frontend directory and install dependencies:

   cd frontend
   npm install

2. Run the dev server:

   npm run dev

API Endpoints

- GET /todos
  - Response: list of todos

- POST /todos
  - Body: { "title": "Do something" }
  - Response: created todo

- PUT /todos/{todo_id}
  - Body: { "title": "...", "completed": true }
  - Response: updated todo

- DELETE /todos/{todo_id}
  - Response: { "detail": "Todo deleted" }

Notes

- Titles cannot be empty (validated by Pydantic on the backend).
- This project intentionally uses in-memory storage to keep it simple for learning purposes.
