import { Link } from 'react-router-dom';

export default function Analytics() {
  const weekDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const weeks = [
    [3, 5, 2, 7, 4, 0, 1],
    [6, 4, 8, 3, 5, 2, 0],
    [2, 7, 5, 6, 8, 3, 4],
    [5, 3, 6, 4, 7, 1, 2]
  ];

  const getHeatColor = (val) => {
    if (val === 0) return 'bg-slate-100';
    if (val <= 2) return 'bg-primary/20';
    if (val <= 4) return 'bg-primary/40';
    if (val <= 6) return 'bg-primary/60';
    return 'bg-primary/90';
  };

  const clusterData = [
    { name: 'Marketing', score: 85, change: '+3%', color: '#0059a4' },
    { name: 'Finance', score: 62, change: '+8%', color: '#1a7c5f' },
    { name: 'Hospitality', score: 91, change: '+1%', color: '#b45309' },
    { name: 'Business Admin', score: 45, change: '+12%', color: '#6c5d38' },
    { name: 'Entrepreneurship', score: 73, change: '+5%', color: '#7c3aed' },
  ];

  const milestones = [
    { label: 'First 50 PIs studied', date: 'Mar 2', done: true },
    { label: '7-day study streak', date: 'Mar 8', done: true },
    { label: 'Pass first mock exam', date: 'Mar 15', done: true },
    { label: 'Complete Marketing cluster', date: 'Apr 1', done: false },
    { label: 'ICDC Qualification Ready', date: 'Apr 20', done: false },
  ];

  return (
    <>
      <main className="lg:ml-64 p-6 md:p-10">
        <div className="max-w-6xl mx-auto">
          {/* Header Section */}
          <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <span className="text-xs font-bold text-tertiary uppercase tracking-[0.2em] mb-2 block">Performance Overview</span>
              <h1 className="text-4xl font-extrabold tracking-tight text-on-surface">DECAprep Analytics</h1>
            </div>
            <div className="flex gap-4">
              <div className="px-4 py-2 bg-surface-container-low rounded-lg">
                <p className="text-[10px] text-slate-500 font-bold uppercase">Study Streak</p>
                <p className="text-xl font-extrabold text-primary">14 Days</p>
              </div>
              <div className="px-4 py-2 bg-surface-container-low rounded-lg">
                <p className="text-[10px] text-slate-500 font-bold uppercase">Mastery Rate</p>
                <p className="text-xl font-extrabold text-primary">82%</p>
              </div>
            </div>
          </div>

          {/* Bento Grid Layout */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            {/* Main Analytics Chart Area */}
            <div className="md:col-span-8 bg-surface-container-lowest rounded-xl p-8 shadow-sm border border-slate-100/50">
              <div className="flex justify-between items-start mb-8">
                <div>
                  <h2 className="text-xl font-bold mb-1">Strength vs Weakness Analysis</h2>
                  <p className="text-sm text-slate-500">Performance distribution across DECA clusters</p>
                </div>
                <Link to="/clusters" className="text-slate-400 hover:text-primary transition-colors">
                  <span className="material-symbols-outlined" data-icon="more_horiz">more_horiz</span>
                </Link>
              </div>
              <div className="relative h-64 w-full flex items-end justify-between px-4">
                {[
                  { label: 'Marketing', height: '85%' },
                  { label: 'Finance', height: '60%' },
                  { label: 'Bus. Admin', height: '40%' },
                  { label: 'Hospitality', height: '92%' },
                  { label: 'Entrepreneur', height: '75%' },
                ].map((bar) => (
                  <Link key={bar.label} to="/clusters" className="flex flex-col items-center gap-2 group w-full px-2 cursor-pointer">
                    <div className="w-full bg-primary/10 rounded-t-lg relative flex items-end h-48">
                      <div className="w-full bg-primary rounded-t-lg transition-all group-hover:opacity-80" style={{ height: bar.height }}></div>
                    </div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase">{bar.label}</span>
                  </Link>
                ))}
              </div>
            </div>

            {/* Recommendation Engine */}
            <div className="md:col-span-4 flex flex-col gap-6">
              <div className="bg-gradient-to-br from-primary to-primary-container rounded-xl p-6 text-white shadow-lg flex flex-col h-full justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <span className="material-symbols-outlined text-white/80" data-icon="auto_awesome">auto_awesome</span>
                    <span className="text-xs font-bold uppercase tracking-widest">Next Recommended</span>
                  </div>
                  <h3 className="text-2xl font-bold mb-2">Finance: Risk Management</h3>
                  <p className="text-sm text-primary-fixed/80 font-light leading-relaxed">Based on your recent practice exams, you have a 12% gap in understanding Corporate Liability structures.</p>
                </div>
                <Link to="/database" className="mt-6 w-full py-3 bg-white text-primary font-bold rounded-lg hover:bg-opacity-90 transition-all flex items-center justify-center gap-2">
                  Start Study Set
                  <span className="material-symbols-outlined text-sm" data-icon="arrow_forward">arrow_forward</span>
                </Link>
              </div>
            </div>

            {/* Performance Indicators */}
            <Link to="/database" className="md:col-span-6 bg-surface-container-low rounded-xl p-8 block hover:shadow-md transition-shadow">
              <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
                <span className="material-symbols-outlined text-primary" data-icon="verified">verified</span>
                Performance Indicators
              </h3>
              <div className="space-y-6">
                {[
                  { name: 'Promotion Mix Strategies', pct: 94, color: 'text-tertiary', barColor: 'bg-tertiary' },
                  { name: 'Economic Supply & Demand', pct: 78, color: 'text-primary', barColor: 'bg-primary' },
                  { name: 'Channel Management', pct: 62, color: 'text-primary', barColor: 'bg-primary' },
                  { name: 'Pricing Regulations', pct: 45, color: 'text-primary', barColor: 'bg-primary opacity-60' },
                ].map((pi) => (
                  <div key={pi.name}>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-semibold">{pi.name}</span>
                      <span className={`text-sm font-bold ${pi.color}`}>{pi.pct}% Mastery</span>
                    </div>
                    <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                      <div className={`${pi.barColor} h-full rounded-full`} style={{ width: `${pi.pct}%` }}></div>
                    </div>
                  </div>
                ))}
              </div>
            </Link>

            {/* Stats */}
            <div className="md:col-span-3 grid grid-rows-2 gap-6">
              <div className="bg-surface-container-lowest p-6 rounded-xl border border-slate-100 flex flex-col justify-between">
                <span className="material-symbols-outlined text-slate-400 text-3xl" data-icon="task_alt">task_alt</span>
                <div>
                  <p className="text-3xl font-extrabold text-on-surface">1,240</p>
                  <p className="text-xs text-slate-500 font-bold uppercase tracking-wider">PIs Attempted</p>
                </div>
              </div>
              <div className="bg-surface-container-lowest p-6 rounded-xl border border-slate-100 flex flex-col justify-between">
                <span className="material-symbols-outlined text-tertiary text-3xl" data-icon="military_tech">military_tech</span>
                <div>
                  <p className="text-3xl font-extrabold text-on-surface">8</p>
                  <p className="text-xs text-slate-500 font-bold uppercase tracking-wider">Cluster Certs</p>
                </div>
              </div>
            </div>

            {/* Competency Radar */}
            <div className="md:col-span-3 bg-surface-container-lowest rounded-xl p-6 border border-slate-100 relative overflow-hidden">
              <div className="relative z-10">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Competency Radar</p>
                <div className="aspect-square w-full rounded-full border-4 border-slate-50 flex items-center justify-center">
                  <div className="text-center">
                    <p className="text-4xl font-extrabold text-primary">A-</p>
                    <p className="text-[10px] font-bold text-slate-500">PROJECTED SCORE</p>
                  </div>
                </div>
              </div>
              <div className="absolute inset-0 opacity-5 pointer-events-none">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary via-transparent to-transparent"></div>
              </div>
            </div>
          </div>

          {/* Study Activity Heatmap */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mt-6">
            <div className="md:col-span-8 bg-surface-container-lowest rounded-xl p-8 shadow-sm border border-slate-100/50">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h2 className="text-xl font-bold mb-1">Study Activity</h2>
                  <p className="text-sm text-slate-500">Daily study sessions over the past 4 weeks</p>
                </div>
                <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase">
                  <span>Less</span>
                  <div className="flex gap-1">
                    {['bg-slate-100', 'bg-primary/20', 'bg-primary/40', 'bg-primary/60', 'bg-primary/90'].map((c, i) => (
                      <div key={i} className={`w-3 h-3 rounded-sm ${c}`}></div>
                    ))}
                  </div>
                  <span>More</span>
                </div>
              </div>
              <div className="space-y-2">
                {weeks.map((week, wIdx) => (
                  <div key={wIdx} className="flex items-center gap-2">
                    <span className="text-[10px] font-bold text-slate-400 w-8 text-right">W{wIdx + 1}</span>
                    <div className="flex gap-1.5 flex-1">
                      {week.map((val, dIdx) => (
                        <div key={dIdx} className="flex flex-col items-center gap-1 flex-1">
                          {wIdx === 0 && <span className="text-[9px] font-bold text-slate-400">{weekDays[dIdx]}</span>}
                          <div className={`w-full aspect-square rounded-md ${getHeatColor(val)} transition-colors`} title={`${val} sessions`}></div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-6 flex items-center gap-6 text-sm">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary text-[18px]">local_fire_department</span>
                  <span className="font-bold text-on-surface">32 total sessions</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-tertiary text-[18px]">schedule</span>
                  <span className="font-bold text-on-surface">~45 min avg</span>
                </div>
              </div>
            </div>

            {/* Milestones */}
            <div className="md:col-span-4 bg-surface-container-lowest rounded-xl p-6 shadow-sm border border-slate-100/50">
              <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">flag</span>
                Milestones
              </h3>
              <div className="space-y-4">
                {milestones.map((m, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="mt-0.5">
                      {m.done ? (
                        <span className="material-symbols-outlined text-primary text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                      ) : (
                        <span className="material-symbols-outlined text-slate-300 text-[20px]">radio_button_unchecked</span>
                      )}
                    </div>
                    <div className="flex-1">
                      <p className={`text-sm font-semibold ${m.done ? 'text-on-surface' : 'text-slate-400'}`}>{m.label}</p>
                      <p className="text-[10px] font-bold text-slate-400 uppercase">{m.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Cluster Performance Rings */}
            <div className="md:col-span-12 bg-surface-container-lowest rounded-xl p-8 shadow-sm border border-slate-100/50">
              <div className="flex justify-between items-start mb-8">
                <div>
                  <h2 className="text-xl font-bold mb-1">Cluster Performance</h2>
                  <p className="text-sm text-slate-500">Your mastery level across DECA career clusters</p>
                </div>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
                {clusterData.map((c) => (
                  <div key={c.name} className="text-center">
                    <div className="relative w-24 h-24 mx-auto mb-4">
                      <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                        <circle cx="18" cy="18" r="15.5" fill="none" stroke="#e2e8f0" strokeWidth="3" />
                        <circle cx="18" cy="18" r="15.5" fill="none" stroke={c.color} strokeWidth="3" strokeDasharray={`${c.score} ${100 - c.score}`} strokeLinecap="round" />
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-lg font-extrabold text-on-surface">{c.score}%</span>
                      </div>
                    </div>
                    <p className="text-sm font-bold text-on-surface">{c.name}</p>
                    <p className="text-xs font-bold text-green-600">{c.change}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Time Distribution */}
            <div className="md:col-span-6 bg-surface-container-lowest rounded-xl p-8 shadow-sm border border-slate-100/50">
              <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
                <span className="material-symbols-outlined text-tertiary">timer</span>
                Time Distribution
              </h3>
              <div className="space-y-5">
                {[
                  { label: 'Practice Exams', time: '12h 30m', pct: 40, color: 'bg-primary' },
                  { label: 'PI Flashcards', time: '8h 15m', pct: 26, color: 'bg-tertiary' },
                  { label: 'Roleplay Practice', time: '6h 45m', pct: 22, color: 'bg-primary/60' },
                  { label: 'AI Coach Sessions', time: '3h 50m', pct: 12, color: 'bg-slate-400' },
                ].map((item) => (
                  <div key={item.label}>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-semibold text-on-surface">{item.label}</span>
                      <span className="text-xs font-bold text-slate-500">{item.time}</span>
                    </div>
                    <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                      <div className={`${item.color} h-full rounded-full transition-all duration-500`} style={{ width: `${item.pct}%` }}></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Key Insights */}
            <div className="md:col-span-6 bg-surface-container-lowest rounded-xl p-8 shadow-sm border border-slate-100/50">
              <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">insights</span>
                Key Insights
              </h3>
              <div className="space-y-4">
                <div className="p-4 bg-green-50 rounded-xl border border-green-100">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="material-symbols-outlined text-green-600 text-[18px]">trending_up</span>
                    <span className="text-xs font-bold text-green-700 uppercase tracking-wider">Strongest Area</span>
                  </div>
                  <p className="text-sm font-bold text-green-900">Hospitality & Tourism — 91% mastery</p>
                  <p className="text-xs text-green-700 mt-1">You've excelled in customer service and hotel operations PIs.</p>
                </div>
                <div className="p-4 bg-amber-50 rounded-xl border border-amber-100">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="material-symbols-outlined text-amber-600 text-[18px]">trending_down</span>
                    <span className="text-xs font-bold text-amber-700 uppercase tracking-wider">Needs Focus</span>
                  </div>
                  <p className="text-sm font-bold text-amber-900">Business Admin — 45% mastery</p>
                  <p className="text-xs text-amber-700 mt-1">Focus on Business Law & Ethics and HR Management PIs.</p>
                </div>
                <div className="p-4 bg-blue-50 rounded-xl border border-blue-100">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="material-symbols-outlined text-blue-600 text-[18px]">auto_awesome</span>
                    <span className="text-xs font-bold text-blue-700 uppercase tracking-wider">Recommendation</span>
                  </div>
                  <p className="text-sm font-bold text-blue-900">Increase roleplay practice</p>
                  <p className="text-xs text-blue-700 mt-1">Students who practice 3+ roleplays/week score 15% higher on average.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Footer CTA */}
          <section className="mt-12 p-8 bg-surface-container-low rounded-xl border-t-4 border-primary">
            <div className="flex flex-col md:flex-row justify-between items-center gap-8">
              <div className="flex items-center gap-6">
                <div className="h-16 w-16 bg-white rounded-full flex items-center justify-center shadow-sm">
                  <span className="material-symbols-outlined text-primary text-3xl" data-icon="school" data-weight="fill" style={{ fontVariationSettings: "'FILL' 1" }}>school</span>
                </div>
                <div>
                  <h4 className="text-xl font-bold">DECAprep Roadmap</h4>
                  <p className="text-slate-500 text-sm">You are 4 units away from the International Career Development Conference qualification threshold.</p>
                </div>
              </div>
              <Link to="/clusters" className="px-8 py-3 bg-secondary text-white font-bold rounded-lg hover:bg-on-surface transition-colors whitespace-nowrap">
                View Full Roadmap
              </Link>
            </div>
          </section>
        </div>
      </main>
    </>
  );
}
