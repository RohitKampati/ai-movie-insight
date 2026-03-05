import { NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  try {
    const { reviews } = await req.json();

    const prompt = `
    Based on these movie audience reviews:

    ${reviews.join("\n\n")}

    Provide:
    1. A short 3-4 sentence summary of audience sentiment.
    2. Overall classification: Positive, Mixed, or Negative.
    Return JSON like:
    {
      "summary": "...",
      "sentiment": "Positive"
    }
    `;

    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.3,
    });

    const content = response.choices[0].message.content;

    return NextResponse.json(JSON.parse(content || "{}"));
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "AI processing failed" },
      { status: 500 }
    );
  }
}