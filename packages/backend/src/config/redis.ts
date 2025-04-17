import { createClient } from 'redis';
import { logger } from '../utils/logger';
import env from './env';

const client = createClient({
  url: env.REDIS_URL,
});

client.on('error', (err) => {
  logger.error('Redis Client Error', err);
});

client.on('connect', () => {
  logger.info('Redis Client Connected');
});

export const connectRedis = async () => {
  try {
    await client.connect();
  } catch (err) {
    logger.error('Erro ao conectar com Redis', err);
    process.exit(1);
  }
};

export default client; 