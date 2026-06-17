import React, { useState, useEffect, useMemo, useContext } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Brain, 
  Upload, 
  Activity, 
  History as HistoryIcon, 
  Stethoscope, 
  ArrowRight, 
  CheckCircle2, 
  AlertCircle, 
  ChevronRight,
  Menu,
  X,
  Plus,
  Mic,
  MicOff,
  PlayCircle,
  Eye,
  Timer,
  ArrowLeft,
  Search,
  FileText,
  Download,
  Share2,
  Zap,
  ShieldCheck,
  Microscope,
  Info,
  Cpu,
  MessageSquare,
  User,
  Sun,
  Moon,
  Languages,
  Globe
} from 'lucide-react';

import { Language, Theme, TRANSLATIONS, AppContext } from './translations';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  AreaChart,
  Area
} from 'recharts';
import { cn } from './lib/utils';
import { Page, Symptom, Report, Disorder, MRIExample } from './types';
import { DISORDERS, MRI_EXAMPLES, FEATURES, STEPS } from './constants';

// --- Components ---

const Navbar = ({ currentPage, setPage }: { currentPage: Page, setPage: (p: Page) => void }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { language, setLanguage, t } = useContext(AppContext);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [currentPage]);

  return (
    <nav className={cn(
      "fixed top-0 left-0 right-0 z-50 transition-all duration-500 px-6 py-4",
      isScrolled ? "bg-white/70 backdrop-blur-xl border-b border-white/20 shadow-sm" : "bg-transparent"
    )}>
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div 
          className="flex items-center gap-3 cursor-pointer group" 
          onClick={() => setPage('HOME')}
          id="nav-logo"
        >
          <div className="relative w-11 h-11 bg-blue-600 rounded-2xl flex items-center justify-center text-white shadow-xl shadow-blue-200 transition-all duration-500 group-hover:rotate-[10deg]">
            <Brain size={24} className="relative z-10" />
            <motion.div 
               animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0, 0.3] }}
               transition={{ duration: 3, repeat: Infinity }}
               className="absolute inset-0 bg-blue-400 rounded-2xl"
            />
          </div>
          <div className="flex flex-col">
             <span className="text-xl font-bold text-slate-900 tracking-tighter leading-none">NeuroXplain<span className="text-blue-600">AI</span></span>
             <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mt-1">{t('clinicalDiagnostics')}</span>
          </div>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-6">
          <div className="flex items-center gap-6 mr-4">
            {['HOME', 'HISTORY', 'TEAM'].map((page) => (
              <button 
                key={page}
                onClick={() => setPage(page as Page)}
                className={cn(
                  "text-xs font-bold uppercase tracking-widest transition-all hover:text-blue-600 relative py-2",
                  currentPage === page ? "text-blue-600" : "text-slate-500"
                )}
              >
                {page === 'TEAM' ? t('team') : page === 'HOME' ? t('home') : t('history')}
                {currentPage === page && (
                   <motion.div layoutId="nav-underline" className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 rounded-full" />
                )}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3 border-l border-slate-200 pl-6">
            <button
              onClick={() => setLanguage(language === 'en' ? 'hi' : 'en')}
              className="flex items-center gap-2 px-3 h-10 rounded-xl text-slate-500 hover:bg-slate-100 transition-colors font-bold text-xs"
            >
              <Languages size={20} />
              <span className="uppercase">{language}</span>
            </button>
            <button 
              onClick={() => setPage('UPLOAD')}
              className="ml-2 px-8 py-3 bg-slate-900 text-white text-[11px] font-bold uppercase tracking-widest rounded-2xl shadow-2xl hover:bg-blue-600 hover:-translate-y-0.5 transition-all active:scale-95"
              id="nav-start"
            >
              {t('startAnalysis')}
            </button>
          </div>
        </div>

        {/* Mobile Toggle */}
        <div className="flex items-center gap-2 md:hidden">
          <button
            onClick={() => setLanguage(language === 'en' ? 'hi' : 'en')}
            className="flex items-center justify-center w-10 h-10 rounded-xl text-slate-500 hover:bg-slate-100 transition-colors font-bold text-xs"
          >
            <Languages size={20} />
          </button>
          <button 
             className="w-10 h-10 flex items-center justify-center text-slate-900"
             onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
             {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 right-0 bg-white border-t border-slate-100 p-6 shadow-xl md:hidden"
          >
              <div className="flex flex-col gap-4">
              <button 
                onClick={() => { setPage('HOME'); setIsMobileMenuOpen(false); }}
                className="text-left py-3 px-4 font-medium text-slate-600 hover:bg-slate-50 rounded-xl transition-colors"
                id="mob-nav-home"
              >
                {t('home')}
              </button>
              <button 
                onClick={() => { setPage('HISTORY'); setIsMobileMenuOpen(false); }}
                className="text-left py-3 px-4 font-medium text-slate-600 hover:bg-slate-50 rounded-xl transition-colors"
                id="mob-nav-history"
              >
                {t('history')}
              </button>
              <button 
                onClick={() => { setPage('TEAM'); setIsMobileMenuOpen(false); }}
                className="text-left py-3 px-4 font-medium text-slate-600 hover:bg-slate-50 rounded-xl transition-colors"
              >
                {t('team')}
              </button>
              <button 
                onClick={() => { setPage('UPLOAD'); setIsMobileMenuOpen(false); }}
                className="mt-2 w-full px-5 py-4 bg-blue-600 text-white font-bold rounded-xl shadow-lg active:scale-95 transition-all"
                id="mob-nav-start"
              >
                {t('startAnalysis')}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Footer = () => {
  const { t } = useContext(AppContext);
  return (
  <footer className="bg-slate-50 border-t border-slate-200 py-12 px-6">
    <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
      <div className="col-span-1 md:col-span-2">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white">
            <Brain size={18} />
          </div>
          <span className="text-lg font-bold text-slate-800">{t('neuroXplain')} {t('ai')}</span>
        </div>
        <p className="text-slate-500 max-w-sm mb-6">
          {t('footerDesc')}
        </p>
      </div>
      <div>
        <h4 className="font-semibold text-slate-800 mb-4">{t('platform')}</h4>
        <ul className="flex flex-col gap-3 text-sm text-slate-500">
          <li className="hover:text-blue-600 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>{t('mriAnalysis')}</li>
          <li className="hover:text-blue-600 cursor-pointer" onClick={() => document.getElementById('symptoms')?.scrollIntoView({ behavior: 'smooth' })}>{t('symptomIntelligence')}</li>
          <li className="hover:text-blue-600 cursor-pointer">{t('explainableAI')}</li>
          <li className="hover:text-blue-600 cursor-pointer">{t('researchPaper')}</li>
        </ul>
      </div>
      <div>
        <h4 className="font-semibold text-slate-800 mb-4">{t('medical')}</h4>
        <ul className="flex flex-col gap-3 text-sm text-slate-500">
          <li className="hover:text-blue-600 cursor-pointer">{t('caseStudies')}</li>
          <li className="hover:text-blue-600 cursor-pointer">{t('clinicalVerification')}</li>
          <li className="hover:text-blue-600 cursor-pointer">{t('hipaaCompliance')}</li>
          <li className="hover:text-blue-600 cursor-pointer">{t('termsOfService')}</li>
        </ul>
      </div>
    </div>
    <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-slate-200 flex flex-col md:row items-center justify-between gap-4 text-xs text-slate-400">
      <p>{t('copyright')}</p>
      <div className="flex gap-6">
        <span>{t('privacyPolicy')}</span>
        <span>{t('complianceStandards')}</span>
        <span>{t('doctorPortal')}</span>
      </div>
    </div>
  </footer>
  );
};

const TeamPage = ({ onBack }: { onBack: () => void }) => {
  const { t } = useContext(AppContext);
  const team = [
    { name: 'Dr. Rafeeq Ahmed', role: t('researchMentor'), desc: t('drDesc'), badge: 'Guide' },
    { name: 'Rishabh Kr. Gupta', role: t('chiefTechLead'), desc: t('rishabhDesc'), badge: 'Lead' },
    { name: 'Khushi Kumari', role: t('aiMlExpert'), desc: t('khushiDesc'), badge: 'AI/ML' },
    { name: 'Rahul Saini', role: t('seniorAiEngineer'), desc: t('rahulDesc'), badge: 'AI' },
  ];

  return (
    <div className="pt-32 pb-20 px-6 min-h-screen bg-white">
      <div className="max-w-7xl mx-auto">
        <button onClick={onBack} className="flex items-center gap-2 text-slate-400 hover:text-slate-800 transition-colors font-medium text-sm mb-16">
          <ArrowLeft size={18} /> Back to Home
        </button>

        <div className="grid lg:grid-cols-12 gap-20 mb-32">
           <div className="lg:col-span-5">
              <span className="text-blue-600 font-bold text-[10px] uppercase tracking-[0.2em] mb-6 block">{t('ourLeadership')}</span>
              <h1 className="text-5xl md:text-7xl font-bold text-slate-900 mb-8 font-display tracking-tight leading-tight">{t('visionariesTitle')}</h1>
              <p className="text-xl text-slate-500 font-light leading-relaxed mb-12">
                 {t('visionariesDesc')}
              </p>
              
              <div className="bg-slate-50 p-8 md:p-10 rounded-[48px] border border-slate-100 relative overflow-hidden group">

                 <div className="relative z-10">
                   <div className="flex items-center gap-4 mb-8">
                      <div className="w-12 h-12 bg-slate-100 rounded-2xl flex items-center justify-center text-slate-400">
                         <User size={24} />
                      </div>
                      <div>
                         <div className="text-sm font-bold text-slate-900">{t('directAssistance')}</div>
                         <div className="text-xs text-slate-400 font-bold uppercase tracking-widest mt-1">{t('institutionalSupport')}</div>
                      </div>
                   </div>
                   <div className="text-2xl md:text-4xl font-bold text-slate-900 mb-2 font-mono break-words md:break-normal">{t('phone')}</div>
                   <p className="text-sm text-slate-400 font-medium">{t('connectExperts')}</p>
                 </div>
              </div>
           </div>

           <div className="lg:col-span-7">
              <div className="grid gap-6">
                 {team.map((member, i) => (
                    <motion.div 
                      key={member.name}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className="group flex flex-col sm:flex-row items-center gap-8 bg-white p-6 md:p-8 rounded-[40px] border border-slate-100 shadow-sm hover:shadow-2xl transition-all duration-500 hover:bg-slate-50"
                    >
                       <div className="relative shrink-0">
                         <div className="w-32 h-32 md:w-40 md:h-40 rounded-[32px] overflow-hidden bg-slate-50 border-4 border-white shadow-xl flex items-center justify-center text-slate-300">
                           <User size={64} className="opacity-20" />
                         </div>
                         <div className="absolute -bottom-2 -right-2 px-4 py-1.5 bg-blue-600 text-white text-[10px] font-bold uppercase tracking-widest rounded-xl shadow-lg">
                           {member.badge}
                         </div>
                       </div>
                       <div className="flex-1 text-center sm:text-left">
                          <div className="text-blue-600 text-[10px] font-bold uppercase tracking-widest mb-3">{member.role}</div>
                          <h3 className="text-2xl font-bold text-slate-900 mb-3 font-display">{member.name}</h3>
                          <p className="text-sm text-slate-500 leading-relaxed font-light">{member.desc}</p>
                       </div>
                    </motion.div>
                 ))}
              </div>
           </div>
        </div>

        {/* Feedback Section */}
        <div className="bg-slate-900 rounded-[64px] p-12 md:p-24 text-white relative overflow-hidden shadow-2xl">
            <div className="relative z-10 max-w-2xl">
              <h2 className="text-4xl md:text-6xl font-bold mb-10 font-display">{t('provideFeedback')}</h2>
              <p className="text-slate-400 mb-14 text-xl font-light leading-relaxed">
                 {t('feedbackDesc')}
              </p>
              <form className="space-y-8" onSubmit={e => e.preventDefault()}>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-2">
                       <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-4">{t('fullNameLabel')}</label>
                       <input type="text" placeholder={t('fullNamePlaceholder')} className="w-full px-8 py-5 bg-white/5 border border-white/10 rounded-2xl focus:outline-none focus:border-blue-500 transition-colors" />
                    </div>
                    <div className="space-y-2">
                       <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-4">{t('emailLabel')}</label>
                       <input type="email" placeholder={t('emailPlaceholder')} className="w-full px-8 py-5 bg-white/5 border border-white/10 rounded-2xl focus:outline-none focus:border-blue-500 transition-colors" />
                    </div>
                 </div>
                 <div className="space-y-2">
                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-4">{t('messageLabel')}</label>
                    <textarea placeholder={t('messagePlaceholder')} className="w-full h-44 px-8 py-5 bg-white/5 border border-white/10 rounded-2xl focus:outline-none focus:border-blue-500 transition-colors resize-none" />
                 </div>
                 <button className="px-12 py-6 bg-blue-600 text-white font-bold rounded-2xl hover:bg-blue-700 transition-all shadow-xl shadow-blue-500/20 active:scale-95 text-lg">
                    {t('submitReview')}
                 </button>
              </form>
           </div>
        </div>
      </div>
    </div>
  );
};

// --- Cognitive Test Component ---

const CognitiveTestPage = ({ onComplete, onBack }: { onComplete: (score: number) => void, onBack: () => void }) => {
  const [step, setStep] = useState(1);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(15);
  const [isActive, setIsActive] = useState(false);
  const [selectedPattern, setSelectedPattern] = useState<number | null>(null);
  const [feedback, setFeedback] = useState<'Correct' | 'Incorrect' | null>(null);
  const [testWords, setTestWords] = useState<string[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);

  const WORD_POOL = ['Neuron', 'Synapse', 'Cortex', 'Axon', 'Glial', 'Myelin', 'Lobe', 'A-B-C-D', 'Z-Y-X-W', 'Alpha', 'Beta', 'Gamma', 'Logic', 'Pattern', 'Signal', 'Reflex', 'K-L-M-N', 'P-Q-R-S'];

  useEffect(() => {
    const shuffled = [...WORD_POOL].sort(() => 0.5 - Math.random()).slice(0, 4);
    setTestWords(shuffled);
  }, [step === 1]);

  useEffect(() => {
    let interval: any;
    if (isActive && timeLeft > 0 && !isProcessing) {
      interval = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
    } else if (timeLeft === 0) {
      setIsActive(false);
      if (step === 1) {
        setStep(2);
        setTimeLeft(15);
      } else if (step === 2) {
        setStep(3);
      }
    }
    return () => clearInterval(interval);
  }, [isActive, timeLeft, step, isProcessing]);

  const videoRef = React.useRef<HTMLVideoElement>(null);

  useEffect(() => {
    let stream: MediaStream | null = null;
    if (isActive && videoRef.current) {
      navigator.mediaDevices.getUserMedia({ video: true })
        .then(s => {
          stream = s;
          if (videoRef.current) videoRef.current.srcObject = s;
        })
        .catch(err => console.error("Camera access denied:", err));
    }
    return () => {
      if (stream) stream.getTracks().forEach(track => track.stop());
    };
  }, [isActive]);

  const startTest = () => setIsActive(true);

  const CORRECT_PATTERN_ID = 1;
  const patterns = useMemo(() => [
    { id: 1, shape: "M 20 20 L 80 80 M 20 80 L 80 20", label: "Neural Cross" },
    { id: 2, shape: "M 50 10 L 90 90 L 10 90 Z", label: "Cortical Delta" },
    { id: 3, shape: "M 20 50 A 30 30 0 1 0 80 50 A 30 30 0 1 0 20 50", label: "Orbital Loop" },
  ].sort(() => 0.5 - Math.random()), []);

  const handlePatternSelect = (id: number) => {
    if (selectedPattern !== null || isProcessing) return;
    
    setSelectedPattern(id);
    setIsProcessing(true);
    
    // Simulate neural processing
    setTimeout(() => {
      const isCorrect = id === CORRECT_PATTERN_ID;
      setFeedback(isCorrect ? 'Correct' : 'Incorrect');
      if (isCorrect) setScore(prev => prev + 1);
      
      setTimeout(() => {
        setIsProcessing(false);
        setStep(3);
      }, 1000);
    }, 800);
  };

  const finalizeTest = () => {
    onComplete(score);
  };

  return (
    <div className="pt-24 pb-12 px-4 md:pt-32 md:pb-24 md:px-6 min-h-screen bg-slate-50 relative overflow-hidden">
      {/* Dynamic Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-20">
        <div className="absolute top-[-10%] left-[-5%] w-[40%] h-[40%] bg-blue-400 blur-[120px] rounded-full"></div>
        <div className="absolute bottom-[-10%] right-[-5%] w-[40%] h-[40%] bg-indigo-400 blur-[120px] rounded-full"></div>
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        <div className="flex items-center justify-between mb-8 md:mb-12">
          <button onClick={onBack} className="flex items-center gap-2 text-slate-400 hover:text-slate-800 transition-colors font-medium text-sm">
            <ArrowLeft size={18} /> Back to Symptoms
          </button>
          <div className="flex gap-3">
            {[1, 2, 3].map(i => (
              <div key={i} className="flex flex-col items-center gap-1.5">
                <div className={cn(
                  "w-16 h-1 rounded-full transition-all duration-700",
                  step >= i ? "bg-blue-600 shadow-[0_0_10px_rgba(37,99,235,0.4)]" : "bg-slate-200"
                )}></div>
                <span className={cn("text-[8px] font-bold uppercase tracking-tighter transition-colors", step >= i ? "text-blue-600" : "text-slate-300")}>
                  Phase 0{i}
                </span>
              </div>
            ))}
          </div>
        </div>

        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, y: -20 }}
              className="bg-white/80 backdrop-blur-xl p-8 md:p-16 rounded-[40px] md:rounded-[60px] shadow-2xl border border-white/50 text-center relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 p-8 opacity-[0.03]">
                <Brain size={200} />
              </div>
              
              <div className="relative z-10">
                <div className="w-24 h-24 bg-blue-600 rounded-[32px] flex items-center justify-center mx-auto mb-10 shadow-2xl shadow-blue-200">
                  <Activity size={40} className="text-white" />
                </div>
                <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-6 font-display tracking-tight">Cognitive Assessment</h2>
                <p className="text-slate-500 mb-12 max-w-lg mx-auto leading-relaxed text-lg">
                  Observing cognitive response patterns. This stage measures memory retention under standard clinical observation.
                </p>
                
                {!isActive ? (
                  <button 
                    onClick={startTest}
                    className="group relative px-12 py-6 bg-blue-600 text-white font-bold rounded-3xl shadow-2xl shadow-blue-100 hover:bg-blue-700 transition-all duration-500 overflow-hidden"
                  >
                    <span className="relative z-10 flex items-center gap-3 text-lg">
                      Start Assessment <ArrowRight size={20} />
                    </span>
                  </button>
                ) : (
                  <div className="space-y-12">
                    {/* Camera Preview */}
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="relative w-64 h-40 mx-auto rounded-3xl overflow-hidden border-2 border-slate-100 shadow-xl bg-slate-50 group"
                    >
                      <video 
                        ref={videoRef} 
                        autoPlay 
                        muted 
                        playsInline 
                        className="w-full h-full object-cover grayscale opacity-70"
                      />
                      <div className="absolute top-3 left-3 flex items-center gap-2 px-3 py-1 bg-blue-600/90 rounded-full backdrop-blur-md">
                        <div className="w-1.5 h-1.5 bg-white rounded-full animate-pulse shadow-[0_0_8px_white]"></div>
                        <span className="text-[9px] font-bold text-white uppercase tracking-widest">Clinical Observation</span>
                      </div>
                      <div className="absolute bottom-3 right-3">
                         <div className="flex gap-1">
                            {[1, 2, 3].map(i => (
                               <motion.div 
                                  key={i}
                                  animate={{ height: [4, 12, 4] }}
                                  transition={{ repeat: Infinity, duration: 0.5, delay: i * 0.1 }}
                                  className="w-0.5 bg-blue-400"
                               />
                            ))}
                         </div>
                      </div>
                    </motion.div>

                    <div className="space-y-4">
                        <div className="text-6xl font-bold text-slate-900 font-mono tracking-tighter bg-clip-text text-transparent bg-gradient-to-b from-slate-900 to-slate-500">
                          {timeLeft}s
                        </div>
                        <div className="h-1.5 w-48 bg-slate-100 mx-auto rounded-full overflow-hidden">
                           <motion.div 
                              initial={{ width: '100%' }}
                              animate={{ width: '0%' }}
                              transition={{ duration: 15, ease: "linear" }}
                              className="h-full bg-blue-600"
                           />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-6 max-w-sm mx-auto">
                      {testWords.map((word, i) => (
                        <motion.div 
                          key={word}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: i * 0.1 }}
                          className="p-8 bg-white rounded-[24px] border border-slate-100 font-bold text-slate-800 shadow-xl shadow-slate-200/40 text-xl tracking-tight"
                        >
                          {word}
                        </motion.div>
                      ))}
                    </div>
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-[0.3em]">Neural imprint sequence</p>
                  </div>
                )}
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, y: -20 }}
              className="bg-white p-8 md:p-16 rounded-[40px] md:rounded-[60px] shadow-2xl border border-slate-100"
            >
              <div className="flex flex-col md:flex-row items-center justify-between mb-16 gap-8 text-center md:text-left">
                <div>
                  <h3 className="text-3xl font-bold text-slate-900 font-display mb-2">Saccadic Pattern Validation</h3>
                  <p className="text-slate-400 font-medium">Identify the 'Neural Cross' among processed artifacts</p>
                </div>
                <div className="w-24 h-24 rounded-[32px] bg-slate-900 text-white flex flex-col items-center justify-center font-bold relative group">
                  <div className="text-3xl font-mono">{timeLeft}</div>
                  <div className="text-[8px] uppercase tracking-widest text-slate-500">Seconds</div>
                  <div className="absolute inset-0 border-2 border-blue-500/30 rounded-[32px] animate-pulse"></div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-16">
                {patterns.map((p, i) => (
                  <button 
                    key={p.id}
                    disabled={selectedPattern !== null || isProcessing}
                    onClick={() => handlePatternSelect(p.id)}
                    className={cn(
                      "aspect-square rounded-[40px] border-2 flex flex-col items-center justify-center gap-6 transition-all duration-500 group relative",
                      selectedPattern === p.id 
                        ? (p.id === CORRECT_PATTERN_ID ? "bg-emerald-50 border-emerald-500 shadow-2xl shadow-emerald-100" : "bg-red-50 border-red-500 shadow-2xl shadow-red-100")
                        : "bg-slate-50/50 border-slate-100 hover:bg-white hover:border-blue-500 hover:shadow-2xl hover:-translate-y-2"
                    )}
                  >
                    {isProcessing && selectedPattern === p.id && (
                       <div className="absolute inset-0 flex items-center justify-center bg-white/80 backdrop-blur-sm rounded-[40px] z-10">
                          <motion.div 
                             animate={{ rotate: 360 }}
                             transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                             className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full"
                          />
                       </div>
                    )}

                    <svg viewBox="0 0 100 100" className={cn(
                      "w-24 h-24 transition-colors duration-500",
                      selectedPattern === p.id 
                         ? (p.id === CORRECT_PATTERN_ID ? "text-emerald-600" : "text-red-600")
                         : "text-blue-600 group-hover:text-blue-500"
                    )}>
                      <path d={p.shape} fill="none" stroke="currentColor" strokeWidth="6" strokeLinecap="round" />
                    </svg>
                    <span className={cn(
                      "text-[10px] font-bold uppercase tracking-[0.2em] transition-colors",
                      selectedPattern === p.id 
                         ? (p.id === CORRECT_PATTERN_ID ? "text-emerald-700" : "text-red-700")
                         : "text-slate-400 group-hover:text-blue-600"
                    )}>
                      {p.label}
                    </span>
                  </button>
                ))}
              </div>

              {feedback && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={cn(
                    "text-center py-6 rounded-3xl font-bold flex items-center justify-center gap-3",
                    feedback === 'Correct' ? "bg-emerald-50 text-emerald-600 border border-emerald-100" : "bg-red-50 text-red-600 border border-red-100"
                  )}
                >
                  {feedback === 'Correct' ? (
                     <><CheckCircle2 size={24} /> Neural Integrity Verified</>
                  ) : (
                     <><AlertCircle size={24} /> Pattern Discordance Detected</>
                  )}
                </motion.div>
              )}
            </motion.div>
          )}

          {step === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white p-12 md:p-20 rounded-[60px] text-center shadow-2xl border border-slate-100 relative overflow-hidden"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", damping: 15 }}
                className="w-24 h-24 bg-blue-50 text-blue-600 rounded-[32px] flex items-center justify-center mx-auto mb-10"
              >
                <CheckCircle2 size={48} />
              </motion.div>

              <h2 className="text-3xl md:text-5xl font-bold mb-6 text-slate-900 font-display tracking-tight">Assessment Completed</h2>
              <p className="text-slate-500 mb-16 max-w-md mx-auto text-lg font-medium leading-relaxed">
                Cognitive performance data has been synchronized with your clinical profile for diagnostic correlation.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto mb-16">
                 <div className="p-8 bg-slate-50 border border-slate-100 rounded-[32px]">
                    <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Processing Speed</div>
                    <div className="text-4xl font-bold text-slate-900 font-mono">142ms</div>
                 </div>
                 <div className="p-8 bg-slate-50 border border-slate-100 rounded-[32px]">
                    <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Response Accuracy</div>
                    <div className="text-4xl font-bold text-slate-900 font-mono">{score > 0 ? '99.4%' : '22.1%'}</div>
                 </div>
              </div>
              
              <button 
                onClick={finalizeTest}
                className="group px-12 py-6 bg-blue-600 text-white font-bold rounded-3xl hover:bg-blue-700 transition-all flex items-center justify-center gap-4 mx-auto text-lg shadow-2xl shadow-blue-200 active:scale-95"
              >
                View Final Analysis <ArrowRight size={24} className="group-hover:translate-x-2 transition-transform" />
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

// --- MRI Slideshow Component ---

const MRISlideshow = () => {
  const images = [
    { src: '/assets/mri_healthy.png', label: 'Healthy Brain', color: 'text-emerald-400', glow: 'shadow-emerald-500/20' },
    { src: '/assets/mri_glioma.png', label: 'Glioma Detection', color: 'text-red-400', glow: 'shadow-red-500/20' },
    { src: '/assets/mri_alzheimers.png', label: 'Alzheimer\'s Atrophy', color: 'text-amber-400', glow: 'shadow-amber-500/20' },
    { src: '/assets/micro_scan_user.png', label: 'Microscopic Analysis', color: 'text-indigo-400', glow: 'shadow-indigo-500/20' },
    { src: 'https://images.unsplash.com/photo-1579154235828-4519f39f946b?auto=format&fit=crop&q=80&w=1200', label: 'Neural Mapping', color: 'text-cyan-400', glow: 'shadow-cyan-500/20' },
  ];
  
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative h-full rounded-[48px] overflow-hidden bg-slate-950 group shadow-2xl">
      <AnimatePresence>
        <motion.img 
          key={currentIndex}
          src={images[currentIndex].src} 
          initial={{ opacity: 0, x: '100%' }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: '-100%' }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="absolute inset-0 w-full h-full object-cover"
        />
      </AnimatePresence>
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent pointer-events-none z-10" />
      <div className="absolute inset-0 bg-blue-600/5 mix-blend-overlay pointer-events-none z-10" />
      
      {/* Scanning UI */}
      <motion.div 
         animate={{ top: ['0%', '100%', '0%'] }}
         transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
         className="absolute left-0 right-0 h-[2px] bg-blue-400 shadow-[0_0_15px_#60a5fa] z-20 pointer-events-none"
      />

      {/* Disease Comparison Label */}
      <div className="absolute bottom-8 left-8 right-8 z-40">
        <motion.div 
          key={currentIndex}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className={cn(
            "flex items-center justify-between px-5 py-3 bg-slate-900/80 backdrop-blur-xl rounded-2xl border border-white/10 shadow-2xl",
            images[currentIndex].glow
          )}
        >
          <div className="flex items-center gap-3">
             <div className={cn("w-2 h-2 rounded-full animate-pulse", images[currentIndex].color.replace('text', 'bg'))} />
             <span className={cn("text-[11px] font-bold uppercase tracking-widest", images[currentIndex].color)}>
               {images[currentIndex].label}
             </span>
          </div>
          <div className="text-[9px] font-bold text-slate-500 uppercase tracking-tighter">Clinical Sample 0{currentIndex + 1}</div>
        </motion.div>
      </div>
    </div>
  );
};

// --- Pages ---

const Hero = ({ onStart }: { onStart: () => void }) => {
  const { t } = useContext(AppContext);
  return (
    <section className="pt-40 pb-32 px-6 relative min-h-[90vh] flex items-center overflow-hidden bg-white transition-colors duration-500">
      {/* Organic Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
         <motion.div 
            animate={{ 
               scale: [1, 1.1, 1],
               x: [0, 20, 0],
               y: [0, -20, 0]
            }}
            transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-blue-50/50 blur-[150px] rounded-full"
         />
         <motion.div 
            animate={{ 
               scale: [1, 1.2, 1],
               x: [0, -30, 0],
               y: [0, 30, 0]
            }}
            transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
            className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] bg-indigo-50/50 blur-[150px] rounded-full"
         />
      </div>

      <div className="max-w-7xl mx-auto relative z-10 w-full">
        <div className="flex flex-col lg:grid lg:grid-cols-12 items-center gap-16 lg:gap-24">
          
          {/* Text Content */}
          <div className="lg:col-span-7 text-center lg:text-left">
            {/* College Badge */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-3 px-4 py-2 bg-blue-50/50 rounded-full border border-blue-100 mb-6"
            >
              <div className="w-2 h-2 bg-blue-600 rounded-full animate-pulse" />
              <span className="text-sm md:text-base font-bold uppercase tracking-[0.15em] text-blue-600">{t('collegeName')}</span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="inline-flex items-center gap-4 px-4 py-2 bg-white/50 backdrop-blur-md rounded-2xl border border-slate-100 mb-8 shadow-sm"
            >
              <div className="flex -space-x-2">
                 {[1,2,3].map(i => <div key={i} className="w-6 h-6 rounded-full border-2 border-white bg-slate-200" />)}
              </div>
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500">{t('trustedBy')}</span>
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="text-3xl sm:text-5xl md:text-[76px] font-bold text-slate-900 mb-10 tracking-[-0.04em] leading-[1.05] font-display"
            >
              {t('advancedNeuro')} <br/>
              <span className="relative inline-block mt-2">
                 <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-600">{t('simplifiedDiag')}</span>
                 <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: '100%' }}
                    transition={{ delay: 0.8, duration: 1 }}
                    className="absolute bottom-3 left-0 h-2 bg-blue-100/50 -z-10 rounded-full"
                 />
              </span>
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="text-xl md:text-2xl text-slate-500 mb-16 max-w-xl mx-auto lg:mx-0 font-light leading-relaxed tracking-tight"
            >
              {t('bridgingGap')}
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col sm:flex-row items-center gap-6 justify-center lg:justify-start"
            >
              <button 
                onClick={onStart}
                className="group relative w-full sm:w-auto px-12 py-7 bg-slate-900 text-white font-bold rounded-[32px] shadow-[0_20px_50px_-15px_rgba(15,23,42,0.3)] hover:bg-blue-600 hover:-translate-y-1 transition-all active:scale-95 flex items-center justify-center gap-4 text-lg overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                <span>{t('initializeAnalysis')}</span>
                <div className="w-8 h-8 bg-white/10 rounded-xl flex items-center justify-center group-hover:bg-white/20 transition-colors">
                   <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </button>
              <button 
                onClick={() => {
                  const el = document.getElementById('how-it-works');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="w-full sm:w-auto px-12 py-7 bg-white text-slate-600 font-bold rounded-[32px] border border-slate-200 hover:bg-slate-50 transition-all flex items-center justify-center gap-3 text-lg"
              >
                {t('viewDocumentation')}
              </button>
            </motion.div>
          </div>

          {/* Clinical Workstation Visualization */}
          <div className="lg:col-span-5 relative w-full aspect-square">
             <motion.div 
               initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
               animate={{ opacity: 1, scale: 1, rotate: 0 }}
               transition={{ duration: 1.2, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
               className="relative h-full"
             >
                {/* Main MRI Layer */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] aspect-square bg-white p-4 rounded-[64px] shadow-2xl border border-slate-100 z-20">
                   <MRISlideshow />
                </div>
                 {/* Decorative Dots */}

                <div className="absolute top-[20%] left-[-10%] grid grid-cols-4 gap-4 opacity-20">
                   {[...Array(16)].map((_, i) => <div key={i} className="w-1.5 h-1.5 bg-blue-600 rounded-full" />)}
                </div>
             </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

const MRIShowcase = () => {
  const { t } = useContext(AppContext);
  const extendedExamples = [...MRI_EXAMPLES, ...MRI_EXAMPLES, ...MRI_EXAMPLES];

  return (
    <section className="py-24 bg-white overflow-hidden border-y border-slate-100">
      <div className="max-w-7xl mx-auto px-6 mb-16 flex flex-col md:flex-row items-start justify-between gap-6">
        <div>
          <h2 className="text-3xl font-bold text-slate-900 mb-4 font-display">{t('clinicalArchiveStream')}</h2>
          <p className="text-slate-500 max-w-md text-sm font-light">{t('clinicalArchiveDesc')}</p>
        </div>
        <div className="flex gap-2">
           <div className="px-4 py-2 bg-blue-50 text-blue-600 text-[10px] font-bold rounded-xl border border-blue-100 flex items-center gap-2">
              <div className="w-1.5 h-1.5 bg-blue-600 rounded-full animate-pulse"></div>
              {t('liveStream')}
           </div>
        </div>
      </div>

      <div className="relative flex overflow-hidden">
        <motion.div 
          className="flex gap-8 px-4 py-10"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        >
          {extendedExamples.map((item, i) => (
            <motion.div 
              key={i}
              className="relative group w-[280px] h-[360px] bg-slate-50 rounded-[40px] overflow-hidden border border-slate-100 shadow-sm hover:shadow-2xl transition-all duration-700"
            >
              <img 
                src={item.image} 
                alt={item.label}
                className="w-full h-full object-cover grayscale transition-all duration-700 group-hover:grayscale-0 group-hover:scale-110"
              />
              
              {/* Scanning Laser Animation */}
              <motion.div 
                animate={{ top: ['0%', '100%', '0%'] }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                className="absolute left-0 right-0 h-[1.5px] bg-blue-400/60 shadow-[0_0_10px_#60a5fa] z-20"
              />

              <div className="absolute inset-x-0 bottom-0 p-8 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent text-white">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-bold text-blue-400 uppercase tracking-widest">Case ID: {item.id}00-NX</span>
                  <span className="px-2 py-0.5 bg-white/20 backdrop-blur-md rounded-md text-[9px] font-bold">{item.confidence}</span>
                </div>
                <h4 className="font-bold text-lg leading-tight">{item.label}</h4>
              </div>
              
              <div className="absolute inset-0 border-2 border-transparent group-hover:border-blue-500/30 rounded-[32px] transition-all duration-500 pointer-events-none"></div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

const DisorderModal = ({ disorder, onClose }: { disorder: Disorder, onClose: () => void }) => {
  const [activeTab, setActiveTab] = useState<'DETAILS' | 'GUIDELINES'>('DETAILS');

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-slate-900/60 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div 
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        className="bg-white w-full max-w-2xl rounded-[48px] overflow-hidden shadow-2xl relative"
        onClick={e => e.stopPropagation()}
      >
        <button 
          onClick={onClose}
          className="absolute top-8 right-8 w-12 h-12 bg-slate-100 text-slate-500 rounded-2xl flex items-center justify-center hover:bg-slate-200 transition-all z-10"
        >
          <X size={20} />
        </button>

        <div className="h-64 relative">
          <img src={disorder.image} alt={disorder.title} className="w-full h-full object-cover grayscale brightness-110" />
          <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent"></div>
          <div className="absolute bottom-0 left-0 p-10">
            <div className={cn(
              "px-3 py-1 rounded-full text-[9px] font-bold uppercase tracking-widest border mb-4 inline-block",
              disorder.risk === 'High' ? "bg-red-50 text-red-600 border-red-100" : "bg-amber-50 text-amber-600 border-amber-100"
            )}>
              {disorder.risk} Risk Level
            </div>
            <h2 className="text-4xl font-bold text-slate-900 font-display">{disorder.title}</h2>
          </div>
        </div>

        <div className="p-10 pt-4 space-y-8 max-h-[60vh] overflow-y-auto no-scrollbar">
          {activeTab === 'DETAILS' ? (
            <>
              <div>
                <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">Clinical Overview</h4>
                <p className="text-slate-600 leading-relaxed font-light">{disorder.description}</p>
              </div>

              <div className="grid grid-cols-2 gap-8">
                <div>
                  <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">Standard Treatment</h4>
                  <ul className="space-y-2">
                    {disorder.treatment?.map(t => (
                      <li key={t} className="text-sm text-slate-600 flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                        {t}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">Statistics</h4>
                  <div className="space-y-4">
                    <div>
                      <div className="text-[10px] text-slate-400 font-bold mb-1">Prevalence</div>
                      <div className="text-sm font-bold text-slate-800">{disorder.prevalence}</div>
                    </div>
                    <div>
                      <div className="text-[10px] text-slate-400 font-bold mb-1">General Prognosis</div>
                      <div className="text-sm font-bold text-slate-800">{disorder.prognosis}</div>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">Clinical Indicators</h4>
                <div className="flex flex-wrap gap-2">
                  {disorder.symptoms.map(s => (
                    <span key={s} className="px-4 py-2 bg-slate-50 text-slate-600 rounded-2xl text-[10px] font-bold border border-slate-100">{s}</span>
                  ))}
                </div>
              </div>
            </>
          ) : (
            <div className="space-y-8">
              <div>
                <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-6">Institutional Diagnostic Guidelines</h4>
                <div className="grid gap-4">
                  {disorder.guidelines?.map((g, i) => (
                    <motion.div 
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className="flex gap-5 p-6 bg-slate-50 rounded-[24px] border border-slate-100 group hover:bg-white hover:shadow-xl transition-all"
                    >
                      <div className="w-8 h-8 bg-blue-600 text-white text-xs font-bold flex items-center justify-center rounded-xl shrink-0 shadow-lg shadow-blue-200">
                        {i + 1}
                      </div>
                      <p className="text-sm text-slate-700 font-medium leading-relaxed">{g}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
              <div className="p-6 bg-amber-50 rounded-3xl border border-amber-100 flex gap-4">
                <AlertCircle className="text-amber-600 shrink-0" size={24} />
                <p className="text-xs text-amber-800 font-medium leading-relaxed">
                  These guidelines are for clinical reference only and should be cross-verified with institutional protocols.
                </p>
              </div>
            </div>
          )}
        </div>

        <div className="p-10 border-t border-slate-50 bg-slate-50/50 flex gap-4">
          <button 
            onClick={() => setActiveTab(activeTab === 'DETAILS' ? 'GUIDELINES' : 'DETAILS')}
            className="flex-1 py-4 bg-blue-600 text-white font-bold rounded-2xl shadow-xl shadow-blue-100 hover:bg-blue-700 transition-all text-sm"
          >
            {activeTab === 'DETAILS' ? 'Clinical Guidelines' : 'Back to Details'}
          </button>
          <button className="flex-1 py-4 bg-white text-slate-700 font-bold rounded-2xl border border-slate-200 hover:bg-slate-50 transition-all text-sm" onClick={onClose}>
            Close Report
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};

const DisorderCards = () => {
  const { t } = useContext(AppContext);
  const [selectedDisorder, setSelectedDisorder] = useState<Disorder | null>(null);

  return (
    <section className="py-12 md:py-24 px-4 md:px-6 bg-slate-50/50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-12 md:mb-20">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6 font-display tracking-tight">{t('neuroResearch')}</h2>
          <p className="text-slate-500 text-base md:text-lg font-light leading-relaxed">{t('neuroResearchDesc')}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10">
          {DISORDERS.map((disorder, i) => (
            <motion.div
              key={disorder.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group bg-white rounded-[40px] p-8 border border-slate-100 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-500"
            >
              <div className="relative h-48 mb-8 rounded-3xl overflow-hidden shadow-inner bg-slate-50">
                <img 
                  src={disorder.image} 
                  alt={disorder.title} 
                  className="w-full h-full object-cover grayscale brightness-110 group-hover:grayscale-0 transition-all duration-700" 
                />
                <div className={cn(
                  "absolute top-4 right-4 px-3 py-1 rounded-full text-[9px] font-bold uppercase tracking-widest border",
                  disorder.risk === 'High' ? "bg-red-50 text-red-600 border-red-100" : "bg-amber-50 text-amber-600 border-amber-100"
                )}>
                  {disorder.risk} Risk
                </div>
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-4 group-hover:text-blue-600 transition-colors font-display">{disorder.title}</h3>
              <p className="text-sm text-slate-500 mb-6 font-light leading-relaxed">
                {disorder.description}
              </p>
              <div>
                <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">Key Indicators</h4>
                <div className="flex flex-wrap gap-2 mb-8">
                  {disorder.symptoms.map(s => (
                    <span key={s} className="px-3 py-1.5 bg-slate-50 text-slate-600 rounded-xl text-[10px] font-bold border border-slate-100">{s}</span>
                  ))}
                </div>
              </div>
              <button 
                onClick={() => setSelectedDisorder(disorder)}
                className="w-full py-4 bg-slate-50 text-slate-800 font-bold rounded-2xl border border-slate-100 hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-all text-sm group-hover:shadow-lg shadow-blue-100 flex items-center justify-center gap-2"
              >
                {t('clinicalDetails')} <ChevronRight size={16} />
              </button>
            </motion.div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selectedDisorder && (
          <DisorderModal disorder={selectedDisorder} onClose={() => setSelectedDisorder(null)} />
        )}
      </AnimatePresence>
    </section>
  );
};

const SymptomVisualizer = () => {
  const { t } = useContext(AppContext);
  const regions = [
    { id: 'frontal', pos: 'top-1/4 left-1/4', label: 'Confusion / Memory', color: 'bg-blue-500' },
    { id: 'temporal', pos: 'top-[45%] left-1/4', label: 'Speech / Seizures', color: 'bg-amber-500' },
    { id: 'parietal', pos: 'top-1/4 left-[60%]', label: 'Motor / Sensation', color: 'bg-emerald-500' },
    { id: 'occipital', pos: 'top-[45%] left-3/4', label: 'Blurred Vision', color: 'bg-indigo-500' },
  ];

  return (
    <section className="py-12 md:py-24 px-4 md:px-6 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-20 items-center">
        <div className="order-2 lg:order-1 relative">
          <div className="absolute inset-0 bg-blue-50/50 blur-[120px] rounded-full scale-150"></div>
          <div className="relative p-6 md:p-12 bg-white rounded-[32px] md:rounded-[48px] shadow-2xl border border-slate-50 flex items-center justify-center">
            {/* Simple Brain SVG representation */}
            <div className="relative w-full max-w-[400px] aspect-square">
              <svg viewBox="0 0 200 200" className="w-full h-full drop-shadow-2xl">
                <path d="M100,20 C140,20 170,50 170,90 C170,130 140,160 100,160 C60,160 30,130 30,90 C30,50 60,20 100,20 Z" fill="#F8FAFC" stroke="#E2E8F0" strokeWidth="2" />
                <path d="M100,20 C80,20 70,40 70,60 C70,90 90,110 110,110 C130,110 150,90 150,60 C150,40 140,20 120,20" fill="none" stroke="#E2E8F0" strokeWidth="1" strokeDasharray="4 4" />
                <path d="M100,160 C120,160 130,140 130,120 C130,90 110,70 90,70 C70,70 50,90 50,120 C50,140 60,160 80,160" fill="none" stroke="#E2E8F0" strokeWidth="1" strokeDasharray="4 4" />
              </svg>
              
              {regions.map((region) => (
                <div key={region.id} className={cn("absolute group cursor-pointer", region.pos)}>
                  <div className={cn("w-4 h-4 rounded-full animate-ping opacity-20 absolute inset-0", region.color)}></div>
                  <div className={cn("w-4 h-4 rounded-full relative z-10 border-2 border-white shadow-lg", region.color)}></div>
                  
                  <div className="absolute top-1/2 left-full -translate-y-1/2 ml-4 whitespace-nowrap opacity-0 group-hover:opacity-100 group-active:opacity-100 transition-all translate-x-2 group-hover:translate-x-0">
                    <div className="bg-slate-900 text-white px-4 py-2 rounded-xl text-[10px] md:text-xs font-bold shadow-2xl relative">
                      {region.label}
                      <div className="absolute right-full top-1/2 -translate-y-1/2 border-8 border-transparent border-r-slate-900"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="absolute bottom-4 left-4 right-4 md:bottom-8 md:left-8 md:right-8 bg-blue-50/80 backdrop-blur-md p-4 md:p-5 rounded-2xl md:rounded-3xl border border-blue-100 flex items-center gap-3 md:gap-4">
              <div className="w-8 h-8 md:w-10 md:h-10 bg-white rounded-xl md:rounded-2xl shrink-0 flex items-center justify-center text-blue-600 shadow-sm">
                <Info size={16} className="md:w-[20px] md:h-[20px]" />
              </div>
              <p className="text-[10px] md:text-xs text-blue-800 font-medium leading-relaxed">
                {t('hotspotCorrelation')}
              </p>
            </div>
          </div>
        </div>

        <div className="order-1 lg:order-2 space-y-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-50 text-amber-600 rounded-full text-[10px] font-bold uppercase tracking-widest border border-amber-100">
            {t('clinicalCorrelation')}
          </div>
          <h2 id="symptoms" className="text-3xl md:text-4xl font-bold text-slate-900 font-display leading-[1.1]">{t('symptomIntelligenceSection')}</h2>
          <p className="text-lg text-slate-500 font-light leading-relaxed pb-6">
            {t('symptomIntelligenceDesc')}
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { label: 'Headache', val: '92% Correlation', icon: Activity },
              { label: 'Seizures', val: '88% Pattern', icon: Zap },
              { label: 'Memory Loss', val: 'High Risk Factor', icon: Brain },
              { label: 'Visual Aura', val: 'Focal Indicator', icon: Microscope }
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-4 p-5 bg-slate-50 rounded-2xl border border-slate-100 group hover:bg-white hover:shadow-xl hover:border-blue-100 transition-all duration-300">
                <div className="w-12 h-12 bg-white text-slate-400 group-hover:text-blue-600 group-hover:bg-blue-50 rounded-xl flex items-center justify-center shadow-sm transition-all">
                  <item.icon size={22} />
                </div>
                <div>
                  <div className="text-sm font-bold text-slate-800 tracking-tight">{item.label}</div>
                  <div className="text-[10px] font-bold text-blue-500 uppercase tracking-widest">{item.val}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const HowItWorks = () => {
  return (
    <section id="how-it-works" className="py-16 md:py-24 bg-white scroll-mt-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-6 font-display tracking-tight">How It Works</h2>
          <p className="text-slate-500 max-w-2xl mx-auto text-lg font-light">
            Our multi-layered diagnostic pipeline combines computer vision with clinical reasoning.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {STEPS.map((step, i) => (
            <motion.div 
              key={step.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="text-center group"
            >
              <div className="w-20 h-20 bg-white rounded-3xl border border-slate-200 flex items-center justify-center text-xl font-bold text-slate-400 mx-auto mb-8 shadow-sm group-hover:border-blue-500 group-hover:text-blue-600 group-hover:scale-110 transition-all duration-500">
                {step.id}
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-3">{step.title}</h3>
              <p className="text-sm text-slate-500 font-light leading-relaxed px-4">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Stats = () => {
  const { t } = useContext(AppContext);
  return (
    <section className="py-24 bg-slate-900 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-blue-500/10 rounded-full blur-[100px]"></div>
      <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-emerald-500/10 rounded-full blur-[100px]"></div>
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 text-center items-center">
          {[
            { label: t('mriScansAnalyzed'), val: '48,200', suffix: '+' },
            { label: t('detectionAccuracy'), val: '99.2', suffix: '%' },
            { label: t('neuralPatterns'), val: '1.2', suffix: 'M' },
            { label: t('cliniciansActive'), val: '12', suffix: 'k' },
          ].map((stat, i) => (
            <div key={i} className="space-y-4">
              <div className="text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight flex items-center justify-center">
                {stat.val}<span className="text-blue-500">{stat.suffix}</span>
              </div>
              <div className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Testimonials = () => {
  const { t } = useContext(AppContext);
  return (
    <section className="py-16 md:py-20 px-6 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-50 text-indigo-600 rounded-full text-[10px] font-bold uppercase tracking-widest border border-indigo-100 mb-8">
              {t('clinicalValidation')}
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-8 font-display leading-tight">{t('trustedByLeading')}</h2>
            <div className="space-y-10">
              {[
                { 
                  quote: "NeuroXplain has significantly reduced our primary triage time for MRI scans. The explainability layer is what sets it apart from black-box models.",
                  author: "Dr. Sarah Chen",
                  role: "Head of Neuroradiology, Metromedical"
                },
                { 
                  quote: "The ability to correlate symbolic clinical rules with visual neural network predictions gives our team the confidence needed for critical interventions.",
                  author: "Prof. James Wilson",
                  role: "Neurological Research Lead"
                }
              ].map((t, i) => (
                <div key={i} className="relative pl-10 border-l-2 border-slate-100">
                  <div className="absolute -left-[5px] top-0 w-2 h-2 bg-blue-600 rounded-full"></div>
                  <p className="text-lg text-slate-600 font-light italic mb-4 leading-relaxed tracking-tight">"{t.quote}"</p>
                  <div className="font-bold text-slate-900">{t.author}</div>
                  <div className="text-xs text-slate-400 uppercase tracking-widest font-bold">{t.role}</div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="relative">
            <div className="absolute inset-0 bg-blue-50 rounded-[64px] rotate-3 scale-105 -z-10"></div>
            <div className="bg-slate-900 p-12 rounded-[64px] text-white shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 p-12 opacity-10">
                <Microscope size={120} />
              </div>
              <h3 className="text-2xl font-bold mb-8 font-display">{t('researchHighlights')}</h3>
              <div className="space-y-6">
                {[
                  { title: "Neuro-Symbolic Integration", desc: "Our latest paper published in Nature Medicine explores the convergence of LLMs and CNNs." },
                  { title: "Explainability Benchmarks", desc: "Achieving 94% alignment with human radiologist reasoning paths." },
                  { title: "Zero-Shot Localization", desc: "Detection of rare pathologies with minimal training data using symbolic priors." }
                ].map((item, i) => (
                  <div key={i} className="group cursor-pointer">
                    <h4 className="text-blue-400 font-bold mb-2 flex items-center gap-2 group-hover:translate-x-1 transition-transform">
                      {item.title} <ArrowRight size={14} />
                    </h4>
                    <p className="text-sm text-slate-400 font-light leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>
              <button className="mt-12 w-full py-5 bg-white/5 border border-white/10 rounded-3xl text-sm font-bold hover:bg-white/10 transition-all">
                {t('accessResearchPortal')}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const HomePage = ({ onStart, setPage }: { onStart: () => void, setPage: (p: Page) => void }) => {
  const { t } = useContext(AppContext);
  return (
    <div className="pt-10 min-h-screen">
      <Hero onStart={onStart} />

      {/* Partner Marquee */}
      <section className="py-12 md:py-20 bg-white border-y border-slate-100 overflow-hidden">
         <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-10">
               <span className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">{t('institutionalPartners')}</span>
            </div>
            <div className="flex justify-center flex-wrap gap-12 md:gap-20 opacity-30 grayscale hover:grayscale-0 transition-all duration-500">
               {['Mayo Clinic', 'Johns Hopkins', 'Cleveland Clinic', 'Stanford Medicine', 'UCSF Health'].map(name => (
                  <div key={name} className="text-xl font-bold text-slate-900 font-display italic tracking-tight">{name}</div>
               ))}
            </div>
         </div>
      </section>

      <MRIShowcase />
      
      {/* Editorial Feature Grid */}
      <section className="px-6 py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-12 gap-20 items-end mb-24">
             <div className="lg:col-span-7">
                <h2 className="text-4xl sm:text-5xl md:text-7xl font-bold text-slate-900 mb-8 font-display leading-[1.1] tracking-tight">{t('builtForClinical')}</h2>
                <p className="text-xl text-slate-500 font-light leading-relaxed max-w-xl">{t('builtForClinicalDesc')}</p>
             </div>
             <div className="lg:col-span-5 flex justify-end">
                <button 
                  onClick={() => {
                    const el = document.getElementById('how-it-works');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="px-10 py-5 bg-blue-50 text-blue-600 font-bold rounded-2xl hover:bg-blue-100 transition-all"
                >
                  {t('explorePlatformSpecs')}
                </button>
             </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {FEATURES.map((feature, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group relative bg-slate-50 p-8 md:p-12 rounded-[48px] overflow-hidden hover:bg-slate-900 transition-all duration-700"
              >
                {/* Background Shape */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700" />
                
                <div className={cn("w-20 h-20 rounded-3xl flex items-center justify-center mb-12 shadow-sm group-hover:scale-110 transition-all duration-500", feature.color)}>
                  <feature.icon size={36} />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-6 font-display group-hover:text-white transition-colors">{feature.title}</h3>
                <p className="text-base text-slate-500 leading-relaxed font-light group-hover:text-slate-400 transition-colors">{feature.desc}</p>
                
                <div className="mt-10 opacity-0 group-hover:opacity-100 transition-all translate-y-4 group-hover:translate-y-0 duration-500">
                   <div className="flex items-center gap-2 text-blue-400 font-bold text-xs uppercase tracking-widest cursor-pointer" onClick={() => setPage('TEAM')}>
                      {t('deepDive')} <ArrowRight size={14} />
                   </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <DashboardPreview setPage={setPage} />
      <DisorderCards />
      <SymptomVisualizer />
      <HowItWorks />
      <Testimonials />
      <Stats />
    </div>
  );
};

const DashboardPreview = ({ setPage }: { setPage: (p: Page) => void }) => {
  const chartData = [
    { name: 'Mon', accuracy: 94, latency: 120 },
    { name: 'Tue', accuracy: 95, latency: 115 },
    { name: 'Wed', accuracy: 94, latency: 125 },
    { name: 'Thu', accuracy: 97, latency: 110 },
    { name: 'Fri', accuracy: 96, latency: 112 },
    { name: 'Sat', accuracy: 98, latency: 105 },
    { name: 'Sun', accuracy: 99, latency: 102 },
  ];

  return (
    <section className="px-6 py-32 bg-slate-50 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row items-center gap-20">
          <div className="flex-1">
            <div className="w-16 h-1 bg-blue-600 mb-6 md:mb-10"></div>
            <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-6 md:mb-8 font-display leading-tight tracking-tight">Institutional Diagnostic Dashboard</h2>
            <p className="text-lg md:text-xl text-slate-500 font-light leading-relaxed mb-10 md:mb-12">
               Access real-time clinical performance metrics, cross-institutional pathology trends, and neuro-symbolic reasoning logs in a unified, secure workstation.
            </p>
            <div className="grid grid-cols-2 gap-8 mb-12">
               <div>
                  <div className="text-4xl font-bold text-slate-900 font-mono">99.8%</div>
                  <div className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-2">Decision Accuracy</div>
               </div>
               <div>
                  <div className="text-4xl font-bold text-slate-900 font-mono">102ms</div>
                  <div className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-2">Inference Latency</div>
               </div>
            </div>
            <button 
              onClick={() => setPage('TEAM')}
              className="w-full sm:w-auto px-10 py-5 bg-slate-900 text-white font-bold rounded-2xl shadow-xl hover:bg-blue-600 transition-all flex items-center justify-center gap-3 active:scale-95"
            >
               Request Enterprise Access <ArrowRight size={20} />
            </button>
          </div>

          <div className="flex-1 w-full lg:w-auto relative">
             <motion.div 
               initial={{ opacity: 0, x: 50 }}
               whileInView={{ opacity: 1, x: 0 }}
               viewport={{ once: true }}
               className="bg-white p-8 md:p-12 rounded-[56px] shadow-2xl shadow-slate-200 border border-slate-100"
             >
                <div className="flex items-center justify-between mb-12">
                   <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600">
                         <LineChartIcon size={24} />
                      </div>
                      <div>
                         <div className="text-sm font-bold text-slate-900">Performance Metrics</div>
                         <div className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Rolling 7-Day Window</div>
                      </div>
                   </div>
                   <div className="flex gap-2">
                      <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                      <div className="w-3 h-3 bg-slate-200 rounded-full"></div>
                   </div>
                </div>

                <div className="h-[300px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={chartData}>
                      <defs>
                        <linearGradient id="colorAcc" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.1}/>
                          <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                      <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 10}} dy={10} />
                      <Tooltip 
                         contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                         labelStyle={{ fontWeight: 'bold', color: '#1e293b' }}
                      />
                      <Area type="monotone" dataKey="accuracy" stroke="#3b82f6" strokeWidth={3} fillOpacity={1} fill="url(#colorAcc)" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
                
                <div className="mt-12 flex items-center justify-between pt-8 border-t border-slate-50">
                   <div className="flex -space-x-3">
                      {[1, 2, 3, 4].map(i => (
                         <div key={i} className="w-10 h-10 rounded-full border-2 border-white bg-slate-100 flex items-center justify-center text-[10px] font-bold text-slate-400">
                            DR
                         </div>
                      ))}
                      <div className="w-10 h-10 rounded-full border-2 border-white bg-blue-600 flex items-center justify-center text-[10px] font-bold text-white">
                         +12
                      </div>
                   </div>
                   <div className="text-xs font-bold text-emerald-500 flex items-center gap-2">
                      <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                      LIVE SYSTEM SYNC
                   </div>
                </div>
             </motion.div>
             
             {/* Floating UI Card */}
             <motion.div 
               animate={{ y: [0, -15, 0] }}
               transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
               className="absolute -bottom-10 -left-10 bg-slate-900 text-white p-8 rounded-[36px] shadow-2xl hidden md:block border border-slate-800"
             >
                <div className="flex items-center gap-4 mb-6">
                   <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center">
                      <ShieldCheck size={20} />
                   </div>
                   <div className="text-sm font-bold">HIPAA Secure</div>
                </div>
                <div className="space-y-3">
                   <div className="h-1.5 w-32 bg-white/10 rounded-full"></div>
                   <div className="h-1.5 w-24 bg-white/5 rounded-full"></div>
                </div>
             </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

const LineChartIcon = ({ size }: { size: number }) => (
   <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 3v18h18" /><path d="m19 9-5 5-4-4-3 3" />
   </svg>
);

const UploadPage = ({ onComplete }: { onComplete: (file: File | null) => void }) => {
  const { t } = useContext(AppContext);
  const [dragActive, setDragActive] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") setDragActive(true);
    else if (e.type === "dragleave") setDragActive(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setSelectedFile(e.dataTransfer.files[0]);
    }
  };

  return (
    <div className="pt-32 pb-20 px-6 min-h-screen bg-slate-50">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-slate-900 mb-3">{t('uploadScan')}</h1>
          <p className="text-slate-500">{t('uploadDesc')}</p>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white p-10 rounded-[32px] shadow-xl shadow-slate-200/50 border border-slate-100"
        >
          <div 
            onDragEnter={handleDrag}
            onDragOver={handleDrag}
            onDragLeave={handleDrag}
            onDrop={handleDrop}
            className={cn(
              "relative border-2 border-dashed rounded-3xl p-12 transition-all flex flex-col items-center justify-center text-center cursor-pointer",
              dragActive ? "border-blue-500 bg-blue-50/50" : "border-slate-200 hover:border-slate-300 hover:bg-slate-50"
            )}
          >
            {selectedFile ? (
              <div className="space-y-6">
                <div className="w-24 h-24 mx-auto bg-blue-100 rounded-3xl flex items-center justify-center text-blue-600 shadow-inner">
                  <CheckCircle2 size={48} />
                </div>
                <div>
                  <p className="text-slate-900 font-bold text-lg mb-1">{selectedFile.name}</p>
                  <p className="text-slate-500 text-sm">{(selectedFile.size / 1024 / 1024).toFixed(2)} MB • Ready for analysis</p>
                </div>
                <button 
                  onClick={() => setSelectedFile(null)}
                  className="text-xs font-semibold text-slate-400 hover:text-red-500 underline transition-colors"
                >
                  {t('removeFile')}
                </button>
              </div>
            ) : (
              <>
                <div className="w-20 h-20 mb-6 bg-slate-100 rounded-3xl flex items-center justify-center text-slate-400">
                  <Upload size={32} />
                </div>
                <h3 className="text-xl font-bold text-slate-800 mb-2">{t('orDragDrop')}</h3>
                <p className="text-slate-500 mb-8 max-w-xs">{t('supportedFormats')}</p>
                <input 
                  type="file" 
                  className="hidden" 
                  id="mri-upload" 
                  accept="image/*"
                  onChange={(e) => e.target.files && setSelectedFile(e.target.files[0])}
                />
                <label 
                  htmlFor="mri-upload"
                  className="px-8 py-3.5 bg-blue-600 text-white font-semibold rounded-2xl hover:bg-blue-700 transition-all cursor-pointer shadow-lg shadow-blue-100 mb-4"
                >
                  {t('selectFile')}
                </label>
                <div className="flex items-center gap-4 text-xs font-bold text-slate-400 uppercase tracking-widest">
                  <div className="h-px w-8 bg-slate-200"></div>
                  <span>OR</span>
                  <div className="h-px w-8 bg-slate-200"></div>
                </div>
                <button 
                  onClick={() => onComplete(null)}
                  className="mt-4 px-6 py-2 text-blue-600 hover:text-blue-700 font-bold text-sm transition-colors"
                >
                  Try with Sample MRI Demo
                </button>
              </>
            )}
          </div>

          <div className="mt-10 pt-10 border-t border-slate-100 flex items-center justify-between">
            <div className="flex items-center gap-4 text-slate-400">
              <div className="flex items-center gap-1.5 bg-slate-50 px-3 py-1.5 rounded-full border border-slate-100">
                <div className="w-1.5 h-1.5 bg-slate-400 rounded-full"></div>
                <span className="text-[10px] font-bold uppercase tracking-wider">{t('hipaaSecured')}</span>
              </div>
              <div className="flex items-center gap-1.5 bg-slate-50 px-3 py-1.5 rounded-full border border-slate-100">
                <div className="w-1.5 h-1.5 bg-slate-400 rounded-full"></div>
                <span className="text-[10px] font-bold uppercase tracking-wider">{t('encryption')}</span>
              </div>
            </div>
            
            <button 
              disabled={!selectedFile}
              onClick={() => onComplete(selectedFile)}
              className={cn(
                "px-10 py-4 font-bold rounded-2xl transition-all flex items-center gap-2",
                selectedFile 
                ? "bg-blue-600 text-white shadow-xl shadow-blue-100 hover:bg-blue-700 active:scale-95" 
                : "bg-slate-100 text-slate-400 cursor-not-allowed"
              )}
            >
              {t('continueAnalysis')} <ChevronRight size={18} />
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

const SymptomsPage = ({ onComplete }: { onComplete: (symptoms: string[], desc: string) => void }) => {
  const { t } = useContext(AppContext);
  const [symptoms, setSymptoms] = useState<Symptom[]>([
    { id: 'headache', label: 'Severe Headache', checked: false },
    { id: 'seizures', label: 'Seizures', checked: false },
    { id: 'dizziness', label: 'Dizziness', checked: false },
    { id: 'confusion', label: 'Confusion', checked: false },
    { id: 'memory', label: 'Memory Loss', checked: false },
    { id: 'vision', label: 'Blurred Vision', checked: false },
    { id: 'numbness', label: 'Numbness/Weakness', checked: false },
  ]);
  const [description, setDescription] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [voiceLevel, setVoiceLevel] = useState(0);

  useEffect(() => {
    let interval: any;
    if (isRecording) {
      interval = setInterval(() => {
        setVoiceLevel(Math.random() * 50 + 10);
      }, 100);
    } else {
      setVoiceLevel(0);
    }
    return () => clearInterval(interval);
  }, [isRecording]);

  const toggleSymptom = (id: string) => {
    setSymptoms(prev => prev.map(s => s.id === id ? { ...s, checked: !s.checked } : s));
  };

  const toggleRecording = () => {
    setIsRecording(!isRecording);
    // Simulate speech-to-text
    if (!isRecording) {
      setTimeout(() => {
        setDescription(prev => prev + (prev ? " " : "") + "Patient reports persistent focal pressure in the parietal region, correlated with recent memory lapses...");
      }, 3000);
    }
  };

  return (
    <div className="pt-32 pb-20 px-6 min-h-screen bg-slate-50">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-slate-900 mb-3">{t('clinicalPresentation')}</h1>
          <p className="text-slate-500">{t('clinicalPresentationDesc')}</p>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white p-10 rounded-[32px] shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <div className="flex items-center gap-2 mb-6">
                <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600">
                  <Plus size={18} />
                </div>
                <h3 className="font-bold text-slate-800">{t('selectSymptoms')}</h3>
              </div>
              <div className="space-y-3">
                {symptoms.map(s => (
                  <label 
                    key={s.id} 
                    className={cn(
                      "flex items-center justify-between p-4 rounded-2xl border transition-all cursor-pointer group",
                      s.checked ? "bg-blue-50 border-blue-200" : "border-slate-100 hover:bg-slate-50"
                    )}
                  >
                    <div className="flex items-center gap-3">
                      <div className={cn(
                        "w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all",
                        s.checked ? "bg-blue-600 border-blue-600 text-white" : "border-slate-200 bg-white"
                      )}>
                        {s.checked && <CheckCircle2 size={14} />}
                      </div>
                      <span className={cn("font-medium text-sm transition-colors", s.checked ? "text-blue-700" : "text-slate-600")}>
                        {s.label}
                      </span>
                    </div>
                    <input 
                      type="checkbox" 
                      className="hidden" 
                      onChange={() => toggleSymptom(s.id)}
                    />
                  </label>
                ))}
              </div>
            </div>

            <div>
              <div className="flex items-center gap-2 mb-6">
                <div className="w-8 h-8 bg-amber-100 rounded-lg flex items-center justify-center text-amber-600">
                  <FileText size={18} />
                </div>
                <h3 className="font-bold text-slate-800">{t('observations')}</h3>
              </div>
              <div className="relative group">
                <textarea 
                  className="w-full h-[280px] p-6 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:bg-white transition-all text-sm leading-relaxed text-slate-700"
                  placeholder={t('describeSymptoms')}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                ></textarea>
                
                <div className="absolute top-4 right-4 flex flex-col gap-2">
                  <button 
                    onClick={toggleRecording}
                    className={cn(
                      "w-12 h-12 rounded-xl border flex flex-col items-center justify-center transition-all shadow-sm",
                      isRecording ? "bg-red-50 text-red-600 border-red-200" : "bg-white text-slate-500 border-slate-100 hover:text-blue-600 hover:shadow-md"
                    )}
                  >
                    {isRecording ? <MicOff size={20} /> : <Mic size={20} />}
                  </button>
                  {isRecording && (
                    <div className="flex gap-1 justify-center h-4 items-center">
                      {[...Array(5)].map((_, i) => (
                        <motion.div
                          key={i}
                          animate={{ height: [4, voiceLevel * (i % 2 === 0 ? 0.8 : 0.4), 4] }}
                          transition={{ repeat: Infinity, duration: 0.5, delay: i * 0.1 }}
                          className="w-1 bg-red-400 rounded-full"
                        />
                      ))}
                    </div>
                  )}
                </div>
              </div>
              <div className="mt-4 flex items-center gap-2 text-[10px] text-slate-400 uppercase font-bold tracking-widest bg-slate-50 p-3 rounded-xl border border-slate-100">
                <Info size={14} /> {t('clinicalNotes')}
              </div>
            </div>
          </div>

          <div className="mt-12 pt-10 border-t border-slate-100 flex items-center justify-end">
            <button 
              onClick={() => onComplete(symptoms.filter(s => s.checked).map(s => s.label), description)}
              className="px-10 py-4 bg-blue-600 text-white font-bold rounded-2xl shadow-xl shadow-blue-100 hover:bg-blue-700 active:scale-95 transition-all flex items-center gap-2"
            >
              {t('cognitiveTest')} <ChevronRight size={18} />
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

const ProcessingPage = ({ onStepComplete }: { onStepComplete: () => void }) => {
  const { t } = useContext(AppContext);
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState('Initializing neurological core...');

  useEffect(() => {
    const statuses = [
      'Normalizing MRI metadata...',
      'Segmenting neural tissue partitions...',
      'Mapping volumetric anomalies...',
      'Analyzing structural pathology...',
      'Correlating patient symptoms...',
      'Validating with clinical guidelines...',
      'Finalizing pathology report...'
    ];

    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(onStepComplete, 1200);
          return 100;
        }
        const statusIndex = Math.floor((prev / 100) * statuses.length);
        if (statuses[statusIndex]) setStatus(statuses[statusIndex]);
        return prev + Math.random() * 2.5;
      });
    }, 100);

    return () => clearInterval(interval);
  }, [onStepComplete]);

  return (
    <div className="fixed inset-0 z-[60] bg-white flex flex-col items-center justify-center px-6">
      <div className="relative w-64 h-64 mb-16 flex items-center justify-center">
        {/* Simple, clean clinical circles */}
        <div className="absolute inset-0 border-2 border-slate-50 rounded-[48px]"></div>
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0 border-2 border-blue-500 border-t-transparent border-r-transparent rounded-[48px]"
        ></motion.div>
        
        <div className="relative z-10 text-blue-600">
          <Brain size={80} className="opacity-80" />
        </div>

        {/* Subtle scanning line */}
        <motion.div 
          animate={{ top: ['15%', '85%', '15%'] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
          className="absolute left-10 right-10 h-px bg-blue-400/30 z-20"
        ></motion.div>
      </div>

      <div className="max-w-md w-full text-center">
        <h2 className="text-2xl font-bold text-slate-900 mb-2 font-display">{t('pathologyAnalysis')}</h2>
        <p className="text-slate-500 mb-12 text-sm font-medium h-5">{status}</p>
        
        <div className="relative pt-1">
          <div className="overflow-hidden h-2 mb-4 text-xs flex rounded-full bg-slate-100">
            <motion.div 
              style={{ width: `${progress}%` }}
              className="flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-600 transition-all duration-300"
            ></motion.div>
          </div>
          <div className="flex items-center justify-between text-[10px] font-bold text-slate-400 uppercase tracking-widest">
            <span>{t('progressStatus')}</span>
            <span className="text-blue-600">{Math.round(progress)}%</span>
          </div>
        </div>
      </div>

      <div className="mt-16 flex gap-4">
        {['SEGMENTATION', 'CLASSIFICATION', 'VALIDATION'].map((module, i) => (
          <div key={module} className="flex items-center gap-2 px-4 py-2 bg-slate-50 rounded-xl border border-slate-100">
            <div className={cn(
              "w-2 h-2 rounded-full",
              progress > (i + 1) * 30 ? "bg-emerald-500" : "bg-slate-300"
            )}></div>
            <span className="text-[9px] font-bold text-slate-500 tracking-wider uppercase">{module}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

const ResultsPage = ({ diagnosis, cognitiveData, setPage }: { diagnosis: Disorder, cognitiveData: { score: number }, setPage: (p: Page) => void }) => {
  const { t } = useContext(AppContext);
  const [activeTab, setActiveTab] = useState<'PREDICTION' | 'EXPLAINABILITY' | 'PATTERNS' | 'RECOMMENDATIONS'>('PREDICTION');
  const data = [
    { name: diagnosis.title, score: 94 },
    { name: 'Meningioma', score: 12 },
    { name: 'Stroke', score: 5 },
    { name: 'Healthy', score: 2 },
  ];

  const timeline = [
    { step: 'Visual Processing', desc: `Analyzed MRI features consistent with ${diagnosis.title} morphology.`, status: 'COMPLETED' },
    { step: 'Symbolic Mapping', desc: `Internal knowledge base resolves patterns to ${diagnosis.title}.`, status: 'COMPLETED' },
    { step: 'Clinical Correlation', desc: `Symptom history matches expected neurological deficits.`, status: 'COMPLETED' },
    { step: 'Decision Synthesis', desc: `Diagnostic certainty calculated based on multi-modal inputs.`, status: 'COMPLETED' },
  ];

  return (
    <div className="pt-28 pb-20 px-6 min-h-screen bg-slate-50/50">
      <div className="max-w-7xl mx-auto">
        {/* Print-Only Clinical Header */}
        <div className="hidden print:flex flex-col mb-12 border-b-2 border-slate-900 pb-8">
           <div className="flex justify-between items-end mb-8">
              <div>
                 <div className="text-3xl font-bold text-slate-900 mb-2">NEUROXPLAIN AI</div>
                 <div className="text-xs font-bold text-slate-500 uppercase tracking-widest">Clinical Diagnostic Intelligence Report</div>
              </div>
              <div className="text-right">
                 <div className="text-sm font-bold text-slate-900">CASE ID: NX-9428-SECURE</div>
                 <div className="text-xs text-slate-500">{new Date().toLocaleDateString()} | {new Date().toLocaleTimeString()}</div>
              </div>
           </div>
           <div className="grid grid-cols-3 gap-8">
              <div>
                 <div className="text-[10px] font-bold text-slate-400 uppercase mb-1">Facility</div>
                 <div className="text-sm font-bold">Autonomous Diagnostic Unit-04</div>
              </div>
              <div>
                 <div className="text-[10px] font-bold text-slate-400 uppercase mb-1">Status</div>
                 <div className="text-sm font-bold text-emerald-600">Clinically Verified</div>
              </div>
              <div>
                 <div className="text-[10px] font-bold text-slate-400 uppercase mb-1">Signature</div>
                 <div className="text-sm font-bold italic">Generated by Neuro-Symbolic Core</div>
              </div>
           </div>
        </div>

        {/* UI Header */}
        <div className="flex flex-col md:flex-row items-start justify-between gap-8 mb-12 print:hidden">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="px-4 py-1.5 bg-emerald-50 text-emerald-600 text-[10px] font-bold rounded-full uppercase tracking-[0.2em] border border-emerald-100 flex items-center gap-2">
                 <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></div>
                 Analysis Finalized
              </span>
              <span className="text-slate-400 text-xs font-mono uppercase tracking-tighter">Trace ID: NX-9428-SECURE</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 font-display tracking-tight">{t('neuralPathologyReport')}</h1>
          </div>
          <div className="flex gap-4 w-full md:w-auto">
            <button 
               onClick={() => {
                  const btn = document.getElementById('pdf-btn');
                  if (btn) {
                     btn.innerText = 'Generating Analysis...';
                     setTimeout(() => {
                        btn.innerText = 'Analysis Ready';
                        setTimeout(() => window.print(), 500);
                     }, 1500);
                  }
               }}
               id="pdf-btn"
               className="flex-1 md:flex-none px-8 py-4 bg-white text-slate-900 font-bold border border-slate-200 rounded-[24px] hover:bg-slate-50 transition-all shadow-xl shadow-slate-100 flex items-center justify-center gap-3"
            >
              <Download size={20} /> {t('exportAnalysis')}
            </button>
            <button 
              onClick={() => setPage('HOME')}
              className="flex-1 md:flex-none px-8 py-4 bg-blue-600 text-white font-bold rounded-[24px] hover:bg-blue-700 transition-all shadow-2xl shadow-blue-200 active:scale-95 flex items-center justify-center gap-3"
            >
              <ArrowLeft size={20} /> {t('newScan')}
            </button>
          </div>
        </div>

        {/* Dashboard Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-10">
          
          {/* LEFT: Viewer & Tabs */}
          <div className="lg:col-span-8 space-y-6 md:space-y-8">
            <div className="bg-white p-2 rounded-[32px] md:rounded-[40px] shadow-xl border border-slate-100 flex overflow-x-auto no-scrollbar gap-2 sticky top-24 z-20 backdrop-blur-xl bg-white/90">
              {[
                { id: 'PREDICTION', label: t('analysisTab'), icon: ShieldCheck },
                { id: 'EXPLAINABILITY', label: t('logicTrace'), icon: Info },
                { id: 'PATTERNS', label: t('patternsTab'), icon: Microscope },
                { id: 'RECOMMENDATIONS', label: t('clinicalTab'), icon: Stethoscope }
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={cn(
                    "flex-1 min-w-[120px] shrink-0 py-4 px-4 rounded-[24px] md:rounded-[32px] text-[11px] md:text-xs font-bold transition-all flex items-center justify-center gap-3 relative overflow-hidden",
                    activeTab === tab.id 
                    ? "text-white" 
                    : "text-slate-400 hover:text-slate-600 hover:bg-slate-50"
                  )}
                >
                  {activeTab === tab.id && (
                     <motion.div 
                        layoutId="active-tab-bg" 
                        className="absolute inset-0 bg-slate-900 rounded-[24px] md:rounded-[32px] z-0"
                     />
                  )}
                  <tab.icon size={16} className={cn("relative z-10", activeTab === tab.id ? "text-blue-400" : "text-slate-400")} /> 
                  <span className="relative z-10">{tab.label}</span>
                </button>
              ))}
            </div>

            <AnimatePresence mode="wait">
              {activeTab === 'PREDICTION' && (
                <motion.div 
                  key="prediction"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="grid grid-cols-1 md:grid-cols-2 gap-8"
                >
                  <div className="bg-white p-8 rounded-[40px] border border-slate-100 shadow-sm relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
                      <Brain size={120} />
                    </div>
                    <div className="relative z-10">
                      <div className="text-[10px] font-bold text-blue-600 uppercase tracking-widest mb-6">Autonomous MRI Analysis (Grad-CAM)</div>
                      <div className="relative aspect-square rounded-[36px] overflow-hidden mb-8 border border-slate-100 shadow-inner group bg-black">
                        <img 
                          src="https://images.unsplash.com/photo-1559757148-5c350d0a3c56?auto=format&fit=crop&q=80&w=800" 
                          alt="Clinical MRI Scan" 
                          className="w-full h-full object-contain opacity-90"
                        />
                        {/* Clinical Grad-CAM Circle Overlay */}
                        <div className="absolute inset-0 pointer-events-none">
                           <svg className="w-full h-full" viewBox="0 0 100 100">
                              <motion.circle 
                                 cx="45" cy="35" r="12" 
                                 fill="none"
                                 stroke="#ef4444"
                                 strokeWidth="1.5"
                                 strokeDasharray="4 2"
                                 initial={{ opacity: 0, scale: 0.8 }}
                                 animate={{ 
                                    opacity: [0.4, 0.8, 0.4],
                                    scale: [1, 1.05, 1]
                                 }}
                                 transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                              />
                              <motion.circle 
                                 cx="45" cy="35" r="8" 
                                 fill="#ef4444"
                                 className="opacity-20"
                                 animate={{ 
                                    opacity: [0.1, 0.3, 0.1]
                                 }}
                                 transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                              />
                           </svg>
                        </div>

                        <div className="absolute top-5 left-5 px-4 py-2 bg-slate-900/80 backdrop-blur-md rounded-2xl text-[10px] font-bold text-white uppercase tracking-widest border border-white/20">
                           Primary Lesion Focus
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-5">
                        <div className="p-5 bg-slate-50 rounded-3xl border border-slate-100 flex flex-col gap-1">
                          <div className="text-[9px] font-bold text-slate-400 uppercase tracking-[0.1em]">Tissue Density</div>
                          <div className="text-base font-bold text-slate-900">Hyper-intense +4.2</div>
                        </div>
                        <div className="p-5 bg-slate-50 rounded-3xl border border-slate-100 flex flex-col gap-1">
                          <div className="text-[9px] font-bold text-slate-400 uppercase tracking-[0.1em]">Morphology</div>
                          <div className="text-base font-bold text-slate-900">Irregular Focal</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-8">
                    <div className="bg-white p-8 rounded-[40px] border border-slate-100 shadow-sm">
                      <div className="text-[10px] font-bold text-blue-600 uppercase tracking-widest mb-6">Diagnostic Primary</div>
                      <h2 className="text-3xl font-bold text-slate-900 mb-2 font-display">{diagnosis.title}</h2>
                      <p className="text-sm text-slate-500 font-light leading-relaxed mb-8">{diagnosis.description}</p>
                      
                      <div className="space-y-4">
                        {data.map(item => (
                          <div key={item.name} className="space-y-2">
                            <div className="flex justify-between items-end">
                              <span className="text-xs font-bold text-slate-700">{item.name}</span>
                              <span className={cn("text-xs font-bold", item.score > 50 ? "text-blue-600" : "text-slate-400")}>{item.score}%</span>
                            </div>
                            <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                              <motion.div 
                                initial={{ width: 0 }}
                                animate={{ width: `${item.score}%` }}
                                className={cn("h-full transition-all", item.score > 50 ? "bg-blue-600" : "bg-slate-300")}
                              ></motion.div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="bg-emerald-50 p-6 rounded-[32px] border border-emerald-100 flex items-center gap-5">
                      <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-emerald-600 shadow-sm shrink-0">
                        <CheckCircle2 size={32} />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-emerald-800 mb-1 tracking-tight">Neural Confidence: Extreme</div>
                        <p className="text-xs text-emerald-600/80 leading-snug">The pattern match exceeds clinical threshold for primary neurological intervention.</p>
                      </div>
                    </div>

                    <div className="bg-white p-8 rounded-[40px] border border-slate-100 shadow-sm relative overflow-hidden">
                       <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-6">Comparative Classification Grid</h3>
                       <div className="grid grid-cols-2 gap-4">
                          {[
                             { id: 1, label: 'Glioma', match: true, img: 'https://images.unsplash.com/photo-1559757175-5700dde675bc?auto=format&fit=crop&q=80&w=200' },
                             { id: 2, label: 'Pituitary', match: true, img: 'https://images.unsplash.com/photo-1582719471384-894fbb16e074?auto=format&fit=crop&q=80&w=200' },
                             { id: 3, label: 'Meningioma', match: false, img: 'https://images.unsplash.com/photo-1551076805-e1869033e561?auto=format&fit=crop&q=80&w=200' },
                             { id: 4, label: 'Healthy', match: true, img: 'https://images.unsplash.com/photo-1559757148-5c350d0a3c56?auto=format&fit=crop&q=80&w=200' },
                          ].map((item) => (
                             <div key={item.id} className="space-y-2">
                                <div className={cn("text-[8px] font-bold uppercase text-center", item.match ? "text-emerald-600" : "text-red-500")}>
                                   True: {item.label} / Pred: {item.id === 3 ? 'Glioma' : item.label}
                                </div>
                                <div className="aspect-square rounded-2xl overflow-hidden border border-slate-100 bg-black">
                                   <img src={item.img} alt={item.label} className="w-full h-full object-cover opacity-80" />
                                </div>
                             </div>
                          ))}
                       </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === 'EXPLAINABILITY' && (
                <motion.div 
                  key="explain"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="space-y-8"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="bg-white p-8 rounded-[40px] border border-slate-100 shadow-sm">
                      <div className="text-[10px] font-bold text-blue-600 uppercase tracking-widest mb-6">Autonomous Visual Attention (Grad-CAM)</div>
                      <div className="relative aspect-[4/3] rounded-3xl overflow-hidden mb-6 border border-slate-100 bg-slate-950 flex items-center justify-center group">
                        <img 
                          src="https://images.unsplash.com/photo-1559757175-5700dde675bc?auto=format&fit=crop&q=80&w=800" 
                          alt="MRI Base" 
                          className="w-full h-full object-cover opacity-60 grayscale scale-110"
                        />
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_40%_40%,rgba(255,0,0,0.4)_0%,rgba(255,255,0,0.2)_30%,transparent_60%)] mix-blend-screen animate-pulse"></div>
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_40%_40%,rgba(255,255,255,0.1)_0%,transparent_20%)] animate-ping"></div>
                        
                        {/* Interactive Markers */}
                        <div className="absolute top-[40%] left-[40%] -translate-x-1/2 -translate-y-1/2">
                          <div className="relative">
                            <div className="w-4 h-4 bg-red-500 rounded-full animate-ping"></div>
                            <div className="w-8 h-8 border border-white/40 rounded-full absolute -top-2 -left-2 animate-spin-slow"></div>
                            <div className="absolute top-full left-full ml-2 mt-2 bg-slate-900/90 backdrop-blur-md text-white px-3 py-1.5 rounded-lg text-[9px] font-bold whitespace-nowrap shadow-2xl border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity">
                              Primary Activation: {diagnosis.title} Morphology
                            </div>
                          </div>
                        </div>

                        <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center bg-slate-900/40 backdrop-blur-md px-4 py-2 rounded-xl border border-white/5">
                          <span className="text-[8px] font-bold text-white/60 uppercase tracking-tighter">Feature Map v4.2</span>
                          <div className="flex gap-1">
                            <div className="w-2 h-2 rounded-full bg-red-500"></div>
                            <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                            <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                          </div>
                        </div>
                      </div>
                      <div className="space-y-4">
                        <div className="p-4 bg-blue-50/50 rounded-2xl border border-blue-100/50">
                          <p className="text-[11px] text-blue-700 leading-relaxed italic">
                            Heatmap indicates high-confidence abnormal density in the {diagnosis.id === 'alzheimers' ? 'hippocampal region' : 'cortical layers'}. The model weights focus heavily on irregular boundary patterns.
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-white p-8 rounded-[40px] border border-slate-100 shadow-sm flex flex-col">
                      <div className="text-[10px] font-bold text-blue-600 uppercase tracking-widest mb-8 text-center">Neuro-Symbolic Logic Trace</div>
                      <div className="space-y-10 relative flex-1">
                        <div className="absolute top-0 bottom-0 left-[23px] w-[2px] bg-slate-100"></div>
                        {timeline.map((item, i) => (
                          <motion.div 
                            key={i}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className="flex gap-6 relative z-10"
                          >
                            <div className="w-12 h-12 bg-white border-2 border-blue-500 text-blue-600 rounded-2xl flex items-center justify-center font-bold shadow-lg shadow-blue-50 shrink-0">
                              {i + 1}
                            </div>
                            <div className="pt-1">
                              <h4 className="text-sm font-bold text-slate-800 mb-1">{item.step}</h4>
                              <p className="text-[11px] text-slate-400 font-medium leading-relaxed">{item.desc}</p>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-10 bg-slate-900 rounded-[48px] text-white relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-12 opacity-10 group-hover:opacity-20 transition-all duration-700">
                      <Zap size={100} className="text-blue-400" />
                    </div>
                    <div className="relative z-10 max-w-2xl">
                      <div className="flex items-center gap-3 mb-6">
                        <div className="w-10 h-10 bg-blue-500/20 rounded-xl flex items-center justify-center text-blue-400">
                          <Cpu size={20} />
                        </div>
                        <h4 className="text-[10px] font-bold text-blue-400 uppercase tracking-[0.3em]">Decision Inference Engine</h4>
                      </div>
                      <div className="space-y-4">
                        <p className="text-lg font-light text-slate-200 leading-relaxed italic">
                          "Logical consistency check PASSED. Multi-modal correlation confirms {diagnosis.title} as the global optimum classification. Symbolic reasoning overrides visual noise by anchoring on validated patient symptoms."
                        </p>
                        <div className="flex gap-6 pt-4 border-t border-white/10">
                          <div>
                            <div className="text-[9px] font-bold text-slate-500 uppercase tracking-widest mb-1">Inference Time</div>
                            <div className="text-xl font-bold font-mono">1.2ms</div>
                          </div>
                          <div>
                            <div className="text-[9px] font-bold text-slate-500 uppercase tracking-widest mb-1">Rule Triggers</div>
                            <div className="text-xl font-bold font-mono">14 Detected</div>
                          </div>
                          <div>
                            <div className="text-[9px] font-bold text-slate-500 uppercase tracking-widest mb-1">Entropy</div>
                            <div className="text-xl font-bold font-mono text-emerald-400">0.042</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === 'PATTERNS' && (
                <motion.div 
                   key="patterns"
                   initial={{ opacity: 0 }}
                   animate={{ opacity: 1 }}
                   className="grid grid-cols-1 md:grid-cols-2 gap-8"
                >
                  <div className="space-y-8">
                    <div className="bg-white p-8 rounded-[40px] border border-slate-100 shadow-sm">
                      <div className="text-[10px] font-bold text-blue-600 uppercase tracking-widest mb-8 text-center">Symptom Correlation Matrix</div>
                      <div className="h-64">
                        <ResponsiveContainer width="100%" height="100%">
                          <LineChart data={diagnosis.symptoms.map((s, i) => ({
                            name: s,
                            val: 70 + Math.floor(Math.random() * 25)
                          }))}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                            <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 9, fill: '#94a3b8' }} />
                            <YAxis hide />
                            <Tooltip 
                              contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)', fontSize: '10px', fontWeight: 'bold' }}
                            />
                            <Line type="monotone" dataKey="val" stroke="#2563eb" strokeWidth={3} dot={{ fill: '#2563eb', strokeWidth: 2, r: 4, stroke: '#fff' }} />
                          </LineChart>
                        </ResponsiveContainer>
                      </div>
                    </div>

                    <div className="bg-slate-900 p-8 rounded-[40px] text-white overflow-hidden relative group">
                      <div className="absolute top-0 right-0 p-8 opacity-20">
                        <Activity size={80} />
                      </div>
                      <div className="relative z-10">
                        <div className="text-[10px] font-bold text-blue-400 uppercase tracking-widest mb-6">Cognitive State Signature</div>
                        <div className="grid grid-cols-2 gap-6">
                          <div>
                            <div className="text-3xl font-bold mb-1">124ms</div>
                            <div className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">Processing Latency</div>
                          </div>
                          <div>
                            <div className="text-3xl font-bold mb-1 text-emerald-400">{cognitiveData.score > 0 ? '98.2%' : '14.5%'}</div>
                            <div className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">Recall Accuracy</div>
                          </div>
                        </div>
                        <div className="mt-8 pt-6 border-t border-white/5">
                          <p className="text-[11px] text-slate-400 leading-relaxed">
                            Cognitive test results indicate focal processing delays in the parietal regions, aligning with localized MRI findings.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white p-8 rounded-[40px] border border-slate-100 shadow-sm">
                    <div className="text-[10px] font-bold text-blue-600 uppercase tracking-widest mb-8 text-center">Historical Case Match</div>
                    <div className="space-y-4">
                      {[
                        { id: 'REC-394', match: '96%', tag: 'Anaplastic Astrocytoma' },
                        { id: 'REC-210', match: '88%', tag: 'Glioblastoma' },
                        { id: 'REC-055', match: '82%', tag: 'Low Grade Glioma' },
                      ].map(match => (
                        <div key={match.id} className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-slate-400">
                              <FileText size={18} />
                            </div>
                            <div>
                              <div className="text-xs font-bold text-slate-800">{match.tag}</div>
                              <div className="text-[10px] text-slate-400">Archived ID: {match.id}</div>
                            </div>
                          </div>
                          <div className="text-sm font-bold text-blue-600">{match.match} Match</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === 'EXPLAINABILITY' && (
                <motion.div 
                  key="explain"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="space-y-8"
                >
                  <div className="bg-blue-600 p-10 rounded-[48px] text-white relative overflow-hidden shadow-2xl shadow-blue-100">
                     <div className="absolute top-0 right-0 p-10 opacity-10">
                        <Zap size={120} />
                     </div>
                     <h3 className="text-2xl font-bold mb-8 font-display">Diagnostic Process Summary</h3>
                     <div className="space-y-8 relative z-10">
                        {timeline.map((item, i) => (
                           <div key={i} className="flex gap-6 relative">
                              {i !== timeline.length - 1 && (
                                 <div className="absolute left-4 top-10 bottom-0 w-px bg-white/20"></div>
                              )}
                              <div className="w-8 h-8 bg-white text-blue-600 rounded-xl flex items-center justify-center shrink-0 shadow-lg shadow-white/20 text-[10px] font-bold">
                                 0{i+1}
                              </div>
                              <div className="pb-4">
                                 <h4 className="font-bold text-blue-100 mb-2 uppercase tracking-widest text-[10px]">{item.step}</h4>
                                 <p className="text-sm text-white/90 font-light leading-relaxed">{item.desc}</p>
                              </div>
                           </div>
                        ))}
                     </div>
                  </div>

                  <div className="bg-white p-10 rounded-[48px] border border-slate-100 shadow-sm">
                     <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-6">Symbolic Reasoning Trace</h4>
                     <div className="space-y-4">
                        <div className="p-6 bg-slate-50 rounded-3xl font-mono text-[11px] text-slate-500 leading-relaxed">
                           <div className="text-blue-600 mb-2"># Clinical Rule Activation</div>
                           IF (focal_anomaly == TRUE && saccadic_latency &gt; 120ms) &#123;<br/>
                           &nbsp;&nbsp;THEN probability[pathology] += 0.85;<br/>
                           &nbsp;&nbsp;EXPLAIN("Correlation between visual defect and motor response latency.");<br/>
                           &#125;
                        </div>
                        <div className="p-6 bg-slate-50 rounded-3xl font-mono text-[11px] text-slate-500 leading-relaxed">
                           <div className="text-emerald-600 mb-2"># Symptom Matching</div>
                           SYMPTOM_MAP(patient_symptoms, disorder_priors) =&gt; 92% Alignment;<br/>
                           CONFIDENCE_SCORE = calculate_certainty(vision_output, symbolic_output);
                        </div>
                     </div>
                  </div>
                </motion.div>
              )}

              {activeTab === 'PATTERNS' && (
                <motion.div 
                  key="patterns"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="space-y-8"
                >
                  <div className="bg-white p-10 rounded-[48px] border border-slate-100 shadow-sm">
                     <h3 className="text-2xl font-bold mb-8 font-display">Neural Pattern Matching</h3>
                     <p className="text-slate-500 mb-10 font-light">Cross-referencing current MRI features with historical clinical archives for the highest diagnostic accuracy.</p>
                     
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      {[
                        { id: 'NX-9428', tag: 'Primary Focus', match: '94%', color: 'bg-blue-600' },
                        { id: 'NX-1102', tag: 'Structural Variant', match: '12%', color: 'bg-slate-400' },
                      ].map((match) => (
                        <div key={match.id} className="p-8 bg-slate-50 rounded-[32px] border border-slate-100 group hover:border-blue-200 transition-all">
                          <div className="flex items-center justify-between mb-8">
                            <div className="flex items-center gap-4">
                              <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center text-white", match.color)}>
                                <FileText size={22} />
                              </div>
                              <div>
                                <div className="text-sm font-bold text-slate-800">{match.tag}</div>
                                <div className="text-[10px] text-slate-400 font-mono">Archived ID: {match.id}</div>
                              </div>
                            </div>
                            <div className="text-2xl font-bold text-blue-600 font-mono">{match.match}</div>
                          </div>
                          <div className="h-1.5 w-full bg-slate-200 rounded-full overflow-hidden">
                             <motion.div 
                                initial={{ width: 0 }}
                                animate={{ width: match.match }}
                                transition={{ duration: 1.5, ease: "easeOut" }}
                                className={cn("h-full", match.color)}
                             />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === 'RECOMMENDATIONS' && (
                <motion.div 
                  key="recs"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="space-y-8"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                     {[
                       { title: 'Clinical Treatment Pathway', items: diagnosis.treatment || ['Consultation Required'], icon: Stethoscope, color: 'text-blue-600', bg: 'bg-blue-50/50' },
                       { title: 'Urgent Precautions', items: ['Safety assessment for focal deficits', 'Medication baseline verification', 'Immediate neuro-consultation'], icon: AlertCircle, color: 'text-red-600', bg: 'bg-red-50/50' }
                     ].map((box, i) => (
                       <div key={i} className={cn("p-10 rounded-[48px] border border-slate-100 shadow-sm", box.bg)}>
                         <div className="flex items-center gap-4 mb-10">
                           <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm">
                              <box.icon className={box.color} size={24} />
                           </div>
                           <h4 className="text-xl font-bold text-slate-900">{box.title}</h4>
                         </div>
                         <ul className="space-y-6">
                           {box.items.map((item, j) => (
                             <li key={j} className="flex items-start gap-5">
                               <div className="w-8 h-8 bg-white border border-slate-100 text-slate-400 rounded-xl flex items-center justify-center text-xs font-bold shrink-0">{j + 1}</div>
                               <span className="text-sm text-slate-600 font-light leading-relaxed">{item}</span>
                             </li>
                           ))}
                         </ul>
                       </div>
                     ))}
                  </div>
                  
                  <div className="bg-blue-600 p-10 rounded-[48px] text-white flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl shadow-blue-100">
                     <div>
                        <h4 className="text-xl font-bold mb-2">{t('expertConsult')}</h4>
                        <p className="text-blue-100 text-sm font-light">{t('expertConsultDesc')}</p>
                     </div>
                     <button className="px-10 py-5 bg-white text-blue-600 font-bold rounded-2xl hover:bg-blue-50 transition-all shadow-xl whitespace-nowrap active:scale-95">
                        {t('scheduleConsultation')}
                     </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* RIGHT: Stats & Insights */}
          <div className="lg:col-span-4 space-y-8">
            <div className="bg-slate-900 p-10 rounded-[48px] text-white shadow-2xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/20 blur-3xl rounded-full"></div>
              <div className="relative z-10 text-center">
                <div className="text-[10px] font-bold text-blue-400 uppercase tracking-[0.2em] mb-12">System Risk Score</div>
                
                {/* Radial gauge proxy */}
                <div className="relative w-36 h-36 md:w-48 md:h-48 mx-auto mb-10 flex items-center justify-center">
                  <svg className="w-full h-full transform -rotate-90">
                    <circle cx="96" cy="96" r="88" stroke="currentColor" strokeWidth="12" fill="transparent" className="text-white/5" />
                    <motion.circle 
                      cx="96" cy="96" r="88" stroke="currentColor" strokeWidth="12" fill="transparent" 
                      strokeDasharray={552.92}
                      initial={{ strokeDashoffset: 552.92 }}
                      animate={{ strokeDashoffset: 552.92 * (1 - 0.942) }}
                      transition={{ duration: 2, ease: "easeOut" }}
                      className="text-blue-500" 
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center pt-2">
                    <div className="text-4xl md:text-5xl font-bold tracking-tight">94<span className="text-blue-500 font-light">.2</span></div>
                    <div className="text-[9px] md:text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Percentile</div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="text-lg font-bold">High Risk Indicated</div>
                  <p className="text-xs text-slate-400 font-light px-4">The identified pattern matches 94.2% of high-grade glial neoplasm records.</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-8 rounded-[40px] border border-slate-100 shadow-sm space-y-8">
               <div>
                  <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-6">Autonomous Insights</h4>
                  <div className="space-y-4">
                    {[
                      { msg: 'Abnormal mass in parietal lobe', type: 'EYE' },
                      { msg: 'Strong correlation with seizures', type: 'LINK' },
                      { msg: 'Vascular displacement detected', type: 'ZAP' },
                    ].map((m, i) => (
                      <div key={i} className="p-4 bg-slate-50 border border-slate-100 rounded-2xl flex items-center gap-4 group hover:bg-blue-50 transition-colors">
                        <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                        <span className="text-xs text-slate-600 font-medium">{m.msg}</span>
                      </div>
                    ))}
                  </div>
               </div>
               
               <div className="pt-8 border-t border-slate-50">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-slate-800">Processing Time</span>
                    <span className="text-xs text-blue-600 font-bold">128ms</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-800">Verified Tokens</span>
                    <span className="text-xs text-blue-600 font-bold">8,429</span>
                  </div>
               </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const HistoryPage = () => {
  const { t } = useContext(AppContext);
  const reports = [
    { id: 'NX-9428-B', date: 'Oct 24, 2024', name: 'Axial Brain MRI', status: 'High Risk', diagnosis: 'Glioma Type II', confidence: '94.2%' },
    { id: 'NX-8112-A', date: 'Sep 12, 2024', name: 'Cranial Scan', status: 'Healthy', diagnosis: 'Normal Anatomy', confidence: '99.1%' },
    { id: 'NX-7734-C', date: 'Aug 05, 2024', name: 'Brain MR Spect.', status: 'Medium Risk', diagnosis: 'Multiple Sclerosis', confidence: '87.5%' },
    { id: 'NX-6521-D', date: 'Jul 20, 2024', name: 'Axial T2 MRI', status: 'Low Risk', diagnosis: 'Arteriovenous Malf.', confidence: '92.3%' },
  ];

  return (
    <div className="pt-24 md:pt-32 pb-20 px-4 md:px-6 min-h-screen bg-slate-50">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 md:mb-12 gap-6">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-slate-900 mb-2">{t('analysisHistory')}</h1>
            <p className="text-sm md:text-base text-slate-500">{t('analysisHistoryDesc')}</p>
          </div>
          <div className="relative group w-full md:w-auto">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors" size={18} />
            <input 
              type="text" 
              placeholder={t('searchPlaceholder')}
              className="pl-12 pr-6 py-3 bg-white border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-sm w-full md:w-[320px]"
            />
          </div>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-[24px] md:rounded-[32px] border border-slate-100 shadow-xl shadow-slate-200/40 overflow-hidden"
        >
          <div className="overflow-x-auto no-scrollbar">
            <table className="w-full text-left border-collapse min-w-[800px] md:min-w-0">
              <thead>
                <tr className="bg-slate-50 border-bottom border-slate-100">
                  <th className="px-8 py-5 text-[10px] font-bold text-slate-400 uppercase tracking-widest">{t('reportId')}</th>
                  <th className="px-8 py-5 text-[10px] font-bold text-slate-400 uppercase tracking-widest">{t('scanDetails')}</th>
                  <th className="px-8 py-5 text-[10px] font-bold text-slate-400 uppercase tracking-widest">{t('date')}</th>
                  <th className="px-8 py-5 text-[10px] font-bold text-slate-400 uppercase tracking-widest">{t('diagnosis')}</th>
                  <th className="px-8 py-5 text-[10px] font-bold text-slate-400 uppercase tracking-widest">{t('confidence')}</th>
                  <th className="px-8 py-5 text-[10px] font-bold text-slate-400 uppercase tracking-widest text-right">{t('actions')}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {reports.map((report, i) => (
                  <tr key={i} className="hover:bg-slate-50/80 transition-colors group">
                    <td className="px-8 py-6">
                      <span className="text-sm font-bold text-slate-800">{report.id}</span>
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center">
                          <FileText size={18} />
                        </div>
                        <span className="text-sm font-semibold text-slate-700">{report.name}</span>
                      </div>
                    </td>
                    <td className="px-8 py-6 text-sm text-slate-500">{report.date}</td>
                    <td className="px-8 py-6">
                      <div className="space-y-1 min-w-[140px]">
                        <div className="text-sm font-bold text-slate-800 whitespace-nowrap">{report.diagnosis}</div>
                        <div className={cn(
                          "text-[9px] font-bold uppercase px-2 py-0.5 rounded-md inline-block whitespace-nowrap",
                          report.status === 'High Risk' ? "bg-red-50 text-red-600" :
                          report.status === 'Medium Risk' ? "bg-amber-50 text-amber-600" :
                          report.status === 'Low Risk' ? "bg-blue-50 text-blue-600" :
                          "bg-emerald-50 text-emerald-600"
                        )}>
                          {report.status}
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-6 text-sm font-bold text-blue-600">{report.confidence}</td>
                    <td className="px-8 py-6 text-right">
                      <button className="p-2 text-slate-400 hover:text-blue-600 transition-colors">
                        <Download size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="p-6 md:p-10 bg-slate-50/50 border-t border-slate-100 flex items-center justify-center">
            <button className="text-sm font-bold text-blue-600 hover:underline">{t('viewAllReports')}</button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

// --- Main App ---

export default function App() {
  const [page, setPage] = useState<Page>('HOME');
  const [language, setLanguage] = useState<Language>('en');

  const t = (key: keyof typeof TRANSLATIONS.en) => {
    return TRANSLATIONS[language][key] || TRANSLATIONS.en[key];
  };

  const [data, setData] = useState({
    file: null as any,
    symptoms: [] as string[],
    desc: '',
    cognitiveScore: 0
  });

  const diagnosis = useMemo(() => {
    // Intelligent heuristic based on symptoms and cognitive performance
    const hasHighRiskSymptoms = data.symptoms.some(s => ['Seizures', 'Difficulty speaking', 'Numbness/Weakness'].includes(s));
    
    // If a file is uploaded, we want to show different diseases for demo purposes
    if (data.file) {
      // Use filename to deterministicly pick a disease if no specific symptoms match
      const nameHash = data.file.name.split('').reduce((acc: number, char: string) => acc + char.charCodeAt(0), 0);
      const randomDisorder = DISORDERS[nameHash % DISORDERS.length];
      
      if (data.desc.toLowerCase().includes('glioma')) return DISORDERS.find(d => d.id === 'glioma') || randomDisorder;
      if (data.symptoms.includes('Tremors')) return DISORDERS.find(d => d.id === 'parkinsons') || randomDisorder;
      if (data.symptoms.includes('Confusion')) return DISORDERS.find(d => d.id === 'alzheimers') || randomDisorder;
      
      return randomDisorder;
    }

    return DISORDERS[0]; // Default Glioma/First for demo
  }, [data.symptoms, data.desc, data.cognitiveScore, data.file]);

  return (
    <AppContext.Provider value={{ language, setLanguage, theme: 'light', setTheme: () => {}, t }}>
      <div className={cn("min-h-screen font-sans antialiased", language === 'hi' ? 'lang-hi' : 'lang-en')}>
      <style dangerouslySetInnerHTML={{ __html: `
        .lang-hi h1, .lang-hi h2 { 
          line-height: 1.3 !important; 
          letter-spacing: 0 !important;
        }
        @media (max-width: 640px) {
          .lang-hi h1 { font-size: 2.25rem !important; }
          .lang-hi h2 { font-size: 1.875rem !important; }
          .lang-hi .text-5xl, .lang-hi .text-6xl, .lang-hi .text-7xl { font-size: 2.5rem !important; }
        }
      `}} />
      <Navbar currentPage={page} setPage={setPage} />
      
      <main>
        <AnimatePresence mode="wait">
          {page === 'HOME' && (
            <motion.div 
              key="home" 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <HomePage onStart={() => setPage('UPLOAD')} setPage={setPage} />
            </motion.div>
          )}

          {page === 'UPLOAD' && (
            <motion.div 
              key="upload" 
              initial={{ opacity: 0, x: 20 }} 
              animate={{ opacity: 1, x: 0 }} 
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <UploadPage onComplete={(file) => {
                setData(prev => ({ ...prev, file }));
                setPage('SYMPTOMS');
              }} />
            </motion.div>
          )}

          {page === 'SYMPTOMS' && (
            <motion.div 
              key="symptoms" 
              initial={{ opacity: 0, x: 20 }} 
              animate={{ opacity: 1, x: 0 }} 
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <SymptomsPage onComplete={(symps, d) => {
                setData(prev => ({ ...prev, symptoms: symps, desc: d }));
                setPage('COGNITIVE_TEST');
              }} />
            </motion.div>
          )}

          {page === 'COGNITIVE_TEST' && (
            <motion.div 
              key="cognitive" 
              initial={{ opacity: 0, x: 20 }} 
              animate={{ opacity: 1, x: 0 }} 
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <CognitiveTestPage 
                onComplete={(score) => {
                  setData(prev => ({ ...prev, cognitiveScore: score }));
                  setPage('PROCESSING');
                }} 
                onBack={() => setPage('SYMPTOMS')}
              />
            </motion.div>
          )}

          {page === 'PROCESSING' && (
            <motion.div 
              key="processing" 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }}
            >
              <ProcessingPage onStepComplete={() => setPage('RESULTS')} />
            </motion.div>
          )}

          {page === 'RESULTS' && (
            <motion.div 
              key="results" 
              initial={{ opacity: 0, scale: 0.98 }} 
              animate={{ opacity: 1, scale: 1 }} 
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <ResultsPage diagnosis={diagnosis} cognitiveData={{ score: data.cognitiveScore }} setPage={setPage} />
            </motion.div>
          )}

          {page === 'HISTORY' && (
            <motion.div 
              key="history" 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }}
            >
              <HistoryPage />
            </motion.div>
          )}

          {page === 'TEAM' && (
            <motion.div 
              key="team" 
              initial={{ opacity: 0, x: 20 }} 
              animate={{ opacity: 1, x: 0 }} 
              exit={{ opacity: 0, x: -20 }}
            >
              <TeamPage onBack={() => setPage('HOME')} />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {page === 'HOME' && <Footer />}
      </div>
    </AppContext.Provider>
  );
}
