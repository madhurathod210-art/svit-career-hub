import { mockStore } from '../data/mockStore.js';
import Resource from '../models/Resource.js';
import { getDBStatus } from '../config/db.js';

// @desc    Get all learning resources with search & category/difficulty filter
// @route   GET /api/resources
// @access  Public
export const getResources = async (req, res) => {
  try {
    const { category, difficulty, search } = req.query;

    if (getDBStatus()) {
      let query = {};
      if (category && category !== 'All') query.category = category;
      if (difficulty && difficulty !== 'All') query.difficulty = difficulty;
      if (search) {
        query.$or = [
          { title: { $regex: search, $options: 'i' } },
          { description: { $regex: search, $options: 'i' } },
          { category: { $regex: search, $options: 'i' } }
        ];
      }
      const resources = await Resource.find(query);
      return res.json({ success: true, count: resources.length, resources });
    } else {
      const resources = mockStore.getResources({ category, difficulty, search });
      const userId = req.user ? (req.user._id || req.user.id) : null;
      const bookmarks = userId ? (mockStore.bookmarkedResources[userId] || []) : [];
      const completed = userId ? (mockStore.completedResources[userId] || []) : [];

      const enriched = resources.map(r => ({
        ...r,
        isBookmarked: bookmarks.includes(r._id),
        isCompleted: completed.includes(r._id)
      }));

      return res.json({ success: true, count: enriched.length, resources: enriched });
    }
  } catch (error) {
    console.error('getResources error:', error);
    return res.status(500).json({ success: false, message: 'Error retrieving resources' });
  }
};

// @desc    Toggle bookmark on a resource
// @route   POST /api/resources/:id/bookmark
// @access  Private
export const toggleBookmarkResource = async (req, res) => {
  try {
    const userId = req.user._id || req.user.id;
    const { id } = req.params;
    const result = mockStore.toggleBookmark(userId, id);
    return res.json({ success: true, ...result });
  } catch (error) {
    console.error('toggleBookmarkResource error:', error);
    return res.status(500).json({ success: false, message: 'Error updating bookmark' });
  }
};

// @desc    Toggle completed status on a resource
// @route   POST /api/resources/:id/complete
// @access  Private
export const toggleCompleteResource = async (req, res) => {
  try {
    const userId = req.user._id || req.user.id;
    const { id } = req.params;
    const result = mockStore.toggleCompletedResource(userId, id);
    return res.json({ success: true, ...result });
  } catch (error) {
    console.error('toggleCompleteResource error:', error);
    return res.status(500).json({ success: false, message: 'Error updating completion status' });
  }
};

// @desc    Admin: Create learning resource
// @route   POST /api/resources
// @access  Private/Admin
export const createResource = async (req, res) => {
  try {
    const data = req.body;
    if (getDBStatus()) {
      const resource = await Resource.create(data);
      return res.status(201).json({ success: true, resource });
    } else {
      const resource = mockStore.addResource(data);
      return res.status(201).json({ success: true, resource });
    }
  } catch (error) {
    console.error('createResource error:', error);
    return res.status(500).json({ success: false, message: 'Error creating resource' });
  }
};

// @desc    Admin: Update learning resource
// @route   PUT /api/resources/:id
// @access  Private/Admin
export const updateResource = async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;
    if (getDBStatus()) {
      const resource = await Resource.findByIdAndUpdate(id, data, { new: true });
      return res.json({ success: true, resource });
    } else {
      const resource = mockStore.updateResource(id, data);
      return res.json({ success: true, resource });
    }
  } catch (error) {
    console.error('updateResource error:', error);
    return res.status(500).json({ success: false, message: 'Error updating resource' });
  }
};

// @desc    Admin: Delete learning resource
// @route   DELETE /api/resources/:id
// @access  Private/Admin
export const deleteResource = async (req, res) => {
  try {
    const { id } = req.params;
    if (getDBStatus()) {
      await Resource.findByIdAndDelete(id);
      return res.json({ success: true, message: 'Resource deleted' });
    } else {
      mockStore.deleteResource(id);
      return res.json({ success: true, message: 'Resource deleted' });
    }
  } catch (error) {
    console.error('deleteResource error:', error);
    return res.status(500).json({ success: false, message: 'Error deleting resource' });
  }
};
