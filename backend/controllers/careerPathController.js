import { mockStore } from '../data/mockStore.js';
import CareerPath from '../models/CareerPath.js';
import CareerProgress from '../models/CareerProgress.js';
import { getDBStatus } from '../config/db.js';

// @desc    Get all career paths & roadmaps
// @route   GET /api/career-paths
// @access  Public
export const getCareerPaths = async (req, res) => {
  try {
    if (getDBStatus()) {
      const paths = await CareerPath.find();
      return res.json({ success: true, count: paths.length, careerPaths: paths });
    } else {
      return res.json({ success: true, count: mockStore.careerPaths.length, careerPaths: mockStore.careerPaths });
    }
  } catch (error) {
    console.error('getCareerPaths error:', error);
    return res.status(500).json({ success: false, message: 'Error retrieving career paths' });
  }
};

// @desc    Get single career path by ID or slug with student's milestone progress
// @route   GET /api/career-paths/:id
// @access  Public
export const getCareerPathById = async (req, res) => {
  try {
    const { id } = req.params;
    let path;

    if (getDBStatus()) {
      path = await CareerPath.findOne({ $or: [{ _id: id }, { slug: id }] });
    } else {
      path = mockStore.careerPaths.find(p => p._id === id || p.slug === id);
    }

    if (!path) return res.status(404).json({ success: false, message: 'Career roadmap not found' });

    let progress = {};
    if (req.user) {
      const userId = req.user._id || req.user.id;
      if (getDBStatus()) {
        const cpRecord = await CareerProgress.findOne({ userId, careerPathId: path._id.toString() });
        if (cpRecord && cpRecord.milestoneStatus) {
          progress = Object.fromEntries(cpRecord.milestoneStatus);
        }
      } else {
        progress = mockStore.getCareerProgress(userId, path._id);
      }
    }

    return res.json({ success: true, careerPath: path, userProgress: progress });
  } catch (error) {
    console.error('getCareerPathById error:', error);
    return res.status(500).json({ success: false, message: 'Error retrieving career path details' });
  }
};

// @desc    Update student milestone status (Not Started -> In Progress -> Completed)
// @route   POST /api/career-paths/:id/milestones/:milestoneId
// @access  Private
export const updateMilestoneProgress = async (req, res) => {
  try {
    const userId = req.user._id || req.user.id;
    const { id, milestoneId } = req.params;
    const { status } = req.body; // 'Not Started', 'In Progress', 'Completed'

    if (!['Not Started', 'In Progress', 'Completed'].includes(status)) {
      return res.status(400).json({ success: false, message: 'Invalid milestone status' });
    }

    if (getDBStatus()) {
      let progress = await CareerProgress.findOne({ userId, careerPathId: id });
      if (!progress) {
        progress = new CareerProgress({
          userId,
          careerPathId: id,
          milestoneStatus: new Map()
        });
      }
      progress.milestoneStatus.set(milestoneId, status);
      progress.lastUpdated = new Date();
      await progress.save();
      return res.json({ success: true, milestoneStatus: Object.fromEntries(progress.milestoneStatus) });
    } else {
      const milestoneStatus = mockStore.updateMilestoneStatus(userId, id, milestoneId, status);
      return res.json({ success: true, milestoneStatus });
    }
  } catch (error) {
    console.error('updateMilestoneProgress error:', error);
    return res.status(500).json({ success: false, message: 'Error updating milestone progress' });
  }
};

// @desc    Admin: Create new career path
// @route   POST /api/career-paths
// @access  Private/Admin
export const createCareerPath = async (req, res) => {
  try {
    const data = req.body;
    if (getDBStatus()) {
      const path = await CareerPath.create(data);
      return res.status(201).json({ success: true, careerPath: path });
    } else {
      const path = { _id: `cp_${Date.now()}`, ...data };
      mockStore.careerPaths.push(path);
      return res.status(201).json({ success: true, careerPath: path });
    }
  } catch (error) {
    console.error('createCareerPath error:', error);
    return res.status(500).json({ success: false, message: 'Error creating career path' });
  }
};

// @desc    Admin: Delete career path
// @route   DELETE /api/career-paths/:id
// @access  Private/Admin
export const deleteCareerPath = async (req, res) => {
  try {
    const { id } = req.params;
    if (getDBStatus()) {
      await CareerPath.findByIdAndDelete(id);
      return res.json({ success: true, message: 'Career path deleted' });
    } else {
      const idx = mockStore.careerPaths.findIndex(p => p._id === id);
      if (idx >= 0) mockStore.careerPaths.splice(idx, 1);
      return res.json({ success: true, message: 'Career path deleted' });
    }
  } catch (error) {
    console.error('deleteCareerPath error:', error);
    return res.status(500).json({ success: false, message: 'Error deleting career path' });
  }
};
