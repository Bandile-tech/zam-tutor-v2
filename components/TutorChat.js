import { useState } from "react";
import ChatBubble from "./ChatBubble";
import TypingIndicator from "./TypingIndicator";
import ConfettiReward from "./ConfettiReward";

const TutorChat = () => {
  const [messages, setMessages] = useState([
    { text: "Hi! What topic do you want help with?", isUser: false },
  ]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  const sendMessage = () => {
    if (!input.trim()) return;
    setMessages([...messages, { text: input, isUser: true }]);
    setInput("");
    setTyping(true);

    setTimeout(() => {
      setMessages((prev) => [...prev, { text: "Here's a quick explanation!", isUser: false }]);
      setTyping(false);
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 2000);
    }, 1200);
  };

  return (
    <section className="p-6 flex flex-col gap-4 max-w-2xl mx-auto relative">
      {showConfetti && <ConfettiReward />}
      <div className="flex flex-col gap-2">
        {messages.map((msg, idx) => (
          <ChatBubble key={idx} message={msg.text} isUser={msg.isUser} />
        ))}
        {typing && <TypingIndicator />}
      </div>
      <div className="mt-4 flex gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask a question..."
          className="flex-1 p-3 rounded-lg shadow focus:outline-none border border-gray-300"
        />
        <button onClick={sendMessage} className="px-4 py-2 bg-primary text-white rounded-lg font-semibold hover:bg-purple-700 transition">Send</button>
      </div>
    </section>
  );
};

export default TutorChat;