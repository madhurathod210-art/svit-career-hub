import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  GraduationCap,
  Sparkles,
  ArrowRight,
  Briefcase,
  Map,
  Compass,
  BookOpen,
  Award,
  Calendar,
  CheckCircle2,
  Users,
  Building2,
  Zap,
  ShieldCheck,
  TrendingUp,
  Code2
} from 'lucide-react';
import DemoBadge from '../components/DemoBadge';
import confetti from 'canvas-confetti';

const LandingPage = () => {
  const [stats, setStats] = useState({
    placementGuides: 85,
    careerPaths: 13,
    learningResources: 450,
    internshipsCount: 120
  });

  const handleCelebrate = () => {
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 }
    });
  };

  const journeySteps = [
    { number: '01', title: 'Profile Setup', desc: 'Define your department, year, and target aspirations.' },
    { number: '02', title: 'Skills Matrix', desc: 'Master programming, development, and soft skills tiers.' },
    { number: '03', title: 'Hands-on Projects', desc: 'Build and deploy industry-ready full-stack applications.' },
    { number: '04', title: 'Internships', desc: 'Gain real-world exposure with verified summer/remote roles.' },
    { number: '05', title: 'ATS Resume', desc: 'Generate a high-scoring resume with 1-click live preview.' },
    { number: '06', title: 'Placement Prep', desc: 'Aptitude tests, company-specific guides, and mock interviews.' },
    { number: '07', title: 'Career Launch', desc: 'Crack campus drives, higher studies, or dream job offers.' },
  ];

  return (
    <div className="space-y-24 pb-16">
      {/* Hero Section */}
      <section className="relative pt-12 sm:pt-20 lg:pt-28 overflow-hidden">
        {/* Background Ambient Glows */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-blue-600/15 blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute top-1/3 right-10 w-[350px] h-[300px] bg-cyan-500/10 blur-[100px] rounded-full pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          {/* Institutional Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900/90 border border-blue-500/30 text-blue-300 text-xs font-semibold shadow-lg mb-8 animate-in fade-in zoom-in-95 duration-500">
            <GraduationCap className="w-4 h-4 text-blue-400" />
            <span>Swami Vivekananda Institute of Technology</span>
            <span className="w-1.5 h-1.5 rounded-full bg-blue-400"></span>
            <span className="text-slate-400 font-normal">Student Career Ecosystem</span>
          </div>

          {/* Main Headings */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-white max-w-5xl mx-auto leading-[1.1]">
            Build Your Future <br />
            <span className="bg-gradient-to-r from-blue-400 via-indigo-300 to-cyan-400 bg-clip-text text-transparent">
              with SVIT Career Hub
            </span>
          </h1>

          <p className="mt-6 text-base sm:text-xl text-slate-300 max-w-3xl mx-auto font-normal leading-relaxed">
            Your personalized platform for placements, internships, skills, higher education, and structured career planning designed exclusively for SVIT students.
          </p>

          {/* Primary CTA Buttons */}
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Link
              to="/careers"
              className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-sm font-bold shadow-xl shadow-blue-600/25 transition-all hover:scale-105 active:scale-95"
            >
              <Compass className="w-4 h-4" />
              <span>Explore Careers</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              to="/register"
              onClick={handleCelebrate}
              className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-xl bg-slate-900/90 hover:bg-slate-800 text-slate-100 border border-slate-700/80 hover:border-slate-600 text-sm font-bold shadow-lg transition-all hover:scale-105"
            >
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>Create My Career Plan</span>
            </Link>
          </div>

          {/* Transparency & Official Note Banner */}
          <div className="mt-12 max-w-3xl mx-auto p-3.5 rounded-xl bg-slate-900/80 border border-slate-800/80 flex items-center justify-between gap-3 text-left">
            <div className="flex items-center gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 shrink-0" />
              <p className="text-xs text-slate-400">
                <span className="font-semibold text-slate-200">Official Notice:</span> All recruitment circulars and institutional statistics are administered directly by SVIT Training & Placement Cell.
              </p>
            </div>
            <DemoBadge text="DEMO DATA ACTIVE" className="shrink-0 hidden sm:inline-flex" />
          </div>

          {/* Animated Statistics Grid */}
          <div className="mt-16 grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            <div className="glass-panel p-6 rounded-2xl border border-slate-800 text-left relative group hover:border-blue-500/40 transition-all">
              <div className="flex items-center justify-between mb-3">
                <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center">
                  <Briefcase className="w-5 h-5" />
                </div>
                <DemoBadge />
              </div>
              <p className="text-3xl font-extrabold text-white">{stats.placementGuides}+</p>
              <p className="text-xs font-semibold text-slate-300 mt-1">Placement Preparation</p>
              <p className="text-[11px] text-slate-500 mt-1">Company-specific guides, rounds & tips</p>
            </div>

            <div className="glass-panel p-6 rounded-2xl border border-slate-800 text-left relative group hover:border-cyan-500/40 transition-all">
              <div className="flex items-center justify-between mb-3">
                <div className="w-10 h-10 rounded-xl bg-cyan-500/10 text-cyan-400 flex items-center justify-center">
                  <Map className="w-5 h-5" />
                </div>
                <DemoBadge />
              </div>
              <p className="text-3xl font-extrabold text-white">{stats.careerPaths}+</p>
              <p className="text-xs font-semibold text-slate-300 mt-1">Career Paths</p>
              <p className="text-[11px] text-slate-500 mt-1">Software, AI/ML, Cloud, Core & MBA</p>
            </div>

            <div className="glass-panel p-6 rounded-2xl border border-slate-800 text-left relative group hover:border-indigo-500/40 transition-all">
              <div className="flex items-center justify-between mb-3">
                <div className="w-10 h-10 rounded-xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center">
                  <BookOpen className="w-5 h-5" />
                </div>
                <DemoBadge />
              </div>
              <p className="text-3xl font-extrabold text-white">{stats.learningResources}+</p>
              <p className="text-xs font-semibold text-slate-300 mt-1">Learning Resources</p>
              <p className="text-[11px] text-slate-500 mt-1">Curated tutorials, notes & test sets</p>
            </div>

            <div className="glass-panel p-6 rounded-2xl border border-slate-800 text-left relative group hover:border-emerald-500/40 transition-all">
              <div className="flex items-center justify-between mb-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
                  <TrendingUp className="w-5 h-5" />
                </div>
                <DemoBadge />
              </div>
              <p className="text-3xl font-extrabold text-white">{stats.internshipsCount}+</p>
              <p className="text-xs font-semibold text-slate-300 mt-1">Internship Opportunities</p>
              <p className="text-[11px] text-slate-500 mt-1">Remote, hybrid & on-site positions</p>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Grid: What SVIT Career Hub Offers */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-xs font-bold uppercase tracking-widest text-blue-400 mb-2">Centralized Digital Hub</h2>
          <h3 className="text-3xl sm:text-4xl font-extrabold text-white">Everything You Need to Succeed</h3>
          <p className="mt-3 text-sm text-slate-400">
            A unified suite combining college placement resources, skill progression trackers, ATS resume tools, and higher education blueprints.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Card 1 */}
          <div className="glass-panel p-6 rounded-2xl border border-slate-800 hover:border-blue-500/40 transition-all flex flex-col justify-between group">
            <div>
              <div className="w-12 h-12 rounded-xl bg-blue-600/10 text-blue-400 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Briefcase className="w-6 h-6" />
              </div>
              <h4 className="text-lg font-bold text-white mb-2">Placement Hub</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Explore hiring workflows, eligibility criteria, required skills, and interview tips for top IT and core engineering companies.
              </p>
            </div>
            <Link to="/placements" className="mt-6 inline-flex items-center gap-1.5 text-xs font-semibold text-blue-400 hover:text-blue-300">
              Explore Placements <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Card 2 */}
          <div className="glass-panel p-6 rounded-2xl border border-slate-800 hover:border-cyan-500/40 transition-all flex flex-col justify-between group">
            <div>
              <div className="w-12 h-12 rounded-xl bg-cyan-600/10 text-cyan-400 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Map className="w-6 h-6" />
              </div>
              <h4 className="text-lg font-bold text-white mb-2">Interactive Career Planner</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Choose from 13+ career paths (Software Developer, AI/ML, Cloud, Core, MBA) and track your milestone roadmap in real-time.
              </p>
            </div>
            <Link to="/careers" className="mt-6 inline-flex items-center gap-1.5 text-xs font-semibold text-cyan-400 hover:text-cyan-300">
              View Roadmaps <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Card 3 */}
          <div className="glass-panel p-6 rounded-2xl border border-slate-800 hover:border-emerald-500/40 transition-all flex flex-col justify-between group">
            <div>
              <div className="w-12 h-12 rounded-xl bg-emerald-600/10 text-emerald-400 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Compass className="w-6 h-6" />
              </div>
              <h4 className="text-lg font-bold text-white mb-2">Internship Finder</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Multi-filter search by tech stack, location, remote/on-site, duration, and stipend to discover your ideal industry internship.
              </p>
            </div>
            <Link to="/internships" className="mt-6 inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-400 hover:text-emerald-300">
              Search Internships <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Card 4 */}
          <div className="glass-panel p-6 rounded-2xl border border-slate-800 hover:border-purple-500/40 transition-all flex flex-col justify-between group">
            <div>
              <div className="w-12 h-12 rounded-xl bg-purple-600/10 text-purple-400 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Code2 className="w-6 h-6" />
              </div>
              <h4 className="text-lg font-bold text-white mb-2">Skills Explorer Matrix</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Explore Programming, Development, Advanced Tech, and Soft Skills categorized across Beginner, Intermediate, and Advanced milestones.
              </p>
            </div>
            <Link to="/skills" className="mt-6 inline-flex items-center gap-1.5 text-xs font-semibold text-purple-400 hover:text-purple-300">
              Browse Skills Matrix <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Card 5 */}
          <div className="glass-panel p-6 rounded-2xl border border-slate-800 hover:border-amber-500/40 transition-all flex flex-col justify-between group">
            <div>
              <div className="w-12 h-12 rounded-xl bg-amber-600/10 text-amber-400 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Award className="w-6 h-6" />
              </div>
              <h4 className="text-lg font-bold text-white mb-2">ATS Resume Builder</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Build a standardized, ATS-optimized resume with 1-click profile prefill and download print-ready PDF copies.
              </p>
            </div>
            <Link to="/resume-builder" className="mt-6 inline-flex items-center gap-1.5 text-xs font-semibold text-amber-400 hover:text-amber-300">
              Build Resume <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Card 6 */}
          <div className="glass-panel p-6 rounded-2xl border border-slate-800 hover:border-rose-500/40 transition-all flex flex-col justify-between group">
            <div>
              <div className="w-12 h-12 rounded-xl bg-rose-600/10 text-rose-400 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <GraduationCap className="w-6 h-6" />
              </div>
              <h4 className="text-lg font-bold text-white mb-2">Higher Education Planner</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Comprehensive blueprints for India (GATE/CAT) and Abroad (USA, Germany, UK, Canada, Australia) with exam calendars and SOP guidance.
              </p>
            </div>
            <Link to="/higher-studies" className="mt-6 inline-flex items-center gap-1.5 text-xs font-semibold text-rose-400 hover:text-rose-300">
              Plan Higher Studies <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* The 7-Step Career Journey Pipeline */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="glass-panel p-8 sm:p-12 rounded-3xl border border-slate-800 relative overflow-hidden">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-widest text-blue-400">Step-By-Step Progression</span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">My Career Journey Roadmap</h3>
            <p className="text-xs sm:text-sm text-slate-400 mt-2">
              From your first semester to placement day, SVIT Career Hub accompanies every milestone.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-7 gap-4">
            {journeySteps.map((step, idx) => (
              <div key={idx} className="bg-slate-900/80 p-4 rounded-xl border border-slate-800/80 relative flex flex-col justify-between">
                <div>
                  <span className="text-xs font-mono font-bold text-blue-400 bg-blue-500/10 px-2 py-0.5 rounded border border-blue-500/20">
                    {step.number}
                  </span>
                  <h4 className="text-sm font-bold text-white mt-3">{step.title}</h4>
                  <p className="text-[11px] text-slate-400 mt-1 leading-normal">{step.desc}</p>
                </div>
                {idx < journeySteps.length - 1 && (
                  <div className="hidden lg:block absolute -right-3 top-1/2 -translate-y-1/2 z-10 text-slate-600">
                    →
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="mt-10 text-center">
            <Link
              to="/dashboard"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold shadow-lg shadow-blue-600/20 transition-all hover:scale-105"
            >
              <span>View Your Student Dashboard</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
