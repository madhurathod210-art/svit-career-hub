import express from 'express';
import {
  getInternships,
  createInternship,
  updateInternship,
  deleteInternship
} from '../controllers/internshipController.js';
import { protect } from '../middleware/authMiddleware.js';
import { requireAdmin } from '../middleware/adminMiddleware.js';

const router = express.Router();

router.route('/')
  .get(getInternships)
  .post(protect, requireAdmin, createInternship);

router.route('/:id')
  .put(protect, requireAdmin, updateInternship)
  .delete(protect, requireAdmin, deleteInternship);

export default router;
