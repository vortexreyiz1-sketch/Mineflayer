export type BotActionName = 'say' | 'follow_player' | 'goto' | 'stop';

export interface BotAction {
  action: BotActionName;
  args: Record<string, string | number | boolean>;
  reason?: string;
}

export interface BotPlan {
  summary: string;
  actions: BotAction[];
}

export interface ChatContext {
  username: string;
  message: string;
}
