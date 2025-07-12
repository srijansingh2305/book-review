Great — since you **already have a `README.md`** with core project info and setup, you can now **refactor and merge** the full run guide into your existing README under proper headings.

Below is a clean, **final `README.md` version** that combines:

* Your current project description
* Full step-by-step instructions
* Clear command examples
* Script summary table
* Proper formatting and links

---

### Final `README.md` (Copy and Paste This)

````markdown
# Book Review API

A RESTful backend service to manage books and their reviews.  
Built with **TypeScript**, **Express.js**, **SQLite**, **TypeORM**, and **Redis**.

---

## Features

- `GET /books`: List all books (with reviews)
- `POST /books`: Add a new book
- `GET /books/:id/reviews`: List reviews for a specific book
- `POST /books/:id/reviews`: Add a review to a book
- `DELETE /reviews/:id`: Remove a review
- Redis caching for performance
- TypeORM migrations and SQLite database
- Swagger (OpenAPI) docs
- Jest + Supertest for automated testing

---

## Tech Stack

| Layer         | Technology        |
|--------------|-------------------|
| Language      | TypeScript        |
| Framework     | Express.js        |
| ORM           | TypeORM           |
| Database      | SQLite            |
| Cache         | Redis             |
| Docs          | Swagger (OpenAPI) |
| Testing       | Jest + Supertest  |

---

## Step-by-Step Setup

### 1. Clone the Repository

```bash
git clone https://github.com/srijansingh2305/book-review.git
cd book-review
````

### 2. Install Dependencies

Make sure you have:

* Node.js ≥ 18.x
* npm
* Docker (for Redis)

Install all required packages:

```bash
npm install
```

---

### 3. Start Redis (via Docker)

```bash
docker run -p 6379:6379 redis
```

---

### 4. Run the Development Server

```bash
npm run dev
```

* Visit API: [http://localhost:3000](http://localhost:3000)
* Swagger Docs: [http://localhost:3000/api-docs](http://localhost:3000/api-docs)

---

## Migrations & Seeding

### (Optional) Generate Migration

```bash
npx typeorm-ts-node-commonjs migration:generate src/migrations/Init
```

### Run Migrations

```bash
npx typeorm-ts-node-commonjs migration:run -d src/utils/dataSource.ts
```

### Seed Sample Data

```bash
npm run seed
```

---

## Clear Database & Redis Cache

### Clear SQLite DB

```bash
npm run clear
```

### Clear Redis Cache

```bash
npm run clear-cache
```

---

## Run Automated Tests

Tests use **Jest** and **Supertest**, and are located in the `__tests__` directory.

Ensure Redis is running, and the DB is empty:

```bash
npm test
```

Tests include:

* Adding a book via `POST /books`
* Simulating cache miss via `GET /books`
* Automatic setup/teardown of DB and Redis

---

## Swagger API Docs

Once the server is running, visit:

```
http://localhost:3000/api-docs
```

Powered by the `swagger.yaml` file in the root directory.

---

## `package.json` Scripts

```json
"scripts": {
  "dev": "ts-node-dev --respawn --transpile-only src/app.ts",
  "seed": "ts-node src/utils/seed.ts",
  "clear": "ts-node src/utils/clear.ts",
  "clear-cache": "ts-node src/utils/clearCache.ts",
  "test": "jest"
}
```

---

## 🧾 Summary of Common Commands

| Action               | Command                                                                 |
| -------------------- | ----------------------------------------------------------------------- |
| Install dependencies | `npm install`                                                           |
| Start Redis (Docker) | `docker run -p 6379:6379 redis`                                         |
| Run server           | `npm run dev`                                                           |
| Run migration        | `npx typeorm-ts-node-commonjs migration:run -d src/utils/dataSource.ts` |
| Generate migration   | `npx typeorm-ts-node-commonjs migration:generate src/migrations/Init`   |
| Seed DB              | `npm run seed`                                                          |
| Clear DB             | `npm run clear`                                                         |
| Clear Redis cache    | `npm run clear-cache`                                                   |
| Run tests            | `npm test`                                                              |

---

## Environment Requirements

* Node.js ≥ 18.x
* Redis (local or via Docker)

---

## Submission-Ready

This repo contains:

* Full working REST API
* Swagger UI and OpenAPI docs
* Redis caching for GET endpoints
* Automated tests
* Migrations, seeding, and scripts
* Clear step-by-step documentation


