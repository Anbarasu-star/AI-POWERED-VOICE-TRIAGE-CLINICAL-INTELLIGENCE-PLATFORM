import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '../../context/AppContext';
import { SUPPORTED_LANGUAGES } from '../../data/languages';
import { extractClinicalInformation } from '../../services/triageEngine';
import { playMedicalBeep, speakText, stopSpeaking } from '../../services/audioSimulator';
import { 
  Mic, 
  Square, 
  RotateCcw, 
  Volume2, 
  Send, 
  Sparkles, 
  AlertTriangle, 
  CheckCircle2, 
  Layers, 
  FileCode2, 
  Activity, 
  ShieldAlert,
  ArrowRight,
  Flame,
  Clock,
  Radio
} from 'lucide-react';
import { ConsultationRecord, TriageResult, ClinicalExtraction } from '../../types';

export const VoiceTriage: React.FC = () => {
  const { 
    selectedLanguage, 
    patientDraft, 
    addNewConsultation, 
    setRole, 
    setActiveNavTab, 
    setActiveConsultationId 
  } = useApp();

  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [recordingSeconds, setRecordingSeconds] = useState<number>(0);
  const [hasRecordedAudio, setHasRecordedAudio] = useState<boolean>(false);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [pipelineStage, setPipelineStage] = useState<number>(0); // 0: Idle, 1: STT, 2: NLP, 3: RedFlags, 4: XGBoost, 5: Ready
  const [liveTranscript, setLiveTranscript] = useState<string>('');
  const [englishTranslation, setEnglishTranslation] = useState<string>('');
  const [showJson, setShowJson] = useState<boolean>(false);
  const [isPlayingAudio, setIsPlayingAudio] = useState<boolean>(false);

  // Extracted Results state
  const [extractionResult, setExtractionResult] = useState<ClinicalExtraction | null>(null);
  const [triageResult, setTriageResult] = useState<TriageResult | null>(null);

  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const currentLangMeta = SUPPORTED_LANGUAGES.find(l => l.id === selectedLanguage) || SUPPORTED_LANGUAGES[0];

  // Recording timer
  useEffect(() => {
    if (isRecording) {
      setRecordingSeconds(0);
      timerRef.current = setInterval(() => {
        setRecordingSeconds(prev => prev + 1);
      }, 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isRecording]);

  // Load Demo Patient (Meena R. - Tamil Emergency Chest Pain)
  const handleLoadDemoPatient = () => {
    playMedicalBeep(880, 80);
    setIsRecording(false);
    setIsProcessing(true);
    setPipelineStage(1);

    // Step 1: Simulated Audio to Transcript
    setTimeout(() => {
      setHasRecordedAudio(true);
      setRecordingSeconds(14);
      setLiveTranscript('எனக்கு நேற்று முதல் மார்பு வலி மற்றும் மூச்சுத்திணறல் இருக்கிறது. இடது கையில் வலி பரவுகிறது.');
      setEnglishTranslation('I have had chest pain and difficulty breathing since yesterday. The pain is radiating to my left arm.');
      setPipelineStage(2);
    }, 800);

    // Step 2: Clinical Extraction
    setTimeout(() => {
      setPipelineStage(3);
    }, 1500);

    // Step 3: Red-Flag Detection
    setTimeout(() => {
      setPipelineStage(4);
    }, 2200);

    // Step 4: XGBoost Risk Scoring & Classification
    setTimeout(() => {
      const extracted = extractClinicalInformation(
        'chest pain shortness of breath radiating arm',
        'Tamil',
        54,
        ['Hypertension', 'Type 2 Diabetes']
      );
      setExtractionResult(extracted.extraction);
      setTriageResult({
        ...extracted.triage,
        riskScore: 87,
        priority: 'EMERGENCY',
        riskCategory: 'CRITICAL EMERGENCY',
      });
      setPipelineStage(5);
      setIsProcessing(false);
    }, 3000);
  };

  // Start Live Mic Recording (Simulated or Web Speech)
  const handleStartRecording = () => {
    playMedicalBeep(1040, 100);
    setIsRecording(true);
    setHasRecordedAudio(false);
    setExtractionResult(null);
    setTriageResult(null);
    setLiveTranscript('');
    setEnglishTranslation('');

    // If browser supports webkitSpeechRecognition
    if (typeof window !== 'undefined' && ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window)) {
      try {
        const SpeechRec = (window as unknown as { SpeechRecognition: unknown; webkitSpeechRecognition: unknown }).SpeechRecognition || 
                          (window as unknown as { webkitSpeechRecognition: unknown }).webkitSpeechRecognition;
        if (SpeechRec) {
          // Can listen live if user speaks
        }
      } catch (e) {
        console.warn('Speech API init:', e);
      }
    }
  };

  const handleStopRecording = () => {
    playMedicalBeep(640, 100);
    setIsRecording(false);
    setHasRecordedAudio(true);
    setIsProcessing(true);
    setPipelineStage(1);

    // If transcript was empty, use realistic transcript for the selected language
    const sampleInput = currentLangMeta.samplePrompt;
    
    setTimeout(() => {
      setLiveTranscript(sampleInput);
      setEnglishTranslation(
        selectedLanguage === 'Tamil'
          ? 'I have had chest pain and difficulty breathing since yesterday. The pain radiates to my left arm.'
          : selectedLanguage === 'Hindi'
          ? 'I have high fever, severe cough, and breathing difficulty for two days.'
          : selectedLanguage === 'Telugu'
          ? 'Since morning my right hand and leg feel numb and unable to move. My speech is slurred.'
          : 'I have severe chest tightness, sweating, and shortness of breath since last night.'
      );
      setPipelineStage(2);
    }, 900);

    setTimeout(() => {
      setPipelineStage(3);
    }, 1700);

    setTimeout(() => {
      setPipelineStage(4);
    }, 2400);

    setTimeout(() => {
      const extracted = extractClinicalInformation(
        sampleInput,
        selectedLanguage,
        patientDraft.age || 54,
        patientDraft.existingConditions || ['Hypertension']
      );
      setExtractionResult(extracted.extraction);
      setTriageResult(extracted.triage);
      setPipelineStage(5);
      setIsProcessing(false);
    }, 3200);
  };

  const handlePlayAudio = () => {
    setIsPlayingAudio(true);
    speakText(liveTranscript || currentLangMeta.samplePrompt, selectedLanguage === 'Tamil' ? 'ta' : 'hi');
    setTimeout(() => {
      setIsPlayingAudio(false);
    }, (recordingSeconds || 8) * 1000);
  };

  const handleSubmitConsultation = () => {
    if (!triageResult || !extractionResult) return;

    const newCaseId = `CASE-2026-${Math.floor(100 + Math.random() * 899)}`;
    const newRecord: ConsultationRecord = {
      id: newCaseId,
      patientId: `PT-${Math.floor(1000 + Math.random() * 9000)}`,
      patient: {
        id: `PT-${Math.floor(1000 + Math.random() * 9000)}`,
        name: patientDraft.name || 'Meena R.',
        age: patientDraft.age || 54,
        gender: patientDraft.gender || 'Female',
        phone: patientDraft.phone || '+91 94432 18920',
        location: patientDraft.location || 'Dharmapuri Rural, TN',
        preferredLanguage: selectedLanguage,
        existingConditions: patientDraft.existingConditions || ['Hypertension', 'Type 2 Diabetes'],
        allergies: patientDraft.allergies || ['Penicillin'],
        currentMedications: patientDraft.currentMedications || ['Amlodipine 5mg'],
        registeredAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      },
      createdAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      channel: 'WEB_VOICE',
      audioDurationSeconds: recordingSeconds || 14,
      sttLanguageDetected: selectedLanguage,
      sttConfidence: 94,
      sttModel: 'IndicConformer',
      originalAudioTranscript: liveTranscript,
      englishTranscript: englishTranslation,
      transcriptTimestamps: [
        { time: '00:00 - 00:06', text: liveTranscript.slice(0, Math.floor(liveTranscript.length / 2)) },
        { time: '00:06 - 00:14', text: liveTranscript.slice(Math.floor(liveTranscript.length / 2)) },
      ],
      clinicalExtraction: extractionResult,
      triageResult: triageResult,
      shadowDiagnoses: [
        {
          condition: triageResult.priority === 'EMERGENCY'
            ? 'Suspected Acute Coronary Syndrome (ACS) / NSTEMI'
            : 'Acute Inflammatory Presentation',
          confidence: 84,
          urgency: triageResult.priority === 'EMERGENCY' ? 'Immediate' : 'Within 2-4 hrs',
          contributingSymptoms: extractionResult.symptoms,
          reason: 'Calculated via IndicConformer transcription and XGBoost red-flag rule weights.',
        }
      ],
      ragRecommendations: [
        {
          id: 'RAG-NEW-01',
          title: 'Immediate 12-Lead ECG & ER Assessment',
          action: 'Perform emergency 12-lead ECG; evaluate cardiac enzymes; notify attending cardiologist.',
          guidelineSource: 'ICMR Guidelines for Acute Coronary Syndromes (2024)',
          rationale: 'Time-to-ECG is critical in ruling out ST-elevation myocardial infarction.',
          confidence: 96,
          level: 'Urgent',
        }
      ],
      doctorReview: {
        reviewedBy: 'Dr. S. K. Narayanan (CMO)',
        reviewedAt: 'Awaiting Doctor Review',
        status: 'PENDING',
        originalPriority: triageResult.priority,
        finalPriority: triageResult.priority,
        doctorDiagnosisNotes: '',
        treatmentInstructions: '',
        followUpRequired: true,
        actionTaken: triageResult.priority === 'EMERGENCY' ? 'Admit to ER' : 'Urgent Clinic Visit',
      },
      followUp: {
        smsSent: false,
        whatsappSent: false,
        ivrScheduled: false,
      },
      waitingTimeMinutes: 2,
    };

    addNewConsultation(newRecord);
    setActiveConsultationId(newCaseId);

    // Switch view to Doctor priority queue or case view
    setRole('DOCTOR');
    setActiveNavTab('PRIORITY_QUEUE');
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-16">
      
      {/* Voice Intake Header */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-500/40 text-cyan-300 text-xs font-semibold">
          <Radio className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
          <span>Patient Intake Step 3 of 3 • Language: {selectedLanguage}</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Tell us what you're experiencing
        </h2>
        <p className="text-base text-slate-300 max-w-lg mx-auto">
          “Speak naturally in your preferred language.”
        </p>
      </div>

      {/* Main Microphone Card */}
      <div className="bg-slate-900/95 border border-slate-800 rounded-3xl p-6 sm:p-10 shadow-2xl relative overflow-hidden">
        
        {/* Glow backdrop when recording */}
        {isRecording && (
          <div className="absolute inset-0 bg-red-600/10 pointer-events-none animate-pulse" />
        )}

        <div className="flex flex-col items-center justify-center space-y-6 text-center">
          
          {/* Large Animated Microphone Button */}
          <div className="relative">
            {isRecording && (
              <>
                <div className="absolute -inset-4 rounded-full bg-rose-500/30 animate-ping pointer-events-none" />
                <div className="absolute -inset-8 rounded-full bg-rose-500/20 animate-pulse pointer-events-none" />
              </>
            )}

            <button
              onClick={isRecording ? handleStopRecording : handleStartRecording}
              disabled={isProcessing}
              className={`w-28 h-28 sm:w-32 sm:h-32 rounded-full flex flex-col items-center justify-center shadow-2xl transition-all duration-300 relative z-10 ${
                isRecording
                  ? 'bg-rose-600 text-white shadow-rose-900/80 ring-4 ring-rose-400/50 scale-105'
                  : 'bg-gradient-to-tr from-cyan-600 via-blue-600 to-indigo-600 text-white shadow-cyan-950/80 hover:scale-105 hover:shadow-cyan-900'
              } ${isProcessing ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {isRecording ? (
                <>
                  <Square className="w-10 h-10 fill-white" />
                  <span className="text-[11px] font-bold mt-1">STOP</span>
                </>
              ) : (
                <>
                  <Mic className="w-11 h-11" />
                  <span className="text-[11px] font-bold mt-1">
                    {hasRecordedAudio ? 'RECORD AGAIN' : 'TAP TO SPEAK'}
                  </span>
                </>
              )}
            </button>
          </div>

          {/* Recording Timer & Status */}
          <div className="space-y-1">
            {isRecording ? (
              <div className="flex items-center gap-2 text-rose-400 font-mono text-base font-bold animate-pulse">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-500" />
                <span>Recording Live Audio: {recordingSeconds}s</span>
              </div>
            ) : hasRecordedAudio ? (
              <span className="text-xs font-semibold text-emerald-400 flex items-center gap-1.5 justify-center">
                <CheckCircle2 className="w-4 h-4" />
                Audio captured ({recordingSeconds || 14} seconds)
              </span>
            ) : (
              <p className="text-xs text-slate-400">
                Click microphone to speak or click <strong className="text-cyan-300">Use Demo Patient</strong> below.
              </p>
            )}
          </div>

          {/* Animated Audio Waveform */}
          <div className="w-full max-w-lg h-14 bg-slate-950/80 rounded-2xl border border-slate-800/90 px-6 flex items-center justify-center gap-1 shadow-inner">
            {[16, 32, 54, 28, 70, 42, 60, 85, 45, 90, 35, 75, 50, 68, 30, 80, 40, 22, 65, 38, 20, 50, 30].map((h, idx) => (
              <div
                key={idx}
                className={`w-1.5 rounded-full transition-all duration-150 ${
                  isRecording
                    ? 'bg-rose-500'
                    : isPlayingAudio
                    ? 'bg-cyan-400'
                    : hasRecordedAudio
                    ? 'bg-blue-500/70'
                    : 'bg-slate-700/50'
                }`}
                style={{
                  height: isRecording || isPlayingAudio ? `${Math.max(15, (h * (idx % 2 === 0 ? 1 : 0.8)))}%` : '20%',
                }}
              />
            ))}
          </div>

          {/* Control Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            
            {/* Use Demo Patient Button (MANDATORY REQUIREMENT) */}
            <button
              onClick={handleLoadDemoPatient}
              disabled={isRecording || isProcessing}
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white text-xs font-bold shadow-lg shadow-amber-950/50 transition-all flex items-center gap-2 hover:scale-105 active:scale-95"
            >
              <Sparkles className="w-4 h-4 fill-white" />
              <span>Use Demo Patient (Meena R.)</span>
            </button>

            {hasRecordedAudio && (
              <>
                <button
                  onClick={handlePlayAudio}
                  disabled={isPlayingAudio}
                  className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 text-xs font-semibold transition-all flex items-center gap-1.5"
                >
                  <Volume2 className="w-4 h-4 text-cyan-400" />
                  <span>Replay Audio</span>
                </button>

                <button
                  onClick={handleStartRecording}
                  className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 text-xs font-semibold transition-all flex items-center gap-1.5"
                >
                  <RotateCcw className="w-4 h-4 text-slate-400" />
                  <span>Record Again</span>
                </button>
              </>
            )}

          </div>

          {/* Example Demo Input Prompt */}
          <div className="pt-2 text-xs text-slate-400 max-w-md">
            <span>Example demo speech input: </span>
            <span className="text-cyan-300 font-medium font-sans">
              “{currentLangMeta.samplePrompt}”
            </span>
          </div>

        </div>

      </div>

      {/* Visible AI Triage Processing Pipeline (Section 10) */}
      {(isProcessing || pipelineStage > 0) && (
        <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 space-y-5 shadow-xl">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center gap-2">
              <Activity className="w-4 h-4 text-cyan-400 animate-spin" />
              <h3 className="text-xs font-bold text-white uppercase tracking-wider">
                Multi-Stage AI Triage Engine
              </h3>
            </div>
            <span className="text-[11px] font-mono text-cyan-400">
              {pipelineStage === 5 ? 'Processing Complete' : `Pipeline Stage ${pipelineStage}/5`}
            </span>
          </div>

          {/* Pipeline Step Bars */}
          <div className="grid grid-cols-2 sm:grid-cols-6 gap-2 text-center text-[11px] font-semibold">
            {[
              { id: 1, label: 'VOICE CAPTURE' },
              { id: 2, label: 'TRANSCRIPTION' },
              { id: 3, label: 'CLINICAL NLP' },
              { id: 4, label: 'RED-FLAG RULES' },
              { id: 5, label: 'RISK SCORING' },
              { id: 6, label: 'CLASSIFICATION' },
            ].map((step, idx) => {
              const isDone = pipelineStage >= step.id;
              const isCurrent = pipelineStage === step.id - 1 && isProcessing;
              return (
                <div
                  key={step.id}
                  className={`p-2.5 rounded-xl border transition-all ${
                    isDone
                      ? 'bg-cyan-950/80 border-cyan-500/60 text-cyan-300'
                      : isCurrent
                      ? 'bg-blue-950/60 border-blue-400 text-blue-200 animate-pulse'
                      : 'bg-slate-950/40 border-slate-800/80 text-slate-500'
                  }`}
                >
                  <span className="block text-[9px] text-slate-400 font-mono mb-0.5">
                    Stage 0{step.id}
                  </span>
                  <span>{step.label}</span>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Speech-to-Text & Transcription Results (Section 8) */}
      {liveTranscript && (
        <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl">
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
            <div>
              <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider">
                Live Transcription (STT)
              </span>
              <h3 className="text-lg font-bold text-white">
                Patient's Spoken Statement
              </h3>
            </div>

            {/* STT Model Telemetry Badges */}
            <div className="flex flex-wrap items-center gap-2 text-xs">
              <div className="px-2.5 py-1 rounded-lg bg-slate-950 border border-slate-800 text-slate-300">
                Language: <strong className="text-cyan-300">{selectedLanguage}</strong>
              </div>
              <div className="px-2.5 py-1 rounded-lg bg-slate-950 border border-slate-800 text-slate-300">
                Speech Confidence: <strong className="text-emerald-400">94%</strong>
              </div>
              <div className="px-2.5 py-1 rounded-lg bg-cyan-950 border border-cyan-800 text-cyan-300 font-mono">
                Model: <strong>IndicConformer</strong>
              </div>
              <div className="px-2 py-1 rounded-lg bg-slate-800 text-slate-400 text-[10px]">
                Fallback: Whisper-v3
              </div>
            </div>
          </div>

          {/* Transcript Comparison (Original Language + Clinical English) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-slate-950/70 p-4 rounded-2xl border border-slate-800/80 space-y-2">
              <span className="text-xs font-semibold text-slate-400 flex items-center gap-1.5">
                <span>Original {selectedLanguage} Audio Transcription:</span>
              </span>
              <p className="text-slate-100 font-medium text-base leading-relaxed">
                “{liveTranscript}”
              </p>
            </div>

            <div className="bg-slate-950/70 p-4 rounded-2xl border border-slate-800/80 space-y-2">
              <span className="text-xs font-semibold text-cyan-400 flex items-center gap-1.5">
                <span>Standardized Clinical English Translation:</span>
              </span>
              <p className="text-cyan-200 font-medium text-base leading-relaxed">
                “{englishTranslation}”
              </p>
            </div>
          </div>

        </div>
      )}

      {/* Clinical Information Extraction & Red-Flag Detection (Section 9) */}
      {extractionResult && (
        <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div>
              <span className="text-xs font-bold text-blue-400 uppercase tracking-wider">
                Clinical NLP Extraction (Qwen LoRA Architecture)
              </span>
              <h3 className="text-lg font-bold text-white">
                Extracted Medical Entities & Red Flags
              </h3>
            </div>
            <button
              onClick={() => setShowJson(!showJson)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs text-slate-300 border border-slate-700 font-mono"
            >
              <FileCode2 className="w-3.5 h-3.5 text-cyan-400" />
              <span>{showJson ? 'Hide JSON' : 'View Structured JSON'}</span>
            </button>
          </div>

          {/* Extraction Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            
            {/* Symptoms */}
            <div className="bg-slate-950/70 p-4 rounded-2xl border border-slate-800 space-y-2">
              <span className="text-xs text-slate-400 font-semibold block">Symptoms</span>
              <div className="flex flex-wrap gap-1.5">
                {extractionResult.symptoms.map((s, i) => (
                  <span key={i} className="px-2 py-0.5 rounded-md bg-blue-950 text-blue-300 border border-blue-800 text-xs font-medium">
                    {s}
                  </span>
                ))}
              </div>
            </div>

            {/* Duration & Severity */}
            <div className="bg-slate-950/70 p-4 rounded-2xl border border-slate-800 space-y-2">
              <span className="text-xs text-slate-400 font-semibold block">Duration & Severity</span>
              <div className="text-xs text-slate-200 space-y-1">
                <p>Duration: <strong className="text-white">{extractionResult.duration}</strong></p>
                <p>Severity: <strong className="text-rose-400">{extractionResult.severity}</strong></p>
              </div>
            </div>

            {/* History & Medications */}
            <div className="bg-slate-950/70 p-4 rounded-2xl border border-slate-800 space-y-2">
              <span className="text-xs text-slate-400 font-semibold block">Medical History</span>
              <div className="text-xs text-slate-300 space-y-1">
                <p>{extractionResult.medical_history.join(', ')}</p>
                <p className="text-slate-400 text-[11px]">Meds: {extractionResult.medications.join(', ')}</p>
              </div>
            </div>

            {/* Red Flags */}
            <div className="bg-red-950/40 p-4 rounded-2xl border border-red-800/60 space-y-2">
              <span className="text-xs text-red-300 font-semibold flex items-center gap-1">
                <Flame className="w-3.5 h-3.5 text-red-400" />
                <span>Detected Red Flags</span>
              </span>
              <div className="flex flex-wrap gap-1.5">
                {extractionResult.red_flags.map((rf, i) => (
                  <span key={i} className="px-2 py-0.5 rounded-md bg-red-900/80 text-red-200 border border-red-600 text-xs font-bold animate-pulse">
                    {rf}
                  </span>
                ))}
              </div>
            </div>

          </div>

          {/* Toggleable Structured JSON Viewer */}
          {showJson && (
            <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 font-mono text-xs text-cyan-300 overflow-x-auto">
              <pre>{JSON.stringify(extractionResult, null, 2)}</pre>
            </div>
          )}

        </div>
      )}

      {/* AI Triage Classification & Risk Score Gauge (Section 10 & 11) */}
      {triageResult && (
        <div className={`rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl border transition-all ${
          triageResult.priority === 'EMERGENCY'
            ? 'bg-gradient-to-b from-red-950/80 via-slate-900 to-slate-950 border-red-600/70 ring-2 ring-red-500/20'
            : triageResult.priority === 'MEDIUM'
            ? 'bg-gradient-to-b from-amber-950/80 via-slate-900 to-slate-950 border-amber-600/70'
            : 'bg-gradient-to-b from-emerald-950/80 via-slate-900 to-slate-950 border-emerald-600/70'
        }`}>
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800/80 pb-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                XGBoost + Rule-Based Triage Engine Output
              </span>
              <h3 className="text-2xl font-black text-white flex items-center gap-2.5">
                {triageResult.priority === 'EMERGENCY' && <span className="text-red-500">🔴 EMERGENCY</span>}
                {triageResult.priority === 'MEDIUM' && <span className="text-amber-500">🟠 MEDIUM</span>}
                {triageResult.priority === 'NORMAL' && <span className="text-emerald-500">🟢 NORMAL</span>}
              </h3>
            </div>

            {/* Risk Score Pill */}
            <div className="flex items-center gap-3">
              <div className="text-right">
                <span className="text-[11px] text-slate-400 block font-semibold">Triage Risk Score</span>
                <span className="text-3xl font-extrabold text-white">
                  {triageResult.riskScore} <span className="text-sm text-slate-400">/ 100</span>
                </span>
              </div>
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center font-bold text-sm shadow-md border ${
                triageResult.priority === 'EMERGENCY'
                  ? 'bg-red-600 border-red-400 text-white'
                  : triageResult.priority === 'MEDIUM'
                  ? 'bg-amber-600 border-amber-400 text-white'
                  : 'bg-emerald-600 border-emerald-400 text-white'
              }`}>
                {triageResult.priority === 'EMERGENCY' ? 'HIGH' : triageResult.priority === 'MEDIUM' ? 'MED' : 'LOW'}
              </div>
            </div>
          </div>

          {/* Explanation & Contributing Factors (Section 11) */}
          <div className="space-y-3">
            <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 text-xs text-slate-200">
              <strong className="text-white block mb-1">Triage Algorithm Explanation:</strong>
              “High priority because multiple red-flag symptoms ({extractionResult?.red_flags.join(', ')}) were detected alongside cardiovascular comorbidity.”
            </div>

            <div className="space-y-1.5">
              <span className="text-xs font-semibold text-slate-400">
                Contributing Risk Factors:
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                {triageResult.contributingFactors.map((factor, idx) => (
                  <div key={idx} className="bg-slate-950/60 p-3 rounded-xl border border-slate-800/80 space-y-1 text-xs">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-white">{factor.name}</span>
                      <span className="text-rose-400 font-mono font-bold">+{factor.weight} pts</span>
                    </div>
                    <p className="text-slate-400 text-[11px] leading-relaxed">
                      {factor.reason}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Final Submit / Dispatch Button to Doctor Workspace */}
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-slate-800">
            <p className="text-xs text-slate-400 italic">
              * AI decision support only. Doctor review is required for all triage classifications.
            </p>

            <button
              onClick={handleSubmitConsultation}
              className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-gradient-to-r from-red-600 via-rose-600 to-orange-600 hover:from-red-500 hover:to-orange-500 text-white font-extrabold text-sm shadow-xl shadow-red-950/60 transition-all flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-[0.98]"
            >
              <span>Submit to Priority Queue & View as Doctor</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </div>
      )}

    </div>
  );
};
