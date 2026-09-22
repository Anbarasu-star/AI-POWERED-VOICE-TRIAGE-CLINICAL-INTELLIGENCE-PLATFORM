import React from 'react';
import { useApp } from '../../context/AppContext';
import { UserRole } from '../../types';
import { 
  Stethoscope, 
  Activity, 
  UserCheck, 
  PhoneCall, 
  Layers, 
  PlayCircle, 
  BarChart3, 
  ShieldAlert, 
  FileText, 
  Users,
  Sparkles
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const { 
    role, 
    setRole, 
    activeNavTab, 
    setActiveNavTab, 
    consultations,
    setIsIvrModalOpen,
    setIsArchitectureModalOpen,
    setIsMasterDemoModalOpen,
  } = useApp();

  const emergencyCount = consultations.filter(c => c.triageResult.priority === 'EMERGENCY').length;
  const pendingReviewCount = consultations.filter(c => c.doctorReview.status === 'PENDING').length;

  return (
    <header className="sticky top-0 z-40 bg-slate-900/90 backdrop-blur-md border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-3">
          
          {/* Logo & Platform Name */}
          <div 
            onClick={() => setActiveNavTab('HOME')}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-600 via-blue-600 to-indigo-600 p-0.5 shadow-md shadow-cyan-900/30 flex items-center justify-center">
              <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                <Activity className="w-5 h-5 text-cyan-400 group-hover:scale-110 transition-transform" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-base sm:text-lg tracking-tight bg-gradient-to-r from-white via-slate-100 to-cyan-300 bg-clip-text text-transparent">
                  Voice Triage
                </span>
                <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-800/80">
                  AI + IVR
                </span>
              </div>
              <p className="text-[11px] text-slate-400 hidden sm:block">
                Clinical Intelligence for Underserved Healthcare
              </p>
            </div>
          </div>

          {/* Role Switcher Pill */}
          <div className="bg-slate-950/80 p-1 rounded-xl border border-slate-800 flex items-center gap-1 shadow-inner">
            <button
              onClick={() => {
                setRole('PATIENT');
                if (activeNavTab !== 'VOICE_TRIAGE' && activeNavTab !== 'LANGUAGE') {
                  setActiveNavTab('HOME');
                }
              }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                role === 'PATIENT'
                  ? 'bg-cyan-600 text-white shadow-sm shadow-cyan-700/50'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
              }`}
            >
              <Users className="w-3.5 h-3.5" />
              <span>Patient</span>
            </button>

            <button
              onClick={() => {
                setRole('DOCTOR');
                setActiveNavTab('PRIORITY_QUEUE');
              }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all relative ${
                role === 'DOCTOR'
                  ? 'bg-blue-600 text-white shadow-sm shadow-blue-700/50'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
              }`}
            >
              <Stethoscope className="w-3.5 h-3.5" />
              <span>Doctor</span>
              {pendingReviewCount > 0 && (
                <span className="w-4 h-4 rounded-full bg-red-500 text-white text-[10px] font-bold flex items-center justify-center">
                  {pendingReviewCount}
                </span>
              )}
            </button>

            <button
              onClick={() => {
                setRole('ADMIN');
                setActiveNavTab('ANALYTICS');
              }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                role === 'ADMIN'
                  ? 'bg-indigo-600 text-white shadow-sm shadow-indigo-700/50'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
              }`}
            >
              <BarChart3 className="w-3.5 h-3.5" />
              <span>Admin</span>
            </button>
          </div>

          {/* Quick Tools & Master Demo Trigger */}
          <div className="flex items-center gap-2">
            
            {/* 5-Min Master Demo Button */}
            <button
              onClick={() => setIsMasterDemoModalOpen(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500 hover:from-amber-600 hover:to-rose-600 text-white text-xs font-bold shadow-md shadow-orange-950/40 hover:scale-[1.02] active:scale-[0.98] transition-all"
              title="Launch the exact 5-minute hackathon step-by-step judge demonstration"
            >
              <PlayCircle className="w-4 h-4 fill-white text-orange-600" />
              <span className="hidden sm:inline">🎬 Launch Demo</span>
              <span className="sm:hidden">Demo</span>
            </button>

            {/* Feature Phone IVR Simulator */}
            <button
              onClick={() => setIsIvrModalOpen(true)}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700/70 text-slate-200 text-xs font-medium transition-all"
              title="Interactive Feature Phone IVR Call Simulator"
            >
              <PhoneCall className="w-3.5 h-3.5 text-cyan-400" />
              <span className="hidden md:inline">IVR Simulator</span>
            </button>

            {/* System Architecture */}
            <button
              onClick={() => setIsArchitectureModalOpen(true)}
              className="p-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700/70 text-slate-300 hover:text-white transition-all"
              title="Technical Architecture & Relational Schema"
            >
              <Layers className="w-4 h-4 text-indigo-400" />
            </button>

          </div>

        </div>

        {/* Secondary Sub-navigation Bar for Roles & Features */}
        <div className="flex items-center justify-between overflow-x-auto py-2 border-t border-slate-800/80 no-scrollbar text-xs">
          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            {role === 'PATIENT' && (
              <>
                <button
                  onClick={() => setActiveNavTab('HOME')}
                  className={`px-3 py-1 rounded-lg font-medium transition-colors ${
                    activeNavTab === 'HOME' ? 'bg-cyan-500/20 text-cyan-300 font-semibold' : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  Overview
                </button>
                <button
                  onClick={() => setActiveNavTab('LANGUAGE')}
                  className={`px-3 py-1 rounded-lg font-medium transition-colors ${
                    activeNavTab === 'LANGUAGE' || activeNavTab === 'REGISTRATION' ? 'bg-cyan-500/20 text-cyan-300 font-semibold' : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  Choose Language
                </button>
                <button
                  onClick={() => setActiveNavTab('VOICE_TRIAGE')}
                  className={`px-3 py-1 rounded-lg font-medium transition-colors flex items-center gap-1 ${
                    activeNavTab === 'VOICE_TRIAGE' ? 'bg-cyan-500/20 text-cyan-300 font-semibold' : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <Sparkles className="w-3 h-3 text-cyan-400" />
                  Voice Triage
                </button>
                <button
                  onClick={() => setActiveNavTab('MY_CONSULTATION')}
                  className={`px-3 py-1 rounded-lg font-medium transition-colors ${
                    activeNavTab === 'MY_CONSULTATION' || activeNavTab === 'TRIAGE_RESULT' ? 'bg-cyan-500/20 text-cyan-300 font-semibold' : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  My Consultation
                </button>
                <button
                  onClick={() => setActiveNavTab('FOLLOW_UP')}
                  className={`px-3 py-1 rounded-lg font-medium transition-colors ${
                    activeNavTab === 'FOLLOW_UP' ? 'bg-cyan-500/20 text-cyan-300 font-semibold' : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  Follow-up Status
                </button>
              </>
            )}

            {role === 'DOCTOR' && (
              <>
                <button
                  onClick={() => setActiveNavTab('PRIORITY_QUEUE')}
                  className={`px-3 py-1 rounded-lg font-medium transition-colors flex items-center gap-1.5 ${
                    activeNavTab === 'PRIORITY_QUEUE' ? 'bg-blue-500/20 text-blue-300 font-semibold' : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <span>Priority Queue</span>
                  {emergencyCount > 0 && (
                    <span className="px-1.5 py-0.2 rounded-full bg-red-600/80 text-white text-[10px] font-bold">
                      {emergencyCount} Emergency
                    </span>
                  )}
                </button>
                <button
                  onClick={() => setActiveNavTab('CASE_VIEW')}
                  className={`px-3 py-1 rounded-lg font-medium transition-colors ${
                    activeNavTab === 'CASE_VIEW' ? 'bg-blue-500/20 text-blue-300 font-semibold' : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  One-Page Clinical Summary
                </button>
                <button
                  onClick={() => setActiveNavTab('RAG_GUIDELINES')}
                  className={`px-3 py-1 rounded-lg font-medium transition-colors ${
                    activeNavTab === 'RAG_GUIDELINES' ? 'bg-blue-500/20 text-blue-300 font-semibold' : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  RAG Clinical Assistant
                </button>
                <button
                  onClick={() => setActiveNavTab('MULTILINGUAL_CASES')}
                  className={`px-3 py-1 rounded-lg font-medium transition-colors ${
                    activeNavTab === 'MULTILINGUAL_CASES' ? 'bg-blue-500/20 text-blue-300 font-semibold' : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  Multilingual Case Bank
                </button>
              </>
            )}

            {role === 'ADMIN' && (
              <>
                <button
                  onClick={() => setActiveNavTab('ANALYTICS')}
                  className={`px-3 py-1 rounded-lg font-medium transition-colors ${
                    activeNavTab === 'ANALYTICS' ? 'bg-indigo-500/20 text-indigo-300 font-semibold' : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  Operations Analytics
                </button>
                <button
                  onClick={() => setActiveNavTab('AI_EVALUATION')}
                  className={`px-3 py-1 rounded-lg font-medium transition-colors ${
                    activeNavTab === 'AI_EVALUATION' ? 'bg-indigo-500/20 text-indigo-300 font-semibold' : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  AI Model Benchmarks
                </button>
                <button
                  onClick={() => setActiveNavTab('SAFETY')}
                  className={`px-3 py-1 rounded-lg font-medium transition-colors ${
                    activeNavTab === 'SAFETY' ? 'bg-indigo-500/20 text-indigo-300 font-semibold' : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  Safety & Risk Matrix
                </button>
                <button
                  onClick={() => setActiveNavTab('AUDIT_LOGS')}
                  className={`px-3 py-1 rounded-lg font-medium transition-colors ${
                    activeNavTab === 'AUDIT_LOGS' ? 'bg-indigo-500/20 text-indigo-300 font-semibold' : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  Compliance & Audit Logs
                </button>
              </>
            )}
          </div>

          <div className="flex items-center gap-3 shrink-0 text-[11px] text-slate-400 pl-3">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span className="text-emerald-300 font-medium">IndicConformer Active</span>
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};
