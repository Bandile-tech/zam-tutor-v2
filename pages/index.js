import { useState } from "react";
import { getDocument, GlobalWorkerOptions } from "pdfjs-dist";
import pdfWorker from "pdfjs-dist/build/pdf.worker.entry";
import Tesseract from "tesseract.js";

GlobalWorkerOptions.workerSrc = pdfWorker;

export default function Home() {
  const [text, setText] = useState("");
  const [pdfFile, setPdfFile] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(false);

  // PDF upload handler
  const handlePdfChange = (e) => {
    const file = e.target.files[0];
    setPdfFile(file);
    if (file && file.type === "application/pdf") {
      const reader = new FileReader();
      reader.onload = async function () {
        const typedArray = new Uint8Array(this.result);
        const pdf = await getDocument(typedArray).promise;
        let pdfText = "";
        for (let i = 1; i <= pdf.numPages; i++) {
          const page = await pdf.getPage(i);
          const content = await page.getTextContent();
          const strings = content.items.map((item) => item.str);
          pdfText += strings.join(" ") + "\n";
        }
        setText((prev) => prev + "\n" + pdfText);
      };
      reader.readAsArrayBuffer(file);
    } else {
      alert("Please upload a valid PDF file.");
    }
  };

  // Image upload handler
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
    if (file && file.type.startsWith("image/")) {
      setLoading(true);
      Tesseract.recognize(file, "eng", { logger: (m) => console.log(m) })
        .then(({ data: { text: extractedText } }) => {
          setText((prev) => prev + "\n" + extractedText);
        })
        .finally(() => setLoading(false));
    } else {
      alert("Please upload an image file (jpg/png).");
    }
  };

  // Summarise notes
  const handleSummarise = async () => {
    if (!text) {
      alert("Type notes or upload PDF/Image first.");
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

      {/* Notes input */}
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

      {/* PDF upload */}
      <div style={{ background: "#fff", padding: "20px", borderRadius: "12px", boxShadow: "0 4px 12px rgba(0,0,0,0.1)", marginBottom: "20px" }}>
        <h3>Upload PDF Notes</h3>
        <input type="file" accept="application/pdf" onChange={handlePdfChange} />
        {pdfFile && <p style={{ marginTop: "10px" }}>Selected file: {pdfFile.name}</p>}
      </div>

      {/* Image upload */}
      <div style={{ background: "#fff", padding: "20px", borderRadius: "12px", boxShadow: "0 4px 12px rgba(0,0,0,0.1)", marginBottom: "20px" }}>
        <h3>Upload Image Notes</h3>
        <input type="file" accept="image/*" onChange={handleImageChange} />
        {imageFile && <p style={{ marginTop: "10px" }}>Selected file: {imageFile.name}</p>}
      </div>

      {/* Buttons */}
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
          onMouseOver={(e) => (e.target.style.background = "#005bb5")}
          onMouseOut={(e) => (e.target.style.background = "#0070f3")}
        >
          {loading ? "Processing..." : "Summarise Notes"}
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

      {/* Summary display */}
      {summary && (
        <div style={{ background: "#f0f4f8", padding: "20px", borderRadius: "12px", boxShadow: "0 4px 12px rgba(0,0,0,0.05)" }}>
          <h3>Summary</h3>
          <p style={{ whiteSpace: "pre-wrap" }}>{summary}</p>
        </div>
      )}
    </div>
  );
}
