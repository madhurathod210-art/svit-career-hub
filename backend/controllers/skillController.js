import { mockStore } from '../data/mockStore.js';
import Skill from '../models/Skill.js';
import { getDBStatus } from '../config/db.js';

// @desc    Get all skills grouped by category
// @route   GET /api/skills
// @access  Public
export const getSkills = async (req, res) => {
  try {
    const { category } = req.query;

    if (getDBStatus()) {
      let query = {};
      if (category && category !== 'All') query.category = category;
      const skills = await Skill.find(query);
      return res.json({ success: true, skills });
    } else {
      let skills = [...mockStore.skills];
      if (category && category !== 'All') {
        skills = skills.filter(s => s.category.toLowerCase() === category.toLowerCase());
      }
      return res.json({ success: true, skills });
    }
  } catch (error) {
    console.error('getSkills error:', error);
    return res.status(500).json({ success: false, message: 'Error retrieving skills' });
  }
};

// @desc    Add new skill
// @route   POST /api/skills
// @access  Private/Admin
export const createSkill = async (req, res) => {
  try {
    const data = req.body;
    if (getDBStatus()) {
      const skill = await Skill.create(data);
      return res.status(201).json({ success: true, skill });
    } else {
      const skill = { _id: `sk_${Date.now()}`, ...data };
      mockStore.skills.push(skill);
      return res.status(201).json({ success: true, skill });
    }
  } catch (error) {
    console.error('createSkill error:', error);
    return res.status(500).json({ success: false, message: 'Error creating skill' });
  }
};
