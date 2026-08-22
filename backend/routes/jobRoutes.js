import express from 'express';
import {
  getJobs,
  createJob,
  deleteJob
} from '../controllers/jobController.js';
import { protect } from '../middleware/authMiddleware.js';
import { requireAdmin } from '../middleware/adminMiddleware.js';

const router = express.Router();

router.route('/')
  .get(getJobs)
  .post(protect, requireAdmin, createJob);

router.route('/:id')
  .delete(protect, requireAdmin, deleteJob);

export default router;
