# kelly-intelligence

**OpenAI-compatible AI tutor SDK** — 162K words, 47 languages, powered by Claude.

Drop-in replacement for OpenAI. One line change. Automatic vocabulary RAG from 162,000 words across 47 languages.

## Install

```bash
npm install kelly-intelligence
```

## Quick Start

```javascript
const KellyIntelligence = require('kelly-intelligence');

const kelly = new KellyIntelligence({ apiKey: 'YOUR_API_KEY' });

// Non-streaming
const response = await kelly.chat.completions.create({
  model: 'kelly-haiku',
  messages: [{ role: 'user', content: 'What does ephemeral mean?' }],
});
console.log(response.choices[0].message.content);

// Streaming
const stream = await kelly.chat.completions.create({
  model: 'kelly-sonnet',
  messages: [{ role: 'user', content: 'Teach me about serendipity' }],
  stream: true,
});
for await (const chunk of stream) {
  process.stdout.write(chunk.choices[0]?.delta?.content || '');
}
```

## Works with OpenAI SDK

```javascript
const OpenAI = require('openai');
const KellyIntelligence = require('kelly-intelligence');

const client = new OpenAI(KellyIntelligence.openaiConfig('YOUR_API_KEY'));

const response = await client.chat.completions.create({
  model: 'kelly-haiku',
  messages: [{ role: 'user', content: 'What does ubiquitous mean?' }],
});
```

## Models

| Model | Engine | Best For | Min Tier |
|-------|--------|----------|----------|
| `kelly-haiku` | Claude Haiku 4.5 | Fast tutoring, quizzes | Free |
| `kelly-sonnet` | Claude Sonnet 4.6 | Deep explanations | Developer ($29/mo) |
| `kelly-opus` | Claude Opus 4.6 | Curriculum design | Pro ($99/mo) |
| `claude-haiku` | Claude Haiku 4.5 | Fast AI + vocab RAG | Free |
| `claude-sonnet` | Claude Sonnet 4.6 | Balanced AI + vocab RAG | Developer |
| `claude-opus` | Claude Opus 4.6 | Most capable + vocab RAG | Pro |

Kelly models include a warm AI tutor persona. Claude models include vocabulary RAG only.

## What's Different From Raw Claude?

- **162K words** auto-injected as RAG context (definitions, etymology, IPA)
- **601K translations** across 47 languages
- **AI tutor persona** (Kelly) — warm, Socratic, 5-phase teaching method
- **OpenAI-compatible** format — works with any OpenAI client

## Free API Key

Get one at [api.thedailylesson.com](https://api.thedailylesson.com) — 500 calls/month, no credit card.

## License

MIT — Built by [Lesson of the Day, PBC](https://lotdpbc.com)
