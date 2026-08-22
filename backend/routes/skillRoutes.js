import express from 'express';
import { getSkills, createSkill } from '../controllers/skillController.js';
import { protect } from '../middleware/authMiddleware.js';
import { requireAdmin } from '../middleware/adminMiddleware.js';

const router = express.Router();

router.route('/')
  .get(getSkills)
  .post(protect, requireAdmin, createSkill);

export default router;
