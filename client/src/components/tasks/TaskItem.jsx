import { useState } from 'react';
import { useTask } from '../../context/TaskContext';
import { FaTrash, FaEdit, FaCheck } from 'react-icons/fa';
import './Tasks.css';

const TaskItem = ({ task }) => {
  const { toggleTaskComplete, deleteTask, updateTask } = useTask();
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    title: task.title,
    description: task.description || '',
    dueDate: task.dueDate ? new Date(task.dueDate).toISOString().split('T')[0] : ''
  });

  const handleToggleComplete = (e) => {
    // Prevent the default behavior to avoid double events
    if (e) e.preventDefault();
    toggleTaskComplete(task._id);
  };

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      deleteTask(task._id);
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditData({
      ...editData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await updateTask(task._id, editData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditData({
      title: task.title,
      description: task.description || '',
      dueDate: task.dueDate ? new Date(task.dueDate).toISOString().split('T')[0] : ''
    });
  };

  // Format date to display
  const formatDate = (dateString) => {
    if (!dateString) return 'No due date';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  if (isEditing) {
    return (
      <li className="task-item editing">
        <form onSubmit={handleSubmit} className="task-edit-form">
          <div className="form-group">
            <label htmlFor="title">
              Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={editData.title}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="description">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={editData.description}
              onChange={handleChange}
              rows="3"
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="dueDate">
              Due Date
            </label>
            <input
              type="date"
              id="dueDate"
              name="dueDate"
              value={editData.dueDate}
              onChange={handleChange}
            />
          </div>
          
          <div className="task-edit-actions">
            <button 
              type="button" 
              onClick={handleCancel}
              className="cancel-button"
            >
              Cancel
            </button>
            <button 
              type="submit"
              className="save-button"
            >
              Save
            </button>
          </div>
        </form>
      </li>
    );
  }

  return (
    <li className={`task-item ${task.completed ? 'completed' : ''}`}>
      <div className="task-checkbox">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => handleToggleComplete()}
          id={`task-${task._id}`}
          className="visually-hidden"
        />
        <label htmlFor={`task-${task._id}`}>
          <FaCheck className="check-icon" />
        </label>
      </div>
      
      <div className="task-content">
        <h3 className="task-title">
          {task.title}
        </h3>
        
        {task.description && (
          <p className={`task-description ${task.completed ? 'text-gray-400' : 'text-gray-500'}`}>
            {task.description}
          </p>
        )}
        
        <div className="task-meta">
          {task.dueDate && (
            <span className="task-due-date">
              <span className="mr-1.5">📅</span>
              Due: {formatDate(task.dueDate)}
            </span>
          )}
          <span className="task-created-date">
            <span className="mr-1.5">🕒</span>
            Created: {formatDate(task.createdAt)}
          </span>
        </div>
      </div>
      
      <div className="task-actions">
        <button
          onClick={handleEdit}
          className="task-action edit"
        >
          <FaEdit />
        </button>
        <button
          onClick={handleDelete}
          className="task-action delete"
        >
          <FaTrash />
        </button>
      </div>
    </li>
  );
};

export default TaskItem;
