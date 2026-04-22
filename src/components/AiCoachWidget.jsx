import { useState, useRef, useEffect } from 'react';
import { coachInitialMessages } from '../data/mockData';

const GROQ_API_KEY = import.meta.env.VITE_GROQ_API_KEY;

const BASE_SYSTEM_PROMPT = `You are DECA Coach, an expert AI tutor for DECA (Distributive Education Clubs of America) competition preparation. You specialize in helping students prepare for DECA competitive events.

Your expertise includes:
- Performance Indicators (PIs) across all DECA career clusters
- Marketing, Finance, Hospitality & Tourism, Business Administration, and Entrepreneurship
- Roleplay scenario coaching and presentation tips
- Exam preparation strategies and concept breakdowns
- Business terminology and real-world applications

Guidelines for your responses:
- Be encouraging and supportive, like a knowledgeable coach
- When relevant, reference specific Performance Indicators (e.g., "This relates to PI: MK:015")
- Keep responses focused and concise (2-4 paragraphs max)
- Use bold text (**like this**) for key terms and concepts
- When explaining concepts, use real-world business examples
- If asked about roleplay, provide structured tips for the presentation
- Always relate concepts back to DECA competition preparation`;

export default function AiCoachWidget({ variant = 'standalone', contextPrompt = '', onClose }) {
  const [messages, setMessages] = useState(coachInitialMessages);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [error, setError] = useState(null);
  const [isOpen, setIsOpen] = useState(variant !== 'popup');
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isTyping, isOpen]);

  // If context changes (e.g. user moves to a new question), optionally add a system note or reset.
  // For now, we just pass contextPrompt to the API on every call.

  const handleSend = async () => {
    if (!inputText.trim() || isTyping) return;

    const userMessage = inputText.trim();
    const newUserMsg = {
      id: Date.now(),
      sender: 'user',
      text: userMessage
    };

    setMessages(prev => [...prev, newUserMsg]);
    setInputText('');
    setIsTyping(true);
    setError(null);

    // Build conversation history for context (OpenAI-compatible format for Groq)
    const conversationHistory = [...messages, newUserMsg]
      .filter(m => m.sender === 'user' || m.sender === 'ai')
      .map(m => ({
        role: m.sender === 'user' ? 'user' : 'assistant',
        content: m.text
      }));

    if (!GROQ_API_KEY) {
      setTimeout(() => {
        const fallbackMsg = {
          id: Date.now() + 1,
          sender: 'ai',
          text: `I'd love to help you with that! However, the AI service needs a **Groq API key** to provide real-time responses.\n\n**To set it up:**\n1. Get a free API key at [console.groq.com](https://console.groq.com)\n2. Create a \`.env\` file in the project root\n3. Add: \`VITE_GROQ_API_KEY=your_key_here\`\n4. Restart the dev server`
        };
        setMessages(prev => [...prev, fallbackMsg]);
        setIsTyping(false);
      }, 800);
      return;
    }

    try {
      const fullSystemPrompt = contextPrompt 
        ? `${BASE_SYSTEM_PROMPT}\n\nCRITICAL CONTEXT FOR CURRENT SESSION:\n${contextPrompt}` 
        : BASE_SYSTEM_PROMPT;

      const apiMessages = [
        { role: 'system', content: fullSystemPrompt },
        ...conversationHistory
      ];

      const response = await fetch(
        'https://api.groq.com/openai/v1/chat/completions',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${GROQ_API_KEY}`
          },
          body: JSON.stringify({
            model: 'llama-3.3-70b-versatile',
            messages: apiMessages,
            temperature: 0.7,
            top_p: 0.95,
            max_tokens: 1024,
          })
        }
      );

      if (!response.ok) {
        const errBody = await response.text();
        throw new Error(`API request failed (${response.status}): ${errBody}`);
      }

      const data = await response.json();
      const aiText = data.choices?.[0]?.message?.content;

      if (!aiText) {
        throw new Error('No response received from AI');
      }

      const piMatch = aiText.match(/PI:\s*([A-Z]{2}:\d{3})/);

      const newAiMsg = {
        id: Date.now() + 1,
        sender: 'ai',
        performanceIndicator: piMatch ? piMatch[1] : null,
        text: aiText
      };

      setMessages(prev => [...prev, newAiMsg]);
    } catch (err) {
      console.error('Groq API error:', err);
      setError('Failed to get a response. Please try again.');
      const errorMsg = {
        id: Date.now() + 1,
        sender: 'ai',
        text: `I encountered an error processing your request. Please try again in a moment.\n\n*Error: ${err.message}*`
      };
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  // ── Render Popup Variant ──
  if (variant === 'popup') {
    return (
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
        {isOpen && (
          <div className="bg-surface w-96 h-[500px] mb-4 rounded-2xl shadow-2xl border border-surface-container-high flex flex-col overflow-hidden animate-in slide-in-from-bottom-5">
            {/* Header */}
            <div className="bg-primary text-on-primary px-4 py-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined">smart_toy</span>
                <span className="font-bold text-sm">DECA Coach</span>
              </div>
              <button onClick={() => setIsOpen(false)} className="hover:bg-white/20 p-1 rounded-md transition-colors">
                <span className="material-symbols-outlined text-sm">close</span>
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-surface">
              {messages.map((msg) => (
                <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[85%] p-3 rounded-xl text-sm ${msg.sender === 'user' ? 'bg-primary text-on-primary rounded-tr-none' : 'bg-surface-container-low text-on-surface rounded-tl-none border border-outline-variant/10'}`}>
                    {msg.sender === 'ai' && msg.performanceIndicator && (
                      <div className="text-[10px] font-bold text-primary mb-1 uppercase">PI: {msg.performanceIndicator}</div>
                    )}
                    <div className="prose prose-sm max-w-none prose-p:leading-snug" dangerouslySetInnerHTML={{ __html: msg.text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/\n/g, '<br />') }} />
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-surface-container-low p-3 rounded-xl rounded-tl-none border border-outline-variant/10 flex gap-1">
                    <span className="w-1.5 h-1.5 bg-primary/40 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                    <span className="w-1.5 h-1.5 bg-primary/60 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                    <span className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-3 bg-surface border-t border-surface-container-low">
              <div className="flex items-center bg-surface-container-low rounded-lg px-3 py-2 border border-transparent focus-within:border-primary">
                <input
                  className="bg-transparent border-none focus:ring-0 w-full text-sm placeholder:text-outline font-body"
                  placeholder="Ask a question..."
                  type="text"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  onKeyDown={handleKeyDown}
                />
                <button
                  onClick={handleSend}
                  disabled={!inputText.trim() || isTyping}
                  className="text-primary disabled:opacity-50 ml-2"
                >
                  <span className="material-symbols-outlined text-[20px]">send</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Toggle Button */}
        {!isOpen && (
          <button
            onClick={() => setIsOpen(true)}
            className="w-14 h-14 bg-primary text-on-primary rounded-full shadow-xl flex items-center justify-center hover:scale-105 transition-transform"
          >
            <span className="material-symbols-outlined text-[28px]">chat</span>
          </button>
        )}
      </div>
    );
  }

  // ── Render Standalone or Sidebar Variant ──
  return (
    <div className={`flex flex-col h-full bg-surface ${variant === 'sidebar' ? 'border-l border-surface-container-low' : ''}`}>
      {/* Header */}
      <div className="px-6 py-5 flex items-center justify-between bg-surface/50 backdrop-blur-sm z-10 border-b border-surface-container-low">
        <div>
          <h2 className="text-xl font-extrabold text-on-surface tracking-tight">DECA Coach</h2>
          {variant === 'standalone' && <p className="text-xs text-secondary font-medium">Performance Indicator AI Assistant</p>}
        </div>
        <div className="flex items-center gap-2">
          <span className={`flex h-2 w-2 rounded-full ${GROQ_API_KEY ? 'bg-green-500' : 'bg-amber-500'} animate-pulse`}></span>
          {variant === 'standalone' && (
            <span className="text-[10px] font-bold text-secondary uppercase tracking-widest hidden sm:inline">
              {GROQ_API_KEY ? 'AI Connected' : 'Setup Required'}
            </span>
          )}
        </div>
      </div>

      {/* Message Area */}
      <div className="flex-1 overflow-y-auto px-4 sm:px-6 py-4 space-y-6">
        {messages.map((msg) => {
          if (msg.sender === 'user') {
            return (
              <div key={msg.id} className="flex justify-end">
                <div className="max-w-[85%] bg-primary text-on-primary p-3.5 rounded-xl rounded-tr-none shadow-sm">
                  <p className="text-sm font-body leading-relaxed whitespace-pre-wrap">{msg.text}</p>
                </div>
              </div>
            );
          } else {
            return (
              <div key={msg.id} className="flex justify-start">
                <div className="max-w-[95%] space-y-3">
                  <div className="bg-surface-container-low border border-outline-variant/10 p-4 rounded-xl rounded-tl-none shadow-sm text-on-surface">
                    {msg.performanceIndicator && (
                      <div className="flex items-center gap-2 mb-2 text-primary">
                        <span className="material-symbols-outlined text-[16px]">auto_awesome</span>
                        <span className="text-[10px] font-bold tracking-widest uppercase">PI: {msg.performanceIndicator}</span>
                      </div>
                    )}
                    <div
                      className="text-sm font-body leading-relaxed mb-0 prose prose-sm max-w-none text-on-surface"
                      dangerouslySetInnerHTML={{ __html: msg.text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/\*(.*?)\*/g, '<em>$1</em>').replace(/\n/g, '<br />') }}
                    />
                  </div>
                </div>
              </div>
            );
          }
        })}

        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-surface-container-low border border-outline-variant/10 p-3 rounded-xl rounded-tl-none shadow-sm flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-primary/40 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
              <span className="w-1.5 h-1.5 bg-primary/60 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
              <span className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className={`p-4 bg-surface border-t border-surface-container-low ${variant === 'standalone' ? 'pb-20 lg:pb-4' : ''}`}>
        <div className="w-full flex items-center bg-surface-container-low rounded-xl px-3 py-2 border-b-2 border-transparent focus-within:border-primary focus-within:bg-surface-container-lowest transition-all shadow-inner">
          <input
            className="bg-transparent border-none focus:ring-0 w-full text-sm text-on-surface placeholder:text-outline font-body py-1"
            placeholder="Ask your coach..."
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <div className="flex items-center pl-2">
            <button
              onClick={handleSend}
              disabled={!inputText.trim() || isTyping}
              className="bg-gradient-to-br from-primary to-primary-container text-on-primary h-8 w-8 flex items-center justify-center rounded-lg shadow-sm hover:scale-105 transition-transform active:opacity-80 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span className="material-symbols-outlined text-[18px] border-none">send</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
