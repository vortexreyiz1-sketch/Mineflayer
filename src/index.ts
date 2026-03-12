import { config } from './config';
import { GroqClient } from './ai/groqClient';
import { Planner } from './ai/planner';
import { createBot } from './bot';

async function main(): Promise<void> {
  const groq = new GroqClient(config.groq.apiKey, config.groq.model);
  const planner = new Planner(groq);
  createBot(planner);
}

main().catch((error) => {
  console.error('Fatal startup error:', error);
  process.exit(1);
});
