import { mockStore } from '../data/mockStore.js';
import Job from '../models/Job.js';
import { getDBStatus } from '../config/db.js';

// @desc    Get placement job postings
// @route   GET /api/jobs
// @access  Public
export const getJobs = async (req, res) => {
  try {
    const { search, jobType } = req.query;

    if (getDBStatus()) {
      let query = {};
      if (search) {
        query.$or = [
          { title: { $regex: search, $options: 'i' } },
          { company: { $regex: search, $options: 'i' } },
          { requiredSkills: { $elemMatch: { $regex: search, $options: 'i' } } }
        ];
      }
      if (jobType && jobType !== 'All') query.jobType = jobType;
      const jobs = await Job.find(query);
      return res.json({ success: true, count: jobs.length, jobs });
    } else {
      // In mockStore, we can generate from companies or a jobs list
      let jobs = [];
      mockStore.companies.forEach((c, idx) => {
        (c.jobRoles || []).forEach((role, rIdx) => {
          jobs.push({
            _id: `job_${c._id}_${rIdx}`,
            title: role,
            company: c.name,
            companyId: c._id,
            location: 'Hyderabad / PAN India',
            jobType: 'Full-Time',
            package: c.packageRange || 'Competitive [DEMO]',
            eligibility: c.eligibility,
            requiredSkills: c.requiredSkills,
            description: `Campus placement opportunity for ${role} at ${c.name}.`,
            deadline: '2026-05-30',
            applyLink: c.officialWebsite,
            isDemo: true
          });
        });
      });

      if (search) {
        const q = search.toLowerCase();
        jobs = jobs.filter(j => j.title.toLowerCase().includes(q) || j.company.toLowerCase().includes(q) || (j.requiredSkills || []).some(s => s.toLowerCase().includes(q)));
      }

      return res.json({ success: true, count: jobs.length, jobs });
    }
  } catch (error) {
    console.error('getJobs error:', error);
    return res.status(500).json({ success: false, message: 'Error retrieving jobs' });
  }
};

// @desc    Admin: Create new job posting
// @route   POST /api/jobs
// @access  Private/Admin
export const createJob = async (req, res) => {
  try {
    const data = req.body;
    if (getDBStatus()) {
      const job = await Job.create(data);
      return res.status(201).json({ success: true, job });
    } else {
      const job = { _id: `job_${Date.now()}`, isDemo: true, ...data };
      return res.status(201).json({ success: true, job });
    }
  } catch (error) {
    console.error('createJob error:', error);
    return res.status(500).json({ success: false, message: 'Error creating job' });
  }
};

// @desc    Admin: Delete job posting
// @route   DELETE /api/jobs/:id
// @access  Private/Admin
export const deleteJob = async (req, res) => {
  try {
    const { id } = req.params;
    if (getDBStatus()) {
      await Job.findByIdAndDelete(id);
      return res.json({ success: true, message: 'Job deleted' });
    } else {
      return res.json({ success: true, message: 'Job deleted' });
    }
  } catch (error) {
    console.error('deleteJob error:', error);
    return res.status(500).json({ success: false, message: 'Error deleting job' });
  }
};
