import { IndianLanguage } from '../types';

export interface MultilingualCaseDetail {
  id: string;
  language: IndianLanguage;
  patientName: string;
  age: number;
  gender: string;
  nativeScriptInput: string;
  englishTranslation: string;
  audioDuration: string;
  detectedModel: string;
  sttConfidence: string;
  symptoms: string[];
  duration: string;
  severity: string;
  redFlags: string[];
  medicalHistory: string[];
  riskScore: number;
  triagePriority: 'EMERGENCY' | 'MEDIUM' | 'NORMAL';
  shadowDiagnosis: string;
  ragGuideline: string;
}

export const MULTILINGUAL_DEMO_CASES: MultilingualCaseDetail[] = [
  {
    id: 'CASE-TAMIL',
    language: 'Tamil',
    patientName: 'Meena R.',
    age: 54,
    gender: 'Female',
    nativeScriptInput: 'எனக்கு நேற்று முதல் மார்பு வலி மற்றும் மூச்சுத்திணறல் இருக்கிறது. இடது கையில் வலி பரவுகிறது.',
    englishTranslation: 'I have had chest pain and difficulty breathing since yesterday. The pain is radiating to my left arm.',
    audioDuration: '14s',
    detectedModel: 'IndicConformer (Tamil-v2.1)',
    sttConfidence: '94.2%',
    symptoms: ['Chest pain', 'Shortness of breath', 'Left arm radiation', 'Diaphoresis'],
    duration: '1 day (acute progressive)',
    severity: 'Severe',
    redFlags: ['Acute chest pain', 'Breathing difficulty', 'Radiation to left arm'],
    medicalHistory: ['Hypertension', 'Type 2 Diabetes'],
    riskScore: 87,
    triagePriority: 'EMERGENCY',
    shadowDiagnosis: 'Suspected Acute Coronary Syndrome (ACS) / NSTEMI',
    ragGuideline: 'ICMR Guidelines for Acute Coronary Syndromes (2024) — Emergent 12-lead ECG & hospital transfer',
  },
  {
    id: 'CASE-HINDI',
    language: 'Hindi',
    patientName: 'Rajesh Verma',
    age: 62,
    gender: 'Male',
    nativeScriptInput: 'मुझे अचानक सीने में बहुत भारीपन लग रहा है और सांस लेने में दम घुट रहा है। पसीना बहुत आ रहा है।',
    englishTranslation: 'Suddenly I feel extreme heaviness in my chest and feel suffocated while breathing. I am sweating profusely.',
    audioDuration: '18s',
    detectedModel: 'IndicConformer (Hindi-v2.1)',
    sttConfidence: '92.8%',
    symptoms: ['Crushing chest heaviness', 'Dyspnea', 'Profuse diaphoresis', 'Lightheadedness'],
    duration: '45 minutes',
    severity: 'Critical',
    redFlags: ['Crushing chest pain', 'Acute diaphoresis', 'Prior coronary stent'],
    medicalHistory: ['CAD with Stent (2021)', 'Hyperlipidemia'],
    riskScore: 92,
    triagePriority: 'EMERGENCY',
    shadowDiagnosis: 'Acute STEMI / Suspected Stent Thrombosis',
    ragGuideline: 'MoHFW Clinical Practice Guidelines for Acute Myocardial Infarction — Golden Hour Reperfusion Protocol',
  },
  {
    id: 'CASE-TELUGU',
    language: 'Telugu',
    patientName: 'Venkatesh Naidu',
    age: 68,
    gender: 'Male',
    nativeScriptInput: 'ఉదయం లేవగానే కుడి చేయి మరియు కాలు తిమ్మిరి పట్టి కదలట్లేదు. నోటి మాట ముద్దగా వస్తోంది.',
    englishTranslation: 'Since morning my right hand and leg feel numb and unable to move. My speech has become slurred.',
    audioDuration: '15s',
    detectedModel: 'IndicConformer (Telugu-v2.1)',
    sttConfidence: '93.5%',
    symptoms: ['Right-sided hemiparesis', 'Slurred speech / Dysarthria', 'Facial asymmetry'],
    duration: '90 minutes (onset ~06:20 AM)',
    severity: 'Critical',
    redFlags: ['Acute focal neurological deficit', 'FAST positive', 'Thrombolytic window opportunity'],
    medicalHistory: ['Atrial Fibrillation', 'Hypertension'],
    riskScore: 95,
    triagePriority: 'EMERGENCY',
    shadowDiagnosis: 'Hyperacute Ischemic Stroke (Left MCA territory suspect)',
    ragGuideline: 'Indian Stroke Association Clinical Guidelines (2024) — Comprehensive Stroke Code activation',
  },
  {
    id: 'CASE-ENGLISH',
    language: 'English',
    patientName: 'Shanthi Mary',
    age: 29,
    gender: 'Female',
    nativeScriptInput: 'I am 8 months pregnant. I have severe throbbing headache, blurred vision, and high blood pressure reading of 165/105 at the village clinic.',
    englishTranslation: 'I am 8 months pregnant. I have severe throbbing headache, blurred vision, and high blood pressure reading of 165/105 at the village clinic.',
    audioDuration: '16s',
    detectedModel: 'IndicConformer (Indian English-v2.1)',
    sttConfidence: '96.1%',
    symptoms: ['Severe frontal headache', 'Visual scotoma / blurring', 'Severe gestational hypertension'],
    duration: '6 hours',
    severity: 'Critical',
    redFlags: ['Severe hypertension in 3rd trimester', 'Neurological symptoms (scotoma, headache)', 'Impending eclampsia'],
    medicalHistory: ['34 weeks primigravida'],
    riskScore: 91,
    triagePriority: 'EMERGENCY',
    shadowDiagnosis: 'Severe Preeclampsia / Impending Eclampsia',
    ragGuideline: 'FOGSI & MoHFW Gestational Hypertension Guidelines — Urgent Magnesium Sulfate loading dose',
  },
];
