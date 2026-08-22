import mongoose from 'mongoose';

const collegeInfoSchema = new mongoose.Schema({
  institutionName: { type: String, default: "Swami Vivekananda Institute of Technology (SVIT)" },
  establishedYear: { type: Number, default: 2004 },
  location: { type: String, default: "Mahbub College Campus, Secunderabad, Telangana, India" },
  affiliation: { type: String, default: "Affiliated to JNTUH / Approved by AICTE, New Delhi" },
  placementCellDesk: {
    heading: String,
    message: String,
    contactEmail: String,
    helpline: String,
    disclaimer: String
  },
  departments: [{
    code: String,
    name: String,
    intake: String
  }],
  officialNotice: String,
  updatedAt: { type: Date, default: Date.now }
});

export default mongoose.model('CollegeInfo', collegeInfoSchema);
