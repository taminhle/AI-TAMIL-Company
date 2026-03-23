import { NextRequest } from "next/server";
import openai from "@/lib/openai";
import { createClient } from "@/lib/supabase/server";

export async function POST(req: NextRequest) {
  try {
    const { prompt } = await req.json();

    if (!prompt) {
      return new Response("Prompt is required", { status: 400 });
    }

    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return new Response("Unauthorized", { status: 401 });
    }

    // Call OpenAI with stream
    const aiStream = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      stream: true,
      messages: [
        {
          role: "system",
          content: "You are an expert AI software architect. Based on the user's idea, provide a detailed feature list, a suggested database schema, and UI suggestions. Format your response cleanly in Markdown."
        },
        {
          role: "user",
          content: prompt
        }
      ],
    });

    const encoder = new TextEncoder();
    
    // Create a readable stream that pipes the OpenAI stream
    const customStream = new ReadableStream({
      async start(controller) {
        let fullContent = "";
        try {
          for await (const chunk of aiStream) {
            const text = chunk.choices[0]?.delta?.content || "";
            fullContent += text;
            if (text) {
              // We just send raw text chunks to make it simple to decode on frontend
              controller.enqueue(encoder.encode(text));
            }
          }
        } catch (err) {
          console.error("Stream reading error:", err);
          controller.error(err);
        } finally {
          // Log to Supabase when done
          await supabase.from("ai_logs").insert({
            user_id: user.id,
            user_input: prompt,
            ai_output: { result: fullContent },
          });
          controller.close();
        }
      }
    });

    return new Response(customStream, {
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
      }
    });

  } catch (error) {
    console.error("OpenAI API Route Error:", error);
    return new Response(error instanceof Error ? error.message : "Internal Server Error", { status: 500 });
  }
}
