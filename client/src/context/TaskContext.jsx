import { createContext, useState, useContext, useEffect, useCallback } from 'react';
import axios from 'axios';
import { useAuth } from './AuthContext';

const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { currentUser } = useAuth();

  // Set up axios interceptor for authentication
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }
    
    return () => {
      delete axios.defaults.headers.common['Authorization'];
    };
  }, [currentUser]);

  // Fetch all tasks
  const fetchTasks = useCallback(async () => {
    if (!currentUser) return;
    
    try {
      setLoading(true);
      setError(null);
      const response = await axios.get('/api/tasks');
      setTasks(response.data);
      return response.data;
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch tasks');
      throw err;
    } finally {
      setLoading(false);
    }
  }, [currentUser]);

  // Create a new task
  const createTask = async (taskData) => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.post('/api/tasks', taskData);
      setTasks([...tasks, response.data]);
      return response.data;
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create task');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Update a task
  const updateTask = async (id, taskData) => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.put(`/api/tasks/${id}`, taskData);
      setTasks(tasks.map(task => task._id === id ? response.data : task));
      return response.data;
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update task');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Toggle task completion
  const toggleTaskComplete = async (id) => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.patch(`/api/tasks/${id}/toggle`);
      setTasks(tasks.map(task => task._id === id ? response.data : task));
      return response.data;
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to toggle task');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Delete a task
  const deleteTask = async (id) => {
    try {
      setLoading(true);
      setError(null);
      await axios.delete(`/api/tasks/${id}`);
      setTasks(tasks.filter(task => task._id !== id));
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to delete task');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return (
    <TaskContext.Provider
      value={{
        tasks,
        loading,
        error,
        fetchTasks,
        createTask,
        updateTask,
        toggleTaskComplete,
        deleteTask
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};

export const useTask = () => useContext(TaskContext);

export default TaskContext;
