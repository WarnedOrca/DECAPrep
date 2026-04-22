import { useState } from 'react';

export default function Settings() {
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState({
    studyReminders: true,
    weeklyReport: true,
    achievements: true,
    productUpdates: false,
  });

  const handleToggle = (key) => {
    setNotifications(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <>
      <main className="flex-1 lg:ml-64 p-6 md:p-10 min-h-screen">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <section className="mb-10">
            <span className="text-tertiary font-bold tracking-[0.2em] text-[10px] uppercase mb-2 block">Preferences</span>
            <h1 className="text-4xl font-extrabold tracking-tight text-on-surface mb-2">Settings</h1>
            <p className="text-secondary text-lg leading-relaxed">Manage your account, preferences, and notification settings.</p>
          </section>

          <div className="space-y-8">
            {/* Profile Section */}
            <div className="bg-surface-container-lowest rounded-xl p-8 shadow-sm border border-slate-100/50">
              <h2 className="text-lg font-bold mb-6 flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">person</span>
                Profile Information
              </h2>
              <div className="flex items-center gap-6 mb-8">
                <div className="h-20 w-20 rounded-full bg-slate-200 overflow-hidden border-2 border-primary/20">
                  <img alt="Student Profile" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCgQJbhY530jMQHgJ2TpHvQDonLvafW8ysMmwA9hrvg3gzxkcHYzvAn8kbyvJhURxmElSjZbzmbTQvTeT67c6D3EAgk587N-XX3IX4zBAF3ImO_P6XsEPl0SUK437yAbNsCwYYQICbXFGbjg9OxxZLZSUiWS9FxDa33c08vcfI7irRbr0ySclBRbtQJGFrzJGzPqXPhX-deXUlV4xDi82WDGfXY-mUS0-4xiDX1ujtyDVRhVOSAYywjpp9X9f0NQQiJycyM8o_K3zk"/>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-on-surface">DECA Student</h3>
                  <p className="text-sm text-secondary">Professional Track • Junior Year</p>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-slate-500 uppercase ml-1">Display Name</label>
                  <input className="w-full bg-surface-container-low rounded-xl text-sm py-3 px-4 focus:ring-2 focus:ring-primary/20 border-none" defaultValue="DECA Student" type="text" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-slate-500 uppercase ml-1">Email</label>
                  <input className="w-full bg-surface-container-low rounded-xl text-sm py-3 px-4 focus:ring-2 focus:ring-primary/20 border-none" defaultValue="student@school.edu" type="email" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-slate-500 uppercase ml-1">School</label>
                  <input className="w-full bg-surface-container-low rounded-xl text-sm py-3 px-4 focus:ring-2 focus:ring-primary/20 border-none" defaultValue="International High School" type="text" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-slate-500 uppercase ml-1">Grade Level</label>
                  <select className="w-full bg-surface-container-low rounded-xl text-sm py-3 px-4 focus:ring-2 focus:ring-primary/20 border-none appearance-none">
                    <option>Freshman</option>
                    <option>Sophomore</option>
                    <option selected>Junior</option>
                    <option>Senior</option>
                  </select>
                </div>
              </div>
              <button className="mt-6 btn-primary-gradient text-white text-sm font-bold py-3 px-6 rounded-lg shadow-lg shadow-primary/20 hover:scale-[1.02] transition-transform">
                Save Changes
              </button>
            </div>

            {/* Appearance */}
            <div className="bg-surface-container-lowest rounded-xl p-8 shadow-sm border border-slate-100/50">
              <h2 className="text-lg font-bold mb-6 flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">palette</span>
                Appearance
              </h2>
              <div className="flex items-center justify-between p-4 bg-surface-container-low rounded-xl">
                <div>
                  <p className="text-sm font-bold text-on-surface">Dark Mode</p>
                  <p className="text-xs text-slate-500 mt-0.5">Switch between light and dark themes</p>
                </div>
                <button
                  onClick={() => setDarkMode(!darkMode)}
                  className={`relative inline-flex h-7 w-12 items-center rounded-full transition-colors ${darkMode ? 'bg-primary' : 'bg-slate-300'}`}
                >
                  <span className={`inline-block h-5 w-5 transform rounded-full bg-white transition-transform shadow-sm ${darkMode ? 'translate-x-6' : 'translate-x-1'}`} />
                </button>
              </div>
            </div>

            {/* Notifications */}
            <div className="bg-surface-container-lowest rounded-xl p-8 shadow-sm border border-slate-100/50">
              <h2 className="text-lg font-bold mb-6 flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">notifications</span>
                Notifications
              </h2>
              <div className="space-y-4">
                {[
                  { key: 'studyReminders', label: 'Study Reminders', desc: 'Daily reminders to keep your streak alive' },
                  { key: 'weeklyReport', label: 'Weekly Progress Report', desc: 'Summary of your weekly study activity and scores' },
                  { key: 'achievements', label: 'Achievement Alerts', desc: 'Celebrate milestones and new badges' },
                  { key: 'productUpdates', label: 'Product Updates', desc: 'New features, events, and content releases' },
                ].map(({ key, label, desc }) => (
                  <div key={key} className="flex items-center justify-between p-4 bg-surface-container-low rounded-xl">
                    <div>
                      <p className="text-sm font-bold text-on-surface">{label}</p>
                      <p className="text-xs text-slate-500 mt-0.5">{desc}</p>
                    </div>
                    <button
                      onClick={() => handleToggle(key)}
                      className={`relative inline-flex h-7 w-12 items-center rounded-full transition-colors ${notifications[key] ? 'bg-primary' : 'bg-slate-300'}`}
                    >
                      <span className={`inline-block h-5 w-5 transform rounded-full bg-white transition-transform shadow-sm ${notifications[key] ? 'translate-x-6' : 'translate-x-1'}`} />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Danger Zone */}
            <div className="bg-surface-container-lowest rounded-xl p-8 shadow-sm border border-red-100">
              <h2 className="text-lg font-bold mb-4 flex items-center gap-2 text-red-600">
                <span className="material-symbols-outlined">warning</span>
                Danger Zone
              </h2>
              <div className="flex items-center justify-between p-4 bg-red-50 rounded-xl">
                <div>
                  <p className="text-sm font-bold text-red-900">Reset Progress</p>
                  <p className="text-xs text-red-600 mt-0.5">This will clear all your study progress and analytics data. This action cannot be undone.</p>
                </div>
                <button className="px-4 py-2 border border-red-300 text-red-600 text-sm font-bold rounded-lg hover:bg-red-100 transition-colors whitespace-nowrap">
                  Reset All Data
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
