export interface Message {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

export interface CompletionOptions {
  model?: 'kelly-haiku' | 'kelly-sonnet' | 'kelly-opus' | 'claude-haiku' | 'claude-sonnet' | 'claude-opus';
  messages: Message[];
  stream?: boolean;
  max_tokens?: number;
  temperature?: number;
  top_p?: number;
}

export interface ChatCompletion {
  id: string;
  object: 'chat.completion';
  created: number;
  model: string;
  choices: Array<{
    index: number;
    message: { role: string; content: string };
    finish_reason: string;
  }>;
  usage: { prompt_tokens: number; completion_tokens: number; total_tokens: number };
}

export interface ChatCompletionChunk {
  id: string;
  object: 'chat.completion.chunk';
  created: number;
  model: string;
  choices: Array<{
    index: number;
    delta: { role?: string; content?: string };
    finish_reason: string | null;
  }>;
}

export default class KellyIntelligence {
  constructor(options?: { apiKey?: string; baseURL?: string });
  chat: { completions: { create: (opts: CompletionOptions) => Promise<ChatCompletion | AsyncGenerator<ChatCompletionChunk>> } };
  createCompletion(opts: CompletionOptions): Promise<ChatCompletion>;
  models(): Promise<any>;
  usage(): Promise<any>;
  static openaiConfig(apiKey?: string): { apiKey: string; baseURL: string };
}

export { KellyIntelligence };
