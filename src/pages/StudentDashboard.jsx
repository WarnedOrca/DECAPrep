import { Link } from 'react-router-dom';

const clusterStats = [
  { label: 'Marketing', value: 85 },
  { label: 'Finance', value: 60 },
  { label: 'Bus. Admin', value: 40 },
  { label: 'Hospitality', value: 92 },
  { label: 'Entrepreneur', value: 75 },
];

const masteryLevels = [
  { title: 'Promotion Mix Strategies', value: 94, color: 'bg-tertiary' },
  { title: 'Economic Supply & Demand', value: 78, color: 'bg-primary' },
  { title: 'Channel Management', value: 62, color: 'bg-primary' },
  { title: 'Pricing Regulations', value: 45, color: 'bg-primary/60' },
];

export default function StudentDashboard() {
  return (
    <main className="page-shell px-4 pb-24 pt-8 md:px-8 lg:ml-72 lg:px-10">
      <div className="content-wrap">
        <section className="mb-8 flex flex-col gap-6 xl:flex-row xl:items-end xl:justify-between">
          <div className="max-w-3xl">
            <span className="eyebrow mb-3 block">Performance Overview</span>
            <h1 className="font-headline text-4xl font-extrabold tracking-tight text-slate-950 md:text-5xl">
              Track the right work and move faster through DECA prep.
            </h1>
            <p className="mt-4 text-base leading-7 text-slate-600 md:text-lg">
              See where you are strongest, what still needs repetition, and which study move should come next without bouncing between extra screens.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 xl:min-w-[30rem]">
            <div className="stat-chip">
              <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-slate-400">Study Streak</p>
              <p className="mt-2 text-2xl font-extrabold text-primary">14 Days</p>
            </div>
            <div className="stat-chip">
              <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-slate-400">Mastery Rate</p>
              <p className="mt-2 text-2xl font-extrabold text-primary">82%</p>
            </div>
            <div className="stat-chip">
              <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-slate-400">PIs Attempted</p>
              <p className="mt-2 text-2xl font-extrabold text-slate-900">1,240</p>
            </div>
            <div className="stat-chip">
              <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-slate-400">Cluster Certs</p>
              <p className="mt-2 text-2xl font-extrabold text-slate-900">8</p>
            </div>
          </div>
        </section>

        <section className="grid grid-cols-1 gap-6 xl:grid-cols-12">
          <div className="surface-card rounded-[1.75rem] p-6 md:p-8 xl:col-span-8">
            <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
              <div className="max-w-2xl">
                <h2 className="font-headline text-2xl font-extrabold text-slate-950">Strength vs weakness analysis</h2>
                <p className="mt-2 text-sm leading-6 text-slate-500">
                  A simple snapshot of which clusters are carrying you and which ones should drive your next study session.
                </p>
              </div>
              <Link className="btn-secondary text-sm" to="/database">
                Review indicators
              </Link>
            </div>

            <div className="grid grid-cols-2 gap-4 md:grid-cols-5">
              {clusterStats.map((item) => (
                <div key={item.label} className="surface-panel rounded-[1.4rem] p-4">
                  <div className="mb-4 flex h-48 items-end rounded-[1rem] bg-primary/10 p-3">
                    <div
                      className="w-full rounded-[0.8rem] bg-gradient-to-t from-primary to-primary-container"
                      style={{ height: `${item.value}%` }}
                    />
                  </div>
                  <div className="space-y-2">
                    <span className="block text-[11px] font-bold uppercase leading-4 tracking-[0.18em] text-slate-500">
                      {item.label}
                    </span>
                    <span className="block text-2xl font-extrabold text-primary">{item.value}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative isolate overflow-hidden rounded-[1.75rem] bg-[linear-gradient(145deg,#0b4f93_0%,#116fc6_58%,#2a8be0_100%)] p-6 text-white shadow-xl shadow-primary/20 xl:col-span-4">
            <div className="absolute inset-0 opacity-25 [background-image:linear-gradient(rgba(255,255,255,0.22)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.22)_1px,transparent_1px)] [background-size:2rem_2rem]" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.18),_transparent_38%)]" />
            <div className="relative z-10 flex h-full flex-col justify-between">
              <div>
                <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.22em] text-white/80">
                <span className="material-symbols-outlined text-base">auto_awesome</span>
                Next Recommended
                </div>
                <h3 className="max-w-xs font-headline text-3xl font-extrabold leading-tight text-white">Finance: Risk Management</h3>
                <p className="mt-4 max-w-sm text-sm leading-7 text-white/86">
                  Recent results show the biggest gap is corporate liability structure. One focused review set here should give you the fastest score gain.
                </p>
              </div>

              <div className="relative z-10 mt-8">
                <Link className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-white px-5 py-4 text-sm font-bold text-slate-950 shadow-lg shadow-slate-900/10 transition hover:-translate-y-0.5" to="/database">
                  Start Study Set
                  <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </Link>
              </div>
            </div>
          </div>

          <div className="surface-card rounded-[1.75rem] p-6 md:p-8 xl:col-span-7">
            <div className="mb-6 flex items-center gap-3">
              <span className="material-symbols-outlined text-primary">verified</span>
              <h3 className="font-headline text-2xl font-extrabold text-slate-950">Performance indicators</h3>
            </div>

            <div className="space-y-5">
              {masteryLevels.map((item) => (
                <div key={item.title}>
                  <div className="mb-2 flex items-center justify-between gap-4">
                    <span className="text-sm font-semibold text-slate-800">{item.title}</span>
                    <span className="text-sm font-bold text-primary">{item.value}% Mastery</span>
                  </div>
                  <div className="h-2.5 overflow-hidden rounded-full bg-slate-200">
                    <div className={`h-full rounded-full ${item.color}`} style={{ width: `${item.value}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="surface-card relative overflow-hidden rounded-[1.75rem] p-6 xl:col-span-5">
            <p className="eyebrow mb-4">Competency Radar</p>
            <div className="relative z-10 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
              <div className="flex h-44 w-44 shrink-0 items-center justify-center rounded-[2rem] border-[10px] border-primary/10 bg-white shadow-inner">
                <div className="text-center">
                  <p className="font-headline text-5xl font-extrabold text-primary">A-</p>
                  <p className="mt-2 text-[11px] font-bold uppercase tracking-[0.2em] text-slate-400">Projected Score</p>
                </div>
              </div>

              <div className="max-w-sm space-y-4">
                <p className="text-sm leading-7 text-slate-600">
                  You are four units away from the ICDC qualification threshold. Your best gains are coming from short review blocks followed by timed exam reps.
                </p>
                <div className="flex flex-wrap gap-3">
                  <Link className="btn-primary text-sm" to="/simulation">
                    Open Exam Modes
                  </Link>
                </div>
              </div>
            </div>
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(0,114,206,0.16),_transparent_38%)]" />
          </div>
        </section>

        <section className="surface-card mt-8 flex flex-col gap-6 rounded-[1.75rem] border-l-4 border-primary p-6 md:flex-row md:items-center md:justify-between md:p-8">
          <div className="flex items-start gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary text-white shadow-lg shadow-primary/20">
              <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>
                school
              </span>
            </div>
            <div>
              <h4 className="font-headline text-2xl font-extrabold text-slate-950">Keep the momentum going</h4>
              <p className="mt-2 max-w-2xl text-sm leading-7 text-slate-600">
                Pair a short study refresh with either guided practice or an official-style timed run while the weak concepts are still fresh.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            <Link className="btn-secondary text-sm" to="/database">
              View Roadmap
            </Link>
            <Link className="btn-primary text-sm" to="/simulation">
              Choose Exam Mode
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
