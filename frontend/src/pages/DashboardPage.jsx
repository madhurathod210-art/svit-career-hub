import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  GraduationCap,
  Sparkles,
  Award,
  BookOpen,
  Briefcase,
  Compass,
  FileText,
  CheckCircle2,
  Clock,
  ArrowRight,
  TrendingUp,
  Target,
  Code2,
  FolderGit2,
  Calendar,
  ExternalLink,
  ChevronRight,
  Plus
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import API from '../services/api';
import ReadinessGauge from '../components/ReadinessGauge';
import DemoBadge from '../components/DemoBadge';

const DashboardPage = () => {
  const { user } = useAuth();
  const [profile, setProfile] = useState(null);
  const [readinessData, setReadinessData] = useState({
    totalScore: 78,
    breakdown: {},
    strongAreas: [],
    areasToImprove: [],
    recommendedActions: []
  });
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        const [profileRes, readinessRes, eventsRes] = await Promise.all([
          API.get('/students/profile'),
          API.get('/students/readiness'),
          API.get('/events')
        ]);

        if (profileRes.data.success) {
          setProfile(profileRes.data.profile);
        }
        if (readinessRes.data.success) {
          setReadinessData(readinessRes.data);
        }
        if (eventsRes.data.success) {
          setUpcomingEvents(eventsRes.data.events.slice(0, 3));
        }
      } catch (error) {
        console.error('Error fetching dashboard data', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  // Compute 7-step Career Journey Stages & Percentages
  const completedSkillsCount = profile?.completedSkills?.length || 0;
  const projectsCount = profile?.projects?.length || 0;
  const internshipsCount = profile?.internships?.length || 0;
  const hasResume = profile?.resumeDetails?.objective && profile?.resumeDetails?.headline ? 100 : 40;

  const journeyPipeline = [
    {
      id: 'step_profile',
      name: 'Profile',
      percentage: profile?.name && profile?.department ? 100 : 50,
      description: `${profile?.department || 'Engineering'} • ${profile?.year || '1st Year'}`,
      link: '#profile-details',
      status: 'Completed'
    },
    {
      id: 'step_skills',
      name: 'Skills',
      percentage: Math.min(100, Math.round((completedSkillsCount / 6) * 100)),
      description: `${completedSkillsCount} skills validated`,
      link: '/skills',
      status: completedSkillsCount >= 5 ? 'Completed' : 'In Progress'
    },
    {
      id: 'step_projects',
      name: 'Projects',
      percentage: Math.min(100, Math.round((projectsCount / 2) * 100)),
      description: `${projectsCount} portfolio repos`,
      link: '#projects-section',
      status: projectsCount >= 2 ? 'Completed' : projectsCount === 1 ? 'In Progress' : 'Not Started'
    },
    {
      id: 'step_internship',
      name: 'Internship',
      percentage: internshipsCount > 0 ? 100 : 30,
      description: internshipsCount > 0 ? `${internshipsCount} verified role` : 'Exploration stage',
      link: '/internships',
      status: internshipsCount > 0 ? 'Completed' : 'In Progress'
    },
    {
      id: 'step_resume',
      name: 'Resume',
      percentage: hasResume,
      description: hasResume === 100 ? 'ATS profile ready' : 'Draft stage',
      link: '/resume-builder',
      status: hasResume === 100 ? 'Completed' : 'In Progress'
    },
    {
      id: 'step_placement',
      name: 'Placement',
      percentage: readinessData.totalScore >= 70 ? 80 : 45,
      description: 'Aptitude & Tech Rounds',
      link: '/placements',
      status: readinessData.totalScore >= 70 ? 'In Progress' : 'Not Started'
    },
    {
      id: 'step_career',
      name: 'Career',
      percentage: readinessData.totalScore >= 80 ? 75 : 35,
      description: profile?.careerGoal || 'Software Developer',
      link: '/careers',
      status: 'In Progress'
    }
  ];

  if (loading) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center">
        <div className="text-center space-y-3">
          <div className="inline-block animate-spin rounded-full h-10 w-10 border-2 border-blue-500 border-t-transparent"></div>
          <p className="text-sm text-slate-400">Loading student career dashboard...</p>
        </div>
      </div>
    );
  }

  const studentName = profile?.name || user?.name || 'SVIT Student';

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      {/* Welcome Banner */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-slate-800 relative overflow-hidden bg-gradient-to-r from-slate-900 via-slate-900/90 to-blue-950/30">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-300 text-xs font-semibold mb-3">
              <span>{profile?.department || user?.department || 'CSE'}</span>
              <span>•</span>
              <span>{profile?.year || user?.year || '3rd Year'}</span>
              <span>•</span>
              <span>Roll: {profile?.studentId || user?.studentId || '22SVIT0401'}</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-black text-white">
              Welcome, {studentName} 👋
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-2xl">
              Target Career: <span className="text-blue-400 font-semibold">{profile?.careerGoal || 'Software Developer'}</span>. Your profile is automatically evaluated against industry benchmark factors.
            </p>
          </div>

          <div className="flex flex-wrap gap-2.5">
            <Link
              to="/careers"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold shadow-lg shadow-blue-600/20 transition-all hover:scale-105"
            >
              <Target className="w-4 h-4" />
              <span>Career Roadmap</span>
            </Link>
            <Link
              to="/resume-builder"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-bold transition-all hover:scale-105"
            >
              <Award className="w-4 h-4 text-amber-400" />
              <span>ATS Resume</span>
            </Link>
          </div>
        </div>
      </div>

      {/* 6 Key Metric Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
        <div className="glass-panel p-4 rounded-2xl border border-slate-800 hover:border-blue-500/30 transition-all">
          <div className="flex items-center justify-between text-blue-400 mb-2">
            <Sparkles className="w-5 h-5" />
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Benchmark</span>
          </div>
          <p className="text-2xl font-extrabold text-white">{readinessData.totalScore}<span className="text-xs text-slate-500 font-normal">/100</span></p>
          <p className="text-xs font-semibold text-slate-300 mt-0.5">Readiness Score</p>
        </div>

        <div className="glass-panel p-4 rounded-2xl border border-slate-800 hover:border-purple-500/30 transition-all">
          <div className="flex items-center justify-between text-purple-400 mb-2">
            <Code2 className="w-5 h-5" />
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Skills</span>
          </div>
          <p className="text-2xl font-extrabold text-white">{completedSkillsCount}</p>
          <p className="text-xs font-semibold text-slate-300 mt-0.5">Skills Completed</p>
        </div>

        <div className="glass-panel p-4 rounded-2xl border border-slate-800 hover:border-cyan-500/30 transition-all">
          <div className="flex items-center justify-between text-cyan-400 mb-2">
            <FolderGit2 className="w-5 h-5" />
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Portfolio</span>
          </div>
          <p className="text-2xl font-extrabold text-white">{projectsCount}</p>
          <p className="text-xs font-semibold text-slate-300 mt-0.5">Projects</p>
        </div>

        <div className="glass-panel p-4 rounded-2xl border border-slate-800 hover:border-amber-500/30 transition-all">
          <div className="flex items-center justify-between text-amber-400 mb-2">
            <Award className="w-5 h-5" />
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Certs</span>
          </div>
          <p className="text-2xl font-extrabold text-white">{profile?.certifications?.length || 1}</p>
          <p className="text-xs font-semibold text-slate-300 mt-0.5">Certifications</p>
        </div>

        <div className="glass-panel p-4 rounded-2xl border border-slate-800 hover:border-emerald-500/30 transition-all">
          <div className="flex items-center justify-between text-emerald-400 mb-2">
            <Compass className="w-5 h-5" />
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Industry</span>
          </div>
          <p className="text-2xl font-extrabold text-white">{internshipsCount}</p>
          <p className="text-xs font-semibold text-slate-300 mt-0.5">Internships</p>
        </div>

        <div className="glass-panel p-4 rounded-2xl border border-slate-800 hover:border-rose-500/30 transition-all">
          <div className="flex items-center justify-between text-rose-400 mb-2">
            <Briefcase className="w-5 h-5" />
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Placement</span>
          </div>
          <p className="text-2xl font-extrabold text-white">{readinessData.totalScore >= 70 ? 'Eligible' : 'Prep'}</p>
          <p className="text-xs font-semibold text-slate-300 mt-0.5">Prep Status</p>
        </div>
      </div>

      {/* Career Readiness Score Engine Card */}
      <ReadinessGauge
        score={readinessData.totalScore}
        breakdown={readinessData.breakdown}
        strongAreas={readinessData.strongAreas}
        areasToImprove={readinessData.areasToImprove}
        recommendedActions={readinessData.recommendedActions}
      />

      {/* My Career Journey - 7 Steps Progress Section */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-slate-800">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-xl font-bold text-white">My Career Journey</h3>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20 font-semibold">
                7-Stage Pipeline
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-1">Structured progression tracking for SVIT students</p>
          </div>
          <Link to="/careers" className="text-xs font-semibold text-blue-400 hover:text-blue-300 flex items-center gap-1">
            Open Interactive Career Planner <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Horizontal Pipeline Steps */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-7 gap-3">
          {journeyPipeline.map((step, idx) => (
            <Link
              key={step.id}
              to={step.link.startsWith('#') ? '#' : step.link}
              className="p-3.5 rounded-xl bg-slate-900/70 hover:bg-slate-850 border border-slate-800 hover:border-blue-500/40 transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between text-xs mb-2">
                  <span className="font-mono text-[11px] text-slate-500">0{idx + 1}</span>
                  <span className={`text-[10px] px-1.5 py-0.5 rounded font-semibold ${
                    step.status === 'Completed' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-blue-500/10 text-blue-400'
                  }`}>
                    {step.percentage}%
                  </span>
                </div>
                <h4 className="text-sm font-bold text-white group-hover:text-blue-400 transition-colors">{step.name}</h4>
                <p className="text-[11px] text-slate-400 mt-1 line-clamp-1">{step.description}</p>
              </div>

              <div className="mt-3">
                <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${
                      step.percentage === 100 ? 'bg-emerald-500' : 'bg-blue-500'
                    }`}
                    style={{ width: `${step.percentage}%` }}
                  />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Projects & Upcoming Events Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Projects Section */}
        <div id="projects-section" className="lg:col-span-7 glass-panel p-6 rounded-2xl border border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <FolderGit2 className="w-5 h-5 text-cyan-400" />
              <h3 className="text-lg font-bold text-white">Student Projects & Portfolio</h3>
            </div>
            <Link to="/resources" className="text-xs text-cyan-400 hover:text-cyan-300 font-semibold flex items-center gap-1">
              Project Ideas <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="space-y-3">
            {(profile?.projects || []).length === 0 ? (
              <div className="p-6 text-center text-slate-500 text-xs bg-slate-900/50 rounded-xl">
                No projects added yet. Build full-stack apps to boost your readiness score!
              </div>
            ) : (
              (profile?.projects || []).map((proj, idx) => (
                <div key={idx} className="p-4 rounded-xl bg-slate-900/60 border border-slate-800/80 hover:border-slate-700 transition-all">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h4 className="text-sm font-bold text-white">{proj.title}</h4>
                      <p className="text-xs text-slate-400 mt-1 leading-relaxed">{proj.description}</p>
                    </div>
                    {proj.completed ? (
                      <span className="shrink-0 text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 font-medium">
                        Completed
                      </span>
                    ) : (
                      <span className="shrink-0 text-[10px] px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/30 font-medium">
                        In Progress
                      </span>
                    )}
                  </div>
                  <div className="flex flex-wrap items-center gap-1.5 mt-3">
                    {(proj.techStack || []).map((tech, tIdx) => (
                      <span key={tIdx} className="px-2 py-0.5 rounded bg-slate-800 text-[10px] text-slate-300 font-mono">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Upcoming SVIT Events */}
        <div className="lg:col-span-5 glass-panel p-6 rounded-2xl border border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-rose-400" />
              <h3 className="text-lg font-bold text-white">Upcoming Campus Events</h3>
            </div>
            <Link to="/events" className="text-xs text-rose-400 hover:text-rose-300 font-semibold flex items-center gap-1">
              All Events <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="space-y-3">
            {upcomingEvents.map(event => (
              <div key={event._id} className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800/80 hover:border-slate-700 transition-all">
                <div className="flex items-center justify-between text-[11px] text-rose-400 font-semibold mb-1">
                  <span>{event.category}</span>
                  <DemoBadge text="DEMO" />
                </div>
                <h4 className="text-xs font-bold text-white line-clamp-1">{event.title}</h4>
                <p className="text-[11px] text-slate-400 mt-1">{event.date} • {event.time}</p>
                <div className="mt-2.5 pt-2 border-t border-slate-800 flex items-center justify-between text-xs">
                  <span className="text-slate-500 text-[10px]">{event.location}</span>
                  <Link to="/events" className="text-blue-400 hover:text-blue-300 font-semibold text-[11px]">
                    Register →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
