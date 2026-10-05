import { ArrowUp } from "lucide-react";
import { RefObject, SetStateAction, useEffect, useRef, useState } from "react";
import generateSmartReply, { allReplies } from "./GenerateSmartReply";
import { useTranslations } from 'next-intl';

// Calls the static stand-in "nMessage relay" (app/api/nmessage) so the chat shows real
// traffic in the network tab. Resolves with the JSON body, or null on failure; callers fall
// back to local data so the chat works offline too.
const relay = async (path: string, query: Record<string, string | number> = {}) => {
  try {
    const params = new URLSearchParams(Object.entries(query).map(([k, v]) => [k, String(v)]));
    const res = await fetch(`/api/nmessage/${path}?${params}`, { cache: 'no-store' });
    return res.ok ? await res.json() : null;
  } catch {
    return null;
  }
};

const sleep = (ms: number) => new Promise<void>((resolve) => setTimeout(resolve, ms));

export default function DockMessageContent() {
  const t = useTranslations('socials.dockMessage');
  const typingIndicatorCSS = `
    @keyframes bouncing {
      0% { transform: translateY(0); }
      100% { transform: translateY(-4px); }
    }
    .typing-indicator {
      display: flex;
      align-items: center;
    }
    .typing-dot {
      width: 8px;
      height: 8px;
      margin: 0 1px;
      background-color: #666;
      border-radius: 50%;
      opacity: 0.8;
      animation: bouncing 0.5s infinite alternate;
    }
    .typing-dot:nth-child(1) { animation-delay: 0s; }
    .typing-dot:nth-child(2) { animation-delay: 0.2s; }
    .typing-dot:nth-child(3) { animation-delay: 0.4s; }
  `;

  interface Message {
    typing?: boolean;
    id: number;
    text: string;
    sent: boolean;
  }

  const [messages, setMessages] = useState<Message[]>([
    { id: 1, text: t('initialMessage'), sent: false},
  ]);
  
  const [newMessage, setNewMessage] = useState('');
  const [isResponding, setIsResponding] = useState(false);
  const messagesEndRef = useRef<HTMLElement | null | undefined>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      const container = messagesEndRef.current.parentElement;
      if (container) {
        container.scrollTop = container.scrollHeight;
      }
    }
  };

  useEffect(() => {
    scrollToBottom();
    if (!isResponding) {
      inputRef.current?.focus();
    }
  }, [messages, isResponding]);

  const handleSendMessage = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    if (newMessage.trim() === '' || isResponding) return;
    
    const userMsg = {
      id: messages.length + 1,
      text: newMessage,
      sent: true,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    
    setMessages([...messages, userMsg]);

    const localReply = generateSmartReply(newMessage);
    const replyId = allReplies.indexOf(localReply);
    setNewMessage('');

    setIsResponding(true);
    const started = Date.now();
    await relay('send', { id: userMsg.id, text: userMsg.text, t: started });

    await sleep(Math.max(0, started + 500 - Date.now()));
    relay('typing', { t: Date.now() });
    setMessages(prevMessages => [
      ...prevMessages, 
      { id: 0, text: '', sent: false, time: '', typing: true }
    ]);

    const [reply] = await Promise.all([
      replyId >= 0 ? relay(`reply/${replyId}`, { in_reply_to: userMsg.id }) : null,
      sleep(Math.max(0, started + 2000 - Date.now())),
    ]);
    const replyText: string = reply?.text ?? localReply;

    setMessages(prevMessages => {
      const messagesWithoutTyping = prevMessages.filter(msg => msg.typing !== true);
      
      const replyMsg = {
        id: messagesWithoutTyping.length + 1,
        text: replyText,
        sent: false,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      
      return [...messagesWithoutTyping, replyMsg];
    });
    relay('receive', { id: userMsg.id + 1, t: Date.now() });
    
    setIsResponding(false);
  };

  const handleInputChange = (e: { target: { value: SetStateAction<string>; }; }) => {
    setNewMessage(e.target.value);
  };

  return (
    <>
      <style>{typingIndicatorCSS}</style>
      <div className="flex flex-col h-full bg-zinc-800 shadow-lg overflow-hidden">        
        {/* Header */}
        <div className="bg-zinc-800 py-3 px-4 flex items-center border-b border-zinc-700">
          <div className="flex-shrink-0 mr-2">
            <svg className="h-6 w-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
            </svg>
          </div>
          <div className="flex-1 flex justify-center items-center relative">
            <div className="h-8 w-8 rounded-full bg-blue-400 flex items-center justify-center text-white font-bold">
              N
            </div>
            <div className="ml-2 font-semibold">Nelson</div>
          </div>
          <div className="flex-shrink-0">
            <svg className="h-6 w-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        </div>
        
        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 bg-zinc-900" style={{ height: 'calc(100% - 120px)' }}>
          <div className="text-center text-xs text-gray-500 mb-4">{t('today')}</div>
          
          {messages.map((message) => (
            <div 
              key={message.id} 
              className={`flex ${message.sent ? 'justify-end' : 'justify-start'} mb-4`}
            >
              {message.typing ? (
                <div className="bg-zinc-700 rounded-2xl py-3 px-5 max-w-xs rounded-bl-sm flex">
                  <div className="typing-indicator">
                    <div className="typing-dot"></div>
                    <div className="typing-dot"></div>
                    <div className="typing-dot"></div>
                  </div>
                </div>
              ) : (
                <div 
                  className={`rounded-2xl py-2 px-4 max-w-xs ${
                    message.sent 
                    ? 'bg-blue-500 text-white rounded-br-sm' 
                    : 'bg-zinc-700 text-black rounded-bl-sm'
                  }`}
                >
                  <div className="text-white">{message.text}</div>
                </div>
              )}
            </div>
          ))}
          <div ref={messagesEndRef as RefObject<HTMLDivElement>} />
        </div>
        
        {/* Message Input */}
        <form onSubmit={handleSendMessage} className="bg-zinc-800 p-2 flex items-center">
          <button 
            type="button" 
            className={`p-2 rounded-full ${isResponding ? 'text-gray-500' : 'text-gray-600'}`}
            disabled={isResponding}
          >
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
          </button>
          
          <div className="flex-1 bg-zinc-900 rounded-full px-4 py-2 mx-2">
            <input
              ref={inputRef}
              type="text"
              className={`w-full focus:outline-none bg-transparent text-white ${isResponding ? 'opacity-50 cursor-not-allowed' : ''}`}
              placeholder={isResponding ? t('waitingResponse') : t('messagePlaceholder')}
              value={newMessage}
              onChange={handleInputChange}
              disabled={isResponding}
            />
          </div>
          
          <button 
            type="submit" 
            className={`p-2 rounded-full transition-all duration-200 ${
              newMessage.trim() && !isResponding 
                ? 'bg-blue-500' 
                : 'text-gray-300 cursor-not-allowed'
            }`}
            disabled={!newMessage.trim() || isResponding}
          >
          <ArrowUp className="h-6 w-6" />
          </button>
        </form>
      </div>
    </>
  );
};