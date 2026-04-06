import { useState, useEffect } from 'react';
import { examQuestions } from '../data/mockData';

export default function ExamSimulation() {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(3522); // 58:42 in seconds
  const [isSubmitted, setIsSubmitted] = useState(false);

  const currentQ = examQuestions[currentIdx];

  useEffect(() => {
    if (timeLeft > 0 && !isSubmitted) {
      const timer = setInterval(() => setTimeLeft(t => t - 1), 1000);
      return () => clearInterval(timer);
    }
  }, [timeLeft, isSubmitted]);

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60).toString().padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  const handleSelectOption = (key) => {
    if (!isSubmitted) {
      setSelectedAnswers(prev => ({ ...prev, [currentIdx]: key }));
    }
  };

  const handleNext = () => {
    if (currentIdx < examQuestions.length - 1) {
      setCurrentIdx(currentIdx + 1);
    }
  };

  const handlePrev = () => {
    if (currentIdx > 0) {
      setCurrentIdx(currentIdx - 1);
    }
  };

  const calculateScore = () => {
    let score = 0;
    examQuestions.forEach((q, idx) => {
      if (selectedAnswers[idx] === q.correctAnswer) {
        score++;
      }
    });
    return Math.round((score / examQuestions.length) * 100);
  };

  return (
    <>
      <main className="flex-1 overflow-y-auto bg-surface-container-low p-8 relative lg:ml-64">
        <div className="max-w-4xl mx-auto space-y-8 pr-0 xl:pr-80 pb-20">
          
          {/* Progress Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <h2 className="text-2xl font-extrabold text-on-surface tracking-tight font-headline">Question {currentIdx + 1} of {examQuestions.length}</h2>
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

          {/* Exam Content (Question Card) */}
          <div className="bg-surface-container-lowest p-6 md:p-10 text-pretty rounded-xl shadow-sm border border-transparent">
            {isSubmitted && (
              <div className={`mb-6 p-4 rounded-lg font-bold border-l-4 ${selectedAnswers[currentIdx] === currentQ.correctAnswer ? 'bg-green-50 border-green-500 text-green-800' : 'bg-red-50 border-red-500 text-red-800'}`}>
                {selectedAnswers[currentIdx] === currentQ.correctAnswer ? "Correct!" : `Incorrect. The correct answer was ${currentQ.correctAnswer}.`}
              </div>
            )}
            <h3 className="text-xl font-medium text-on-surface leading-relaxed mb-10 max-w-3xl font-body">
              {currentQ.question}
            </h3>
            
            <div className="space-y-4">
              {/* Options */}
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
                    <div className={`w-8 h-8 rounded flex flex-shrink-0 items-center justify-center font-bold mr-5 shrink-0 ${iconStyles}`}>
                      {key}
                    </div>
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
            <button 
              onClick={handlePrev}
              disabled={currentIdx === 0}
              className="w-full md:w-auto px-6 py-2.5 bg-surface-container-high text-on-surface font-bold rounded-lg hover:bg-surface-dim transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span className="material-symbols-outlined">arrow_back</span>
              Previous Question
            </button>
            <div className="flex items-center justify-between w-full md:w-auto gap-4">
              <div className="flex gap-1.5 hidden md:flex">
                {examQuestions.map((_, idx) => (
                  <div key={idx} className={`w-2 h-2 rounded-full ${idx === currentIdx ? 'bg-primary' : 'bg-primary/30'}`}></div>
                ))}
              </div>
              <button 
                onClick={handleNext}
                disabled={currentIdx === examQuestions.length - 1}
                className="w-full md:w-auto px-8 py-3 bg-gradient-to-br from-primary to-primary-container text-white font-bold rounded-lg shadow-md hover:opacity-90 active:scale-[0.98] transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next Question
                <span className="material-symbols-outlined">arrow_forward</span>
              </button>
            </div>
          </div>
        </div>

        {/* Bento Sidebar (Floating Desktop Controls) */}
        <div className="fixed right-8 top-32 w-72 hidden xl:flex flex-col gap-6">
          
          {/* Status Card */}
          <div className="bg-surface-container-lowest p-6 rounded-xl shadow-sm border border-slate-200/50">
            <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4">Exam Summary</h4>
            <div className="flex flex-wrap gap-2">
              {/* Quick Question Grid */}
              {examQuestions.map((_, idx) => {
                const answered = !!selectedAnswers[idx];
                const active = idx === currentIdx;
                
                let styles = "bg-slate-100 text-slate-400";
                
                if (isSubmitted) {
                    if (selectedAnswers[idx] === examQuestions[idx].correctAnswer) {
                        styles = "bg-green-500 text-white";
                    } else {
                        styles = "bg-red-500 text-white";
                    }
                } else if (active) {
                    styles = "border border-primary/30 bg-primary/5 text-primary";
                } else if (answered) {
                    styles = "bg-primary text-white";
                }

                return (
                  <button 
                    key={idx}
                    onClick={() => setCurrentIdx(idx)}
                    className={`w-8 h-8 rounded text-[10px] flex shrink-0 items-center justify-center font-bold ${styles} hover:opacity-80 transition-opacity`}
                  >
                    {idx + 1}
                  </button>
                );
              })}
            </div>
            <p className="mt-4 text-[11px] text-slate-400 text-center font-medium">Viewing {currentIdx + 1} of {examQuestions.length} questions</p>
          </div>

          {/* Submit Card */}
          <div className="bg-surface-container-lowest p-6 rounded-xl shadow-sm border border-slate-200/50">
            {isSubmitted ? (
              <div className="text-center mb-0">
                <span className="text-sm text-slate-500 block mb-1">Final Score</span>
                <span className="text-4xl font-extrabold font-headline text-primary tabular-nums">{calculateScore()}%</span>
                <button 
                  onClick={() => {
                    setIsSubmitted(false);
                    setSelectedAnswers({});
                    setCurrentIdx(0);
                    setTimeLeft(3522);
                  }}
                  className="mt-6 w-full py-3 bg-primary text-white font-bold rounded-lg hover:bg-opacity-90 transition-colors shadow-sm"
                >
                  Restart Exam
                </button>
              </div>
            ) : (
              <>
                <div className="text-center mb-6">
                  <span className="text-sm text-slate-500 block mb-1">Time Remaining</span>
                  <span className="text-3xl font-extrabold font-headline text-on-surface tabular-nums">{formatTime(timeLeft)}</span>
                </div>
                <button 
                  onClick={() => setIsSubmitted(true)}
                  disabled={Object.keys(selectedAnswers).length === 0}
                  className="w-full py-4 bg-tertiary text-white font-bold rounded-lg hover:bg-on-tertiary-fixed-variant transition-colors shadow-lg shadow-tertiary/20 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Submit Exam
                </button>
                <p className="mt-3 text-[10px] text-slate-400 text-center leading-relaxed">
                  By clicking submit, you confirm that you have completed all relevant questions.
                </p>
              </>
            )}
          </div>

        </div>
      </main>
    </>
  );
}
