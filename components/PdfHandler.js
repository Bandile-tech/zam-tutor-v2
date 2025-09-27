"use client";
import { useEffect } from "react";
import { getDocument, GlobalWorkerOptions } from "pdfjs-dist";

GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${require('pdfjs-dist/package.json').version}/build/pdf.worker.min.js`;

export default function PdfHandler({ file, setText }) {
  useEffect(() => {
    if (!file) return;

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
  }, [file]);

  return null;
}
