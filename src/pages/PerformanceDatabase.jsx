import { useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { performanceIndicators } from '../data/mockData';

export default function PerformanceDatabase() {
  const [searchParams] = useSearchParams();
  const initialCluster = searchParams.get('cluster') || 'All Clusters';

  const [searchQuery, setSearchQuery] = useState('');
  const [clusterFilter, setClusterFilter] = useState(initialCluster);
  const [topicFilter, setTopicFilter] = useState('All Topics');
  const [difficultyFilter, setDifficultyFilter] = useState('All Levels');

  const filteredPIs = performanceIndicators.filter(pi => {
    const matchesSearch = pi.title.toLowerCase().includes(searchQuery.toLowerCase()) || pi.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCluster = clusterFilter === 'All Clusters' || pi.cluster === clusterFilter;
    const matchesTopic = topicFilter === 'All Topics' || pi.topic === topicFilter;
    let matchesDifficulty = true;
    if (difficultyFilter !== 'All Levels') {
      const difficultyLower = difficultyFilter.toLowerCase();
      matchesDifficulty = difficultyLower.includes(pi.difficulty.toLowerCase());
    }
    return matchesSearch && matchesCluster && matchesTopic && matchesDifficulty;
  });

  const getCardBorderColor = (color) => {
    switch(color) {
      case 'tertiary': return 'border-tertiary';
      case 'orange': return 'border-orange-200';
      case 'slate': return 'border-slate-300';
      default: return 'border-slate-100';
    }
  };

  const getMasteryColorClass = (mastery, color) => {
    if (mastery === 'None') return 'bg-slate-100 text-slate-400';
    if (color === 'tertiary') return 'bg-tertiary/10 text-on-tertiary-container border-tertiary/20';
    if (color === 'orange') return 'bg-orange-50 text-orange-700 border-orange-100';
    return 'bg-slate-100 text-slate-600 border-slate-200';
  };

  return (
    <>
      <main className="flex-1 lg:ml-64 p-8 min-h-screen">
        <div className="max-w-6xl mx-auto">
          {/* Editorial Header Section */}
          <section className="mb-12">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div>
                <span className="text-tertiary font-bold tracking-[0.2em] text-[10px] uppercase mb-2 block">Knowledge Repository</span>
                <h1 className="text-4xl font-extrabold tracking-tight text-on-surface mb-2">Performance Indicator Database</h1>
                <p className="text-secondary text-lg max-w-2xl leading-relaxed">The architectural foundation for your competitive success. Access and master {performanceIndicators.length} performance metrics curated for the modern professional.</p>
              </div>
              <div className="flex gap-4">
                <div className="text-right">
                  <p className="text-[10px] font-bold text-slate-400 uppercase">Mastery Index</p>
                  <p className="text-3xl font-extrabold text-primary">64%</p>
                </div>
                <div className="w-px h-12 bg-slate-200"></div>
                <div className="text-right">
                  <p className="text-[10px] font-bold text-slate-400 uppercase">Total PIs</p>
                  <p className="text-3xl font-extrabold text-on-surface">{performanceIndicators.length}</p>
                </div>
              </div>
            </div>
          </section>

          {/* Architectural Filtering System */}
          <section className="bg-surface-container-low rounded-2xl p-6 mb-8 border-b-2 border-primary">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-slate-500 uppercase ml-1">Career Cluster</label>
                <div className="relative">
                  <select 
                    value={clusterFilter}
                    onChange={(e) => setClusterFilter(e.target.value)}
                    className="w-full bg-surface-container-lowest border-none rounded-xl text-sm py-3 px-4 shadow-sm appearance-none focus:ring-2 focus:ring-primary/20"
                  >
                    <option>All Clusters</option>
                    <option>Marketing</option>
                    <option>Finance</option>
                    <option>Hospitality</option>
                    <option>BMA</option>
                    <option>Entrepreneurship</option>
                    <option>Personal Finance</option>
                  </select>
                  <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">expand_more</span>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-slate-500 uppercase ml-1">Topic Area</label>
                <div className="relative">
                  <select 
                    value={topicFilter}
                    onChange={(e) => setTopicFilter(e.target.value)}
                    className="w-full bg-surface-container-lowest border-none rounded-xl text-sm py-3 px-4 shadow-sm appearance-none focus:ring-2 focus:ring-primary/20"
                  >
                    <option>All Topics</option>
                    {Array.from(new Set(performanceIndicators.map(pi => pi.topic))).sort().map(topic => (
                      <option key={topic}>{topic}</option>
                    ))}
                  </select>
                  <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">expand_more</span>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-slate-500 uppercase ml-1">Difficulty Level</label>
                <div className="relative">
                  <select 
                    value={difficultyFilter}
                    onChange={(e) => setDifficultyFilter(e.target.value)}
                    className="w-full bg-surface-container-lowest border-none rounded-xl text-sm py-3 px-4 shadow-sm appearance-none focus:ring-2 focus:ring-primary/20"
                  >
                    <option>All Levels</option>
                    <option>Beginner (Core)</option>
                    <option>Intermediate (Prerequisite)</option>
                    <option>Advanced (Specialist)</option>
                  </select>
                  <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">expand_more</span>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-slate-500 uppercase ml-1">Search Keywords</label>
                <div className="relative">
                  <input 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-surface-container-lowest border-none rounded-xl text-sm py-3 px-4 shadow-sm focus:ring-2 focus:ring-primary/20" 
                    placeholder="e.g. MK:015" 
                    type="text"
                  />
                  <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-primary">manage_search</span>
                </div>
              </div>
            </div>
          </section>

          {/* Data Grid (PI Cards) */}
          {filteredPIs.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPIs.map((pi) => (
                <div key={pi.id} className={`group bg-surface-container-lowest rounded-2xl p-6 hover:shadow-xl hover:shadow-primary/5 transition-all duration-300 relative overflow-hidden border-t-4 ${getCardBorderColor(pi.color)}`}>
                  <div className="flex justify-between items-start mb-6">
                    <span className="text-[10px] font-bold bg-slate-100 text-slate-500 px-2 py-1 rounded uppercase tracking-wider">{pi.id}</span>
                    <div className={`flex items-center gap-1.5 px-2 py-1 rounded-full border ${getMasteryColorClass(pi.mastery, pi.color)}`}>
                      <span className="material-symbols-outlined text-[14px]" style={{ fontVariationSettings: pi.fill0 ? "'FILL' 0" : "'FILL' 1" }}>{pi.icon}</span>
                      <span className="text-[10px] font-bold uppercase tracking-tight">Mastery: {pi.mastery}</span>
                    </div>
                  </div>
                  
                  <h3 className="text-lg font-bold text-on-surface mb-3 leading-snug group-hover:text-primary transition-colors">{pi.title}</h3>
                  
                  <div className="flex items-center gap-2 mb-8">
                    <span className="text-[11px] font-medium text-slate-500 flex items-center gap-1">
                      <span className="material-symbols-outlined text-[16px]">category</span>
                      {pi.cluster}
                    </span>
                    <span className="text-[11px] font-medium text-slate-500 flex items-center gap-1">
                      <span className="material-symbols-outlined text-[16px]">bar_chart</span>
                      {pi.difficulty}
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between pt-4 border-t border-slate-50">
                    <Link to="/coach" className="btn-primary-gradient text-white text-xs font-bold py-2 px-5 rounded-lg flex items-center gap-2 shadow-lg shadow-primary/20 hover:scale-[1.02] transition-transform">
                      <span className="material-symbols-outlined text-sm">psychology</span>
                      Study Now
                    </Link>
                    <button className="p-2 text-slate-400 hover:text-primary transition-colors">
                      <span className="material-symbols-outlined">bookmark</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-surface-container-low rounded-2xl">
              <span className="material-symbols-outlined text-4xl text-slate-400 mb-3">search_off</span>
              <h3 className="text-lg font-bold text-on-surface">No results found</h3>
              <p className="text-slate-500 text-sm mt-1">Try adjusting your filters or search terms.</p>
              <button 
                onClick={() => {
                  setSearchQuery('');
                  setClusterFilter('All Clusters');
                  setTopicFilter('All Topics');
                  setDifficultyFilter('All Levels');
                }}
                className="mt-4 px-4 py-2 border border-slate-300 text-slate-600 rounded-lg hover:bg-slate-50 text-sm font-bold"
              >
                Clear Filters
              </button>
            </div>
          )}

          {/* Results count */}
          {filteredPIs.length > 0 && (
            <div className="mt-8 text-center">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.3em]">
                Showing {filteredPIs.length} of {performanceIndicators.length} performance indicators
              </p>
            </div>
          )}
        </div>
      </main>
    </>
  );
}
