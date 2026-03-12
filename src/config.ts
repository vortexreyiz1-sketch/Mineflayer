import dotenv from 'dotenv';

dotenv.config();

function required(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
}

const allowedUsers = (process.env.ALLOWED_CHAT_USERS ?? '')
  .split(',')
  .map((u) => u.trim())
  .filter(Boolean);

export const config = {
  minecraft: {
    host: process.env.MINECRAFT_HOST ?? 'localhost',
    port: Number(process.env.MINECRAFT_PORT ?? 25565),
    username: process.env.MINECRAFT_USERNAME ?? 'GroqBot',
    version: process.env.MINECRAFT_VERSION
  },
  botPrefix: process.env.BOT_PREFIX ?? '!',
  groq: {
    apiKey: required('GROQ_API_KEY'),
    model: process.env.GROQ_MODEL ?? 'llama-3.1-70b-versatile'
  },
  allowedUsers
};
