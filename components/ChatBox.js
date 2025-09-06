import { useState, useRef, useEffect } from "react";

export default function ChatBox() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  // Auto-scroll to the latest message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);
    setLoading(true);
    setInput("");

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: input }),
      });

      const data = await res.json();
      const aiMessage = { role: "assistant", content: data.summary };
      setMessages((prev) => [...prev, aiMessage]);
    } catch (err) {
      console.error(err);
      alert("Failed to get response from AI.");
    } finally {
      setLoading(false);
    }
  };

  // Split AI content into sections based on headings
  const renderAIContent = (content) => {
    const sectionRegex = /(Key Concepts:|Examples:|Step[-\s]?by[-\s]?Step:|Revision Tips:)/gi;
    const parts = content.split(sectionRegex).filter((p) => p.trim() !== "");

    const sections = [];
    for (let i = 0; i < parts.length; i += 2) {
      const heading = parts[i].trim();
      const body = (parts[i + 1] || "").trim();
      sections.push({ heading, body });
    }

    return sections.map((sec, idx) => (
      <div key={idx} className="mb-4 p-3 bg-gray-100 rounded-lg shadow-sm">
        <h3 className="font-semibold mb-2">{sec.heading}</h3>
        {sec.body.split("\n").map((line, i) => (
          <p key={i} className="mb-1">{line}</p>
        ))}
      </div>
    ));
  };

  return (
    <div className="w-full max-w-3xl mx-auto p-4 bg-white rounded-2xl shadow-lg flex flex-col">
      <h1 className="text-2xl font-bold mb-4 text-center">AI Expert Tutor</h1>
      
      <div className="flex-1 overflow-y-auto mb-4 h-96">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`mb-4 p-3 rounded-lg max-w-[90%] ${
              msg.role === "user"
                ? "bg-blue-100 text-black ml-auto text-right"
                : "bg-gray-100 text-black mr-auto text-left"
            }`}
          >
            {msg.role === "assistant"
              ? renderAIContent(msg.content)
              : msg.content}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <div className="flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your notes or question here..."
          className="flex-1 p-3 border rounded-lg"
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />
        <button
          onClick={sendMessage}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg"
          disabled={loading}
        >
          {loading ? "Thinking..." : "Send"}
        </button>
      </div>
    </div>
  );
}
