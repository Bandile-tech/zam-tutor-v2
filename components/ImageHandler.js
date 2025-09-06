"use client";
import { useEffect } from "react";

export default function ImageHandler({ file, setText }) {
  useEffect(() => {
    if (!file) return;

    import("tesseract.js").then((Tesseract) => {
      Tesseract.recognize(file, "eng", { logger: (m) => console.log(m) })
        .then(({ data: { text } }) => {
          setText((prev) => prev + "\n" + text);
        });
    });
  }, [file]);

  return null;
}
