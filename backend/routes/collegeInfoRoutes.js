import express from 'express';
import { getCollegeInfo, updateCollegeInfo } from '../controllers/collegeInfoController.js';
import { protect } from '../middleware/authMiddleware.js';
import { requireAdmin } from '../middleware/adminMiddleware.js';

const router = express.Router();

router.route('/')
  .get(getCollegeInfo)
  .put(protect, requireAdmin, updateCollegeInfo);

export default router;
