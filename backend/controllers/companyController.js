import { mockStore } from '../data/mockStore.js';
import Company from '../models/Company.js';
import { getDBStatus } from '../config/db.js';

// @desc    Get all companies with optional search and industry filter
// @route   GET /api/companies
// @access  Public
export const getCompanies = async (req, res) => {
  try {
    const { search, industry } = req.query;

    if (getDBStatus()) {
      let query = {};
      if (search) {
        query.$or = [
          { name: { $regex: search, $options: 'i' } },
          { industry: { $regex: search, $options: 'i' } },
          { jobRoles: { $elemMatch: { $regex: search, $options: 'i' } } }
        ];
      }
      if (industry && industry !== 'All') {
        query.industry = industry;
      }
      const companies = await Company.find(query);
      return res.json({ success: true, count: companies.length, companies });
    } else {
      const companies = mockStore.getCompanies({ search, industry });
      return res.json({ success: true, count: companies.length, companies });
    }
  } catch (error) {
    console.error('getCompanies error:', error);
    return res.status(500).json({ success: false, message: 'Error retrieving companies' });
  }
};

// @desc    Create a new company entry
// @route   POST /api/companies
// @access  Private/Admin
export const createCompany = async (req, res) => {
  try {
    const companyData = req.body;
    if (getDBStatus()) {
      const company = await Company.create(companyData);
      return res.status(201).json({ success: true, company });
    } else {
      const company = mockStore.addCompany(companyData);
      return res.status(201).json({ success: true, company });
    }
  } catch (error) {
    console.error('createCompany error:', error);
    return res.status(500).json({ success: false, message: 'Error creating company' });
  }
};

// @desc    Update company entry
// @route   PUT /api/companies/:id
// @access  Private/Admin
export const updateCompany = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    if (getDBStatus()) {
      const company = await Company.findByIdAndUpdate(id, updateData, { new: true });
      if (!company) return res.status(404).json({ success: false, message: 'Company not found' });
      return res.json({ success: true, company });
    } else {
      const company = mockStore.updateCompany(id, updateData);
      if (!company) return res.status(404).json({ success: false, message: 'Company not found' });
      return res.json({ success: true, company });
    }
  } catch (error) {
    console.error('updateCompany error:', error);
    return res.status(500).json({ success: false, message: 'Error updating company' });
  }
};

// @desc    Delete company entry
// @route   DELETE /api/companies/:id
// @access  Private/Admin
export const deleteCompany = async (req, res) => {
  try {
    const { id } = req.params;

    if (getDBStatus()) {
      const company = await Company.findByIdAndDelete(id);
      if (!company) return res.status(404).json({ success: false, message: 'Company not found' });
      return res.json({ success: true, message: 'Company deleted successfully' });
    } else {
      const company = mockStore.deleteCompany(id);
      if (!company) return res.status(404).json({ success: false, message: 'Company not found' });
      return res.json({ success: true, message: 'Company deleted successfully' });
    }
  } catch (error) {
    console.error('deleteCompany error:', error);
    return res.status(500).json({ success: false, message: 'Error deleting company' });
  }
};
