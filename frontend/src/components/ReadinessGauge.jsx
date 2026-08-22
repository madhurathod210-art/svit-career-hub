import React from 'react';
import { CheckCircle, AlertTriangle, ArrowRight, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

const ReadinessGauge = ({ score = 0, breakdown = {}, strongAreas = [], areasToImprove = [], recommendedActions = [] }) => {
  const radius = 60;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  const getColor = (s) => {
    if (s >= 75) return { stroke: '#10B981', text: 'text-emerald-400', badge: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' };
    if (s >= 60) return { stroke: '#3B82F6', text: 'text-blue-400', badge: 'bg-blue-500/10 text-blue-400 border-blue-500/20' };
    if (s >= 40) return { stroke: '#F59E0B', text: 'text-amber-400', badge: 'bg-amber-500/10 text-amber-400 border-amber-500/20' };
    return { stroke: '#EF4444', text: 'text-rose-400', badge: 'bg-rose-500/10 text-rose-400 border-rose-500/20' };
  };

  const status = getColor(score);

  return (
    <div className="glass-panel p-6 sm:p-8 rounded-2xl border border-slate-800 shadow-xl relative overflow-hidden">
      {/* Top Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-xl font-bold text-white">Career Readiness Score</h3>
            <span className="text-xs px-2.5 py-0.5 rounded-full font-medium bg-blue-500/10 text-blue-400 border border-blue-500/30 flex items-center gap-1">
              <Sparkles className="w-3 h-3" /> AI Evaluated
            </span>
          </div>
          <p className="text-sm text-slate-400 mt-1">Multi-factor algorithmic benchmark based on placement & industry criteria</p>
        </div>
      </div>

      {/* Main Gauge & Score Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Circle Meter */}
        <div className="lg:col-span-4 flex flex-col items-center justify-center p-4 bg-slate-900/60 rounded-xl border border-slate-800/80">
          <div className="relative w-40 h-40 flex items-center justify-center">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 140 140">
              <circle
                cx="70"
                cy="70"
                r={radius}
                className="text-slate-800 stroke-current"
                strokeWidth="10"
                fill="transparent"
              />
              <circle
                cx="70"
                cy="70"
                r={radius}
                stroke={status.stroke}
                strokeWidth="10"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                fill="transparent"
                className="transition-all duration-1000 ease-out"
              />
            </svg>
            <div className="absolute flex flex-col items-center justify-center text-center">
              <span className={`text-4xl font-extrabold ${status.text}`}>{score}</span>
              <span className="text-xs uppercase tracking-widest text-slate-400 font-semibold">/ 100</span>
            </div>
          </div>
          <div className="mt-4 text-center">
            <span className={`inline-block text-xs font-semibold px-3 py-1 rounded-full border ${status.badge}`}>
              {score >= 75 ? 'Placement Ready 🎯' : score >= 60 ? 'Good Momentum 📈' : score >= 40 ? 'Action Needed ⚡' : 'Early Stage 🌱'}
            </span>
          </div>
        </div>

        {/* Breakdown bars */}
        <div className="lg:col-span-8 space-y-3">
          <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">Algorithm Factor Breakdown (100% Total)</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {Object.entries(breakdown).map(([key, item]) => (
              <div key={key} className="bg-slate-900/40 p-3 rounded-lg border border-slate-800/50">
                <div className="flex justify-between items-center text-xs mb-1.5">
                  <span className="text-slate-300 font-medium">{item.label}</span>
                  <span className="text-slate-400 font-mono">{item.score}% <span className="text-slate-500">({item.weight})</span></span>
                </div>
                <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-700 ${
                      item.score >= 70 ? 'bg-emerald-500' : item.score >= 50 ? 'bg-blue-500' : item.score >= 30 ? 'bg-amber-500' : 'bg-rose-500'
                    }`}
                    style={{ width: `${item.score}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Strong Areas & Areas to Improve */}
      <div className="mt-8 pt-6 border-t border-slate-800/80 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-emerald-950/20 p-4 rounded-xl border border-emerald-900/30">
          <div className="flex items-center gap-2 mb-3">
            <CheckCircle className="w-4 h-4 text-emerald-400" />
            <h5 className="text-sm font-semibold text-emerald-300">Strong Areas</h5>
          </div>
          <ul className="space-y-1.5">
            {strongAreas.map((area, idx) => (
              <li key={idx} className="text-xs text-slate-300 flex items-start gap-2">
                <span className="text-emerald-400 font-bold">•</span> {area}
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-amber-950/20 p-4 rounded-xl border border-amber-900/30">
          <div className="flex items-center gap-2 mb-3">
            <AlertTriangle className="w-4 h-4 text-amber-400" />
            <h5 className="text-sm font-semibold text-amber-300">Areas to Improve</h5>
          </div>
          <ul className="space-y-1.5">
            {areasToImprove.map((area, idx) => (
              <li key={idx} className="text-xs text-slate-300 flex items-start gap-2">
                <span className="text-amber-400 font-bold">•</span> {area}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Recommended Next Actions */}
      {recommendedActions.length > 0 && (
        <div className="mt-6 pt-6 border-t border-slate-800/80">
          <h5 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3">Recommended Next Actions</h5>
          <div className="flex flex-wrap gap-3">
            {recommendedActions.map((action, idx) => (
              <Link
                key={idx}
                to={action.link}
                className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg bg-blue-600/10 hover:bg-blue-600 text-blue-400 hover:text-white border border-blue-500/30 hover:border-blue-500 text-xs font-medium transition-all group"
              >
                <span>{action.title}</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ReadinessGauge;
