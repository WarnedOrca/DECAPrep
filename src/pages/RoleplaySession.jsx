import { useParams, Link, useNavigate } from 'react-router-dom';
import { roleplayScenarios } from '../data/roleplayData';
import AiCoachWidget from '../components/AiCoachWidget';

export default function RoleplaySession() {
  const { id } = useParams();
  const navigate = useNavigate();
  const roleplay = roleplayScenarios.find((rp) => rp.id === id);

  if (!roleplay) {
    return (
      <main className="flex-1 lg:ml-64 p-6 md:p-10 min-h-screen flex flex-col items-center justify-center bg-surface-container-low">
        <span className="material-symbols-outlined text-6xl text-slate-300 mb-4">error</span>
        <h2 className="text-2xl font-bold text-on-surface mb-2">Roleplay Not Found</h2>
        <p className="text-secondary mb-6">The roleplay scenario you are looking for does not exist.</p>
        <button onClick={() => navigate('/roleplays')} className="btn-primary-gradient px-6 py-2 rounded-lg font-bold text-white">
          Back to Roleplay Bank
        </button>
      </main>
    );
  }

  const contextPrompt = `
The user is currently participating in the following DECA Roleplay Scenario:
Title: ${roleplay.title}
Cluster: ${roleplay.cluster}
Event: ${roleplay.event}
User's Role: ${roleplay.role}

Situation:
${roleplay.situation}

Required Performance Indicators:
${roleplay.performanceIndicators.join(', ')}

Please act as a judge, coach, or counterpart depending on how the user interacts with you. Emphasize the Performance Indicators in your feedback.
  `.trim();

  return (
    <main className="flex-1 lg:ml-64 flex flex-col xl:flex-row bg-surface relative overflow-hidden h-screen">
      
      {/* Left Pane: Roleplay Details */}
      <div className="flex-1 overflow-y-auto p-6 md:p-10 bg-surface-container-lowest">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <Link to="/roleplays" className="flex items-center gap-1 text-sm text-slate-500 hover:text-primary transition-colors mb-4 inline-flex">
              <span className="material-symbols-outlined text-[18px]">arrow_back</span>
              Back to Bank
            </Link>
            <div className="flex items-center gap-3 mb-3 flex-wrap">
              <span className="text-xs font-bold px-2.5 py-1 rounded-full border bg-primary/10 text-primary border-primary/30">
                {roleplay.cluster}
              </span>
              <span className="text-xs font-bold px-2.5 py-1 rounded-full border bg-slate-100 text-slate-600 border-slate-200">
                {roleplay.difficulty}
              </span>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{roleplay.event}</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-on-surface mb-4">{roleplay.title}</h1>
            <p className="text-lg text-secondary leading-relaxed">{roleplay.description}</p>
          </div>

          {/* Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="bg-surface-container-low p-6 rounded-2xl border border-outline-variant/20">
              <div className="flex items-center gap-2 mb-3">
                <span className="material-symbols-outlined text-primary">badge</span>
                <h3 className="text-sm font-bold text-on-surface uppercase tracking-widest">Your Role</h3>
              </div>
              <p className="text-lg font-medium text-on-surface">{roleplay.role}</p>
            </div>
            <div className="bg-surface-container-low p-6 rounded-2xl border border-outline-variant/20">
              <div className="flex items-center gap-2 mb-3">
                <span className="material-symbols-outlined text-tertiary">checklist</span>
                <h3 className="text-sm font-bold text-on-surface uppercase tracking-widest">Performance Indicators</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {roleplay.performanceIndicators.map(pi => (
                  <span key={pi} className="text-xs font-bold bg-surface-container-highest text-on-surface px-2.5 py-1 rounded-md uppercase tracking-wider border border-outline-variant/30">
                    {pi}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Situation */}
          <div className="bg-primary/5 p-6 md:p-8 rounded-2xl border-l-4 border-primary">
            <h3 className="text-sm font-bold text-primary uppercase tracking-widest mb-4">The Situation</h3>
            <p className="text-base text-on-surface leading-relaxed whitespace-pre-wrap">{roleplay.situation}</p>
          </div>

          <div className="mt-12 p-6 bg-amber-50 rounded-2xl border border-amber-100">
            <div className="flex items-start gap-3">
              <span className="material-symbols-outlined text-amber-500 mt-0.5">lightbulb</span>
              <div>
                <h4 className="text-sm font-bold text-amber-800 mb-1">Coach's Tip</h4>
                <p className="text-sm text-amber-700 leading-relaxed">
                  Use the AI Coach on the right to practice your presentation. You can pitch your ideas, ask for clarification on the PIs, or request a mock interview from the perspective of the judge.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Pane: AI Coach Widget */}
      <div className="w-full xl:w-[450px] flex-shrink-0 border-l border-surface-container-low h-[500px] xl:h-auto">
        <AiCoachWidget variant="sidebar" contextPrompt={contextPrompt} />
      </div>
      
    </main>
  );
}
