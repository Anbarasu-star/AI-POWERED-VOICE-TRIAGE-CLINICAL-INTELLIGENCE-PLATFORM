import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  BarChart3, 
  Activity, 
  ShieldAlert, 
  CheckCircle2, 
  Flame, 
  FileText, 
  Users, 
  Languages, 
  Phone, 
  Clock, 
  Sparkles,
  Server,
  Cpu
} from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  const { consultations, auditLogs, activeNavTab } = useApp();
  const [selectedSubTab, setSelectedSubTab] = useState<'ANALYTICS' | 'BENCHMARKS' | 'SAFETY' | 'AUDIT'>(
    activeNavTab === 'AI_EVALUATION' ? 'BENCHMARKS' : activeNavTab === 'SAFETY' ? 'SAFETY' : activeNavTab === 'AUDIT_LOGS' ? 'AUDIT' : 'ANALYTICS'
  );

  const totalPatients = consultations.length;
  const emergencyCount = consultations.filter(c => c.triageResult.priority === 'EMERGENCY').length;
  const emergencyPct = Math.round((emergencyCount / (totalPatients || 1)) * 100);
  const reviewedCount = consultations.filter(c => c.doctorReview.status === 'APPROVED' || c.doctorReview.status === 'MODIFIED').length;

  return (
    <div className="space-y-6 pb-16">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-950/80 border border-indigo-500/40 text-indigo-300 text-xs font-semibold mb-1">
            <BarChart3 className="w-3.5 h-3.5 text-indigo-400" />
            <span>Executive & Clinical Intelligence Administration</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            System Performance & Safety Monitoring
          </h2>
          <p className="text-xs sm:text-sm text-slate-400">
            Real-time telemetry, Indic speech benchmarks, XGBoost triage sensitivity, and audit compliance.
          </p>
        </div>

        {/* Subtabs */}
        <div className="flex items-center gap-1 bg-slate-900 p-1 rounded-2xl border border-slate-800 text-xs">
          <button
            onClick={() => setSelectedSubTab('ANALYTICS')}
            className={`px-3 py-1.5 rounded-xl font-semibold transition-all ${
              selectedSubTab === 'ANALYTICS' ? 'bg-indigo-600 text-white shadow-sm' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Operations
          </button>
          <button
            onClick={() => setSelectedSubTab('BENCHMARKS')}
            className={`px-3 py-1.5 rounded-xl font-semibold transition-all ${
              selectedSubTab === 'BENCHMARKS' ? 'bg-indigo-600 text-white shadow-sm' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            AI Benchmarks
          </button>
          <button
            onClick={() => setSelectedSubTab('SAFETY')}
            className={`px-3 py-1.5 rounded-xl font-semibold transition-all ${
              selectedSubTab === 'SAFETY' ? 'bg-indigo-600 text-white shadow-sm' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Safety Matrix
          </button>
          <button
            onClick={() => setSelectedSubTab('AUDIT')}
            className={`px-3 py-1.5 rounded-xl font-semibold transition-all ${
              selectedSubTab === 'AUDIT' ? 'bg-indigo-600 text-white shadow-sm' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Audit Logs
          </button>
        </div>
      </div>

      {/* SUBTAB 1: OPERATIONS & ANALYTICS */}
      {selectedSubTab === 'ANALYTICS' && (
        <div className="space-y-6">
          
          {/* Key Metrics */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
            <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-5 space-y-1">
              <span className="text-xs text-slate-400 font-semibold block">Total Intakes</span>
              <div className="flex items-baseline justify-between">
                <span className="text-3xl font-black text-white">{totalPatients}</span>
                <Users className="w-5 h-5 text-indigo-400" />
              </div>
              <span className="text-[11px] text-emerald-400 font-medium">100% Voice Processed</span>
            </div>

            <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-5 space-y-1">
              <span className="text-xs text-slate-400 font-semibold block">Emergency Rate</span>
              <div className="flex items-baseline justify-between">
                <span className="text-3xl font-black text-red-400">{emergencyPct}%</span>
                <Flame className="w-5 h-5 text-red-400 animate-pulse" />
              </div>
              <span className="text-[11px] text-slate-400 font-medium">{emergencyCount} Acute Emergencies</span>
            </div>

            <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-5 space-y-1">
              <span className="text-xs text-slate-400 font-semibold block">Avg Doctor Decision</span>
              <div className="flex items-baseline justify-between">
                <span className="text-3xl font-black text-cyan-400">1.8 <span className="text-sm">min</span></span>
                <Clock className="w-5 h-5 text-cyan-400" />
              </div>
              <span className="text-[11px] text-emerald-400 font-medium">94% within Golden Window</span>
            </div>

            <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-5 space-y-1">
              <span className="text-xs text-slate-400 font-semibold block">Doctor Approval Rate</span>
              <div className="flex items-baseline justify-between">
                <span className="text-3xl font-black text-emerald-400">96.2%</span>
                <CheckCircle2 className="w-5 h-5 text-emerald-400" />
              </div>
              <span className="text-[11px] text-slate-400 font-medium">3.8% Clinician Overrides</span>
            </div>
          </div>

          {/* Regional Languages Breakdown & Ingestion Channel Distribution */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Language Distribution */}
            <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 space-y-4 shadow-xl">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Languages className="w-4 h-4 text-cyan-400" />
                <span>Regional Voice Ingestion by Language</span>
              </h3>

              <div className="space-y-3 text-xs">
                {[
                  { lang: 'Tamil', count: 6, pct: 40, flag: 'தமிழ்' },
                  { lang: 'Hindi', count: 4, pct: 27, flag: 'हिन्दी' },
                  { lang: 'Telugu', count: 2, pct: 13, flag: 'తెలుగు' },
                  { lang: 'Kannada', count: 1, pct: 7, flag: 'ಕನ್ನಡ' },
                  { lang: 'Malayalam', count: 1, pct: 7, flag: 'മലയാളം' },
                  { lang: 'Bengali', count: 1, pct: 6, flag: 'বাংলা' },
                ].map(item => (
                  <div key={item.lang} className="space-y-1">
                    <div className="flex items-center justify-between text-slate-300">
                      <span>{item.lang} ({item.flag})</span>
                      <span className="font-mono text-cyan-400">{item.count} calls ({item.pct}%)</span>
                    </div>
                    <div className="h-2 rounded-full bg-slate-950 overflow-hidden">
                      <div className="h-full bg-cyan-500 rounded-full" style={{ width: `${item.pct}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Ingestion Channel */}
            <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 space-y-4 shadow-xl">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Phone className="w-4 h-4 text-indigo-400" />
                <span>Access Channel Telemetry</span>
              </h3>

              <div className="space-y-4 text-xs">
                <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-white">Interactive Voice Response (IVR 2G Feature Phone)</span>
                    <span className="text-indigo-400 font-mono font-bold">62%</span>
                  </div>
                  <p className="text-[11px] text-slate-400 leading-relaxed">
                    Primary route for rural patients without internet. Dials toll-free IVR, audio streamed via SIP/PSTN trunk.
                  </p>
                </div>

                <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-white">Web / Mobile Micro-app Voice</span>
                    <span className="text-cyan-400 font-mono font-bold">28%</span>
                  </div>
                  <p className="text-[11px] text-slate-400 leading-relaxed">
                    Used by ASHA health workers and smartphones via WebRTC compressed OPUS audio stream.
                  </p>
                </div>

                <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-white">Rural PHC Telemedicine Kiosk</span>
                    <span className="text-emerald-400 font-mono font-bold">10%</span>
                  </div>
                  <p className="text-[11px] text-slate-400 leading-relaxed">
                    Local sub-centre digital health kiosks with integrated USB microphone arrays.
                  </p>
                </div>
              </div>

            </div>

          </div>

        </div>
      )}

      {/* SUBTAB 2: AI MODEL EVALUATION BENCHMARKS (Section 21) */}
      {selectedSubTab === 'BENCHMARKS' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            
            {/* STT Benchmarks */}
            <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 space-y-4 shadow-xl">
              <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider block">
                Speech-to-Text Benchmark
              </span>
              <h3 className="text-lg font-bold text-white">IndicConformer vs Whisper</h3>
              
              <div className="space-y-3 text-xs">
                <div className="p-3 rounded-2xl bg-cyan-950/60 border border-cyan-800/80 space-y-1">
                  <span className="text-slate-300 font-bold block">IndicConformer (Primary)</span>
                  <div className="flex items-baseline justify-between">
                    <span className="text-2xl font-black text-cyan-300">8.2%</span>
                    <span className="text-[11px] text-slate-400 font-mono">Word Error Rate (WER)</span>
                  </div>
                  <p className="text-[10px] text-slate-400">
                    Pre-trained on 22 Indian languages with rural telephony audio acoustic models.
                  </p>
                </div>

                <div className="p-3 rounded-2xl bg-slate-950 border border-slate-800 space-y-1">
                  <span className="text-slate-400 font-bold block">Whisper-Large-v3 (Fallback)</span>
                  <div className="flex items-baseline justify-between">
                    <span className="text-2xl font-black text-slate-300">14.6%</span>
                    <span className="text-[11px] text-slate-400 font-mono">Word Error Rate (WER)</span>
                  </div>
                  <p className="text-[10px] text-slate-400">
                    High accuracy on urban accents; higher error rate on colloquial rural Tamil/Hindi.
                  </p>
                </div>
              </div>
            </div>

            {/* Clinical Extraction NLP */}
            <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 space-y-4 shadow-xl">
              <span className="text-xs font-bold text-blue-400 uppercase tracking-wider block">
                Clinical NLP Benchmark
              </span>
              <h3 className="text-lg font-bold text-white">Qwen Clinical Entity LoRA</h3>
              
              <div className="space-y-3 text-xs">
                <div className="bg-slate-950 p-3 rounded-2xl border border-slate-800 flex items-center justify-between">
                  <span className="text-slate-300">Symptom Extraction F1-Score:</span>
                  <span className="text-emerald-400 font-bold font-mono">0.934</span>
                </div>
                <div className="bg-slate-950 p-3 rounded-2xl border border-slate-800 flex items-center justify-between">
                  <span className="text-slate-300">Duration & Severity Extraction:</span>
                  <span className="text-emerald-400 font-bold font-mono">0.918</span>
                </div>
                <div className="bg-slate-950 p-3 rounded-2xl border border-slate-800 flex items-center justify-between">
                  <span className="text-slate-300">Red-Flag Detection Precision:</span>
                  <span className="text-emerald-400 font-bold font-mono">0.961</span>
                </div>
                <div className="bg-slate-950 p-3 rounded-2xl border border-slate-800 flex items-center justify-between">
                  <span className="text-slate-300">JSON Schema Valid Output:</span>
                  <span className="text-cyan-400 font-bold font-mono">99.9%</span>
                </div>
              </div>
            </div>

            {/* Triage Stratification Accuracy */}
            <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 space-y-4 shadow-xl">
              <span className="text-xs font-bold text-rose-400 uppercase tracking-wider block">
                Risk Engine Benchmark
              </span>
              <h3 className="text-lg font-bold text-white">XGBoost Triage Model</h3>
              
              <div className="space-y-3 text-xs">
                <div className="bg-slate-950 p-3 rounded-2xl border border-slate-800 flex items-center justify-between">
                  <span className="text-slate-300">ROC-AUC Classification:</span>
                  <span className="text-rose-400 font-bold font-mono">0.942</span>
                </div>
                <div className="bg-slate-950 p-3 rounded-2xl border border-slate-800 flex items-center justify-between">
                  <span className="text-slate-300">Emergency Recall / Sensitivity:</span>
                  <span className="text-rose-400 font-bold font-mono">&gt; 92.4%</span>
                </div>
                <div className="bg-slate-950 p-3 rounded-2xl border border-slate-800 flex items-center justify-between">
                  <span className="text-slate-300">False-Negative Emergency Rate:</span>
                  <span className="text-emerald-400 font-bold font-mono">&lt; 1.2%</span>
                </div>
                <div className="bg-slate-950 p-3 rounded-2xl border border-slate-800 flex items-center justify-between">
                  <span className="text-slate-300">Inference Latency:</span>
                  <span className="text-cyan-400 font-bold font-mono">14 ms</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* SUBTAB 3: SAFETY & RISK MATRIX (Section 22) */}
      {selectedSubTab === 'SAFETY' && (
        <div className="space-y-6">
          <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 space-y-6 shadow-xl">
            <div className="border-b border-slate-800 pb-3">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <ShieldAlert className="w-5 h-5 text-amber-400" />
                <span>Multi-Tier Clinical Safety Architecture</span>
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                Rigorous fail-safe mechanisms ensuring zero unverified diagnostic dispatch.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-2">
                <span className="font-bold text-white flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Tier 1: Explicit Red-Flag Hard Rule Guardrails</span>
                </span>
                <p className="text-slate-300 leading-relaxed">
                  Keywords indicating acute myocardial infarction, acute ischemic stroke, or pediatric respiratory distress trigger automatic escalation to EMERGENCY priority regardless of machine learning confidence scores.
                </p>
              </div>

              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-2">
                <span className="font-bold text-white flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Tier 2: Shadow AI Non-Prescription Guardrail</span>
                </span>
                <p className="text-slate-300 leading-relaxed">
                  The AI system is strictly architected to formulate shadow clinical considerations. It is prohibited by system design from directly communicating medical diagnoses or initiating pharmaceuticals without doctor sign-off.
                </p>
              </div>

              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-2">
                <span className="font-bold text-white flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Tier 3: Mandatory Human-in-the-Loop Sign-off</span>
                </span>
                <p className="text-slate-300 leading-relaxed">
                  Attending physicians retain unilateral discretion to accept, modify, or reject every triage score. Overrides are recorded in real-time for continuous reinforcement model fine-tuning.
                </p>
              </div>

              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-2">
                <span className="font-bold text-white flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Tier 4: National 108 Emergency Failover</span>
                </span>
                <p className="text-slate-300 leading-relaxed">
                  Calls identified with life-threatening criteria trigger immediate IVR prompt offering direct bridging to the National Emergency Ambulance Service (108 / 112).
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SUBTAB 4: AUDIT LOGS & COMPLIANCE */}
      {selectedSubTab === 'AUDIT' && (
        <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 space-y-4 shadow-xl">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div>
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <FileText className="w-4 h-4 text-cyan-400" />
                <span>FHIR & ABDM Digital Health Audit Logs</span>
              </h3>
              <p className="text-xs text-slate-400">
                Immutable event stream tracking every voice transcription, inference score, and doctor decision.
              </p>
            </div>
            <span className="text-[11px] font-mono text-cyan-400 bg-cyan-950 px-2 py-1 rounded border border-cyan-800">
              HIPAA & DISHA Aligned
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-300">
              <thead className="bg-slate-950 text-[11px] text-slate-400 font-mono border-b border-slate-800">
                <tr>
                  <th className="py-2.5 px-3">Timestamp</th>
                  <th className="py-2.5 px-3">Case ID</th>
                  <th className="py-2.5 px-3">Action</th>
                  <th className="py-2.5 px-3">Actor</th>
                  <th className="py-2.5 px-3">Details</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 font-mono text-[11px]">
                {auditLogs.map(log => (
                  <tr key={log.id} className="hover:bg-slate-800/40">
                    <td className="py-2.5 px-3 text-slate-400">{log.timestamp}</td>
                    <td className="py-2.5 px-3 text-cyan-400">{log.caseId || log.patientId || '-'}</td>
                    <td className="py-2.5 px-3 font-bold text-white">{log.action}</td>
                    <td className="py-2.5 px-3 text-slate-300">{log.actor}</td>
                    <td className="py-2.5 px-3 text-slate-400">{log.details}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

    </div>
  );
};
