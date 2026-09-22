import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  X, 
  Layers, 
  Database, 
  Server, 
  Phone, 
  Cpu, 
  Send, 
  ShieldCheck, 
  CheckCircle2, 
  FileCode2 
} from 'lucide-react';

export const ArchitectureModal: React.FC = () => {
  const { isArchitectureModalOpen, setIsArchitectureModalOpen } = useApp();
  const [activeTab, setActiveTab] = useState<'DIAGRAM' | 'SCHEMA'>('DIAGRAM');

  if (!isArchitectureModalOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
      <div className="relative w-full max-w-4xl max-h-[90vh] bg-slate-900 border border-slate-700/80 rounded-3xl p-6 sm:p-8 shadow-2xl overflow-y-auto space-y-6">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-indigo-950 border border-indigo-800 flex items-center justify-center text-indigo-400">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">
                Technical Architecture & Relational Schema
              </h2>
              <p className="text-xs text-slate-400">
                End-to-End Telephony, Indic Speech, Clinical NLP, and Doctor-in-the-Loop Pipeline.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs">
              <button
                onClick={() => setActiveTab('DIAGRAM')}
                className={`px-3 py-1 rounded-lg font-semibold transition-all ${
                  activeTab === 'DIAGRAM' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Pipeline Diagram
              </button>
              <button
                onClick={() => setActiveTab('SCHEMA')}
                className={`px-3 py-1 rounded-lg font-semibold transition-all ${
                  activeTab === 'SCHEMA' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                PostgreSQL Schema
              </button>
            </div>

            <button
              onClick={() => setIsArchitectureModalOpen(false)}
              className="p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* TAB 1: PIPELINE DIAGRAM */}
        {activeTab === 'DIAGRAM' && (
          <div className="space-y-6">
            
            {/* Visual Node Pipeline */}
            <div className="grid grid-cols-1 md:grid-cols-5 gap-3 text-xs">
              
              {/* Node 1 */}
              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-2">
                <div className="w-7 h-7 rounded-xl bg-cyan-950 border border-cyan-800 flex items-center justify-center text-cyan-400">
                  <Phone className="w-4 h-4" />
                </div>
                <h4 className="font-bold text-white text-sm">1. Voice Ingestion</h4>
                <p className="text-slate-400 text-[11px] leading-relaxed">
                  Twilio / Exotel PSTN Trunking. 8kHz G.711 / WebRTC OPUS. DTMF language navigation.
                </p>
                <span className="inline-block text-[9px] font-mono text-cyan-400 bg-cyan-950/80 px-2 py-0.5 rounded border border-cyan-800">
                  Zero Internet Needed
                </span>
              </div>

              {/* Node 2 */}
              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-2">
                <div className="w-7 h-7 rounded-xl bg-blue-950 border border-blue-800 flex items-center justify-center text-blue-400">
                  <Cpu className="w-4 h-4" />
                </div>
                <h4 className="font-bold text-white text-sm">2. Indic ASR</h4>
                <p className="text-slate-400 text-[11px] leading-relaxed">
                  IndicConformer acoustic models (10+ regional languages). Automatic fallback to Whisper-v3.
                </p>
                <span className="inline-block text-[9px] font-mono text-blue-400 bg-blue-950/80 px-2 py-0.5 rounded border border-blue-800">
                  8.2% WER Telephony
                </span>
              </div>

              {/* Node 3 */}
              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-2">
                <div className="w-7 h-7 rounded-xl bg-indigo-950 border border-indigo-800 flex items-center justify-center text-indigo-400">
                  <Server className="w-4 h-4" />
                </div>
                <h4 className="font-bold text-white text-sm">3. NLP & XGBoost</h4>
                <p className="text-slate-400 text-[11px] leading-relaxed">
                  Qwen LoRA extracts symptoms, duration, history. XGBoost risk scoring + Red-flag rules.
                </p>
                <span className="inline-block text-[9px] font-mono text-indigo-400 bg-indigo-950/80 px-2 py-0.5 rounded border border-indigo-800">
                  AUC-ROC 0.942
                </span>
              </div>

              {/* Node 4 */}
              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-2">
                <div className="w-7 h-7 rounded-xl bg-amber-950 border border-amber-800 flex items-center justify-center text-amber-400">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <h4 className="font-bold text-white text-sm">4. Doctor Review</h4>
                <p className="text-slate-400 text-[11px] leading-relaxed">
                  Doctor workspace with 1-page summary, audio scrubber, shadow AI, RAG evidence, and approval.
                </p>
                <span className="inline-block text-[9px] font-mono text-amber-400 bg-amber-950/80 px-2 py-0.5 rounded border border-amber-800">
                  Human-in-the-Loop
                </span>
              </div>

              {/* Node 5 */}
              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-2">
                <div className="w-7 h-7 rounded-xl bg-emerald-950 border border-emerald-800 flex items-center justify-center text-emerald-400">
                  <Send className="w-4 h-4" />
                </div>
                <h4 className="font-bold text-white text-sm">5. Care Dispatch</h4>
                <p className="text-slate-400 text-[11px] leading-relaxed">
                  Post-visit SMS, WhatsApp medical summary PDF, and outbound synthesized regional IVR callback.
                </p>
                <span className="inline-block text-[9px] font-mono text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-800">
                  Multi-channel Loop
                </span>
              </div>

            </div>

            {/* Architecture Highlights */}
            <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-3 text-xs">
              <h4 className="font-bold text-white">Why This Architecture Solves Rural Scale:</h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-slate-300">
                <div className="space-y-1">
                  <strong className="text-cyan-400 block">Accessibility:</strong>
                  <span>Operates over standard GSM telephony. Zero app install or digital literacy needed by elderly or rural patients.</span>
                </div>
                <div className="space-y-1">
                  <strong className="text-indigo-400 block">Doctor Efficiency:</strong>
                  <span>Pre-visit transcription and 1-page summary compresses triage review time from 15 minutes down to 90 seconds.</span>
                </div>
                <div className="space-y-1">
                  <strong className="text-emerald-400 block">Clinical Safety:</strong>
                  <span>Hard-coded red-flag rules override statistical uncertainty; attending doctors retain final statutory authority.</span>
                </div>
              </div>
            </div>

          </div>
        )}

        {/* TAB 2: POSTGRESQL SCHEMA */}
        {activeTab === 'SCHEMA' && (
          <div className="space-y-4">
            <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 font-mono text-xs text-cyan-300 overflow-x-auto">
              <pre className="leading-relaxed">{`-- PostgreSQL Relational Schema for Voice Triage & Clinical Intelligence

CREATE TABLE patients (
    id VARCHAR(64) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    age INT NOT NULL,
    gender VARCHAR(16) NOT NULL,
    phone VARCHAR(32) NOT NULL,
    location VARCHAR(255),
    preferred_language VARCHAR(32) DEFAULT 'Tamil',
    existing_conditions TEXT[],
    allergies TEXT[],
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE consultations (
    id VARCHAR(64) PRIMARY KEY,
    patient_id VARCHAR(64) REFERENCES patients(id),
    channel VARCHAR(32) CHECK (channel IN ('IVR_PHONE', 'WEB_VOICE', 'PHC_KIOSK')),
    audio_duration_seconds INT,
    stt_model VARCHAR(64) DEFAULT 'IndicConformer',
    stt_confidence NUMERIC(5,2),
    original_transcript TEXT NOT NULL,
    english_transcript TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE clinical_extractions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    consultation_id VARCHAR(64) REFERENCES consultations(id),
    symptoms TEXT[] NOT NULL,
    duration VARCHAR(64),
    severity VARCHAR(32),
    red_flags TEXT[] NOT NULL,
    medical_history TEXT[],
    raw_json JSONB
);

CREATE TABLE triage_results (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    consultation_id VARCHAR(64) REFERENCES consultations(id),
    priority VARCHAR(16) CHECK (priority IN ('EMERGENCY', 'MEDIUM', 'NORMAL')),
    risk_score INT CHECK (risk_score BETWEEN 0 AND 100),
    risk_category VARCHAR(64),
    contributing_factors JSONB
);

CREATE TABLE doctor_reviews (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    consultation_id VARCHAR(64) REFERENCES consultations(id),
    reviewed_by VARCHAR(255) NOT NULL,
    reviewed_at TIMESTAMP WITH TIME ZONE,
    status VARCHAR(32) CHECK (status IN ('PENDING', 'APPROVED', 'MODIFIED', 'REJECTED')),
    original_priority VARCHAR(16),
    final_priority VARCHAR(16),
    doctor_diagnosis_notes TEXT,
    treatment_instructions TEXT,
    follow_up_required BOOLEAN DEFAULT TRUE,
    follow_up_date DATE
);

CREATE TABLE audit_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    case_id VARCHAR(64),
    action VARCHAR(128) NOT NULL,
    actor VARCHAR(128) NOT NULL,
    details TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);`}</pre>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
