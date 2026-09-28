import React from 'react'
import TodoItem from './TodoItem'

export default function TodoList({ todos, onToggle, onDelete, onEdit }) {
  if (todos.length === 0) return <p>No todos yet.</p>

  return (
    <div style={{ marginTop: 12 }}>
      {todos.map(todo => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggle={() => onToggle(todo)}
          onDelete={() => onDelete(todo.id)}
          onEdit={(title) => onEdit(todo.id, title)}
        />
      ))}
    </div>
  )
}
