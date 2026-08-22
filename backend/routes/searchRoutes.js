import express from 'express';
import { mockStore } from '../data/mockStore.js';

const router = express.Router();

// @desc    Global search across companies, internships, skills, roadmaps, resources, and events
// @route   GET /api/search?q=keyword
// @access  Public
router.get('/', (req, res) => {
  const { q } = req.query;
  const results = mockStore.searchAll(q);
  return res.json({ success: true, query: q || '', results });
});

export default router;
