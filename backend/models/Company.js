import mongoose from 'mongoose';

const companySchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  industry: { type: String, required: true },
  logoUrl: String,
  description: String,
  isDemo: { type: Boolean, default: true },
  jobRoles: [String],
  packageRange: String,
  eligibility: String,
  hiringProcess: [String],
  requiredSkills: [String],
  preparationTips: [String],
  officialWebsite: String,
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('Company', companySchema);
