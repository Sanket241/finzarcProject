import express from 'express';
import { getAllTasks, createTask, updateTask, toggleComplete, deleteTask } from '../Controllers/taskController.js';
import { authenticateToken } from '../utils/auth.js';

const router = express.Router();

// All task routes are protected
router.use(authenticateToken);

// Task routes
router.get('/', getAllTasks);
router.post('/', createTask);
router.put('/:id', updateTask);
router.patch('/:id/toggle', toggleComplete);
router.delete('/:id', deleteTask);

export default router;
