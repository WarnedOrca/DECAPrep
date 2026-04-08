import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { examQuestions } from '../data/mockData';

const EXAM_MODES = {
  practice: 'practice',
  official: 'official',
};

export default function ExamSimulation() {
  const [mode, setMode] = useState(EXAM_MODES.practice);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [revealedAnswers, setRevealedAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(3522);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const currentQ = examQuestions[currentIdx];
  const currentSelection = selectedAnswers[currentIdx];
  const answerRevealed = Boolean(revealedAnswers[currentIdx]);
  const isPracticeMode = mode === EXAM_MODES.practice;

  useEffect(() => {
    if (mode === EXAM_MODES.official && timeLeft > 0 && !isSubmitted) {
      const timer = setInterval(() => setTimeLeft((t) => t - 1), 1000);
      return () => clearInterval(timer);
    }
  }, [isSubmitted, mode, timeLeft]);

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60)
      .toString()
      .padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  const resetSession = (nextMode = mode) => {
    setMode(nextMode);
    setCurrentIdx(0);
    setSelectedAnswers({});
    setRevealedAnswers({});
    setIsSubmitted(false);
    setTimeLeft(3522);
  };

  const handleModeChange = (nextMode) => {
    if (nextMode !== mode) {
      resetSession(nextMode);
    }
  };

  const handleSelectOption = (key) => {
    if (isSubmitted || answerRevealed) return;

    setSelectedAnswers((prev) => ({ ...prev, [currentIdx]: key }));

    if (isPracticeMode && key !== currentQ.correctAnswer) {
      setRevealedAnswers((prev) => ({ ...prev, [currentIdx]: true }));
    }
  };

  const revealPracticeAnswer = () => {
    if (!currentSelection) return;
    setRevealedAnswers((prev) => ({ ...prev, [currentIdx]: true }));
  };

  const calculateScore = () => {
    let score = 0;
    examQuestions.forEach((q, idx) => {
      if (selectedAnswers[idx] === q.correctAnswer) {
        score += 1;
      }
    });
    return Math.round((score / examQuestions.length) * 100);
  };

  const getOptionState = (key) => {
    const isSelected = currentSelection === key;
    const isCorrect = key === currentQ.correctAnswer;

    if (isPracticeMode && answerRevealed) {
      if (isCorrect) {
        return {
          boxStyles: 'border-green-500 bg-green-50',
          textStyles: 'font-bold text-green-900',
          iconStyles: 'border-2 border-green-500 text-green-600 bg-green-100',
        };
      }

      if (isSelected) {
        return {
          boxStyles: 'border-red-500 bg-red-50',
          textStyles: 'font-bold text-red-900',
          iconStyles: 'border-2 border-red-500 text-red-600 bg-red-100',
        };
      }

      return {
        boxStyles: 'border-slate-200 bg-white/70 opacity-70',
        textStyles: 'font-medium text-slate-700',
        iconStyles: 'border-slate-300 text-slate-400',
      };
    }

    if (isSubmitted) {
      if (isSelected && isCorrect) {
        return {
          boxStyles: 'border-green-500 bg-green-50',
          textStyles: 'font-bold text-green-900',
          iconStyles: 'border-2 border-green-500 text-green-600 bg-green-100',
        };
      }

      if (isSelected && !isCorrect) {
        return {
          boxStyles: 'border-red-500 bg-red-50',
          textStyles: 'font-bold text-red-900',
          iconStyles: 'border-2 border-red-500 text-red-600 bg-red-100',
        };
      }

      if (isCorrect) {
        return {
          boxStyles: 'border-green-500 bg-green-50/70',
          textStyles: 'font-bold text-green-800',
          iconStyles: 'border border-green-500 text-green-600',
        };
      }
    }

    if (isSelected) {
      return {
        boxStyles: 'border-primary bg-primary/5',
        textStyles: 'font-bold text-slate-950',
        iconStyles: 'border-2 border-primary text-primary bg-white',
      };
    }

    return {
      boxStyles: 'border-slate-200 bg-white hover:border-primary/40 hover:bg-primary/5',
      textStyles: 'font-medium text-slate-800',
      iconStyles: 'border-slate-300 text-slate-400',
    };
  };

  return (
    <main className="page-shell px-4 pb-24 pt-8 md:px-8 lg:ml-72 lg:px-10">
      <div className="content-wrap">
        <section className="mb-6 flex flex-col gap-6 xl:flex-row xl:items-end xl:justify-between">
          <div className="max-w-3xl">
            <span className="eyebrow mb-3 block">Exam Lab</span>
            <h1 className="font-headline text-4xl font-extrabold tracking-tight text-slate-950 md:text-5xl">
              Practice with guidance or run the official-style timed version.
            </h1>
            <p className="mt-4 text-base leading-7 text-slate-600 md:text-lg">
              Practice mode explains mistakes as you go. Official mode removes AI help and runs as a timed exam.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Link className="btn-secondary text-sm" to="/database">
              Review indicators
            </Link>
          </div>
        </section>

        <section className="surface-card mb-6 rounded-[1.75rem] p-3 md:p-4">
          <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
            <button
              className={`rounded-[1.35rem] border px-5 py-5 text-left transition ${
                isPracticeMode ? 'border-primary bg-primary/8 shadow-sm' : 'border-slate-200 bg-white/70'
              }`}
              onClick={() => handleModeChange(EXAM_MODES.practice)}
              type="button"
            >
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-slate-400">Mode</p>
                  <h2 className="mt-1 font-headline text-2xl font-extrabold text-slate-950">Practice</h2>
                </div>
                <span className="material-symbols-outlined text-primary">school</span>
              </div>
              <p className="mt-3 text-sm leading-7 text-slate-600">
                Untimed flow. If you miss a question, the AI coach explains why the correct answer works before you move on.
              </p>
            </button>

            <button
              className={`rounded-[1.35rem] border px-5 py-5 text-left transition ${
                !isPracticeMode ? 'border-primary bg-primary/8 shadow-sm' : 'border-slate-200 bg-white/70'
              }`}
              onClick={() => handleModeChange(EXAM_MODES.official)}
              type="button"
            >
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-slate-400">Mode</p>
                  <h2 className="mt-1 font-headline text-2xl font-extrabold text-slate-950">Official</h2>
                </div>
                <span className="material-symbols-outlined text-primary">timer</span>
              </div>
              <p className="mt-3 text-sm leading-7 text-slate-600">
                Timed simulation. No AI hints, no instant explanations, and scoring only appears after you submit.
              </p>
            </button>
          </div>
        </section>

        <div className="grid grid-cols-1 gap-6 xl:grid-cols-[minmax(0,1fr)_19rem]">
          <section className="surface-card rounded-[1.75rem] p-6 md:p-8">
            <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-bold uppercase tracking-[0.16em] text-primary">
                    {isPracticeMode ? 'Practice Mode' : 'Official Mode'}
                  </span>
                  {isPracticeMode ? (
                    <span className="rounded-full bg-tertiary/10 px-3 py-1 text-xs font-bold uppercase tracking-[0.16em] text-tertiary">
                      AI feedback enabled
                    </span>
                  ) : null}
                </div>

                <h2 className="mt-3 font-headline text-3xl font-extrabold text-slate-950">
                  Question {currentIdx + 1} of {examQuestions.length}
                </h2>
                <div className="mt-3 flex flex-wrap items-center gap-2">
                  <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-bold uppercase tracking-[0.16em] text-primary">
                    {currentQ.indicator}
                  </span>
                  <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold uppercase tracking-[0.16em] text-slate-500">
                    Section: {currentQ.section}
                  </span>
                </div>
              </div>

              <div className="surface-panel rounded-[1.25rem] px-4 py-3 text-center">
                <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-slate-400">
                  {isPracticeMode ? 'Pace' : 'Time Remaining'}
                </p>
                <p className="mt-1 font-headline text-3xl font-extrabold text-slate-950 tabular-nums">
                  {isPracticeMode ? 'Untimed' : formatTime(timeLeft)}
                </p>
              </div>
            </div>

            <div className="surface-panel rounded-[1.5rem] p-6 md:p-8">
              {!isPracticeMode && isSubmitted ? (
                <div
                  className={`mb-6 rounded-[1.1rem] border-l-4 px-4 py-3 font-bold ${
                    currentSelection === currentQ.correctAnswer
                      ? 'border-green-500 bg-green-50 text-green-800'
                      : 'border-red-500 bg-red-50 text-red-800'
                  }`}
                >
                  {currentSelection === currentQ.correctAnswer
                    ? 'Correct!'
                    : `Incorrect. The correct answer was ${currentQ.correctAnswer}.`}
                </div>
              ) : null}

              <h3 className="max-w-3xl text-xl font-medium leading-9 text-slate-900 md:text-2xl">{currentQ.question}</h3>

              <div className="mt-8 space-y-4">
                {Object.entries(currentQ.options).map(([key, value]) => {
                  const optionState = getOptionState(key);

                  return (
                    <button
                      key={key}
                      className={`flex w-full items-center gap-4 rounded-[1.25rem] border-2 p-5 text-left transition ${optionState.boxStyles}`}
                      disabled={isSubmitted || answerRevealed}
                      onClick={() => handleSelectOption(key)}
                      type="button"
                    >
                      <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl font-bold ${optionState.iconStyles}`}>
                        {key}
                      </span>
                      <span className={optionState.textStyles}>{value}</span>
                    </button>
                  );
                })}
              </div>

              {isPracticeMode && answerRevealed ? (
                <div className="mt-6 rounded-[1.25rem] border border-primary/20 bg-primary/5 p-5">
                  <div className="mb-2 flex items-center gap-2 text-primary">
                    <span className="material-symbols-outlined">smart_toy</span>
                    <p className="text-sm font-bold uppercase tracking-[0.16em]">AI Coach Explanation</p>
                  </div>
                  <p className="text-sm leading-7 text-slate-700">{currentQ.explanation}</p>
                </div>
              ) : null}
            </div>

            <div className="mt-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <button
                className="btn-secondary text-sm disabled:cursor-not-allowed disabled:opacity-50"
                disabled={currentIdx === 0}
                onClick={() => setCurrentIdx((idx) => idx - 1)}
                type="button"
              >
                <span className="material-symbols-outlined text-sm">arrow_back</span>
                Previous
              </button>

              <div className="hidden gap-2 md:flex">
                {examQuestions.map((_, idx) => (
                  <button
                    key={idx}
                    className={`h-3 w-3 rounded-full transition ${idx === currentIdx ? 'bg-primary' : 'bg-primary/20'}`}
                    onClick={() => setCurrentIdx(idx)}
                    type="button"
                  />
                ))}
              </div>

              <div className="flex w-full flex-col gap-3 md:w-auto md:flex-row">
                {isPracticeMode && currentSelection && !answerRevealed ? (
                  <button className="btn-secondary text-sm" onClick={revealPracticeAnswer} type="button">
                    Check Answer
                  </button>
                ) : null}

                <button
                  className="btn-primary text-sm disabled:cursor-not-allowed disabled:opacity-50"
                  disabled={currentIdx === examQuestions.length - 1}
                  onClick={() => setCurrentIdx((idx) => idx + 1)}
                  type="button"
                >
                  Next
                  <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </button>
              </div>
            </div>
          </section>

          <aside className="space-y-6">
            <section className="surface-card rounded-[1.75rem] p-6">
              <p className="eyebrow mb-4">{isPracticeMode ? 'Practice Progress' : 'Exam Summary'}</p>
              <div className="flex flex-wrap gap-2">
                {examQuestions.map((q, idx) => {
                  const answered = Boolean(selectedAnswers[idx]);
                  const revealed = Boolean(revealedAnswers[idx]);
                  const active = idx === currentIdx;

                  let styles = 'bg-slate-100 text-slate-400';

                  if (!isPracticeMode && isSubmitted) {
                    styles =
                      selectedAnswers[idx] === q.correctAnswer ? 'bg-green-500 text-white' : 'bg-red-500 text-white';
                  } else if (active) {
                    styles = 'bg-primary text-white';
                  } else if (isPracticeMode && revealed) {
                    styles =
                      selectedAnswers[idx] === q.correctAnswer ? 'bg-green-500 text-white' : 'bg-amber-500 text-white';
                  } else if (answered) {
                    styles = 'bg-primary/10 text-primary';
                  }

                  return (
                    <button
                      key={idx}
                      className={`flex h-10 w-10 items-center justify-center rounded-xl text-sm font-bold transition ${styles}`}
                      onClick={() => setCurrentIdx(idx)}
                      type="button"
                    >
                      {idx + 1}
                    </button>
                  );
                })}
              </div>
            </section>

            <section className="surface-card rounded-[1.75rem] p-6">
              {isPracticeMode ? (
                <>
                  <p className="text-sm leading-7 text-slate-600">
                    Practice mode gives you immediate coaching after a missed question, so you can learn the pattern before moving on.
                  </p>
                  <button className="btn-primary mt-6 w-full text-sm" onClick={() => resetSession(EXAM_MODES.practice)} type="button">
                    Restart Practice
                  </button>
                </>
              ) : isSubmitted ? (
                <div className="text-center">
                  <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-slate-400">Final Score</p>
                  <p className="mt-2 font-headline text-5xl font-extrabold text-primary">{calculateScore()}%</p>
                  <button className="btn-primary mt-6 w-full text-sm" onClick={() => resetSession(EXAM_MODES.official)} type="button">
                    Restart Official Exam
                  </button>
                </div>
              ) : (
                <>
                  <p className="text-sm leading-7 text-slate-600">
                    Official mode stays locked down. No AI hints, no answer explanations, and scoring only appears after submission.
                  </p>
                  <button
                    className="mt-6 w-full rounded-full bg-tertiary px-4 py-3 text-sm font-bold text-white shadow-lg shadow-tertiary/20 transition hover:opacity-92 disabled:cursor-not-allowed disabled:opacity-50"
                    disabled={Object.keys(selectedAnswers).length === 0}
                    onClick={() => setIsSubmitted(true)}
                    type="button"
                  >
                    Submit Official Exam
                  </button>
                </>
              )}
            </section>
          </aside>
        </div>
      </div>
    </main>
  );
}
