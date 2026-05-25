# Production-Ready URL Shortener Backend

A scalable and production-oriented URL Shortener Backend built using:

- Node.js
- Express.js
- MongoDB
- Redis
- Docker & Docker Compose
- Swagger/OpenAPI

This project goes beyond a basic CRUD backend and includes several production-grade backend engineering concepts such as:

- Layered Architecture
- Redis Caching
- Graceful Degradation
- Rate Limiting
- Structured Logging
- Request Correlation IDs
- Health Monitoring
- Graceful Shutdown
- Dockerized Infrastructure
- OpenAPI Documentation

---

# Features

## Core Features

- Create shortened URLs
- Redirect short URLs to original URLs
- Track click analytics
- Generate Base62 short codes
- URL validation middleware

---

## Backend Engineering Features

### Architecture

- Layered architecture
  - Routes
  - Controllers
  - Services
  - Repositories
  - Middlewares
  - Utilities

### Error Handling

- Centralized global error middleware
- Custom AppError class
- Async handler utility
- Structured API error responses

### Redis Caching

- Redis caching for frequently accessed URLs
- Automatic fallback to MongoDB when Redis is unavailable
- Graceful degradation support

### Rate Limiting

- IP-based rate limiting
- Redis-backed request tracking
- Fail-open behavior when Redis is down

### Logging & Monitoring

- Structured logging using Pino
- Request lifecycle logging
- Request correlation IDs
- Health check endpoint
- Response time tracking

### Reliability

- Graceful shutdown implementation
- MongoDB cleanup on shutdown
- Redis cleanup on shutdown
- Shutdown timeout protection

### DevOps & Infrastructure

- Dockerized backend
- Docker Compose multi-container setup
- MongoDB container
- Redis container
- Persistent Docker volumes

### API Documentation

- Swagger/OpenAPI integration
- Interactive API testing UI
- Self-documenting backend APIs

---

# Tech Stack

| Technology | Purpose |
|---|---|
| Node.js | Runtime |
| Express.js | Backend Framework |
| MongoDB | Primary Database |
| Mongoose | MongoDB ODM |
| Redis | Caching & Rate Limiting |
| Docker | Containerization |
| Docker Compose | Multi-container orchestration |
| Pino | Structured Logging |
| Swagger/OpenAPI | API Documentation |

---

# Project Structure

```bash
src/
├── config/
│   ├── db.js
│   ├── redis.js
│   └── swagger.js
│
├── controllers/
│   └── urlController.js
│
├── middlewares/
│   ├── errorMiddleware.js
│   ├── rateLimiter.js
│   ├── requestId.js
│   ├── requestLogger.js
│   ├── validateShortCode.js
│   └── validateUrl.js
│
├── repositories/
│   └── urlRepository.js
│
├── routes/
│   ├── redirectRoutes.js
│   └── urlRoutes.js
│
├── services/
│   └── urlService.js
│
├── utils/
│   ├── AppError.js
│   ├── asyncHandler.js
│   ├── base62.js
│   ├── generateId.js
│   └── logger.js
│
├── app.js
└── server.js
```

---

# API Endpoints

## Create Short URL

```http
POST /api/shorten
```

### Request Body

```json
{
  "longUrl": "https://google.com"
}
```

### Response

```json
{
  "shortUrl": "http://localhost:5000/b"
}
```

---

## Redirect to Original URL

```http
GET /:shortCode
```

### Example

```http
GET /b
```

### Behavior

Redirects user to original URL.

---

## Get URL Statistics

```http
GET /api/stats/:shortCode
```

### Example

```http
GET /api/stats/b
```

### Response

```json
{
  "shortCode": "b",
  "longUrl": "https://google.com",
  "clickCount": 10,
  "createdAt": "2026-05-24T10:00:00.000Z"
}
```

---

## Health Check

```http
GET /health
```

### Response

```json
{
  "status": "OK",
  "uptime": 120,
  "timestamp": "2026-05-24T10:00:00.000Z",
  "database": "connected",
  "redis": "connected"
}
```

---

# Swagger/OpenAPI Documentation

Interactive API docs are available at:

```http
http://localhost:5000/api-docs
```

Swagger UI allows:

- Viewing all API endpoints
- Testing APIs directly from browser
- Understanding request/response schemas

Note:

The redirect endpoint may show browser CORS limitations inside Swagger UI because redirects are browser-controlled behavior.

---

# Environment Variables

Create a `.env` file in the root directory.

```env
PORT=5000
BASE_URL=http://localhost:5000

MONGO_URI=mongodb://localhost:27017/url-shortener

REDIS_URL=redis://localhost:6379
```

---

# Running Locally

## Install Dependencies

```bash
npm install
```

## Start MongoDB

Make sure MongoDB is running locally.

## Start Redis

Make sure Redis is running locally.

## Run Development Server

```bash
npm run dev
```

---

# Docker Setup

## Build and Run Containers

```bash
docker compose up --build
```

---

## Containers

The Docker Compose setup includes:

- Backend App Container
- MongoDB Container
- Redis Container

---

# Logging

Structured logging is implemented using Pino.

Logs include:

- Request method
- Route
- Status code
- Response time
- IP address
- Request correlation ID

Example:

```bash
GET /api/stats/b 200 - 12ms
```

---

# Production Concepts Implemented

This project demonstrates several important backend engineering concepts:

## Scalability

- Redis caching
- Rate limiting
- Layered architecture

## Reliability

- Graceful shutdown
- Health monitoring
- Error handling
- Request logging

## Observability

- Structured logs
- Request tracing
- Health endpoints

## Resilience

- Graceful degradation
- Redis fallback behavior
- Optional dependency handling

## DevOps

- Docker
- Docker Compose
- Container networking
- Persistent volumes

---

# Future Improvements

Potential future upgrades:

- Authentication & Authorization
- User accounts
- Custom aliases
- Expiring URLs
- Analytics dashboard
- Background jobs
- Distributed rate limiting
- Kubernetes deployment
- CI/CD pipelines
- Monitoring dashboards

---

# Learning Outcomes

This project helped in learning:

- Backend architecture design
- Express middleware pipeline
- Async error handling
- Redis caching strategies
- Production logging
- Health monitoring
- Graceful shutdowns
- Docker fundamentals
- OpenAPI documentation
- Backend resilience patterns

---

# Author

Built as part of backend engineering learning and production backend architecture practice.
