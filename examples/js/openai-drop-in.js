/**
 * Kelly Intelligence — OpenAI SDK Drop-In (JavaScript)
 *
 * Use the official OpenAI SDK with Kelly Intelligence as the backend.
 * Every OpenAI SDK feature works — chat, streaming, function calling, etc.
 *
 * Install: npm install openai kelly-intelligence
 * Run: KELLY_API_KEY=your_key node openai-drop-in.js
 */

const OpenAI = require('openai');
const KellyIntelligence = require('kelly-intelligence');

async function main() {
  const client = new OpenAI(KellyIntelligence.openaiConfig(process.env.KELLY_API_KEY));

  const response = await client.chat.completions.create({
    model: 'kelly-haiku',
    messages: [{ role: 'user', content: 'What does "ubiquitous" mean?' }],
  });

  console.log(response.choices[0].message.content);
}

main().catch(console.error);
