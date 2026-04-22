import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <>
      <main className="flex-1 lg:ml-64 flex items-center justify-center min-h-screen p-6">
        <div className="text-center max-w-md">
          <div className="mb-8">
            <span className="material-symbols-outlined text-[80px] text-primary/20">explore_off</span>
          </div>
          <h1 className="text-6xl font-extrabold text-primary mb-4">404</h1>
          <h2 className="text-2xl font-bold text-on-surface mb-3">Page Not Found</h2>
          <p className="text-secondary leading-relaxed mb-8">
            The page you're looking for doesn't exist or has been moved. Let's get you back on track.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              to="/"
              className="btn-primary-gradient text-white font-bold py-3 px-6 rounded-lg shadow-lg shadow-primary/20 hover:scale-[1.02] transition-transform flex items-center justify-center gap-2"
            >
              <span className="material-symbols-outlined text-sm">home</span>
              Go to Dashboard
            </Link>
            <Link
              to="/support"
              className="px-6 py-3 border border-slate-300 text-slate-600 font-bold rounded-lg hover:bg-slate-50 transition-colors flex items-center justify-center gap-2"
            >
              <span className="material-symbols-outlined text-sm">help</span>
              Get Help
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}
