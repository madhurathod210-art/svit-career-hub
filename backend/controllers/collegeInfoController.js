import { mockStore } from '../data/mockStore.js';
import CollegeInfo from '../models/CollegeInfo.js';
import { getDBStatus } from '../config/db.js';

// @desc    Get official college info & placement cell disclaimers
// @route   GET /api/college-info
// @access  Public
export const getCollegeInfo = async (req, res) => {
  try {
    if (getDBStatus()) {
      let info = await CollegeInfo.findOne();
      if (!info) {
        info = await CollegeInfo.create(mockStore.collegeInfo);
      }
      return res.json({ success: true, collegeInfo: info });
    } else {
      return res.json({ success: true, collegeInfo: mockStore.collegeInfo });
    }
  } catch (error) {
    console.error('getCollegeInfo error:', error);
    return res.status(500).json({ success: false, message: 'Error retrieving college info' });
  }
};

// @desc    Admin: Update official college information
// @route   PUT /api/college-info
// @access  Private/Admin
export const updateCollegeInfo = async (req, res) => {
  try {
    const updateData = req.body;
    if (getDBStatus()) {
      const info = await CollegeInfo.findOneAndUpdate({}, updateData, { new: true, upsert: true });
      return res.json({ success: true, collegeInfo: info, message: 'Official college information updated' });
    } else {
      mockStore.collegeInfo = { ...mockStore.collegeInfo, ...updateData };
      return res.json({ success: true, collegeInfo: mockStore.collegeInfo, message: 'Official college information updated' });
    }
  } catch (error) {
    console.error('updateCollegeInfo error:', error);
    return res.status(500).json({ success: false, message: 'Error updating college info' });
  }
};
