import { Bot } from 'mineflayer';
import { goals, Movements, pathfinder } from 'mineflayer-pathfinder';
import minecraftData from 'minecraft-data';

export class BotTools {
  constructor(private readonly bot: Bot) {
    this.bot.loadPlugin(pathfinder);
    const mcData = minecraftData(this.bot.version);
    this.bot.pathfinder.setMovements(new Movements(this.bot, mcData));
  }

  async say(text: string): Promise<void> {
    this.bot.chat(text);
  }

  async followPlayer(username: string): Promise<void> {
    const target = this.bot.players[username]?.entity;
    if (!target) {
      this.bot.chat(`${username} görünmüyor.`);
      return;
    }

    this.bot.pathfinder.setGoal(new goals.GoalFollow(target, 2), true);
  }

  async goto(x: number, y: number, z: number): Promise<void> {
    this.bot.pathfinder.setGoal(new goals.GoalBlock(x, y, z));
  }

  async stop(): Promise<void> {
    this.bot.pathfinder.setGoal(null);
    this.bot.clearControlStates();
  }
}
