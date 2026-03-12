import { BotPlan } from '../types';

interface GroqMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

interface GroqChatRequest {
  model: string;
  messages: GroqMessage[];
  temperature?: number;
  response_format?: {
    type: 'json_object';
  };
}

export class GroqClient {
  constructor(private readonly apiKey: string, private readonly model: string) {}

  async createPlan(prompt: string): Promise<BotPlan> {
    const systemPrompt = [
      'You are a Minecraft task planner for a Mineflayer bot.',
      'Return only valid JSON with shape: {"summary": string, "actions": BotAction[]}.',
      'Allowed actions: say(text), follow_player(username), goto(x,y,z), stop().',
      'Never invent unsupported actions.'
    ].join(' ');

    const payload: GroqChatRequest = {
      model: this.model,
      temperature: 0.1,
      response_format: { type: 'json_object' },
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: prompt }
      ]
    };

    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${this.apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      const text = await response.text();
      throw new Error(`Groq request failed: ${response.status} ${text}`);
    }

    const data = (await response.json()) as {
      choices?: Array<{ message?: { content?: string } }>;
    };

    const content = data.choices?.[0]?.message?.content;
    if (!content) {
      throw new Error('Groq returned an empty response');
    }

    return JSON.parse(content) as BotPlan;
  }
}
