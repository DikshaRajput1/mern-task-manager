
import { useState } from 'react'
import './App.css'

function App() {
  const [tasks, setTasks] = useState([])
  const [taskInput, setTaskInput] = useState('')

  const addTask = (e) => {
    e.preventDefault()

    if (taskInput.trim() === '') return

    const newTask = {
      id: Date.now(),
      title: taskInput,
      completed: false
    }

    setTasks([...tasks, newTask])
    setTaskInput('')
  }

  const toggleTask = (id) => {
    setTasks(tasks.map(task =>
        task.id === id
            ? { ...task, completed: !task.completed }
            : task
    ))
  }

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id))
  }

  return (
      <div className="app">
        <header className="header">
          <h1>Task Manager</h1>
          <p>Organize your day and achieve your goals.</p>
        </header>

        <main className="container">
          <h2>My Tasks</h2>

          <form onSubmit={addTask} className="task-form">
            <input
                type="text"
                placeholder="Enter your task..."
                value={taskInput}
                onChange={(e) => setTaskInput(e.target.value)}
            />

            <button type="submit">Add Task</button>
          </form>

          <div className="task-list">
            {tasks.length === 0 ? (
                <p className="empty">No tasks yet. Add your first task!</p>
            ) : (
                tasks.map(task => (
                    <div className="task-item" key={task.id}>
                <span
                    onClick={() => toggleTask(task.id)}
                    className={task.completed ? 'completed' : ''}
                >
                  {task.completed ? '✓' : '○'} {task.title}
                </span>

                      <button onClick={() => deleteTask(task.id)}>
                        Delete
                      </button>
                    </div>
                ))
            )}
          </div>

          <p className="total">
            Total Tasks: {tasks.length}
          </p>
        </main>
      </div>
  )
}

export default App
