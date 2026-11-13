import { useEffect, useState } from 'react'
import './App.css'

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5050'
const API = `${API_BASE.replace(/\/$/, '')}/api/task`

async function readResponse(response) {
  const data = await response.json()

  if (!response.ok) {
    throw new Error(data.message || `Request failed (${response.status})`)
  }

  return data
}

async function fetchTasks() {
  const response = await fetch(API)
  return readResponse(response)
}

function getErrorMessage(error) {
  return error instanceof Error ? error.message : 'Something went wrong. Please try again.'
}

function App() {
  const [tasks, setTasks] = useState([])
  const [title, setTitle] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [isMutating, setIsMutating] = useState(false)
  const [error, setError] = useState('')

  const loadTasks = async () => {
    try {
      setTasks(await fetchTasks())
      setError('')
    } catch (requestError) {
      setError(getErrorMessage(requestError))
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    let isCurrent = true

    fetchTasks()
      .then((data) => {
        if (isCurrent) {
          setTasks(data)
          setError('')
        }
      })
      .catch((requestError) => {
        if (isCurrent) setError(getErrorMessage(requestError))
      })
      .finally(() => {
        if (isCurrent) setIsLoading(false)
      })

    return () => {
      isCurrent = false
    }
  }, [])

  const addTask = async (event) => {
    event.preventDefault()
    const trimmedTitle = title.trim()

    if (!trimmedTitle || isMutating) return

    setError('')
    setIsMutating(true)

    try {
      const response = await fetch(API, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: trimmedTitle }),
      })

      await readResponse(response)
      setTitle('')
      await loadTasks()
    } catch (requestError) {
      setError(getErrorMessage(requestError))
    } finally {
      setIsMutating(false)
    }
  }

  const toggleTask = async (task) => {
    if (isMutating) return

    setError('')
    setIsMutating(true)

    try {
      const response = await fetch(`${API}/${task.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ completed: !task.completed }),
      })
      const updatedTask = await readResponse(response)

      setTasks((currentTasks) => currentTasks.map((currentTask) => (
        currentTask.id === updatedTask.id ? updatedTask : currentTask
      )))
    } catch (requestError) {
      setError(getErrorMessage(requestError))
    } finally {
      setIsMutating(false)
    }
  }

  const deleteTask = async (id) => {
    if (isMutating) return

    setError('')
    setIsMutating(true)

    try {
      const response = await fetch(`${API}/${id}`, { method: 'DELETE' })
      await readResponse(response)
      setTasks((currentTasks) => currentTasks.filter((task) => task.id !== id))
    } catch (requestError) {
      setError(getErrorMessage(requestError))
    } finally {
      setIsMutating(false)
    }
  }

  const completedCount = tasks.filter((task) => task.completed).length

  return (
    <main className="app-shell">
      <section className="task-card" aria-labelledby="page-title">
        <header className="task-header">
          <div>
            <p className="eyebrow">Stay on top of your day</p>
            <h1 id="page-title">Task Management</h1>
          </div>
          <span className="task-count" aria-live="polite">
            {completedCount} of {tasks.length} complete
          </span>
        </header>

        <form className="task-form" onSubmit={addTask}>
          <input
            type="text"
            placeholder="What needs to get done?"
            aria-label="New task title"
            maxLength={120}
            value={title}
            onChange={(event) => setTitle(event.target.value)}
          />
          <button type="submit" disabled={!title.trim() || isMutating}>
            Add Task
          </button>
        </form>

        {error && <p className="error-banner" role="alert">{error}</p>}

        <h2 className="list-heading">My Tasks</h2>

        {isLoading ? (
          <p className="status-text" role="status">Loading tasks...</p>
        ) : tasks.length === 0 ? (
          <div className="empty-state">
            <p>No tasks yet</p>
            <span>Add a task above to get started.</span>
          </div>
        ) : (
          <ul className="task-list">
            {tasks.map((task) => (
              <li
                className={`task-item${task.completed ? ' is-completed' : ''}`}
                key={task.id}
              >
                <label className="task-details">
                  <input
                    className="completion-checkbox"
                    type="checkbox"
                    checked={task.completed}
                    disabled={isMutating}
                    onChange={() => toggleTask(task)}
                    aria-label={`${task.completed ? 'Mark incomplete' : 'Mark complete'}: ${task.title}`}
                  />
                  <span>{task.title}</span>
                </label>
                <button
                  className="delete-button"
                  type="button"
                  disabled={isMutating}
                  onClick={() => deleteTask(task.id)}
                  aria-label={`Delete ${task.title}`}
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        )}
      </section>
    </main>
  )
}

export default App
