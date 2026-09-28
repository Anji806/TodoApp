import React, { useState } from 'react'

export default function TodoForm({ onAdd }) {
  const [title, setTitle] = useState('')

  function submit(e) {
    e.preventDefault()
    if (!title.trim()) return
    onAdd(title.trim())
    setTitle('')
  }

  return (
    <form onSubmit={submit} className="form-row">
      <input
        type="text"
        placeholder="Add a todo..."
        value={title}
        onChange={e => setTitle(e.target.value)}
      />
      <button type="submit" className="btn-primary">Add</button>
    </form>
  )
}
