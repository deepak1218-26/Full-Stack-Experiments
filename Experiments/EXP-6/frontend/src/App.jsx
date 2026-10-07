import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [isAdding, setIsAdding] = useState(false);

  const pageSize = 5;
  const API_URL = 'http://localhost:8080/api/tasks';

  useEffect(() => {
    fetchTasks();
  }, [page]);

  const fetchTasks = async () => {
    try {
      setLoading(true);

      const response = await fetch(
        `${API_URL}?page=${page}&size=${pageSize}&sort=id,desc`
      );

      if (!response.ok) {
        throw new Error('Failed to fetch tasks');
      }

      const data = await response.json();

      setTasks(data.content);
      setTotalPages(data.totalPages);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddTask = async (e) => {
    e.preventDefault();

    if (!newTaskTitle.trim() || isAdding) {
      return;
    }

    try {
      setIsAdding(true);

      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          title: newTaskTitle.trim(),
          completed: false
        })
      });

      if (!response.ok) {
        throw new Error('Failed to add task');
      }

      await response.json();

      setNewTaskTitle('');

      if (page !== 0) {
        setPage(0);
      } else {
        fetchTasks();
      }
    } catch (error) {
      console.error('Error adding task:', error);
    } finally {
      setIsAdding(false);
    }
  };

  const handleToggleTask = async (id) => {
    try {
      const response = await fetch(`${API_URL}/${id}/toggle`, {
        method: 'PUT'
      });

      if (!response.ok) {
        throw new Error('Failed to update task');
      }

      const updatedTask = await response.json();

      setTasks((current) =>
        current.map((task) =>
          task.id === id ? updatedTask : task
        )
      );
    } catch (error) {
      console.error('Error toggling task:', error);
    }
  };

  const handleDeleteTask = async (id) => {
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE'
      });

      if (!response.ok) {
        throw new Error('Failed to delete task');
      }

      fetchTasks();
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  const completedCount = tasks.filter(
    (task) => task.completed
  ).length;

  const pendingCount = tasks.length - completedCount;

  const progress = tasks.length
    ? Math.round((completedCount / tasks.length) * 100)
    : 0;

  return (
    <div className="app-shell">

      <div className="ambient ambient-one"></div>
      <div className="ambient ambient-two"></div>
      <div className="grid-overlay"></div>

      <main className="dashboard">

        {/* TOP BAR */}

        <header className="topbar">

          <div className="brand">

            <div className="brand-mark">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v16H6.5A2.5 2.5 0 0 0 4 21.5v-16Z" />
                <path d="M4 5.5v16M8 7h8M8 11h8M8 15h5" />
              </svg>
            </div>

            <div>
              <div className="brand-name">
                TaskFlow
              </div>

              <div className="brand-caption">
                Student productivity workspace
              </div>
            </div>

          </div>

          <div className="experiment-badge">
            <span className="status-dot"></span>
            EXPERIMENT 06
          </div>

        </header>

        {/* HERO */}

        <section className="hero">

          <div>

            <p className="eyebrow">
              SCALABLE READ APIs
            </p>

            <h1>
              Student Task Manager
            </h1>

            <p className="hero-copy">
              Manage your tasks with a fast React interface
              backed by Spring Boot, pagination, caching and
              optimized database reads.
            </p>

          </div>

          <div className="hero-chip">

            <span className="chip-icon">
              ⚡
            </span>

            <div>
              <strong>
                API Online
              </strong>

              <small>
                H2 database connected
              </small>
            </div>

          </div>

        </section>

        {/* STATISTICS */}

        <section className="stats-grid">

          <div className="stat-card stat-primary">

            <div className="stat-icon">
              ✓
            </div>

            <div>
              <span className="stat-label">
                TOTAL TASKS
              </span>

              <strong>
                {tasks.length}
              </strong>
            </div>

          </div>

          <div className="stat-card stat-success">

            <div className="stat-icon">
              ✓
            </div>

            <div>
              <span className="stat-label">
                COMPLETED
              </span>

              <strong>
                {completedCount}
              </strong>
            </div>

          </div>

          <div className="stat-card stat-warning">

            <div className="stat-icon">
              ◷
            </div>

            <div>
              <span className="stat-label">
                PENDING
              </span>

              <strong>
                {pendingCount}
              </strong>
            </div>

          </div>

          <div className="stat-card stat-progress">

            <div
              className="progress-ring"
              style={{
                '--progress': `${progress * 3.6}deg`
              }}
            >
              <span>
                {progress}%
              </span>
            </div>

            <div>
              <span className="stat-label">
                PAGE PROGRESS
              </span>

              <strong>
                {progress === 100
                  ? 'All done'
                  : 'Keep going'}
              </strong>
            </div>

          </div>

        </section>

        {/* WORKSPACE */}

        <section className="workspace-card">

          <div className="section-heading">

            <div>

              <p className="section-kicker">
                YOUR WORKSPACE
              </p>

              <h2>
                Tasks
              </h2>

            </div>

            <button
              className="refresh-button"
              onClick={fetchTasks}
              disabled={loading}
              title="Refresh tasks"
            >

              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M20 11a8.1 8.1 0 0 0-15.5-2M4 5v4h4M4 13a8.1 8.1 0 0 0 15.5 2M20 19v-4h-4" />
              </svg>

              Refresh

            </button>

          </div>

          {/* ADD TASK */}

          <form
            onSubmit={handleAddTask}
            className="add-task-form"
          >

            <div className="input-shell">

              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M12 5v14M5 12h14" />
              </svg>

              <input
                type="text"
                placeholder="Add a new task..."
                value={newTaskTitle}
                onChange={(e) =>
                  setNewTaskTitle(e.target.value)
                }
                aria-label="New task title"
              />

            </div>

            <button
              type="submit"
              className="add-button"
              disabled={
                isAdding ||
                !newTaskTitle.trim()
              }
            >

              {isAdding
                ? 'Adding...'
                : 'Add task'}

              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>

            </button>

          </form>

          {/* LIST HEADER */}

          <div className="list-header">

            <span>
              {tasks.length
                ? `${tasks.length} tasks on this page`
                : 'No tasks yet'}
            </span>

            <span className="sort-label">
              Newest first · 5 per page
            </span>

          </div>

          {/* LOADING */}

          {loading ? (

            <div className="loading-state">

              <div className="spinner"></div>

              <strong>
                Loading your tasks
              </strong>

              <span>
                Fetching optimized data from the backend...
              </span>

            </div>

          ) : tasks.length === 0 ? (

            /* EMPTY */

            <div className="empty-state">

              <div className="empty-illustration">
                <span>✓</span>
              </div>

              <h3>
                Your workspace is clear
              </h3>

              <p>
                Add your first task above and start
                making progress.
              </p>

            </div>

          ) : (

            /* TASK LIST */

            <div className="task-list">

              {tasks.map((task) => (

                <article
                  key={task.id}
                  className={`task-item ${
                    task.completed
                      ? 'completed'
                      : ''
                  }`}
                >

                  <button
                    className={`check-button ${
                      task.completed
                        ? 'checked'
                        : ''
                    }`}
                    onClick={() =>
                      handleToggleTask(task.id)
                    }
                    aria-label={`Mark ${
                      task.title
                    } ${
                      task.completed
                        ? 'pending'
                        : 'complete'
                    }`}
                  >

                    {task.completed && (

                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="3"
                      >
                        <polyline points="20 6 9 17 4 12" />
                      </svg>

                    )}

                  </button>

                  <div className="task-details">

                    <div className="task-title-row">

                      <h3>
                        {task.title}
                      </h3>

                      <span
                        className={`task-status ${
                          task.completed
                            ? 'done'
                            : 'pending'
                        }`}
                      >
                        {task.completed
                          ? 'Completed'
                          : 'Pending'}
                      </span>

                    </div>

                    <span className="task-meta">
                      Task #{task.id} · Backend record
                    </span>

                  </div>

                  <button
                    className="delete-button"
                    onClick={() =>
                      handleDeleteTask(task.id)
                    }
                    title="Delete task"
                    aria-label="Delete task"
                  >

                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <polyline points="3 6 5 6 21 6" />
                      <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                      <line
                        x1="10"
                        y1="11"
                        x2="10"
                        y2="17"
                      />
                      <line
                        x1="14"
                        y1="11"
                        x2="14"
                        y2="17"
                      />
                    </svg>

                  </button>

                </article>

              ))}

            </div>

          )}

          {/* PAGINATION */}

          {totalPages > 1 && !loading && (

            <div className="pagination">

              <button
                onClick={() =>
                  setPage(page - 1)
                }
                disabled={page === 0}
                className="page-button"
              >

                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="m15 18-6-6 6-6" />
                </svg>

                Previous

              </button>

              <div className="page-counter">

                <strong>
                  {page + 1}
                </strong>

                <span>
                  of
                </span>

                <span>
                  {totalPages}
                </span>

              </div>

              <button
                onClick={() =>
                  setPage(page + 1)
                }
                disabled={
                  page >= totalPages - 1
                }
                className="page-button"
              >

                Next

                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="m9 18 6-6-6-6" />
                </svg>

              </button>

            </div>

          )}

        </section>

        {/* FOOTER */}

        <footer className="footer">

          <span>
            React + Spring Boot
          </span>

          <span className="footer-separator">
            •
          </span>

          <span>
            Pagination
          </span>

          <span className="footer-separator">
            •
          </span>

          <span>
            Caching & optimized reads
          </span>

        </footer>

      </main>

    </div>
  );
}

export default App;