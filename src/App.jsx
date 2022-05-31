import { useEffect, useRef, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'

import { TodoList } from './components'

export function App() {
  const [todos, setTodos] = useState(
    () => JSON.parse(window.localStorage.getItem('todos')) || []
  )
  const todoTaskRef = useRef()

  useEffect(() => {
    window.localStorage.setItem('todos', JSON.stringify(todos))
  }, [todos])

  const toggleTodo = (id) => {
    const newTodos = [...todos]
    const todo = newTodos.find((todo) => todo.id === id)

    todo.completed = !todo.completed
    setTodos(newTodos)
  }

  const handleTodoAdd = () => {
    const task = todoTaskRef.current.value

    if (task === '') return
    setTodos((prevTodos) => {
      return [...prevTodos, { id: uuidv4(), task, completed: false }]
    })

    todoTaskRef.current.value = ''
  }

  const handleClearAllTodos = () => {
    const newTodos = todos.filter((todo) => !todo.completed)

    setTodos(newTodos)
  }

  return (
    <>
      <span style={{ backgroundColor: 'gold' }}>
        You have {todos.filter((todo) => !todo.completed).length} tasks left to
        finish.
      </span>
      <TodoList todos={todos} toggleTodo={toggleTodo} />
      <input ref={todoTaskRef} placeholder='new homework' type='text' />
      <button type='button' onClick={handleTodoAdd}>
        ➕
      </button>
      <button type='reset' onClick={handleClearAllTodos}>
        🗑️
      </button>
    </>
  )
}
