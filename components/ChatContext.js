import React, { createContext, useContext, useState } from 'react';

const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
  const [messages, setMessages] = useState([{ content: "Hi, I'm your personal nutritionist. How can I help you?", isUser: false }]);
  const [threadId, setThreadId] = useState(null);
  const [isWaiting, setIsWaiting] = useState(false);

  return (
    <ChatContext.Provider value={{ messages, setMessages, threadId, setThreadId, isWaiting, setIsWaiting }}>
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = () => useContext(ChatContext);
