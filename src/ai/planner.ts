import { ChatContext, BotPlan, BotActionName } from '../types';
import { GroqClient } from './groqClient';

const ALLOWED_ACTIONS = new Set<BotActionName>(['say', 'follow_player', 'goto', 'stop']);

export class Planner {
  constructor(private readonly groq: GroqClient) {}

  async planFromChat(input: ChatContext): Promise<BotPlan> {
    const prompt = `Player ${input.username} said: "${input.message}". Create a short safe action plan.`;
    const plan = await this.groq.createPlan(prompt);

    const actions = plan.actions.filter((action) => ALLOWED_ACTIONS.has(action.action));
    if (actions.length === 0) {
      return {
        summary: 'No safe action generated, fallback to help response.',
        actions: [{ action: 'say', args: { text: 'Bu komutu güvenli şekilde işleyemedim.' } }]
      };
    }

    return {
      summary: plan.summary,
      actions
    };
  }
}
