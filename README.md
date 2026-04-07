# Kelly Intelligence

**OpenAI-compatible AI tutor API** — 162,000 words, 47 languages, powered by Claude.

Drop-in replacement for OpenAI. One line change. Automatic vocabulary RAG from 162K words across 47 languages, plus an opinionated AI tutor persona ("Kelly") trained on a 5-phase Socratic teaching method.

> Built by [Lesson of the Day, PBC](https://lotdpbc.com) — a public benefit corporation building learning infrastructure.

## Why Kelly Intelligence?

| | Raw Claude | Kelly Intelligence |
|---|---|---|
| OpenAI-compatible | No | Yes |
| Vocabulary RAG | No | 162K words auto-injected |
| Translations | No | 601K across 47 languages |
| Tutor persona | No | Kelly + 12 archetypes |
| Free tier | No | 500 calls/month |

## Quick Start

### JavaScript / TypeScript

```bash
npm install kelly-intelligence
```

```javascript
const KellyIntelligence = require('kelly-intelligence');

const kelly = new KellyIntelligence({ apiKey: process.env.KELLY_API_KEY });

const response = await kelly.chat.completions.create({
  model: 'kelly-haiku',
  messages: [{ role: 'user', content: 'What does ephemeral mean?' }],
});

console.log(response.choices[0].message.content);
```

### Python

```bash
pip install kelly-intelligence
```

```python
from kelly_intelligence import KellyIntelligence

kelly = KellyIntelligence(api_key="YOUR_API_KEY")

response = kelly.chat.completions.create(
    model="kelly-haiku",
    messages=[{"role": "user", "content": "What does ephemeral mean?"}],
)
print(response["choices"][0]["message"]["content"])
```

### Use the official OpenAI SDK (drop-in)

```javascript
const OpenAI = require('openai');
const KellyIntelligence = require('kelly-intelligence');

const client = new OpenAI(KellyIntelligence.openaiConfig(process.env.KELLY_API_KEY));

// Now every OpenAI SDK call goes through Kelly Intelligence
```

```python
from openai import OpenAI
from kelly_intelligence import KellyIntelligence

client = OpenAI(**KellyIntelligence.openai_config("YOUR_API_KEY"))
```

### curl

```bash
curl https://api.thedailylesson.com/v1/chat/completions \
  -H "Authorization: Bearer $KELLY_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "kelly-haiku",
    "messages": [{"role": "user", "content": "What does serendipity mean?"}]
  }'
```

## Models

| Model | Engine | Best For | Min Tier |
|-------|--------|----------|----------|
| `kelly-haiku` | Claude Haiku 4.5 | Fast tutoring, quizzes | Free |
| `kelly-sonnet` | Claude Sonnet 4.6 | Deep explanations | Developer |
| `kelly-opus` | Claude Opus 4.6 | Curriculum design | Pro |
| `claude-haiku` | Claude Haiku 4.5 | Fast AI + vocab RAG | Free |
| `claude-sonnet` | Claude Sonnet 4.6 | Balanced AI + vocab RAG | Developer |
| `claude-opus` | Claude Opus 4.6 | Most capable + vocab RAG | Pro |

`kelly-*` models include the Kelly tutor persona. `claude-*` models are raw Claude with vocabulary RAG only.

## Pricing

| Tier | Price | Calls/month | Models |
|------|-------|-------------|--------|
| Free | $0 | 500 | kelly-haiku, claude-haiku |
| Developer | $29/mo | 5,000 | + kelly-sonnet, claude-sonnet |
| Pro | $99/mo | 25,000 | + kelly-opus, claude-opus |
| Enterprise | $299/mo | Unlimited | All + priority support |

[Get a free API key →](https://api.thedailylesson.com)

## Streaming

Both SDKs support streaming via async iterators.

```javascript
const stream = await kelly.chat.completions.create({
  model: 'kelly-sonnet',
  messages: [{ role: 'user', content: 'Teach me about serendipity' }],
  stream: true,
});
for await (const chunk of stream) {
  process.stdout.write(chunk.choices[0]?.delta?.content || '');
}
```

```python
for chunk in kelly.chat.completions.create(
    model="kelly-sonnet",
    messages=[{"role": "user", "content": "Teach me about serendipity"}],
    stream=True,
):
    print(chunk["choices"][0]["delta"].get("content", ""), end="")
```

## API Reference

- **OpenAPI 3.1 spec:** https://api.thedailylesson.com/openapi.json
- **AI plugin manifest:** https://api.thedailylesson.com/.well-known/ai-plugin.json
- **Docs:** https://api.thedailylesson.com

## Examples

See the [`examples/`](./examples) directory for complete working code:

- [`examples/js/quickstart.js`](./examples/js/quickstart.js) — basic usage
- [`examples/js/streaming.js`](./examples/js/streaming.js) — streaming responses
- [`examples/js/openai-drop-in.js`](./examples/js/openai-drop-in.js) — OpenAI SDK compatibility
- [`examples/python/quickstart.py`](./examples/python/quickstart.py) — basic usage
- [`examples/python/streaming.py`](./examples/python/streaming.py) — streaming responses

## License

MIT — see [LICENSE](./LICENSE)

Built by [Lesson of the Day, PBC](https://lotdpbc.com)
