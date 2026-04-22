import { useState } from 'react';
import { Link } from 'react-router-dom';
import { roleplayScenarios } from '../data/roleplayData';

export default function RoleplayBank() {
  const [searchQuery, setSearchQuery] = useState('');
  const [clusterFilter, setClusterFilter] = useState('All Clusters');
  const [difficultyFilter, setDifficultyFilter] = useState('All Levels');
  const [expandedId, setExpandedId] = useState(null);

  const clusters = ['All Clusters', ...new Set(roleplayScenarios.map(r => r.cluster))];
  const difficulties = ['All Levels', 'Beginner', 'Intermediate', 'Advanced'];

  const filteredScenarios = roleplayScenarios.filter(rp => {
    const matchesSearch = rp.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      rp.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      rp.role.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCluster = clusterFilter === 'All Clusters' || rp.cluster === clusterFilter;
    const matchesDifficulty = difficultyFilter === 'All Levels' || rp.difficulty === difficultyFilter;
    return matchesSearch && matchesCluster && matchesDifficulty;
  });

  const getDifficultyColor = (d) => {
    switch (d) {
      case 'Beginner': return 'bg-green-50 text-green-700 border-green-100';
      case 'Intermediate': return 'bg-amber-50 text-amber-700 border-amber-100';
      case 'Advanced': return 'bg-red-50 text-red-700 border-red-100';
      default: return 'bg-slate-50 text-slate-600 border-slate-100';
    }
  };

  const getClusterColor = (c) => {
    switch (c) {
      case 'Marketing': return '#0059a4';
      case 'Finance': return '#1a7c5f';
      case 'Hospitality & Tourism': return '#b45309';
      case 'Business Administration': return '#6c5d38';
      case 'Entrepreneurship': return '#7c3aed';
      case 'Personal Financial Literacy': return '#dc2626';
      default: return '#64748b';
    }
  };

  return (
    <>
      <main className="flex-1 lg:ml-64 p-6 md:p-10 min-h-screen">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <section className="mb-12">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div>
                <span className="text-tertiary font-bold tracking-[0.2em] text-[10px] uppercase mb-2 block">Practice Arena</span>
                <h1 className="text-4xl font-extrabold tracking-tight text-on-surface mb-2">Roleplay Bank</h1>
                <p className="text-secondary text-lg max-w-2xl leading-relaxed">Master your presentation skills with realistic business scenarios across all DECA career clusters.</p>
              </div>
              <div className="flex gap-4">
                <div className="text-right">
                  <p className="text-[10px] font-bold text-slate-400 uppercase">Scenarios</p>
                  <p className="text-3xl font-extrabold text-primary">{roleplayScenarios.length}</p>
                </div>
                <div className="w-px h-12 bg-slate-200"></div>
                <div className="text-right">
                  <p className="text-[10px] font-bold text-slate-400 uppercase">Clusters</p>
                  <p className="text-3xl font-extrabold text-on-surface">{clusters.length - 1}</p>
                </div>
              </div>
            </div>
          </section>

          {/* Filters */}
          <section className="bg-surface-container-low rounded-2xl p-6 mb-8 border-b-2 border-primary">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-slate-500 uppercase ml-1">Career Cluster</label>
                <div className="relative">
                  <select
                    value={clusterFilter}
                    onChange={(e) => setClusterFilter(e.target.value)}
                    className="w-full bg-surface-container-lowest border-none rounded-xl text-sm py-3 px-4 shadow-sm appearance-none focus:ring-2 focus:ring-primary/20"
                  >
                    {clusters.map(c => <option key={c}>{c}</option>)}
                  </select>
                  <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">expand_more</span>
                </div>
              </div>
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-slate-500 uppercase ml-1">Difficulty</label>
                <div className="relative">
                  <select
                    value={difficultyFilter}
                    onChange={(e) => setDifficultyFilter(e.target.value)}
                    className="w-full bg-surface-container-lowest border-none rounded-xl text-sm py-3 px-4 shadow-sm appearance-none focus:ring-2 focus:ring-primary/20"
                  >
                    {difficulties.map(d => <option key={d}>{d}</option>)}
                  </select>
                  <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">expand_more</span>
                </div>
              </div>
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-slate-500 uppercase ml-1">Search Scenarios</label>
                <div className="relative">
                  <input
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-surface-container-lowest border-none rounded-xl text-sm py-3 px-4 shadow-sm focus:ring-2 focus:ring-primary/20"
                    placeholder="e.g. marketing, hotel, budget..."
                    type="text"
                  />
                  <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-primary">search</span>
                </div>
              </div>
            </div>
          </section>

          {/* Scenario Cards */}
          {filteredScenarios.length > 0 ? (
            <div className="space-y-4">
              {filteredScenarios.map((rp) => (
                <div
                  key={rp.id}
                  className="bg-surface-container-lowest rounded-xl overflow-hidden border border-slate-100 hover:shadow-md transition-all duration-200"
                >
                  {/* Main row */}
                  <div className="p-6">
                    <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-3 flex-wrap">
                          <span
                            className="text-xs font-bold px-2.5 py-1 rounded-full border"
                            style={{
                              color: getClusterColor(rp.cluster),
                              backgroundColor: `${getClusterColor(rp.cluster)}10`,
                              borderColor: `${getClusterColor(rp.cluster)}30`
                            }}
                          >
                            {rp.cluster}
                          </span>
                          <span className={`text-xs font-bold px-2.5 py-1 rounded-full border ${getDifficultyColor(rp.difficulty)}`}>
                            {rp.difficulty}
                          </span>
                          <span className="text-[10px] font-bold text-slate-400 uppercase">{rp.event}</span>
                        </div>
                        <h3 className="text-lg font-bold text-on-surface mb-2">{rp.title}</h3>
                        <p className="text-sm text-secondary leading-relaxed">{rp.description}</p>
                        <div className="flex items-center gap-4 mt-3">
                          <span className="text-xs text-slate-400 font-medium flex items-center gap-1">
                            <span className="material-symbols-outlined text-[14px]">badge</span>
                            Role: {rp.role}
                          </span>
                          <span className="text-xs text-slate-400 font-medium flex items-center gap-1">
                            <span className="material-symbols-outlined text-[14px]">checklist</span>
                            {rp.performanceIndicators.length} PIs
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 flex-shrink-0">
                        <button
                          onClick={() => setExpandedId(expandedId === rp.id ? null : rp.id)}
                          className="px-4 py-2 border border-slate-200 text-slate-600 text-xs font-bold rounded-lg hover:bg-slate-50 transition-colors flex items-center gap-1"
                        >
                          <span className="material-symbols-outlined text-[16px]">
                            {expandedId === rp.id ? 'expand_less' : 'expand_more'}
                          </span>
                          {expandedId === rp.id ? 'Less' : 'Details'}
                        </button>
                        <Link
                          to={`/roleplay/${rp.id}`}
                          className="btn-primary-gradient text-white text-xs font-bold py-2 px-5 rounded-lg flex items-center gap-2 shadow-lg shadow-primary/20 hover:scale-[1.02] transition-transform"
                        >
                          <span className="material-symbols-outlined text-sm">play_arrow</span>
                          Start Roleplay
                        </Link>
                      </div>
                    </div>
                  </div>

                  {/* Expanded Details */}
                  {expandedId === rp.id && (
                    <div className="px-6 pb-6 border-t border-slate-50">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-5">
                        <div>
                          <h4 className="text-xs font-bold text-primary uppercase tracking-widest mb-2">Full Situation</h4>
                          <p className="text-sm text-secondary leading-relaxed">{rp.situation}</p>
                        </div>
                        <div>
                          <h4 className="text-xs font-bold text-primary uppercase tracking-widest mb-2">Performance Indicators</h4>
                          <div className="flex flex-wrap gap-2">
                            {rp.performanceIndicators.map(pi => (
                              <span key={pi} className="text-[10px] font-bold bg-slate-100 text-slate-500 px-2.5 py-1 rounded-full uppercase tracking-wider">
                                {pi}
                              </span>
                            ))}
                          </div>
                          <h4 className="text-xs font-bold text-primary uppercase tracking-widest mb-2 mt-4">Your Role</h4>
                          <p className="text-sm text-secondary">{rp.role}</p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-surface-container-low rounded-2xl">
              <span className="material-symbols-outlined text-4xl text-slate-400 mb-3 block">search_off</span>
              <h3 className="text-lg font-bold text-on-surface">No scenarios found</h3>
              <p className="text-slate-500 text-sm mt-1">Try adjusting your filters or search terms.</p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setClusterFilter('All Clusters');
                  setDifficultyFilter('All Levels');
                }}
                className="mt-4 px-4 py-2 border border-slate-300 text-slate-600 rounded-lg hover:bg-slate-50 text-sm font-bold"
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>
      </main>
    </>
  );
}
