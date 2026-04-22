import { useState, useEffect } from 'react';
import { examCatalog, examQuestionsBank } from '../data/mockData';
import AiCoachWidget from '../components/AiCoachWidget';

export default function ExamSimulation() {
  const [selectedExam, setSelectedExam] = useState(null);
  const [examStarted, setExamStarted] = useState(false);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(0);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const [configuringExam, setConfiguringExam] = useState(null);
  const [selectedQuestionCount, setSelectedQuestionCount] = useState(10);
  const [isTimed, setIsTimed] = useState(true);

  const [activeQuestions, setActiveQuestions] = useState([]);
  const currentQ = activeQuestions[currentIdx] || {};

  useEffect(() => {
    if (examStarted && isTimed && timeLeft > 0 && !isSubmitted) {
      const timer = setInterval(() => setTimeLeft(t => t - 1), 1000);
      return () => clearInterval(timer);
    }
    if (examStarted && isTimed && timeLeft === 0 && !isSubmitted && activeQuestions.length > 0) {
      setIsSubmitted(true);
    }
  }, [examStarted, isTimed, timeLeft, isSubmitted, activeQuestions.length]);

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60).toString().padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  const handleConfigureExam = (exam) => {
    setConfiguringExam(exam);
    setSelectedQuestionCount(10);
    setIsTimed(true);
  };

  const handleStartExam = () => {
    const exam = configuringExam;
    const pool = examQuestionsBank[exam.id] || [];
    
    let generatedQuestions = [];
    if (pool.length > 0) {
      for (let i = 0; i < selectedQuestionCount; i++) {
        generatedQuestions.push({
          ...pool[i % pool.length],
          id: i + 1,
          originalId: pool[i % pool.length].id
        });
      }
    }

    setSelectedExam(exam);
    setActiveQuestions(generatedQuestions);
    setExamStarted(true);
    setTimeLeft(isTimed ? selectedQuestionCount * 60 : 0); // 1 min per question if timed
    setCurrentIdx(0);
    setSelectedAnswers({});
    setIsSubmitted(false);
    setConfiguringExam(null);
  };

  const handleSelectOption = (key) => {
    if (!isSubmitted) {
      setSelectedAnswers(prev => ({ ...prev, [currentIdx]: key }));
    }
  };

  const handleNext = () => {
    if (currentIdx < activeQuestions.length - 1) setCurrentIdx(currentIdx + 1);
  };

  const handlePrev = () => {
    if (currentIdx > 0) setCurrentIdx(currentIdx - 1);
  };

  const handleBackToExams = () => {
    setSelectedExam(null);
    setExamStarted(false);
    setCurrentIdx(0);
    setSelectedAnswers({});
    setIsSubmitted(false);
    setTimeLeft(0);
  };

  const calculateScore = () => {
    let score = 0;
    activeQuestions.forEach((q, idx) => {
      if (selectedAnswers[idx] === q.correctAnswer) score++;
    });
    return Math.round((score / activeQuestions.length) * 100) || 0;
  };

  // ── Exam Picker Screen ──
  if (!examStarted) {
    return (
      <>
        <main className="flex-1 overflow-y-auto bg-surface-container-low p-6 md:p-10 relative lg:ml-64 min-h-screen">
          <div className="max-w-5xl mx-auto">
            <div className="mb-10">
              <span className="text-xs font-bold text-tertiary uppercase tracking-[0.2em] mb-2 block">Practice Mode</span>
              <h1 className="text-4xl font-extrabold tracking-tight text-on-surface mb-2">Exam Simulation</h1>
              <p className="text-secondary text-lg max-w-2xl leading-relaxed">Choose a practice exam below. Your timer will start only when you begin.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {examCatalog.map((exam) => (
                <div
                  key={exam.id}
                  className="group relative bg-surface-container-lowest rounded-xl p-6 border border-slate-100/60 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden"
                >
                  {/* Hover gradient */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${exam.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></div>

                  <div className="relative z-10">
                    <div className="flex items-start justify-between mb-4">
                      <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${exam.gradient} flex items-center justify-center shadow-lg ${exam.shadow} group-hover:bg-white/20 group-hover:shadow-none transition-all`}>
                        <span className="material-symbols-outlined text-white text-[22px]">{exam.icon}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-slate-100 text-slate-500 group-hover:bg-white/20 group-hover:text-white transition-colors`}>
                          {exam.difficulty}
                        </span>
                      </div>
                    </div>

                    <h3 className="text-lg font-bold text-on-surface group-hover:text-white transition-colors mb-2">{exam.name}</h3>
                    <p className="text-sm text-slate-500 group-hover:text-white/80 transition-colors leading-relaxed mb-6">{exam.description}</p>

                    <div className="flex items-center gap-4 mb-6">
                      <div className="flex items-center gap-1.5">
                        <span className="material-symbols-outlined text-[16px] text-slate-400 group-hover:text-white/60 transition-colors">help</span>
                        <span className="text-xs font-bold text-slate-500 group-hover:text-white/70 transition-colors">{exam.questionCount} Questions</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <span className="material-symbols-outlined text-[16px] text-slate-400 group-hover:text-white/60 transition-colors">timer</span>
                        <span className="text-xs font-bold text-slate-500 group-hover:text-white/70 transition-colors">{Math.floor(exam.timeLimit / 60)} Minutes</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <span className="material-symbols-outlined text-[16px] text-slate-400 group-hover:text-white/60 transition-colors">category</span>
                        <span className="text-xs font-bold text-slate-500 group-hover:text-white/70 transition-colors">{exam.category}</span>
                      </div>
                    </div>

                    <button
                      onClick={() => handleConfigureExam(exam)}
                      className="w-full py-3 bg-gradient-to-br from-primary to-primary-container text-white font-bold rounded-lg shadow-md hover:opacity-90 active:scale-[0.98] transition-all flex items-center justify-center gap-2 group-hover:bg-white group-hover:from-white group-hover:to-white group-hover:text-primary group-hover:shadow-lg"
                    >
                      <span className="material-symbols-outlined text-[18px]">play_arrow</span>
                      Configure Exam
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Configuration Modal */}
          {configuringExam && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4">
              <div className="bg-surface-container-lowest rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden border border-slate-200">
                <div className="p-6 border-b border-slate-100 flex items-center justify-between">
                  <h2 className="text-xl font-bold text-on-surface">Configure Exam</h2>
                  <button onClick={() => setConfiguringExam(null)} className="text-slate-400 hover:text-slate-600 transition-colors">
                    <span className="material-symbols-outlined">close</span>
                  </button>
                </div>
                
                <div className="p-6 space-y-8">
                  <div>
                    <h3 className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-4">Number of Questions</h3>
                    <div className="grid grid-cols-4 gap-3">
                      {[10, 25, 50, 100].map(count => (
                        <button
                          key={count}
                          onClick={() => setSelectedQuestionCount(count)}
                          className={`py-3 rounded-lg font-bold transition-all border-2 ${selectedQuestionCount === count ? 'border-primary bg-primary/5 text-primary' : 'border-slate-100 hover:border-slate-300 text-slate-600'}`}
                        >
                          {count}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-4">Exam Mode</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <button
                        onClick={() => setIsTimed(true)}
                        className={`flex items-center justify-center gap-2 py-4 rounded-lg font-bold transition-all border-2 ${isTimed ? 'border-primary bg-primary/5 text-primary' : 'border-slate-100 hover:border-slate-300 text-slate-600'}`}
                      >
                        <span className="material-symbols-outlined">timer</span>
                        Timed
                      </button>
                      <button
                        onClick={() => setIsTimed(false)}
                        className={`flex items-center justify-center gap-2 py-4 rounded-lg font-bold transition-all border-2 ${!isTimed ? 'border-primary bg-primary/5 text-primary' : 'border-slate-100 hover:border-slate-300 text-slate-600'}`}
                      >
                        <span className="material-symbols-outlined">timer_off</span>
                        Untimed
                      </button>
                    </div>
                    {isTimed && <p className="text-xs text-slate-500 mt-3 text-center">Timer will be set to {selectedQuestionCount} minutes.</p>}
                  </div>
                </div>

                <div className="p-6 border-t border-slate-100 bg-slate-50">
                  <button
                    onClick={handleStartExam}
                    className="w-full py-4 bg-primary text-white font-bold rounded-lg shadow-md hover:bg-opacity-90 active:scale-[0.98] transition-all flex items-center justify-center gap-2"
                  >
                    <span className="material-symbols-outlined">play_arrow</span>
                    Start Simulation
                  </button>
                </div>
              </div>
            </div>
          )}
        </main>
      </>
    );
  }

  // ── Active Exam Screen ──
  return (
    <>
      <main className="flex-1 overflow-y-auto bg-surface-container-low p-8 relative lg:ml-64">
        <div className="max-w-4xl mx-auto space-y-8 pr-0 xl:pr-80 pb-20">

          {/* Back button + Progress Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <button onClick={handleBackToExams} className="flex items-center gap-1 text-sm text-slate-500 hover:text-primary transition-colors mb-2">
                <span className="material-symbols-outlined text-[18px]">arrow_back</span>
                Back to Exams
              </button>
              <h2 className="text-2xl font-extrabold text-on-surface tracking-tight font-headline">Question {currentIdx + 1} of {activeQuestions.length}</h2>
              <div className="flex items-center gap-2 mt-2">
                <span className="text-xs font-semibold text-primary uppercase tracking-widest">{currentQ.indicator}</span>
                <span className="w-1 h-1 bg-slate-400 rounded-full"></span>
                <span className="text-xs font-semibold text-slate-500 uppercase tracking-widest">Section: {currentQ.section}</span>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button disabled={isSubmitted} className="flex items-center gap-2 px-4 py-2 bg-surface-container-highest text-on-surface-variant font-semibold rounded-lg hover:bg-slate-200 transition-colors text-sm disabled:opacity-50 disabled:cursor-not-allowed">
                <span className="material-symbols-outlined text-[20px]">flag</span>
                Flag for Review
              </button>
            </div>
          </div>

          {/* Question Card */}
          <div className="bg-surface-container-lowest p-6 md:p-10 text-pretty rounded-xl shadow-sm border border-transparent">
            {isSubmitted && (
              <div className={`mb-6 p-4 rounded-lg font-bold border-l-4 ${selectedAnswers[currentIdx] === currentQ.correctAnswer ? 'bg-green-50 border-green-500 text-green-800' : 'bg-red-50 border-red-500 text-red-800'}`}>
                {selectedAnswers[currentIdx] === currentQ.correctAnswer ? "Correct!" : `Incorrect. The correct answer was ${currentQ.correctAnswer}.`}
              </div>
            )}
            <h3 className="text-xl font-medium text-on-surface leading-relaxed mb-10 max-w-3xl font-body">{currentQ.question}</h3>

            <div className="space-y-4">
              {Object.entries(currentQ.options).map(([key, value]) => {
                const isSelected = selectedAnswers[currentIdx] === key;
                const isCorrect = key === currentQ.correctAnswer;

                let boxStyles = "border-slate-100 hover:border-primary/50 hover:bg-primary/5";
                let textStyles = "font-medium text-on-surface";
                let iconStyles = "border-slate-300 text-slate-400 group-hover:border-primary group-hover:text-primary";

                if (isSelected && !isSubmitted) {
                  boxStyles = "border-primary bg-primary/5";
                  textStyles = "font-bold text-on-surface";
                  iconStyles = "border-primary text-primary border-2";
                } else if (isSubmitted) {
                  if (isSelected && isCorrect) {
                    boxStyles = "border-green-500 bg-green-50";
                    textStyles = "font-bold text-green-900";
                    iconStyles = "border-green-500 text-green-600 bg-green-100 font-bold border-2";
                  } else if (isSelected && !isCorrect) {
                    boxStyles = "border-red-500 bg-red-50";
                    textStyles = "font-bold text-red-900";
                    iconStyles = "border-red-500 text-red-600 bg-red-100 font-bold border-2";
                  } else if (isCorrect) {
                    boxStyles = "border-green-500 bg-green-50/50";
                    textStyles = "font-bold text-green-800";
                    iconStyles = "border-green-500 text-green-600";
                  } else {
                    boxStyles = "border-slate-100 opacity-50";
                  }
                }

                return (
                  <div
                    key={key}
                    onClick={() => handleSelectOption(key)}
                    className={`group relative flex items-center p-5 rounded-lg border-2 transition-all ${isSubmitted ? 'cursor-default' : 'cursor-pointer'} ${boxStyles}`}
                  >
                    <div className={`w-8 h-8 rounded flex flex-shrink-0 items-center justify-center font-bold mr-5 shrink-0 ${iconStyles}`}>{key}</div>
                    <p className={textStyles}>{value}</p>
                    {isSelected && !isSubmitted && (
                      <span className="absolute right-5 material-symbols-outlined text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                    )}
                    {isSubmitted && isCorrect && (
                      <span className="absolute right-5 material-symbols-outlined text-green-500" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                    )}
                    {isSubmitted && isSelected && !isCorrect && (
                      <span className="absolute right-5 material-symbols-outlined text-red-500" style={{ fontVariationSettings: "'FILL' 1" }}>cancel</span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Navigation Controls */}
          <div className="flex flex-col-reverse md:flex-row items-center justify-between pt-4 gap-4">
            <button onClick={handlePrev} disabled={currentIdx === 0} className="w-full md:w-auto px-6 py-2.5 bg-surface-container-high text-on-surface font-bold rounded-lg hover:bg-surface-dim transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed">
              <span className="material-symbols-outlined">arrow_back</span>
              Previous Question
            </button>
            <div className="flex items-center justify-between w-full md:w-auto gap-4">
              <div className="gap-1.5 hidden md:flex">
                {activeQuestions.slice(0, 15).map((_, idx) => (
                  <div key={idx} className={`w-2 h-2 rounded-full ${idx === currentIdx ? 'bg-primary' : 'bg-primary/30'}`}></div>
                ))}
                {activeQuestions.length > 15 && <span className="text-xs text-slate-400">...</span>}
              </div>
              <button onClick={handleNext} disabled={currentIdx === activeQuestions.length - 1} className="w-full md:w-auto px-8 py-3 bg-gradient-to-br from-primary to-primary-container text-white font-bold rounded-lg shadow-md hover:opacity-90 active:scale-[0.98] transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed">
                Next Question
                <span className="material-symbols-outlined">arrow_forward</span>
              </button>
            </div>
          </div>
        </div>

        {/* Floating Sidebar */}
        <div className="fixed right-8 top-32 w-72 hidden xl:flex flex-col gap-6">
          {/* Exam Name */}
          <div className="bg-surface-container-lowest p-4 rounded-xl shadow-sm border border-slate-200/50">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">{selectedExam?.category}</p>
            <p className="text-sm font-bold text-on-surface">{selectedExam?.name}</p>
          </div>

          {/* Question Grid */}
          <div className="bg-surface-container-lowest p-6 rounded-xl shadow-sm border border-slate-200/50">
            <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4">Exam Summary</h4>
            <div className="flex flex-wrap gap-2 overflow-y-auto max-h-48 custom-scrollbar pr-2">
              {activeQuestions.map((_, idx) => {
                const answered = !!selectedAnswers[idx];
                const active = idx === currentIdx;
                let styles = "bg-slate-100 text-slate-400";
                if (isSubmitted) {
                  styles = selectedAnswers[idx] === activeQuestions[idx].correctAnswer ? "bg-green-500 text-white" : "bg-red-500 text-white";
                } else if (active) {
                  styles = "border border-primary/30 bg-primary/5 text-primary";
                } else if (answered) {
                  styles = "bg-primary text-white";
                }
                return (
                  <button key={idx} onClick={() => setCurrentIdx(idx)} className={`w-8 h-8 rounded text-[10px] flex shrink-0 items-center justify-center font-bold ${styles} hover:opacity-80 transition-opacity`}>{idx + 1}</button>
                );
              })}
            </div>
            <p className="mt-4 text-[11px] text-slate-400 text-center font-medium">Viewing {currentIdx + 1} of {activeQuestions.length} questions</p>
          </div>

          {/* Timer / Submit */}
          <div className="bg-surface-container-lowest p-6 rounded-xl shadow-sm border border-slate-200/50">
            {isSubmitted ? (
              <div className="text-center">
                <span className="text-sm text-slate-500 block mb-1">Final Score</span>
                <span className="text-4xl font-extrabold font-headline text-primary tabular-nums">{calculateScore()}%</span>
                <button onClick={handleBackToExams} className="mt-6 w-full py-3 bg-primary text-white font-bold rounded-lg hover:bg-opacity-90 transition-colors shadow-sm">
                  Back to Exams
                </button>
              </div>
            ) : (
              <>
                {isTimed && (
                  <div className="text-center mb-6">
                    <span className="text-sm text-slate-500 block mb-1">Time Remaining</span>
                    <span className={`text-3xl font-extrabold font-headline tabular-nums ${timeLeft <= 60 ? 'text-red-500 animate-pulse' : 'text-on-surface'}`}>{formatTime(timeLeft)}</span>
                  </div>
                )}
                {!isTimed && (
                  <div className="text-center mb-6">
                    <span className="text-sm text-slate-500 block mb-1">Exam Mode</span>
                    <span className="text-xl font-extrabold font-headline text-on-surface">Untimed</span>
                  </div>
                )}
                <button onClick={() => setIsSubmitted(true)} disabled={Object.keys(selectedAnswers).length === 0} className="w-full py-4 bg-tertiary text-white font-bold rounded-lg hover:bg-on-tertiary-fixed-variant transition-colors shadow-lg shadow-tertiary/20 disabled:opacity-50 disabled:cursor-not-allowed">
                  Submit Exam
                </button>
                <p className="mt-3 text-[10px] text-slate-400 text-center leading-relaxed">By clicking submit, you confirm that you have completed all relevant questions.</p>
              </>
            )}
          </div>
        </div>
        
        {/* AI Coach Popup */}
        {isSubmitted && (
          <AiCoachWidget
            variant="popup"
            contextPrompt={`The user has just completed a practice exam for ${selectedExam?.category}.
They are currently viewing Question ${currentIdx + 1}:
Question: ${currentQ.question}
User's Answer: ${currentQ.options[selectedAnswers[currentIdx]] || 'No Answer'}
Correct Answer: ${currentQ.options[currentQ.correctAnswer]}
Performance Indicator: ${currentQ.indicator}

The user may ask you why their answer is incorrect or to explain the correct answer. Focus your explanation on the specific business concepts related to the Performance Indicator.`}
          />
        )}
      </main>
    </>
  );
}
