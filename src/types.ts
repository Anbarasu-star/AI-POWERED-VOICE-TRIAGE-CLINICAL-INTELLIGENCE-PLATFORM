export type TriagePriority = 'EMERGENCY' | 'MEDIUM' | 'NORMAL';

export type UserRole = 'PATIENT' | 'DOCTOR' | 'ADMIN';

export type IndianLanguage = 
  | 'Tamil'
  | 'Hindi'
  | 'English'
  | 'Telugu'
  | 'Kannada'
  | 'Malayalam'
  | 'Bengali'
  | 'Marathi'
  | 'Gujarati'
  | 'Punjabi';

export interface LanguageMeta {
  id: IndianLanguage;
  name: string;
  nativeName: string;
  script: string;
  greeting: string;
  samplePrompt: string;
  flagCode: string;
}

export interface ClinicalExtraction {
  symptoms: string[];
  duration: string;
  severity: 'Mild' | 'Moderate' | 'Severe' | 'Critical';
  medical_history: string[];
  medications: string[];
  allergies: string[];
  red_flags: string[];
}

export interface ContributingFactor {
  name: string;
  weight: number;
  reason: string;
}

export interface TriageResult {
  riskScore: number; // 0 - 100
  priority: TriagePriority;
  riskCategory: 'LOW RISK' | 'MODERATE RISK' | 'HIGH RISK' | 'CRITICAL EMERGENCY';
  contributingFactors: ContributingFactor[];
  modelUsed: 'XGBoost v2.4 + Red-Flag Rule Engine';
  confidence: number; // 0 - 100
  timestamp: string;
}

export interface AIShadowDiagnosis {
  condition: string;
  confidence: number;
  reason: string;
  contributingSymptoms: string[];
  urgency: 'Immediate' | 'Within 2-4 hrs' | 'Routine';
}

export interface RAGRecommendation {
  id: string;
  title: string;
  action: string;
  guidelineSource: string;
  rationale: string;
  confidence: number;
  level: 'Urgent' | 'Standard' | 'Monitoring';
}

export interface DoctorReview {
  reviewedBy: string;
  reviewedAt: string;
  status: 'PENDING' | 'APPROVED' | 'MODIFIED' | 'REJECTED';
  originalPriority: TriagePriority;
  finalPriority: TriagePriority;
  doctorDiagnosisNotes: string;
  treatmentInstructions: string;
  followUpRequired: boolean;
  followUpDate?: string;
  actionTaken: 'Admit to ER' | 'Urgent Clinic Visit' | 'Home Care & Follow-up' | 'Routine Specialist Referral';
}

export interface FollowUpDelivery {
  smsSent: boolean;
  smsTimestamp?: string;
  smsContent?: string;
  whatsappSent: boolean;
  whatsappTimestamp?: string;
  whatsappContent?: string;
  ivrScheduled: boolean;
  ivrTimestamp?: string;
  ivrLanguage?: IndianLanguage;
}

export interface PatientRecord {
  id: string;
  name: string;
  age: number;
  gender: 'Female' | 'Male' | 'Other';
  phone: string;
  location: string;
  preferredLanguage: IndianLanguage;
  existingConditions: string[];
  allergies: string[];
  currentMedications: string[];
  registeredAt: string;
}

export interface ConsultationRecord {
  id: string;
  patientId: string;
  patient: PatientRecord;
  createdAt: string;
  channel: 'IVR_PHONE' | 'WEB_VOICE' | 'COMMUNITY_KIOSK';
  
  // Audio & STT
  audioUrl?: string;
  audioDurationSeconds: number;
  sttLanguageDetected: IndianLanguage;
  sttConfidence: number;
  sttModel: 'IndicConformer' | 'Whisper-Large-v3 (Fallback)';
  originalAudioTranscript: string;
  englishTranscript: string;
  transcriptTimestamps: { time: string; text: string }[];
  
  // Extraction & Triage
  clinicalExtraction: ClinicalExtraction;
  triageResult: TriageResult;
  
  // Clinical AI Assistant
  shadowDiagnoses: AIShadowDiagnosis[];
  ragRecommendations: RAGRecommendation[];
  
  // Doctor in the loop
  doctorReview: DoctorReview;
  
  // Follow-up
  followUp: FollowUpDelivery;
  
  // Status
  waitingTimeMinutes: number;
}

export interface AuditLog {
  id: string;
  timestamp: string;
  actor: string;
  role: UserRole;
  action: string;
  details: string;
  patientId?: string;
  caseId?: string;
}
