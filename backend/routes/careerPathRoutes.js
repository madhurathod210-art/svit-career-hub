import express from 'express';
import {
  getCareerPaths,
  getCareerPathById,
  updateMilestoneProgress,
  createCareerPath,
  deleteCareerPath
} from '../controllers/careerPathController.js';
import { protect } from '../middleware/authMiddleware.js';
import { requireAdmin } from '../middleware/adminMiddleware.js';

const router = express.Router();

router.route('/')
  .get(getCareerPaths)
  .post(protect, requireAdmin, createCareerPath);

router.route('/:id')
  .get(getCareerPathById)
  .delete(protect, requireAdmin, deleteCareerPath);

router.post('/:id/milestones/:milestoneId', protect, updateMilestoneProgress);

export default router;
