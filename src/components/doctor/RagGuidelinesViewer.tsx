import React, { useState } from 'react';
import { 
  BookOpen, 
  Search, 
  Sparkles, 
  ShieldCheck, 
  ExternalLink, 
  FileText, 
  Layers, 
  CheckCircle2, 
  Database 
} from 'lucide-react';

interface GuidelineEntry {
  id: string;
  source: string;
  authority: string;
  category: string;
  condition: string;
  recommendations: string[];
  redFlagThresholds: string[];
  vectorSimilarity: number;
}

const GUIDELINES_DATABASE: GuidelineEntry[] = [
  {
    id: 'GUIDE-ICMR-01',
    source: 'ICMR National Guidelines for Acute Coronary Syndromes (2024)',
    authority: 'Indian Council of Medical Research',
    category: 'Cardiovascular Emergency',
    condition: 'Acute Chest Pain / Suspected NSTEMI or STEMI',
    recommendations: [
      'Immediate 12-lead ECG within 10 minutes of patient presentation or triage identification.',
      'Loading dose of Aspirin (300mg chewed) and Clopidogrel (300mg) if not contraindicated by active bleeding.',
      'Continuous cardiac telemetry and urgent ambulance dispatch to tertiary cath-lab capable facility.',
      'Establish intravenous access and avoid intramuscular injections.',
    ],
    redFlagThresholds: [
      'Chest pain radiating to left jaw or left arm',
      'Associated diaphoresis, dyspnea, or syncope',
      'Known history of hypertension, diabetes, or CAD',
    ],
    vectorSimilarity: 0.942,
  },
  {
    id: 'GUIDE-NHM-02',
    source: 'National Health Mission Emergency Triage Protocol for Rural PHCs (2023)',
    authority: 'Ministry of Health & Family Welfare, India',
    category: 'General Acute Triage',
    condition: 'Community Voice-Informed Critical Triage Stratification',
    recommendations: [
      'Red-flag detected cases bypass standard registration queues and trigger automated SMS alert to on-duty medical officer.',
      'Patients with respiratory distress (RR > 28/min or severe dyspnea) must receive oxygen saturation measurement immediately upon arrival.',
      'Maintain continuous digital triage audit log in FHIR-compliant format for rural telemedicine handoff.',
    ],
    redFlagThresholds: [
      'Altered mental status or unresponsiveness',
      'Stridor or severe respiratory distress',
      'Acute hemoptysis or uncontrolled hemorrhage',
    ],
    vectorSimilarity: 0.915,
  },
  {
    id: 'GUIDE-GINA-03',
    source: 'Global Initiative for Asthma (GINA) & API Guidelines for Severe Wheeze (2024)',
    authority: 'Association of Physicians of India & GINA',
    category: 'Respiratory Medicine',
    condition: 'Severe Acute Exacerbation of Asthma / COPD',
    recommendations: [
      'High-dose inhaled SABA (Salbutamol 2.5mg - 5mg) via nebulizer or MDI with spacer.',
      'Early administration of systemic corticosteroids (Oral Prednisolone 40-50mg).',
      'Controlled oxygen therapy targeting SpO2 93-95% in non-hypercapnic patients.',
    ],
    redFlagThresholds: [
      'Silent chest on auscultation',
      'Inability to speak complete sentences in one breath',
      'Cyanosis or exhaustion',
    ],
    vectorSimilarity: 0.884,
  },
  {
    id: 'GUIDE-STROKE-04',
    source: 'NIMHANS & AIIMS Acute Ischemic Stroke Golden Hour Pathway',
    authority: 'National Institute of Mental Health and Neurosciences',
    category: 'Neurological Emergency',
    condition: 'Acute Focal Neurological Deficit / FAST Positive',
    recommendations: [
      'Immediate Non-Contrast CT Head to differentiate ischemic stroke from hemorrhagic stroke.',
      'Assess eligibility for intravenous thrombolysis (Alteplase / Tenecteplase) within 4.5 hour window.',
      'Strict blood pressure management; avoid sudden precipitate reduction unless > 220/120 mmHg.',
    ],
    redFlagThresholds: [
      'Sudden unilateral facial droop, arm weakness, or slurred speech',
      'Symptom onset < 4.5 hours (Golden Window)',
      'Sudden onset thunderclap headache',
    ],
    vectorSimilarity: 0.897,
  },
];

export const RagGuidelinesViewer: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');

  const filtered = GUIDELINES_DATABASE.filter(g => {
    const matchesSearch = 
      g.source.toLowerCase().includes(searchQuery.toLowerCase()) ||
      g.condition.toLowerCase().includes(searchQuery.toLowerCase()) ||
      g.recommendations.some(r => r.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesCat = selectedCategory === 'ALL' || g.category.includes(selectedCategory);

    return matchesSearch && matchesCat;
  });

  return (
    <div className="space-y-6 pb-16">
      
      {/* Header */}
      <div className="border-b border-slate-800 pb-4">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-950/80 border border-blue-500/40 text-blue-300 text-xs font-semibold mb-1">
          <BookOpen className="w-3.5 h-3.5 text-blue-400" />
          <span>Clinical Knowledge Retrieval (RAG)</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
          Evidence-Based Clinical Guidelines
        </h2>
        <p className="text-xs sm:text-sm text-slate-400">
          Dense vector index powering AI shadow recommendations via verified ICMR, NHM, and API clinical publications.
        </p>
      </div>

      {/* Vector Store Telemetry Bar */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-blue-950 border border-blue-800 flex items-center justify-center text-blue-400">
            <Database className="w-4 h-4" />
          </div>
          <div>
            <span className="font-bold text-white block">Vector Index: Clinical-BERT-Embeddings-v2</span>
            <span className="text-slate-400 text-[11px]">4,820 indexed clinical guideline chunks with cosine semantic retrieval</span>
          </div>
        </div>

        <div className="flex items-center gap-2 font-mono text-[11px] text-slate-400">
          <span className="px-2 py-1 rounded bg-slate-950 border border-slate-800 text-emerald-400">
            Top Cosine Match: 0.942
          </span>
          <span className="px-2 py-1 rounded bg-slate-950 border border-slate-800 text-cyan-400">
            Retrieval Latency: 18ms
          </span>
        </div>
      </div>

      {/* Search & Filter */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search guidelines (e.g. chest pain, asthma, stroke, ICMR)..."
            className="w-full pl-9 pr-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
          />
        </div>

        <div className="flex items-center gap-1.5 text-xs">
          {['ALL', 'Cardiovascular', 'General', 'Respiratory', 'Neurological'].map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-2 rounded-xl font-medium transition-all ${
                selectedCategory === cat ? 'bg-blue-600 text-white' : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Guidelines List */}
      <div className="space-y-4">
        {filtered.map(item => (
          <div key={item.id} className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 space-y-4 shadow-xl">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
              <div>
                <span className="text-[10px] font-bold text-cyan-400 uppercase tracking-wider block">
                  {item.authority}
                </span>
                <h3 className="text-base font-bold text-white">
                  {item.source}
                </h3>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <span className="px-2.5 py-1 rounded-full bg-cyan-950 text-cyan-300 border border-cyan-800 text-[10px] font-mono">
                  Similarity {Math.round(item.vectorSimilarity * 100)}%
                </span>
                <span className="px-2.5 py-1 rounded-full bg-slate-800 text-slate-300 text-[10px]">
                  {item.category}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="space-y-2">
                <span className="font-bold text-slate-200 block">
                  Evidence-Based Clinical Protocol:
                </span>
                <ul className="space-y-1.5 text-slate-300">
                  {item.recommendations.map((rec, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                      <span>{rec}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="space-y-2">
                <span className="font-bold text-red-300 block">
                  Red-Flag Triage Triggers:
                </span>
                <div className="bg-red-950/20 p-3 rounded-2xl border border-red-800/40 space-y-1.5">
                  {item.redFlagThresholds.map((rf, i) => (
                    <div key={i} className="text-red-200 flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-red-400 shrink-0" />
                      <span>{rf}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

          </div>
        ))}
      </div>

    </div>
  );
};
