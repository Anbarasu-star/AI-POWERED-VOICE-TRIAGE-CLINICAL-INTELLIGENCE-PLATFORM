import React from 'react';
import { useApp } from '../../context/AppContext';
import { MULTILINGUAL_DEMO_CASES } from '../../data/multilingualCases';
import { 
  Languages, 
  Flame, 
  ArrowRight, 
  Volume2, 
  Sparkles, 
  ShieldAlert, 
  CheckCircle2 
} from 'lucide-react';
import { speakText } from '../../services/audioSimulator';

export const MultilingualCaseBank: React.FC = () => {
  const { setActiveConsultationId, setActiveNavTab, setRole } = useApp();

  const handleOpenCase = (caseId: string) => {
    setActiveConsultationId(caseId);
    setRole('DOCTOR');
    setActiveNavTab('CASE_VIEW');
  };

  const handleSpeak = (e: React.MouseEvent, text: string, lang: string) => {
    e.stopPropagation();
    speakText(text, lang === 'Tamil' ? 'ta' : lang === 'Hindi' ? 'hi' : 'en');
  };

  return (
    <div className="space-y-6 pb-16">
      
      {/* Header */}
      <div className="border-b border-slate-800 pb-4">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-950/80 border border-blue-500/40 text-blue-300 text-xs font-semibold mb-1">
          <Languages className="w-3.5 h-3.5 text-blue-400" />
          <span>Multilingual Corpus & Case Library</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
          Diverse Indian Regional Language Cases
        </h2>
        <p className="text-xs sm:text-sm text-slate-400">
          Curated clinical scenarios demonstrating dialectal acoustic recognition, local terminology, and emergency stratification.
        </p>
      </div>

      {/* Grid of Multilingual Cases */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {MULTILINGUAL_DEMO_CASES.map((item) => {
          const isEmergency = item.triagePriority === 'EMERGENCY';
          const isMedium = item.triagePriority === 'MEDIUM';

          return (
            <div
              key={item.id}
              onClick={() => handleOpenCase(item.id)}
              className="bg-slate-900/90 border border-slate-800 hover:border-blue-500/50 rounded-3xl p-5 space-y-4 shadow-xl transition-all hover:bg-slate-850 cursor-pointer flex flex-col justify-between group"
            >
              <div className="space-y-3">
                
                {/* Header: Name, Language, Priority */}
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h3 className="font-bold text-white text-base group-hover:text-blue-300 transition-colors">
                      {item.patientName} ({item.age}y / {item.gender})
                    </h3>
                    <span className="text-xs text-slate-400 flex items-center gap-1 mt-0.5">
                      <span>{item.language} Dialect</span>
                    </span>
                  </div>

                  <div className="flex flex-col items-end gap-1">
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-extrabold uppercase ${
                      isEmergency
                        ? 'bg-red-500/20 text-red-300 border border-red-500/50'
                        : isMedium
                        ? 'bg-amber-500/20 text-amber-300 border border-amber-500/50'
                        : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/50'
                    }`}>
                      {item.triagePriority}
                    </span>
                    <span className="text-[10px] text-slate-400 font-mono">
                      Risk {item.riskScore}/100
                    </span>
                  </div>
                </div>

                {/* Language Tag */}
                <div className="flex items-center justify-between text-xs border-y border-slate-800/80 py-2">
                  <span className="font-semibold text-cyan-300 flex items-center gap-1">
                    <Languages className="w-3.5 h-3.5 text-cyan-400" />
                    <span>{item.language} Audio ({item.audioDuration})</span>
                  </span>
                  <button
                    onClick={(e) => handleSpeak(e, item.nativeScriptInput, item.language)}
                    className="p-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
                    title="Audio preview"
                  >
                    <Volume2 className="w-3.5 h-3.5 text-cyan-400" />
                  </button>
                </div>

                {/* Spoken Transcript Preview */}
                <div className="bg-slate-950/70 p-3 rounded-2xl border border-slate-800/70 space-y-1.5 text-xs">
                  <p className="text-slate-100 font-medium line-clamp-2 italic">
                    “{item.nativeScriptInput}”
                  </p>
                  <p className="text-cyan-300/90 text-[11px] line-clamp-2 border-t border-slate-800/60 pt-1">
                    {item.englishTranslation}
                  </p>
                </div>

                {/* Red Flags if present */}
                {item.redFlags.length > 0 && (
                  <div className="flex items-center gap-1.5 text-[11px] text-red-300 font-bold">
                    <Flame className="w-3.5 h-3.5 text-red-400 shrink-0" />
                    <span className="truncate">{item.redFlags.join(', ')}</span>
                  </div>
                )}
              </div>

              {/* Action Button */}
              <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs">
                <span className="text-[11px] text-slate-400 font-mono">
                  {item.detectedModel} ({item.sttConfidence})
                </span>
                <span className="text-blue-400 font-bold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  <span>Open Case</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
};
