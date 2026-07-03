# Database Design

## Database

PostgreSQL hosted on Neon

---

## ORM

Prisma ORM

---

# User Model

| Field | Type | Constraint |
|---|---|---|
| id | String | Primary Key (CUID) |
| name | String | Required |
| email | String | Unique |
| password | String | Required |
| createdAt | DateTime | Auto Generated |
| updatedAt | DateTime | Auto Updated |

---

# Current Database Flow

Client

↓

Controller

↓

Zod Validation

↓

Service

↓

Prisma Client

↓

PostgreSQL

---

# Implemented Queries

## Find Existing User

Used during registration:

findUnique(email)

Purpose:

Prevent duplicate accounts.

---

## Create User

Used during registration:

create()

Purpose:

Store new users permanently.

---

# Completed

- Database connection
- Migration
- User table
- Duplicate email lookup
- User creation

---

# Upcoming

- Password hashing
- Login queries
- Refresh token storage