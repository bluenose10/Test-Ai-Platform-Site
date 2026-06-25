import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Bot, User, ChevronDown, ChevronUp, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import Markdown from 'react-markdown';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  context?: string[];
}

export function AIAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: 'Hello! I am the Acme AI Assistant. How can I help you today?'
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMsg: Message = { id: Date.now().toString(), role: 'user', content: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      const apiKey = import.meta.env.NEXT_PUBLIC_EVAL_LIVE_KEY || import.meta.env.VITE_EVAL_LIVE_KEY;

      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          question: userMsg.content,
          apiKey
        })
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(`Proxy error: ${response.status} ${errorData.error || ''}`);
      }

      const data = await response.json();
      
      const assistantMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: data.answer || data.response || data.message || 'I received a response, but could not parse the text.',
        context: data.context
      };

      setMessages(prev => [...prev, assistantMsg]);
    } catch (error: any) {
      console.error('Chat error:', error);
      const errorMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: `I'm sorry, I encountered an error communicating with the chat server: ${error.message}`,
      };
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-6 right-6 w-14 h-14 bg-amber-500/10 text-amber-500 border border-amber-500/20 rounded-full shadow-2xl flex items-center justify-center hover:bg-amber-500/20 transition-all z-50 focus:outline-none backdrop-blur-sm"
            aria-label="Open AI Assistant"
          >
            <MessageSquare className="w-6 h-6" />
          </motion.button>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-6 right-6 w-[90vw] sm:w-[360px] h-[600px] max-h-[80vh] bg-[#16181D] border border-white/10 shadow-2xl rounded-2xl flex flex-col z-50 overflow-hidden ring-1 ring-white/5"
          >
            {/* Header */}
            <div className="bg-white/5 p-4 flex justify-between items-center border-b border-white/5">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                <span className="text-[11px] font-bold uppercase tracking-widest text-white">AI Strategy Assistant</span>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="text-slate-500 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-4">
              {messages.map((msg) => (
                <MessageBubble key={msg.id} message={msg} />
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-white/5 border border-white/5 rounded-lg rounded-tl-none p-3 flex items-center gap-2">
                    <Loader2 className="w-3 h-3 text-emerald-500 animate-spin" />
                    <span className="text-xs text-slate-400">Analyzing...</span>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 bg-black/40 border-t border-white/5">
              <form onSubmit={handleSubmit} className="flex gap-2 bg-white/5 rounded-full px-4 py-2 border border-white/10">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask about your strategy..."
                  className="bg-transparent border-none text-xs text-white focus:ring-0 flex-1 outline-none placeholder:text-slate-500"
                  disabled={isLoading}
                />
                <button
                  type="submit"
                  disabled={!input.trim() || isLoading}
                  className="text-amber-500 hover:text-amber-400 disabled:opacity-50 disabled:hover:text-amber-500 transition-colors"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function MessageBubble({ message }: { message: Message }) {
  const isUser = message.role === 'user';
  const [showSources, setShowSources] = useState(false);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`flex ${isUser ? 'justify-end pl-8' : 'justify-start pr-8'} w-full`}
    >
      {isUser ? (
        <div className="bg-amber-500/10 p-3 rounded-lg rounded-tr-none border border-amber-500/20 w-full">
          <p className="text-xs text-amber-100 italic">"{message.content}"</p>
        </div>
      ) : (
        <div className="bg-white/5 p-3 rounded-lg rounded-tl-none border border-white/5 w-full">
          <div className="text-xs text-slate-300 leading-relaxed prose prose-sm prose-invert max-w-none prose-p:leading-relaxed prose-a:text-amber-500 hover:prose-a:text-amber-400">
            <Markdown>{message.content}</Markdown>
          </div>

          {/* Sources */}
          {message.context && message.context.length > 0 && (
            <div className="mt-3 flex flex-col items-start">
              <button 
                onClick={() => setShowSources(!showSources)}
                className="flex items-center gap-2 text-[9px] uppercase tracking-tighter text-amber-500 border border-amber-500/20 px-2 py-1 rounded hover:bg-amber-500/10 transition-all"
              >
                {showSources ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
                View Sources ({message.context.length})
              </button>
              
              <AnimatePresence>
                {showSources && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden w-full"
                  >
                    <div className="flex flex-col gap-2 mt-2 pt-2 border-t border-white/5 w-full">
                      {message.context.map((chunk, idx) => (
                        <div key={idx} className="bg-black/20 border border-white/5 p-2.5 rounded-md text-[11px] text-slate-400 shadow-sm leading-relaxed whitespace-pre-wrap font-mono">
                          {chunk}
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}
        </div>
      )}
    </motion.div>
  );
}
