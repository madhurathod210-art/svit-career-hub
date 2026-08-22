import React, { useState, useEffect } from 'react';
import {
  Sparkles,
  Code2,
  Cpu,
  Layers,
  CheckCircle2,
  Circle,
  Clock,
  BookOpen,
  ArrowRight,
  TrendingUp,
  Brain,
  Shield,
  MessageSquare,
  Users
} from 'lucide-react';
import API from '../services/api';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../components/Toast';
import confetti from 'canvas-confetti';

const SkillsExplorerPage = () => {
  const { user } = useAuth();
  const { showToast } = useToast();

  const [skills, setSkills] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [completedSkills, setCompletedSkills] = useState([]);
  const [inProgressSkills, setInProgressSkills] = useState([]);
  const [expandedSkillId, setExpandedSkillId] = useState(null);
  const [loading, setLoading] = useState(true);

  const categories = ['All', 'Programming', 'Development', 'Advanced', 'Soft Skills'];

  useEffect(() => {
    const fetchSkillsData = async () => {
      try {
        setLoading(true);
        const [skillsRes, profileRes] = await Promise.all([
          API.get('/skills'),
          API.get('/students/profile')
        ]);

        if (skillsRes.data.success) {
          setSkills(skillsRes.data.skills);
          if (skillsRes.data.skills.length > 0) {
            setExpandedSkillId(skillsRes.data.skills[0]._id);
          }
        }

        if (profileRes.data.success) {
          setCompletedSkills(profileRes.data.profile.completedSkills || []);
          setInProgressSkills(profileRes.data.profile.inProgressSkills || []);
        }
      } catch (error) {
        console.error('Error fetching skills', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSkillsData();
  }, []);

  const handleToggleSkillStatus = async (skillName, newStatus) => {
    let nextCompleted = [...completedSkills];
    let nextInProgress = [...inProgressSkills];

    if (newStatus === 'Completed') {
      if (!nextCompleted.includes(skillName)) nextCompleted.push(skillName);
      nextInProgress = nextInProgress.filter(s => s !== skillName);
      confetti({ particleCount: 40, spread: 60, origin: { y: 0.6 } });
      showToast(`Skill '${skillName}' marked as Completed! Readiness score updated.`, 'success');
    } else if (newStatus === 'In Progress') {
      if (!nextInProgress.includes(skillName)) nextInProgress.push(skillName);
      nextCompleted = nextCompleted.filter(s => s !== skillName);
      showToast(`Skill '${skillName}' marked as In Progress.`, 'info');
    } else {
      nextCompleted = nextCompleted.filter(s => s !== skillName);
      nextInProgress = nextInProgress.filter(s => s !== skillName);
      showToast(`Skill '${skillName}' reset.`, 'info');
    }

    setCompletedSkills(nextCompleted);
    setInProgressSkills(nextInProgress);

    try {
      await API.post('/students/skills', {
        completedSkills: nextCompleted,
        inProgressSkills: nextInProgress
      });
    } catch (error) {
      console.error('Error updating skills', error);
    }
  };

  const filteredSkills = skills.filter(s => {
    return selectedCategory === 'All' || s.category === selectedCategory;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      {/* Top Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 text-purple-400 border border-purple-500/20 text-xs font-semibold">
          <Sparkles className="w-3.5 h-3.5" />
          <span>SVIT Skills Explorer & Matrix</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-white">
          Master Industry-Demanded Skills
        </h1>
        <p className="text-xs sm:text-sm text-slate-400">
          Track technical and soft competencies across Beginner, Intermediate, and Advanced milestones. Each completed skill recalculates your placement benchmark.
        </p>
      </div>

      {/* Category Pills & Completed Counter */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 glass-panel p-4 rounded-2xl border border-slate-800">
        <div className="flex flex-wrap items-center gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                selectedCategory === cat
                  ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/20'
                  : 'bg-slate-900 text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2 text-xs">
          <span className="text-slate-400">Completed Skills:</span>
          <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 font-bold font-mono">
            {completedSkills.length} of {skills.length}
          </span>
        </div>
      </div>

      {/* Skills Matrix Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredSkills.map(skill => {
          const isCompleted = completedSkills.includes(skill.name);
          const isInProgress = inProgressSkills.includes(skill.name);
          const isExpanded = expandedSkillId === skill._id;

          return (
            <div
              key={skill._id}
              className={`glass-panel p-6 rounded-2xl border transition-all flex flex-col justify-between relative overflow-hidden ${
                isCompleted
                  ? 'border-emerald-500/40 bg-slate-900/90'
                  : isInProgress
                  ? 'border-blue-500/40 bg-slate-900/90'
                  : 'border-slate-800 bg-slate-900/60 hover:border-slate-700'
              }`}
            >
              <div className="space-y-4">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-purple-400 block mb-1">
                      {skill.category}
                    </span>
                    <h3 className="text-lg font-bold text-white">{skill.name}</h3>
                  </div>

                  <span className={`text-[10px] px-2.5 py-1 rounded-full font-bold uppercase tracking-wider ${
                    isCompleted
                      ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                      : isInProgress
                      ? 'bg-blue-500/10 text-blue-400 border border-blue-500/30'
                      : 'bg-slate-800 text-slate-400'
                  }`}>
                    {isCompleted ? 'Completed ✓' : isInProgress ? 'In Progress' : 'Not Started'}
                  </span>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed">{skill.description}</p>

                {/* 3-Tier Topic Structure */}
                <div className="space-y-2 pt-2 border-t border-slate-800/80">
                  <div className="bg-slate-950/60 p-2.5 rounded-xl border border-slate-800/60">
                    <span className="text-[10px] font-bold uppercase text-emerald-400 block mb-1">Beginner Tier</span>
                    <ul className="text-[11px] text-slate-300 space-y-0.5">
                      {(skill.beginner || []).map((t, idx) => (
                        <li key={idx} className="flex items-center gap-1.5 truncate">
                          <span className="text-emerald-400">•</span> {t}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="bg-slate-950/60 p-2.5 rounded-xl border border-slate-800/60">
                    <span className="text-[10px] font-bold uppercase text-blue-400 block mb-1">Intermediate Tier</span>
                    <ul className="text-[11px] text-slate-300 space-y-0.5">
                      {(skill.intermediate || []).map((t, idx) => (
                        <li key={idx} className="flex items-center gap-1.5 truncate">
                          <span className="text-blue-400">•</span> {t}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="bg-slate-950/60 p-2.5 rounded-xl border border-slate-800/60">
                    <span className="text-[10px] font-bold uppercase text-purple-400 block mb-1">Advanced Tier</span>
                    <ul className="text-[11px] text-slate-300 space-y-0.5">
                      {(skill.advanced || []).map((t, idx) => (
                        <li key={idx} className="flex items-center gap-1.5 truncate">
                          <span className="text-purple-400">•</span> {t}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* Status Action Buttons */}
              <div className="mt-6 pt-4 border-t border-slate-800/80 grid grid-cols-3 gap-1.5">
                <button
                  onClick={() => handleToggleSkillStatus(skill.name, 'Not Started')}
                  className={`py-1.5 px-2 rounded-lg text-[10px] font-semibold transition-all ${
                    !isCompleted && !isInProgress
                      ? 'bg-slate-800 text-white'
                      : 'text-slate-500 hover:text-slate-300 bg-slate-950/40'
                  }`}
                >
                  Reset
                </button>

                <button
                  onClick={() => handleToggleSkillStatus(skill.name, 'In Progress')}
                  className={`py-1.5 px-2 rounded-lg text-[10px] font-semibold transition-all ${
                    isInProgress
                      ? 'bg-blue-600 text-white font-bold'
                      : 'text-slate-400 hover:text-blue-300 bg-slate-950/40'
                  }`}
                >
                  Learning
                </button>

                <button
                  onClick={() => handleToggleSkillStatus(skill.name, 'Completed')}
                  className={`py-1.5 px-2 rounded-lg text-[10px] font-semibold transition-all ${
                    isCompleted
                      ? 'bg-emerald-600 text-white font-bold'
                      : 'text-slate-400 hover:text-emerald-300 bg-slate-950/40'
                  }`}
                >
                  Mastered ✓
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SkillsExplorerPage;
