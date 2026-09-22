import React from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Phone, 
  CheckCircle2, 
  Clock, 
  MessageSquare, 
  ShieldCheck, 
  Volume2, 
  Calendar, 
  AlertTriangle, 
  Stethoscope, 
  Send 
} from 'lucide-react';
import { speakText } from '../../services/audioSimulator';

export const FollowUpStatus: React.FC = () => {
  const { activeConsultation, setActiveNavTab } = useApp();

  if (!activeConsultation) {
    return (
      <div className="p-8 text-center text-slate-400">
        <p>No active patient consultation found.</p>
        <button
          onClick={() => setActiveNavTab('VOICE_TRIAGE')}
          className="mt-3 px-4 py-2 bg-cyan-600 text-white rounded-xl text-xs font-bold"
        >
          Start Voice Intake
        </button>
      </div>
    );
  }

  const { patient, doctorReview, followUp, triageResult } = activeConsultation;

  const handleListenDoctorNotes = () => {
    speakText(
      doctorReview.treatmentInstructions || 'Seek immediate medical care at nearest District Emergency Hospital.',
      patient.preferredLanguage === 'Tamil' ? 'ta' : patient.preferredLanguage === 'Hindi' ? 'hi' : 'en'
    );
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6 pb-16">
      
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-500/40 text-cyan-300 text-xs font-semibold">
          <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
          <span>Patient Follow-up & Doctor Verification</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
          Consultation Status: {patient.name}
        </h2>
        <p className="text-xs sm:text-sm text-slate-400">
          Phone: {patient.phone} • Intake Ref: #{activeConsultation.id}
        </p>
      </div>

      {/* Emergency Alert if applicable */}
      {triageResult.priority === 'EMERGENCY' && (
        <div className="bg-red-950/60 border border-red-600/80 rounded-3xl p-5 space-y-3 shadow-xl">
          <div className="flex items-start gap-3">
            <span className="p-2 rounded-xl bg-red-600 text-white shrink-0 mt-0.5 animate-pulse">
              <AlertTriangle className="w-5 h-5" />
            </span>
            <div className="space-y-1">
              <h3 className="text-base font-bold text-white">
                CRITICAL TRIAGE PRIORITY: Emergency Medical Attention Advised
              </h3>
              <p className="text-xs text-red-200 leading-relaxed">
                Your reported symptoms require in-person medical evaluation. An emergency referral has been submitted to your nearby PHC & District Hospital.
              </p>
            </div>
          </div>
          <div className="flex items-center justify-between pt-2 border-t border-red-800/80">
            <span className="text-xs text-red-300 font-medium">Free Emergency Ambulance Helpline:</span>
            <a
              href="tel:108"
              className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-xs shadow-md flex items-center gap-1.5"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>Dial 108 Emergency</span>
            </a>
          </div>
        </div>
      )}

      {/* Doctor Review Card */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-blue-950 border border-blue-800 flex items-center justify-center text-blue-400">
              <Stethoscope className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">
                {doctorReview.reviewedBy || 'Dr. S. K. Narayanan (CMO)'}
              </h3>
              <span className="text-xs text-slate-400">
                Attending Medical Officer Verification
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {doctorReview.status === 'APPROVED' ? (
              <span className="px-3 py-1.5 rounded-xl bg-emerald-950 text-emerald-300 border border-emerald-800 text-xs font-bold flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Reviewed & Approved</span>
              </span>
            ) : (
              <span className="px-3 py-1.5 rounded-xl bg-blue-950 text-blue-300 border border-blue-800 text-xs font-bold flex items-center gap-1.5 animate-pulse">
                <Clock className="w-4 h-4 text-blue-400" />
                <span>In Doctor Review Queue</span>
              </span>
            )}
          </div>
        </div>

        {/* Doctor Instructions in Regional Language */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-300 uppercase tracking-wider">
              Doctor's Verified Clinical Advice
            </span>
            <button
              onClick={handleListenDoctorNotes}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-cyan-300 text-xs font-semibold border border-slate-700 transition-colors"
            >
              <Volume2 className="w-3.5 h-3.5 text-cyan-400" />
              <span>Listen in {patient.preferredLanguage}</span>
            </button>
          </div>

          <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-2">
            <p className="text-sm text-white font-medium leading-relaxed">
              “{doctorReview.treatmentInstructions || 'Seek immediate medical care at nearest District Emergency Hospital.'}”
            </p>
            {doctorReview.doctorDiagnosisNotes && (
              <p className="text-xs text-slate-400 border-t border-slate-800/80 pt-2">
                <strong className="text-slate-300">Physician Notes: </strong>
                {doctorReview.doctorDiagnosisNotes}
              </p>
            )}
          </div>
        </div>

        {/* Scheduled Follow-up Date */}
        {doctorReview.followUpRequired && (
          <div className="bg-slate-950/60 p-4 rounded-2xl border border-slate-800 flex items-center justify-between text-xs">
            <div className="flex items-center gap-2 text-slate-300">
              <Calendar className="w-4 h-4 text-cyan-400" />
              <span>Recommended In-Person PHC Follow-up:</span>
            </div>
            <span className="font-bold text-white font-mono">
              {doctorReview.followUpDate || '2026-09-22'} (Within 24 Hours)
            </span>
          </div>
        )}

        {/* Multi-Channel Patient Notification Telemetry */}
        <div className="space-y-3 border-t border-slate-800 pt-4">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
            Telephony & Messaging Receipts
          </span>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
            <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 space-y-1">
              <span className="text-[11px] text-slate-400 block">SMS Notification</span>
              <span className="text-emerald-400 font-bold block">
                {followUp.smsSent ? '✓ Sent to Mobile' : 'Pending Queue'}
              </span>
              <span className="text-[10px] text-slate-500 font-mono">GSM Carrier Gateway</span>
            </div>

            <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 space-y-1">
              <span className="text-[11px] text-slate-400 block">WhatsApp Prescription</span>
              <span className="text-emerald-400 font-bold block">
                {followUp.whatsappSent ? '✓ PDF Delivered' : 'Pending Queue'}
              </span>
              <span className="text-[10px] text-slate-500 font-mono">End-to-End Encrypted</span>
            </div>

            <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 space-y-1">
              <span className="text-[11px] text-slate-400 block">IVR Automated Voice Call</span>
              <span className="text-emerald-400 font-bold block">
                {followUp.ivrScheduled ? '✓ Scheduled Today' : 'Pending Queue'}
              </span>
              <span className="text-[10px] text-slate-500 font-mono">Spoken Regional IVR</span>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};
