import { mockStore } from '../data/mockStore.js';
import Internship from '../models/Internship.js';
import { getDBStatus } from '../config/db.js';

// @desc    Get all internships with multi-filters
// @route   GET /api/internships
// @access  Public
export const getInternships = async (req, res) => {
  try {
    const { search, workType, tech, location } = req.query;

    if (getDBStatus()) {
      let query = {};
      if (search) {
        query.$or = [
          { title: { $regex: search, $options: 'i' } },
          { company: { $regex: search, $options: 'i' } },
          { techStack: { $elemMatch: { $regex: search, $options: 'i' } } }
        ];
      }
      if (workType && workType !== 'All') query.workType = workType;
      if (location && location !== 'All') query.location = { $regex: location, $options: 'i' };
      if (tech && tech !== 'All') query.techStack = { $elemMatch: { $regex: tech, $options: 'i' } };

      const internships = await Internship.find(query);
      return res.json({ success: true, count: internships.length, internships });
    } else {
      const internships = mockStore.getInternships({ search, workType, tech, location });
      return res.json({ success: true, count: internships.length, internships });
    }
  } catch (error) {
    console.error('getInternships error:', error);
    return res.status(500).json({ success: false, message: 'Error retrieving internships' });
  }
};

// @desc    Create new internship entry
// @route   POST /api/internships
// @access  Private/Admin
export const createInternship = async (req, res) => {
  try {
    const data = req.body;
    if (getDBStatus()) {
      const internship = await Internship.create(data);
      return res.status(201).json({ success: true, internship });
    } else {
      const internship = mockStore.addInternship(data);
      return res.status(201).json({ success: true, internship });
    }
  } catch (error) {
    console.error('createInternship error:', error);
    return res.status(500).json({ success: false, message: 'Error creating internship' });
  }
};

// @desc    Update internship
// @route   PUT /api/internships/:id
// @access  Private/Admin
export const updateInternship = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    if (getDBStatus()) {
      const internship = await Internship.findByIdAndUpdate(id, updateData, { new: true });
      if (!internship) return res.status(404).json({ success: false, message: 'Internship not found' });
      return res.json({ success: true, internship });
    } else {
      const internship = mockStore.updateInternship(id, updateData);
      if (!internship) return res.status(404).json({ success: false, message: 'Internship not found' });
      return res.json({ success: true, internship });
    }
  } catch (error) {
    console.error('updateInternship error:', error);
    return res.status(500).json({ success: false, message: 'Error updating internship' });
  }
};

// @desc    Delete internship
// @route   DELETE /api/internships/:id
// @access  Private/Admin
export const deleteInternship = async (req, res) => {
  try {
    const { id } = req.params;

    if (getDBStatus()) {
      const internship = await Internship.findByIdAndDelete(id);
      if (!internship) return res.status(404).json({ success: false, message: 'Internship not found' });
      return res.json({ success: true, message: 'Internship deleted successfully' });
    } else {
      const internship = mockStore.deleteInternship(id);
      if (!internship) return res.status(404).json({ success: false, message: 'Internship not found' });
      return res.json({ success: true, message: 'Internship deleted successfully' });
    }
  } catch (error) {
    console.error('deleteInternship error:', error);
    return res.status(500).json({ success: false, message: 'Error deleting internship' });
  }
};
