import { useState, useRef, useEffect } from 'react';
import { coachInitialMessages } from '../data/mockData';

export default function DecaCoachAi() {
  const [messages, setMessages] = useState(coachInitialMessages);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSend = () => {
    if (!inputText.trim()) return;

    const newUserMsg = {
      id: Date.now(),
      sender: 'user',
      text: inputText
    };

    setMessages(prev => [...prev, newUserMsg]);
    setInputText('');
    setIsTyping(true);

    setTimeout(() => {
      const newAiMsg = {
        id: Date.now() + 1,
        sender: 'ai',
        performanceIndicator: 'GEN:001',
        text: "That's a great question! While I am currently a simulated AI coach in this specific prototype environment, I can tell you that mastering this concept is essential for your roleplays. Try framing your approach by considering the customer's core needs first!"
      };
      setMessages(prev => [...prev, newAiMsg]);
      setIsTyping(false);
    }, 1500);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  return (
    <>
      <main className="flex-1 lg:ml-64 flex flex-col bg-surface relative overflow-hidden h-screen">
        <div className="flex flex-1 overflow-hidden">
          
          {/* Chat Interface */}
          <div className="flex-1 flex flex-col h-full bg-surface">
            {/* Chat Header */}
            <div className="px-8 py-6 flex items-center justify-between bg-surface/50 backdrop-blur-sm z-10 border-b border-surface-container-low">
              <div>
                <h2 className="text-2xl font-extrabold text-on-surface tracking-tight">DECA Coach</h2>
                <p className="text-sm text-secondary font-medium">Performance Indicator AI Assistant</p>
              </div>
              <div className="flex items-center gap-2">
                <span className="flex h-2 w-2 rounded-full bg-green-500 animate-pulse"></span>
                <span className="text-xs font-bold text-secondary uppercase tracking-widest hidden sm:inline">Active Session</span>
              </div>
            </div>

            {/* Message Area */}
            <div className="flex-1 overflow-y-auto px-4 sm:px-8 py-4 space-y-8">
              {messages.map((msg) => {
                if (msg.sender === 'user') {
                  return (
                    <div key={msg.id} className="flex justify-end">
                      <div className="max-w-[85%] sm:max-w-[80%] bg-primary text-on-primary p-4 rounded-xl rounded-tr-none shadow-lg">
                        <p className="text-sm font-body leading-relaxed whitespace-pre-wrap">{msg.text}</p>
                      </div>
                    </div>
                  );
                } else {
                  return (
                    <div key={msg.id} className="flex justify-start">
                      <div className="max-w-[95%] sm:max-w-[85%] space-y-4">
                        <div className="bg-surface-container-low border border-outline-variant/10 p-5 rounded-xl rounded-tl-none shadow-sm text-on-surface">
                          {msg.performanceIndicator && (
                            <div className="flex items-center gap-2 mb-3 text-primary">
                              <span className="material-symbols-outlined text-[18px]">auto_awesome</span>
                              <span className="text-[10px] sm:text-xs font-bold tracking-widest uppercase">Performance Indicator: {msg.performanceIndicator}</span>
                            </div>
                          )}
                          <div 
                            className="text-sm font-body leading-relaxed mb-0 prose prose-sm max-w-none text-on-surface"
                            dangerouslySetInnerHTML={{ __html: msg.text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/\n/g, '<br />') }}
                          />
                        </div>
                      </div>
                    </div>
                  );
                }
              })}
              
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-surface-container-low border border-outline-variant/10 p-4 rounded-xl rounded-tl-none shadow-sm flex items-center gap-2">
                    <span className="w-2 h-2 bg-primary/40 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                    <span className="w-2 h-2 bg-primary/60 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                    <span className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-4 sm:p-6 bg-surface border-t border-surface-container-low pb-20 lg:pb-6">
              <div className="max-w-4xl mx-auto relative flex items-center">
                <div className="w-full flex items-center bg-surface-container-low rounded-xl px-4 py-3 border-b-2 border-transparent focus-within:border-primary focus-within:bg-surface-container-lowest transition-all shadow-inner">
                  <input 
                    className="bg-transparent border-none focus:ring-0 w-full text-on-surface placeholder:text-outline font-body" 
                    placeholder="Ask about a PI, request a roleplay, or seek feedback..." 
                    type="text"
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    onKeyDown={handleKeyDown}
                  />
                  <div className="flex items-center gap-3 pl-3">
                    <button className="text-outline hover:text-primary transition-colors hidden sm:block">
                      <span className="material-symbols-outlined">attach_file</span>
                    </button>
                    <button 
                      onClick={handleSend}
                      disabled={!inputText.trim() || isTyping}
                      className="bg-gradient-to-br from-primary to-primary-container text-on-primary h-10 w-10 flex items-center justify-center rounded-lg shadow-md hover:scale-105 transition-transform active:opacity-80 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <span className="material-symbols-outlined border-none">send</span>
                    </button>
                  </div>
                </div>
              </div>
              <p className="text-center mt-3 text-[10px] text-outline uppercase tracking-tighter">Powered by IHS DECAprep AI Training Engine • DECA 2024 Prep</p>
            </div>
          </div>

          {/* Scenario-Based Sidebar */}
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
                <h4 className="text-[10px] font-bold text-outline uppercase tracking-widest">Recommended PIs</h4>
                <div className="bg-surface-container-low p-3 rounded-lg hover:bg-surface-container-high cursor-pointer transition-colors group">
                  <div className="flex justify-between items-start mb-1">
                    <span className="text-[10px] font-bold text-tertiary">PM:003</span>
                    <span className="material-symbols-outlined text-xs text-outline group-hover:text-primary">arrow_forward</span>
                  </div>
                  <p className="text-xs font-bold text-on-surface">Product Life Cycle Stages</p>
                </div>
                <div className="bg-surface-container-low p-3 rounded-lg hover:bg-surface-container-high cursor-pointer transition-colors group">
                  <div className="flex justify-between items-start mb-1">
                    <span className="text-[10px] font-bold text-tertiary">CR:016</span>
                    <span className="material-symbols-outlined text-xs text-outline group-hover:text-primary">arrow_forward</span>
                  </div>
                  <p className="text-xs font-bold text-on-surface">Handling Difficult Customers</p>
                </div>
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
