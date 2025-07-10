import express from 'express';
import 'reflect-metadata';
import { AppDataSource } from './utils/dataSource';
import bookRoutes from './routes/bookRoutes';
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';
import redisClient from './utils/redisClient';

const swaggerDocument = YAML.load('./swagger.yaml');
const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());

// Swagger Docs
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Routes
app.use('/books', bookRoutes); // ✅ Use proper route prefix to avoid root conflicts

// Default route
app.get('/', (req, res) => res.send('📚 Book Review API is running!'));

// Startup logic
const startServer = async () => {
  try {
    await AppDataSource.initialize();
    console.log('📦 DB initialized');

    if (!redisClient.isOpen) {
      await redisClient.connect();
      console.log('📡 Redis connected');
    }

    app.listen(PORT, () => {
      console.log(`Server on http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error(' Startup error:', err);
    process.exit(1);
  }
};

// Graceful shutdown
process.on('SIGINT', async () => {
  if (redisClient.isOpen) {
    await redisClient.quit();
    console.log('❎ Redis client disconnected');
  }
  process.exit(0);
});

startServer();
