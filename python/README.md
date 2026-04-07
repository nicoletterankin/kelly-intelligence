# kelly-intelligence

**OpenAI-compatible AI tutor SDK** — 162K words, 47 languages, powered by Claude.

Drop-in replacement for OpenAI. One line change. Automatic vocabulary RAG from 162,000 words across 47 languages.

## Install

```bash
pip install kelly-intelligence
```

## Quick Start

```python
from kelly_intelligence import KellyIntelligence

kelly = KellyIntelligence(api_key="YOUR_API_KEY")

# Non-streaming
response = kelly.chat.completions.create(
    model="kelly-haiku",
    messages=[{"role": "user", "content": "What does ephemeral mean?"}],
)
print(response["choices"][0]["message"]["content"])

# Streaming
for chunk in kelly.chat.completions.create(
    model="kelly-sonnet",
    messages=[{"role": "user", "content": "Teach me about serendipity"}],
    stream=True,
):
    print(chunk["choices"][0]["delta"].get("content", ""), end="")
```

## Works with OpenAI SDK

```python
from openai import OpenAI
from kelly_intelligence import KellyIntelligence

client = OpenAI(**KellyIntelligence.openai_config("YOUR_API_KEY"))

response = client.chat.completions.create(
    model="kelly-haiku",
    messages=[{"role": "user", "content": "What does ubiquitous mean?"}],
)
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

## Free API Key

Get one at [api.thedailylesson.com](https://api.thedailylesson.com) — 500 calls/month, no credit card.

## License

MIT — Built by [Lesson of the Day, PBC](https://lotdpbc.com)
