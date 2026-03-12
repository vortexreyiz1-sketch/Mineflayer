import mineflayer, { Bot } from 'mineflayer';
import { config } from '../config';
import { Planner } from '../ai/planner';
import { BotTools } from './tools';
import { TaskRunner } from './taskRunner';

function isAuthorizedUser(username: string): boolean {
  if (config.allowedUsers.length === 0) return true;
  return config.allowedUsers.includes(username);
}

export function createBot(planner: Planner): Bot {
  const bot = mineflayer.createBot({
    host: config.minecraft.host,
    port: config.minecraft.port,
    username: config.minecraft.username,
    version: config.minecraft.version
  });

  const tools = new BotTools(bot);
  const runner = new TaskRunner(tools);

  bot.once('spawn', () => {
    console.log('Bot spawned successfully.');
  });

  bot.on('chat', async (username, message) => {
    if (username === bot.username) return;
    if (!message.startsWith(config.botPrefix)) return;
    if (!isAuthorizedUser(username)) {
      bot.chat('Bu komutu çalıştırma yetkin yok.');
      return;
    }

    const command = message.slice(config.botPrefix.length).trim();
    if (!command) return;

    try {
      const plan = await planner.planFromChat({ username, message: command });
      console.log('Plan:', plan.summary, plan.actions);
      await runner.run(plan);
    } catch (error) {
      console.error('Plan execution failed:', error);
      bot.chat('Komutu işlerken hata aldım.');
    }
  });

  bot.on('kicked', (reason) => {
    console.error('Bot kicked:', reason);
  });

  bot.on('error', (error) => {
    console.error('Bot error:', error);
  });

  bot.on('end', () => {
    console.warn('Connection ended. Reconnecting in 5s...');
    setTimeout(() => {
      createBot(planner);
    }, 5000);
  });

  return bot;
}
