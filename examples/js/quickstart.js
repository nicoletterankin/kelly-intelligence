/**
 * Kelly Intelligence — Quick Start (JavaScript)
 *
 * Run: KELLY_API_KEY=your_key node quickstart.js
 * Get a free key at https://api.thedailylesson.com
 */

const KellyIntelligence = require('kelly-intelligence');

async function main() {
  const kelly = new KellyIntelligence({ apiKey: process.env.KELLY_API_KEY });

  const response = await kelly.chat.completions.create({
    model: 'kelly-haiku',
    messages: [
      { role: 'user', content: 'What does the word "ephemeral" mean? Teach me with an example.' },
    ],
  });

  console.log(response.choices[0].message.content);
  console.log('\nTokens used:', response.usage);
}

main().catch(console.error);
