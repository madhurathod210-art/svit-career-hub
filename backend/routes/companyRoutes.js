import express from 'express';
import {
  getCompanies,
  createCompany,
  updateCompany,
  deleteCompany
} from '../controllers/companyController.js';
import { protect } from '../middleware/authMiddleware.js';
import { requireAdmin } from '../middleware/adminMiddleware.js';

const router = express.Router();

router.route('/')
  .get(getCompanies)
  .post(protect, requireAdmin, createCompany);

router.route('/:id')
  .put(protect, requireAdmin, updateCompany)
  .delete(protect, requireAdmin, deleteCompany);

export default router;
