import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { playDtmfTone, playMedicalBeep, speakText } from '../../services/audioSimulator';
import { 
  X, 
  Phone, 
  PhoneOff, 
  Radio, 
  Sparkles, 
  CheckCircle2, 
  Volume2, 
  ArrowRight,
  ShieldCheck
} from 'lucide-react';

export const IvrPhoneModal: React.FC = () => {
  const { 
    isIvrModalOpen, 
    setIsIvrModalOpen, 
    loadDemoPatientMeena, 
    setRole, 
    setActiveNavTab 
  } = useApp();

  const [callState, setCallState] = useState<'IDLE' | 'CALLING' | 'CONNECTED' | 'RECORDING' | 'PROCESSED'>('IDLE');
  const [screenText, setScreenText] = useState<string>('DIAL 1800-TRIAGE (Press Call)');
  const [selectedDigit, setSelectedDigit] = useState<string>('');

  if (!isIvrModalOpen) return null;

  const handleKeyPress = (key: string) => {
    playDtmfTone(key, 120);
    setSelectedDigit(key);

    if (callState === 'CONNECTED') {
      if (key === '1') {
        setScreenText('Language: TAMIL selected. Please speak after the tone...');
        speakText('வணக்கம். உங்கள் அறிகுறிகளை பீப் ஒலிக்கு பின் கூறுங்கள்.', 'ta');
        setTimeout(() => {
          playMedicalBeep(880, 200);
          setCallState('RECORDING');
          setScreenText('RECORDING TAMIL AUDIO: “எனக்கு மார்பு வலி உள்ளது...”');
          setTimeout(() => {
            setCallState('PROCESSED');
            setScreenText('AI TRIAGE: Case #CASE-2026-MEENA registered. Priority: EMERGENCY (87/100).');
          }, 3500);
        }, 1200);
      } else if (key === '2') {
        setScreenText('Language: HINDI selected. Please speak after tone...');
        speakText('नमस्ते, बीप के बाद अपने लक्षण बताएं.', 'hi');
      }
    }
  };

  const handleStartCall = () => {
    playMedicalBeep(440, 200);
    setCallState('CALLING');
    setScreenText('Connecting to 1800-419-TRIAGE...');
    setTimeout(() => {
      setCallState('CONNECTED');
      setScreenText('IVR: “Welcome. For Tamil press 1. For Hindi press 2. For English press 3.”');
      speakText('Welcome to Rural Health Voice Triage. For Tamil press 1, for Hindi press 2, for English press 3.', 'en');
    }, 1500);
  };

  const handleEndCall = () => {
    playMedicalBeep(320, 150);
    setCallState('IDLE');
    setScreenText('CALL ENDED. Press Call to reconnect.');
  };

  const handleTransferToDoctor = () => {
    loadDemoPatientMeena();
    setIsIvrModalOpen(false);
    setRole('DOCTOR');
    setActiveNavTab('CASE_VIEW');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
      <div className="relative w-full max-w-sm bg-slate-900 border border-slate-700/80 rounded-3xl p-6 shadow-2xl space-y-5">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <Phone className="w-4 h-4 text-cyan-400" />
            <span className="text-xs font-bold text-white uppercase tracking-wider">
              2G Feature Phone IVR Simulator
            </span>
          </div>
          <button
            onClick={() => setIsIvrModalOpen(false)}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Feature Phone Shell */}
        <div className="bg-slate-950 rounded-3xl p-5 border-4 border-slate-800 space-y-4 shadow-inner">
          
          {/* Top Speaker Grille */}
          <div className="flex items-center justify-center gap-1.5 pb-1">
            <div className="w-8 h-1 bg-slate-800 rounded-full" />
            <div className="w-2 h-1 bg-slate-800 rounded-full" />
          </div>

          {/* Retro Monochromatic Backlit LCD Screen */}
          <div className="h-28 rounded-2xl bg-cyan-950/80 border-2 border-cyan-700/60 p-3 font-mono text-cyan-300 text-xs flex flex-col justify-between shadow-inner">
            <div className="flex items-center justify-between text-[10px] text-cyan-400/80 border-b border-cyan-800/60 pb-1">
              <span>BSNL 2G • Triage IVR</span>
              <span>🔋 92%</span>
            </div>

            <div className="py-1 text-center font-bold leading-tight">
              {screenText}
            </div>

            <div className="flex items-center justify-between text-[9px] text-cyan-500">
              <span>Key: [{selectedDigit || 'None'}]</span>
              <span>{callState}</span>
            </div>
          </div>

          {/* Call & Hang Up Buttons */}
          <div className="grid grid-cols-2 gap-3 pt-1">
            <button
              onClick={handleStartCall}
              disabled={callState === 'CONNECTED' || callState === 'RECORDING'}
              className="py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 active:scale-95 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-md"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>Call</span>
            </button>
            <button
              onClick={handleEndCall}
              className="py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 active:scale-95 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-md"
            >
              <PhoneOff className="w-3.5 h-3.5" />
              <span>End</span>
            </button>
          </div>

          {/* 3x4 DTMF Numeric Keypad */}
          <div className="grid grid-cols-3 gap-2 pt-2">
            {[
              { num: '1', sub: 'Tamil' },
              { num: '2', sub: 'Hindi' },
              { num: '3', sub: 'Eng' },
              { num: '4', sub: 'GHI' },
              { num: '5', sub: 'JKL' },
              { num: '6', sub: 'MNO' },
              { num: '7', sub: 'PQRS' },
              { num: '8', sub: 'TUV' },
              { num: '9', sub: 'WXYZ' },
              { num: '*', sub: 'Tone' },
              { num: '0', sub: 'Oper' },
              { num: '#', sub: 'Help' },
            ].map((k) => (
              <button
                key={k.num}
                onClick={() => handleKeyPress(k.num)}
                className="h-12 rounded-xl bg-slate-850 hover:bg-slate-800 active:bg-cyan-900 border border-slate-700/80 text-white font-bold text-sm flex flex-col items-center justify-center transition-all shadow-sm active:scale-95"
              >
                <span>{k.num}</span>
                <span className="text-[9px] text-slate-400 font-normal">{k.sub}</span>
              </button>
            ))}
          </div>

        </div>

        {/* Action to View Transferred Case */}
        {callState === 'PROCESSED' && (
          <button
            onClick={handleTransferToDoctor}
            className="w-full py-3 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold text-xs shadow-lg flex items-center justify-center gap-2 animate-bounce"
          >
            <span>Open Case in Doctor Dashboard &rarr;</span>
          </button>
        )}

      </div>
    </div>
  );
};
