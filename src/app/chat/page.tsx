// This file was auto-generated or modified
'use client'

import { useState, useRef, useEffect } from 'react';
import { Send, Loader2, Home, ArrowLeft, Bot, User, Sparkles } from 'lucide-react';
import Link from 'next/link';

export default function ChatPage() {
  const [prompt, setPrompt] = useState('');
  const [messages, setMessages] = useState<{role: 'user' | 'ai', content: string}[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim() || isLoading) return;

    const userPrompt = prompt;
    setPrompt('');
    setMessages(prev => [...prev, { role: 'user', content: userPrompt }]);
    setIsLoading(true);

    setMessages(prev => [...prev, { role: 'ai', content: '' }]);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: userPrompt }),
      });

      if (!response.body) throw new Error('No response body');

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let done = false;
      let aiResponse = "";

      while (!done) {
        const { value, done: doneReading } = await reader.read();
        done = doneReading;
        const chunkValue = decoder.decode(value, { stream: true });
        aiResponse += chunkValue;

        setMessages(prev => {
          const newMessages = [...prev];
          const lastMessage = newMessages[newMessages.length - 1];
          if (lastMessage && lastMessage.role === 'ai') {
            lastMessage.content = aiResponse;
          }
          return newMessages;
        });
      }
    } catch (error) {
      console.error('Error fetching chat:', error);
      setMessages(prev => {
        const newMessages = [...prev];
        const lastMessage = newMessages[newMessages.length - 1];
        if (lastMessage && lastMessage.role === 'ai') {
          lastMessage.content = "Xin lỗi, có lỗi khi kết nối với dịch vụ AI. Vui lòng đảm bảo cấu hình phần mềm của bạn đã chính xác.";
        }
        return newMessages;
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-slate-950 text-slate-50 selection:bg-indigo-500/30">
      
      {/* Header */}
      <header className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-900/80 backdrop-blur-md shrink-0 shadow-sm sticky top-0 z-20">
        <div className="flex items-center gap-4">
          <Link href="/dashboard" className="text-slate-400 hover:text-white transition-colors p-2 bg-slate-800/50 rounded-full hover:bg-slate-700 border border-slate-700/50">
            <ArrowLeft size={18} />
          </Link>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-indigo-500/20 flex items-center justify-center border border-indigo-500/30">
              <Bot size={18} className="text-indigo-400" />
            </div>
            <h1 className="font-bold text-lg text-slate-100 tracking-tight">Trò chuyện cùng AI Architect</h1>
          </div>
        </div>
        <Link href="/dashboard" className="hidden sm:flex items-center gap-2 text-sm bg-slate-800 border border-slate-700 px-4 py-2 rounded-lg hover:bg-slate-700 transition font-medium text-slate-300">
          <Home size={16} /> Bảng điều khiển
        </Link>
      </header>

      {/* Main Chat Area */}
      <main className="flex-1 overflow-y-auto p-4 md:p-8 relative">
        {/* Background Glow */}
        <div className="fixed top-1/2 left-1/2 w-[600px] h-[600px] bg-indigo-900/10 rounded-full blur-[150px] pointer-events-none translate-x-[-50%] translate-y-[-50%] z-0"></div>

        <div className="w-full max-w-4xl mx-auto flex flex-col gap-6 relative z-10">
          {messages.length === 0 && (
            <div className="text-center py-24 mb-10 w-full animate-fade-in">
              <div className="inline-flex justify-center items-center w-20 h-20 bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 rounded-3xl mb-8 shadow-[0_0_30px_-5px_rgba(79,70,229,0.2)]">
                <Sparkles size={36} strokeWidth={1.5} />
              </div>
              <h2 className="text-4xl md:text-5xl font-extrabold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-400 tracking-tight">
                Kiến trúc sư AI bậc thầy
              </h2>
              <p className="text-slate-400 max-w-xl mx-auto leading-relaxed text-lg">
                Mô tả ý tưởng ứng dụng. AI của chúng tôi sẽ lập tức tạo ra danh sách tính năng chi tiết, sơ đồ cơ sở dữ liệu và đề xuất toàn bộ giao diện.
              </p>
            </div>
          )}

          {messages.map((msg, i) => (
            <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-fade-in`}>
              <div className={`flex gap-4 max-w-[85%] ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                
                {/* Avatar */}
                <div className="shrink-0 mt-1">
                  {msg.role === 'user' ? (
                    <div className="w-10 h-10 rounded-full bg-indigo-600 flex items-center justify-center shadow-lg shadow-indigo-500/20">
                      <User size={18} className="text-white" />
                    </div>
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center">
                      <Bot size={18} className="text-indigo-400" />
                    </div>
                  )}
                </div>

                {/* Message Bubble */}
                <div className={`rounded-2xl p-5 ${
                  msg.role === 'user' 
                    ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/10 rounded-tr-sm' 
                    : 'bg-slate-900/80 backdrop-blur-md border border-slate-800 text-slate-200 shadow-xl rounded-tl-sm'
                }`}>
                  {msg.role === 'ai' ? (
                    <div className="prose prose-sm md:prose-base prose-invert max-w-none prose-pre:bg-slate-950 prose-pre:border prose-pre:border-slate-800">
                      <pre className="whitespace-pre-wrap font-sans bg-transparent p-0 m-0 border-0 leading-relaxed text-[15px]">{msg.content}</pre>
                    </div>
                  ) : (
                    <div className="whitespace-pre-wrap leading-relaxed text-[15px]">{msg.content}</div>
                  )}
                </div>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} className="h-4" />
        </div>
      </main>

      {/* Input Area */}
      <footer className="shrink-0 p-4 md:p-6 border-t border-slate-800 bg-slate-900/95 backdrop-blur-xl relative z-20">
        <form onSubmit={handleSubmit} className="w-full max-w-4xl mx-auto relative flex items-end gap-3">
          <div className="relative flex-1 bg-slate-950 rounded-2xl border border-slate-700 focus-within:border-indigo-500 focus-within:ring-1 focus-within:ring-indigo-500 transition-all overflow-hidden shadow-inner">
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="VD: Tôi muốn xây dựng ứng dụng theo dõi sức khỏe, chạy bộ và đếm lượng calo..."
              className="w-full bg-transparent px-5 py-4 pr-4 focus:outline-none resize-none min-h-[64px] max-h-[200px] text-slate-100 placeholder-slate-500 text-base"
              style={{ height: '64px' }}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSubmit(e);
                }
              }}
            />
          </div>
          <button
            type="submit"
            disabled={!prompt.trim() || isLoading}
            className="bg-indigo-600 text-white h-[64px] w-[64px] rounded-2xl disabled:opacity-50 hover:bg-indigo-500 transition-all duration-300 shadow-[0_0_20px_-5px_rgba(79,70,229,0.5)] flex items-center justify-center shrink-0 group"
          >
            {isLoading ? (
              <Loader2 size={24} className="animate-spin" />
            ) : (
              <Send size={24} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            )}
          </button>
        </form>
        <p className="text-center text-xs text-slate-500 mt-4 font-medium tracking-wide">
          Nội dung do AI tạo ra có thể không chính xác. Hãy luôn kiểm tra lại các thông tin kỹ thuật.
        </p>
      </footer>
    </div>
  );
}
