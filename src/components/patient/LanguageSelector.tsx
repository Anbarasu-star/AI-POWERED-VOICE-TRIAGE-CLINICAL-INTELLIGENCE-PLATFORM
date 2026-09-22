import React from 'react';
import { useApp } from '../../context/AppContext';
import { SUPPORTED_LANGUAGES } from '../../data/languages';
import { IndianLanguage } from '../../types';
import { CheckCircle2, Volume2, ArrowRight, Sparkles } from 'lucide-react';
import { playMedicalBeep, speakText } from '../../services/audioSimulator';

export const LanguageSelector: React.FC = () => {
  const { selectedLanguage, setSelectedLanguage, setActiveNavTab, patientDraft, setPatientDraft } = useApp();

  const handleSelect = (lang: IndianLanguage) => {
    setSelectedLanguage(lang);
    setPatientDraft(prev => ({ ...prev, preferredLanguage: lang }));
    playMedicalBeep(980, 80);
  };

  const currentLangMeta = SUPPORTED_LANGUAGES.find(l => l.id === selectedLanguage) || SUPPORTED_LANGUAGES[0];

  const handlePreviewAudio = (e: React.MouseEvent, promptText: string) => {
    e.stopPropagation();
    speakText(promptText, selectedLanguage === 'Tamil' ? 'ta' : selectedLanguage === 'Hindi' ? 'hi' : 'en');
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-12">
      
      {/* Title & Guidance */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-500/40 text-cyan-300 text-xs font-semibold">
          <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
          <span>Patient Intake Step 1 of 3</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
          Choose your preferred language
        </h2>
        <p className="text-sm text-slate-400 max-w-md mx-auto">
          Select the regional language you or the patient feels most comfortable speaking during the voice call.
        </p>
      </div>

      {/* Language Cards Grid (10 Indian Languages) */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5">
        {SUPPORTED_LANGUAGES.map((lang) => {
          const isSelected = selectedLanguage === lang.id;
          return (
            <button
              key={lang.id}
              onClick={() => handleSelect(lang.id)}
              className={`p-4 rounded-2xl border text-left transition-all relative flex flex-col justify-between h-32 group ${
                isSelected
                  ? 'bg-gradient-to-br from-cyan-950/90 to-blue-950/90 border-cyan-400 shadow-lg shadow-cyan-950 ring-2 ring-cyan-500/40'
                  : 'bg-slate-900/70 border-slate-800 hover:border-slate-700 hover:bg-slate-800/60'
              }`}
            >
              <div className="flex items-start justify-between">
                <span className="text-2xl font-bold text-slate-100 group-hover:text-cyan-300 transition-colors">
                  {lang.nativeName}
                </span>
                {isSelected && (
                  <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                )}
              </div>

              <div>
                <span className="text-xs font-semibold text-slate-300 block">
                  {lang.name}
                </span>
                <span className="text-[10px] text-slate-400 font-mono">
                  IndicConformer {lang.flagCode}
                </span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Regional Language Interactive Prompt Demonstration Banner */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping" />
            <span className="text-xs font-bold text-cyan-300 uppercase tracking-wider">
              {currentLangMeta.name} Voice Prompt Demonstration
            </span>
          </div>
          <button
            onClick={(e) => handlePreviewAudio(e, currentLangMeta.greeting)}
            className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs text-slate-200 border border-slate-700 transition-colors self-start sm:self-auto"
          >
            <Volume2 className="w-3.5 h-3.5 text-cyan-400" />
            <span>Hear IVR Greeting</span>
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div className="bg-slate-950/70 p-3 rounded-xl border border-slate-800/80 space-y-1">
            <span className="text-slate-400 text-[11px] block">IVR Automated Voice Greeting:</span>
            <p className="text-slate-100 font-medium text-sm leading-relaxed">
              “{currentLangMeta.greeting}”
            </p>
          </div>
          <div className="bg-slate-950/70 p-3 rounded-xl border border-slate-800/80 space-y-1">
            <span className="text-slate-400 text-[11px] block">Simulated Patient Spoken Response:</span>
            <p className="text-cyan-200 font-medium text-sm leading-relaxed">
              “{currentLangMeta.samplePrompt}”
            </p>
          </div>
        </div>

        {selectedLanguage === 'Tamil' && (
          <div className="p-2.5 rounded-xl bg-cyan-950/40 border border-cyan-800/40 text-xs text-cyan-200 flex items-center gap-2">
            <span className="font-bold text-cyan-300">Tamil Selected:</span>
            <span>Optimized for hackathon demonstration case (Meena R., acute radiating chest pain).</span>
          </div>
        )}
      </div>

      {/* Navigation action */}
      <div className="flex items-center justify-between pt-2">
        <button
          onClick={() => setActiveNavTab('HOME')}
          className="text-xs font-semibold text-slate-400 hover:text-white px-4 py-2 rounded-lg"
        >
          &larr; Back to Overview
        </button>

        <button
          onClick={() => setActiveNavTab('REGISTRATION')}
          className="flex items-center gap-2 px-6 py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-sm shadow-lg shadow-cyan-950/50 transition-all hover:translate-x-0.5"
        >
          <span>Continue to Patient Details</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

    </div>
  );
};
