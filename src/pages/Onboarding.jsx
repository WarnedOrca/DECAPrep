import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { careerClusters, decaEvents, focusAreas } from '../data/onboardingData';

export default function Onboarding() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [selectedCluster, setSelectedCluster] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [selectedFocusAreas, setSelectedFocusAreas] = useState([]);
  const [studyGoal, setStudyGoal] = useState('30');
  const [targetScore, setTargetScore] = useState('80');

  const totalSteps = 4;

  const toggleFocusArea = (id) => {
    setSelectedFocusAreas(prev =>
      prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]
    );
  };

  const handleComplete = () => {
    const onboardingData = {
      cluster: selectedCluster,
      event: selectedEvent,
      focusAreas: selectedFocusAreas,
      studyGoal,
      targetScore,
      completedAt: new Date().toISOString()
    };
    localStorage.setItem('decaprep_onboarding', JSON.stringify(onboardingData));
    navigate('/');
  };

  const canProceed = () => {
    switch (step) {
      case 1: return selectedCluster !== null;
      case 2: return selectedEvent !== null;
      case 3: return selectedFocusAreas.length > 0;
      case 4: return true;
      default: return false;
    }
  };

  const clusterEvents = selectedCluster ? (decaEvents[selectedCluster] || []) : [];
  const clusterFocusAreas = selectedCluster ? focusAreas.filter(f => f.cluster === selectedCluster) : [];
  const selectedClusterData = careerClusters.find(c => c.id === selectedCluster);

  return (
    <>
      <main className="flex-1 lg:ml-64 min-h-screen flex flex-col">
        {/* Progress Bar */}
        <div className="bg-surface-container-lowest border-b border-slate-100 px-6 py-4">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold text-primary uppercase tracking-widest">Step {step} of {totalSteps}</span>
              <button
                onClick={() => navigate('/')}
                className="text-xs font-bold text-slate-400 hover:text-slate-600 transition-colors"
              >
                Skip for now
              </button>
            </div>
            <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
              <div
                className="bg-gradient-to-r from-primary to-primary-container h-full rounded-full transition-all duration-500"
                style={{ width: `${(step / totalSteps) * 100}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 p-6 md:p-10 overflow-y-auto">
          <div className="max-w-3xl mx-auto">

            {/* Step 1: Choose Career Cluster */}
            {step === 1 && (
              <div>
                <div className="mb-8">
                  <span className="material-symbols-outlined text-4xl text-primary mb-3 block">workspaces</span>
                  <h1 className="text-3xl font-extrabold tracking-tight text-on-surface mb-2">Choose Your Career Cluster</h1>
                  <p className="text-secondary text-lg leading-relaxed">Select the DECA career cluster you're competing in or want to focus on. This will personalize your study experience.</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {careerClusters.map((cluster) => (
                    <button
                      key={cluster.id}
                      onClick={() => {
                        setSelectedCluster(cluster.id);
                        setSelectedEvent(null);
                        setSelectedFocusAreas([]);
                      }}
                      className={`text-left p-5 rounded-xl border-2 transition-all duration-200 ${
                        selectedCluster === cluster.id
                          ? 'border-primary bg-primary/5 shadow-lg shadow-primary/10'
                          : 'border-slate-100 bg-surface-container-lowest hover:border-slate-200 hover:shadow-sm'
                      }`}
                    >
                      <div className="flex items-center gap-3 mb-3">
                        <div className="h-10 w-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${cluster.color}15` }}>
                          <span className="material-symbols-outlined text-xl" style={{ color: cluster.color }}>{cluster.icon}</span>
                        </div>
                        <div>
                          <h3 className="text-base font-bold text-on-surface">{cluster.name}</h3>
                          <span className="text-xs text-slate-400 font-medium">{cluster.piCount} Performance Indicators</span>
                        </div>
                        {selectedCluster === cluster.id && (
                          <span className="material-symbols-outlined text-primary ml-auto" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                        )}
                      </div>
                      <p className="text-sm text-secondary leading-relaxed">{cluster.description}</p>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Step 2: Select Event */}
            {step === 2 && (
              <div>
                <div className="mb-8">
                  <span className="material-symbols-outlined text-4xl text-primary mb-3 block">emoji_events</span>
                  <h1 className="text-3xl font-extrabold tracking-tight text-on-surface mb-2">Select Your Event</h1>
                  <p className="text-secondary text-lg leading-relaxed">
                    Choose the competitive event within <strong className="text-on-surface">{selectedClusterData?.name}</strong> that you're preparing for.
                  </p>
                </div>
                <div className="space-y-3">
                  {clusterEvents.map((event) => (
                    <button
                      key={event.id}
                      onClick={() => setSelectedEvent(event.id)}
                      className={`w-full text-left p-5 rounded-xl border-2 transition-all duration-200 ${
                        selectedEvent === event.id
                          ? 'border-primary bg-primary/5 shadow-lg shadow-primary/10'
                          : 'border-slate-100 bg-surface-container-lowest hover:border-slate-200 hover:shadow-sm'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="text-base font-bold text-on-surface mb-1">{event.name}</h3>
                          <div className="flex items-center gap-3">
                            <span className="text-[10px] font-bold text-slate-400 uppercase flex items-center gap-1">
                              <span className="material-symbols-outlined text-[14px]">person</span>
                              {event.type}
                            </span>
                            <span className="text-[10px] font-bold text-slate-400 uppercase flex items-center gap-1">
                              <span className="material-symbols-outlined text-[14px]">description</span>
                              {event.format}
                            </span>
                            <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full ${
                              event.difficulty === 'Principles' ? 'bg-green-50 text-green-700' : 'bg-blue-50 text-blue-700'
                            }`}>
                              {event.difficulty}
                            </span>
                          </div>
                        </div>
                        {selectedEvent === event.id && (
                          <span className="material-symbols-outlined text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Step 3: Pick Focus Areas */}
            {step === 3 && (
              <div>
                <div className="mb-8">
                  <span className="material-symbols-outlined text-4xl text-primary mb-3 block">target</span>
                  <h1 className="text-3xl font-extrabold tracking-tight text-on-surface mb-2">Pick Your Focus Areas</h1>
                  <p className="text-secondary text-lg leading-relaxed">Select the performance indicator categories you want to prioritize. You can always change these later.</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {clusterFocusAreas.map((area) => {
                    const isSelected = selectedFocusAreas.includes(area.id);
                    return (
                      <button
                        key={area.id}
                        onClick={() => toggleFocusArea(area.id)}
                        className={`text-left p-4 rounded-xl border-2 transition-all duration-200 flex items-center gap-3 ${
                          isSelected
                            ? 'border-primary bg-primary/5'
                            : 'border-slate-100 bg-surface-container-lowest hover:border-slate-200'
                        }`}
                      >
                        <div className={`w-5 h-5 rounded flex-shrink-0 flex items-center justify-center border-2 transition-colors ${
                          isSelected ? 'bg-primary border-primary' : 'border-slate-300'
                        }`}>
                          {isSelected && <span className="material-symbols-outlined text-white text-[14px]">check</span>}
                        </div>
                        <span className="text-sm font-semibold text-on-surface">{area.name}</span>
                      </button>
                    );
                  })}
                </div>
                {selectedFocusAreas.length > 0 && (
                  <p className="mt-4 text-xs font-bold text-primary">{selectedFocusAreas.length} area{selectedFocusAreas.length !== 1 ? 's' : ''} selected</p>
                )}
              </div>
            )}

            {/* Step 4: Set Goals */}
            {step === 4 && (
              <div>
                <div className="mb-8">
                  <span className="material-symbols-outlined text-4xl text-primary mb-3 block">flag</span>
                  <h1 className="text-3xl font-extrabold tracking-tight text-on-surface mb-2">Set Your Goals</h1>
                  <p className="text-secondary text-lg leading-relaxed">Define your study schedule and targets. We'll use these to tailor your recommendations.</p>
                </div>
                <div className="space-y-8">
                  <div className="bg-surface-container-lowest rounded-xl p-6 border border-slate-100">
                    <h3 className="text-base font-bold text-on-surface mb-4 flex items-center gap-2">
                      <span className="material-symbols-outlined text-primary text-[20px]">schedule</span>
                      Daily Study Goal
                    </h3>
                    <div className="grid grid-cols-3 gap-3">
                      {[
                        { val: '15', label: '15 min', desc: 'Casual' },
                        { val: '30', label: '30 min', desc: 'Steady' },
                        { val: '60', label: '60 min', desc: 'Intensive' },
                      ].map(({ val, label, desc }) => (
                        <button
                          key={val}
                          onClick={() => setStudyGoal(val)}
                          className={`p-4 rounded-xl border-2 text-center transition-all ${
                            studyGoal === val
                              ? 'border-primary bg-primary/5'
                              : 'border-slate-100 hover:border-slate-200'
                          }`}
                        >
                          <p className="text-xl font-extrabold text-on-surface">{label}</p>
                          <p className="text-xs font-bold text-slate-400 uppercase">{desc}</p>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="bg-surface-container-lowest rounded-xl p-6 border border-slate-100">
                    <h3 className="text-base font-bold text-on-surface mb-4 flex items-center gap-2">
                      <span className="material-symbols-outlined text-primary text-[20px]">military_tech</span>
                      Target Mastery Score
                    </h3>
                    <div className="grid grid-cols-3 gap-3">
                      {[
                        { val: '70', label: '70%', desc: 'Bronze' },
                        { val: '80', label: '80%', desc: 'Silver' },
                        { val: '90', label: '90%', desc: 'Gold' },
                      ].map(({ val, label, desc }) => (
                        <button
                          key={val}
                          onClick={() => setTargetScore(val)}
                          className={`p-4 rounded-xl border-2 text-center transition-all ${
                            targetScore === val
                              ? 'border-primary bg-primary/5'
                              : 'border-slate-100 hover:border-slate-200'
                          }`}
                        >
                          <p className="text-xl font-extrabold text-on-surface">{label}</p>
                          <p className="text-xs font-bold text-slate-400 uppercase">{desc}</p>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Summary */}
                  <div className="bg-primary/5 rounded-xl p-6 border border-primary/20">
                    <h3 className="text-base font-bold text-primary mb-3 flex items-center gap-2">
                      <span className="material-symbols-outlined text-[20px]">summarize</span>
                      Your Setup Summary
                    </h3>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-[10px] font-bold text-slate-400 uppercase">Cluster</p>
                        <p className="font-bold text-on-surface">{selectedClusterData?.name || '—'}</p>
                      </div>
                      <div>
                        <p className="text-[10px] font-bold text-slate-400 uppercase">Event</p>
                        <p className="font-bold text-on-surface">{clusterEvents.find(e => e.id === selectedEvent)?.name || '—'}</p>
                      </div>
                      <div>
                        <p className="text-[10px] font-bold text-slate-400 uppercase">Focus Areas</p>
                        <p className="font-bold text-on-surface">{selectedFocusAreas.length} selected</p>
                      </div>
                      <div>
                        <p className="text-[10px] font-bold text-slate-400 uppercase">Daily Goal</p>
                        <p className="font-bold text-on-surface">{studyGoal} min/day</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer Navigation */}
        <div className="bg-surface-container-lowest border-t border-slate-100 px-6 py-4">
          <div className="max-w-3xl mx-auto flex items-center justify-between">
            <button
              onClick={() => setStep(Math.max(1, step - 1))}
              disabled={step === 1}
              className="px-6 py-2.5 text-sm font-bold text-slate-500 hover:text-on-surface transition-colors flex items-center gap-2 disabled:opacity-30 disabled:cursor-not-allowed"
            >
              <span className="material-symbols-outlined text-[18px]">arrow_back</span>
              Back
            </button>
            {step < totalSteps ? (
              <button
                onClick={() => setStep(step + 1)}
                disabled={!canProceed()}
                className="px-8 py-3 btn-primary-gradient text-white text-sm font-bold rounded-lg shadow-lg shadow-primary/20 hover:scale-[1.02] transition-transform flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Continue
                <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
              </button>
            ) : (
              <button
                onClick={handleComplete}
                className="px-8 py-3 btn-primary-gradient text-white text-sm font-bold rounded-lg shadow-lg shadow-primary/20 hover:scale-[1.02] transition-transform flex items-center gap-2"
              >
                <span className="material-symbols-outlined text-[18px]">check</span>
                Complete Setup
              </button>
            )}
          </div>
        </div>
      </main>
    </>
  );
}
