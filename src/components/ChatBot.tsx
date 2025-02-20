import { useState } from "react";
import { generateEmailContent } from "../utils/aiHelpers";

interface Message {
  role: "user" | "bot";
  content: string;
}

const ChatBot = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const handleSend = async () => {
    if (input.trim()) {
      const userMessage: Message = { role: "user", content: input };
      setMessages((prev) => [...prev, userMessage]);
      setInput("");
      setIsTyping(true);
      try {
        await generateEmailContent(input, (chunk) => {
          setMessages((prev) => [...prev, { role: "bot", content: chunk }]);
          setIsTyping(false);
        });
      } catch (error) {
        console.error("Error in chat:", error);
        setIsTyping(false);
      }
    }
  };

  return (
    <div className="chatbot-container">
      <h2>ChatBot</h2>
      <div className="chat-messages">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`message ${message.role === "bot" ? "bot" : "user"}`}
          >
            {message.content}
          </div>
        ))}
        {isTyping && <div className="typing-indicator">Bot is typing...</div>}
      </div>
      <div className="chat-input">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message..."
          onKeyPress={(e) => e.key === "Enter" && handleSend()}
        />
        <button onClick={handleSend}>Send</button>
      </div>
    </div>
  );
};

export default ChatBot;
