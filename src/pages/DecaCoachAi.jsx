import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { coachInitialMessages } from '../data/mockData';

export default function DecaCoachAi() {
  const [messages, setMessages] = useState(coachInitialMessages);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [isTyping, messages]);

  const handleSend = () => {
    if (!inputText.trim()) return;

    const newUserMsg = {
      id: Date.now(),
      sender: 'user',
      text: inputText,
    };

    setMessages((prev) => [...prev, newUserMsg]);
    setInputText('');
    setIsTyping(true);

    setTimeout(() => {
      const newAiMsg = {
        id: Date.now() + 1,
        sender: 'ai',
        performanceIndicator: 'GEN:001',
        text:
          "That's a great question! While I am currently a simulated AI coach in this prototype, the best next step is to frame your answer around the customer's real need first, then connect your recommendation back to the business goal.",
      };

      setMessages((prev) => [...prev, newAiMsg]);
      setIsTyping(false);
    }, 1500);
  };

  return (
    <main className="page-shell px-4 pb-24 pt-8 md:px-8 lg:ml-72 lg:px-10">
      <div className="content-wrap">
        <section className="mb-6 flex flex-col gap-6 xl:flex-row xl:items-end xl:justify-between">
          <div className="max-w-3xl">
            <span className="eyebrow mb-3 block">AI Coach</span>
            <h1 className="font-headline text-4xl font-extrabold tracking-tight text-slate-950 md:text-5xl">
              A cleaner coaching workspace for faster practice.
            </h1>
            <p className="mt-4 text-base leading-7 text-slate-600 md:text-lg">
              Keep the conversation readable, jump to related study tools quickly, and stay focused on the scenario you’re working through.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Link className="btn-secondary text-sm" to="/database">
              Browse indicators
            </Link>
            <Link className="btn-primary text-sm" to="/simulation">
              Open exam lab
            </Link>
          </div>
        </section>

        <div className="grid grid-cols-1 gap-6 xl:grid-cols-[minmax(0,1fr)_19rem]">
          <section className="surface-card flex min-h-[44rem] flex-col overflow-hidden rounded-[1.75rem]">
            <div className="border-b border-slate-200/70 px-6 py-5 md:px-8">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <h2 className="font-headline text-2xl font-extrabold text-slate-950">DECA Coach Session</h2>
                  <p className="mt-1 text-sm text-slate-500">Performance indicator support and roleplay guidance</p>
                </div>
                <div className="rounded-full bg-green-50 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.18em] text-green-700">
                  Active session
                </div>
              </div>
            </div>

            <div className="flex-1 space-y-6 overflow-y-auto bg-white/55 px-4 py-6 sm:px-6 md:px-8">
              {messages.map((msg) =>
                msg.sender === 'user' ? (
                  <div key={msg.id} className="flex justify-end">
                    <div className="max-w-[85%] rounded-[1.4rem] rounded-tr-md bg-primary px-5 py-4 text-white shadow-lg shadow-primary/20">
                      <p className="text-sm leading-7 whitespace-pre-wrap">{msg.text}</p>
                    </div>
                  </div>
                ) : (
                  <div key={msg.id} className="flex justify-start">
                    <div className="surface-panel max-w-[95%] rounded-[1.4rem] rounded-tl-md px-5 py-4 text-slate-800">
                      {msg.performanceIndicator && (
                        <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.18em] text-primary">
                          <span className="material-symbols-outlined text-base">auto_awesome</span>
                          {msg.performanceIndicator}
                        </div>
                      )}
                      <p className="text-sm leading-7 whitespace-pre-wrap">{msg.text}</p>
                    </div>
                  </div>
                ),
              )}

              {isTyping && (
                <div className="flex justify-start">
                  <div className="surface-panel flex items-center gap-2 rounded-[1.4rem] rounded-tl-md px-5 py-4">
                    <span className="h-2 w-2 animate-bounce rounded-full bg-primary/40" style={{ animationDelay: '0ms' }} />
                    <span className="h-2 w-2 animate-bounce rounded-full bg-primary/60" style={{ animationDelay: '150ms' }} />
                    <span className="h-2 w-2 animate-bounce rounded-full bg-primary" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            <div className="border-t border-slate-200/70 bg-white/70 p-4 sm:p-6">
              <div className="surface-panel mx-auto flex max-w-4xl items-center gap-3 rounded-[1.4rem] px-4 py-3">
                <input
                  className="w-full bg-transparent outline-none placeholder:text-slate-400"
                  onChange={(e) => setInputText(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') handleSend();
                  }}
                  placeholder="Ask about a PI, request a roleplay, or get feedback..."
                  type="text"
                  value={inputText}
                />
                <button
                  className="btn-primary h-11 w-11 shrink-0 p-0 disabled:cursor-not-allowed disabled:opacity-50"
                  disabled={!inputText.trim() || isTyping}
                  onClick={handleSend}
                  type="button"
                >
                  <span className="material-symbols-outlined text-sm">send</span>
                </button>
              </div>
            </div>
          </section>

          <aside className="space-y-6">
            <section className="surface-card rounded-[1.75rem] p-6">
              <p className="eyebrow mb-4">Scenario Hub</p>
              <div className="rounded-[1.4rem] bg-slate-50 p-4">
                <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-primary">Active Roleplay</span>
                <h3 className="mt-2 font-headline text-xl font-extrabold text-slate-950">The Local Organic Cafe</h3>
                <p className="mt-3 text-sm leading-7 text-slate-600">
                  A major chain opened across the street. Rework the cafe’s price and promotion strategy without losing its local appeal.
                </p>
                <Link className="btn-primary mt-5 w-full text-sm" to="/simulation">
                  Resume Roleplay
                </Link>
              </div>
            </section>

            <section className="surface-card rounded-[1.75rem] p-6">
              <p className="eyebrow mb-4">Recommended PIs</p>
              <div className="space-y-3">
                <Link className="surface-panel flex items-center justify-between rounded-[1.2rem] px-4 py-3 transition hover:border-primary/30" to="/database">
                  <div>
                    <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-tertiary">PM:003</p>
                    <p className="mt-1 text-sm font-bold text-slate-900">Product life cycle stages</p>
                  </div>
                  <span className="material-symbols-outlined text-slate-400">arrow_forward</span>
                </Link>
                <Link className="surface-panel flex items-center justify-between rounded-[1.2rem] px-4 py-3 transition hover:border-primary/30" to="/database">
                  <div>
                    <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-tertiary">CR:016</p>
                    <p className="mt-1 text-sm font-bold text-slate-900">Handling difficult customers</p>
                  </div>
                  <span className="material-symbols-outlined text-slate-400">arrow_forward</span>
                </Link>
              </div>
            </section>

            <section className="surface-card rounded-[1.75rem] p-6">
              <p className="eyebrow mb-4">Mastery Progress</p>
              <div className="space-y-4">
                <ProgressRow label="Marketing" value={82} barColor="bg-primary" />
                <ProgressRow label="Management" value={45} barColor="bg-tertiary" />
              </div>
            </section>
          </aside>
        </div>
      </div>
    </main>
  );
}

function ProgressRow({ barColor, label, value }) {
  return (
    <div>
      <div className="mb-2 flex items-center justify-between text-sm font-bold">
        <span className="text-slate-800">{label}</span>
        <span className="text-primary">{value}%</span>
      </div>
      <div className="h-2 overflow-hidden rounded-full bg-slate-200">
        <div className={`h-full rounded-full ${barColor}`} style={{ width: `${value}%` }} />
      </div>
    </div>
  );
}
