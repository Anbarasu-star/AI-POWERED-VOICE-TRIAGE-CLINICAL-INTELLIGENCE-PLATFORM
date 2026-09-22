import React from 'react';
import { useApp } from '../../context/AppContext';
import { SUPPORTED_LANGUAGES } from '../../data/languages';
import { IndianLanguage } from '../../types';
import { 
  User, 
  Phone, 
  MapPin, 
  Heart, 
  Pill, 
  AlertCircle, 
  ArrowRight, 
  Sparkles,
  Check
} from 'lucide-react';

export const PatientRegistration: React.FC = () => {
  const { 
    patientDraft, 
    setPatientDraft, 
    selectedLanguage, 
    setSelectedLanguage, 
    setActiveNavTab, 
    loadDemoPatientMeena 
  } = useApp();

  const handleInputChange = (field: string, value: unknown) => {
    setPatientDraft(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleConditionsToggle = (condition: string) => {
    const current = patientDraft.existingConditions || [];
    if (current.includes(condition)) {
      handleInputChange('existingConditions', current.filter(c => c !== condition));
    } else {
      handleInputChange('existingConditions', [...current, condition]);
    }
  };

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const lang = e.target.value as IndianLanguage;
    setSelectedLanguage(lang);
    handleInputChange('preferredLanguage', lang);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8 pb-12">
      
      {/* Step Header */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-500/40 text-cyan-300 text-xs font-semibold">
          <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
          <span>Patient Intake Step 2 of 3</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
          Patient Registration
        </h2>
        <p className="text-sm text-slate-400 max-w-md mx-auto">
          Essential details to register the intake before capturing voice symptoms. No unnecessary personal data is collected.
        </p>
      </div>

      {/* Prefill Demo Patient Quick Button */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-3 shadow-md">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-cyan-950 border border-cyan-800 flex items-center justify-center text-cyan-400 shrink-0">
            <Sparkles className="w-5 h-5 text-amber-400" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-white">
              Want to skip manual typing for testing?
            </h4>
            <p className="text-[11px] text-slate-400">
              One-click prefill with Meena R. (54 yrs, Tamil, known hypertensive, acute chest pain scenario).
            </p>
          </div>
        </div>
        <button
          onClick={loadDemoPatientMeena}
          className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-cyan-300 text-xs font-bold transition-all shrink-0"
        >
          Prefill Demo Patient
        </button>
      </div>

      {/* Form Card */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl">
        
        {/* Name, Age, Gender */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="space-y-1.5 sm:col-span-1">
            <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-cyan-400" />
              <span>Patient Name</span>
            </label>
            <input
              type="text"
              value={patientDraft.name || ''}
              onChange={(e) => handleInputChange('name', e.target.value)}
              placeholder="e.g. Meena R."
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-300">
              Age (Years)
            </label>
            <input
              type="number"
              value={patientDraft.age || ''}
              onChange={(e) => handleInputChange('age', parseInt(e.target.value) || 0)}
              placeholder="54"
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-300">
              Gender
            </label>
            <select
              value={patientDraft.gender || 'Female'}
              onChange={(e) => handleInputChange('gender', e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500"
            >
              <option value="Female">Female</option>
              <option value="Male">Male</option>
              <option value="Other">Other</option>
            </select>
          </div>
        </div>

        {/* Phone, Location, Language */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
              <Phone className="w-3.5 h-3.5 text-cyan-400" />
              <span>Phone / Feature Phone #</span>
            </label>
            <input
              type="text"
              value={patientDraft.phone || ''}
              onChange={(e) => handleInputChange('phone', e.target.value)}
              placeholder="+91 94432 18920"
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-cyan-400" />
              <span>Location / PHC District</span>
            </label>
            <input
              type="text"
              value={patientDraft.location || ''}
              onChange={(e) => handleInputChange('location', e.target.value)}
              placeholder="Dharmapuri Rural, TN"
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-300">
              Preferred Language
            </label>
            <select
              value={selectedLanguage}
              onChange={handleLanguageChange}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500"
            >
              {SUPPORTED_LANGUAGES.map(l => (
                <option key={l.id} value={l.id}>
                  {l.name} ({l.nativeName})
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Medical History Tags */}
        <div className="space-y-2 border-t border-slate-800 pt-4">
          <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
            <Heart className="w-3.5 h-3.5 text-rose-400" />
            <span>Existing Medical Conditions (Quick Select)</span>
          </label>
          <div className="flex flex-wrap gap-2 pt-1">
            {['Hypertension', 'Type 2 Diabetes', 'Coronary Artery Disease', 'Asthma', 'Chronic Kidney Disease', 'None'].map(cond => {
              const active = (patientDraft.existingConditions || []).includes(cond);
              return (
                <button
                  type="button"
                  key={cond}
                  onClick={() => handleConditionsToggle(cond)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-medium border transition-all flex items-center gap-1.5 ${
                    active
                      ? 'bg-rose-950/80 border-rose-500 text-rose-200'
                      : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700'
                  }`}
                >
                  {active && <Check className="w-3 h-3 text-rose-400" />}
                  <span>{cond}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Current Medications & Allergies */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-t border-slate-800 pt-4">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
              <Pill className="w-3.5 h-3.5 text-indigo-400" />
              <span>Current Medications (if any)</span>
            </label>
            <input
              type="text"
              value={(patientDraft.currentMedications || []).join(', ')}
              onChange={(e) => handleInputChange('currentMedications', e.target.value.split(',').map(s => s.trim()))}
              placeholder="e.g. Amlodipine 5mg, Metformin"
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
              <AlertCircle className="w-3.5 h-3.5 text-amber-400" />
              <span>Known Drug Allergies</span>
            </label>
            <input
              type="text"
              value={(patientDraft.allergies || []).join(', ')}
              onChange={(e) => handleInputChange('allergies', e.target.value.split(',').map(s => s.trim()))}
              placeholder="e.g. Penicillin, Sulfa drugs, None"
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
            />
          </div>
        </div>

      </div>

      {/* Navigation Buttons */}
      <div className="flex items-center justify-between pt-2">
        <button
          onClick={() => setActiveNavTab('LANGUAGE')}
          className="text-xs font-semibold text-slate-400 hover:text-white px-4 py-2 rounded-lg"
        >
          &larr; Back to Language
        </button>

        <button
          onClick={() => setActiveNavTab('VOICE_TRIAGE')}
          className="flex items-center gap-2 px-7 py-3.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-sm shadow-xl shadow-cyan-950/60 transition-all hover:translate-x-0.5"
        >
          <span>Continue to Voice Triage</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

    </div>
  );
};
