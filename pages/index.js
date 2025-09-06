import { useState, useRef, useEffect } from "react";
import dynamic from "next/dynamic";
import ReactMarkdown from "react-markdown";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import ChatSidebar from "../components/ChatSidebar";
import styles from "../styles/Home.module.css";

const PdfHandler = dynamic(() => import("../components/PdfHandler"), { ssr: false });
const ImageHandler = dynamic(() => import("../components/ImageHandler"), { ssr: false });

export default function Home() {
  const [text, setText] = useState("");
  const [messages, setMessages] = useState({ General: [] });
  const [currentTopic, setCurrentTopic] = useState("General");
  const [pdfFile, setPdfFile] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const chatEndRef = useRef(null);

  // Auto-scroll
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, currentTopic]);

  const handleSend = async () => {
    if (!text.trim()) return;

    const userMessage = { type: "user", content: text };
    setMessages(prev => ({
      ...prev,
      [currentTopic]: [...(prev[currentTopic] || []), userMessage],
    }));
    setText("");
    setLoading(true);

    const botMessage = { type: "bot", content: "Processing..." };
    setMessages(prev => ({
      ...prev,
      [currentTopic]: [...(prev[currentTopic] || []), botMessage],
    }));

    try {
      const res = await fetch("/api/summarise", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sessionId: currentTopic,
          messages: [...(messages[currentTopic] || []), userMessage],
        }),
      });
      const data = await res.json();

      setMessages(prev => ({
        ...prev,
        [currentTopic]: prev[currentTopic].map(msg =>
          msg === botMessage ? { ...msg, content: data.summary || "No response returned." } : msg
        ),
      }));
    } catch (err) {
      console.error(err);
      setMessages(prev => ({
        ...prev,
        [currentTopic]: prev[currentTopic].map(msg =>
          msg === botMessage ? { ...msg, content: "Error connecting to tutor." } : msg
        ),
      }));
    }

    setLoading(false);
  };

  return (
    <div className={styles.appContainer}>
      {/* Overlay for mobile */}
      <div
        className={`${styles.overlay} ${sidebarOpen ? styles.overlayVisible : ""}`}
        onClick={() => setSidebarOpen(false)}
      ></div>

      {/* Header */}
      <header className={styles.header}>
        <button
          className={styles.mobileToggle}
          onClick={() => setSidebarOpen(true)}
        >
          ☰
        </button>
        <h1>Zambia AI Tutor</h1>
        <div className={styles.accountHeader} onClick={() => alert("Account panel coming soon")}>
          <span className={styles.accountStatus}>Free Plan</span>
          <span className={styles.accountIcon}>👤</span>
        </div>
      </header>

      <div className={styles.mainContent}>
        {/* Sidebar */}
        <ChatSidebar
          topics={Object.keys(messages)}
          currentTopic={currentTopic}
          setCurrentTopic={setCurrentTopic}
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
          addTopic={(name) => {
            if (!messages[name]) setMessages(prev => ({ ...prev, [name]: [] }));
          }}
        />

        {/* Chat area */}
        <div className={styles.chatArea}>
          {(messages[currentTopic] || []).map((msg, idx) => (
            <div
              key={idx}
              className={`${styles.chatMessage} ${msg.type === "user" ? styles.userMessage : styles.botMessage}`}
            >
              <ReactMarkdown
                remarkPlugins={[remarkMath]}
                rehypePlugins={[rehypeKatex]}
              >
                {msg.content}
              </ReactMarkdown>
            </div>
          ))}
          <div ref={chatEndRef} />
        </div>
      </div>

      {/* Input */}
      <div className={styles.inputContainer}>
        <textarea
          className={styles.textarea}
          rows="2"
          placeholder="Type or paste notes..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <label htmlFor="pdf-upload" className={styles.uploadButton}>
          📄
          <input
            id="pdf-upload"
            type="file"
            accept="application/pdf"
            style={{ display: "none" }}
            onChange={(e) => setPdfFile(e.target.files[0])}
          />
        </label>
        <label htmlFor="image-upload" className={styles.uploadButton}>
          🖼️
          <input
            id="image-upload"
            type="file"
            accept="image/*"
            style={{ display: "none" }}
            onChange={(e) => setImageFile(e.target.files[0])}
          />
        </label>
        <button
          className={styles.sendButton}
          onClick={handleSend}
          disabled={loading}
        >
          {loading ? "Processing..." : "Send"}
        </button>
      </div>

      {pdfFile && <PdfHandler file={pdfFile} setText={setText} />}
      {imageFile && <ImageHandler file={imageFile} setText={setText} />}
    </div>
  );
}

