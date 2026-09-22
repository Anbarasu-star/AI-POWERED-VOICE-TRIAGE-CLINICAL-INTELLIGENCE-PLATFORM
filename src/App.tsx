import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { SafetyBanner } from './components/common/SafetyBanner';
import { Navbar } from './components/layout/Navbar';
import { LandingHero } from './components/landing/LandingHero';
import { LanguageSelector } from './components/patient/LanguageSelector';
import { PatientRegistration } from './components/patient/PatientRegistration';
import { VoiceTriage } from './components/patient/VoiceTriage';
import { FollowUpStatus } from './components/patient/FollowUpStatus';
import { PriorityQueue } from './components/doctor/PriorityQueue';
import { CaseView } from './components/doctor/CaseView';
import { MultilingualCaseBank } from './components/doctor/MultilingualCaseBank';
import { RagGuidelinesViewer } from './components/doctor/RagGuidelinesViewer';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { IvrPhoneModal } from './components/modals/IvrPhoneModal';
import { ArchitectureModal } from './components/modals/ArchitectureModal';
import { MasterDemoModal } from './components/modals/MasterDemoModal';
import { Phone, HeartPulse, ShieldCheck, Activity, Sparkles } from 'lucide-react';

const MainContent: React.FC = () => {
  const { activeNavTab } = useApp();

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
      {activeNavTab === 'HOME' && <LandingHero />}
      {activeNavTab === 'LANGUAGE' && <LanguageSelector />}
      {activeNavTab === 'REGISTRATION' && <PatientRegistration />}
      {activeNavTab === 'VOICE_TRIAGE' && <VoiceTriage />}
      {(activeNavTab === 'MY_CONSULTATION' || activeNavTab === 'TRIAGE_RESULT' || activeNavTab === 'FOLLOW_UP') && (
        <FollowUpStatus />
      )}
      {activeNavTab === 'PRIORITY_QUEUE' && <PriorityQueue />}
      {activeNavTab === 'CASE_VIEW' && <CaseView />}
      {activeNavTab === 'MULTILINGUAL_CASES' && <MultilingualCaseBank />}
      {activeNavTab === 'RAG_GUIDELINES' && <RagGuidelinesViewer />}
      {(activeNavTab === 'ANALYTICS' || activeNavTab === 'AI_EVALUATION' || activeNavTab === 'SAFETY' || activeNavTab === 'AUDIT_LOGS') && (
        <AdminDashboard />
      )}
    </main>
  );
};

const Footer: React.FC = () => {
  const { setIsArchitectureModalOpen, setIsIvrModalOpen, setIsMasterDemoModalOpen } = useApp();

  return (
    <footer className="mt-auto border-t border-slate-800/80 bg-slate-950/80 py-8 text-xs text-slate-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Activity className="w-4 h-4 text-cyan-400" />
            <span className="font-bold text-slate-200">
              AI-Powered Voice Triage & Clinical Intelligence Platform
            </span>
            <span className="text-[10px] text-slate-500 font-mono">v2.4-Demo</span>
          </div>

          <div className="flex items-center gap-4 text-slate-300">
            <button
              onClick={() => setIsMasterDemoModalOpen(true)}
              className="hover:text-amber-400 transition-colors flex items-center gap-1 font-semibold text-amber-300"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>5-Min Master Demo</span>
            </button>
            <button
              onClick={() => setIsIvrModalOpen(true)}
              className="hover:text-cyan-400 transition-colors flex items-center gap-1"
            >
              <Phone className="w-3.5 h-3.5 text-cyan-400" />
              <span>IVR Simulator</span>
            </button>
            <button
              onClick={() => setIsArchitectureModalOpen(true)}
              className="hover:text-indigo-400 transition-colors"
            >
              Architecture & DB
            </button>
          </div>
        </div>

        <div className="border-t border-slate-900 pt-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] text-slate-500">
          <p>
            Designed for rural Primary Health Centres (PHCs) and community telemedicine under Ayushman Bharat Digital Mission (ABDM).
          </p>
          <div className="flex items-center gap-3">
            <span>National Emergency: <strong className="text-red-400">108 / 112</strong></span>
            <span>•</span>
            <span className="text-emerald-400 font-mono">IndicConformer + XGBoost Online</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default function App() {
  return (
    <AppProvider>
      <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-cyan-500 selection:text-slate-950">
        <SafetyBanner />
        <Navbar />
        <MainContent />
        <Footer />
        <IvrPhoneModal />
        <ArchitectureModal />
        <MasterDemoModal />
      </div>
    </AppProvider>
  );
}
