import mongoose from 'mongoose';

const milestoneSchema = new mongoose.Schema({
  id: String,
  title: { type: String, required: true },
  description: String,
  recommendedResources: [String]
});

const careerPathSchema = new mongoose.Schema({
  slug: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  category: String,
  description: String,
  estimatedDuration: String,
  avgStartingPackageRange: String,
  milestones: [milestoneSchema],
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('CareerPath', careerPathSchema);
