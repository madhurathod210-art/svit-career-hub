import React, { useState, useEffect } from 'react';
import {
  Shield,
  Users,
  Building2,
  Briefcase,
  Compass,
  Calendar,
  BookOpen,
  Map,
  Plus,
  Trash2,
  Edit,
  Search,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Sparkles,
  Save
} from 'lucide-react';
import API from '../services/api';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../components/Toast';
import DemoBadge from '../components/DemoBadge';

const AdminDashboardPage = () => {
  const { user } = useAuth();
  const { showToast } = useToast();

  const [activeTab, setActiveTab] = useState('overview'); // 'overview', 'students', 'companies', 'internships', 'events', 'resources', 'college'
  const [stats, setStats] = useState({
    studentCount: 0,
    companyCount: 0,
    internshipCount: 0,
    eventCount: 0,
    resourceCount: 0,
    roadmapCount: 0,
    avgScore: 74
  });

  const [students, setStudents] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [internships, setInternships] = useState([]);
  const [events, setEvents] = useState([]);
  const [resources, setResources] = useState([]);
  const [collegeInfo, setCollegeInfo] = useState({
    institutionName: '',
    officialNotice: '',
    placementCellDesk: { heading: '', message: '', contactEmail: '' }
  });

  // Search in students
  const [studentSearch, setStudentSearch] = useState('');

  // Modals for adding
  const [isAddCompanyOpen, setIsAddCompanyOpen] = useState(false);
  const [newCompany, setNewCompany] = useState({ name: '', industry: '', eligibility: '', packageRange: '', officialWebsite: 'https://', requiredSkills: '' });

  const [isAddInternshipOpen, setIsAddInternshipOpen] = useState(false);
  const [newInternship, setNewInternship] = useState({ title: '', company: '', location: 'Hyderabad', workType: 'Remote', stipend: '₹15,000 / month', duration: '3 Months', deadline: '2026-05-30', description: '', techStack: '' });

  const [isAddEventOpen, setIsAddEventOpen] = useState(false);
  const [newEvent, setNewEvent] = useState({ title: '', category: 'Workshops', organizer: 'SVIT T&P Cell', date: '2026-05-10', time: '10:00 AM', location: 'SVIT Auditorium', description: '' });

  const [isAddResourceOpen, setIsAddResourceOpen] = useState(false);
  const [newResource, setNewResource] = useState({ title: '', category: 'Web Development', difficulty: 'Beginner', duration: '5 Hours', description: '', link: 'https://' });

  const [loading, setLoading] = useState(true);

  const fetchAllAdminData = async () => {
    try {
      setLoading(true);
      const [statsRes, studentsRes, companiesRes, internRes, eventsRes, resRes, collegeRes] = await Promise.all([
        API.get('/admin/dashboard'),
        API.get('/admin/students'),
        API.get('/companies'),
        API.get('/internships'),
        API.get('/events'),
        API.get('/resources'),
        API.get('/college-info')
      ]);

      if (statsRes.data.success) setStats(statsRes.data.stats);
      if (studentsRes.data.success) setStudents(studentsRes.data.students);
      if (companiesRes.data.success) setCompanies(companiesRes.data.companies);
      if (internRes.data.success) setInternships(internRes.data.internships);
      if (eventsRes.data.success) setEvents(eventsRes.data.events);
      if (resourcesRes.data.success) setResources(resourcesRes.data.resources);
      if (collegeRes.data.success) setCollegeInfo(collegeRes.data.collegeInfo);
    } catch (error) {
      console.error('Error loading admin data', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllAdminData();
  }, []);

  // Student toggle active/disabled
  const handleToggleStudent = async (studentId, currentActive) => {
    try {
      const res = await API.put(`/admin/students/${studentId}`, { isActive: !currentActive });
      if (res.data.success) {
        setStudents(prev => prev.map(s => s._id === studentId ? { ...s, isActive: !currentActive } : s));
        showToast(`Student status updated to ${!currentActive ? 'Active' : 'Disabled'}`, 'info');
      }
    } catch (e) {
      showToast('Failed to update student', 'error');
    }
  };

  // Company Actions
  const handleCreateCompany = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post('/companies', {
        ...newCompany,
        requiredSkills: newCompany.requiredSkills.split(',').map(s => s.trim()),
        jobRoles: ['Associate Engineer', 'Software Developer'],
        isDemo: true
      });
      if (res.data.success) {
        setCompanies(prev => [res.data.company, ...prev]);
        setIsAddCompanyOpen(false);
        setNewCompany({ name: '', industry: '', eligibility: '', packageRange: '', officialWebsite: 'https://', requiredSkills: '' });
        showToast('Company record added successfully', 'success');
      }
    } catch (e) {
      showToast('Error creating company', 'error');
    }
  };

  const handleDeleteCompany = async (id) => {
    if (!window.confirm('Delete this company entry?')) return;
    try {
      const res = await API.delete(`/companies/${id}`);
      if (res.data.success) {
        setCompanies(prev => prev.filter(c => c._id !== id));
        showToast('Company removed', 'info');
      }
    } catch (e) {
      showToast('Error deleting company', 'error');
    }
  };

  // Internship Actions
  const handleCreateInternship = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post('/internships', {
        ...newInternship,
        techStack: newInternship.techStack.split(',').map(s => s.trim()),
        isDemo: true
      });
      if (res.data.success) {
        setInternships(prev => [res.data.internship, ...prev]);
        setIsAddInternshipOpen(false);
        showToast('Internship opening published', 'success');
      }
    } catch (e) {
      showToast('Error creating internship', 'error');
    }
  };

  const handleDeleteInternship = async (id) => {
    if (!window.confirm('Delete this internship?')) return;
    try {
      const res = await API.delete(`/internships/${id}`);
      if (res.data.success) {
        setInternships(prev => prev.filter(i => i._id !== id));
        showToast('Internship deleted', 'info');
      }
    } catch (e) {
      showToast('Error deleting internship', 'error');
    }
  };

  // Event Actions
  const handleCreateEvent = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post('/events', { ...newEvent, isDemo: true });
      if (res.data.success) {
        setEvents(prev => [res.data.event, ...prev]);
        setIsAddEventOpen(false);
        showToast('Campus event added', 'success');
      }
    } catch (e) {
      showToast('Error creating event', 'error');
    }
  };

  const handleDeleteEvent = async (id) => {
    if (!window.confirm('Delete this event?')) return;
    try {
      const res = await API.delete(`/events/${id}`);
      if (res.data.success) {
        setEvents(prev => prev.filter(e => e._id !== id));
        showToast('Event deleted', 'info');
      }
    } catch (e) {
      showToast('Error deleting event', 'error');
    }
  };

  // Resource Actions
  const handleCreateResource = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post('/resources', { ...newResource, isDemo: true });
      if (res.data.success) {
        setResources(prev => [res.data.resource, ...prev]);
        setIsAddResourceOpen(false);
        showToast('Learning resource added', 'success');
      }
    } catch (e) {
      showToast('Error adding resource', 'error');
    }
  };

  const handleDeleteResource = async (id) => {
    if (!window.confirm('Delete this resource?')) return;
    try {
      const res = await API.delete(`/resources/${id}`);
      if (res.data.success) {
        setResources(prev => prev.filter(r => r._id !== id));
        showToast('Resource deleted', 'info');
      }
    } catch (e) {
      showToast('Error deleting resource', 'error');
    }
  };

  // College Info Update
  const handleSaveCollegeInfo = async () => {
    try {
      const res = await API.put('/college-info', collegeInfo);
      if (res.data.success) {
        showToast('Official SVIT announcements and desk notice updated', 'success');
      }
    } catch (e) {
      showToast('Error updating college info', 'error');
    }
  };

  const filteredStudents = students.filter(s => {
    return s.name.toLowerCase().includes(studentSearch.toLowerCase()) ||
      s.email.toLowerCase().includes(studentSearch.toLowerCase()) ||
      (s.studentId && s.studentId.toLowerCase().includes(studentSearch.toLowerCase()));
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 glass-panel p-6 sm:p-8 rounded-3xl border border-amber-500/30 bg-gradient-to-r from-slate-900 via-slate-900 to-amber-950/20">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20 text-xs font-semibold mb-2">
            <Shield className="w-3.5 h-3.5" />
            <span>Administrator Control Center</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-black text-white">
            SVIT Platform Management
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
            Manage students, campus companies, internship drives, technical events, and official circulars.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <DemoBadge text="ADMIN ACTIVE" />
        </div>
      </div>

      {/* Admin Nav Tabs */}
      <div className="flex flex-wrap items-center gap-2 border-b border-slate-800 pb-3">
        {[
          { id: 'overview', label: 'Dashboard Overview', icon: Sparkles },
          { id: 'students', label: `Students (${students.length})`, icon: Users },
          { id: 'companies', label: `Companies (${companies.length})`, icon: Building2 },
          { id: 'internships', label: `Internships (${internships.length})`, icon: Compass },
          { id: 'events', label: `Events (${events.length})`, icon: Calendar },
          { id: 'resources', label: `Resources (${resources.length})`, icon: BookOpen },
          { id: 'college', label: 'College Circulars', icon: Shield }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === tab.id
                ? 'bg-amber-600 text-white shadow-lg shadow-amber-600/20'
                : 'bg-slate-900/60 text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <tab.icon className="w-4 h-4" />
            {tab.label}
          </button>
        ))}
      </div>

      {/* TAB: OVERVIEW */}
      {activeTab === 'overview' && (
        <div className="space-y-8">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            <div className="glass-panel p-4 rounded-2xl border border-slate-800">
              <span className="text-[10px] uppercase font-bold text-slate-500">Students</span>
              <p className="text-2xl font-black text-white mt-1">{stats.studentCount || students.length}</p>
            </div>
            <div className="glass-panel p-4 rounded-2xl border border-slate-800">
              <span className="text-[10px] uppercase font-bold text-slate-500">Companies</span>
              <p className="text-2xl font-black text-blue-400 mt-1">{companies.length}</p>
            </div>
            <div className="glass-panel p-4 rounded-2xl border border-slate-800">
              <span className="text-[10px] uppercase font-bold text-slate-500">Internships</span>
              <p className="text-2xl font-black text-emerald-400 mt-1">{internships.length}</p>
            </div>
            <div className="glass-panel p-4 rounded-2xl border border-slate-800">
              <span className="text-[10px] uppercase font-bold text-slate-500">Campus Events</span>
              <p className="text-2xl font-black text-rose-400 mt-1">{events.length}</p>
            </div>
            <div className="glass-panel p-4 rounded-2xl border border-slate-800">
              <span className="text-[10px] uppercase font-bold text-slate-500">Resources</span>
              <p className="text-2xl font-black text-indigo-400 mt-1">{resources.length}</p>
            </div>
            <div className="glass-panel p-4 rounded-2xl border border-slate-800">
              <span className="text-[10px] uppercase font-bold text-slate-500">Roadmaps</span>
              <p className="text-2xl font-black text-cyan-400 mt-1">13</p>
            </div>
          </div>

          <div className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-4">
            <h3 className="text-base font-bold text-white">Administrator Quick Actions</h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <button
                onClick={() => { setActiveTab('companies'); setIsAddCompanyOpen(true); }}
                className="p-4 rounded-2xl bg-blue-600/10 hover:bg-blue-600/20 border border-blue-500/30 text-blue-300 text-xs font-bold text-left flex flex-col justify-between"
              >
                <Building2 className="w-5 h-5 mb-2" />
                <span>Add Recruiting Company</span>
              </button>

              <button
                onClick={() => { setActiveTab('internships'); setIsAddInternshipOpen(true); }}
                className="p-4 rounded-2xl bg-emerald-600/10 hover:bg-emerald-600/20 border border-emerald-500/30 text-emerald-300 text-xs font-bold text-left flex flex-col justify-between"
              >
                <Compass className="w-5 h-5 mb-2" />
                <span>Post Internship Drive</span>
              </button>

              <button
                onClick={() => { setActiveTab('events'); setIsAddEventOpen(true); }}
                className="p-4 rounded-2xl bg-rose-600/10 hover:bg-rose-600/20 border border-rose-500/30 text-rose-300 text-xs font-bold text-left flex flex-col justify-between"
              >
                <Calendar className="w-5 h-5 mb-2" />
                <span>Schedule Campus Event</span>
              </button>

              <button
                onClick={() => { setActiveTab('resources'); setIsAddResourceOpen(true); }}
                className="p-4 rounded-2xl bg-indigo-600/10 hover:bg-indigo-600/20 border border-indigo-500/30 text-indigo-300 text-xs font-bold text-left flex flex-col justify-between"
              >
                <BookOpen className="w-5 h-5 mb-2" />
                <span>Add Study Resource</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* TAB: STUDENTS */}
      {activeTab === 'students' && (
        <div className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-4">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <h3 className="text-base font-bold text-white">Registered Students ({students.length})</h3>
            <div className="relative w-full sm:w-64">
              <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={studentSearch}
                onChange={(e) => setStudentSearch(e.target.value)}
                placeholder="Search students..."
                className="w-full pl-9 pr-3 py-1.5 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-amber-500"
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="border-b border-slate-800 text-slate-400 font-bold uppercase text-[10px]">
                <tr>
                  <th className="py-3 px-3">Student Name</th>
                  <th className="py-3 px-3">Roll No</th>
                  <th className="py-3 px-3">Dept & Year</th>
                  <th className="py-3 px-3">CGPA</th>
                  <th className="py-3 px-3">Readiness</th>
                  <th className="py-3 px-3">Status</th>
                  <th className="py-3 px-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {filteredStudents.map(student => (
                  <tr key={student._id} className="hover:bg-slate-850/60 transition-colors">
                    <td className="py-3 px-3">
                      <p className="font-bold text-white">{student.name}</p>
                      <span className="text-[10px] text-slate-400">{student.email}</span>
                    </td>
                    <td className="py-3 px-3 font-mono text-slate-300">{student.studentId || 'SVIT001'}</td>
                    <td className="py-3 px-3 text-slate-300">{student.department || 'CSE'} • {student.year || '1st Year'}</td>
                    <td className="py-3 px-3 font-mono font-bold text-slate-200">{student.cgpa || 7.5}</td>
                    <td className="py-3 px-3">
                      <span className="px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-300 font-mono font-bold">
                        {student.careerReadinessScore || 78}/100
                      </span>
                    </td>
                    <td className="py-3 px-3">
                      {student.isActive !== false ? (
                        <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 font-semibold text-[10px]">Active</span>
                      ) : (
                        <span className="px-2 py-0.5 rounded-full bg-rose-500/10 text-rose-400 font-semibold text-[10px]">Disabled</span>
                      )}
                    </td>
                    <td className="py-3 px-3 text-right">
                      <button
                        onClick={() => handleToggleStudent(student._id, student.isActive !== false)}
                        className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-[10px] font-semibold text-slate-300"
                      >
                        {student.isActive !== false ? 'Disable' : 'Enable'}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB: COMPANIES */}
      {activeTab === 'companies' && (
        <div className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-white">Recruiting Companies Management</h3>
            <button
              onClick={() => setIsAddCompanyOpen(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold shadow"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Company</span>
            </button>
          </div>

          <div className="space-y-3">
            {companies.map(c => (
              <div key={c._id} className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 flex items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="text-sm font-bold text-white">{c.name}</h4>
                    <span className="text-[10px] text-slate-400">({c.industry})</span>
                    <DemoBadge />
                  </div>
                  <p className="text-xs text-slate-400 mt-0.5">{c.eligibility}</p>
                </div>
                <button
                  onClick={() => handleDeleteCompany(c._id)}
                  className="p-1.5 rounded-lg bg-rose-950/40 text-rose-400 hover:bg-rose-900/60 border border-rose-500/20"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB: INTERNSHIPS */}
      {activeTab === 'internships' && (
        <div className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-white">Internships Management</h3>
            <button
              onClick={() => setIsAddInternshipOpen(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Internship</span>
            </button>
          </div>

          <div className="space-y-3">
            {internships.map(i => (
              <div key={i._id} className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 flex items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="text-sm font-bold text-white">{i.title}</h4>
                    <span className="text-xs text-emerald-400 font-semibold">@{i.company}</span>
                    <DemoBadge />
                  </div>
                  <p className="text-xs text-slate-400 mt-0.5">{i.location} • {i.duration} • {i.stipend}</p>
                </div>
                <button
                  onClick={() => handleDeleteInternship(i._id)}
                  className="p-1.5 rounded-lg bg-rose-950/40 text-rose-400 hover:bg-rose-900/60 border border-rose-500/20"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB: EVENTS */}
      {activeTab === 'events' && (
        <div className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-white">Campus Events Management</h3>
            <button
              onClick={() => setIsAddEventOpen(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold shadow"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Event</span>
            </button>
          </div>

          <div className="space-y-3">
            {events.map(e => (
              <div key={e._id} className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 flex items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="text-sm font-bold text-white">{e.title}</h4>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-rose-500/10 text-rose-400 border border-rose-500/20">{e.category}</span>
                  </div>
                  <p className="text-xs text-slate-400 mt-0.5">{e.date} • {e.time} • {e.location}</p>
                </div>
                <button
                  onClick={() => handleDeleteEvent(e._id)}
                  className="p-1.5 rounded-lg bg-rose-950/40 text-rose-400 hover:bg-rose-900/60 border border-rose-500/20"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB: RESOURCES */}
      {activeTab === 'resources' && (
        <div className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-white">Learning Resources Management</h3>
            <button
              onClick={() => setIsAddResourceOpen(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold shadow"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Resource</span>
            </button>
          </div>

          <div className="space-y-3">
            {resources.map(r => (
              <div key={r._id} className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 flex items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="text-sm font-bold text-white">{r.title}</h4>
                    <span className="text-[10px] text-indigo-400">({r.category})</span>
                  </div>
                  <p className="text-xs text-slate-400 mt-0.5">{r.difficulty} Tier • {r.duration}</p>
                </div>
                <button
                  onClick={() => handleDeleteResource(r._id)}
                  className="p-1.5 rounded-lg bg-rose-950/40 text-rose-400 hover:bg-rose-900/60 border border-rose-500/20"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB: COLLEGE CIRCULARS */}
      {activeTab === 'college' && (
        <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-slate-800 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-bold text-white">Official SVIT Bulletins & Notice Desk</h3>
              <p className="text-xs text-slate-400 mt-0.5">Control the verified text broadcasted to students across the portal.</p>
            </div>
            <button
              onClick={handleSaveCollegeInfo}
              className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold shadow"
            >
              <Save className="w-4 h-4" />
              <span>Publish Update</span>
            </button>
          </div>

          <div className="space-y-4 text-xs">
            <div>
              <label className="block text-slate-300 font-semibold mb-1">Official Banner Notice</label>
              <textarea
                rows={2}
                value={collegeInfo.officialNotice || ''}
                onChange={(e) => setCollegeInfo({ ...collegeInfo, officialNotice: e.target.value })}
                className="w-full p-3 bg-slate-900 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-blue-500 leading-relaxed"
              />
            </div>

            <div>
              <label className="block text-slate-300 font-semibold mb-1">Placement Cell Desk Message</label>
              <textarea
                rows={3}
                value={collegeInfo.placementCellDesk?.message || ''}
                onChange={(e) => setCollegeInfo({
                  ...collegeInfo,
                  placementCellDesk: { ...collegeInfo.placementCellDesk, message: e.target.value }
                })}
                className="w-full p-3 bg-slate-900 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-blue-500 leading-relaxed"
              />
            </div>
          </div>
        </div>
      )}

      {/* ADD COMPANY MODAL */}
      {isAddCompanyOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <form onSubmit={handleCreateCompany} className="bg-slate-900 border border-slate-800 p-6 sm:p-8 rounded-3xl max-w-lg w-full space-y-4">
            <h3 className="text-lg font-bold text-white">Add Recruiting Company</h3>
            <div className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-400 mb-1">Company Name</label>
                <input
                  type="text"
                  required
                  value={newCompany.name}
                  onChange={(e) => setNewCompany({ ...newCompany, name: e.target.value })}
                  placeholder="e.g. Cisco Systems [DEMO]"
                  className="w-full p-2.5 bg-slate-950 border border-slate-700 rounded-xl text-white"
                />
              </div>
              <div>
                <label className="block text-slate-400 mb-1">Industry</label>
                <input
                  type="text"
                  required
                  value={newCompany.industry}
                  onChange={(e) => setNewCompany({ ...newCompany, industry: e.target.value })}
                  placeholder="e.g. Networking & Cloud"
                  className="w-full p-2.5 bg-slate-950 border border-slate-700 rounded-xl text-white"
                />
              </div>
              <div>
                <label className="block text-slate-400 mb-1">Required Skills (comma separated)</label>
                <input
                  type="text"
                  value={newCompany.requiredSkills}
                  onChange={(e) => setNewCompany({ ...newCompany, requiredSkills: e.target.value })}
                  placeholder="C++, Networking, Python, Linux"
                  className="w-full p-2.5 bg-slate-950 border border-slate-700 rounded-xl text-white"
                />
              </div>
              <div>
                <label className="block text-slate-400 mb-1">Eligibility Criteria</label>
                <input
                  type="text"
                  value={newCompany.eligibility}
                  onChange={(e) => setNewCompany({ ...newCompany, eligibility: e.target.value })}
                  placeholder="B.Tech CSE/ECE, 65% aggregate"
                  className="w-full p-2.5 bg-slate-950 border border-slate-700 rounded-xl text-white"
                />
              </div>
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <button type="button" onClick={() => setIsAddCompanyOpen(false)} className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 text-xs">Cancel</button>
              <button type="submit" className="px-4 py-2 rounded-xl bg-blue-600 text-white text-xs font-bold">Add Company</button>
            </div>
          </form>
        </div>
      )}

      {/* ADD INTERNSHIP MODAL */}
      {isAddInternshipOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <form onSubmit={handleCreateInternship} className="bg-slate-900 border border-slate-800 p-6 sm:p-8 rounded-3xl max-w-lg w-full space-y-4">
            <h3 className="text-lg font-bold text-white">Post Internship Drive</h3>
            <div className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-400 mb-1">Role Title</label>
                <input
                  type="text"
                  required
                  value={newInternship.title}
                  onChange={(e) => setNewInternship({ ...newInternship, title: e.target.value })}
                  placeholder="e.g. Backend Node.js Intern [DEMO]"
                  className="w-full p-2.5 bg-slate-950 border border-slate-700 rounded-xl text-white"
                />
              </div>
              <div>
                <label className="block text-slate-400 mb-1">Company</label>
                <input
                  type="text"
                  required
                  value={newInternship.company}
                  onChange={(e) => setNewInternship({ ...newInternship, company: e.target.value })}
                  placeholder="Company Name [DEMO]"
                  className="w-full p-2.5 bg-slate-950 border border-slate-700 rounded-xl text-white"
                />
              </div>
              <div>
                <label className="block text-slate-400 mb-1">Tech Stack (comma separated)</label>
                <input
                  type="text"
                  value={newInternship.techStack}
                  onChange={(e) => setNewInternship({ ...newInternship, techStack: e.target.value })}
                  placeholder="Node.js, Express, MongoDB, REST"
                  className="w-full p-2.5 bg-slate-950 border border-slate-700 rounded-xl text-white"
                />
              </div>
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <button type="button" onClick={() => setIsAddInternshipOpen(false)} className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 text-xs">Cancel</button>
              <button type="submit" className="px-4 py-2 rounded-xl bg-emerald-600 text-white text-xs font-bold">Publish</button>
            </div>
          </form>
        </div>
      )}

      {/* ADD EVENT MODAL */}
      {isAddEventOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <form onSubmit={handleCreateEvent} className="bg-slate-900 border border-slate-800 p-6 sm:p-8 rounded-3xl max-w-lg w-full space-y-4">
            <h3 className="text-lg font-bold text-white">Schedule Campus Event</h3>
            <div className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-400 mb-1">Event Title</label>
                <input
                  type="text"
                  required
                  value={newEvent.title}
                  onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
                  placeholder="e.g. AI & Generative Modeling Bootcamp [DEMO]"
                  className="w-full p-2.5 bg-slate-950 border border-slate-700 rounded-xl text-white"
                />
              </div>
              <div>
                <label className="block text-slate-400 mb-1">Category</label>
                <select
                  value={newEvent.category}
                  onChange={(e) => setNewEvent({ ...newEvent, category: e.target.value })}
                  className="w-full p-2.5 bg-slate-950 border border-slate-700 rounded-xl text-white"
                >
                  <option value="Hackathons">Hackathons</option>
                  <option value="Workshops">Workshops</option>
                  <option value="Seminars">Seminars</option>
                  <option value="Coding competitions">Coding competitions</option>
                  <option value="Placement drives">Placement drives</option>
                </select>
              </div>
              <div>
                <label className="block text-slate-400 mb-1">Date & Location</label>
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="date"
                    value={newEvent.date}
                    onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
                    className="p-2.5 bg-slate-950 border border-slate-700 rounded-xl text-white"
                  />
                  <input
                    type="text"
                    value={newEvent.location}
                    onChange={(e) => setNewEvent({ ...newEvent, location: e.target.value })}
                    placeholder="SVIT Auditorium"
                    className="p-2.5 bg-slate-950 border border-slate-700 rounded-xl text-white"
                  />
                </div>
              </div>
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <button type="button" onClick={() => setIsAddEventOpen(false)} className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 text-xs">Cancel</button>
              <button type="submit" className="px-4 py-2 rounded-xl bg-rose-600 text-white text-xs font-bold">Create Event</button>
            </div>
          </form>
        </div>
      )}

      {/* ADD RESOURCE MODAL */}
      {isAddResourceOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <form onSubmit={handleCreateResource} className="bg-slate-900 border border-slate-800 p-6 sm:p-8 rounded-3xl max-w-lg w-full space-y-4">
            <h3 className="text-lg font-bold text-white">Add Learning Resource</h3>
            <div className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-400 mb-1">Resource Title</label>
                <input
                  type="text"
                  required
                  value={newResource.title}
                  onChange={(e) => setNewResource({ ...newResource, title: e.target.value })}
                  placeholder="e.g. Modern React & Redux Architecture"
                  className="w-full p-2.5 bg-slate-950 border border-slate-700 rounded-xl text-white"
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-slate-400 mb-1">Category</label>
                  <select
                    value={newResource.category}
                    onChange={(e) => setNewResource({ ...newResource, category: e.target.value })}
                    className="w-full p-2.5 bg-slate-950 border border-slate-700 rounded-xl text-white"
                  >
                    <option value="Web Development">Web Development</option>
                    <option value="Data Structures">Data Structures</option>
                    <option value="Java">Java</option>
                    <option value="Python">Python</option>
                    <option value="Aptitude">Aptitude</option>
                  </select>
                </div>
                <div>
                  <label className="block text-slate-400 mb-1">Difficulty</label>
                  <select
                    value={newResource.difficulty}
                    onChange={(e) => setNewResource({ ...newResource, difficulty: e.target.value })}
                    className="w-full p-2.5 bg-slate-950 border border-slate-700 rounded-xl text-white"
                  >
                    <option value="Beginner">Beginner</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Advanced">Advanced</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <button type="button" onClick={() => setIsAddResourceOpen(false)} className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 text-xs">Cancel</button>
              <button type="submit" className="px-4 py-2 rounded-xl bg-indigo-600 text-white text-xs font-bold">Add Resource</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default AdminDashboardPage;
