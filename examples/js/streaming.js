/**
 * Kelly Intelligence — Streaming Example (JavaScript)
 *
 * Run: KELLY_API_KEY=your_key node streaming.js
 */

const KellyIntelligence = require('kelly-intelligence');

async function main() {
  const kelly = new KellyIntelligence({ apiKey: process.env.KELLY_API_KEY });

  const stream = await kelly.chat.completions.create({
    model: 'kelly-sonnet',
    messages: [
      { role: 'user', content: 'Teach me the word "serendipity" using the 5-phase Socratic method.' },
    ],
    stream: true,
  });

  for await (const chunk of stream) {
    process.stdout.write(chunk.choices[0]?.delta?.content || '');
  }
  process.stdout.write('\n');
}

main().catch(console.error);
