import { BotAction, BotPlan } from '../types';
import { BotTools } from './tools';

export class TaskRunner {
  constructor(private readonly tools: BotTools) {}

  async run(plan: BotPlan): Promise<void> {
    for (const action of plan.actions) {
      await this.runAction(action);
    }
  }

  private async runAction(action: BotAction): Promise<void> {
    switch (action.action) {
      case 'say': {
        await this.tools.say(String(action.args.text ?? ''));
        return;
      }
      case 'follow_player': {
        await this.tools.followPlayer(String(action.args.username ?? ''));
        return;
      }
      case 'goto': {
        await this.tools.goto(
          Number(action.args.x ?? 0),
          Number(action.args.y ?? 0),
          Number(action.args.z ?? 0)
        );
        return;
      }
      case 'stop': {
        await this.tools.stop();
        return;
      }
      default:
        return;
    }
  }
}
