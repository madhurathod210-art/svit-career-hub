import React, { useState, useEffect } from 'react';
import {
  Compass,
  Search,
  Filter,
  MapPin,
  Clock,
  Calendar,
  DollarSign,
  Building2,
  ExternalLink,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Send,
  Briefcase
} from 'lucide-react';
import API from '../services/api';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../components/Toast';
import DemoBadge from '../components/DemoBadge';
import confetti from 'canvas-confetti';

const InternshipHubPage = () => {
  const { user } = useAuth();
  const { showToast } = useToast();

  const [internships, setInternships] = useState([]);
  const [search, setSearch] = useState('');
  const [techFilter, setTechFilter] = useState('All');
  const [workTypeFilter, setWorkTypeFilter] = useState('All');
  const [locationFilter, setLocationFilter] = useState('All');
  const [appliedMap, setAppliedMap] = useState({});
  const [selectedInternship, setSelectedInternship] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInternships = async () => {
      try {
        setLoading(true);
        const res = await API.get('/internships');
        if (res.data.success) {
          setInternships(res.data.internships);
        }
      } catch (error) {
        console.error('Error fetching internships', error);
      } finally {
        setLoading(false);
      }
    };

    fetchInternships();
  }, []);

  const filteredInternships = internships.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(search.toLowerCase()) ||
      item.company.toLowerCase().includes(search.toLowerCase()) ||
      (item.techStack || []).some(t => t.toLowerCase().includes(search.toLowerCase()));

    const matchesTech = techFilter === 'All' || (item.techStack || []).some(t => t.toLowerCase().includes(techFilter.toLowerCase()));
    const matchesWorkType = workTypeFilter === 'All' || item.workType?.toLowerCase() === workTypeFilter.toLowerCase();
    const matchesLocation = locationFilter === 'All' || item.location?.toLowerCase().includes(locationFilter.toLowerCase());

    return matchesSearch && matchesTech && matchesWorkType && matchesLocation;
  });

  const handleApply = (internship) => {
    setAppliedMap(prev => ({ ...prev, [internship._id]: true }));
    setSelectedInternship(null);
    showToast(`Application submitted for ${internship.title} at ${internship.company}!`, 'success');
    confetti({ particleCount: 60, spread: 60, origin: { y: 0.6 } });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Top Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold">
          <Compass className="w-3.5 h-3.5" />
          <span>SVIT Internship Discovery Hub</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-white">
          Find Your Next Internship
        </h1>
        <p className="text-xs sm:text-sm text-slate-400">
          Discover verified summer, semester-long, and remote tech internships. Build industry experience and boost your career readiness score.
        </p>
      </div>

      {/* Official Transparency Notice */}
      <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0" />
          <p className="text-xs text-slate-400">
            <span className="font-semibold text-slate-200">Institutional Policy:</span> All opportunities are curated for skill development. Sample listings are clearly designated with demo tags.
          </p>
        </div>
        <DemoBadge text="DEMO LISTINGS" className="shrink-0 hidden sm:inline-flex" />
      </div>

      {/* Multi-filter & Search Bar */}
      <div className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {/* Search Input */}
          <div className="relative">
            <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by role, company, or tech..."
              className="w-full pl-10 pr-4 py-2.5 bg-slate-900 border border-slate-700/80 rounded-xl text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-emerald-500"
            />
          </div>

          {/* Technology Filter */}
          <div>
            <select
              value={techFilter}
              onChange={(e) => setTechFilter(e.target.value)}
              className="w-full px-3 py-2.5 bg-slate-900 border border-slate-700/80 rounded-xl text-xs text-slate-300 focus:outline-none focus:border-emerald-500"
            >
              <option value="All">All Technologies</option>
              <option value="React">React / Web</option>
              <option value="Python">Python / AI/ML</option>
              <option value="AWS">AWS / Cloud</option>
              <option value="Embedded C">Embedded & IoT</option>
              <option value="Wireshark">Cybersecurity</option>
            </select>
          </div>

          {/* Work Type Filter */}
          <div>
            <select
              value={workTypeFilter}
              onChange={(e) => setWorkTypeFilter(e.target.value)}
              className="w-full px-3 py-2.5 bg-slate-900 border border-slate-700/80 rounded-xl text-xs text-slate-300 focus:outline-none focus:border-emerald-500"
            >
              <option value="All">All Work Modes</option>
              <option value="Remote">Remote</option>
              <option value="Hybrid">Hybrid</option>
              <option value="On-site">On-site</option>
            </select>
          </div>

          {/* Location Filter */}
          <div>
            <select
              value={locationFilter}
              onChange={(e) => setLocationFilter(e.target.value)}
              className="w-full px-3 py-2.5 bg-slate-900 border border-slate-700/80 rounded-xl text-xs text-slate-300 focus:outline-none focus:border-emerald-500"
            >
              <option value="All">All Locations</option>
              <option value="Hyderabad">Hyderabad / Secunderabad</option>
              <option value="Bangalore">Bangalore</option>
              <option value="Remote">Remote (Anywhere)</option>
            </select>
          </div>
        </div>

        <div className="flex items-center justify-between text-xs text-slate-400 pt-2">
          <span>Showing {filteredInternships.length} opportunities</span>
          <button
            onClick={() => { setSearch(''); setTechFilter('All'); setWorkTypeFilter('All'); setLocationFilter('All'); }}
            className="text-emerald-400 hover:text-emerald-300 font-semibold"
          >
            Reset Filters
          </button>
        </div>
      </div>

      {/* Internships Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredInternships.map(intern => {
          const isApplied = !!appliedMap[intern._id];

          return (
            <div
              key={intern._id}
              className="glass-panel p-6 rounded-2xl border border-slate-800 hover:border-emerald-500/40 transition-all flex flex-col justify-between group relative overflow-hidden"
            >
              <div className="space-y-4">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="text-base font-bold text-white group-hover:text-emerald-400 transition-colors leading-tight">
                      {intern.title}
                    </h3>
                    <p className="text-xs text-slate-400 mt-1 flex items-center gap-1.5">
                      <Building2 className="w-3.5 h-3.5 text-emerald-400" />
                      <span>{intern.company}</span>
                    </p>
                  </div>
                  <DemoBadge />
                </div>

                <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed">{intern.description}</p>

                {/* Metadata Badges */}
                <div className="grid grid-cols-2 gap-2 text-xs text-slate-300">
                  <div className="flex items-center gap-1.5 bg-slate-900/60 p-2 rounded-lg border border-slate-800">
                    <MapPin className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                    <span className="truncate">{intern.location}</span>
                  </div>
                  <div className="flex items-center gap-1.5 bg-slate-900/60 p-2 rounded-lg border border-slate-800">
                    <Clock className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                    <span className="truncate">{intern.duration}</span>
                  </div>
                  <div className="flex items-center gap-1.5 bg-slate-900/60 p-2 rounded-lg border border-slate-800">
                    <DollarSign className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span className="truncate font-mono">{intern.stipend}</span>
                  </div>
                  <div className="flex items-center gap-1.5 bg-slate-900/60 p-2 rounded-lg border border-slate-800">
                    <Calendar className="w-3.5 h-3.5 text-rose-400 shrink-0" />
                    <span className="truncate">Deadline: {intern.deadline}</span>
                  </div>
                </div>

                {/* Tech Stack Chips */}
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-500 block mb-1">Required Tech</span>
                  <div className="flex flex-wrap gap-1">
                    {(intern.techStack || []).map((t, idx) => (
                      <span key={idx} className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-300 text-[10px] font-mono border border-emerald-500/20">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center justify-between">
                <button
                  onClick={() => setSelectedInternship(intern)}
                  className="text-xs text-slate-400 hover:text-white"
                >
                  Full Requirements →
                </button>

                {isApplied ? (
                  <span className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-emerald-500/15 border border-emerald-500/40 text-emerald-300 text-xs font-bold">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    Applied
                  </span>
                ) : (
                  <button
                    onClick={() => handleApply(intern)}
                    className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-md shadow-emerald-600/20 transition-all hover:scale-105"
                  >
                    <span>Apply Now</span>
                    <Send className="w-3 h-3" />
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Full Requirements Modal */}
      {selectedInternship && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="bg-slate-900 border border-slate-800 p-6 sm:p-8 rounded-3xl max-w-xl w-full max-h-[90vh] overflow-y-auto space-y-6">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="text-xl font-bold text-white">{selectedInternship.title}</h3>
                <p className="text-xs text-slate-400 mt-0.5">{selectedInternship.company} • {selectedInternship.location}</p>
              </div>
              <button onClick={() => setSelectedInternship(null)} className="p-1 text-slate-400 hover:text-white">✕</button>
            </div>

            <div className="space-y-4 text-xs">
              <div>
                <h5 className="font-bold text-slate-200 uppercase tracking-wider mb-1">Description</h5>
                <p className="text-slate-300 leading-relaxed">{selectedInternship.description}</p>
              </div>

              <div>
                <h5 className="font-bold text-slate-200 uppercase tracking-wider mb-1">Key Eligibility & Requirements</h5>
                <ul className="space-y-1.5">
                  {(selectedInternship.requirements || []).map((req, idx) => (
                    <li key={idx} className="text-slate-300 flex items-start gap-2">
                      <span className="text-emerald-400 font-bold">•</span>
                      <span>{req}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-slate-400">
                <span>Stipend: <strong className="text-emerald-400">{selectedInternship.stipend}</strong></span> •
                <span className="ml-2">Duration: <strong className="text-white">{selectedInternship.duration}</strong></span>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-800 flex justify-end gap-3">
              <button
                onClick={() => setSelectedInternship(null)}
                className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 text-xs font-semibold hover:bg-slate-700"
              >
                Close
              </button>
              <button
                onClick={() => handleApply(selectedInternship)}
                className="px-5 py-2 rounded-xl bg-emerald-600 text-white text-xs font-bold hover:bg-emerald-500 flex items-center gap-1.5"
              >
                <span>Submit Application</span>
                <Send className="w-3 h-3" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default InternshipHubPage;
