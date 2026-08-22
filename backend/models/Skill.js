import mongoose from 'mongoose';

const skillSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  category: {
    type: String,
    enum: ['Programming', 'Development', 'Advanced', 'Soft Skills'],
    required: true
  },
  icon: String,
  description: String,
  beginner: [String],
  intermediate: [String],
  advanced: [String],
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('Skill', skillSchema);
