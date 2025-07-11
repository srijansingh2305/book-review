// src/utils/redisClient.ts

// Import the Redis client constructor from the 'redis' package
import { createClient } from 'redis';

// Create a Redis client with custom configuration
// The client connects to the Redis server running on localhost (127.0.0.1) at port 6379
const redisClient = createClient({
  socket: {
    host: '127.0.0.1', // Redis server address
    port: 6379         // Default Redis port
  }
});

// Listen for and handle Redis connection errors
redisClient.on('error', (err) => {
  console.error('Redis client error:', err); // Log any error during connection or operation
});

// Listen for the 'connect' event to confirm that the Redis client has connected
redisClient.on('connect', () => {
  console.log('Redis client connected'); // Confirmation log once connection is successful
});

// Export the configured Redis client so it can be used throughout the app
export default redisClient;
