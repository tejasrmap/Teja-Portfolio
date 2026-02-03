
import React, { useState, useRef, useEffect } from 'react';
import { getGeminiResponse } from '../services/geminiService';
import { ChatMessage } from '../types';

export const AIChat: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: "Welcome to the Liquid Core. I am Teja's Fluid Assistant. How can I clarify your understanding of our architecture today?" }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isOpen]);

  const handleSendMessage = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!inputValue.trim() || isLoading) return;

    const userText = inputValue;
    setInputValue('');
    setMessages(prev => [...prev, { role: 'user', text: userText }]);
    setIsLoading(true);

    const response = await getGeminiResponse(userText, messages);
    setMessages(prev => [...prev, { role: 'model', text: response }]);
    setIsLoading(false);
  };

  return (
    <div className="fixed bottom-10 right-10 z-[100] flex flex-col items-end">
      {/* Chat Window */}
      {isOpen && (
        <div className="mb-6 w-80 md:w-[450px] h-[600px] liquid-glass rounded-[3rem] flex flex-col shadow-[0_30px_60px_-15px_rgba(0,0,0,0.5)] overflow-hidden animate-in fade-in slide-in-from-bottom-10 duration-500">
          <div className="p-8 border-b border-white/10 flex justify-between items-center bg-white/5">
            <div className="flex items-center gap-4">
              <div className="w-3 h-3 bg-cyan-400 rounded-full animate-pulse shadow-[0_0_15px_rgba(34,211,238,0.8)]"></div>
              <span className="font-bold tracking-tight text-lg">Fluid Assistant</span>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-white/40 hover:text-white transition-colors">
              <i className="fa-solid fa-xmark text-xl"></i>
            </button>
          </div>

          <div ref={scrollRef} className="flex-1 overflow-y-auto p-8 space-y-6 font-medium text-sm leading-relaxed scroll-smooth text-white/90">
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] px-6 py-4 rounded-[2rem] ${
                  msg.role === 'user' 
                    ? 'bg-cyan-500 text-white rounded-br-none shadow-lg' 
                    : 'bg-white/10 text-white/90 rounded-tl-none border border-white/10'
                }`}>
                  {msg.text}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white/5 text-cyan-400 px-6 py-4 rounded-[2rem] rounded-tl-none border border-cyan-500/20 italic">
                  Refining response...
                </div>
              </div>
            )}
          </div>

          <form onSubmit={handleSendMessage} className="p-8 bg-white/5 border-t border-white/10 flex gap-4">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Inquire..."
              className="flex-1 bg-white/5 border border-white/20 rounded-full px-6 py-4 text-sm focus:outline-none focus:ring-4 focus:ring-cyan-500/20 transition-all placeholder:text-white/20 text-white"
            />
            <button 
              type="submit" 
              disabled={isLoading}
              className="bg-white text-black w-14 h-14 rounded-full flex items-center justify-center hover:bg-cyan-400 transition-all shadow-xl disabled:opacity-50 group"
            >
              <i className="fa-solid fa-arrow-up group-hover:-translate-y-1 transition-transform"></i>
            </button>
          </form>
        </div>
      )}

      {/* Toggle Button */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="h-20 w-20 liquid-glass rounded-full flex items-center justify-center transition-all hover:scale-110 active:scale-95 group shadow-2xl relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/20 to-fuchsia-500/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
        <i className={`fa-solid ${isOpen ? 'fa-xmark' : 'fa-droplet'} text-2xl relative z-10 text-white`}></i>
      </button>
    </div>
  );
};
