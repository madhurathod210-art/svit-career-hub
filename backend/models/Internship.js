import mongoose from 'mongoose';

const internshipSchema = new mongoose.Schema({
  title: { type: String, required: true },
  company: { type: String, required: true },
  location: { type: String, required: true },
  workType: { type: String, enum: ['Remote', 'On-site', 'Hybrid'], default: 'Remote' },
  techStack: [String],
  duration: String,
  stipend: String,
  deadline: String,
  description: String,
  requirements: [String],
  isDemo: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('Internship', internshipSchema);
