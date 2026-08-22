import React, { useState, useEffect } from 'react';
import {
  Map,
  Compass,
  CheckCircle2,
  Clock,
  Circle,
  Sparkles,
  ArrowRight,
  TrendingUp,
  Award,
  BookOpen,
  ChevronDown,
  Layers,
  Zap,
  Check
} from 'lucide-react';
import API from '../services/api';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../components/Toast';
import DemoBadge from '../components/DemoBadge';
import confetti from 'canvas-confetti';

const CareerPlannerPage = () => {
  const { user } = useAuth();
  const { showToast } = useToast();

  const [careerPaths, setCareerPaths] = useState([]);
  const [selectedPathId, setSelectedPathId] = useState('');
  const [currentPath, setCurrentPath] = useState(null);
  const [milestoneProgress, setMilestoneProgress] = useState({});
  const [loading, setLoading] = useState(true);
  const [updatingMilestone, setUpdatingMilestone] = useState(null);

  // All 13+ career paths options
  const goalOptions = [
    { label: 'Software Developer', slug: 'cp_swe' },
    { label: 'AI/ML Engineer', slug: 'cp_aiml' },
    { label: 'Data Scientist', slug: 'cp_data_science' },
    { label: 'Cybersecurity Analyst', slug: 'cp_cyber' },
    { label: 'Cloud & DevOps Engineer', slug: 'cp_cloud_devops' },
    { label: 'Embedded & IoT Engineer', slug: 'cp_embedded_iot' },
    { label: 'Core Engineering (Mech/Civil/EEE)', slug: 'cp_core' },
    { label: 'Government & PSU Jobs (IES/GATE)', slug: 'cp_govt' },
    { label: 'Management & MBA (CAT/GMAT)', slug: 'cp_mba' },
    { label: 'Higher Studies (MS/M.Tech/PhD)', slug: 'cp_higher_studies' },
    { label: 'Tech Entrepreneurship & Startup', slug: 'cp_startup' }
  ];

  useEffect(() => {
    const fetchCareerPaths = async () => {
      try {
        setLoading(true);
        const res = await API.get('/career-paths');
        if (res.data.success && res.data.careerPaths?.length > 0) {
          setCareerPaths(res.data.careerPaths);
          const initialId = res.data.careerPaths[0]._id;
          setSelectedPathId(initialId);
          await loadPathDetails(initialId);
        }
      } catch (error) {
        console.error('Error fetching career paths', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCareerPaths();
  }, []);

  const loadPathDetails = async (pathId) => {
    try {
      const res = await API.get(`/career-paths/${pathId}`);
      if (res.data.success) {
        setCurrentPath(res.data.careerPath);
        setMilestoneProgress(res.data.userProgress || {});
      }
    } catch (error) {
      console.error('Error loading path details', error);
    }
  };

  const handleSelectGoal = async (pathId) => {
    setSelectedPathId(pathId);
    await loadPathDetails(pathId);
  };

  const handleMilestoneStatusChange = async (milestoneId, newStatus) => {
    if (!currentPath) return;
    setUpdatingMilestone(milestoneId);

    try {
      const res = await API.post(`/career-paths/${currentPath._id}/milestones/${milestoneId}`, {
        status: newStatus
      });

      if (res.data.success) {
        setMilestoneProgress(prev => ({
          ...prev,
          [milestoneId]: newStatus
        }));

        showToast(`Milestone marked as ${newStatus}`, 'success');

        if (newStatus === 'Completed') {
          confetti({
            particleCount: 50,
            spread: 60,
            origin: { y: 0.7 }
          });
        }
      }
    } catch (error) {
      showToast('Could not save milestone status', 'error');
    } finally {
      setUpdatingMilestone(null);
    }
  };

  // Compute Completion Stats for current roadmap
  const milestones = currentPath?.milestones || [];
  const completedCount = milestones.filter(m => milestoneProgress[m.id] === 'Completed').length;
  const inProgressCount = milestones.filter(m => milestoneProgress[m.id] === 'In Progress').length;
  const completionPercentage = milestones.length > 0 ? Math.round((completedCount / milestones.length) * 100) : 0;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      {/* Top Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 text-xs font-semibold">
          <Compass className="w-3.5 h-3.5" />
          <span>Interactive Career Planner & Roadmaps</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-white">
          What is your career goal?
        </h1>
        <p className="text-xs sm:text-sm text-slate-400">
          Select your target engineering or postgraduate trajectory. Track ordered milestones from foundational programming to campus placement.
        </p>
      </div>

      {/* Goal Selector Grid / Dropdown */}
      <div className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-4">
        <div className="flex items-center justify-between">
          <label className="text-xs font-bold uppercase tracking-wider text-slate-300">
            Choose Target Career Path ({careerPaths.length} Available)
          </label>
          <DemoBadge text="DEMO ROADMAPS" />
        </div>

        {/* Goal Selector Chips */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2.5">
          {careerPaths.map((path) => {
            const isSelected = selectedPathId === path._id || selectedPathId === path.slug;
            return (
              <button
                key={path._id}
                onClick={() => handleSelectGoal(path._id)}
                className={`p-3 rounded-xl text-left border transition-all text-xs font-semibold flex items-center justify-between ${
                  isSelected
                    ? 'bg-blue-600/20 border-blue-500 text-white shadow-lg shadow-blue-500/10'
                    : 'bg-slate-900/60 border-slate-800 text-slate-300 hover:bg-slate-800/80 hover:text-white'
                }`}
              >
                <span className="truncate mr-2">{path.title}</span>
                {isSelected && <Check className="w-3.5 h-3.5 text-blue-400 shrink-0" />}
              </button>
            );
          })}
        </div>
      </div>

      {/* Roadmap Content Card */}
      {currentPath && (
        <div className="glass-panel p-6 sm:p-10 rounded-3xl border border-slate-800 space-y-8 relative overflow-hidden">
          {/* Path Header & Statistics */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-slate-800">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 font-semibold">
                  {currentPath.category}
                </span>
                <span className="text-xs text-slate-400">Est. Duration: {currentPath.estimatedDuration}</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white">{currentPath.title} Roadmap</h2>
              <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-3xl">{currentPath.description}</p>
            </div>

            {/* Progress Gauge */}
            <div className="bg-slate-900/90 p-4 rounded-2xl border border-slate-800 flex items-center gap-4 shrink-0">
              <div className="text-right">
                <p className="text-2xl font-black text-white">{completionPercentage}%</p>
                <p className="text-[10px] uppercase tracking-wider text-slate-400 font-semibold">Completed</p>
              </div>
              <div className="w-16 h-16 relative flex items-center justify-center">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                  <path
                    className="text-slate-800 stroke-current"
                    strokeWidth="3.5"
                    fill="none"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                  <path
                    className="text-blue-500 stroke-current transition-all duration-700"
                    strokeWidth="3.5"
                    strokeDasharray={`${completionPercentage}, 100`}
                    strokeLinecap="round"
                    fill="none"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                </svg>
                <Sparkles className="w-5 h-5 text-blue-400 absolute" />
              </div>
            </div>
          </div>

          {/* Step-by-Step Interactive Pipeline Flow */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-300">
              Sequential Milestones (Mark Progress As You Learn)
            </h3>

            <div className="space-y-4 relative before:absolute before:inset-0 before:left-6 before:w-0.5 before:bg-slate-800 before:hidden sm:before:block">
              {milestones.map((milestone, idx) => {
                const currentStatus = milestoneProgress[milestone.id] || 'Not Started';
                const isCompleted = currentStatus === 'Completed';
                const isInProgress = currentStatus === 'In Progress';

                return (
                  <div
                    key={milestone.id || idx}
                    className={`p-5 rounded-2xl border transition-all relative ${
                      isCompleted
                        ? 'bg-slate-900/90 border-emerald-500/40 shadow-sm shadow-emerald-500/5'
                        : isInProgress
                        ? 'bg-slate-900/90 border-blue-500/40 shadow-sm shadow-blue-500/5'
                        : 'bg-slate-900/50 border-slate-800/80 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      {/* Left: Step Info */}
                      <div className="flex items-start gap-4">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 text-xs font-bold ${
                          isCompleted
                            ? 'bg-emerald-500 text-white'
                            : isInProgress
                            ? 'bg-blue-500 text-white animate-pulse'
                            : 'bg-slate-800 text-slate-400 border border-slate-700'
                        }`}>
                          {isCompleted ? <Check className="w-4 h-4" /> : idx + 1}
                        </div>

                        <div>
                          <div className="flex items-center gap-2">
                            <h4 className="text-base font-bold text-white">{milestone.title}</h4>
                            <span className={`text-[10px] px-2 py-0.5 rounded-full font-semibold ${
                              isCompleted
                                ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                                : isInProgress
                                ? 'bg-blue-500/10 text-blue-400 border border-blue-500/30'
                                : 'bg-slate-800 text-slate-400'
                            }`}>
                              {currentStatus}
                            </span>
                          </div>
                          <p className="text-xs text-slate-300 mt-1 leading-relaxed">{milestone.description}</p>

                          {/* Recommended Resources Chips */}
                          {milestone.recommendedResources?.length > 0 && (
                            <div className="flex flex-wrap items-center gap-1.5 mt-2.5">
                              <span className="text-[10px] text-slate-500 font-semibold">Recommended:</span>
                              {milestone.recommendedResources.map((res, rIdx) => (
                                <span key={rIdx} className="px-2 py-0.5 rounded bg-slate-800/80 text-slate-300 text-[10px] border border-slate-700/60 flex items-center gap-1">
                                  <BookOpen className="w-2.5 h-2.5 text-blue-400" />
                                  {res}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Right: 3-State Status Toggle */}
                      <div className="flex items-center gap-1 bg-slate-950/80 p-1.5 rounded-xl border border-slate-800 shrink-0 self-end sm:self-center">
                        <button
                          onClick={() => handleMilestoneStatusChange(milestone.id, 'Not Started')}
                          className={`px-2.5 py-1 rounded-lg text-[11px] font-medium transition-all ${
                            currentStatus === 'Not Started'
                              ? 'bg-slate-800 text-white font-bold'
                              : 'text-slate-400 hover:text-slate-200'
                          }`}
                        >
                          Not Started
                        </button>

                        <button
                          onClick={() => handleMilestoneStatusChange(milestone.id, 'In Progress')}
                          className={`px-2.5 py-1 rounded-lg text-[11px] font-medium transition-all ${
                            currentStatus === 'In Progress'
                              ? 'bg-blue-600 text-white font-bold shadow'
                              : 'text-slate-400 hover:text-blue-300'
                          }`}
                        >
                          In Progress
                        </button>

                        <button
                          onClick={() => handleMilestoneStatusChange(milestone.id, 'Completed')}
                          className={`px-2.5 py-1 rounded-lg text-[11px] font-medium transition-all ${
                            currentStatus === 'Completed'
                              ? 'bg-emerald-600 text-white font-bold shadow'
                              : 'text-slate-400 hover:text-emerald-300'
                          }`}
                        >
                          Completed ✓
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CareerPlannerPage;
