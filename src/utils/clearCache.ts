import redisClient from './redisClient';

// Function to clear all Redis cache
const clearCache = async () => {
  // Connect to Redis server
  await redisClient.connect();
  // Remove all keys from all Redis databases
  await redisClient.flushAll();
  // Log confirmation message
  console.log('Redis cache cleared.');
  // Exit the process
  process.exit(0);
};

// Execute the cache clearing function
clearCache();
