import Task from '../models/Task.js';

// Get all tasks for a user
export const getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.findByUserId(req.user.id);
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create a new task
export const createTask = async (req, res) => {
  try {
    const { title, description, dueDate } = req.body;
    
    if (!title) {
      return res.status(400).json({ message: 'Title is required' });
    }
    
    const newTask = await Task.create({
      userId: req.user.id,
      title,
      description: description || '',
      dueDate: dueDate || null
    });
    
    res.status(201).json(newTask);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a task
export const updateTask = async (req, res) => {
  try {
    const taskId = req.params.id;
    const updates = req.body;
    
    console.log('Update request for task ID:', taskId);
    console.log('User ID:', req.user.id);
    
    // First check if task exists and belongs to user
    const task = await Task.findById(taskId);
    
    if (!task) {
      return res.status(404).json({ message: 'Task not found with ID: ' + taskId });
    }
    
    // Convert both IDs to strings for comparison
    if (task.userId.toString() !== req.user.id.toString()) {
      return res.status(403).json({ message: 'Not authorized to modify this task' });
    }
    
    // Add updatedAt timestamp
    updates.updatedAt = new Date();
    
    const updatedTask = await Task.update(taskId, updates);
    
    res.status(200).json(updatedTask);
  } catch (error) {
    console.error('Error in updateTask:', error);
    res.status(500).json({ message: error.message });
  }
};

// Toggle task completion status
export const toggleComplete = async (req, res) => {
  try {
    const taskId = req.params.id;
    
    // Log the incoming request for debugging
    console.log('Toggle request for task ID:', taskId);
    console.log('User ID:', req.user.id);
    
    const task = await Task.findById(taskId);
    
    if (!task) {
      return res.status(404).json({ message: 'Task not found with ID: ' + taskId });
    }
    
    // Convert both IDs to strings for comparison
    if (task.userId.toString() !== req.user.id.toString()) {
      return res.status(403).json({ message: 'Not authorized to modify this task' });
    }
    
    const updatedTask = await Task.update(taskId, {
      completed: !task.completed,
      updatedAt: new Date()
    });
    
    res.status(200).json(updatedTask);
  } catch (error) {
    console.error('Error in toggleComplete:', error);
    res.status(500).json({ message: error.message });
  }
};

// Delete a task
export const deleteTask = async (req, res) => {
  try {
    const taskId = req.params.id;
    
    console.log('Delete request for task ID:', taskId);
    console.log('User ID:', req.user.id);
    
    // First check if task exists and belongs to user
    const task = await Task.findById(taskId);
    
    if (!task) {
      return res.status(404).json({ message: 'Task not found with ID: ' + taskId });
    }
    
    // Convert both IDs to strings for comparison
    if (task.userId.toString() !== req.user.id.toString()) {
      return res.status(403).json({ message: 'Not authorized to delete this task' });
    }
    
    await Task.delete(taskId);
    
    res.status(200).json({ message: 'Task deleted successfully' });
  } catch (error) {
    console.error('Error in deleteTask:', error);
    res.status(500).json({ message: error.message });
  }
};
