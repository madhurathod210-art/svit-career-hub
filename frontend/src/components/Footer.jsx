import React from 'react';
import { Link } from 'react-router-dom';
import { GraduationCap, ShieldCheck, Mail, MapPin, ExternalLink, Heart } from 'lucide-react';
import DemoBadge from './DemoBadge';

const Footer = () => {
  return (
    <footer className="bg-slate-950 border-t border-slate-800/80 text-slate-400 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Institution Column */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-md">
                <GraduationCap className="w-5 h-5" />
              </div>
              <span className="text-lg font-extrabold text-white">SVIT Student Career Hub</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              The centralized digital ecosystem for students of Swami Vivekananda Institute of Technology (SVIT) to map career roadmaps, master technical skills, discover internships, and achieve placement readiness.
            </p>
            <div className="flex items-start gap-2 text-xs text-slate-400 pt-2">
              <MapPin className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
              <span>Mahbub College Campus, Secunderabad, Telangana, India</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <Mail className="w-4 h-4 text-blue-400 shrink-0" />
              <span>placements@svit.ac.in</span>
            </div>
          </div>

          {/* Quick Navigation */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200 mb-4">Core Hubs</h4>
            <ul className="space-y-2.5 text-xs">
              <li><Link to="/placements" className="hover:text-blue-400 transition-colors">Placement Preparation</Link></li>
              <li><Link to="/careers" className="hover:text-blue-400 transition-colors">Career Roadmaps</Link></li>
              <li><Link to="/internships" className="hover:text-blue-400 transition-colors">Internship Finder</Link></li>
              <li><Link to="/skills" className="hover:text-blue-400 transition-colors">Skills Explorer</Link></li>
              <li><Link to="/higher-studies" className="hover:text-blue-400 transition-colors">Higher Studies Planner</Link></li>
            </ul>
          </div>

          {/* Tools & Resources */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200 mb-4">Student Tools</h4>
            <ul className="space-y-2.5 text-xs">
              <li><Link to="/resume-builder" className="hover:text-blue-400 transition-colors">ATS Resume Builder</Link></li>
              <li><Link to="/resources" className="hover:text-blue-400 transition-colors">Learning Library</Link></li>
              <li><Link to="/events" className="hover:text-blue-400 transition-colors">Hackathons & Drives</Link></li>
              <li><Link to="/dashboard" className="hover:text-blue-400 transition-colors">Readiness Score</Link></li>
              <li><Link to="/admin" className="hover:text-amber-400 text-amber-500/80 transition-colors">Admin Portal</Link></li>
            </ul>
          </div>

          {/* Transparency & Disclaimer */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <ShieldCheck className="w-4 h-4 text-amber-400" />
              <h4 className="text-xs font-bold uppercase tracking-wider text-amber-300">Compliance</h4>
            </div>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              Official information, verified circulars, and approved placement statistics are managed directly by SVIT Training & Placement Cell.
            </p>
            <div className="mt-3">
              <DemoBadge text="DEMO DATA POLICIES ACTIVE" />
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-slate-800/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} Swami Vivekananda Institute of Technology (SVIT). All rights reserved.</p>
          <div className="flex items-center gap-4">
            <span className="text-[11px] text-slate-500">Built for SVIT Students</span>
            <span className="text-slate-700">|</span>
            <span className="text-[11px] text-emerald-400 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              Platform Online
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
