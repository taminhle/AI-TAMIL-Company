import OpenAI from "openai";

// Instantiate the OpenAI client once
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || 'dummy_for_build',
});

export default openai;
