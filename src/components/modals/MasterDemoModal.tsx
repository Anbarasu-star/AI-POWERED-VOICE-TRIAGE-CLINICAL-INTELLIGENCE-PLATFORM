import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  X, 
  PlayCircle, 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  ChevronRight, 
  Play, 
  RotateCcw,
  Volume2,
  ShieldCheck,
  Stethoscope,
  Users
} from 'lucide-react';
import { playMedicalBeep, speakText } from '../../services/audioSimulator';

interface DemoStep {
  step: number;
  title: string;
  category: string;
  judgeGuidance: string;
  actionLabel: string;
  runAction: () => void;
}

export const MasterDemoModal: React.FC = () => {
  const { 
    isMasterDemoModalOpen, 
    setIsMasterDemoModalOpen, 
    loadDemoPatientMeena, 
    setRole, 
    setActiveNavTab, 
    setActiveConsultationId,
    updateDoctorReview,
    sendFollowUpNotification
  } = useApp();

  const [currentStepIdx, setCurrentStepIdx] = useState<number>(0);
  const [isRunningAuto, setIsRunningAuto] = useState<boolean>(false);

  if (!isMasterDemoModalOpen) return null;

  const demoSteps: DemoStep[] = [
    {
      step: 1,
      category: 'Stage 1: Overview',
      title: 'Landing Page & Vision',
      judgeGuidance: 'Highlight: "Voice-first healthcare access through any phone — no smartphone or internet required."',
      actionLabel: 'Go to Landing Page',
      runAction: () => {
        setRole('PATIENT');
        setActiveNavTab('HOME');
      }
    },
    {
      step: 2,
      category: 'Stage 2: Multilingual',
      title: 'Language Selection (Tamil)',
      judgeGuidance: 'Demonstrate support for 10 Indian languages. Select Tamil to test IndicConformer dialectal speech.',
      actionLabel: 'Select Tamil Language',
      runAction: () => {
        setRole('PATIENT');
        setActiveNavTab('LANGUAGE');
      }
    },
    {
      step: 3,
      category: 'Stage 3: Intake Details',
      title: 'Patient Details (Meena R., 54y)',
      judgeGuidance: 'Prefill patient profile: 54 years old, female, rural Dharmapuri, known hypertension and diabetes comorbidity.',
      actionLabel: 'Prefill Patient Meena',
      runAction: () => {
        loadDemoPatientMeena();
        setRole('PATIENT');
        setActiveNavTab('REGISTRATION');
      }
    },
    {
      step: 4,
      category: 'Stage 4: Voice Capture',
      title: 'Voice Triage Intake Screen',
      judgeGuidance: 'Display large microphone interface. Show audio waveform animation and "Use Demo Patient" button.',
      actionLabel: 'Open Voice Triage',
      runAction: () => {
        setRole('PATIENT');
        setActiveNavTab('VOICE_TRIAGE');
      }
    },
    {
      step: 5,
      category: 'Stage 5: Live Voice Input',
      title: 'Tamil Speech Simulation',
      judgeGuidance: 'Play audio utterance: “எனக்கு நேற்று முதல் மார்பு வலி மற்றும் மூச்சுத்திணறல் இருக்கிறது.”',
      actionLabel: 'Play Tamil Audio',
      runAction: () => {
        speakText('எனக்கு நேற்று முதல் மார்பு வலி மற்றும் மூச்சுத்திணறல் இருக்கிறது.', 'ta');
        setRole('PATIENT');
        setActiveNavTab('VOICE_TRIAGE');
      }
    },
    {
      step: 6,
      category: 'Stage 6: Speech-to-Text',
      title: 'IndicConformer Transcription',
      judgeGuidance: 'Show speech recognized in Tamil with 94% confidence and standardized English translation.',
      actionLabel: 'View Transcription',
      runAction: () => {
        setRole('PATIENT');
        setActiveNavTab('VOICE_TRIAGE');
      }
    },
    {
      step: 7,
      category: 'Stage 7: NLP Extraction',
      title: 'Clinical Extraction & Red Flags',
      judgeGuidance: 'Point out extracted symptoms (Chest pain, Shortness of breath) and detected critical Red Flags.',
      actionLabel: 'Inspect Extracted JSON',
      runAction: () => {
        setRole('PATIENT');
        setActiveNavTab('VOICE_TRIAGE');
      }
    },
    {
      step: 8,
      category: 'Stage 8: AI Processing',
      title: 'Visual Triage Pipeline',
      judgeGuidance: 'Show visible pipeline progression: Voice -> STT -> Clinical NLP -> Red Flags -> XGBoost -> Classification.',
      actionLabel: 'Inspect AI Pipeline',
      runAction: () => {
        setRole('PATIENT');
        setActiveNavTab('VOICE_TRIAGE');
      }
    },
    {
      step: 9,
      category: 'Stage 9: Risk Scoring',
      title: 'Risk Score 87/100 (Emergency)',
      judgeGuidance: 'Explain why: Multiple acute red-flags combined with cardiovascular risk factors elevate case to CRITICAL EMERGENCY.',
      actionLabel: 'View Risk Score Gauge',
      runAction: () => {
        setRole('PATIENT');
        setActiveNavTab('VOICE_TRIAGE');
      }
    },
    {
      step: 10,
      category: 'Stage 10: Triage Queue',
      title: 'Doctor Priority Queue',
      judgeGuidance: 'Switch to doctor role. Note Meena R. automatically placed at top of priority queue sorted by acute risk.',
      actionLabel: 'Open Doctor Queue',
      runAction: () => {
        setRole('DOCTOR');
        setActiveNavTab('PRIORITY_QUEUE');
      }
    },
    {
      step: 11,
      category: 'Stage 11: Case Review',
      title: '3-Column Case Workspace',
      judgeGuidance: 'Patient info (left), Audio playback & transcript (center), AI clinical assistant (right).',
      actionLabel: 'Open Meena\'s Case View',
      runAction: () => {
        loadDemoPatientMeena();
        setActiveConsultationId('CASE-2026-MEENA');
        setRole('DOCTOR');
        setActiveNavTab('CASE_VIEW');
      }
    },
    {
      step: 12,
      category: 'Stage 12: Consultation Audio',
      title: 'Listen to Original Tamil Call',
      judgeGuidance: 'Doctor reviews original audio and timestamped transcript to verify patient statements in context.',
      actionLabel: 'Play Consultation Scrubber',
      runAction: () => {
        setRole('DOCTOR');
        setActiveNavTab('CASE_VIEW');
      }
    },
    {
      step: 13,
      category: 'Stage 13: Clinical Intelligence',
      title: 'One-Page Summary & Shadow AI',
      judgeGuidance: 'Point out One-Page Clinical Summary, Shadow Diagnosis with confidence and "Why?", and ICMR RAG guidelines.',
      actionLabel: 'View Clinical Summary & RAG',
      runAction: () => {
        setRole('DOCTOR');
        setActiveNavTab('CASE_VIEW');
      }
    },
    {
      step: 14,
      category: 'Stage 14: Doctor Sign-Off',
      title: 'Doctor-in-the-Loop Approval',
      judgeGuidance: 'Doctor approves assessment, adds clinical notes ("Suspected ACS, immediate 12-lead ECG, chewable Aspirin").',
      actionLabel: 'Approve AI Assessment',
      runAction: () => {
        setRole('DOCTOR');
        setActiveNavTab('CASE_VIEW');
        updateDoctorReview('CASE-2026-MEENA', {
          status: 'APPROVED',
          doctorDiagnosisNotes: 'Suspected Acute Coronary Syndrome. Advise immediate 12-lead ECG and emergency ambulance transfer.',
          treatmentInstructions: 'Transfer to ICCU immediately. Chew Aspirin 300mg.',
        });
      }
    },
    {
      step: 15,
      category: 'Stage 15: Post-Care Delivery',
      title: 'Multi-Channel Care Dispatch',
      judgeGuidance: 'Show SMS sent, WhatsApp medical PDF dispatched, and automated Tamil IVR follow-up scheduled.',
      actionLabel: 'Complete Demo & Dispatch Care',
      runAction: () => {
        setRole('DOCTOR');
        setActiveNavTab('CASE_VIEW');
        sendFollowUpNotification('CASE-2026-MEENA', 'SMS');
        sendFollowUpNotification('CASE-2026-MEENA', 'WHATSAPP');
        sendFollowUpNotification('CASE-2026-MEENA', 'IVR');
        playMedicalBeep(880, 200);
      }
    },
  ];

  const currentStep = demoSteps[currentStepIdx];

  const handleNextStep = () => {
    currentStep.runAction();
    if (currentStepIdx < demoSteps.length - 1) {
      setCurrentStepIdx(prev => prev + 1);
    }
  };

  const handlePrevStep = () => {
    if (currentStepIdx > 0) {
      setCurrentStepIdx(prev => prev - 1);
      demoSteps[currentStepIdx - 1].runAction();
    }
  };

  const handleJumpToStep = (index: number) => {
    setCurrentStepIdx(index);
    demoSteps[index].runAction();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md">
      <div className="relative w-full max-w-3xl bg-slate-900 border border-slate-700 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-amber-500 to-orange-500 p-0.5 flex items-center justify-center text-white shadow-md">
              <PlayCircle className="w-6 h-6 fill-white text-orange-600" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-bold text-white">
                  5-Minute Master Hackathon Demo Flow
                </h2>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-950 text-amber-300 border border-amber-800">
                  Step {currentStep.step} of 15
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Prescribed step-by-step narrative sequence for judging and clinical demonstrations.
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsMasterDemoModalOpen(false)}
            className="p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Current Active Step Highlight Card */}
        <div className="bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 border-2 border-amber-500/60 rounded-3xl p-6 space-y-4 shadow-xl">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-amber-400 uppercase tracking-wider">
              {currentStep.category}
            </span>
            <span className="text-xs font-mono text-slate-400">
              Target Time: ~20 sec
            </span>
          </div>

          <h3 className="text-xl font-black text-white">
            Step {currentStep.step}: {currentStep.title}
          </h3>

          <div className="bg-amber-950/40 p-4 rounded-2xl border border-amber-800/50 space-y-1">
            <span className="text-[11px] font-bold text-amber-300 block">
              What to Say / Highlight to the Judges:
            </span>
            <p className="text-xs text-amber-100/90 leading-relaxed font-sans">
              “{currentStep.judgeGuidance}”
            </p>
          </div>

          {/* Action Trigger Button */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3">
            <button
              onClick={() => {
                currentStep.runAction();
                setIsMasterDemoModalOpen(false);
              }}
              className="w-full sm:w-auto px-6 py-3 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-white font-bold text-xs shadow-lg shadow-orange-950 flex items-center justify-center gap-2 hover:scale-105 active:scale-95 transition-all"
            >
              <Play className="w-4 h-4 fill-white" />
              <span>Execute {currentStep.actionLabel} & View App</span>
            </button>

            <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
              <button
                onClick={handlePrevStep}
                disabled={currentStepIdx === 0}
                className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 disabled:opacity-40 text-xs font-semibold text-slate-200"
              >
                &larr; Prev
              </button>
              <button
                onClick={handleNextStep}
                disabled={currentStepIdx === demoSteps.length - 1}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 disabled:opacity-40 text-xs font-semibold text-cyan-300"
              >
                Next Step ({currentStepIdx + 2}) &rarr;
              </button>
            </div>
          </div>
        </div>

        {/* 15-Step Mini Scrubber */}
        <div className="space-y-2">
          <span className="text-[11px] font-semibold text-slate-400 block">
            Jump to any step in the demonstration sequence:
          </span>
          <div className="grid grid-cols-3 sm:grid-cols-5 gap-1.5">
            {demoSteps.map((s, idx) => {
              const isCurrent = idx === currentStepIdx;
              const isPast = idx < currentStepIdx;
              return (
                <button
                  key={s.step}
                  onClick={() => handleJumpToStep(idx)}
                  className={`p-2 rounded-xl text-left border text-[10px] transition-all flex items-center justify-between ${
                    isCurrent
                      ? 'bg-amber-500/20 border-amber-400 text-amber-200 font-bold'
                      : isPast
                      ? 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200'
                      : 'bg-slate-950/40 border-slate-800/60 text-slate-600 hover:text-slate-400'
                  }`}
                >
                  <span className="truncate">S{s.step}. {s.title}</span>
                  {isPast && <CheckCircle2 className="w-3 h-3 text-emerald-400 shrink-0" />}
                </button>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
};
