import { Link } from 'react-router-dom';

export default function StudentDashboard() {
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
<Link to="/analytics" className="text-slate-400 hover:text-primary transition-colors">
<span className="material-symbols-outlined" data-icon="more_horiz">more_horiz</span>
</Link>
</div>
<div className="relative h-64 w-full flex items-end justify-between px-4">
{/* Simulated Chart */}
<Link to="/clusters" className="flex flex-col items-center gap-2 group w-full cursor-pointer">
<div className="w-full bg-primary/10 rounded-t-lg relative flex items-end h-48">
<div className="w-full bg-primary rounded-t-lg transition-all group-hover:opacity-80" style={{ height: "85%" }}></div>
</div>
<span className="text-[10px] font-bold text-slate-400 uppercase">Marketing</span>
</Link>
<Link to="/clusters" className="flex flex-col items-center gap-2 group w-full px-2 cursor-pointer">
<div className="w-full bg-primary/10 rounded-t-lg relative flex items-end h-48">
<div className="w-full bg-primary rounded-t-lg transition-all group-hover:opacity-80" style={{ height: "60%" }}></div>
</div>
<span className="text-[10px] font-bold text-slate-400 uppercase">Finance</span>
</Link>
<Link to="/clusters" className="flex flex-col items-center gap-2 group w-full px-2 cursor-pointer">
<div className="w-full bg-primary/10 rounded-t-lg relative flex items-end h-48">
<div className="w-full bg-primary rounded-t-lg transition-all group-hover:opacity-80" style={{ height: "40%" }}></div>
</div>
<span className="text-[10px] font-bold text-slate-400 uppercase">Bus. Admin</span>
</Link>
<Link to="/clusters" className="flex flex-col items-center gap-2 group w-full px-2 cursor-pointer">
<div className="w-full bg-primary/10 rounded-t-lg relative flex items-end h-48">
<div className="w-full bg-primary rounded-t-lg transition-all group-hover:opacity-80" style={{ height: "92%" }}></div>
</div>
<span className="text-[10px] font-bold text-slate-400 uppercase">Hospitality</span>
</Link>
<Link to="/clusters" className="flex flex-col items-center gap-2 group w-full px-2 cursor-pointer">
<div className="w-full bg-primary/10 rounded-t-lg relative flex items-end h-48">
<div className="w-full bg-primary rounded-t-lg transition-all group-hover:opacity-80" style={{ height: "75%" }}></div>
</div>
<span className="text-[10px] font-bold text-slate-400 uppercase">Entrepreneur</span>
</Link>
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
{/* Mastery Levels Column */}
<Link to="/database" className="md:col-span-6 bg-surface-container-low rounded-xl p-8 block hover:shadow-md transition-shadow">
<h3 className="text-lg font-bold mb-6 flex items-center gap-2">
<span className="material-symbols-outlined text-primary" data-icon="verified">verified</span>
                        Performance Indicators
                    </h3>
<div className="space-y-6">
<div>
<div className="flex justify-between items-center mb-2">
<span className="text-sm font-semibold">Promotion Mix Strategies</span>
<span className="text-sm font-bold text-tertiary">94% Mastery</span>
</div>
<div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
<div className="bg-tertiary h-full rounded-full" style={{ width: "94%" }}></div>
</div>
</div>
<div>
<div className="flex justify-between items-center mb-2">
<span className="text-sm font-semibold">Economic Supply &amp; Demand</span>
<span className="text-sm font-bold text-primary">78% Mastery</span>
</div>
<div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
<div className="bg-primary h-full rounded-full" style={{ width: "78%" }}></div>
</div>
</div>
<div>
<div className="flex justify-between items-center mb-2">
<span className="text-sm font-semibold">Channel Management</span>
<span className="text-sm font-bold text-primary">62% Mastery</span>
</div>
<div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
<div className="bg-primary h-full rounded-full" style={{ width: "62%" }}></div>
</div>
</div>
<div>
<div className="flex justify-between items-center mb-2">
<span className="text-sm font-semibold">Pricing Regulations</span>
<span className="text-sm font-bold text-primary">45% Mastery</span>
</div>
<div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
<div className="bg-primary h-full rounded-full opacity-60" style={{ width: "45%" }}></div>
</div>
</div>
</div>
</Link>
{/* Stats & Progress Bento Items */}
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
<div className="md:col-span-3 bg-surface-container-lowest rounded-xl p-6 border border-slate-100 relative overflow-hidden group">
<div className="relative z-10">
<p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Competency Radar</p>
<div className="aspect-square w-full rounded-full border-4 border-slate-50 flex items-center justify-center">
<div className="text-center">
<p className="text-4xl font-extrabold text-primary">A-</p>
<p className="text-[10px] font-bold text-slate-500">PROJECTED SCORE</p>
</div>
</div>
</div>
{/* Background texture */}
<div className="absolute inset-0 opacity-5 pointer-events-none">
<div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary via-transparent to-transparent"></div>
</div>
</div>
</div>
{/* Footer Stats Action */}
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
<Link to="/analytics" className="px-8 py-3 bg-secondary text-white font-bold rounded-lg hover:bg-on-surface transition-colors whitespace-nowrap">
                        View Full Roadmap
                    </Link>
</div>
</section>
</div>
</main>
    </>
  );
}
