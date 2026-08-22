import React, { useState, useEffect, useRef } from 'react';
import { Search, X, Building2, Briefcase, Sparkles, Map, BookOpen, Calendar, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import API from '../services/api';

const GlobalSearchModal = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState({ companies: [], internships: [], skills: [], roadmaps: [], resources: [], events: [] });
  const [loading, setLoading] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    } else {
      setQuery('');
      setResults({ companies: [], internships: [], skills: [], roadmaps: [], resources: [], events: [] });
    }
  }, [isOpen]);

  useEffect(() => {
    if (!query.trim()) {
      setResults({ companies: [], internships: [], skills: [], roadmaps: [], resources: [], events: [] });
      return;
    }

    const timer = setTimeout(async () => {
      setLoading(true);
      try {
        const res = await API.get(`/search?q=${encodeURIComponent(query)}`);
        if (res.data.success) {
          setResults(res.data.results);
        }
      } catch (error) {
        console.error('Search error', error);
      } finally {
        setLoading(false);
      }
    }, 200);

    return () => clearTimeout(timer);
  }, [query]);

  if (!isOpen) return null;

  const totalResults =
    (results.companies?.length || 0) +
    (results.internships?.length || 0) +
    (results.skills?.length || 0) +
    (results.roadmaps?.length || 0) +
    (results.resources?.length || 0) +
    (results.events?.length || 0);

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="fixed inset-0" onClick={onClose} />
      <div className="relative w-full max-w-3xl bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden z-10">
        {/* Search Header */}
        <div className="flex items-center px-4 py-3.5 border-b border-slate-800 bg-slate-900/90">
          <Search className="w-5 h-5 text-blue-400 shrink-0 mr-3" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search companies, internships, roadmaps, skills, resources, events..."
            className="w-full bg-transparent border-none text-white text-base focus:outline-none focus:ring-0 placeholder:text-slate-500"
          />
          {query && (
            <button onClick={() => setQuery('')} className="p-1 text-slate-400 hover:text-white rounded-lg mr-2">
              <X className="w-4 h-4" />
            </button>
          )}
          <span className="hidden sm:inline-block px-2 py-0.5 text-xs text-slate-400 bg-slate-800 border border-slate-700 rounded font-mono">ESC</span>
        </div>

        {/* Search Body */}
        <div className="max-h-[60vh] overflow-y-auto p-4 space-y-6">
          {loading && (
            <div className="py-12 text-center text-slate-400">
              <div className="inline-block animate-spin rounded-full h-6 w-6 border-2 border-blue-500 border-t-transparent mb-2"></div>
              <p className="text-sm">Searching across SVIT portal...</p>
            </div>
          )}

          {!loading && !query && (
            <div className="py-8 text-center text-slate-500">
              <p className="text-sm">Type a keyword to discover placements, roadmaps, internships, and courses.</p>
              <div className="flex flex-wrap justify-center gap-2 mt-4">
                {['React', 'Amazon', 'Full-Stack', 'Python', 'Aptitude', 'Hackathon', 'Cybersecurity'].map(tag => (
                  <button
                    key={tag}
                    onClick={() => setQuery(tag)}
                    className="px-2.5 py-1 text-xs rounded-full bg-slate-800/80 hover:bg-slate-700 text-slate-300 border border-slate-700/60 transition-colors"
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          )}

          {!loading && query && totalResults === 0 && (
            <div className="py-12 text-center text-slate-400">
              <p className="text-base font-medium text-slate-300">No matches found for "{query}"</p>
              <p className="text-xs text-slate-500 mt-1">Try another keyword like 'Java', 'Infosys', 'Cloud', or 'Internship'</p>
            </div>
          )}

          {!loading && totalResults > 0 && (
            <>
              {/* Companies */}
              {results.companies?.length > 0 && (
                <div>
                  <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-blue-400 mb-2">
                    <Building2 className="w-3.5 h-3.5" /> Companies ({results.companies.length})
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {results.companies.map(c => (
                      <Link
                        key={c._id}
                        to="/placements"
                        onClick={onClose}
                        className="flex items-center justify-between p-3 rounded-xl bg-slate-800/50 hover:bg-slate-800 border border-slate-700/50 hover:border-blue-500/40 transition-all group"
                      >
                        <div>
                          <h5 className="text-sm font-semibold text-white group-hover:text-blue-400 transition-colors">{c.name}</h5>
                          <p className="text-xs text-slate-400">{c.industry}</p>
                        </div>
                        <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-blue-400 group-hover:translate-x-1 transition-all" />
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* Roadmaps */}
              {results.roadmaps?.length > 0 && (
                <div>
                  <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-cyan-400 mb-2">
                    <Map className="w-3.5 h-3.5" /> Career Roadmaps ({results.roadmaps.length})
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {results.roadmaps.map(r => (
                      <Link
                        key={r._id}
                        to="/careers"
                        onClick={onClose}
                        className="flex items-center justify-between p-3 rounded-xl bg-slate-800/50 hover:bg-slate-800 border border-slate-700/50 hover:border-cyan-500/40 transition-all group"
                      >
                        <div>
                          <h5 className="text-sm font-semibold text-white group-hover:text-cyan-400 transition-colors">{r.title}</h5>
                          <p className="text-xs text-slate-400">{r.category} • {r.estimatedDuration}</p>
                        </div>
                        <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-cyan-400 group-hover:translate-x-1 transition-all" />
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* Internships */}
              {results.internships?.length > 0 && (
                <div>
                  <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-emerald-400 mb-2">
                    <Briefcase className="w-3.5 h-3.5" /> Internships ({results.internships.length})
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {results.internships.map(i => (
                      <Link
                        key={i._id}
                        to="/internships"
                        onClick={onClose}
                        className="flex items-center justify-between p-3 rounded-xl bg-slate-800/50 hover:bg-slate-800 border border-slate-700/50 hover:border-emerald-500/40 transition-all group"
                      >
                        <div>
                          <h5 className="text-sm font-semibold text-white group-hover:text-emerald-400 transition-colors">{i.title}</h5>
                          <p className="text-xs text-slate-400">{i.company} • {i.location}</p>
                        </div>
                        <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-emerald-400 group-hover:translate-x-1 transition-all" />
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* Skills */}
              {results.skills?.length > 0 && (
                <div>
                  <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-purple-400 mb-2">
                    <Sparkles className="w-3.5 h-3.5" /> Skills Matrix ({results.skills.length})
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {results.skills.map(s => (
                      <Link
                        key={s._id}
                        to="/skills"
                        onClick={onClose}
                        className="px-3 py-1.5 rounded-lg bg-slate-800/60 hover:bg-purple-950/40 border border-slate-700/60 hover:border-purple-500/50 text-xs font-medium text-slate-200 transition-all"
                      >
                        <span className="font-semibold text-purple-300">{s.name}</span> <span className="text-slate-400 text-[10px]">({s.category})</span>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* Resources */}
              {results.resources?.length > 0 && (
                <div>
                  <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-400 mb-2">
                    <BookOpen className="w-3.5 h-3.5" /> Learning Resources ({results.resources.length})
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {results.resources.map(resItem => (
                      <Link
                        key={resItem._id}
                        to="/resources"
                        onClick={onClose}
                        className="flex items-center justify-between p-3 rounded-xl bg-slate-800/50 hover:bg-slate-800 border border-slate-700/50 hover:border-amber-500/40 transition-all group"
                      >
                        <div>
                          <h5 className="text-sm font-semibold text-white group-hover:text-amber-400 transition-colors">{resItem.title}</h5>
                          <p className="text-xs text-slate-400">{resItem.category} • {resItem.difficulty}</p>
                        </div>
                        <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-amber-400 group-hover:translate-x-1 transition-all" />
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* Events */}
              {results.events?.length > 0 && (
                <div>
                  <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-rose-400 mb-2">
                    <Calendar className="w-3.5 h-3.5" /> Events & Drives ({results.events.length})
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {results.events.map(e => (
                      <Link
                        key={e._id}
                        to="/events"
                        onClick={onClose}
                        className="flex items-center justify-between p-3 rounded-xl bg-slate-800/50 hover:bg-slate-800 border border-slate-700/50 hover:border-rose-500/40 transition-all group"
                      >
                        <div>
                          <h5 className="text-sm font-semibold text-white group-hover:text-rose-400 transition-colors">{e.title}</h5>
                          <p className="text-xs text-slate-400">{e.date} • {e.category}</p>
                        </div>
                        <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-rose-400 group-hover:translate-x-1 transition-all" />
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default GlobalSearchModal;
