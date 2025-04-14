import mongoose from 'mongoose';

// Define Task Schema
const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    default: '',
    trim: true
  },
  completed: {
    type: Boolean,
    default: false
  },
  dueDate: {
    type: Date,
    default: null
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: null
  }
});

// Task model methods
taskSchema.statics.findByUserId = function(userId) {
  return this.find({ userId });
};

taskSchema.statics.findById = function(id) {
  try {
    // Convert string ID to MongoDB ObjectId if needed
    const objectId = mongoose.Types.ObjectId.isValid(id) ? new mongoose.Types.ObjectId(id) : id;
    return this.findOne({ _id: objectId });
  } catch (error) {
    console.error('Error in Task.findById:', error);
    return null;
  }
};

taskSchema.statics.create = function(taskData) {
  const newTask = new this(taskData);
  return newTask.save();
};

taskSchema.statics.update = function(id, updates) {
  try {
    // Convert string ID to MongoDB ObjectId if needed
    const objectId = mongoose.Types.ObjectId.isValid(id) ? new mongoose.Types.ObjectId(id) : id;
    return this.findByIdAndUpdate(objectId, updates, { new: true });
  } catch (error) {
    console.error('Error in Task.update:', error);
    throw error;
  }
};

taskSchema.statics.delete = function(id) {
  try {
    // Convert string ID to MongoDB ObjectId if needed
    const objectId = mongoose.Types.ObjectId.isValid(id) ? new mongoose.Types.ObjectId(id) : id;
    // Use findOneAndDelete instead of findByIdAndRemove (which is deprecated)
    return this.findOneAndDelete({ _id: objectId });
  } catch (error) {
    console.error('Error in Task.delete:', error);
    throw error;
  }
};

// Create and export the model
const Task = mongoose.model('Task', taskSchema);
export default Task;
