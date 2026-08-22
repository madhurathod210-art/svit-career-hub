import { mockStore } from '../data/mockStore.js';
import User from '../models/User.js';
import StudentProfile from '../models/StudentProfile.js';
import { getDBStatus } from '../config/db.js';

// @desc    Get admin dashboard metrics & summary counts
// @route   GET /api/admin/dashboard
// @access  Private/Admin
export const getAdminDashboardStats = async (req, res) => {
  try {
    const stats = mockStore.getAdminStats();
    return res.json({ success: true, stats });
  } catch (error) {
    console.error('getAdminDashboardStats error:', error);
    return res.status(500).json({ success: false, message: 'Error retrieving admin stats' });
  }
};

// @desc    Get all students with filtering and profile details
// @route   GET /api/admin/students
// @access  Private/Admin
export const getAdminStudents = async (req, res) => {
  try {
    const { search, department, year } = req.query;

    let students = mockStore.users.filter(u => u.role === 'student');

    if (search) {
      const q = search.toLowerCase();
      students = students.filter(s => s.name.toLowerCase().includes(q) || s.email.toLowerCase().includes(q) || (s.studentId && s.studentId.toLowerCase().includes(q)));
    }
    if (department && department !== 'All') {
      students = students.filter(s => s.department === department);
    }
    if (year && year !== 'All') {
      students = students.filter(s => s.year === year);
    }

    const studentsWithProfiles = students.map(s => {
      const profile = mockStore.getStudentProfileByUserId(s._id);
      const readiness = mockStore.calculateCareerReadiness(s._id);
      return {
        ...s,
        profile,
        careerReadinessScore: readiness.totalScore
      };
    });

    return res.json({ success: true, count: studentsWithProfiles.length, students: studentsWithProfiles });
  } catch (error) {
    console.error('getAdminStudents error:', error);
    return res.status(500).json({ success: false, message: 'Error retrieving student list' });
  }
};

// @desc    Update student status (active/disabled) or details
// @route   PUT /api/admin/students/:id
// @access  Private/Admin
export const updateStudentStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { isActive, department, year, cgpa } = req.body;

    const student = mockStore.users.find(u => u._id === id);
    if (!student) return res.status(404).json({ success: false, message: 'Student not found' });

    if (isActive !== undefined) student.isActive = isActive;
    if (department) student.department = department;
    if (year) student.year = year;
    if (cgpa) student.cgpa = Number(cgpa);

    return res.json({ success: true, student, message: 'Student record updated' });
  } catch (error) {
    console.error('updateStudentStatus error:', error);
    return res.status(500).json({ success: false, message: 'Error updating student record' });
  }
};
