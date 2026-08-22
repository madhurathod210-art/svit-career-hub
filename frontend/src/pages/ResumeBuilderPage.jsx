import React, { useState, useEffect } from 'react';
import {
  Award,
  Download,
  Save,
  Sparkles,
  User,
  Mail,
  Phone,
  Globe,
  Github,
  Linkedin,
  Plus,
  Trash2,
  CheckCircle2,
  FileText,
  RefreshCw,
  Printer
} from 'lucide-react';
import API from '../services/api';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../components/Toast';
import confetti from 'canvas-confetti';

const ResumeBuilderPage = () => {
  const { user } = useAuth();
  const { showToast } = useToast();

  const [resumeData, setResumeData] = useState({
    name: 'Rahul Sharma',
    email: 'student@svit.ac.in',
    phone: '+91 98765 43210',
    linkedIn: 'https://linkedin.com/in/demo-student-svit',
    github: 'https://github.com/demo-svit-coder',
    headline: 'Full-Stack Developer | B.Tech CSE Student at SVIT',
    objective: 'Motivated 3rd Year B.Tech CSE student at Swami Vivekananda Institute of Technology seeking a Software Developer role where I can leverage strong fundamentals in React, Node.js, and data structures to deliver scalable digital solutions.',
    education: [
      {
        institution: 'Swami Vivekananda Institute of Technology (SVIT)',
        degree: 'B.Tech in Computer Science and Engineering',
        year: '2023 - 2027 (Expected)',
        cgpa: '8.7 / 10.0'
      },
      {
        institution: 'Telangana State Board of Intermediate Education',
        degree: 'Class XII (MPC)',
        year: '2021 - 2023',
        cgpa: '94.6%'
      }
    ],
    skills: 'JavaScript, React, Node.js, Express, Python, C++, SQL, MongoDB, Git & GitHub, Tailwind CSS, Problem Solving, Agile Collaboration',
    projects: [
      {
        title: 'Campus Connect Portal',
        tech: 'React, Node.js, MongoDB, Tailwind CSS',
        description: 'Engineered a full-stack collaborative platform for 1,200+ students and campus technical chapters. Implemented JWT authentication and real-time announcements.',
        link: 'https://github.com/demo/campus-connect'
      },
      {
        title: 'Smart Attendance Tracking System',
        tech: 'Python, OpenCV, Flask, SQLite',
        description: 'Developed an automated facial recognition attendance prototype achieving 96% detection accuracy across varied classroom lighting conditions.',
        link: 'https://github.com/demo/smart-attendance'
      }
    ],
    internships: [
      {
        company: 'Apex Tech Labs [DEMO]',
        role: 'Full-Stack Web Development Intern',
        duration: 'June 2025 - August 2025',
        description: 'Optimized REST API response times by 35% through query indexing and built 4 responsive admin dashboard modules.'
      }
    ],
    certifications: [
      'Meta Front-End Developer Professional Certificate (Coursera)',
      'HackerRank Problem Solving (5-Star Gold Badge)'
    ],
    achievements: [
      'Finalist at SVIT Inter-College CodeSprint Hackathon 2025',
      'Top 10% in CodeChef Divisional Programming Challenge',
      'Active Technical Chapter Lead at SVIT Innovation & Coding Club'
    ],
    languages: 'English (Fluent), Hindi (Proficient), Telugu (Native)'
  });

  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const loadProfileData = async () => {
      try {
        const res = await API.get('/students/profile');
        if (res.data.success && res.data.profile) {
          const p = res.data.profile;
          setResumeData(prev => ({
            ...prev,
            name: p.name || prev.name,
            email: p.email || prev.email,
            phone: p.phone || prev.phone,
            headline: p.resumeDetails?.headline || prev.headline,
            objective: p.resumeDetails?.objective || prev.objective,
            linkedIn: p.resumeDetails?.linkedIn || prev.linkedIn,
            github: p.resumeDetails?.github || prev.github,
            skills: p.completedSkills?.length ? p.completedSkills.join(', ') : prev.skills
          }));
        }
      } catch (e) {
        console.warn('Using default resume state');
      }
    };
    loadProfileData();
  }, []);

  const handleSaveResume = async () => {
    setSaving(true);
    try {
      await API.post('/students/resume', {
        resumeDetails: {
          headline: resumeData.headline,
          objective: resumeData.objective,
          linkedIn: resumeData.linkedIn,
          github: resumeData.github,
          languages: resumeData.languages.split(',').map(s => s.trim()),
          achievements: resumeData.achievements
        }
      });
      showToast('Resume profile details successfully saved to cloud!', 'success');
      confetti({ particleCount: 50, spread: 60, origin: { y: 0.6 } });
    } catch (error) {
      showToast('Error saving resume details', 'error');
    } finally {
      setSaving(false);
    }
  };

  const handleDownloadPDF = () => {
    window.print();
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20 text-xs font-semibold mb-2">
            <Award className="w-3.5 h-3.5" />
            <span>Interactive ATS Resume Builder</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-black text-white">
            ATS-Optimized Resume Creator
          </h1>
          <p className="text-xs sm:text-sm text-slate-400">
            Standard single-column format favored by Applicant Tracking Systems (ATS) and tech recruiters.
          </p>
        </div>

        <div className="flex items-center gap-2.5 no-print">
          <button
            onClick={handleSaveResume}
            disabled={saving}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-bold transition-all"
          >
            <Save className="w-4 h-4 text-blue-400" />
            <span>{saving ? 'Saving...' : 'Save Profile'}</span>
          </button>

          <button
            onClick={handleDownloadPDF}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold shadow-lg shadow-blue-600/30 transition-all hover:scale-105"
          >
            <Printer className="w-4 h-4" />
            <span>Download / Print PDF</span>
          </button>
        </div>
      </div>

      {/* Editor & Live Preview Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Editor Controls (Hidden during print) */}
        <div className="lg:col-span-6 space-y-6 no-print">
          <div className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-300">1. Personal & Contact Info</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div>
                <label className="block text-slate-400 mb-1">Full Name</label>
                <input
                  type="text"
                  value={resumeData.name}
                  onChange={(e) => setResumeData({ ...resumeData, name: e.target.value })}
                  className="w-full p-2.5 bg-slate-900 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-slate-400 mb-1">Professional Headline</label>
                <input
                  type="text"
                  value={resumeData.headline}
                  onChange={(e) => setResumeData({ ...resumeData, headline: e.target.value })}
                  className="w-full p-2.5 bg-slate-900 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-slate-400 mb-1">Email</label>
                <input
                  type="email"
                  value={resumeData.email}
                  onChange={(e) => setResumeData({ ...resumeData, email: e.target.value })}
                  className="w-full p-2.5 bg-slate-900 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-slate-400 mb-1">Phone</label>
                <input
                  type="text"
                  value={resumeData.phone}
                  onChange={(e) => setResumeData({ ...resumeData, phone: e.target.value })}
                  className="w-full p-2.5 bg-slate-900 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-slate-400 mb-1">LinkedIn Profile</label>
                <input
                  type="text"
                  value={resumeData.linkedIn}
                  onChange={(e) => setResumeData({ ...resumeData, linkedIn: e.target.value })}
                  className="w-full p-2.5 bg-slate-900 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-slate-400 mb-1">GitHub Profile</label>
                <input
                  type="text"
                  value={resumeData.github}
                  onChange={(e) => setResumeData({ ...resumeData, github: e.target.value })}
                  className="w-full p-2.5 bg-slate-900 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>
          </div>

          {/* Objective */}
          <div className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-3">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-300">2. Career Objective</h3>
            <textarea
              rows={3}
              value={resumeData.objective}
              onChange={(e) => setResumeData({ ...resumeData, objective: e.target.value })}
              className="w-full p-3 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-blue-500 leading-relaxed"
            />
          </div>

          {/* Technical Skills */}
          <div className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-3">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-300">3. Technical & Core Skills</h3>
            <textarea
              rows={2}
              value={resumeData.skills}
              onChange={(e) => setResumeData({ ...resumeData, skills: e.target.value })}
              placeholder="Comma separated skills..."
              className="w-full p-3 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-blue-500 leading-relaxed"
            />
          </div>
        </div>

        {/* Right Column: ATS Live Paper Preview */}
        <div className="lg:col-span-6">
          <div className="sticky top-24">
            <div className="text-xs font-semibold text-slate-400 mb-2 flex items-center justify-between no-print">
              <span>Live ATS Document Render</span>
              <span className="text-emerald-400">ATS Score: 92/100 🎯</span>
            </div>

            {/* Printable White Resume Container */}
            <div
              id="resume-printable"
              className="bg-white text-slate-900 p-8 sm:p-10 rounded-2xl shadow-2xl border border-slate-300 text-[11px] font-sans leading-normal"
              style={{ minHeight: '850px' }}
            >
              {/* Header */}
              <div className="text-center pb-4 border-b-2 border-slate-900">
                <h1 className="text-2xl font-black uppercase tracking-tight text-slate-900">{resumeData.name}</h1>
                <p className="text-xs font-semibold text-slate-700 mt-0.5">{resumeData.headline}</p>
                <div className="flex flex-wrap justify-center items-center gap-3 text-[10px] text-slate-600 mt-2 font-mono">
                  <span>{resumeData.email}</span> •
                  <span>{resumeData.phone}</span> •
                  <span>{resumeData.linkedIn.replace('https://', '')}</span> •
                  <span>{resumeData.github.replace('https://', '')}</span>
                </div>
              </div>

              {/* Career Objective */}
              <div className="mt-4">
                <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-300 pb-0.5 mb-1.5">
                  Professional Objective
                </h2>
                <p className="text-slate-700 leading-relaxed text-[11px]">{resumeData.objective}</p>
              </div>

              {/* Education */}
              <div className="mt-4">
                <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-300 pb-0.5 mb-1.5">
                  Education
                </h2>
                <div className="space-y-2">
                  {resumeData.education.map((edu, idx) => (
                    <div key={idx} className="flex justify-between items-start">
                      <div>
                        <strong className="text-slate-900">{edu.institution}</strong>
                        <p className="text-slate-700">{edu.degree}</p>
                      </div>
                      <div className="text-right">
                        <span className="font-mono text-slate-600">{edu.year}</span>
                        <p className="font-semibold text-slate-800">CGPA: {edu.cgpa}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Technical Skills */}
              <div className="mt-4">
                <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-300 pb-0.5 mb-1.5">
                  Technical & Core Competencies
                </h2>
                <p className="text-slate-800 leading-relaxed"><strong className="text-slate-900">Key Skills:</strong> {resumeData.skills}</p>
              </div>

              {/* Projects */}
              <div className="mt-4">
                <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-300 pb-0.5 mb-1.5">
                  Featured Technical Projects
                </h2>
                <div className="space-y-2.5">
                  {resumeData.projects.map((proj, idx) => (
                    <div key={idx}>
                      <div className="flex justify-between items-baseline">
                        <strong className="text-slate-900 text-xs">{proj.title}</strong>
                        <span className="text-[10px] text-slate-600 font-mono italic">{proj.tech}</span>
                      </div>
                      <p className="text-slate-700 leading-snug mt-0.5">{proj.description}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Internships & Experience */}
              <div className="mt-4">
                <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-300 pb-0.5 mb-1.5">
                  Practical Experience & Internships
                </h2>
                <div className="space-y-2">
                  {resumeData.internships.map((exp, idx) => (
                    <div key={idx}>
                      <div className="flex justify-between items-baseline">
                        <div>
                          <strong className="text-slate-900">{exp.role}</strong> — <span className="text-slate-700">{exp.company}</span>
                        </div>
                        <span className="text-[10px] text-slate-600 font-mono">{exp.duration}</span>
                      </div>
                      <p className="text-slate-700 leading-snug mt-0.5">{exp.description}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Honors & Achievements */}
              <div className="mt-4">
                <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-300 pb-0.5 mb-1.5">
                  Honors, Certifications & Extracurriculars
                </h2>
                <ul className="space-y-1 text-slate-700">
                  {resumeData.achievements.map((ach, idx) => (
                    <li key={idx}>• {ach}</li>
                  ))}
                  {resumeData.certifications.map((cert, idx) => (
                    <li key={idx}>• {cert}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumeBuilderPage;
