import mongoose from 'mongoose';

const careerProgressSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  careerPathId: {
    type: String,
    required: true
  },
  milestoneStatus: {
    type: Map,
    of: String, // 'Not Started', 'In Progress', 'Completed'
    default: {}
  },
  lastUpdated: {
    type: Date,
    default: Date.now
  }
});

careerProgressSchema.index({ userId: 1, careerPathId: 1 }, { unique: true });

export default mongoose.model('CareerProgress', careerProgressSchema);
