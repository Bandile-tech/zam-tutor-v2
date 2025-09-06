import { useState } from "react";
import * as pdfjsLib from "pdfjs-dist/build/pdf";
import "pdfjs-dist/build/pdf.worker.entry";

export default function Home() {
  const [text, setText] = useState("");
  const [file, setFile] = useState(null);
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(false);

  const handleFileChange = async (e) => {
    const uploadedFile = e.target.files[0];
    setFile(uploadedFile);

    if (uploadedFile.type === "application/pdf") {
      const fileReader = new FileReader();
      fileReader.onload = async function () {
        const typedArray = new Uint8Array(this.result);
        const pdf = await pdfjsLib.getDocument(typedArray).promise;
        let pdfText = "";
        for (let i = 1; i <= pdf.numPages; i++) {
          const page = await pdf.getPage(i);
          const content = await page.getTextContent();
          const strings = content.items.map((item) => item.str);
          pdfText += strings.join(" ") + "\n";
        }
        setText(pdfText);
      };
      fileReader.readAsArrayBuffer(uploadedFile);
    } else {
      alert("Currently only PDF files are supported.");
    }
  };

  const handleSummarise = async () => {
    if (!text) {
      alert("Please type notes or upload a PDF first.");
      return;
    }
    setLoading(true);
    setSummary("");

    try {
      const res = await fetch("/api/summarise", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
      });
      const data = await res.json();
      setSummary(data.summary || "No summary returned.");
    } catch (err) {
      setSummary("Error connecting to tutor.");
    }

    setLoading(false);
  };

  return (
    <div style={{ maxWidth: "720px", margin: "40px auto", fontFamily: "sans-serif" }}>
      <h1 style={{ textAlign: "center", marginBottom: "30px" }}>🇿🇲 Zambia AI Tutor</h1>

      <div style={{ background: "#fff", padding: "20px", borderRadius: "12px", boxShadow: "0 4px 12px rgba(0,0,0,0.1)", marginBottom: "20px" }}>
        <h3>Type or Paste Notes</h3>
        <textarea
          rows="6"
          style={{ width: "100%", padding: "10px", borderRadius: "6px", border: "1px solid #ccc", resize: "vertical" }}
          placeholder="Type or paste notes here..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
      </div>

      <div style={{ background: "#fff", padding: "20px", borderRadius: "12px", boxShadow: "0 4px 12px rgba(0,0,0,0.1)", marginBottom: "20px" }}>
        <h3>Upload PDF Notes</h3>
        <input type="file" accept="application/pdf" onChange={handleFileChange} />
        {file && <p style={{ marginTop: "10px" }}>Selected file: {file.name}</p>}
      </div>

      <div style={{ textAlign: "center", marginBottom: "20px" }}>
        <button
          onClick={handleSummarise}
          disabled={loading}
          style={{
            padding: "12px 24px",
            marginRight: "12px",
            borderRadius: "8px",
            background: "#0070f3",
            color: "#fff",
            border: "none",
            cursor: "pointer",
            fontWeight: "bold",
            transition: "background 0.2s"
          }}
          onMouseOver={e => e.target.style.background="#005bb5"}
          onMouseOut={e => e.target.style.background="#0070f3"}
        >
          {loading ? "Summarising..." : "Summarise Notes"}
        </button>
        <button
          style={{
            padding: "12px 24px",
            borderRadius: "8px",
            background: "#e2e8f0",
            border: "none",
            cursor: "pointer",
            fontWeight: "bold"
          }}
          onClick={() => alert("Flashcards coming soon")}
        >
          Flashcards
        </button>
      </div>

      {summary && (
        <div style={{ background: "#f0f4f8", padding: "20px", borderRadius: "12px", boxShadow: "0 4px 12px rgba(0,0,0,0.05)" }}>
          <h3>Summary</h3>
          <p style={{ whiteSpace: "pre-wrap" }}>{summary}</p>
        </div>
      )}
    </div>
  );
}
