/**
 * Kelly Intelligence SDK
 * OpenAI-compatible AI tutor API — 162K words, 47 languages, powered by Claude
 * https://api.thedailylesson.com
 */

const BASE_URL = 'https://api.thedailylesson.com';

class KellyIntelligence {
  constructor({ apiKey, baseURL } = {}) {
    this.apiKey = apiKey || process.env.KELLY_API_KEY || process.env.KELLY_INTELLIGENCE_API_KEY;
    this.baseURL = (baseURL || BASE_URL).replace(/\/$/, '');
    if (!this.apiKey) throw new Error('API key required. Pass apiKey or set KELLY_API_KEY env var. Get one free at https://api.thedailylesson.com');
    this.chat = { completions: { create: (opts) => this.createCompletion(opts) } };
  }

  async createCompletion({ model = 'kelly-haiku', messages, stream = false, max_tokens, temperature, top_p } = {}) {
    if (!messages?.length) throw new Error('messages array is required');

    const body = { model, messages, stream };
    if (max_tokens != null) body.max_tokens = max_tokens;
    if (temperature != null) body.temperature = temperature;
    if (top_p != null) body.top_p = top_p;

    const res = await fetch(`${this.baseURL}/v1/chat/completions`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${this.apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.error?.message || `HTTP ${res.status}`);
    }

    if (stream) return this._streamResponse(res);
    return res.json();
  }

  async *_streamResponse(res) {
    const reader = res.body.getReader();
    const decoder = new TextDecoder();
    let buf = '';

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      buf += decoder.decode(value, { stream: true });
      const lines = buf.split('\n');
      buf = lines.pop() || '';
      for (const line of lines) {
        if (line.startsWith('data: [DONE]')) return;
        if (!line.startsWith('data: ')) continue;
        try { yield JSON.parse(line.slice(6)); } catch {}
      }
    }
  }

  async models() {
    const res = await fetch(`${this.baseURL}/v1/models`, {
      headers: { 'Authorization': `Bearer ${this.apiKey}` },
    });
    return res.json();
  }

  async usage() {
    const res = await fetch(`${this.baseURL}/v1/usage`, {
      headers: { 'Authorization': `Bearer ${this.apiKey}` },
    });
    return res.json();
  }
}

// Also works as OpenAI SDK drop-in config helper
KellyIntelligence.openaiConfig = (apiKey) => ({
  apiKey: apiKey || process.env.KELLY_API_KEY,
  baseURL: `${BASE_URL}/v1`,
});

module.exports = KellyIntelligence;
module.exports.default = KellyIntelligence;
module.exports.KellyIntelligence = KellyIntelligence;
