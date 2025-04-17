import { RefObject, SetStateAction, useEffect, useRef, useState } from "react";

export default function DockMessageContent() {
  // CSS for typing indicator
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
    time: string;
  }

  const [messages, setMessages] = useState<Message[]>([
    { id: 1, text: "Hey there! How's it going?", sent: false, time: "9:41 AM" },
    { id: 2, text: "Hi! I'm doing well, thanks for asking. How about you?", sent: true, time: "9:42 AM" },
    { id: 3, text: "Pretty good! Just checking out this iOS message simulator.", sent: false, time: "9:43 AM" }
  ]);
  
  const [newMessage, setNewMessage] = useState('');
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
    // Focus the input when the component mounts
    inputRef.current?.focus();
  }, [messages]);

  // Smart reply generator based on user message content
  const generateSmartReply = (userMessage: string) => {
    // Convert to lowercase for easier matching
    const msg = userMessage.toLowerCase();
    
    // Greeting patterns
    if (msg.match(/^(hi|hello|hey|howdy|sup|yo)/)) {
      return "Hey there! How can I help you today?";
    }
    
    // Questions about status/feeling
    if (msg.includes("how are you") || msg.includes("how's it going") || msg.includes("how are things")) {
      return "I'm doing great, thanks for asking! How about yourself?";
    }
    
    // Weather related
    if (msg.includes("weather") || msg.includes("sunny") || msg.includes("rain") || msg.includes("snow") || msg.includes("cold") || msg.includes("hot")) {
      return "I heard the weather is supposed to be nice this weekend. Any outdoor plans?";
    }
    
    // Food related
    if (msg.includes("food") || msg.includes("eat") || msg.includes("dinner") || msg.includes("lunch") || msg.includes("breakfast") || msg.includes("restaurant")) {
      return "I've been trying to cook more at home lately. Have you tried any new recipes?";
    }
    
    // Work/study related
    if (msg.includes("work") || msg.includes("job") || msg.includes("study") || msg.includes("class") || msg.includes("school")) {
      return "Work-life balance is so important. Make sure you're taking breaks when needed!";
    }
    
    // Movie/TV related
    if (msg.includes("movie") || msg.includes("film") || msg.includes("tv") || msg.includes("show") || msg.includes("series") || msg.includes("watch")) {
      return "I just finished watching that new series everyone's talking about. Have you seen it?";
    }
    
    // Questions
    if (msg.includes("?")) {
      if (msg.startsWith("what") || msg.startsWith("why") || msg.startsWith("how")) {
        return "That's a great question. I've been thinking about that too recently.";
      } else if (msg.startsWith("do you") || msg.startsWith("are you") || msg.startsWith("can you")) {
        return "I'd say yes, but it depends on the context! What do you think?";
      } else {
        return "Hmm, I'm not entirely sure about that. What's your take?";
      }
    }
    
    // Excited messages (with exclamation mark)
    if (msg.includes("!")) {
      return "I can feel your enthusiasm! That's awesome!";
    }
    
    // Longer messages get more thoughtful responses
    if (userMessage.length > 100) {
      return "Thanks for sharing all that. It gives me a lot to think about. I appreciate you opening up.";
    }
    
    // Short messages
    if (userMessage.length < 10) {
      return "Tell me more...";
    }
    
    // Messages with numbers might be about measurements, quantities, dates
    if (/\d+/.test(msg)) {
      return "Those numbers are interesting. Is there something significant about them?";
    }
    
    // Generic responses for when nothing specific matches
    const genericResponses = [
      "That's an interesting perspective. Tell me more about that.",
      "I see what you mean. How long have you felt that way?",
      "I'm curious to hear more about your thoughts on this.",
      "That makes a lot of sense. What else is on your mind?",
      "I hadn't thought about it that way before. Thanks for sharing.",
      "Let's explore that idea a bit more. What specifically interests you about it?"
    ];
    
    return genericResponses[Math.floor(Math.random() * genericResponses.length)];
  };

  const handleSendMessage = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    if (newMessage.trim() === '') return;
    
    // Add user message
    const userMsg = {
      id: messages.length + 1,
      text: newMessage,
      sent: true,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    
    setMessages([...messages, userMsg]);
    
    // Generate a smart reply based on the user's message
    const smartReply = generateSmartReply(newMessage);
    setNewMessage('');
    
    // Show typing indicator
    setTimeout(() => {
      // Add the "typing" indicator
      setMessages(prevMessages => [
        ...prevMessages, 
        { id: 0, text: '', sent: false, time: '', typing: true }
      ]);
    }, 500);
    
    // Remove typing indicator and add actual reply after a delay
    setTimeout(() => {
      setMessages(prevMessages => {
        // Filter out the typing indicator
        const messagesWithoutTyping = prevMessages.filter(msg => msg.typing !== true);
        
        // Add the actual reply
        const replyMsg = {
          id: messagesWithoutTyping.length + 1,
          text: smartReply,
          sent: false,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        
        return [...messagesWithoutTyping, replyMsg];
      });
    }, 2000); // Longer delay to simulate thinking/typing
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
          <div className="text-center text-xs text-gray-500 mb-4">Today</div>
          
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
          <button type="button" className="p-2 rounded-full text-gray-600">
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
          </button>
          
          <div className="flex-1 bg-zinc-900 rounded-full px-4 py-2 mx-2">
            <input
              ref={inputRef}
              type="text"
              className="w-full focus:outline-none"
              placeholder="iMessage"
              value={newMessage}
              onChange={handleInputChange}
            />
          </div>
          
          <button 
            type="submit" 
            className={`p-2 rounded-full ${newMessage.trim() ? 'text-blue-500' : 'text-gray-300'}`}
            disabled={!newMessage.trim()}
          >
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
          </button>
        </form>
      </div>
    </>
  );
};