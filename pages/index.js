import { useState } from "react";

export default function Home() {
  const [text, setText] = useState("");
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSummarise() {
    setLoading(true);
    setSummary("");
    try {
      const res = await fetch("/api/summarise", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
      });
      const data = await res.json();
      setSummary(data.summary || "Error: No summary returned.");
    } catch (err) {
      setSummary("Error connecting to tutor.");
    }
    setLoading(false);
  }

  return (
    <div style={{ textAlign: "center", marginTop: "50px", maxWidth: "600px", marginLeft: "auto", marginRight: "auto" }}>
      <h1>Zambia AI Tutor 🇿🇲</h1>
      <textarea
        rows="6"
        style={{ width: "100%", padding: "10px" }}
        placeholder="Paste your notes here..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <br />
      <button onClick={handleSummarise} disabled={loading} style={{ marginTop: "10px", padding: "10px 20px" }}>
        {loading ? "Summarising..." : "Summarise Notes"}
      </button>
      {summary && (
        <div style={{ marginTop: "20px", textAlign: "left", background: "#f0f0f0", padding: "10px", borderRadius: "5px" }}>
          <h3>Summary:</h3>
          <p>{summary}</p>
        </div>
      )}
    </div>
  );
}
