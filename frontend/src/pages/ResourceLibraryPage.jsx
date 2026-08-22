import React, { useState, useEffect } from 'react';
import {
  BookOpen,
  Search,
  Filter,
  Bookmark,
  BookmarkCheck,
  CheckCircle2,
  Circle,
  ExternalLink,
  Clock,
  Sparkles,
  Layers
} from 'lucide-react';
import API from '../services/api';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../components/Toast';
import DemoBadge from '../components/DemoBadge';

const ResourceLibraryPage = () => {
  const { user } = useAuth();
  const { showToast } = useToast();

  const [resources, setResources] = useState([]);
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [difficultyFilter, setDifficultyFilter] = useState('All');
  const [loading, setLoading] = useState(true);

  const categories = [
    'All',
    'C Programming',
    'Java',
    'Python',
    'Web Development',
    'Data Structures',
    'DBMS',
    'Operating Systems',
    'Computer Networks',
    'Aptitude',
    'Interview Preparation'
  ];

  const fetchResources = async () => {
    try {
      setLoading(true);
      const res = await API.get('/resources');
      if (res.data.success) {
        setResources(res.data.resources);
      }
    } catch (error) {
      console.error('Error fetching resources', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchResources();
  }, []);

  const handleToggleBookmark = async (resourceId) => {
    try {
      const res = await API.post(`/resources/${resourceId}/bookmark`);
      if (res.data.success) {
        setResources(prev => prev.map(r => r._id === resourceId ? { ...r, isBookmarked: res.data.bookmarked } : r));
        showToast(res.data.bookmarked ? 'Resource saved to bookmarks!' : 'Bookmark removed', 'info');
      }
    } catch (error) {
      showToast('Error toggling bookmark', 'error');
    }
  };

  const handleToggleComplete = async (resourceId) => {
    try {
      const res = await API.post(`/resources/${resourceId}/complete`);
      if (res.data.success) {
        setResources(prev => prev.map(r => r._id === resourceId ? { ...r, isCompleted: res.data.completed } : r));
        showToast(res.data.completed ? 'Marked as completed! Great progress!' : 'Marked as incomplete', 'success');
      }
    } catch (error) {
      showToast('Error updating status', 'error');
    }
  };

  const filteredResources = resources.filter(r => {
    const matchesSearch = r.title.toLowerCase().includes(search.toLowerCase()) ||
      r.description.toLowerCase().includes(search.toLowerCase()) ||
      r.category.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = categoryFilter === 'All' || r.category === categoryFilter;
    const matchesDifficulty = difficultyFilter === 'All' || r.difficulty === difficultyFilter;
    return matchesSearch && matchesCategory && matchesDifficulty;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Top Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 text-xs font-semibold">
          <BookOpen className="w-3.5 h-3.5" />
          <span>SVIT Digital Resource & Tutorial Vault</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-white">
          Curated Learning Library
        </h1>
        <p className="text-xs sm:text-sm text-slate-400">
          Hand-picked programming tutorials, placement formula banks, DSA problem repositories, and core CS interview cheatsheets.
        </p>
      </div>

      {/* Filter & Search Toolbar */}
      <div className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {/* Search */}
          <div className="relative">
            <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search tutorial, subject or topic..."
              className="w-full pl-10 pr-4 py-2.5 bg-slate-900 border border-slate-700/80 rounded-xl text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-indigo-500"
            />
          </div>

          {/* Category */}
          <div>
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="w-full px-3 py-2.5 bg-slate-900 border border-slate-700/80 rounded-xl text-xs text-slate-300 focus:outline-none focus:border-indigo-500"
            >
              {categories.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>

          {/* Difficulty */}
          <div>
            <select
              value={difficultyFilter}
              onChange={(e) => setDifficultyFilter(e.target.value)}
              className="w-full px-3 py-2.5 bg-slate-900 border border-slate-700/80 rounded-xl text-xs text-slate-300 focus:outline-none focus:border-indigo-500"
            >
              <option value="All">All Difficulties</option>
              <option value="Beginner">Beginner Tier</option>
              <option value="Intermediate">Intermediate Tier</option>
              <option value="Advanced">Advanced Tier</option>
            </select>
          </div>
        </div>

        <div className="flex items-center justify-between text-xs text-slate-400 pt-2">
          <span>Found {filteredResources.length} curated study modules</span>
          <button
            onClick={() => { setSearch(''); setCategoryFilter('All'); setDifficultyFilter('All'); }}
            className="text-indigo-400 hover:text-indigo-300 font-semibold"
          >
            Reset Filters
          </button>
        </div>
      </div>

      {/* Resources Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredResources.map(res => (
          <div
            key={res._id}
            className={`glass-panel p-6 rounded-2xl border transition-all flex flex-col justify-between group relative overflow-hidden ${
              res.isCompleted ? 'border-emerald-500/30 bg-slate-900/90' : 'border-slate-800 hover:border-indigo-500/40'
            }`}
          >
            <div className="space-y-4">
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-400 px-2 py-0.5 rounded bg-indigo-500/10 border border-indigo-500/20">
                    {res.category}
                  </span>
                  <span className={`text-[10px] px-2 py-0.5 rounded font-semibold ${
                    res.difficulty === 'Beginner' ? 'bg-emerald-500/10 text-emerald-400' :
                    res.difficulty === 'Intermediate' ? 'bg-blue-500/10 text-blue-400' : 'bg-purple-500/10 text-purple-400'
                  }`}>
                    {res.difficulty}
                  </span>
                </div>

                <button
                  onClick={() => handleToggleBookmark(res._id)}
                  className={`p-1.5 rounded-lg border transition-colors ${
                    res.isBookmarked
                      ? 'bg-amber-500/20 text-amber-400 border-amber-500/40'
                      : 'bg-slate-900 text-slate-500 border-slate-800 hover:text-slate-300'
                  }`}
                  title={res.isBookmarked ? 'Bookmarked' : 'Save bookmark'}
                >
                  {res.isBookmarked ? <BookmarkCheck className="w-4 h-4" /> : <Bookmark className="w-4 h-4" />}
                </button>
              </div>

              <h3 className="text-base font-bold text-white group-hover:text-indigo-400 transition-colors leading-snug">
                {res.title}
              </h3>

              <p className="text-xs text-slate-300 line-clamp-3 leading-relaxed">{res.description}</p>

              <div className="flex items-center gap-4 text-[11px] text-slate-400 font-mono">
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-indigo-400" />
                  {res.duration}
                </span>
                <span>Type: {res.type}</span>
              </div>
            </div>

            {/* Action Bar */}
            <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center justify-between">
              <button
                onClick={() => handleToggleComplete(res._id)}
                className={`flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-xl border transition-all ${
                  res.isCompleted
                    ? 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30'
                    : 'bg-slate-900 text-slate-400 hover:text-white border-slate-800'
                }`}
              >
                {res.isCompleted ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> : <Circle className="w-3.5 h-3.5" />}
                <span>{res.isCompleted ? 'Completed' : 'Mark Done'}</span>
              </button>

              <a
                href={res.link}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1 text-xs font-bold text-indigo-400 hover:text-indigo-300"
              >
                <span>Open Guide</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ResourceLibraryPage;
