import React, { useState, useEffect } from 'react';
import {
  Briefcase,
  Search,
  Filter,
  Building2,
  ExternalLink,
  Code2,
  CheckCircle,
  HelpCircle,
  Award,
  BookOpen,
  ArrowRight,
  ShieldCheck,
  ChevronDown,
  Layers,
  Sparkles,
  Play
} from 'lucide-react';
import API from '../services/api';
import DemoBadge from '../components/DemoBadge';

const PlacementHubPage = () => {
  const [companies, setCompanies] = useState([]);
  const [search, setSearch] = useState('');
  const [industryFilter, setIndustryFilter] = useState('All');
  const [activeTab, setActiveTab] = useState('companies'); // 'companies', 'aptitude', 'technical', 'hr', 'mock'
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [loading, setLoading] = useState(true);

  // Mock Interview State
  const [mockQuestionIdx, setMockQuestionIdx] = useState(0);
  const [mockAnswerVisible, setMockAnswerVisible] = useState(false);

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        setLoading(true);
        const res = await API.get('/companies');
        if (res.data.success) {
          setCompanies(res.data.companies);
        }
      } catch (error) {
        console.error('Error fetching companies', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCompanies();
  }, []);

  const filteredCompanies = companies.filter(c => {
    const matchesSearch = c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.industry.toLowerCase().includes(search.toLowerCase()) ||
      (c.jobRoles || []).some(r => r.toLowerCase().includes(search.toLowerCase()));
    const matchesIndustry = industryFilter === 'All' || c.industry.toLowerCase().includes(industryFilter.toLowerCase());
    return matchesSearch && matchesIndustry;
  });

  const mockQuestions = [
    {
      domain: "Data Structures & Algorithms",
      question: "How would you detect and remove a cycle in a Singly Linked List without using extra memory?",
      hints: "Think about Floyd's Cycle-Finding Algorithm (Tortoise and Hare pointer technique).",
      idealAnswer: "Use two pointers: slow moves by 1 step, fast moves by 2 steps. If they meet, a cycle exists. To find the loop entry point, reset slow to head while keeping fast at meeting point, then move both 1 step at a time until they meet again."
    },
    {
      domain: "Operating Systems",
      question: "Explain the difference between a Process and a Thread, and describe what happens during a Context Switch.",
      hints: "Compare memory spaces, overhead, and CPU register state saves.",
      idealAnswer: "A process has its own dedicated virtual address space, file descriptors, and security context. A thread is an execution unit inside a process sharing the same address space. Context switching between threads is faster due to shared page tables, while process context switching requires invalidating TLB caches."
    },
    {
      domain: "Database Management (DBMS)",
      question: "What are ACID properties, and how does Database Indexing speed up SELECT queries while slowing down INSERTs?",
      hints: "Atomicity, Consistency, Isolation, Durability + B-Tree balancing on write operations.",
      idealAnswer: "ACID guarantees transactional reliability. B-Tree indexes provide O(log N) lookup time for SELECT queries. However, whenever a new row is INSERTed, the database engine must also traverse and rebalance the B-Tree leaf nodes, adding write overhead."
    },
    {
      domain: "HR & Behavioral (STAR Method)",
      question: "Tell me about a challenging situation in a group academic project and how you resolved the conflict.",
      hints: "Situation -> Task -> Action -> Result format.",
      idealAnswer: "During our 3rd-year web project (Situation), our team faced a bottleneck when team members had conflicting ideas on database schemas (Task). I scheduled a collaborative whiteboard session to map out functional requirements objectively (Action). We reached consensus, finalized the schema, and delivered the sprint 2 days ahead of deadline with zero regression bugs (Result)."
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      {/* Page Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20 text-xs font-semibold">
          <Briefcase className="w-3.5 h-3.5" />
          <span>SVIT Placement & Training Hub</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-white">
          Crack Campus Placements
        </h1>
        <p className="text-xs sm:text-sm text-slate-400">
          Curated company recruitment profiles, quantitative aptitude cheat sheets, technical round practice, and STAR behavioral interview preparation.
        </p>
      </div>

      {/* Official Notice Callout */}
      <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-start gap-3">
          <ShieldCheck className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
          <div>
            <h4 className="text-xs font-bold text-white">Training & Placement Cell Transparency Notice</h4>
            <p className="text-[11px] text-slate-400 mt-0.5">
              Recruitment criteria and drives are verified by the SVIT T&P Cell. Sample company cards below are labeled as demo reference guides for interview preparation.
            </p>
          </div>
        </div>
        <DemoBadge text="DEMO RECORDS" className="shrink-0" />
      </div>

      {/* Main Tabs */}
      <div className="flex flex-wrap items-center gap-2 border-b border-slate-800 pb-3">
        {[
          { id: 'companies', label: 'Company Directory & Rounds', icon: Building2 },
          { id: 'aptitude', label: 'Aptitude & Speed Math', icon: Sparkles },
          { id: 'technical', label: 'Technical Interview Prep', icon: Code2 },
          { id: 'hr', label: 'HR Behavioral (STAR)', icon: Award },
          { id: 'mock', label: 'Mock Interview Simulator', icon: Play },
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
              activeTab === tab.id
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20'
                : 'bg-slate-900/60 text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <tab.icon className="w-4 h-4" />
            {tab.label}
          </button>
        ))}
      </div>

      {/* TAB 1: Companies Directory */}
      {activeTab === 'companies' && (
        <div className="space-y-6">
          {/* Filter & Search Bar */}
          <div className="flex flex-col sm:flex-row gap-4 justify-between items-center bg-slate-900/80 p-4 rounded-2xl border border-slate-800">
            <div className="relative w-full sm:w-80">
              <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by company or skill..."
                className="w-full pl-10 pr-4 py-2 bg-slate-950 border border-slate-700 rounded-xl text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-blue-500"
              />
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              <Filter className="w-4 h-4 text-slate-400" />
              <select
                value={industryFilter}
                onChange={(e) => setIndustryFilter(e.target.value)}
                className="bg-slate-950 border border-slate-700 text-slate-300 text-xs rounded-xl px-3 py-2 focus:outline-none focus:border-blue-500"
              >
                <option value="All">All Industries</option>
                <option value="Information Technology">Information Technology</option>
                <option value="Cloud">Cloud & AI</option>
                <option value="Semiconductors">Semiconductors & Wireless</option>
              </select>
            </div>
          </div>

          {/* Companies Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCompanies.map(company => (
              <div
                key={company._id}
                className="glass-panel p-6 rounded-2xl border border-slate-800 hover:border-blue-500/40 transition-all flex flex-col justify-between group relative overflow-hidden"
              >
                <div className="space-y-4">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center text-white font-bold text-sm">
                        {company.name[0]}
                      </div>
                      <div>
                        <h3 className="text-base font-bold text-white group-hover:text-blue-400 transition-colors">{company.name}</h3>
                        <p className="text-[11px] text-slate-400">{company.industry}</p>
                      </div>
                    </div>
                    <DemoBadge />
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed line-clamp-2">{company.description}</p>

                  <div className="space-y-2 text-xs">
                    <div>
                      <span className="text-[10px] uppercase font-bold text-slate-500 block">Job Roles</span>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {(company.jobRoles || []).map((role, idx) => (
                          <span key={idx} className="px-2 py-0.5 rounded bg-blue-500/10 text-blue-300 text-[10px] font-medium border border-blue-500/20">
                            {role}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div>
                      <span className="text-[10px] uppercase font-bold text-slate-500 block">Eligibility</span>
                      <p className="text-slate-300 text-[11px] mt-0.5">{company.eligibility}</p>
                    </div>

                    <div>
                      <span className="text-[10px] uppercase font-bold text-slate-500 block">Hiring Process Stages</span>
                      <ul className="mt-1 space-y-1">
                        {(company.hiringProcess || []).slice(0, 3).map((step, idx) => (
                          <li key={idx} className="text-[11px] text-slate-300 flex items-start gap-1.5">
                            <span className="text-blue-400 font-bold">•</span>
                            <span className="line-clamp-1">{step}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center justify-between">
                  <button
                    onClick={() => setSelectedCompany(company)}
                    className="text-xs font-bold text-blue-400 hover:text-blue-300"
                  >
                    View Prep Details →
                  </button>

                  <a
                    href={company.officialWebsite}
                    target="_blank"
                    rel="noreferrer"
                    className="text-[11px] text-slate-400 hover:text-white flex items-center gap-1"
                  >
                    Careers Site <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 2: Aptitude Practice */}
      {activeTab === 'aptitude' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { topic: "Quantitative Speed Math", formulae: "Vedic shortcuts, square roots, percentage fraction equivalents", questions: "Time & Work, Pipes & Cisterns, Relative Speed" },
            { topic: "Logical Reasoning Puzzles", formulae: "Linear & circular arrangements, blood relation trees", questions: "Syllogisms, Clocks & Calendars, Coding-Decoding" },
            { topic: "Data Interpretation (DI)", formulae: "Bar charts, pie charts, radar plots, table analysis", questions: "Compound growth rates, weighted average comparisons" },
            { topic: "Verbal Ability & Grammar", formulae: "Subject-verb agreement, idioms, sentence correction", questions: "Reading comprehension passages, para-jumbles" },
            { topic: "Probability & Combinatorics", formulae: "nCr, nPr, Bayes theorem, conditional probability", questions: "Card decks, dice rolls, seating permutations" },
            { topic: "Company Pattern Practice", formulae: "TCS NQT, Infosys InfyTQ, Capgemini cognitive tests", questions: "Timed 60-minute mock speed sets with timer" }
          ].map((item, idx) => (
            <div key={idx} className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-3">
              <span className="text-xs font-mono text-blue-400 font-bold">Module {idx + 1}</span>
              <h3 className="text-base font-bold text-white">{item.topic}</h3>
              <p className="text-xs text-slate-300"><span className="text-slate-500 font-semibold">Key Concepts:</span> {item.formulae}</p>
              <p className="text-xs text-slate-300"><span className="text-slate-500 font-semibold">Target Questions:</span> {item.questions}</p>
              <div className="pt-2">
                <a
                  href="https://www.indiabix.com/aptitude/questions-and-answers/"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 text-xs font-semibold text-blue-400 hover:text-blue-300"
                >
                  Practice Practice Questions <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* TAB 3: Technical Interview */}
      {activeTab === 'technical' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-3">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Code2 className="w-4 h-4 text-cyan-400" /> Data Structures & Algorithms
              </h3>
              <ul className="text-xs text-slate-300 space-y-2">
                <li>• Array manipulation (2-pointer, sliding window, prefix sums)</li>
                <li>• Linked list operations (reverse, cycle detection, merge sort)</li>
                <li>• Binary Trees (traversals, LCA, diameter, mirror check)</li>
                <li>• Graphs (BFS/DFS, Dijkstra's algorithm, Topological Sort)</li>
                <li>• Dynamic Programming (Knapsack, LCS, LIS, Coin Change)</li>
              </ul>
            </div>

            <div className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-3">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Layers className="w-4 h-4 text-purple-400" /> Core CS Subjects Grilling
              </h3>
              <ul className="text-xs text-slate-300 space-y-2">
                <li>• DBMS: Normalization (1NF to BCNF), Indexing, Joins, Triggers</li>
                <li>• Operating Systems: Processes vs Threads, Deadlocks, Paging, Virtual Memory</li>
                <li>• Computer Networks: TCP 3-way handshake, OSI layers, DNS lookup, SSL</li>
                <li>• OOP Concepts: Inheritance, Polymorphism, Abstraction, Encapsulation</li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: HR STAR Behavioral */}
      {activeTab === 'hr' && (
        <div className="glass-panel p-8 rounded-3xl border border-slate-800 space-y-6">
          <div className="max-w-2xl">
            <h3 className="text-xl font-bold text-white">The STAR Method Framework</h3>
            <p className="text-xs text-slate-400 mt-1">Structure every behavioral interview response to showcase leadership and tangible impact.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-slate-900/90 p-4 rounded-xl border border-slate-800">
              <span className="text-xs font-bold text-blue-400 font-mono">S - Situation</span>
              <p className="text-xs text-slate-300 mt-2">Describe the specific context, problem, or project background.</p>
            </div>
            <div className="bg-slate-900/90 p-4 rounded-xl border border-slate-800">
              <span className="text-xs font-bold text-cyan-400 font-mono">T - Task</span>
              <p className="text-xs text-slate-300 mt-2">Explain the challenge and your specific responsibility.</p>
            </div>
            <div className="bg-slate-900/90 p-4 rounded-xl border border-slate-800">
              <span className="text-xs font-bold text-amber-400 font-mono">A - Action</span>
              <p className="text-xs text-slate-300 mt-2">Detail the proactive technical and collaborative steps you took.</p>
            </div>
            <div className="bg-slate-900/90 p-4 rounded-xl border border-slate-800">
              <span className="text-xs font-bold text-emerald-400 font-mono">R - Result</span>
              <p className="text-xs text-slate-300 mt-2">Share quantifiable metrics, deliverables, and lessons learned.</p>
            </div>
          </div>
        </div>
      )}

      {/* TAB 5: Mock Interview Simulator */}
      {activeTab === 'mock' && (
        <div className="glass-panel p-8 rounded-3xl border border-slate-800 max-w-3xl mx-auto space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-blue-400" />
              <h3 className="text-lg font-bold text-white">Interactive Mock Question Simulator</h3>
            </div>
            <span className="text-xs font-mono text-slate-400">
              Question {mockQuestionIdx + 1} of {mockQuestions.length}
            </span>
          </div>

          <div className="space-y-4">
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-blue-500/10 text-blue-400 font-semibold">
              {mockQuestions[mockQuestionIdx].domain}
            </span>
            <h4 className="text-lg font-bold text-white leading-snug">
              {mockQuestions[mockQuestionIdx].question}
            </h4>
            <p className="text-xs text-slate-400 bg-slate-900/80 p-3 rounded-xl border border-slate-800">
              💡 <span className="font-semibold text-slate-300">Interviewer Hint:</span> {mockQuestions[mockQuestionIdx].hints}
            </p>

            {mockAnswerVisible ? (
              <div className="p-4 rounded-xl bg-emerald-950/30 border border-emerald-500/30 text-xs text-emerald-200 leading-relaxed animate-in fade-in">
                <span className="font-bold text-emerald-400 block mb-1">Ideal Technical Answer:</span>
                {mockQuestions[mockQuestionIdx].idealAnswer}
              </div>
            ) : (
              <button
                onClick={() => setMockAnswerVisible(true)}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200 border border-slate-700"
              >
                Reveal Model Answer
              </button>
            )}
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-slate-800">
            <button
              onClick={() => {
                setMockQuestionIdx(prev => Math.max(0, prev - 1));
                setMockAnswerVisible(false);
              }}
              disabled={mockQuestionIdx === 0}
              className="px-3 py-1.5 rounded-lg bg-slate-800 disabled:opacity-40 text-xs font-semibold text-slate-300"
            >
              ← Previous
            </button>
            <button
              onClick={() => {
                setMockQuestionIdx(prev => Math.min(mockQuestions.length - 1, prev + 1));
                setMockAnswerVisible(false);
              }}
              disabled={mockQuestionIdx === mockQuestions.length - 1}
              className="px-4 py-1.5 rounded-lg bg-blue-600 disabled:opacity-40 hover:bg-blue-500 text-xs font-semibold text-white"
            >
              Next Question →
            </button>
          </div>
        </div>
      )}

      {/* Company Detail Modal */}
      {selectedCompany && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="bg-slate-900 border border-slate-800 p-6 sm:p-8 rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto space-y-6">
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-xl font-bold text-white">{selectedCompany.name}</h3>
                  <DemoBadge />
                </div>
                <p className="text-xs text-slate-400 mt-0.5">{selectedCompany.industry}</p>
              </div>
              <button onClick={() => setSelectedCompany(null)} className="p-1 text-slate-400 hover:text-white">✕</button>
            </div>

            <div className="space-y-4 text-xs">
              <div>
                <h5 className="font-bold text-slate-200 uppercase tracking-wider mb-1">Required Skills</h5>
                <div className="flex flex-wrap gap-1.5">
                  {(selectedCompany.requiredSkills || []).map((s, idx) => (
                    <span key={idx} className="px-2.5 py-1 rounded bg-slate-800 text-blue-300 border border-slate-700 font-medium">
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h5 className="font-bold text-slate-200 uppercase tracking-wider mb-1">Preparation Tips</h5>
                <ul className="space-y-1.5">
                  {(selectedCompany.preparationTips || []).map((tip, idx) => (
                    <li key={idx} className="text-slate-300 flex items-start gap-2">
                      <span className="text-emerald-400 font-bold">•</span>
                      <span>{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h5 className="font-bold text-slate-200 uppercase tracking-wider mb-1">Package Range</h5>
                <p className="text-slate-300 font-mono">{selectedCompany.packageRange}</p>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-800 flex justify-end">
              <button
                onClick={() => setSelectedCompany(null)}
                className="px-5 py-2 rounded-xl bg-blue-600 text-white text-xs font-bold hover:bg-blue-500"
              >
                Close Details
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PlacementHubPage;
