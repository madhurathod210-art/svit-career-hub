import mongoose from 'mongoose';

const eventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  category: {
    type: String,
    enum: ['Hackathons', 'Workshops', 'Seminars', 'Coding competitions', 'Career fairs', 'Technical events', 'Placement drives'],
    required: true
  },
  organizer: String,
  date: String,
  time: String,
  location: String,
  description: String,
  registrationLink: String,
  tags: [String],
  isDemo: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('Event', eventSchema);
