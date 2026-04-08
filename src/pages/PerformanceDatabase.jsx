import { useState } from 'react';
import { Link } from 'react-router-dom';
import { performanceIndicators } from '../data/mockData';

export default function PerformanceDatabase() {
  const [searchQuery, setSearchQuery] = useState('');
  const [clusterFilter, setClusterFilter] = useState('All Clusters');
  const [topicFilter, setTopicFilter] = useState('All Topics');
  const [difficultyFilter, setDifficultyFilter] = useState('All Levels');

  const filteredPIs = performanceIndicators.filter((pi) => {
    const query = searchQuery.toLowerCase();
    const matchesSearch =
      pi.title.toLowerCase().includes(query) || pi.id.toLowerCase().includes(query);
    const matchesCluster = clusterFilter === 'All Clusters' || pi.cluster === clusterFilter;
    const matchesTopic = topicFilter === 'All Topics' || pi.topic === topicFilter;
    const matchesDifficulty =
      difficultyFilter === 'All Levels' || difficultyFilter.toLowerCase().includes(pi.difficulty.toLowerCase());

    return matchesSearch && matchesCluster && matchesTopic && matchesDifficulty;
  });

  const resetFilters = () => {
    setSearchQuery('');
    setClusterFilter('All Clusters');
    setTopicFilter('All Topics');
    setDifficultyFilter('All Levels');
  };

  return (
    <main className="page-shell px-4 pb-24 pt-8 md:px-8 lg:ml-72 lg:px-10">
      <div className="content-wrap">
        <section className="mb-8 flex flex-col gap-6 xl:flex-row xl:items-end xl:justify-between">
          <div className="max-w-3xl">
            <span className="eyebrow mb-3 block">Knowledge Repository</span>
            <h1 className="font-headline text-4xl font-extrabold tracking-tight text-slate-950 md:text-5xl">
              Performance indicator database
            </h1>
            <p className="mt-4 text-base leading-7 text-slate-600 md:text-lg">
              Search, filter, and jump straight into the exact indicators that need work without digging through a cluttered screen.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            <div className="stat-chip">
              <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-slate-400">Mastery Index</p>
              <p className="mt-2 text-2xl font-extrabold text-primary">64%</p>
            </div>
            <div className="stat-chip">
              <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-slate-400">Total PIs</p>
              <p className="mt-2 text-2xl font-extrabold text-slate-900">312</p>
            </div>
            <div className="stat-chip col-span-2 sm:col-span-1">
              <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-slate-400">Filtered</p>
              <p className="mt-2 text-2xl font-extrabold text-slate-900">{filteredPIs.length}</p>
            </div>
          </div>
        </section>

        <section className="surface-card mb-8 rounded-[1.75rem] p-5 md:p-6">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
            <FilterSelect label="Career Cluster" value={clusterFilter} onChange={setClusterFilter}>
              <option>All Clusters</option>
              <option>Marketing</option>
              <option>Finance</option>
              <option>Hospitality</option>
              <option>Business Admin</option>
            </FilterSelect>

            <FilterSelect label="Topic Area" value={topicFilter} onChange={setTopicFilter}>
              <option>All Topics</option>
              <option>Branding</option>
              <option>Economics</option>
              <option>Emotional Intelligence</option>
              <option>Communications</option>
              <option>Information Management</option>
              <option>Information Technology</option>
            </FilterSelect>

            <FilterSelect label="Difficulty Level" value={difficultyFilter} onChange={setDifficultyFilter}>
              <option>All Levels</option>
              <option>Beginner (Core)</option>
              <option>Intermediate (Prerequisite)</option>
              <option>Advanced (Specialist)</option>
            </FilterSelect>

            <label className="space-y-2">
              <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-slate-500">Search Keywords</span>
              <div className="surface-panel flex items-center gap-2 rounded-[1.2rem] px-4 py-3">
                <span className="material-symbols-outlined text-primary">manage_search</span>
                <input
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-transparent outline-none placeholder:text-slate-400"
                  placeholder="e.g. MK:015"
                  type="text"
                />
              </div>
            </label>
          </div>

          <div className="mt-5 flex flex-wrap items-center gap-3">
            <button className="btn-secondary text-sm" onClick={resetFilters} type="button">
              Clear filters
            </button>
            <Link className="btn-primary text-sm" to="/simulation">
              Practice what you find
            </Link>
          </div>
        </section>

        {filteredPIs.length > 0 ? (
          <section className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
            {filteredPIs.map((pi) => (
              <article key={pi.id} className={`surface-card rounded-[1.75rem] border-t-4 p-6 ${getCardBorderColor(pi.color)}`}>
                <div className="mb-6 flex items-start justify-between gap-3">
                  <span className="rounded-full bg-slate-100 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.18em] text-slate-500">
                    {pi.id}
                  </span>
                  <div className={`rounded-full border px-3 py-1 text-[11px] font-bold uppercase tracking-[0.12em] ${getMasteryColorClass(pi.mastery, pi.color)}`}>
                    {pi.mastery} mastery
                  </div>
                </div>

                <h3 className="font-headline text-2xl font-extrabold leading-tight text-slate-950">{pi.title}</h3>

                <div className="mt-5 flex flex-wrap gap-2">
                  <MetaChip icon="category" label={pi.cluster} />
                  <MetaChip icon="sell" label={pi.topic} />
                  <MetaChip icon="bar_chart" label={pi.difficulty} />
                </div>

                <div className="mt-8 flex items-center justify-between gap-3 border-t border-slate-200/70 pt-5">
                  <Link className="btn-primary text-sm" to="/coach">
                    Study Now
                    <span className="material-symbols-outlined text-sm">psychology</span>
                  </Link>
                  <Link className="btn-secondary text-sm" to="/simulation">
                    Test It
                  </Link>
                </div>
              </article>
            ))}
          </section>
        ) : (
          <section className="surface-card rounded-[1.75rem] px-6 py-16 text-center">
            <span className="material-symbols-outlined text-5xl text-slate-400">search_off</span>
            <h3 className="mt-4 font-headline text-2xl font-extrabold text-slate-950">No results found</h3>
            <p className="mx-auto mt-2 max-w-md text-sm leading-7 text-slate-500">
              Try a broader search or reset the filters to bring your full indicator set back into view.
            </p>
            <button className="btn-secondary mt-6 text-sm" onClick={resetFilters} type="button">
              Reset Filters
            </button>
          </section>
        )}
      </div>
    </main>
  );
}

function FilterSelect({ children, label, onChange, value }) {
  return (
    <label className="space-y-2">
      <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-slate-500">{label}</span>
      <div className="surface-panel relative rounded-[1.2rem]">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full appearance-none bg-transparent px-4 py-3.5 pr-10 outline-none"
        >
          {children}
        </select>
        <span className="material-symbols-outlined pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400">
          expand_more
        </span>
      </div>
    </label>
  );
}

function MetaChip({ icon, label }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1.5 text-xs font-semibold text-slate-600">
      <span className="material-symbols-outlined text-base">{icon}</span>
      {label}
    </span>
  );
}

function getCardBorderColor(color) {
  switch (color) {
    case 'tertiary':
      return 'border-tertiary';
    case 'orange':
      return 'border-orange-300';
    case 'slate':
      return 'border-slate-300';
    default:
      return 'border-slate-200';
  }
}

function getMasteryColorClass(mastery, color) {
  if (mastery === 'None') return 'bg-slate-100 text-slate-500 border-slate-200';
  if (color === 'tertiary') return 'bg-tertiary/15 text-on-tertiary-container border-tertiary/20';
  if (color === 'orange') return 'bg-orange-50 text-orange-700 border-orange-200';
  return 'bg-slate-100 text-slate-700 border-slate-200';
}
