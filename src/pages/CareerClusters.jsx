import { Link } from 'react-router-dom';
import { careerClusters } from '../data/onboardingData';
import { performanceIndicators } from '../data/mockData';

export default function CareerClusters() {
  return (
    <>
      <main className="flex-1 lg:ml-64 p-6 md:p-10 min-h-screen">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <section className="mb-12">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div>
                <span className="text-tertiary font-bold tracking-[0.2em] text-[10px] uppercase mb-2 block">Explore</span>
                <h1 className="text-4xl font-extrabold tracking-tight text-on-surface mb-2">Career Clusters</h1>
                <p className="text-secondary text-lg max-w-2xl leading-relaxed">Choose your pathway. Each DECA career cluster aligns with specific competitive events and performance indicators.</p>
              </div>
              <div className="flex gap-4">
                <div className="text-right">
                  <p className="text-[10px] font-bold text-slate-400 uppercase">Clusters</p>
                  <p className="text-3xl font-extrabold text-primary">{careerClusters.length}</p>
                </div>
                <div className="w-px h-12 bg-slate-200"></div>
                <div className="text-right">
                  <span className="text-[10px] font-bold text-slate-400 uppercase">Total PIs</span>
                  <p className="text-3xl font-extrabold text-on-surface">{performanceIndicators.length}</p>
                </div>
              </div>
            </div>
          </section>

          {/* Cluster Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {careerClusters.map((cluster) => (
              <Link
                key={cluster.id}
                to={`/database?cluster=${encodeURIComponent(cluster.name)}`}
                className="group bg-surface-container-lowest rounded-2xl p-6 hover:shadow-xl hover:shadow-primary/5 transition-all duration-300 relative overflow-hidden border border-slate-100 card-hover"
              >
                {/* Color accent bar */}
                <div className="absolute top-0 left-0 right-0 h-1 rounded-t-2xl" style={{ backgroundColor: cluster.color }}></div>
                
                <div className="flex items-start justify-between mb-4 mt-2">
                  <div className="h-12 w-12 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${cluster.color}15` }}>
                    <span className="material-symbols-outlined text-2xl" style={{ color: cluster.color }}>{cluster.icon}</span>
                  </div>
                  <span className="material-symbols-outlined text-slate-300 group-hover:text-primary transition-colors">arrow_forward</span>
                </div>

                <h3 className="text-lg font-bold text-on-surface mb-2 group-hover:text-primary transition-colors">{cluster.name}</h3>
                <p className="text-sm text-secondary leading-relaxed mb-6">{cluster.description}</p>

                <div className="flex items-center justify-between pt-4 border-t border-slate-50">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1.5">
                      <span className="material-symbols-outlined text-[16px] text-slate-400">checklist</span>
                      <span className="text-xs font-bold text-slate-500">{cluster.piCount} PIs</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="material-symbols-outlined text-[16px] text-slate-400">event</span>
                      <span className="text-xs font-bold text-slate-500">{cluster.events.length} Events</span>
                    </div>
                  </div>
                </div>

                {/* Events preview */}
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {cluster.events.slice(0, 3).map((event) => (
                    <span key={event} className="text-[10px] font-medium bg-slate-50 text-slate-500 px-2 py-1 rounded-full">{event}</span>
                  ))}
                  {cluster.events.length > 3 && (
                    <span className="text-[10px] font-medium bg-slate-50 text-slate-400 px-2 py-1 rounded-full">+{cluster.events.length - 3} more</span>
                  )}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>
    </>
  );
}
