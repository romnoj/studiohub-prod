import { OpenAIStream, OpenAIStreamPayload } from "./OpenAIStream";

if (!process.env.OPENAI_API_KEY) {
  throw new Error("Missing OPENAI_API_KEY");
}

export const config = {
  runtime: "edge" /* Define API route as an edge function. */,
};

const handler = async (req: Request): Promise<Response> => {
  const { prompt } = (await req.json()) as {
    prompt?: string;
  };

  if (!prompt) {
    return new Response("Missing prompt", { status: 400 });
  }

  const payload: OpenAIStreamPayload = {
    model: "text-davinci-003",
    prompt,
    temperature: 0.4,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
    max_tokens: 300,
    stream: true,
    n: 1,
  };

  const stream = await OpenAIStream(payload);
  return new Response(stream);
};

export default handler;