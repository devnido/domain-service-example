# Domain Service Example

![Version](https://img.shields.io/badge/version-0.0.1-blue.svg)
![NestJS](https://img.shields.io/badge/NestJS-11-E0234E.svg?logo=nestjs)
![TypeScript](https://img.shields.io/badge/TypeScript-5.7-3178C6.svg?logo=typescript)
![Node](https://img.shields.io/badge/Node.js-%3E%3D20-339933.svg?logo=node.js)
![License](https://img.shields.io/badge/license-UNLICENSED-lightgrey.svg)

A **Domain Service** built with [NestJS](https://nestjs.com/) following **Hexagonal Architecture (Ports & Adapters)** principles. This service exposes a REST API for product management, delegating read operations to an external HTTP service and write operations (create, update, delete) to an AWS SQS queue for asynchronous processing.

---

## Table of Contents

- [Key Features](#key-features)
- [Architecture](#architecture)
- [Prerequisites](#prerequisites)
- [Installation & Setup](#installation--setup)
- [Usage](#usage)
- [API Documentation](#api-documentation)
- [Environment Variables](#environment-variables)
- [Project Structure](#project-structure)
- [Testing](#testing)
- [Contributing](#contributing)
- [License](#license)

---

## Key Features

- **Product CRUD** — Full create, read, update, and delete operations for products via REST API
- **Hexagonal Architecture** — Clear separation between domain logic, application use cases, and infrastructure adapters
- **CQRS-inspired pattern** — Commands (write operations) are dispatched to AWS SQS; queries (read operations) are resolved via an external HTTP service
- **AWS SQS Integration** — Asynchronous command processing through Amazon Simple Queue Service
- **External HTTP Client** — Product data retrieval from a configurable remote API using Axios
- **Swagger / OpenAPI** — Auto-generated API documentation
- **Environment Validation** — Startup-time configuration validation using Joi schemas
- **Structured Logging** — Abstracted logger port with a NestJS-native adapter
- **Input Validation** — Request DTOs validated with `class-validator` and `class-transformer`
- **Pagination** — Built-in pagination support for product listing

---

## Architecture

This project follows **Hexagonal Architecture** (also known as Ports & Adapters), ensuring that the core business logic remains decoupled from external systems.

```
┌─────────────────────────────────────────────────────────────────┐
│                       Interface Layer                           │
│              (HTTP Controllers, Consumers, etc.)                │
├─────────────────────────────────────────────────────────────────┤
│                      Application Layer                          │
│                  (Use Cases / Service Classes)                   │
├─────────────────────────────────────────────────────────────────┤
│                        Domain Layer                             │
│             (Entities, Ports, Commands, Queries)                │
├─────────────────────────────────────────────────────────────────┤
│                    Infrastructure Layer                         │
│          (HTTP Client Adapters, SQS Producer Adapters)          │
└─────────────────────────────────────────────────────────────────┘
```

### Layer Descriptions

| Layer | Directory | Responsibility |
|---|---|---|
| **Base** | `src/base/` | Cross-cutting concerns: external service configurations (SQS client, Axios HTTP client, environment config, logger, routes), and abstract base classes (`UseCase`, `Command`, `Query`, `Message`, `SQSProducerBase`) that provide reusable foundations for the application layers. |
| **Domain** | `src/app/domain/` | Core business logic — entities (`Product`), port interfaces (`ProductRepositoryPort`, `ProductProducerPort`), commands (`CreateProductCommand`, `UpdateProductCommand`, `RemoveProductCommand`), and queries (`FindProductByIdQuery`, `FindAllProductsQuery`). This layer has **zero external dependencies**. |
| **Application** | `src/app/application/` | Use case orchestration — `ProductCreator`, `ProductUpdater`, `ProductRemover` (commands) and `ProductByIdFinder`, `ProductsFinder` (queries). Each use case implements the `UseCase<Input, Output>` interface and depends only on domain ports. |
| **Infrastructure** | `src/app/infrastructure/` | Adapter implementations that connect to external systems: `ProductHttpClientAdapter` (fetches product data from a remote API via Axios) and `ProductSQSClientAdapter` (publishes commands to an AWS SQS queue). |
| **Interface** | `src/app/interface/` | Entry points to the application: REST HTTP controllers with request/response DTOs, parameter validation, and mappers that translate HTTP inputs into domain commands and queries. |

### Data Flow

```
[HTTP Request] → Controller → Mapper → Command/Query → Use Case → Port ← Adapter → [External System]
```

- **Write operations** (POST, PUT, DELETE): Controller → Use Case → `ProductProducerPort` → SQS Adapter → AWS SQS Queue
- **Read operations** (GET): Controller → Use Case → `ProductRepositoryPort` → HTTP Client Adapter → External API

---

## Prerequisites

- **Node.js** >= 20.x
- **npm** >= 10.x (or yarn / pnpm)
- **AWS Account** with SQS access (or a local SQS-compatible service like [ElasticMQ](https://github.com/softwaremill/elasticmq) or [LocalStack](https://localstack.cloud/))
- **External Product API** running at the configured URL (for read operations)

---

## Installation & Setup

1. **Clone the repository**

```bash
git clone <repository-url>
cd domain-service-example
```

2. **Install dependencies**

```bash
npm install
```

3. **Configure environment variables**

```bash
cp .env.example .env
```

Edit the `.env` file with your specific values (see [Environment Variables](#environment-variables) for details).

---

## Usage

```bash
# Development (watch mode)
npm run start:dev

# Debug mode
npm run start:debug

# Production build
npm run build

# Production start
npm run start:prod
```

The server will start on the port defined in the `PORT` environment variable (defaults to `3000`).

### Available Scripts

| Script | Description |
|---|---|
| `npm run build` | Compile the project |
| `npm run start` | Start the application |
| `npm run start:dev` | Start in watch mode (development) |
| `npm run start:debug` | Start in debug + watch mode |
| `npm run start:prod` | Start from compiled output (`dist/`) |
| `npm run lint` | Run ESLint with auto-fix |
| `npm run format` | Format code with Prettier |
| `npm run test` | Run unit tests |
| `npm run test:watch` | Run unit tests in watch mode |
| `npm run test:cov` | Run unit tests with coverage report |
| `npm run test:e2e` | Run end-to-end tests |

---

## API Documentation

This project uses **Swagger (OpenAPI)** via `@nestjs/swagger`. Once the application is running, API docs are available at:

> `http://localhost:<PORT>/api` *(confirm the exact path in your Swagger setup)*

### Endpoints

All product endpoints are under the `/products` base path.

| Method | Endpoint | Description | Request Body / Params |
|---|---|---|---|
| `GET` | `/` | Health check | — |
| `POST` | `/products` | Create a new product | `{ name, description, price }` |
| `GET` | `/products` | List all products (paginated) | Query: `?page=1&limit=10` |
| `GET` | `/products/:id` | Find a product by ID | Path: `:id` |
| `PUT` | `/products/:id` | Update an existing product | Path: `:id`, Body: `{ name, description, price }` |
| `DELETE` | `/products/:id` | Delete a product | Path: `:id` |

### Request / Response Examples

**Create Product** — `POST /products`

```json
{
  "name": "Product name",
  "description": "Product description (min 10 chars)",
  "price": 100
}
```

Response `201`:

```json
{
  "message": "Request for creating a product processed successfully"
}
```

**Find Product by ID** — `GET /products/:id`

Response `200`:

```json
{
  "id": "123e4567-e89b-12d3-a456-426614174000",
  "name": "Product name",
  "description": "Product description",
  "price": 100,
  "createdAt": "2024-01-01T00:00:00.000Z",
  "updatedAt": "2024-01-01T00:00:00.000Z"
}
```

**Find All Products** — `GET /products?page=1&limit=10`

Response `200`:

```json
{
  "data": [
    {
      "id": "123e4567-e89b-12d3-a456-426614174000",
      "name": "Product name",
      "description": "Product description",
      "price": 100,
      "createdAt": "2024-01-01T00:00:00.000Z",
      "updatedAt": "2024-01-01T00:00:00.000Z"
    }
  ],
  "total": 1
}
```

### Validation Rules

| Field | Type | Constraints |
|---|---|---|
| `name` | `string` | Min 2 chars, max 50 chars |
| `description` | `string` | Min 10 chars, max 255 chars |
| `price` | `number` | Min 0, max 1,000,000 |
| `page` | `number` (query) | Optional, min 1, default: 1 |
| `limit` | `number` (query) | Optional, min 1, max 100, default: 10 |

---

## Environment Variables

| Variable | Description | Required | Default |
|---|---|---|---|
| `PORT` | Application listening port | Yes | `3000` |
| `NODE_ENV` | Environment (`development`, `staging`, `production`, `test`) | Yes | `development` |
| `EXTERNAL_SERVICE_API_URL` | Base URL of the external product API for read operations | Yes | `http://localhost:3500` |
| `AWS_REGION` | AWS region for SQS | Yes | `us-east-1` |
| `SQS_QUEUE_URL` | Full URL of the SQS queue for command dispatching | Yes | — |
| `AWS_ACCESS_KEY_ID` | AWS access key (not needed if using IAM roles) | No | — |
| `AWS_SECRET_ACCESS_KEY` | AWS secret key (not needed if using IAM roles) | No | — |

---

## Project Structure

```
src/
├── main.ts                                     # Application entry point
│
├── base/                                       # Cross-cutting concerns & shared foundations
│   ├── config/
│   │   ├── env/                                # Environment configuration & validation (Joi)
│   │   │   ├── env-config.module.ts
│   │   │   ├── env-config.service.ts
│   │   │   └── env-config.validation.ts
│   │   ├── http/                               # Axios HTTP client base configuration
│   │   │   └── axios.http-client.ts
│   │   ├── logger/                             # Logger adapter & module (NestJS Logger)
│   │   │   ├── logger.adapter.ts
│   │   │   ├── logger.module.ts
│   │   │   └── logger-di-tokens.ts
│   │   ├── message/                            # SQS client initialization & module
│   │   │   ├── message.module.ts
│   │   │   └── message.di-tokens.ts
│   │   └── routes/                             # Route constants
│   │       └── app.routes.ts
│   └── lib/
│       ├── application/
│       │   └── use-case.base.ts                # Abstract UseCase<Input, Output>
│       ├── controllers/
│       │   └── generic.response.dto.ts         # Shared SuccessResponseDto
│       ├── domain/
│       │   ├── command.base.ts                 # Abstract Command base class
│       │   ├── query.base.ts                   # Abstract Query base class
│       │   ├── message.base.ts                 # Abstract Message base class
│       │   └── logger.port.ts                  # LoggerPort interface
│       └── interface/
│           └── sqs.producer.base.ts            # SQS producer base (sendMessage)
│
└── app/                                        # Product domain module
    ├── app.module.ts                           # NestJS module (DI wiring)
    ├── app.controller.ts                       # Health check controller
    ├── di.tokens.ts                            # DI tokens for port → adapter bindings
    │
    ├── domain/                                 # Domain layer (pure business logic)
    │   ├── entities/
    │   │   └── product.ts                      # Product entity
    │   ├── ports/
    │   │   ├── product.repository.port.ts      # Read operations port
    │   │   └── product.producer.port.ts        # Write operations port
    │   ├── commands/
    │   │   ├── create-product.command.ts
    │   │   ├── update-product.command.ts
    │   │   └── remove-product.command.ts
    │   └── queries/
    │       ├── find-product-by-id.query.ts
    │       └── find-all-products.query.ts
    │
    ├── application/                            # Application layer (use cases)
    │   ├── commands/
    │   │   ├── product-creator.ts              # Dispatches create to SQS
    │   │   ├── product-updater.ts              # Dispatches update to SQS
    │   │   └── product-remover.ts              # Dispatches remove to SQS
    │   └── queries/
    │       ├── product-by-id-finder.ts         # Fetches single product
    │       └── products-finder.ts              # Fetches product list
    │
    ├── infrastructure/                         # Infrastructure layer (adapters)
    │   ├── repository/
    │   │   └── http-client/                    # HTTP adapter for ProductRepositoryPort
    │   │       ├── product.http-client.adapter.ts
    │   │       ├── mapper/
    │   │       │   └── product.http-client.mapper.ts
    │   │       └── dto/
    │   │           ├── find-product-by-id.response.ts
    │   │           └── find-all-products.response.ts
    │   └── producer/
    │       └── sqs/                            # SQS adapter for ProductProducerPort
    │           ├── product.sqs.adapter.ts
    │           ├── mapper/
    │           │   └── product.sqs.mapper.ts
    │           └── dto/
    │               ├── create-product.message.ts
    │               ├── update-product.message.ts
    │               └── remove-product.message.ts
    │
    └── interface/                              # Interface layer (entry points)
        └── controllers/
            ├── create-product/
            │   ├── create-product.http.controller.ts
            │   ├── dto/
            │   │   └── create-product.request.dto.ts
            │   └── mapper/
            │       └── create-product.mapper.ts
            ├── update-product/
            │   ├── update-product.http.controller.ts
            │   ├── dto/
            │   │   ├── update-product.request.dto.ts
            │   │   └── update-product.params.dto.ts
            │   └── mapper/
            │       └── update-product.mapper.ts
            ├── delete-product/
            │   ├── delete-product.http.controller.ts
            │   ├── dto/
            │   │   └── delete-product.params.dto.ts
            │   └── mapper/
            │       └── delete-product.mapper.ts
            ├── find-product-by-id/
            │   ├── find-product-by-id.http.controller.ts
            │   ├── dto/
            │   │   ├── find-product-by-id.params.dto.ts
            │   │   └── product.response.dto.ts
            │   └── mapper/
            │       └── find-product-by-id.mapper.ts
            └── find-all-products/
                ├── find-all-products.http.controller.ts
                ├── dto/
                │   ├── find-all-product.query-params.dto.ts
                │   └── products.response.dto.ts
                └── mapper/
                    └── find-all-products.mapper.ts
```

---

## Testing

The project uses **Jest** as the testing framework with **ts-jest** for TypeScript support.

```bash
# Run unit tests
npm run test

# Run unit tests in watch mode
npm run test:watch

# Run tests with coverage report
npm run test:cov

# Run end-to-end tests
npm run test:e2e

# Run tests in debug mode
npm run test:debug
```

### Testing Strategy

| Type | Location | Pattern | Description |
|---|---|---|---|
| Unit tests | `src/` | `*.spec.ts` | Test individual classes (use cases, mappers, adapters) in isolation |
| E2E tests | `test/` | `*.e2e-spec.ts` | Test full HTTP request/response cycles using `supertest` |

Coverage reports are generated in the `coverage/` directory.

---

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/my-feature`)
3. Commit your changes (`git commit -m 'Add my feature'`)
4. Push to the branch (`git push origin feature/my-feature`)
5. Open a Pull Request

Please ensure:
- All existing tests pass (`npm run test`)
- New features include appropriate unit tests
- Code follows the project's linting rules (`npm run lint`)
- Code is formatted (`npm run format`)

---

## License

This project is **UNLICENSED** — private and not open source.
