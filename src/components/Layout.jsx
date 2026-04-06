import { Link, Outlet } from 'react-router-dom';

export default function Layout() {
  return (
    <div className="bg-surface text-on-surface min-h-screen">
      {/* TopAppBar */}
      <header className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-b border-slate-200/50 dark:border-slate-800/50 shadow-sm dark:shadow-none docked full-width top-0 z-50 sticky">
        <div className="flex items-center justify-between px-6 h-16 w-full max-w-[1440px] mx-auto">
          <div className="flex items-center gap-8">
            <span className="text-xl font-extrabold text-[#0059a4] dark:text-white font-['Manrope'] tracking-tight text-primary">IHS DECAprep</span>
            <nav className="hidden md:flex gap-6">
              <Link className="text-[#0059a4] dark:text-[#0072ce] border-b-2 border-[#0059a4] pb-1 font-['Manrope'] font-bold tracking-tight" to="/">Home</Link>
              <Link className="text-slate-600 dark:text-slate-400 font-medium hover:text-[#0059a4] transition-colors font-['Manrope'] tracking-tight" to="/database">Study</Link>
              <Link className="text-slate-600 dark:text-slate-400 font-medium hover:text-[#0059a4] transition-colors font-['Manrope'] tracking-tight" to="/simulation">Exams</Link>
              <Link className="text-slate-600 dark:text-slate-400 font-medium hover:text-[#0059a4] transition-colors font-['Manrope'] tracking-tight" to="/coach">AI Coach</Link>
            </nav>
          </div>
          <div className="flex items-center gap-4">
            <button className="p-2 hover:bg-slate-50 dark:hover:bg-slate-800/50 rounded-full transition-colors">
              <span className="material-symbols-outlined text-slate-600" data-icon="notifications">notifications</span>
            </button>
            <div className="h-8 w-8 rounded-full bg-slate-200 overflow-hidden border border-slate-200">
              <img alt="Student Profile" data-alt="professional portrait" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCgQJbhY530jMQHgJ2TpHvQDonLvafW8ysMmwA9hrvg3gzxkcHYzvAn8kbyvJhURxmElSjZbzmbTQvTeT67c6D3EAgk587N-XX3IX4zBAF3ImO_P6XsEPl0SUK437yAbNsCwYYQICbXFGbjg9OxxZLZSUiWS9FxDa33c08vcfI7irRbr0ySclBRbtQJGFrzJGzPqXPhX-deXUlV4xDi82WDGfXY-mUS0-4xiDX1ujtyDVRhVOSAYywjpp9X9f0NQQiJycyM8o_K3zk"/>
            </div>
          </div>
        </div>
      </header>

      {/* SideNavBar */}
      <aside className="h-screen w-64 fixed left-0 top-0 pt-16 flex flex-col gap-2 p-4 border-r border-slate-200 dark:border-slate-800 no-border bg-slate-100/50 dark:bg-slate-900/50 z-40 hidden lg:flex">
        <div className="mb-6 px-2">
          <h3 className="text-sm font-semibold text-[#0059a4] uppercase tracking-wider">IHS DECAprep Dashboard</h3>
          <p className="text-xs text-slate-500">Professional Track</p>
        </div>
        <nav className="flex-1 space-y-1">
          <Link className="flex items-center gap-3 px-3 py-2 text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-900 hover:translate-x-1 transition-transform duration-200 rounded-lg group" to="/database">
            <span className="material-symbols-outlined group-hover:text-[#0059a4]" data-icon="database">database</span>
            <span className="font-['Public_Sans'] text-sm">PI Database</span>
          </Link>
          <Link className="flex items-center gap-3 px-3 py-2 text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-900 hover:translate-x-1 transition-transform duration-200 rounded-lg group" to="/">
            <span className="material-symbols-outlined group-hover:text-[#0059a4]" data-icon="workspaces">workspaces</span>
            <span className="font-['Public_Sans'] text-sm">Career Clusters</span>
          </Link>
          <Link className="flex items-center gap-3 px-3 py-2 bg-white dark:bg-slate-900 text-[#0059a4] font-semibold rounded-lg shadow-sm transition-transform duration-200" to="/">
            <span className="material-symbols-outlined" data-icon="analytics">analytics</span>
            <span className="font-['Public_Sans'] text-sm">Learning Analytics</span>
          </Link>
        </nav>
        <div className="mt-auto space-y-1 pt-4 border-t border-slate-200/60">
          <button className="w-full mb-4 bg-gradient-to-br from-primary to-primary-container text-white py-2 px-4 rounded-lg text-sm font-bold shadow-md hover:opacity-90 transition-opacity">
            Upgrade to Pro
          </button>
          <Link className="flex items-center gap-3 px-3 py-2 text-slate-500 hover:bg-slate-100 rounded-lg transition-colors" to="/">
            <span className="material-symbols-outlined" data-icon="settings">settings</span>
            <span className="text-sm">Settings</span>
          </Link>
          <Link className="flex items-center gap-3 px-3 py-2 text-slate-500 hover:bg-slate-100 rounded-lg transition-colors" to="/">
            <span className="material-symbols-outlined" data-icon="help">help</span>
            <span className="text-sm">Support</span>
          </Link>
        </div>
      </aside>

      <Outlet />

      {/* Bottom Nav for Mobile */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 h-16 flex items-center justify-around px-4 z-50">
        <Link className="flex flex-col items-center gap-1 text-primary" to="/">
          <span className="material-symbols-outlined" data-icon="home" data-weight="fill" style={{ fontVariationSettings: "'FILL' 1" }}>home</span>
          <span className="text-[10px] font-bold">Home</span>
        </Link>
        <Link className="flex flex-col items-center gap-1 text-slate-400" to="/database">
          <span className="material-symbols-outlined" data-icon="menu_book">menu_book</span>
          <span className="text-[10px] font-bold">Study</span>
        </Link>
        <Link className="flex flex-col items-center gap-1 text-slate-400" to="/coach">
          <span className="material-symbols-outlined" data-icon="psychology">psychology</span>
          <span className="text-[10px] font-bold">AI Coach</span>
        </Link>
        <Link className="flex flex-col items-center gap-1 text-slate-400" to="/">
          <span className="material-symbols-outlined" data-icon="person">person</span>
          <span className="text-[10px] font-bold">Profile</span>
        </Link>
      </nav>
    </div>
  );
}
