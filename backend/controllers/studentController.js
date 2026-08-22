import { mockStore } from '../data/mockStore.js';
import StudentProfile from '../models/StudentProfile.js';
import { getDBStatus } from '../config/db.js';

// @desc    Get current student's full profile
// @route   GET /api/students/profile
// @access  Private
export const getStudentProfile = async (req, res) => {
  try {
    const userId = req.user._id || req.user.id;

    if (getDBStatus()) {
      let profile = await StudentProfile.findOne({ userId });
      if (!profile) {
        profile = await StudentProfile.create({
          userId,
          name: req.user.name,
          email: req.user.email,
          studentId: req.user.studentId || 'SVIT0000',
          department: req.user.department || 'CSE',
          year: req.user.year || '1st Year',
          cgpa: req.user.cgpa || 7.5
        });
      }
      return res.json({ success: true, profile });
    } else {
      const profile = mockStore.getStudentProfileByUserId(userId);
      return res.json({ success: true, profile });
    }
  } catch (error) {
    console.error('getStudentProfile error:', error);
    return res.status(500).json({ success: false, message: 'Server error retrieving profile' });
  }
};

// @desc    Update student profile details
// @route   PUT /api/students/profile
// @access  Private
export const updateStudentProfile = async (req, res) => {
  try {
    const userId = req.user._id || req.user.id;
    const updateData = req.body;

    if (getDBStatus()) {
      const profile = await StudentProfile.findOneAndUpdate(
        { userId },
        { ...updateData, updatedAt: new Date() },
        { new: true, upsert: true }
      );
      return res.json({ success: true, profile, message: 'Profile successfully updated' });
    } else {
      const profile = mockStore.updateStudentProfile(userId, updateData);
      return res.json({ success: true, profile, message: 'Profile successfully updated' });
    }
  } catch (error) {
    console.error('updateStudentProfile error:', error);
    return res.status(500).json({ success: false, message: 'Server error updating profile' });
  }
};

// @desc    Get dynamic Career Readiness Score & transparent breakdown
// @route   GET /api/students/readiness
// @access  Private
export const getCareerReadiness = async (req, res) => {
  try {
    const userId = req.user._id || req.user.id;
    const readinessData = mockStore.calculateCareerReadiness(userId);
    return res.json({ success: true, ...readinessData });
  } catch (error) {
    console.error('getCareerReadiness error:', error);
    return res.status(500).json({ success: false, message: 'Error calculating readiness score' });
  }
};

// @desc    Update student completed/in-progress skills
// @route   POST /api/students/skills
// @access  Private
export const updateStudentSkills = async (req, res) => {
  try {
    const userId = req.user._id || req.user.id;
    const { completedSkills, inProgressSkills } = req.body;

    if (getDBStatus()) {
      const profile = await StudentProfile.findOneAndUpdate(
        { userId },
        { completedSkills, inProgressSkills, updatedAt: new Date() },
        { new: true }
      );
      return res.json({ success: true, completedSkills: profile.completedSkills, inProgressSkills: profile.inProgressSkills });
    } else {
      const profile = mockStore.updateStudentProfile(userId, { completedSkills, inProgressSkills });
      return res.json({ success: true, completedSkills: profile.completedSkills, inProgressSkills: profile.inProgressSkills });
    }
  } catch (error) {
    console.error('updateStudentSkills error:', error);
    return res.status(500).json({ success: false, message: 'Error updating skills' });
  }
};

// @desc    Update projects in student portfolio
// @route   POST /api/students/projects
// @access  Private
export const updateStudentProjects = async (req, res) => {
  try {
    const userId = req.user._id || req.user.id;
    const { projects } = req.body;

    if (getDBStatus()) {
      const profile = await StudentProfile.findOneAndUpdate(
        { userId },
        { projects, updatedAt: new Date() },
        { new: true }
      );
      return res.json({ success: true, projects: profile.projects });
    } else {
      const profile = mockStore.updateStudentProfile(userId, { projects });
      return res.json({ success: true, projects: profile.projects });
    }
  } catch (error) {
    console.error('updateStudentProjects error:', error);
    return res.status(500).json({ success: false, message: 'Error updating projects' });
  }
};

// @desc    Save ATS resume details
// @route   POST /api/students/resume
// @access  Private
export const saveResumeDetails = async (req, res) => {
  try {
    const userId = req.user._id || req.user.id;
    const { resumeDetails } = req.body;

    if (getDBStatus()) {
      const profile = await StudentProfile.findOneAndUpdate(
        { userId },
        { resumeDetails, updatedAt: new Date() },
        { new: true }
      );
      return res.json({ success: true, resumeDetails: profile.resumeDetails, message: 'Resume details saved' });
    } else {
      const profile = mockStore.updateStudentProfile(userId, { resumeDetails });
      return res.json({ success: true, resumeDetails: profile.resumeDetails, message: 'Resume details saved' });
    }
  } catch (error) {
    console.error('saveResumeDetails error:', error);
    return res.status(500).json({ success: false, message: 'Error saving resume details' });
  }
};
