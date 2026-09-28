import React, { useEffect, useState } from 'react'
import TodoForm from './components/TodoForm'
import TodoList from './components/TodoList'

const API = 'http://localhost:8000'

export default function App() {
  const [todos, setTodos] = useState([])
  const [filter, setFilter] = useState('all')

  useEffect(() => {
    fetchTodos()
  }, [])

  async function fetchTodos() {
    const res = await fetch(`${API}/todos`)
    const data = await res.json()
    setTodos(data)
  }

  async function addTodo(title) {
    const res = await fetch(`${API}/todos`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title }),
    })
    const newTodo = await res.json()
    setTodos(prev => [...prev, newTodo])
  }

  async function updateTodo(id, updates) {
    const res = await fetch(`${API}/todos/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updates),
    })
    const updated = await res.json()
    setTodos(prev => prev.map(t => (t.id === id ? updated : t)))
  }

  async function deleteTodo(id) {
    await fetch(`${API}/todos/${id}`, { method: 'DELETE' })
    setTodos(prev => prev.filter(t => t.id !== id))
  }

  const filtered = todos.filter(t => {
    if (filter === 'active') return !t.completed
    if (filter === 'completed') return t.completed
    return true
  })

  return (
    <div className="container">
      <h1>MyTodos</h1>
      <div className="sub">Simple TODO Example</div>
      <TodoForm onAdd={addTodo} />
      <TodoList
        todos={filtered}
        onToggle={t => updateTodo(t.id, { completed: !t.completed })}
        onDelete={deleteTodo}
        onEdit={(id, title) => updateTodo(id, { title })}
      />

      <div className="filters">
        <button className={`small btn-ghost ${filter==='all' ? 'muted' : ''}`} onClick={() => setFilter('all')}>
          All
        </button>
        <button className={`small btn-ghost ${filter==='active' ? 'muted' : ''}`} onClick={() => setFilter('active')}>
          Active
        </button>
        <button className={`small btn-ghost ${filter==='completed' ? 'muted' : ''}`} onClick={() => setFilter('completed')}>
          Completed
        </button>
      </div>
    </div>
  )
}
