import { useState } from 'react';

export default function Support() {
  const [openFaq, setOpenFaq] = useState(null);

  const faqs = [
    {
      q: 'What are Performance Indicators (PIs)?',
      a: 'Performance Indicators are specific knowledge and skill statements that define what DECA members should know and be able to do. They are the building blocks of DECA competitive events and are organized by career clusters and instructional areas.'
    },
    {
      q: 'How do roleplays work in DECA?',
      a: 'Roleplays are situational scenarios where you assume a business role and must solve a problem or make decisions. You typically have 10 minutes of preparation time and 10 minutes to present your response to a judge. The AI Coach can help you practice these scenarios.'
    },
    {
      q: 'What events can I compete in?',
      a: 'DECA offers events across six career clusters: Marketing, Finance, Hospitality & Tourism, Business Administration, Entrepreneurship, and Personal Financial Literacy. Each cluster has multiple events including individual exams with roleplays, team decision-making, and written projects.'
    },
    {
      q: 'How is mastery calculated?',
      a: 'Mastery is calculated based on your performance across practice exams, roleplay evaluations, and PI study completion. Gold mastery means 90%+ proficiency, Silver is 70-89%, Bronze is 50-69%, and below 50% means the PI needs more practice.'
    },
    {
      q: 'Can I use DECAprep on mobile?',
      a: 'Yes! DECAprep is fully responsive and works on smartphones and tablets. You can study PI flashcards, take practice exams, and chat with the AI Coach from any device with a web browser.'
    },
    {
      q: 'How do I prepare for ICDC (International Career Development Conference)?',
      a: 'Use the Learning Analytics page to identify your weak areas, then focus your study time on those performance indicators. Practice at least 3 roleplays per week using the Roleplay Bank, and aim for Gold mastery across all PIs in your chosen event.'
    },
  ];

  return (
    <>
      <main className="flex-1 lg:ml-64 p-6 md:p-10 min-h-screen">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <section className="mb-10">
            <span className="text-tertiary font-bold tracking-[0.2em] text-[10px] uppercase mb-2 block">Help Center</span>
            <h1 className="text-4xl font-extrabold tracking-tight text-on-surface mb-2">Support</h1>
            <p className="text-secondary text-lg leading-relaxed">Find answers to common questions or reach out to our team.</p>
          </section>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
            <div className="bg-gradient-to-br from-primary to-primary-container rounded-xl p-6 text-white">
              <span className="material-symbols-outlined text-3xl mb-3 text-white/80">school</span>
              <h3 className="text-lg font-bold mb-1">Getting Started</h3>
              <p className="text-sm text-white/70">New to DECA? Start with our onboarding guide.</p>
            </div>
            <div className="bg-surface-container-lowest rounded-xl p-6 border border-slate-100 hover:shadow-md transition-shadow">
              <span className="material-symbols-outlined text-3xl mb-3 text-tertiary">menu_book</span>
              <h3 className="text-lg font-bold mb-1 text-on-surface">Study Guides</h3>
              <p className="text-sm text-secondary">Download cluster-specific study materials.</p>
            </div>
            <div className="bg-surface-container-lowest rounded-xl p-6 border border-slate-100 hover:shadow-md transition-shadow">
              <span className="material-symbols-outlined text-3xl mb-3 text-primary">live_help</span>
              <h3 className="text-lg font-bold mb-1 text-on-surface">Video Tutorials</h3>
              <p className="text-sm text-secondary">Watch step-by-step platform walkthroughs.</p>
            </div>
          </div>

          {/* FAQ Section */}
          <section className="mb-10">
            <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
              <span className="material-symbols-outlined text-primary">quiz</span>
              Frequently Asked Questions
            </h2>
            <div className="space-y-3">
              {faqs.map((faq, i) => (
                <div key={i} className="bg-surface-container-lowest rounded-xl border border-slate-100/50 overflow-hidden">
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="w-full flex items-center justify-between p-5 text-left hover:bg-surface-container-low transition-colors"
                  >
                    <span className="text-sm font-bold text-on-surface pr-4">{faq.q}</span>
                    <span className={`material-symbols-outlined text-slate-400 transition-transform ${openFaq === i ? 'rotate-180' : ''}`}>expand_more</span>
                  </button>
                  {openFaq === i && (
                    <div className="px-5 pb-5">
                      <p className="text-sm text-secondary leading-relaxed border-t border-slate-100 pt-4">{faq.a}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>

          {/* Contact */}
          <section className="bg-surface-container-lowest rounded-xl p-8 shadow-sm border border-slate-100/50">
            <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
              <span className="material-symbols-outlined text-primary">mail</span>
              Contact Us
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-slate-500 uppercase ml-1">Subject</label>
                <input className="w-full bg-surface-container-low rounded-xl text-sm py-3 px-4 focus:ring-2 focus:ring-primary/20 border-none" placeholder="What do you need help with?" type="text" />
              </div>
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-slate-500 uppercase ml-1">Email</label>
                <input className="w-full bg-surface-container-low rounded-xl text-sm py-3 px-4 focus:ring-2 focus:ring-primary/20 border-none" placeholder="your@email.com" type="email" />
              </div>
              <div className="md:col-span-2 space-y-1.5">
                <label className="text-[10px] font-bold text-slate-500 uppercase ml-1">Message</label>
                <textarea className="w-full bg-surface-container-low rounded-xl text-sm py-3 px-4 focus:ring-2 focus:ring-primary/20 border-none min-h-[120px] resize-none" placeholder="Describe your issue or question..."></textarea>
              </div>
            </div>
            <button className="mt-6 btn-primary-gradient text-white text-sm font-bold py-3 px-6 rounded-lg shadow-lg shadow-primary/20 hover:scale-[1.02] transition-transform flex items-center gap-2">
              <span className="material-symbols-outlined text-sm">send</span>
              Send Message
            </button>
          </section>
        </div>
      </main>
    </>
  );
}
