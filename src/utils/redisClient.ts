

import { createClient } from 'redis';

const redisClient = createClient({
  socket: {
    host: '127.0.0.1', // or 'localhost'
    port: 6379,
  }
});

redisClient.on('error', (err) => {
  console.error('Redis client error:', err);
});

export default redisClient;
