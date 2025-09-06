import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { messages } = req.body;

  if (!messages || !Array.isArray(messages) || messages.length === 0) {
    return res.status(400).json({ error: "No messages provided" });
  }

  try {
    const formattedMessages = messages.map(msg => ({
      role: msg.type === "user" ? "user" : "assistant",
      content: msg.content,
    }));

    formattedMessages.unshift({
      role: "system",
      content: `
You are an AI Expert Tutor. Your goal is to help the student understand any topic clearly and effectively.

Rules:
1. Adapt your response based on the user's question:
   - Short answers for concise questions.
   - Detailed notes with headings for explanations.
   - Unicode subscripts for chemistry (H₂, CO₂, CH₄).
   - Unicode arrows for reactions (-> becomes →, <-> becomes ⇌).
   - Structured math and derivatives.
2. Never force long answers unnecessarily.
3. Include diagrams or tables if helpful.
4. Be clear, concise, and engaging.
      `.trim(),
    });

    const response = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: formattedMessages,
      max_tokens: 1200,
      temperature: 0.7,
    });

    let summary = response.choices[0].message.content;

    // Convert ASCII arrows to proper Unicode
    summary = summary.replace(/->/g, "→").replace(/<->/g, "⇌");

    res.status(200).json({ summary });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
}
