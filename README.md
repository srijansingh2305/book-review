# Book Review API

A RESTful backend service to manage books and their reviews. Built with **TypeScript**, **Express.js**, **SQLite**, **TypeORM**, and **Redis**.

---

## Features

- `GET /books`: List all books (with reviews)
- `POST /books`: Add a new book
- `GET /books/:id/reviews`: List reviews for a specific book
- `POST /books/:id/reviews`: Add a review to a book
- Redis caching for improved performance
- SQLite with TypeORM and migrations
- Swagger (OpenAPI) documentation
- Unit and integration tests

---

## Tech Stack

| Layer         | Technology         |
|---------------|--------------------|
| Language       | TypeScript         |
| Framework      | Express.js         |
| ORM            | TypeORM            |
| Database       | SQLite             |
| Cache          | Redis              |
| Documentation  | Swagger (OpenAPI)  |
| Testing        | Jest + Supertest   |

---

## Installation & Setup

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/book-review-api.git
cd book-review-api
```

### 2. Install Dependencies
npm install

3. Ensure Redis is Running
You can use Docker:

docker run -p 6379:6379 redis

Migrations & Seeding
Generate Migrations (Already done if using provided repo)
npx typeorm-ts-node-commonjs migration:generate -d src/utils/dataSource.ts src/migrations/InitSchema


Run Migrations
npx typeorm-ts-node-commonjs migration:run -d src/utils/dataSource.ts


Seed Sample Data
npm run seed


Running the Server
npm run dev
http://localhost:3000

Running Tests
npm run test

Tests include:

Unit test for creating a book

Integration test for Redis cache-miss behavior

Swagger API Docs
After starting the server, visit:
http://localhost:3000/api-docs
This is powered by the swagger.yaml file in the project root.

Environment
Node.js ≥ 18.x

Redis (local or Docker)