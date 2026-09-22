import React from 'react';
import { AlertTriangle, ShieldCheck, PhoneCall } from 'lucide-react';

export const SafetyBanner: React.FC = () => {
  return (
    <div className="bg-amber-950/70 border-b border-amber-600/40 text-amber-200 px-4 py-2 text-xs md:text-sm shadow-sm backdrop-blur-md">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="p-1 rounded bg-amber-500/20 text-amber-400">
            <AlertTriangle className="w-4 h-4 shrink-0 animate-pulse text-amber-400" />
          </span>
          <span className="font-semibold tracking-wide text-amber-100">
            MANDATORY CLINICAL SAFETY PRINCIPLE:
          </span>
          <span className="text-amber-200/90 font-normal">
            AI-assisted clinical decision support only. Final diagnosis and treatment decisions must be made by a qualified healthcare professional.
          </span>
        </div>

        <div className="flex items-center gap-3 shrink-0 text-xs">
          <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-cyan-950/80 border border-cyan-500/30 text-cyan-300">
            <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
            <span>Doctor-in-the-Loop Enforced</span>
          </div>
          <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-red-950/80 border border-red-500/30 text-red-300">
            <PhoneCall className="w-3.5 h-3.5 text-red-400" />
            <span>National Emergency: 108 / 112</span>
          </div>
        </div>
      </div>
    </div>
  );
};
