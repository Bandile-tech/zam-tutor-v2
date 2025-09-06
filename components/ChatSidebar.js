import { useState } from "react";
import styles from "../styles/Home.module.css";

export default function ChatSidebar({ topics = [], currentTopic, setCurrentTopic, sidebarOpen, setSidebarOpen, addTopic }) {
  const [newTopic, setNewTopic] = useState("");

  const handleAddTopic = () => {
    if (newTopic.trim()) {
      addTopic(newTopic.trim());
      setCurrentTopic(newTopic.trim());
      setNewTopic("");
      if (setSidebarOpen) setSidebarOpen(false); // close sidebar on mobile after adding
    }
  };

  const handleComingSoon = () => alert("Coming soon!");

  return (
    <div className={`${styles.sidebar} ${sidebarOpen ? styles.open : ""}`}>
      {/* Flashcards & Q/A buttons */}
      <div className={styles.sidebarButtons}>
        <button onClick={handleComingSoon} className={styles.sidebarActionButton}>
          Flashcards
        </button>
        <button onClick={handleComingSoon} className={styles.sidebarActionButton}>
          Q / A
        </button>
      </div>

      {/* Topic list */}
      <div className={styles.topicList}>
        {topics.length === 0 ? (
          <p className={styles.noTopics}>No topics yet</p>
        ) : (
          topics.map((topic, idx) => (
            <div
              key={idx}
              className={`${styles.topicItem} ${topic === currentTopic ? styles.active : ""}`}
              onClick={() => {
                setCurrentTopic(topic);
                if (setSidebarOpen) setSidebarOpen(false);
              }}
            >
              {topic}
            </div>
          ))
        )}
      </div>

      {/* Add new topic */}
      <div className={styles.addTopicContainer}>
        <input
          value={newTopic}
          onChange={(e) => setNewTopic(e.target.value)}
          placeholder="Add topic..."
          style={{
            padding: "6px 8px",
            borderRadius: "6px",
            border: "1px solid #4b5563",
            background: "#111827",
            color: "#f3f4f6",
          }}
        />
        <button
          onClick={handleAddTopic}
          style={{
            marginTop: "6px",
            padding: "6px",
            borderRadius: "6px",
            border: "none",
            background: "#2563eb",
            color: "#fff",
            cursor: "pointer",
          }}
        >
          Add
        </button>
      </div>
    </div>
  );
}
