import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useTask } from '../../context/TaskContext';
import TaskList from '../tasks/TaskList';
import TaskForm from '../tasks/TaskForm';
import './Dashboard.css';

const Dashboard = () => {
  const { currentUser } = useAuth();
  const { tasks, fetchTasks, loading, error } = useTask();
  const [showTaskForm, setShowTaskForm] = useState(false);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]); // Now it's safe to include fetchTasks since it's memoized with useCallback

  const toggleTaskForm = () => {
    setShowTaskForm(!showTaskForm);
  };

  const handleTaskCreated = () => {
    setShowTaskForm(false);
    fetchTasks();
  };

  if (loading && tasks.length === 0) {
    return (
      <div className="dashboard-loading">
        <div className="dashboard-spinner"></div>
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      <div className="dashboard-card">
        <div className="dashboard-header">
          <div className="dashboard-welcome">
            <h1 className="dashboard-title">
              Welcome, {currentUser?.username || 'User'}!
            </h1>
          </div>
          <button
            onClick={toggleTaskForm}
            className="add-task-button"
          >
            {showTaskForm ? 'Hide Form' : 'Add New Task'}
          </button>
        </div>

        {error && (
          <div className="dashboard-error">
            <p>{error}</p>
          </div>
        )}

        {showTaskForm && (
          <div className="task-form-container">
            <TaskForm onComplete={handleTaskCreated} />
          </div>
        )}

        <div className="dashboard-content">
          {tasks.length > 0 ? (
            <TaskList tasks={tasks} />
          ) : (
            <div className="dashboard-empty">
              <svg
                className="dashboard-empty-icon"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                />
              </svg>
              <h3 className="dashboard-empty-title">No tasks yet</h3>
              <p className="dashboard-empty-text">
                Get started by creating a new task.
              </p>
              <div className="dashboard-section">
                <button
                  type="button"
                  onClick={toggleTaskForm}
                  className="add-task-button"
                >
                  <svg
                    className="-ml-1 mr-2 h-5 w-5"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                  New Task
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
