'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send } from 'lucide-react';
import { ChatMessage } from '@/types';
import { mockChatResponses } from '@/data/mockData';

const suggestedQuestions = [
  '이직할까요?',
  '창업해도 될까요?',
  '이 사람과 계속 만나도 될까요?',
  '올해 해외에 나가도 될까요?',
  '지금 투자해도 될까요?',
];

export default function ChatInterface({ userName }: { userName: string }) {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '0',
      role: 'ai',
      content: `안녕하세요, ${userName}님. 저는 당신의 사주를 바탕으로 고민을 함께 풀어드리는 AI입니다. 무엇이든 편하게 물어보세요 ✨`,
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = async (text: string) => {
    if (!text.trim()) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: text,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    await new Promise((r) => setTimeout(r, 1500));

    const responseKey = Object.keys(mockChatResponses).find((key) =>
      text.includes(key) || key.includes(text)
    );
    const responseText =
      responseKey
        ? mockChatResponses[responseKey]
        : `${userName}님의 사주를 분석한 결과, 목(木) 기운이 강한 당신은 지금 변화의 시기에 있습니다. 이 고민은 충분히 이해되며, 3개월 안에 자연스러운 해답이 찾아올 것입니다. 직관을 믿고 천천히 나아가세요.`;

    const aiMsg: ChatMessage = {
      id: (Date.now() + 1).toString(),
      role: 'ai',
      content: responseText,
      timestamp: new Date(),
    };

    setIsTyping(false);
    setMessages((prev) => [...prev, aiMsg]);
  };

  return (
    <div className="flex flex-col h-full">
      <div className="px-4 pb-4">
        <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-1">
          {suggestedQuestions.map((q) => (
            <button
              key={q}
              onClick={() => sendMessage(q)}
              className="flex-shrink-0 text-xs px-3 py-2 rounded-full bg-white/5 border border-white/10 text-white/70 hover:bg-[#C4B5FD]/10 hover:border-[#C4B5FD]/30 hover:text-[#C4B5FD] transition-all duration-200"
            >
              {q}
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-4 space-y-4 scrollbar-hide">
        <AnimatePresence>
          {messages.map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {msg.role === 'ai' && (
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center text-xs mr-2 flex-shrink-0 mt-1">
                  ✦
                </div>
              )}
              <div
                className={`max-w-[80%] px-4 py-3 rounded-3xl text-sm leading-relaxed ${
                  msg.role === 'user'
                    ? 'bg-[#C4B5FD]/20 text-white border border-[#C4B5FD]/20'
                    : 'bg-white/5 text-white/80 border border-white/10'
                }`}
              >
                {msg.content}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {isTyping && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center gap-3"
          >
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center text-xs">
              ✦
            </div>
            <div className="bg-white/5 border border-white/10 rounded-3xl px-4 py-3 flex gap-1">
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  className="w-1.5 h-1.5 rounded-full bg-white/40"
                  animate={{ y: [0, -4, 0] }}
                  transition={{ delay: i * 0.15, duration: 0.6, repeat: Infinity }}
                />
              ))}
            </div>
          </motion.div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="px-4 pt-4 pb-2">
        <div className="flex gap-2 items-end">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && sendMessage(input)}
            placeholder="고민을 자유롭게 물어보세요..."
            className="flex-1 bg-white/5 border border-white/10 rounded-2xl px-4 py-3 text-sm text-white placeholder-white/30 focus:outline-none focus:border-[#C4B5FD]/40 transition-all"
          />
          <button
            onClick={() => sendMessage(input)}
            className="w-11 h-11 rounded-2xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center hover:from-violet-400 hover:to-purple-500 transition-all flex-shrink-0"
          >
            <Send size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
