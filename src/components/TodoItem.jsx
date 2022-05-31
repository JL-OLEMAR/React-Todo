export function TodoItem({ todo, toggleTodo }) {
  const { id, completed, task } = todo

  const handleTodoChange = () => {
    toggleTodo(id)
  }

  return (
    <li>
      <input checked={completed} type='checkbox' onChange={handleTodoChange} />
      {task}
    </li>
  )
}
