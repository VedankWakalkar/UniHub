"use client";

import { useState, ChangeEvent, KeyboardEvent } from "react";
import axios from "axios";

interface Message {
  sender: "user" | "ai";
  text: string;
}

const Chatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [userMessage, setUserMessage] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const toggleChat = () => setIsOpen((prev) => !prev);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUserMessage(e.target.value);
  };

  const handleSendMessage = async () => {
    if (!userMessage.trim()) return;

    setMessages((prev) => [...prev, { sender: "user", text: userMessage }]);
    setUserMessage("");
    setLoading(true);

    try {
      const response = await axios.post("http://127.0.0.1:8000/chat", {
        user_content: userMessage,
      });
      setMessages((prev) => [
        ...prev,
        { sender: "ai", text: response.data.response },
      ]);
    } catch (error) {
      console.error("Error:", error);
      setMessages((prev) => [
        ...prev,
        {
          sender: "ai",
          text: "Sorry, I'm having trouble understanding. Please try again.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleSendMessage();
  };

  return (
    <div className="chatbot-container">
      <button
        className={`chatbot-icon ${isOpen ? "hidden" : ""}`}
        onClick={toggleChat}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          className="h-6 w-6"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 0 1 .865-.501 48.172 48.172 0 0 0 3.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z"
          />
        </svg>
      </button>

      {isOpen && (
        <div className="chatbot-window">
          <div className="chat-header">
            <div className="flex items-center gap-3">
              <div className="ai-avatar">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-semibold">AI Assistant</h3>
            </div>
            <button onClick={toggleChat} className="close-btn">
              ×
            </button>
          </div>

          <div className="chat-body">
            <div className="welcome-message">
              <p className="text-center text-gray-600">
                Hi! How can I help you today?
              </p>
            </div>
            {messages.map((msg, index) => (
              <div key={index} className={`message ${msg.sender}`}>
                <div className="message-content">
                  <p>{msg.text}</p>
                </div>
              </div>
            ))}
            {loading && (
              <div className="message ai">
                <div className="typing-indicator">
                  <div className="dot"></div>
                  <div className="dot"></div>
                  <div className="dot"></div>
                </div>
              </div>
            )}
          </div>

          <div className="chat-footer">
            <div className="input-container">
              <input
                type="text"
                value={userMessage}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                placeholder="message tak ki ..."
                className="message-input"
              />
              <button onClick={handleSendMessage} className="send-btn">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        .chatbot-container {
          position: fixed;
          bottom: 2rem;
          right: 2rem;
          z-index: 1000;
        }

        .chatbot-icon {
          background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
          border: none;
          border-radius: 50%;
          padding: 1rem;
          cursor: pointer;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          transition: transform 0.2s, box-shadow 0.2s;
        }

        .chatbot-icon:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 8px rgba(0, 0, 0, 0.15);
        }

        .chatbot-icon.hidden {
          display: none;
        }

        .chatbot-window {
          width: 400px;
          height: 600px;
          background: white;
          border-radius: 1rem;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
          display: flex;
          flex-direction: column;
          overflow: hidden;
        }

        .chat-header {
          background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%);
          color: white;
          padding: 1.25rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .ai-avatar {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 50%;
          padding: 0.5rem;
          display: flex;
        }

        .close-btn {
          font-size: 1.5rem;
          background: none;
          border: none;
          color: white;
          cursor: pointer;
          padding: 0 0.5rem;
          transition: opacity 0.2s;
        }

        .close-btn:hover {
          opacity: 0.8;
        }

        .chat-body {
          flex: 1;
          padding: 1.5rem;
          overflow-y: auto;
          background: #f8fafc;
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .welcome-message {
          margin-bottom: 1rem;
        }

        .message {
          max-width: 80%;
          display: flex;
        }

        .message.user {
          align-self: flex-end;
        }

        .message.ai {
          align-self: flex-start;
        }

        .message-content {
          padding: 0.75rem 1rem;
          border-radius: 1rem;
          background: white;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
        }

        .message.user .message-content {
          background: #3b82f6;
          color: white;
          border-radius: 1rem 1rem 0 1rem;
        }

        .message.ai .message-content {
          background: white;
          color: #1e293b;
          border-radius: 1rem 1rem 1rem 0;
        }

        .typing-indicator {
          display: flex;
          gap: 0.5rem;
          padding: 1rem;
        }

        .dot {
          width: 8px;
          height: 8px;
          background: #cbd5e1;
          border-radius: 50%;
          animation: bounce 1.4s infinite ease-in-out;
        }

        .dot:nth-child(2) {
          animation-delay: 0.2s;
        }

        .dot:nth-child(3) {
          animation-delay: 0.4s;
        }

        @keyframes bounce {
          0%,
          80%,
          100% {
            transform: translateY(0);
          }
          40% {
            transform: translateY(-6px);
          }
        }

        .chat-footer {
          padding: 1.25rem;
          background: white;
          border-top: 1px solid #e2e8f0;
        }

        .input-container {
          display: flex;
          gap: 0.5rem;
          align-items: center;
        }

        .message-input {
          flex: 1;
          padding: 0.75rem 1rem;
          border: 1px solid #e2e8f0;
          border-radius: 0.75rem;
          outline: none;
          transition: border-color 0.2s;
        }

        .message-input:focus {
          border-color: #3b82f6;
          box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
        }

        .send-btn {
          background: #3b82f6;
          color: white;
          border: none;
          padding: 0.75rem;
          border-radius: 0.75rem;
          cursor: pointer;
          transition: background 0.2s;
        }

        .send-btn:hover {
          background: #2563eb;
        }

        ::-webkit-scrollbar {
          width: 6px;
        }

        ::-webkit-scrollbar-track {
          background: #f1f5f9;
        }

        ::-webkit-scrollbar-thumb {
          background: #cbd5e1;
          border-radius: 3px;
        }
      `}</style>
    </div>
  );
};

export default Chatbot;
