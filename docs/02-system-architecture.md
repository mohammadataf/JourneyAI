# Authentication Architecture

JourneyAI uses a layered authentication architecture.

## Flow

Client

↓

Express Route

↓

Controller

↓

Validation Layer (Zod)

↓

Service Layer

↓

Security Layer (bcrypt)

↓

Prisma ORM

↓

PostgreSQL Database


---

## Responsibilities


### Controller

Handles:

- HTTP request
- HTTP response
- Validation result


### Validator

Technology:

Zod

Responsibilities:

- Validate incoming user data
- Prevent invalid data from reaching services


### Service

Contains business logic:

- Duplicate email checking
- Password hashing
- User creation


### Database Layer

Technology:

Prisma ORM

Responsibilities:

- Database queries
- Type-safe communication with PostgreSQL