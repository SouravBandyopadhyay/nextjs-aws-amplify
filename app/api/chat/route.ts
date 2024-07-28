import {
  streamText,
} from "ai";
import { createGoogleGenerativeAI } from "@ai-sdk/google";

export const runtime = "edge";
export const dynamic = "force-dynamic";

const google = createGoogleGenerativeAI({
  baseURL: "https://generativelanguage.googleapis.com/v1beta",
  apiKey: process.env.GOOGLE_GENERATIVE_AI_API_KEY,
});

export async function POST(req: Request) {

  try {
    const { messages } = await req.json();

    // Get a language model
    const model = google("models/gemini-1.5-flash");
    // Call the language model with the prompt
    const result = await streamText({
      model,
      messages,
      maxTokens: 100,
      temperature: 0.7,
      topP: 0.4,
      onFinish: ({ usage }) => {
        const { promptTokens, completionTokens, totalTokens } = usage;
        // your own logic, e.g. for saving the chat history or recording usage
        console.log("Prompt tokens:", promptTokens);
        console.log("Completion tokens:", completionTokens);
        console.log("Total tokens:", totalTokens);
      },
    });

    // Respond with the AI-generated content
    return result.toAIStreamResponse();
  } catch (error) {
    console.error("Error processing request:", error);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
    });
  }
}
