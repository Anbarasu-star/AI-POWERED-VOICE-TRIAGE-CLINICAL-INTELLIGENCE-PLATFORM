import React from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Phone, 
  Languages, 
  UserCheck, 
  ArrowRight, 
  Mic, 
  Stethoscope, 
  ShieldCheck, 
  Sparkles, 
  Radio, 
  CheckCircle2, 
  HeartPulse,
  Clock,
  Send
} from 'lucide-react';

export const LandingHero: React.FC = () => {
  const { setRole, setActiveNavTab, loadDemoPatientMeena, setIsIvrModalOpen } = useApp();

  const handleStartPatientDemo = () => {
    loadDemoPatientMeena();
    setRole('PATIENT');
    setActiveNavTab('LANGUAGE');
  };

  const handleOpenDoctorDashboard = () => {
    setRole('DOCTOR');
    setActiveNavTab('PRIORITY_QUEUE');
  };

  return (
    <div className="space-y-12 pb-16">
      
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-b from-slate-800/80 via-slate-900 to-slate-950 border border-slate-700/60 p-8 sm:p-12 lg:p-16 shadow-2xl">
        {/* Subtle background glow */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-10 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-4xl mx-auto text-center space-y-6">
          
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/80 border border-cyan-500/40 text-cyan-300 text-xs font-semibold shadow-inner">
            <Radio className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
            <span>Voice-First Telephony & AI Decision Support for Rural Healthcare</span>
          </div>

          {/* Main Title */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
            AI-Powered Voice Triage
          </h1>

          {/* Slogans */}
          <div className="space-y-2">
            <p className="text-xl sm:text-2xl font-semibold bg-gradient-to-r from-cyan-300 via-blue-200 to-slate-200 bg-clip-text text-transparent">
              “Healthcare access through a simple phone call.”
            </p>
            <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
              Multilingual AI-assisted triage for rural and underserved communities — no smartphone or digital literacy required.
            </p>
          </div>

          {/* Animated Medical Waveform Visual */}
          <div className="pt-2 pb-4">
            <div className="h-16 max-w-md mx-auto flex items-center justify-center gap-1.5 bg-slate-950/70 border border-slate-800/90 rounded-2xl px-6 py-2 shadow-inner">
              <span className="text-[11px] font-mono text-cyan-400/80 mr-2 flex items-center gap-1">
                <HeartPulse className="w-3.5 h-3.5 text-rose-400 animate-pulse" />
                Vocal Biomarkers
              </span>
              {[24, 40, 18, 56, 32, 70, 44, 28, 62, 38, 20, 48, 64, 30, 16, 52, 34, 22].map((height, i) => (
                <div
                  key={i}
                  className="w-1.5 rounded-full bg-gradient-to-t from-cyan-500 to-blue-400 transition-all duration-300"
                  style={{
                    height: `${height}%`,
                    animation: `pulse 1.4s ease-in-out infinite alternate`,
                    animationDelay: `${i * 0.08}s`,
                  }}
                />
              ))}
            </div>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <button
              onClick={handleStartPatientDemo}
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold text-base shadow-xl shadow-cyan-950/50 hover:shadow-cyan-900/80 transition-all flex items-center justify-center gap-2 group"
            >
              <Mic className="w-5 h-5 text-white group-hover:scale-110 transition-transform" />
              <span>Start Patient Demo</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              onClick={handleOpenDoctorDashboard}
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-slate-800 hover:bg-slate-700/80 border border-slate-600/70 text-slate-100 font-semibold text-base transition-all flex items-center justify-center gap-2 shadow-md hover:border-slate-500"
            >
              <Stethoscope className="w-5 h-5 text-blue-400" />
              <span>Doctor Dashboard</span>
            </button>

            <button
              onClick={() => setIsIvrModalOpen(true)}
              className="w-full sm:w-auto px-5 py-4 rounded-2xl bg-indigo-950/80 hover:bg-indigo-900/80 border border-indigo-700/50 text-indigo-200 text-sm font-semibold transition-all flex items-center justify-center gap-2"
            >
              <Phone className="w-4 h-4 text-indigo-400" />
              <span>Simulate IVR Call</span>
            </button>
          </div>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 pt-6 max-w-3xl mx-auto text-left">
            <div className="bg-slate-950/60 p-3 rounded-xl border border-slate-800/80">
              <span className="text-xs text-slate-400 block">Languages</span>
              <span className="text-lg font-bold text-cyan-300">10+ Regional</span>
            </div>
            <div className="bg-slate-950/60 p-3 rounded-xl border border-slate-800/80">
              <span className="text-xs text-slate-400 block">Phone Support</span>
              <span className="text-lg font-bold text-blue-300">Any Basic Phone</span>
            </div>
            <div className="bg-slate-950/60 p-3 rounded-xl border border-slate-800/80">
              <span className="text-xs text-slate-400 block">Emergency Recall</span>
              <span className="text-lg font-bold text-emerald-400">&gt; 92.4%</span>
            </div>
            <div className="bg-slate-950/60 p-3 rounded-xl border border-slate-800/80">
              <span className="text-xs text-slate-400 block">Doctor Control</span>
              <span className="text-lg font-bold text-amber-300">100% Verified</span>
            </div>
          </div>

        </div>
      </section>

      {/* 3 Core Value Cards */}
      <section className="space-y-6">
        <div className="text-center space-y-2">
          <h2 className="text-2xl sm:text-3xl font-bold text-white">
            Engineered for Ground-Reality Healthcare
          </h2>
          <p className="text-slate-400 text-sm max-w-xl mx-auto">
            Addressing India's doctor-patient deficit through accessible voice telephony and verified clinical decision intelligence.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Card 1: Any Phone */}
          <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/60 hover:border-cyan-500/50 rounded-2xl p-6 transition-all hover:bg-slate-800/80 group">
            <div className="w-12 h-12 rounded-xl bg-cyan-950 border border-cyan-800 flex items-center justify-center text-cyan-400 mb-4 group-hover:scale-105 transition-transform shadow-md">
              <Phone className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2 flex items-center justify-between">
              <span>ANY PHONE</span>
              <span className="text-[10px] uppercase font-bold text-cyan-400 bg-cyan-950/80 px-2 py-0.5 rounded border border-cyan-800/60">
                Zero App Need
              </span>
            </h3>
            <p className="text-slate-300 text-sm leading-relaxed mb-4">
              Works seamlessly through interactive voice response (IVR) on basic 2G feature phones without internet or smartphones.
            </p>
            <ul className="text-xs text-slate-400 space-y-1.5 border-t border-slate-700/60 pt-3">
              <li className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                <span>Toll-free voice call access</span>
              </li>
              <li className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                <span>Zero bandwidth required at patient end</span>
              </li>
              <li className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                <span>Instant audio capture & telemetry</span>
              </li>
            </ul>
          </div>

          {/* Card 2: 10+ Languages */}
          <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/60 hover:border-blue-500/50 rounded-2xl p-6 transition-all hover:bg-slate-800/80 group">
            <div className="w-12 h-12 rounded-xl bg-blue-950 border border-blue-800 flex items-center justify-center text-blue-400 mb-4 group-hover:scale-105 transition-transform shadow-md">
              <Languages className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2 flex items-center justify-between">
              <span>10+ INDIAN LANGUAGES</span>
              <span className="text-[10px] uppercase font-bold text-blue-400 bg-blue-950/80 px-2 py-0.5 rounded border border-blue-800/60">
                IndicConformer
              </span>
            </h3>
            <p className="text-slate-300 text-sm leading-relaxed mb-4">
              Voice-first interaction in regional mother tongues: Tamil, Hindi, Telugu, Kannada, Malayalam, Bengali, Marathi, and more.
            </p>
            <ul className="text-xs text-slate-400 space-y-1.5 border-t border-slate-700/60 pt-3">
              <li className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                <span>Native acoustic models with dialect handling</span>
              </li>
              <li className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                <span>Seamless Whisper-Large-v3 automatic fallback</span>
              </li>
              <li className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                <span>Accurate medical terminology translation</span>
              </li>
            </ul>
          </div>

          {/* Card 3: Doctor in Control */}
          <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/60 hover:border-indigo-500/50 rounded-2xl p-6 transition-all hover:bg-slate-800/80 group">
            <div className="w-12 h-12 rounded-xl bg-indigo-950 border border-indigo-800 flex items-center justify-center text-indigo-400 mb-4 group-hover:scale-105 transition-transform shadow-md">
              <UserCheck className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2 flex items-center justify-between">
              <span>DOCTOR IN CONTROL</span>
              <span className="text-[10px] uppercase font-bold text-indigo-400 bg-indigo-950/80 px-2 py-0.5 rounded border border-indigo-800/60">
                Human-in-the-Loop
              </span>
            </h3>
            <p className="text-slate-300 text-sm leading-relaxed mb-4">
              AI acts as a shadow diagnosis assistant. Attending physicians retain ultimate authority to approve, modify, or reject every plan.
            </p>
            <ul className="text-xs text-slate-400 space-y-1.5 border-t border-slate-700/60 pt-3">
              <li className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
                <span>Concise One-Page Clinical Summary</span>
              </li>
              <li className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
                <span>Evidence-backed RAG guideline citations</span>
              </li>
              <li className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
                <span>Automated patient SMS/WhatsApp dispatch</span>
              </li>
            </ul>
          </div>

        </div>
      </section>

      {/* Visual Patient -> AI -> Doctor Complete Clinical Journey Workflow */}
      <section className="bg-slate-900/90 rounded-3xl border border-slate-800 p-8 sm:p-10 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
          <div>
            <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider">
              Clinical Architecture
            </span>
            <h3 className="text-xl sm:text-2xl font-bold text-white">
              The 4-Stage Voice-to-Care Pipeline
            </h3>
          </div>
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <span className="px-2 py-1 rounded bg-slate-800 border border-slate-700">Pre-Visit</span>
            <span>&rarr;</span>
            <span className="px-2 py-1 rounded bg-slate-800 border border-slate-700">In-Visit</span>
            <span>&rarr;</span>
            <span className="px-2 py-1 rounded bg-slate-800 border border-slate-700">Shadow AI</span>
            <span>&rarr;</span>
            <span className="px-2 py-1 rounded bg-slate-800 border border-slate-700">Post-Visit</span>
          </div>
        </div>

        {/* 4 Interactive Stages */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          
          {/* Stage 1 */}
          <div className="bg-slate-950/60 rounded-2xl p-5 border border-slate-800 space-y-3 relative">
            <div className="w-7 h-7 rounded-full bg-cyan-900/80 text-cyan-300 font-bold text-xs flex items-center justify-center border border-cyan-700">
              1
            </div>
            <h4 className="font-bold text-white text-sm">Pre-Visit Capture</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Patient dials IVR toll-free number or speaks into community kiosk in mother tongue. Zero internet required.
            </p>
            <div className="pt-2 flex items-center gap-1.5 text-[11px] text-cyan-400 font-medium">
              <Phone className="w-3.5 h-3.5" />
              <span>IVR Call / Mic Stream</span>
            </div>
          </div>

          {/* Stage 2 */}
          <div className="bg-slate-950/60 rounded-2xl p-5 border border-slate-800 space-y-3 relative">
            <div className="w-7 h-7 rounded-full bg-blue-900/80 text-blue-300 font-bold text-xs flex items-center justify-center border border-blue-700">
              2
            </div>
            <h4 className="font-bold text-white text-sm">Transcription & NLP</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              IndicConformer decodes dialectal speech. LLM extracts symptoms, duration, medical history, and critical red flags into structured JSON.
            </p>
            <div className="pt-2 flex items-center gap-1.5 text-[11px] text-blue-400 font-medium">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Structured Clinical JSON</span>
            </div>
          </div>

          {/* Stage 3 */}
          <div className="bg-slate-950/60 rounded-2xl p-5 border border-slate-800 space-y-3 relative">
            <div className="w-7 h-7 rounded-full bg-rose-900/80 text-rose-300 font-bold text-xs flex items-center justify-center border border-rose-700">
              3
            </div>
            <h4 className="font-bold text-white text-sm">Triage & Shadow AI</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              XGBoost calculates 0-100 risk score. Flags Emergency, Medium, or Normal. RAG vector store attaches clinical guideline evidence.
            </p>
            <div className="pt-2 flex items-center gap-1.5 text-[11px] text-rose-400 font-medium">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Priority Queue Placement</span>
            </div>
          </div>

          {/* Stage 4 */}
          <div className="bg-slate-950/60 rounded-2xl p-5 border border-slate-800 space-y-3 relative">
            <div className="w-7 h-7 rounded-full bg-emerald-900/80 text-emerald-300 font-bold text-xs flex items-center justify-center border border-emerald-700">
              4
            </div>
            <h4 className="font-bold text-white text-sm">Doctor Decision & Care</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Physician reviews 1-page summary, listens to audio, verifies AI, adds notes, and triggers automated SMS / WhatsApp / IVR callback.
            </p>
            <div className="pt-2 flex items-center gap-1.5 text-[11px] text-emerald-400 font-medium">
              <Send className="w-3.5 h-3.5" />
              <span>Post-Visit Delivery</span>
            </div>
          </div>

        </div>

        {/* Demo Fast-Track Card */}
        <div className="bg-gradient-to-r from-cyan-950/60 via-blue-950/60 to-slate-900 rounded-2xl p-5 border border-cyan-800/40 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="space-y-1 text-center sm:text-left">
            <h4 className="font-bold text-white text-sm flex items-center justify-center sm:justify-start gap-2">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>Experience Meena R. (54 yrs, Tamil, Acute Chest Pain)</span>
            </h4>
            <p className="text-xs text-slate-300">
              Step through live audio simulation, Tamil STT, red-flag extraction, risk score 87/100, and doctor sign-off.
            </p>
          </div>
          <button
            onClick={handleStartPatientDemo}
            className="px-5 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs transition-all shrink-0 shadow-lg shadow-cyan-950"
          >
            Launch Case Study &rarr;
          </button>
        </div>
      </section>

    </div>
  );
};
