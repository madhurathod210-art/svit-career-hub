import express from 'express';
import {
  getAdminDashboardStats,
  getAdminStudents,
  updateStudentStatus
} from '../controllers/adminController.js';
import { protect } from '../middleware/authMiddleware.js';
import { requireAdmin } from '../middleware/adminMiddleware.js';

const router = express.Router();

router.get('/dashboard', protect, requireAdmin, getAdminDashboardStats);
router.get('/students', protect, requireAdmin, getAdminStudents);
router.put('/students/:id', protect, requireAdmin, updateStudentStatus);

export default router;
