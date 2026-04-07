<p align="center">
  <a href="https://api.thedailylesson.com">
    <img src="https://api.thedailylesson.com/og.svg" alt="Kelly Intelligence — OpenAI-compatible AI tutor API" width="640">
  </a>
</p>

<h1 align="center">Kelly Intelligence</h1>

<p align="center">
  <strong>OpenAI-compatible AI tutor API.</strong> 162,000 words. 47 languages. Powered by Claude.
</p>

<p align="center">
  <a href="https://api.thedailylesson.com"><img alt="Try it live" src="https://img.shields.io/badge/Try_it_live-no_signup-22c55e?style=for-the-badge"></a>
  <a href="https://api.thedailylesson.com"><img alt="Free tier" src="https://img.shields.io/badge/Free-500_calls%2Fmo-3b82f6?style=for-the-badge"></a>
  <a href="./LICENSE"><img alt="License: MIT" src="https://img.shields.io/badge/license-MIT-eab308?style=for-the-badge"></a>
  <a href="https://api.thedailylesson.com/openapi.json"><img alt="OpenAPI 3.1" src="https://img.shields.io/badge/OpenAPI-3.1-6366f1?style=for-the-badge"></a>
</p>

<p align="center">
  <a href="https://api.thedailylesson.com">▶ Live Playground</a> ·
  <a href="https://api.thedailylesson.com/integrations">⚙ Integrations (25+ tools)</a> ·
  <a href="https://github.com/nicoletterankin/kelly-action">🤖 GitHub Action</a> ·
  <a href="https://stackblitz.com/fork/github/nicoletterankin/kelly-intelligence/tree/master/examples/js">⚡ StackBlitz</a> ·
  <a href="https://api.thedailylesson.com/openapi.json">OpenAPI Spec</a>
</p>

---

**Drop-in replacement for OpenAI.** Change one line — `base_url`. Get automatic vocabulary RAG from 162K words across 47 languages, plus an opinionated AI tutor persona ("Kelly") trained on a 5-phase Socratic teaching method.

> Built by [Lesson of the Day, PBC](https://lotdpbc.com) — a public benefit corporation building learning infrastructure.

## Try it in 10 seconds (no signup)

```bash
curl -X POST https://api.thedailylesson.com/v1/demo \
  -H "Content-Type: application/json" \
  -d '{"messages":[{"role":"user","content":"What does ephemeral mean?"}]}'
```

Streams a real Kelly response. 5 free demo calls per hour per IP, no key required. When you're ready for production, [grab a free key](https://api.thedailylesson.com) (500 calls/month).

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

## Use Kelly with your existing tools

Kelly is OpenAI-compatible — drop it into anything that talks to OpenAI. Copy-paste configs for **25+ tools** at [api.thedailylesson.com/integrations](https://api.thedailylesson.com/integrations):

- **Editors:** Cursor · Continue.dev · Cline · Aider · Zed · Roo
- **SDKs:** Vercel AI SDK · LangChain · LlamaIndex · Pydantic AI · Instructor · CrewAI · Mastra
- **Routers:** LiteLLM · Helicone · Portkey · Cloudflare AI Gateway · Langfuse
- **UIs:** OpenWebUI · LibreChat · Chatbot UI
- **CI:** [GitHub Action](https://github.com/nicoletterankin/kelly-action) · n8n · curl

## AI Code Review on every PR

Drop our [GitHub Action](https://github.com/nicoletterankin/kelly-action) into `.github/workflows/` and Kelly reviews every pull request:

```yaml
- uses: nicoletterankin/kelly-action@v1
  with:
    kelly-api-key: ${{ secrets.KELLY_API_KEY }}
```

Free for the first 500 PRs/month.

## API Reference

- **OpenAPI 3.1 spec:** https://api.thedailylesson.com/openapi.json
- **AI plugin manifest:** https://api.thedailylesson.com/.well-known/ai-plugin.json
- **Integrations:** https://api.thedailylesson.com/integrations
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
