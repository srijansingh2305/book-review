// src/utils/dataSource.ts

import 'reflect-metadata'; // Required for TypeORM's decorators
import { DataSource } from 'typeorm';
import { Book } from '../models/Book';
import { Review } from '../models/Review';

// Configure and initialize the TypeORM data source
const AppDataSource = new DataSource({
  type: 'sqlite',                  // Use SQLite as the database
  database: 'database.sqlite',     // Database file path
  synchronize: false,              // Disable auto-sync in favor of migrations
  logging: false,                  // Disable query logging
  entities: [Book, Review],        // Register entity models
  migrations: ['src/migrations/*.ts'],     // Path to migration files
  subscribers: ['src/subscribers/*.ts'],   // (Optional) path to event subscribers
});

// Export the configured data source for use in the app and CLI commands
export default AppDataSource;
