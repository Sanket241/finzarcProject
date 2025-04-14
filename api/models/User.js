import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

// Define User Schema
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Hash password before saving
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// User model methods
userSchema.statics.findByEmail = function(email) {
  return this.findOne({ email });
};

userSchema.statics.validate = async function(email, password) {
  const user = await this.findOne({ email });
  
  if (!user) {
    return null;
  }
  
  // Validate password
  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) {
    return null;
  }
  
  return user;
};

// Create and export the model
const User = mongoose.model('User', userSchema);
export default User;
