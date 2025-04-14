import { useState } from 'react';
import { useTask } from '../../context/TaskContext';
import './Tasks.css';

const TaskForm = ({ onComplete }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    dueDate: ''
  });
  const [formError, setFormError] = useState('');
  const { createTask, loading } = useTask();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError('');
    
    if (!formData.title.trim()) {
      setFormError('Title is required');
      return;
    }
    
    try {
      await createTask({
        title: formData.title.trim(),
        description: formData.description.trim(),
        dueDate: formData.dueDate || null
      });
      
      // Reset form and notify parent component
      setFormData({
        title: '',
        description: '',
        dueDate: ''
      });
      
      if (onComplete) {
        onComplete();
      }
    } catch (error) {
      setFormError(error.message || 'Failed to create task');
    }
  };

  return (
    <div className="task-form">
      <h2 className="text-lg font-medium text-gray-900 mb-5">Create New Task</h2>
      
      {formError && (
        <div className="form-error bg-red-50 border-l-4 border-red-400 p-4 mb-6">
          <div className="flex">
            <div className="ml-3">
              <p className="text-sm text-red-700">{formError}</p>
            </div>
          </div>
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="form-group">
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">
            Title *
          </label>
          <div className="mt-1">
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              placeholder="What needs to be done?"
              className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
            />
          </div>
        </div>
        
        <div className="form-group">
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">
            Description
          </label>
          <div className="mt-1">
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Add details about this task (optional)"
              rows="3"
              className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
            />
          </div>
        </div>
        
        <div className="form-group">
          <label htmlFor="dueDate" className="block text-sm font-medium text-gray-700">
            Due Date
          </label>
          <div className="mt-1">
            <input
              type="date"
              id="dueDate"
              name="dueDate"
              value={formData.dueDate}
              onChange={handleChange}
              min={new Date().toISOString().split('T')[0]}
              className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
            />
          </div>
        </div>
        
        <div className="flex justify-end space-x-3">
          {onComplete && (
            <button 
              type="button" 
              onClick={onComplete}
              className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Cancel
            </button>
          )}
          
          <button 
            type="submit" 
            disabled={loading}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-indigo-300 disabled:cursor-not-allowed"
          >
            {loading ? 'Creating...' : 'Create Task'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default TaskForm;
