import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: "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",
});

const completion = openai.chat.completions.create({
  model: "gpt-4o-mini",
  store: true,
  messages: [
    {"role": "user", "content": "write a haiku about ai"},
  ],
});

completion.then((result) => console.log(result.choices[0].message));