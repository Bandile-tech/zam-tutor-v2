import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // make sure your .env.local has OPENAI_API_KEY
});

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { text, responseStyle = "structured" } = req.body;

  if (!text) {
    return res.status(400).json({ error: "No text provided" });
  }

  try {
    // Determine short vs long response based on length or simple pattern
    let maxTokens = 800; // default long response
    const shortPatterns = [/^.+? equation$/, /^write.*formula$/, /^chemical reaction$/i];
    if (shortPatterns.some((regex) => regex.test(text.trim()))) {
      maxTokens = 150; // short response for one-line or equation queries
    }

    const response = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: `
You are an AI Expert Tutor. Help a Zambian student understand topics clearly.
Rules for chemical formulas and equations:
- Use **Unicode subscripts**: H₂, CO₂, CH₄
- Use **Unicode arrows**:
    - Forward reaction: →
    - Reversible reaction: ⇌
- Always format responses clearly with headings: Key Concepts, Examples, Step-by-step, Revision Tips.
- Keep short queries concise (like one equation or one fact).

          `.trim(),
        },
        { role: "user", content: text },
      ],
      max_tokens: maxTokens,
      temperature: 0.7,
    });

    let summary = response.choices[0].message.content || "";

    // Replace common arrow symbols just in case
    summary = summary.replace(/->/g, "→").replace(/<->/g, "⇌");

    res.status(200).json({ summary });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
