# Database Design

## Database

- PostgreSQL (Neon)

## ORM

- Prisma ORM

---

## Current User Model

| Field | Type | Constraint |
|--------|------|------------|
| id | String | Primary Key |
| name | String | Required |
| email | String | Unique |
| password | String | Required |
| createdAt | DateTime | Auto Generated |
| updatedAt | DateTime | Auto Updated |

---

## Current Authentication Flow

Client

↓

Express

↓

Controller

↓

Validation (Zod)

↓

Authentication Service

↓

Prisma Client

↓

PostgreSQL (Neon)

---

## Current Features

- User Model
- Database Connection
- Duplicate Email Query

---

## Pending

- Create User
- Password Hashing
- Login
- JWT
- Refresh Tokens