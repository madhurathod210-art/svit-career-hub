import express from 'express';
import {
  getStudentProfile,
  updateStudentProfile,
  getCareerReadiness,
  updateStudentSkills,
  updateStudentProjects,
  saveResumeDetails
} from '../controllers/studentController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/profile')
  .get(protect, getStudentProfile)
  .put(protect, updateStudentProfile);

router.get('/readiness', protect, getCareerReadiness);
router.post('/skills', protect, updateStudentSkills);
router.post('/projects', protect, updateStudentProjects);
router.post('/resume', protect, saveResumeDetails);

export default router;
