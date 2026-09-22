import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  ConsultationRecord, 
  UserRole, 
  IndianLanguage, 
  DoctorReview, 
  AuditLog, 
  PatientRecord 
} from '../types';
import { INITIAL_CONSULTATIONS } from '../data/seedData';
import confetti from 'canvas-confetti';

interface AppContextType {
  role: UserRole;
  setRole: (role: UserRole) => void;
  activeNavTab: string;
  setActiveNavTab: (tab: string) => void;
  
  // Consultations & Active Case
  consultations: ConsultationRecord[];
  activeConsultationId: string;
  setActiveConsultationId: (id: string) => void;
  activeConsultation: ConsultationRecord | undefined;
  
  // Patient Draft Form
  selectedLanguage: IndianLanguage;
  setSelectedLanguage: (lang: IndianLanguage) => void;
  patientDraft: Partial<PatientRecord>;
  setPatientDraft: React.Dispatch<React.SetStateAction<Partial<PatientRecord>>>;
  
  // Actions
  addNewConsultation: (record: ConsultationRecord) => void;
  updateDoctorReview: (consultationId: string, review: Partial<DoctorReview>) => void;
  sendFollowUpNotification: (consultationId: string, channel: 'SMS' | 'WHATSAPP' | 'IVR') => void;
  loadDemoPatientMeena: () => void;
  resetToInitialData: () => void;
  
  // Modals & Tools
  isIvrModalOpen: boolean;
  setIsIvrModalOpen: (open: boolean) => void;
  isArchitectureModalOpen: boolean;
  setIsArchitectureModalOpen: (open: boolean) => void;
  isMasterDemoModalOpen: boolean;
  setIsMasterDemoModalOpen: (open: boolean) => void;
  
  // Audit Logs
  auditLogs: AuditLog[];
  addAuditLog: (action: string, details: string, patientId?: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [role, setRole] = useState<UserRole>('PATIENT');
  const [activeNavTab, setActiveNavTab] = useState<string>('HOME');
  
  // Consultations state initialized from seed data
  const [consultations, setConsultations] = useState<ConsultationRecord[]>(() => {
    return INITIAL_CONSULTATIONS;
  });

  const [activeConsultationId, setActiveConsultationId] = useState<string>('CASE-2026-081');
  const [selectedLanguage, setSelectedLanguage] = useState<IndianLanguage>('Tamil');
  
  // Patient intake draft
  const [patientDraft, setPatientDraft] = useState<Partial<PatientRecord>>({
    name: 'Meena R.',
    age: 54,
    gender: 'Female',
    phone: '+91 94432 18920',
    location: 'Dharmapuri Rural, Tamil Nadu',
    preferredLanguage: 'Tamil',
    existingConditions: ['Hypertension', 'Type 2 Diabetes'],
    allergies: ['Penicillin'],
    currentMedications: ['Amlodipine 5mg', 'Metformin 500mg'],
  });

  // Modals
  const [isIvrModalOpen, setIsIvrModalOpen] = useState<boolean>(false);
  const [isArchitectureModalOpen, setIsArchitectureModalOpen] = useState<boolean>(false);
  const [isMasterDemoModalOpen, setIsMasterDemoModalOpen] = useState<boolean>(false);

  // Audit Logs
  const [auditLogs, setAuditLogs] = useState<AuditLog[]>([
    {
      id: 'LOG-001',
      timestamp: '08:33 AM',
      actor: 'AI Triage Engine (XGBoost + Rules)',
      role: 'ADMIN',
      action: 'Risk Score Calculated: 87/100',
      details: 'Priority classified as EMERGENCY for patient Meena R. (PT-1001)',
      patientId: 'PT-1001',
    },
    {
      id: 'LOG-002',
      timestamp: '08:34 AM',
      actor: 'IndicConformer Speech-to-Text',
      role: 'ADMIN',
      action: 'Tamil Speech Decoded (94.2% Confidence)',
      details: 'Converted 14s IVR audio chunk to clinical transcript.',
      patientId: 'PT-1001',
    },
    {
      id: 'LOG-003',
      timestamp: '08:35 AM',
      actor: 'Queue Dispatcher',
      role: 'ADMIN',
      action: 'Priority Queue Assignment',
      details: 'Elevated CASE-2026-081 to slot #1 in Doctor Priority Queue',
      patientId: 'PT-1001',
    },
  ]);

  const addAuditLog = (action: string, details: string, patientId?: string) => {
    const newLog: AuditLog = {
      id: `LOG-${Date.now().toString().slice(-4)}`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      actor: role === 'DOCTOR' ? 'Dr. S. K. Narayanan' : role === 'PATIENT' ? 'Patient Portal' : 'System Supervisor',
      role,
      action,
      details,
      patientId,
    };
    setAuditLogs(prev => [newLog, ...prev.slice(0, 49)]);
  };

  const activeConsultation = consultations.find(c => c.id === activeConsultationId) || consultations[0];

  const addNewConsultation = (record: ConsultationRecord) => {
    setConsultations(prev => [record, ...prev]);
    setActiveConsultationId(record.id);
    addAuditLog('New Voice Consultation Registered', `Triage: ${record.triageResult.priority} (${record.triageResult.riskScore}/100) via ${record.channel}`, record.patientId);
  };

  const updateDoctorReview = (consultationId: string, review: Partial<DoctorReview>) => {
    setConsultations(prev => prev.map(c => {
      if (c.id === consultationId) {
        const updatedReview: DoctorReview = {
          ...c.doctorReview,
          ...review,
          reviewedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          status: review.status || 'APPROVED',
        };
        return {
          ...c,
          doctorReview: updatedReview,
        };
      }
      return c;
    }));

    try {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.7 },
      });
    } catch (e) {
      console.warn(e);
    }

    addAuditLog(
      'Doctor Assessment Completed',
      `Assessment approved with priority ${review.finalPriority || 'EMERGENCY'}. Status: ${review.status || 'APPROVED'}`,
      consultations.find(c => c.id === consultationId)?.patientId
    );
  };

  const sendFollowUpNotification = (consultationId: string, channel: 'SMS' | 'WHATSAPP' | 'IVR') => {
    const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    setConsultations(prev => prev.map(c => {
      if (c.id === consultationId) {
        const followUp = { ...c.followUp };
        if (channel === 'SMS') {
          followUp.smsSent = true;
          followUp.smsTimestamp = timestamp;
          followUp.smsContent = `Dr. S. K. Narayanan has reviewed your voice consultation. Emergency protocol initiated. Hospital ambulance alerted.`;
        } else if (channel === 'WHATSAPP') {
          followUp.whatsappSent = true;
          followUp.whatsappTimestamp = timestamp;
          followUp.whatsappContent = `📋 Official Clinical Summary & Guidance from Dr. S. K. Narayanan for ${c.patient.name}.`;
        } else if (channel === 'IVR') {
          followUp.ivrScheduled = true;
          followUp.ivrTimestamp = timestamp;
          followUp.ivrLanguage = c.patient.preferredLanguage;
        }
        return { ...c, followUp };
      }
      return c;
    }));

    addAuditLog(
      `Dispatched Follow-up via ${channel}`,
      `Sent patient alert to ${consultations.find(c => c.id === consultationId)?.patient.phone}`,
      consultations.find(c => c.id === consultationId)?.patientId
    );
  };

  const loadDemoPatientMeena = () => {
    setSelectedLanguage('Tamil');
    setPatientDraft({
      name: 'Meena R.',
      age: 54,
      gender: 'Female',
      phone: '+91 94432 18920',
      location: 'Dharmapuri Rural, Tamil Nadu',
      preferredLanguage: 'Tamil',
      existingConditions: ['Hypertension', 'Type 2 Diabetes'],
      allergies: ['Penicillin'],
      currentMedications: ['Amlodipine 5mg', 'Metformin 500mg'],
    });
    setActiveConsultationId('CASE-2026-081');
    addAuditLog('Loaded Demo Case: Meena R.', 'Prepared Tamil voice consultation scenario (Emergency ACS suspicion)');
  };

  const resetToInitialData = () => {
    setConsultations(INITIAL_CONSULTATIONS);
    setActiveConsultationId('CASE-2026-081');
    addAuditLog('System Reset', 'Restored 15 seeded patient records');
  };

  return (
    <AppContext.Provider
      value={{
        role,
        setRole,
        activeNavTab,
        setActiveNavTab,
        consultations,
        activeConsultationId,
        setActiveConsultationId,
        activeConsultation,
        selectedLanguage,
        setSelectedLanguage,
        patientDraft,
        setPatientDraft,
        addNewConsultation,
        updateDoctorReview,
        sendFollowUpNotification,
        loadDemoPatientMeena,
        resetToInitialData,
        isIvrModalOpen,
        setIsIvrModalOpen,
        isArchitectureModalOpen,
        setIsArchitectureModalOpen,
        isMasterDemoModalOpen,
        setIsMasterDemoModalOpen,
        auditLogs,
        addAuditLog,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
