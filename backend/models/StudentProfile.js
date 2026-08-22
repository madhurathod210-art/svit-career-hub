import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  techStack: [String],
  link: String,
  completed: { type: Boolean, default: false }
});

const certSchema = new mongoose.Schema({
  title: { type: String, required: true },
  issuer: String,
  date: String,
  credentialUrl: String
});

const internshipSchema = new mongoose.Schema({
  company: { type: String, required: true },
  role: String,
  duration: String,
  status: { type: String, default: 'Completed' }
});

const studentProfileSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true
  },
  name: String,
  email: String,
  studentId: String,
  department: String,
  year: String,
  cgpa: Number,
  phone: String,
  bio: String,
  careerGoal: {
    type: String,
    default: 'Software Developer'
  },
  completedSkills: [String],
  inProgressSkills: [String],
  projects: [projectSchema],
  certifications: [certSchema],
  internships: [internshipSchema],
  resumeDetails: {
    headline: String,
    objective: String,
    linkedIn: String,
    github: String,
    languages: [String],
    achievements: [String]
  },
  readinessFactors: {
    skillsScore: { type: Number, default: 30 },
    projectsScore: { type: Number, default: 20 },
    internshipScore: { type: Number, default: 0 },
    resumeScore: { type: Number, default: 40 },
    aptitudeScore: { type: Number, default: 30 },
    communicationScore: { type: Number, default: 50 },
    certificationsScore: { type: Number, default: 10 },
    interviewPrepScore: { type: Number, default: 20 }
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model('StudentProfile', studentProfileSchema);
