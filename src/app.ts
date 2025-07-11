// src/app.ts
import 'reflect-metadata';
import express from 'express';
import AppDataSource from './utils/dataSource';
import redisClient from './utils/redisClient';
import bookRoutes from './routes/bookRoutes';
import { errorHandler } from './middlewares/errorHandler';

import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';
// Load Swagger documentation from YAML file
const swaggerDocument = YAML.load('./swagger.yaml'); // make sure path is correct

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware for parsing JSON requests
app.use(express.json());

// Swagger Docs route
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Routes
app.use('/books', bookRoutes);

// Health check
app.get('/', (req, res) => {
  res.send('📚 Book Review API is running!');
});

app.use(errorHandler);

// Initialize database and start server
const startServer = async () => {
  try {
    await AppDataSource.initialize();
    console.log('Database connected successfully');

    await redisClient.connect();
    console.log('📡 Redis connected successfully');

    app.listen(PORT, () => {
      console.log(`Server running at http://localhost:${PORT}`);
      console.log(`Swagger docs at http://localhost:${PORT}/api-docs`);
    });
  } catch (error) {
    console.error('Error starting server:', error);
    process.exit(1);
  }
};

startServer();

export default app;
