import { NavLink, Outlet } from 'react-router-dom';

const primaryNav = [
  { label: 'Dashboard', to: '/' },
  { label: 'Study', to: '/database' },
  { label: 'Exams', to: '/simulation' },
  { label: 'AI Coach', to: '/coach' },
];

const sidebarNav = [
  { label: 'Dashboard', to: '/', icon: 'dashboard' },
  { label: 'PI Database', to: '/database', icon: 'database' },
  { label: 'Exam Lab', to: '/simulation', icon: 'fact_check' },
  { label: 'Coach Session', to: '/coach', icon: 'psychology' },
];

const quickLinks = [
  { label: 'Settings', to: '/database', icon: 'settings' },
  { label: 'Support', to: '/coach', icon: 'help' },
];

export default function Layout() {
  return (
    <div className="app-shell text-on-surface">
      <header className="app-header sticky top-0 z-50">
        <div className="mx-auto flex h-16 max-w-[1440px] items-center justify-between gap-4 px-4 md:px-6">
          <div className="flex items-center gap-6">
            <NavLink className="flex items-center gap-3" to="/">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-primary text-white shadow-lg shadow-primary/20">
                <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>
                  school
                </span>
              </div>
              <div>
                <p className="font-headline text-lg font-extrabold tracking-tight text-primary">IHS DECAprep</p>
                <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-400">Competition Platform</p>
              </div>
            </NavLink>

            <nav className="hidden items-center gap-2 md:flex">
              {primaryNav.map(({ label, to }) => (
                <NavLink
                  key={to}
                  to={to}
                  end={to === '/'}
                  className={({ isActive }) => `nav-pill ${isActive ? 'is-active' : ''}`}
                >
                  {label}
                </NavLink>
              ))}
            </nav>
          </div>

          <div className="hidden items-center gap-3 md:flex">
            <NavLink className="btn-secondary text-sm" to="/coach">
              Ask Coach
            </NavLink>
            <NavLink className="btn-primary text-sm" to="/simulation">
              Start Exam
            </NavLink>
          </div>
        </div>
      </header>

      <aside className="app-sidebar fixed left-0 top-16 hidden h-[calc(100vh-4rem)] w-72 flex-col px-4 py-6 lg:flex">
        <div className="surface-card rounded-[1.5rem] p-5">
          <p className="eyebrow mb-2">Your Track</p>
          <h2 className="font-headline text-xl font-extrabold text-slate-900">Professional Prep</h2>
          <p className="mt-2 text-sm leading-6 text-slate-500">
            Everything you need for practice sets, exam reps, and faster review cycles in one place.
          </p>
        </div>

        <nav className="mt-6 space-y-2">
          {sidebarNav.map(({ label, to, icon }) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/'}
              className={({ isActive }) => `side-link ${isActive ? 'is-active' : ''}`}
            >
              <span className="material-symbols-outlined">{icon}</span>
              <span>{label}</span>
            </NavLink>
          ))}
        </nav>

        <div className="mt-auto space-y-4">
          <div className="hero-gradient rounded-[1.5rem] p-5 text-white">
            <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-white/70">Focus Today</p>
            <h3 className="mt-2 font-headline text-xl font-extrabold">Push finance mastery above 85%</h3>
            <p className="mt-2 text-sm leading-6 text-white/78">
              Review weak indicators, then finish a timed exam while the patterns are fresh.
            </p>
            <NavLink className="btn-secondary mt-4 text-sm" to="/database">
              Review Indicators
            </NavLink>
          </div>

          <div className="space-y-2">
            {quickLinks.map(({ label, to, icon }) => (
              <NavLink key={label} className="side-link bg-white/60" to={to}>
                <span className="material-symbols-outlined">{icon}</span>
                <span>{label}</span>
              </NavLink>
            ))}
          </div>
        </div>
      </aside>

      <Outlet />

      <nav className="surface-card fixed inset-x-4 bottom-4 z-50 flex h-16 items-center justify-around rounded-[1.4rem] px-3 lg:hidden">
        {sidebarNav.map(({ label, to, icon }) => (
          <NavLink
            key={to}
            to={to}
            end={to === '/'}
            className={({ isActive }) => `mobile-nav-link ${isActive ? 'is-active' : ''}`}
          >
            <span className="material-symbols-outlined">{icon}</span>
            <span>{label}</span>
          </NavLink>
        ))}
      </nav>
    </div>
  );
}
