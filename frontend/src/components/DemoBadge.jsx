import React from 'react';
import { Info } from 'lucide-react';

const DemoBadge = ({ text = "DEMO DATA", className = "" }) => {
  return (
    <span
      title="This record is a verified demo placeholder. Official SVIT records are published via the administrator portal."
      className={`inline-flex items-center gap-1 text-[11px] font-semibold tracking-wider uppercase px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/30 ${className}`}
    >
      <Info className="w-3 h-3" />
      {text}
    </span>
  );
};

export default DemoBadge;
