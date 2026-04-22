import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

export default function Home() {
  const [greeting, setGreeting] = useState('');
  const [animateIn, setAnimateIn] = useState(false);

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting('Good morning');
    else if (hour < 17) setGreeting('Good afternoon');
    else setGreeting('Good evening');
    const timer = setTimeout(() => setAnimateIn(true), 50);
    return () => clearTimeout(timer);
  }, []);

  const quickActions = [
    { title: 'Study PIs', description: 'Browse and master Performance Indicators across all clusters', icon: 'menu_book', to: '/database', gradient: 'from-blue-600 to-blue-400', shadow: 'shadow-blue-500/25' },
    { title: 'Practice Exams', description: 'Take timed exams to test your knowledge before competition', icon: 'quiz', to: '/simulation', gradient: 'from-violet-600 to-purple-400', shadow: 'shadow-violet-500/25' },
    { title: 'Roleplays', description: 'Practice real business scenarios and sharpen presentation skills', icon: 'theater_comedy', to: '/roleplays', gradient: 'from-amber-600 to-orange-400', shadow: 'shadow-amber-500/25' },
    { title: 'AI Coach', description: 'Get instant answers and feedback from your personal DECA AI tutor', icon: 'psychology', to: '/coach', gradient: 'from-emerald-600 to-teal-400', shadow: 'shadow-emerald-500/25' },
  ];

  const recentActivity = [
    { label: 'Marketing Cluster Exam', detail: 'Scored 85% — 17/20 correct', time: '2 hours ago', icon: 'assignment_turned_in', color: 'text-green-600' },
    { label: 'Finance: Risk Management', detail: 'Completed 12 flashcards', time: '5 hours ago', icon: 'school', color: 'text-primary' },
    { label: 'The Local Organic Cafe', detail: 'Roleplay practice session', time: 'Yesterday', icon: 'record_voice_over', color: 'text-amber-600' },
    { label: 'AI Coach Session', detail: 'Discussed pricing strategies', time: 'Yesterday', icon: 'smart_toy', color: 'text-violet-600' },
  ];

  const upcomingEvents = [
    { name: 'District Competition', date: 'Nov 15, 2025', daysAway: 12 },
    { name: 'State Career Development Conference', date: 'Feb 22, 2026', daysAway: 111 },
    { name: 'ICDC — International Conference', date: 'Apr 25, 2026', daysAway: 173 },
  ];

  return (
    <>
      <main className="flex-1 lg:ml-64 p-6 md:p-10 min-h-screen relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-br from-primary/5 via-primary/3 to-transparent rounded-full blur-3xl -translate-y-1/2 translate-x-1/4 pointer-events-none"></div>
        <div className="absolute bottom-0 left-64 w-[400px] h-[400px] bg-gradient-to-tr from-tertiary/5 via-transparent to-transparent rounded-full blur-3xl translate-y-1/3 pointer-events-none"></div>

        <div className={`max-w-6xl mx-auto transition-all duration-700 ${animateIn ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          {/* Hero */}
          <section className="mb-12">
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary via-blue-600 to-primary-container p-8 md:p-12 text-white shadow-xl shadow-primary/15">
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/3"></div>
              <div className="absolute bottom-0 left-1/3 w-32 h-32 bg-white/5 rounded-full translate-y-1/2"></div>
              <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-8">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="material-symbols-outlined text-white/70 text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>local_fire_department</span>
                    <span className="text-xs font-bold uppercase tracking-[0.2em] text-white/70">14 day streak</span>
                  </div>
                  <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-3 leading-tight">{greeting}, <span className="text-white/90">Student</span></h1>
                  <p className="text-lg text-blue-100/90 max-w-xl leading-relaxed">You're making great progress. Keep up the momentum — you're just 4 units away from ICDC qualification.</p>
                </div>
                <div className="flex gap-4 flex-shrink-0">
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl px-5 py-4 text-center border border-white/10">
                    <p className="text-3xl font-extrabold tabular-nums">82%</p>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-white/60 mt-1">Mastery</p>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl px-5 py-4 text-center border border-white/10">
                    <p className="text-3xl font-extrabold tabular-nums">1,240</p>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-white/60 mt-1">PIs Done</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Quick Actions */}
          <section className="mb-12">
            <div className="flex items-center gap-3 mb-6">
              <span className="material-symbols-outlined text-primary">bolt</span>
              <h2 className="text-xl font-extrabold text-on-surface tracking-tight">Quick Actions</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {quickActions.map((action, i) => (
                <Link key={action.title} to={action.to} className={`group relative overflow-hidden rounded-xl p-6 bg-surface-container-lowest border border-slate-100/60 hover:border-transparent transition-all duration-300 hover:shadow-xl ${action.shadow} hover:-translate-y-1`} style={{ transitionDelay: `${i * 50}ms` }}>
                  <div className={`absolute inset-0 bg-gradient-to-br ${action.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></div>
                  <div className="relative z-10">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${action.gradient} flex items-center justify-center mb-4 shadow-lg ${action.shadow} group-hover:bg-white/20 group-hover:shadow-none transition-all`}>
                      <span className="material-symbols-outlined text-white text-[22px]">{action.icon}</span>
                    </div>
                    <h3 className="text-base font-bold text-on-surface group-hover:text-white transition-colors mb-1">{action.title}</h3>
                    <p className="text-xs text-slate-500 group-hover:text-white/80 transition-colors leading-relaxed">{action.description}</p>
                    <div className="mt-4 flex items-center gap-1 text-xs font-bold text-primary group-hover:text-white transition-colors">
                      <span>Get Started</span>
                      <span className="material-symbols-outlined text-[16px] group-hover:translate-x-1 transition-transform">arrow_forward</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-12">
            {/* Recent Activity */}
            <div className="lg:col-span-7 bg-surface-container-lowest rounded-xl p-6 shadow-sm border border-slate-100/50">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-bold flex items-center gap-2"><span className="material-symbols-outlined text-primary">history</span>Recent Activity</h3>
                <Link to="/analytics" className="text-xs font-bold text-primary hover:underline uppercase tracking-wider">View All</Link>
              </div>
              <div className="space-y-3">
                {recentActivity.map((item, i) => (
                  <div key={i} className="flex items-start gap-4 p-3 rounded-lg hover:bg-surface-container-low transition-colors">
                    <div className="w-10 h-10 rounded-lg bg-slate-50 flex items-center justify-center flex-shrink-0">
                      <span className={`material-symbols-outlined ${item.color} text-[20px]`}>{item.icon}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-bold text-on-surface truncate">{item.label}</p>
                      <p className="text-xs text-slate-500">{item.detail}</p>
                    </div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider whitespace-nowrap">{item.time}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Sidebar: Goal + Events */}
            <div className="lg:col-span-5 flex flex-col gap-6">
              <div className="bg-surface-container-lowest rounded-xl p-6 shadow-sm border border-slate-100/50">
                <h3 className="text-lg font-bold flex items-center gap-2 mb-4"><span className="material-symbols-outlined text-tertiary">target</span>Today's Goal</h3>
                <div className="flex items-center gap-4 mb-4">
                  <div className="relative w-20 h-20 flex-shrink-0">
                    <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                      <circle cx="18" cy="18" r="15.5" fill="none" stroke="#e2e8f0" strokeWidth="2.5" />
                      <circle cx="18" cy="18" r="15.5" fill="none" stroke="currentColor" className="text-primary" strokeWidth="2.5" strokeDasharray="65 35" strokeLinecap="round" />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center"><span className="text-lg font-extrabold text-on-surface">65%</span></div>
                  </div>
                  <div>
                    <p className="text-sm font-bold text-on-surface">13 of 20 PIs reviewed</p>
                    <p className="text-xs text-slate-500 mt-1">7 more to hit your daily target</p>
                    <Link to="/database" className="inline-flex items-center gap-1 mt-2 text-xs font-bold text-primary hover:underline">Continue studying<span className="material-symbols-outlined text-[14px]">arrow_forward</span></Link>
                  </div>
                </div>
              </div>
              <div className="bg-surface-container-lowest rounded-xl p-6 shadow-sm border border-slate-100/50 flex-1">
                <h3 className="text-lg font-bold flex items-center gap-2 mb-4"><span className="material-symbols-outlined text-primary">event</span>Upcoming Events</h3>
                <div className="space-y-4">
                  {upcomingEvents.map((evt, i) => (
                    <div key={i} className="flex items-center gap-4">
                      <div className={`w-12 h-12 rounded-xl flex flex-col items-center justify-center flex-shrink-0 ${i === 0 ? 'bg-primary/10 text-primary' : 'bg-slate-50 text-slate-400'}`}>
                        <span className="material-symbols-outlined text-[20px]">calendar_today</span>
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-bold text-on-surface">{evt.name}</p>
                        <p className="text-xs text-slate-500">{evt.date}</p>
                      </div>
                      <div className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${i === 0 ? 'bg-primary/10 text-primary' : 'bg-slate-100 text-slate-400'}`}>{evt.daysAway}d</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* CTA */}
          <section className="mb-8">
            <div className="bg-gradient-to-r from-surface-container-low to-surface-container-lowest rounded-xl p-8 border-l-4 border-primary flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-5">
                <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center shadow-sm flex-shrink-0">
                  <span className="material-symbols-outlined text-primary text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>rocket_launch</span>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-on-surface">Ready for your next challenge?</h3>
                  <p className="text-sm text-slate-500">Take a practice exam to see how you stack up against the competition.</p>
                </div>
              </div>
              <Link to="/simulation" className="px-8 py-3 bg-gradient-to-br from-primary to-primary-container text-white font-bold rounded-lg shadow-md hover:opacity-90 active:scale-[0.98] transition-all whitespace-nowrap flex items-center gap-2">
                Start Practice Exam
                <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
              </Link>
            </div>
          </section>
        </div>
      </main>
    </>
  );
}
