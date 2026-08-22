import express from 'express';
import {
  getResources,
  toggleBookmarkResource,
  toggleCompleteResource,
  createResource,
  updateResource,
  deleteResource
} from '../controllers/resourceController.js';
import { protect } from '../middleware/authMiddleware.js';
import { requireAdmin } from '../middleware/adminMiddleware.js';

const router = express.Router();

router.route('/')
  .get(getResources)
  .post(protect, requireAdmin, createResource);

router.route('/:id')
  .put(protect, requireAdmin, updateResource)
  .delete(protect, requireAdmin, deleteResource);

router.post('/:id/bookmark', protect, toggleBookmarkResource);
router.post('/:id/complete', protect, toggleCompleteResource);

export default router;
