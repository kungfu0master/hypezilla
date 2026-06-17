import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, Bot, User, Loader2 } from 'lucide-react';

interface Message {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

const SYSTEM_PROMPT = `You are HypeBot, the AI assistant for Hypezilla, a premium results-driven digital marketing agency.
Your goal is to help visitors understand our services (SEO, Social Media, Web Development, Content Marketing) and encourage them to partner with us.
You are professional, highly energetic, marketing-savvy, and concise.
You MUST communicate fluidly in both English and Hinglish (a mix of Hindi and English). Match the user's language—if they use English, respond in English; if they use Hinglish or Hindi (written in English script), respond enthusiastically in Hinglish!
If someone asks about pricing or detailed strategies, suggest they fill out the contact form.`;

export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: "Hey there! 👋 I'm the Hypezilla AI. How can we skyrocket your digital presence today? (Aap mujhse English ya Hinglish mein baat kar sakte hain!)" }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    const newMessages: Message[] = [...messages, { role: 'user', content: userMessage }];
    setMessages(newMessages);
    setIsLoading(true);

    try {
      const apiMessages = [
        { role: 'system', content: SYSTEM_PROMPT },
        ...newMessages
      ];

      const response = await fetch('https://text.pollinations.ai/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ messages: apiMessages }),
      });

      if (!response.ok) throw new Error('API request failed');

      const data = await response.text();
      
      setMessages((prev) => [...prev, { role: 'assistant', content: data }]);
    } catch (error) {
      console.error('Chat error:', error);
      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: "Oops! My circuits got a little tangled. Please try again or reach out via our contact section!" }
      ]);
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
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-6 right-6 z-[9900] w-14 h-14 rounded-full bg-[#cc2428] shadow-[0_0_20px_rgba(204,36,40,0.4)] flex items-center justify-center text-white cursor-pointer hover:bg-[#a51c20] transition-colors"
          >
            <MessageCircle size={28} />
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
            className="fixed bottom-6 right-6 z-[9900] w-[350px] sm:w-[400px] h-[550px] max-h-[80vh] flex flex-col rounded-2xl overflow-hidden card-bg border border-color shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 bg-[#cc2428] text-white">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                  <Bot size={20} />
                </div>
                <div>
                  <h3 className="font-bold text-[1rem]">HypeBot</h3>
                  <p className="text-xs text-white/80">Online & ready to help</p>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="w-8 h-8 rounded-full hover:bg-white/20 flex items-center justify-center transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar">
              {messages.map((msg, idx) => (
                msg.role !== 'system' && (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}
                  >
                    <div className={`w-8 h-8 shrink-0 rounded-full flex items-center justify-center ${
                      msg.role === 'user' ? 'bg-[#eab308] text-black' : 'bg-white/10 text-white'
                    }`}>
                      {msg.role === 'user' ? <User size={16} /> : <Bot size={16} />}
                    </div>
                    
                    <div className={`max-w-[75%] rounded-2xl px-4 py-3 text-[0.95rem] ${
                      msg.role === 'user' 
                        ? 'bg-[#eab308] text-black rounded-tr-sm' 
                        : 'bg-white/5 text-white border border-white/10 rounded-tl-sm'
                    }`}>
                      <span className="whitespace-pre-wrap">{msg.content}</span>
                    </div>
                  </motion.div>
                )
              ))}
              
              {isLoading && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex gap-3"
                >
                  <div className="w-8 h-8 shrink-0 rounded-full bg-white/10 flex items-center justify-center text-white">
                    <Bot size={16} />
                  </div>
                  <div className="bg-white/5 border border-white/10 rounded-2xl rounded-tl-sm px-4 py-3">
                    <Loader2 size={18} className="animate-spin text-[#cc2428]" />
                  </div>
                </motion.div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 border-t border-color bg-[#0a0a0f]/50">
              <form onSubmit={handleSubmit} className="flex items-center gap-2 relative">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask anything..."
                  className="flex-1 bg-white/5 border border-white/10 rounded-full px-4 py-3 text-sm text-white focus:outline-none focus:border-[#cc2428] transition-colors"
                  disabled={isLoading}
                />
                <button
                  type="submit"
                  disabled={!input.trim() || isLoading}
                  className="w-10 h-10 shrink-0 rounded-full bg-[#cc2428] flex items-center justify-center text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#a51c20] transition-colors"
                >
                  <Send size={16} className="ml-1" />
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
