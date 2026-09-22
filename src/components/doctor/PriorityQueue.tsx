import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { ConsultationRecord, TriagePriority } from '../../types';
import { 
  Users, 
  AlertTriangle, 
  Clock, 
  Stethoscope, 
  Search, 
  Filter, 
  Flame, 
  ArrowRight, 
  CheckCircle2, 
  PhoneCall, 
  Volume2,
  Sparkles,
  ChevronRight
} from 'lucide-react';

export const PriorityQueue: React.FC = () => {
  const { 
    consultations, 
    activeConsultationId, 
    setActiveConsultationId, 
    setActiveNavTab 
  } = useApp();

  const [searchQuery, setSearchQuery] = useState<string>('');
  const [priorityFilter, setPriorityFilter] = useState<'ALL' | TriagePriority>('ALL');
  const [statusFilter, setStatusFilter] = useState<'ALL' | 'PENDING' | 'APPROVED'>('ALL');

  // Priority Sort Order: EMERGENCY -> MEDIUM -> NORMAL
  const sortedConsultations = [...consultations].sort((a, b) => {
    const priorityWeight: Record<TriagePriority, number> = {
      EMERGENCY: 3,
      MEDIUM: 2,
      NORMAL: 1,
    };
    const diff = priorityWeight[b.triageResult.priority] - priorityWeight[a.triageResult.priority];
    if (diff !== 0) return diff;
    return b.triageResult.riskScore - a.triageResult.riskScore;
  });

  const filteredConsultations = sortedConsultations.filter(c => {
    const matchesSearch = 
      c.patient.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.patient.preferredLanguage.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.clinicalExtraction.symptoms.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesPriority = priorityFilter === 'ALL' || c.triageResult.priority === priorityFilter;
    const matchesStatus = statusFilter === 'ALL' || c.doctorReview.status === statusFilter;

    return matchesSearch && matchesPriority && matchesStatus;
  });

  // Top stats
  const totalPatients = consultations.length;
  const emergencyCount = consultations.filter(c => c.triageResult.priority === 'EMERGENCY').length;
  const mediumCount = consultations.filter(c => c.triageResult.priority === 'MEDIUM').length;
  const normalCount = consultations.filter(c => c.triageResult.priority === 'NORMAL').length;
  const pendingReviewCount = consultations.filter(c => c.doctorReview.status === 'PENDING').length;

  const handleOpenCase = (id: string) => {
    setActiveConsultationId(id);
    setActiveNavTab('CASE_VIEW');
  };

  return (
    <div className="space-y-6 pb-16">
      
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-950/80 border border-blue-500/40 text-blue-300 text-xs font-semibold mb-1">
            <Stethoscope className="w-3.5 h-3.5 text-blue-400" />
            <span>Doctor Workspace</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Clinical Intelligence Dashboard
          </h2>
          <p className="text-xs sm:text-sm text-slate-400">
            Real-time automated voice intake queue prioritized by acute risk & red-flag detection.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-400 font-mono">
            Auto-refresh: <strong className="text-emerald-400">Live Telephony Active</strong>
          </span>
        </div>
      </div>

      {/* Top Statistics Cards (Section 12) */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
        
        {/* Total Patients */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 space-y-1">
          <span className="text-[11px] font-semibold text-slate-400 block">Total Patients</span>
          <div className="flex items-baseline justify-between">
            <span className="text-2xl font-black text-white">{totalPatients}</span>
            <Users className="w-4 h-4 text-slate-400" />
          </div>
        </div>

        {/* Emergency */}
        <div className="bg-red-950/40 border border-red-800/60 rounded-2xl p-4 space-y-1">
          <span className="text-[11px] font-semibold text-red-300 block">🔴 Emergency</span>
          <div className="flex items-baseline justify-between">
            <span className="text-2xl font-black text-red-400">{emergencyCount}</span>
            <Flame className="w-4 h-4 text-red-400 animate-pulse" />
          </div>
        </div>

        {/* Medium */}
        <div className="bg-amber-950/40 border border-amber-800/60 rounded-2xl p-4 space-y-1">
          <span className="text-[11px] font-semibold text-amber-300 block">🟠 Medium</span>
          <div className="flex items-baseline justify-between">
            <span className="text-2xl font-black text-amber-400">{mediumCount}</span>
            <AlertTriangle className="w-4 h-4 text-amber-400" />
          </div>
        </div>

        {/* Normal */}
        <div className="bg-emerald-950/40 border border-emerald-800/60 rounded-2xl p-4 space-y-1">
          <span className="text-[11px] font-semibold text-emerald-300 block">🟢 Normal</span>
          <div className="flex items-baseline justify-between">
            <span className="text-2xl font-black text-emerald-400">{normalCount}</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          </div>
        </div>

        {/* Pending Review */}
        <div className="bg-blue-950/40 border border-blue-800/60 rounded-2xl p-4 space-y-1 col-span-2 sm:col-span-1">
          <span className="text-[11px] font-semibold text-blue-300 block">Pending Review</span>
          <div className="flex items-baseline justify-between">
            <span className="text-2xl font-black text-blue-400">{pendingReviewCount}</span>
            <Clock className="w-4 h-4 text-blue-400" />
          </div>
        </div>

      </div>

      {/* Filter & Search Toolbar */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search patient, symptom, language..."
            className="w-full pl-9 pr-4 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto justify-end text-xs">
          <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-xl border border-slate-800">
            <button
              onClick={() => setPriorityFilter('ALL')}
              className={`px-2.5 py-1 rounded-lg font-medium transition-all ${
                priorityFilter === 'ALL' ? 'bg-slate-800 text-white' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              All
            </button>
            <button
              onClick={() => setPriorityFilter('EMERGENCY')}
              className={`px-2.5 py-1 rounded-lg font-medium transition-all ${
                priorityFilter === 'EMERGENCY' ? 'bg-red-600 text-white' : 'text-red-400 hover:bg-red-950/50'
              }`}
            >
              Emergency ({emergencyCount})
            </button>
            <button
              onClick={() => setPriorityFilter('MEDIUM')}
              className={`px-2.5 py-1 rounded-lg font-medium transition-all ${
                priorityFilter === 'MEDIUM' ? 'bg-amber-600 text-white' : 'text-amber-400 hover:bg-amber-950/50'
              }`}
            >
              Medium
            </button>
            <button
              onClick={() => setPriorityFilter('NORMAL')}
              className={`px-2.5 py-1 rounded-lg font-medium transition-all ${
                priorityFilter === 'NORMAL' ? 'bg-emerald-600 text-white' : 'text-emerald-400 hover:bg-emerald-950/50'
              }`}
            >
              Normal
            </button>
          </div>

          <button
            onClick={() => setStatusFilter(statusFilter === 'PENDING' ? 'ALL' : 'PENDING')}
            className={`px-3 py-1.5 rounded-xl border text-xs font-semibold transition-all ${
              statusFilter === 'PENDING'
                ? 'bg-blue-600 text-white border-blue-500'
                : 'bg-slate-950 border-slate-800 text-slate-300 hover:bg-slate-800'
            }`}
          >
            {statusFilter === 'PENDING' ? 'Showing Pending' : 'Filter Pending'}
          </button>
        </div>
      </div>

      {/* Main Priority Queue Table (Section 12) */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-3xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-950/80 text-[11px] font-bold text-slate-400 uppercase tracking-wider border-b border-slate-800">
              <tr>
                <th className="py-3.5 px-4">Patient</th>
                <th className="py-3.5 px-3 text-center">Age</th>
                <th className="py-3.5 px-3">Language</th>
                <th className="py-3.5 px-4">Symptoms & Red Flags</th>
                <th className="py-3.5 px-3 text-center">Risk Score</th>
                <th className="py-3.5 px-3 text-center">Priority</th>
                <th className="py-3.5 px-3">Waiting Time</th>
                <th className="py-3.5 px-4 text-center">Doctor Review</th>
                <th className="py-3.5 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80">
              {filteredConsultations.map((c, index) => {
                const isEmergency = c.triageResult.priority === 'EMERGENCY';
                const isMedium = c.triageResult.priority === 'MEDIUM';
                const isPending = c.doctorReview.status === 'PENDING';

                return (
                  <tr
                    key={c.id}
                    onClick={() => handleOpenCase(c.id)}
                    className={`hover:bg-slate-800/60 transition-colors cursor-pointer ${
                      c.id === activeConsultationId ? 'bg-blue-950/30' : ''
                    }`}
                  >
                    
                    {/* Patient Name & Channel */}
                    <td className="py-3.5 px-4">
                      <div className="font-bold text-white text-sm flex items-center gap-1.5">
                        {isEmergency && (
                          <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
                        )}
                        <span>{c.patient.name}</span>
                      </div>
                      <span className="text-[10px] text-slate-400 font-mono block">
                        {c.channel === 'IVR_PHONE' ? '📞 IVR Phone' : c.channel === 'WEB_VOICE' ? '🎙️ Web Voice' : '🏥 Kiosk'} • {c.patient.location.split(',')[0]}
                      </span>
                    </td>

                    {/* Age */}
                    <td className="py-3.5 px-3 text-center font-semibold text-slate-200">
                      {c.patient.age} y
                    </td>

                    {/* Language */}
                    <td className="py-3.5 px-3">
                      <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-200 text-[11px] font-medium border border-slate-700">
                        {c.patient.preferredLanguage}
                      </span>
                    </td>

                    {/* Symptoms & Red Flags */}
                    <td className="py-3.5 px-4 max-w-xs">
                      <div className="truncate text-slate-200 font-medium">
                        {c.clinicalExtraction.symptoms.slice(0, 2).join(', ')}
                        {c.clinicalExtraction.symptoms.length > 2 && '...'}
                      </div>
                      {c.clinicalExtraction.red_flags.length > 0 && (
                        <div className="flex items-center gap-1 text-[10px] text-red-300 font-bold mt-0.5">
                          <Flame className="w-3 h-3 text-red-400 shrink-0" />
                          <span className="truncate">{c.clinicalExtraction.red_flags[0]}</span>
                        </div>
                      )}
                    </td>

                    {/* Risk Score */}
                    <td className="py-3.5 px-3 text-center">
                      <span className={`text-sm font-extrabold ${
                        isEmergency ? 'text-red-400' : isMedium ? 'text-amber-400' : 'text-emerald-400'
                      }`}>
                        {c.triageResult.riskScore}
                        <span className="text-[10px] text-slate-500 font-normal">/100</span>
                      </span>
                    </td>

                    {/* Priority Badge */}
                    <td className="py-3.5 px-3 text-center">
                      <span className={`px-2.5 py-1 rounded-full text-[10px] font-extrabold tracking-wide uppercase ${
                        isEmergency
                          ? 'bg-red-500/20 text-red-300 border border-red-500/50'
                          : isMedium
                          ? 'bg-amber-500/20 text-amber-300 border border-amber-500/50'
                          : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/50'
                      }`}>
                        {c.triageResult.priority}
                      </span>
                    </td>

                    {/* Waiting Time */}
                    <td className="py-3.5 px-3 text-slate-400">
                      <div className="flex items-center gap-1 font-mono">
                        <Clock className="w-3 h-3 text-slate-500" />
                        <span>{c.waitingTimeMinutes} mins</span>
                      </div>
                    </td>

                    {/* Doctor Review Status */}
                    <td className="py-3.5 px-4 text-center">
                      {isPending ? (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-blue-950 text-blue-300 border border-blue-800 text-[10px] font-semibold">
                          <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-ping" />
                          Pending Review
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-800 text-[10px] font-semibold">
                          <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                          Approved
                        </span>
                      )}
                    </td>

                    {/* Action */}
                    <td className="py-3.5 px-4 text-right">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleOpenCase(c.id);
                        }}
                        className="px-3 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-md transition-all flex items-center gap-1 ml-auto"
                      >
                        <span>Open Case</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    </td>

                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
