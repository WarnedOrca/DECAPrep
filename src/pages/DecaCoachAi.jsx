import { useState } from 'react';
import AiCoachWidget from '../components/AiCoachWidget';

export default function DecaCoachAi() {
  const [contextPrompt, setContextPrompt] = useState('');

  return (
    <>
      <main className="flex-1 lg:ml-64 flex flex-col bg-surface relative overflow-hidden h-screen">
        <div className="flex flex-1 overflow-hidden">

          {/* Chat Interface */}
          <div className="flex-1 flex flex-col h-full bg-surface relative">
            <AiCoachWidget variant="standalone" contextPrompt={contextPrompt} />
          </div>

          {/* Scenario Sidebar */}
          <aside className="hidden xl:flex flex-col w-80 bg-surface-container-lowest border-l border-slate-200/50 p-6 overflow-y-auto">
            <div className="flex items-center gap-2 mb-6">
              <span className="material-symbols-outlined text-tertiary">verified</span>
              <h3 className="text-sm font-extrabold text-on-surface tracking-tight">Scenario Hub</h3>
            </div>

            <div className="space-y-6">
              {/* Active Scenario Card */}
              <div className="bg-slate-50 rounded-xl p-4 border-l-4 border-primary">
                <span className="text-[10px] font-bold text-primary uppercase tracking-widest mb-1 block">Active Roleplay</span>
                <h4 className="text-sm font-bold text-on-surface mb-2">The Local Organic Cafe</h4>
                <p className="text-xs text-secondary leading-relaxed mb-4">
                  You are the Marketing Manager for a new organic cafe. A major chain just opened across the street. How do you adjust your 'Price' and 'Promotion' strategies?
                </p>
                <button className="w-full py-2 border border-primary text-primary text-xs font-bold rounded-lg hover:bg-primary/5 transition-colors">Resume Roleplay</button>
              </div>

              {/* Quick PI Cards */}
              <div className="space-y-4">
                <h4 className="text-[10px] font-bold text-outline uppercase tracking-widest">Suggested Questions</h4>
                {[
                  { label: 'Explain the Marketing Mix', pi: 'MT:001' },
                  { label: 'What is price skimming?', pi: 'PR:003' },
                  { label: 'Tips for roleplay presentations', pi: 'GEN' },
                ].map((item) => (
                  <button
                    key={item.label}
                    onClick={() => setContextPrompt(`User is asking about: ${item.label}`)}
                    className="w-full text-left bg-surface-container-low p-3 rounded-lg hover:bg-surface-container-high cursor-pointer transition-colors group"
                  >
                    <div className="flex justify-between items-start mb-1">
                      <span className="text-[10px] font-bold text-tertiary">{item.pi}</span>
                      <span className="material-symbols-outlined text-xs text-outline group-hover:text-primary">arrow_forward</span>
                    </div>
                    <p className="text-xs font-bold text-on-surface">{item.label}</p>
                  </button>
                ))}
              </div>

              {/* Progress Section */}
              <div className="pt-6 border-t border-slate-100">
                <h4 className="text-[10px] font-bold text-outline uppercase tracking-widest mb-4">Mastery Progress</h4>
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-[10px] font-bold mb-1">
                      <span className="text-on-surface">Marketing</span>
                      <span className="text-primary">82%</span>
                    </div>
                    <div className="w-full bg-slate-200 h-1 rounded-full overflow-hidden">
                      <div className="bg-primary h-full w-[82%]"></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-[10px] font-bold mb-1">
                      <span className="text-on-surface">Management</span>
                      <span className="text-tertiary">45%</span>
                    </div>
                    <div className="w-full bg-slate-200 h-1 rounded-full overflow-hidden">
                      <div className="bg-tertiary h-full w-[45%]"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </main>
    </>
  );
}
