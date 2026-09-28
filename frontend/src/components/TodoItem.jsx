import React, { useState } from 'react'

export default function TodoItem({ todo, onToggle, onDelete, onEdit }) {
  const [editing, setEditing] = useState(false)
  const [title, setTitle] = useState(todo.title)

  function save() {
    if (!title.trim()) return
    onEdit(title.trim())
    setEditing(false)
  }

  return (
    <div className="todo-item">
      <div className="todo-left">
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={onToggle}
        />
        {editing ? (
          <input
            className="edit-input"
            value={title}
            onChange={e => setTitle(e.target.value)}
          />
        ) : (
          <div className={`todo-title ${todo.completed ? 'completed' : ''}`}>
            {todo.title}
          </div>
        )}
      </div>

      <div>
        {editing ? (
          <>
            <button className="small btn-primary" onClick={save}>
              Save
            </button>
            <button className="small btn-ghost" onClick={() => { setEditing(false); setTitle(todo.title); }}>
              Cancel
            </button>
          </>
        ) : (
          <>
            <button className="small btn-ghost" onClick={() => setEditing(true)}>
              Edit
            </button>
            <button className="small danger" onClick={() => onDelete(todo.id)}>
              Delete
            </button>
          </>
        )}
      </div>
    </div>
  )
}
