import { useState } from 'react';
import TaskItem from './TaskItem';
import './Tasks.css';

const TaskList = ({ tasks }) => {
  const [filter, setFilter] = useState('all'); // all, active, completed

  // Filter tasks based on the selected filter
  const filteredTasks = tasks.filter(task => {
    if (filter === 'active') return !task.completed;
    if (filter === 'completed') return task.completed;
    return true; // 'all' filter
  });

  // Sort tasks by creation date (newest first)
  const sortedTasks = [...filteredTasks].sort((a, b) => 
    new Date(b.createdAt) - new Date(a.createdAt)
  );

  return (
    <div className="task-list-container">
      <div className="task-list-header">
        <h2>Your Tasks</h2>
        <div className="task-filters">
          <button 
            className={`filter-button ${filter === 'all' ? 'active' : ''}`}
            onClick={() => setFilter('all')}
          >
            All
          </button>
          <button 
            className={`filter-button ${filter === 'active' ? 'active' : ''}`}
            onClick={() => setFilter('active')}
          >
            Active
          </button>
          <button 
            className={`filter-button ${filter === 'completed' ? 'active' : ''}`}
            onClick={() => setFilter('completed')}
          >
            Completed
          </button>
        </div>
      </div>

      {sortedTasks.length === 0 ? (
        <div className="empty-task-list">
          <svg 
            className="task-empty-icon" 
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
          <h3 className="task-empty-title">No tasks</h3>
          <p className="task-empty-text">
            {filter === 'all' 
              ? "You don't have any tasks yet. Create one to get started!" 
              : filter === 'active' 
                ? "You don't have any active tasks." 
                : "You don't have any completed tasks."}
          </p>
        </div>
      ) : (
        <ul className="task-list">
          {sortedTasks.map(task => (
            <TaskItem key={task._id} task={task} />
          ))}
        </ul>
      )}
    </div>
  );
};

export default TaskList;
