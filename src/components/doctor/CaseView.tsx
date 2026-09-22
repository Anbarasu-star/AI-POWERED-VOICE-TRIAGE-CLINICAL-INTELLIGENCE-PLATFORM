import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { TriagePriority } from '../../types';
import { speakText, stopSpeaking, playMedicalBeep } from '../../services/audioSimulator';
import { 
  User, 
  Phone, 
  MapPin, 
  Heart, 
  Pill, 
  AlertCircle, 
  Volume2, 
  Square, 
  Play, 
  Flame, 
  ShieldCheck, 
  Sparkles, 
  CheckCircle2, 
  XCircle, 
  Edit3, 
  Send, 
  Calendar, 
  FileText, 
  Share2, 
  ArrowLeft,
  BookOpen,
  MessageSquare,
  Clock
} from 'lucide-react';

export const CaseView: React.FC = () => {
  const { 
    activeConsultation, 
    updateDoctorReview, 
    sendFollowUpNotification, 
    setActiveNavTab 
  } = useApp();

  if (!activeConsultation) {
    return (
      <div className="p-8 text-center text-slate-400">
        <p>No active case selected.</p>
        <button
          onClick={() => setActiveNavTab('PRIORITY_QUEUE')}
          className="mt-3 px-4 py-2 bg-blue-600 text-white rounded-xl text-xs font-bold"
        >
          Return to Priority Queue
        </button>
      </div>
    );
  }

  const { patient, triageResult, clinicalExtraction, doctorReview, followUp } = activeConsultation;

  // Audio player state
  const [isPlayingAudio, setIsPlayingAudio] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<'SUMMARY' | 'CONSIDERATIONS' | 'RAG_GUIDELINES'>('SUMMARY');

  // Doctor in the loop form state
  const [doctorNotes, setDoctorNotes] = useState<string>(
    doctorReview.doctorDiagnosisNotes || 
    (triageResult.priority === 'EMERGENCY'
      ? 'Suspected Acute Coronary Syndrome. Advise immediate 12-lead ECG, Aspirin 300mg chewable, and ambulance transfer to ICCU.'
      : 'Acute symptoms reviewed. Advise conservative therapy and monitoring.')
  );
  const [finalPriority, setFinalPriority] = useState<TriagePriority>(doctorReview.finalPriority || triageResult.priority);
  const [doctorInstructions, setDoctorInstructions] = useState<string>(
    doctorReview.treatmentInstructions || 
    'Seek immediate medical care at nearest District Emergency Hospital. Do not exert physically. Emergency ambulance alerted.'
  );
  const [followUpRequired, setFollowUpRequired] = useState<boolean>(doctorReview.followUpRequired ?? true);
  const [followUpDate, setFollowUpDate] = useState<string>(doctorReview.followUpDate || '2026-09-22');
  const [reviewStatus, setReviewStatus] = useState<'PENDING' | 'APPROVED' | 'MODIFIED' | 'REJECTED'>(
    doctorReview.status || 'PENDING'
  );

  const handlePlayOriginalAudio = () => {
    if (isPlayingAudio) {
      stopSpeaking();
      setIsPlayingAudio(false);
    } else {
      setIsPlayingAudio(true);
      speakText(
        activeConsultation.originalAudioTranscript,
        patient.preferredLanguage === 'Tamil' ? 'ta' : patient.preferredLanguage === 'Hindi' ? 'hi' : 'en'
      );
      setTimeout(() => {
        setIsPlayingAudio(false);
      }, (activeConsultation.audioDurationSeconds || 12) * 1000);
    }
  };

  const handleApprove = () => {
    playMedicalBeep(880, 100);
    setReviewStatus('APPROVED');
    updateDoctorReview(activeConsultation.id, {
      status: 'APPROVED',
      finalPriority,
      doctorDiagnosisNotes: doctorNotes,
      treatmentInstructions: doctorInstructions,
      followUpRequired,
      followUpDate,
    });
    // Auto-dispatch simulated notification
    sendFollowUpNotification(activeConsultation.id, 'SMS');
    sendFollowUpNotification(activeConsultation.id, 'WHATSAPP');
    sendFollowUpNotification(activeConsultation.id, 'IVR');
  };

  const handleEdit = () => {
    setReviewStatus('MODIFIED');
    updateDoctorReview(activeConsultation.id, {
      status: 'MODIFIED',
      finalPriority,
      doctorDiagnosisNotes: doctorNotes,
      treatmentInstructions: doctorInstructions,
      followUpRequired,
      followUpDate,
    });
  };

  const handleReject = () => {
    setReviewStatus('REJECTED');
    updateDoctorReview(activeConsultation.id, {
      status: 'REJECTED',
      finalPriority: 'NORMAL',
      doctorDiagnosisNotes: `Rejected by Dr. Narayanan: ${doctorNotes}`,
      treatmentInstructions: doctorInstructions,
      followUpRequired: false,
    });
  };

  return (
    <div className="space-y-6 pb-20">
      
      {/* Top Navigation & Status Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setActiveNavTab('PRIORITY_QUEUE')}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
            title="Back to Priority Queue"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-bold text-white">
                Case: {patient.name}
              </h2>
              <span className="text-xs font-mono text-slate-400">
                ({activeConsultation.id})
              </span>
              <span className={`px-2 py-0.5 rounded-full text-[10px] font-extrabold tracking-wide uppercase ${
                triageResult.priority === 'EMERGENCY'
                  ? 'bg-red-500/20 text-red-300 border border-red-500/50'
                  : triageResult.priority === 'MEDIUM'
                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/50'
                  : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/50'
              }`}>
                {triageResult.priority}
              </span>
            </div>
            <p className="text-xs text-slate-400">
              {patient.gender}, {patient.age} yrs • {patient.location} • Preferred: {patient.preferredLanguage}
            </p>
          </div>
        </div>

        {/* Doctor-in-the-Loop Review Status Pill */}
        <div className="flex items-center gap-2">
          {reviewStatus === 'APPROVED' ? (
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-950 border border-emerald-500/50 text-emerald-300 text-xs font-bold">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Doctor Approved & Notifications Sent</span>
            </div>
          ) : reviewStatus === 'MODIFIED' ? (
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-blue-950 border border-blue-500/50 text-blue-300 text-xs font-bold">
              <Edit3 className="w-4 h-4 text-blue-400" />
              <span>Doctor Overrides Active</span>
            </div>
          ) : (
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-950 border border-amber-500/50 text-amber-300 text-xs font-bold animate-pulse">
              <Clock className="w-4 h-4 text-amber-400" />
              <span>Awaiting Doctor Verification</span>
            </div>
          )}
        </div>
      </div>

      {/* 3-Column Clinical Workspace (Section 13) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Patient Profile (3 cols) */}
        <div className="lg:col-span-3 space-y-4">
          <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-5 space-y-4 shadow-lg">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 text-cyan-400" />
                <span>Patient Information</span>
              </h3>
              <span className="text-[10px] text-slate-500 font-mono">
                {patient.id}
              </span>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <span className="text-slate-400 text-[11px] block">Full Name:</span>
                <span className="text-white font-bold text-sm">{patient.name}</span>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <span className="text-slate-400 text-[11px] block">Age / Gender:</span>
                  <span className="text-slate-200 font-medium">{patient.age}y / {patient.gender}</span>
                </div>
                <div>
                  <span className="text-slate-400 text-[11px] block">Language:</span>
                  <span className="text-cyan-300 font-medium">{patient.preferredLanguage}</span>
                </div>
              </div>

              <div>
                <span className="text-slate-400 text-[11px] block">Phone / Device:</span>
                <span className="text-slate-200 font-mono">{patient.phone}</span>
                <span className="text-[10px] text-slate-400 block">(IVR 2G Feature Phone)</span>
              </div>

              <div>
                <span className="text-slate-400 text-[11px] block">Location:</span>
                <span className="text-slate-200 flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-slate-400 shrink-0" />
                  <span>{patient.location}</span>
                </span>
              </div>

              <div className="border-t border-slate-800 pt-3 space-y-1.5">
                <span className="text-slate-400 text-[11px] font-semibold flex items-center gap-1">
                  <Heart className="w-3 h-3 text-rose-400" />
                  <span>Medical History:</span>
                </span>
                <div className="flex flex-wrap gap-1">
                  {patient.existingConditions.map((c, i) => (
                    <span key={i} className="px-2 py-0.5 rounded bg-slate-950 text-slate-300 border border-slate-800 text-[10px]">
                      {c}
                    </span>
                  ))}
                </div>
              </div>

              <div className="space-y-1">
                <span className="text-slate-400 text-[11px] font-semibold flex items-center gap-1">
                  <AlertCircle className="w-3 h-3 text-amber-400" />
                  <span>Drug Allergies:</span>
                </span>
                <p className="text-amber-300 font-medium">
                  {patient.allergies.join(', ') || 'No known allergies reported'}
                </p>
              </div>

              <div className="space-y-1">
                <span className="text-slate-400 text-[11px] font-semibold flex items-center gap-1">
                  <Pill className="w-3 h-3 text-indigo-400" />
                  <span>Current Medications:</span>
                </span>
                <p className="text-slate-300">
                  {patient.currentMedications.join(', ') || 'None recorded'}
                </p>
              </div>
            </div>
          </div>

          {/* Quick Contact & Telephony Badge */}
          <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-4 text-xs space-y-2">
            <span className="text-slate-400 block font-semibold">Toll-free IVR Origin:</span>
            <div className="flex items-center justify-between text-slate-300">
              <span className="font-mono">1800-419-TRIAGE</span>
              <span className="text-[10px] text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded border border-emerald-800">
                Connected
              </span>
            </div>
          </div>
        </div>

        {/* Middle Column: Audio Player & Consultation Transcript (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          
          {/* Audio Player Card (Section 13) */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-5 space-y-4 shadow-lg">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                <Volume2 className="w-3.5 h-3.5 text-cyan-400" />
                <span>Original Audio Recording</span>
              </h3>
              <span className="text-[11px] font-mono text-cyan-400">
                {activeConsultation.audioDurationSeconds} seconds
              </span>
            </div>

            {/* Audio Waveform & Scrubber */}
            <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-3">
              <div className="flex items-center gap-3">
                <button
                  onClick={handlePlayOriginalAudio}
                  className={`w-11 h-11 rounded-xl flex items-center justify-center text-white transition-all shadow-md shrink-0 ${
                    isPlayingAudio
                      ? 'bg-rose-600 hover:bg-rose-500'
                      : 'bg-cyan-600 hover:bg-cyan-500'
                  }`}
                >
                  {isPlayingAudio ? <Square className="w-4 h-4 fill-white" /> : <Play className="w-4 h-4 fill-white ml-0.5" />}
                </button>

                <div className="flex-1 space-y-1">
                  <div className="flex items-center justify-between text-[11px] text-slate-400 font-mono">
                    <span>{isPlayingAudio ? 'Playing...' : '00:00'}</span>
                    <span>00:{activeConsultation.audioDurationSeconds}</span>
                  </div>
                  {/* Waveform Bars */}
                  <div className="h-7 flex items-center gap-1 overflow-hidden">
                    {[35, 60, 20, 80, 45, 90, 30, 75, 50, 65, 25, 85, 40, 70, 30, 55, 20, 40, 65].map((h, i) => (
                      <div
                        key={i}
                        className={`flex-1 rounded-full transition-all ${
                          isPlayingAudio ? 'bg-cyan-400 animate-pulse' : 'bg-slate-700'
                        }`}
                        style={{ height: `${h}%` }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Transcriptions Comparison */}
            <div className="space-y-3 text-xs">
              <div className="space-y-1">
                <span className="text-slate-400 font-semibold text-[11px] block">
                  Original {patient.preferredLanguage} Transcript:
                </span>
                <p className="bg-slate-950 p-3 rounded-xl border border-slate-800 text-slate-100 font-medium leading-relaxed">
                  “{activeConsultation.originalAudioTranscript}”
                </p>
              </div>

              <div className="space-y-1">
                <span className="text-cyan-400 font-semibold text-[11px] block">
                  Standardized Clinical English:
                </span>
                <p className="bg-slate-950 p-3 rounded-xl border border-slate-800 text-cyan-200 font-medium leading-relaxed">
                  “{activeConsultation.englishTranscript}”
                </p>
              </div>

              {/* Timestamped Transcript */}
              <div className="space-y-1 pt-1">
                <span className="text-slate-400 text-[11px] font-semibold block">
                  Timestamped Utterances:
                </span>
                <div className="space-y-1 font-mono text-[11px]">
                  {activeConsultation.transcriptTimestamps.map((t, idx) => (
                    <div key={idx} className="flex items-start gap-2 bg-slate-950/60 p-2 rounded-lg border border-slate-800/80">
                      <span className="text-cyan-400 shrink-0">{t.time}</span>
                      <span className="text-slate-300 font-sans">{t.text}</span>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>

        </div>

        {/* Right Column: AI Triage, Clinical Summary & Doctor Review (4 cols) */}
        <div className="lg:col-span-4 space-y-4">
          
          {/* Risk Score & Triage Status Card */}
          <div className={`p-5 rounded-3xl border shadow-lg space-y-4 ${
            triageResult.priority === 'EMERGENCY'
              ? 'bg-red-950/30 border-red-600/60'
              : triageResult.priority === 'MEDIUM'
              ? 'bg-amber-950/30 border-amber-600/60'
              : 'bg-emerald-950/30 border-emerald-600/60'
          }`}>
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                  AI Risk Score
                </span>
                <span className="text-3xl font-black text-white">
                  {triageResult.riskScore} <span className="text-sm text-slate-400">/ 100</span>
                </span>
              </div>
              <div className={`px-3 py-1.5 rounded-xl font-black text-xs uppercase border ${
                triageResult.priority === 'EMERGENCY'
                  ? 'bg-red-600 border-red-400 text-white'
                  : triageResult.priority === 'MEDIUM'
                  ? 'bg-amber-600 border-amber-400 text-white'
                  : 'bg-emerald-600 border-emerald-400 text-white'
              }`}>
                {triageResult.priority}
              </div>
            </div>

            {/* Red Flags List */}
            {clinicalExtraction.red_flags.length > 0 && (
              <div className="space-y-1.5 border-t border-slate-800/80 pt-3">
                <span className="text-[11px] font-bold text-red-300 flex items-center gap-1">
                  <Flame className="w-3.5 h-3.5 text-red-400" />
                  <span>Detected Red Flags:</span>
                </span>
                <div className="flex flex-wrap gap-1">
                  {clinicalExtraction.red_flags.map((rf, i) => (
                    <span key={i} className="px-2 py-0.5 rounded-md bg-red-900/80 text-red-200 border border-red-600 text-xs font-bold">
                      {rf}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Clinical Assistant Subtabs (One-Page Summary / Shadow Diagnosis / RAG) */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-5 space-y-4 shadow-lg">
            
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <div className="flex items-center gap-1 text-xs">
                <button
                  onClick={() => setActiveTab('SUMMARY')}
                  className={`px-2.5 py-1 rounded-lg font-bold transition-all ${
                    activeTab === 'SUMMARY' ? 'bg-cyan-500/20 text-cyan-300' : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  Summary
                </button>
                <button
                  onClick={() => setActiveTab('CONSIDERATIONS')}
                  className={`px-2.5 py-1 rounded-lg font-bold transition-all ${
                    activeTab === 'CONSIDERATIONS' ? 'bg-cyan-500/20 text-cyan-300' : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  Shadow AI
                </button>
                <button
                  onClick={() => setActiveTab('RAG_GUIDELINES')}
                  className={`px-2.5 py-1 rounded-lg font-bold transition-all ${
                    activeTab === 'RAG_GUIDELINES' ? 'bg-cyan-500/20 text-cyan-300' : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  RAG Guide
                </button>
              </div>
            </div>

            {/* TAB 1: ONE-PAGE CLINICAL SUMMARY (Section 14) */}
            {activeTab === 'SUMMARY' && (
              <div className="space-y-3 text-xs">
                <div className="bg-slate-950 p-3 rounded-2xl border border-slate-800 space-y-2">
                  <div>
                    <span className="text-slate-400 text-[10px] uppercase font-bold block">Chief Complaint:</span>
                    <p className="text-white font-semibold">
                      {clinicalExtraction.symptoms.join(', ')}
                    </p>
                  </div>

                  <div>
                    <span className="text-slate-400 text-[10px] uppercase font-bold block">History:</span>
                    <p className="text-slate-300">
                      Symptoms started approximately {clinicalExtraction.duration}. Severity: {clinicalExtraction.severity}.
                    </p>
                  </div>

                  <div>
                    <span className="text-slate-400 text-[10px] uppercase font-bold block">Relevant Past Medical:</span>
                    <p className="text-slate-300">
                      {clinicalExtraction.medical_history.join(', ')}
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-2 pt-1 border-t border-slate-800">
                    <div>
                      <span className="text-slate-400 text-[10px] uppercase font-bold block">AI Priority:</span>
                      <span className="text-red-400 font-extrabold">{triageResult.priority}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 text-[10px] uppercase font-bold block">Risk Score:</span>
                      <span className="text-white font-extrabold">{triageResult.riskScore} / 100</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 2: AI SHADOW DIAGNOSIS (Section 15) */}
            {activeTab === 'CONSIDERATIONS' && (
              <div className="space-y-3 text-xs">
                <div className="p-2.5 rounded-xl bg-amber-950/40 border border-amber-800/50 text-[11px] text-amber-200">
                  ⚠️ <strong>Shadow Diagnosis Assistant:</strong> Clinical considerations for physician review only. Never present as confirmed diagnoses.
                </div>

                {activeConsultation.shadowDiagnoses.map((sd, i) => (
                  <div key={i} className="bg-slate-950 p-3 rounded-xl border border-slate-800 space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-white text-xs">{sd.condition}</span>
                      <span className="text-emerald-400 font-mono text-[11px] font-bold">
                        {sd.confidence}% Conf.
                      </span>
                    </div>
                    <div className="text-[11px] text-slate-300">
                      <strong className="text-cyan-300">Why? </strong>
                      {sd.reason}
                    </div>
                    <div className="text-[10px] text-slate-400">
                      Contributing: {sd.contributingSymptoms.join(', ')}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* TAB 3: RAG CLINICAL RECOMMENDATIONS (Section 16) */}
            {activeTab === 'RAG_GUIDELINES' && (
              <div className="space-y-3 text-xs">
                {activeConsultation.ragRecommendations.map((rag) => (
                  <div key={rag.id} className="bg-slate-950 p-3 rounded-xl border border-slate-800 space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-white text-xs">{rag.title}</span>
                      <span className="text-blue-400 text-[10px] font-mono">{rag.confidence}%</span>
                    </div>
                    <p className="text-slate-200 text-xs">{rag.action}</p>
                    <div className="text-[10px] text-slate-400 border-t border-slate-800/80 pt-1">
                      <span className="text-slate-500 font-semibold">Source / Guideline: </span>
                      <span className="text-cyan-400">{rag.guidelineSource}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}

          </div>

          {/* DOCTOR-IN-THE-LOOP CONTROL FORM (Section 17 & 18) */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-5 space-y-4 shadow-xl">
            
            <div className="border-b border-slate-800 pb-3">
              <span className="text-[10px] font-bold text-blue-400 uppercase tracking-wider block">
                Doctor-in-the-Loop Authority
              </span>
              <h3 className="text-sm font-bold text-white flex items-center justify-between">
                <span>Final Clinical Decision</span>
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
              </h3>
            </div>

            {/* Action Buttons: APPROVE / EDIT / REJECT */}
            <div className="grid grid-cols-3 gap-2">
              <button
                onClick={handleApprove}
                className="py-2 px-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-[11px] shadow-sm flex items-center justify-center gap-1 transition-all"
              >
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Approve</span>
              </button>

              <button
                onClick={handleEdit}
                className="py-2 px-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-[11px] shadow-sm flex items-center justify-center gap-1 transition-all"
              >
                <Edit3 className="w-3.5 h-3.5" />
                <span>Edit</span>
              </button>

              <button
                onClick={handleReject}
                className="py-2 px-2 rounded-xl bg-slate-800 hover:bg-rose-950 text-slate-300 hover:text-rose-300 font-bold text-[11px] border border-slate-700 flex items-center justify-center gap-1 transition-all"
              >
                <XCircle className="w-3.5 h-3.5" />
                <span>Reject</span>
              </button>
            </div>

            {/* Editable Fields (Section 18) */}
            <div className="space-y-3 text-xs">
              
              {/* Doctor Assessment */}
              <div className="space-y-1">
                <label className="text-[11px] font-semibold text-slate-300">
                  Doctor Assessment Notes:
                </label>
                <textarea
                  value={doctorNotes}
                  onChange={(e) => setDoctorNotes(e.target.value)}
                  rows={2}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
                />
              </div>

              {/* Final Priority & Follow-up */}
              <div className="grid grid-cols-2 gap-2">
                <div className="space-y-1">
                  <label className="text-[11px] font-semibold text-slate-300">
                    Final Priority:
                  </label>
                  <select
                    value={finalPriority}
                    onChange={(e) => setFinalPriority(e.target.value as TriagePriority)}
                    className="w-full px-2.5 py-1.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-blue-500"
                  >
                    <option value="EMERGENCY">Emergency</option>
                    <option value="MEDIUM">Medium</option>
                    <option value="NORMAL">Normal</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-semibold text-slate-300">
                    Follow-up Required?
                  </label>
                  <select
                    value={followUpRequired ? 'Yes' : 'No'}
                    onChange={(e) => setFollowUpRequired(e.target.value === 'Yes')}
                    className="w-full px-2.5 py-1.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-blue-500"
                  >
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                  </select>
                </div>
              </div>

              {/* Follow-up Date */}
              {followUpRequired && (
                <div className="space-y-1">
                  <label className="text-[11px] font-semibold text-slate-300 flex items-center gap-1">
                    <Calendar className="w-3 h-3 text-cyan-400" />
                    <span>Follow-up Date:</span>
                  </label>
                  <input
                    type="date"
                    value={followUpDate}
                    onChange={(e) => setFollowUpDate(e.target.value)}
                    className="w-full px-2.5 py-1.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-blue-500"
                  />
                </div>
              )}

              {/* Treatment Instructions */}
              <div className="space-y-1">
                <label className="text-[11px] font-semibold text-slate-300">
                  Doctor Instructions to Patient:
                </label>
                <textarea
                  value={doctorInstructions}
                  onChange={(e) => setDoctorInstructions(e.target.value)}
                  rows={2}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
                />
              </div>

              {/* Approve & Continue Button */}
              <button
                onClick={handleApprove}
                className="w-full py-3 rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white font-extrabold text-xs shadow-lg shadow-blue-950 transition-all flex items-center justify-center gap-2"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Approve & Notify Patient</span>
              </button>

            </div>

          </div>

          {/* POST-VISIT FOLLOW-UP DISPATCH CENTER (Section 19) */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-5 space-y-4 shadow-lg">
            <div className="border-b border-slate-800 pb-2">
              <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider block">
                Post-Visit Patient Follow-up Center
              </span>
              <h3 className="text-xs font-bold text-white">
                Multi-Channel Dispatch Telemetry
              </h3>
            </div>

            <div className="space-y-2 text-xs">
              
              {/* SMS Channel */}
              <div className="bg-slate-950 p-3 rounded-2xl border border-slate-800 flex items-center justify-between">
                <div>
                  <span className="font-bold text-white block">SMS Notification</span>
                  <span className="text-[10px] text-slate-400">Sent to {patient.phone}</span>
                </div>
                {followUp.smsSent ? (
                  <span className="px-2 py-1 rounded bg-emerald-950 text-emerald-300 text-[10px] font-bold border border-emerald-800">
                    ✓ SMS Sent
                  </span>
                ) : (
                  <button
                    onClick={() => sendFollowUpNotification(activeConsultation.id, 'SMS')}
                    className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 text-[10px] font-bold"
                  >
                    Send SMS
                  </button>
                )}
              </div>

              {/* WhatsApp Channel */}
              <div className="bg-slate-950 p-3 rounded-2xl border border-slate-800 flex items-center justify-between">
                <div>
                  <span className="font-bold text-white block">WhatsApp Message</span>
                  <span className="text-[10px] text-slate-400">Clinical summary PDF & instructions</span>
                </div>
                {followUp.whatsappSent ? (
                  <span className="px-2 py-1 rounded bg-emerald-950 text-emerald-300 text-[10px] font-bold border border-emerald-800">
                    ✓ WhatsApp Sent
                  </span>
                ) : (
                  <button
                    onClick={() => sendFollowUpNotification(activeConsultation.id, 'WHATSAPP')}
                    className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 text-[10px] font-bold"
                  >
                    Send WhatsApp
                  </button>
                )}
              </div>

              {/* IVR Callback Channel */}
              <div className="bg-slate-950 p-3 rounded-2xl border border-slate-800 flex items-center justify-between">
                <div>
                  <span className="font-bold text-white block">IVR Automated Voice Callback</span>
                  <span className="text-[10px] text-slate-400">Spoken in {patient.preferredLanguage}</span>
                </div>
                {followUp.ivrScheduled ? (
                  <span className="px-2 py-1 rounded bg-emerald-950 text-emerald-300 text-[10px] font-bold border border-emerald-800">
                    ✓ IVR Scheduled
                  </span>
                ) : (
                  <button
                    onClick={() => sendFollowUpNotification(activeConsultation.id, 'IVR')}
                    className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 text-[10px] font-bold"
                  >
                    Schedule IVR
                  </button>
                )}
              </div>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
};
