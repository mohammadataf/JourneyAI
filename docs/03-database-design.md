# JourneyAI Database Design


## Overview

JourneyAI uses PostgreSQL as the primary relational database.

Database operations are handled using Prisma ORM.


---

# Database Technology

Database:

PostgreSQL (Neon Cloud)


ORM:

Prisma


Migration Tool:

Prisma Migrate


---

# Database Flow


Application

↓

Prisma Client

↓

Prisma Query Engine

↓

PostgreSQL Database



---

# Prisma Configuration


Schema Location:


backend/prisma/schema.prisma


Generated Client:


backend/src/generated/prisma


---

# User Model


Stores authentication related user information.


## Table: User


| Field | Type | Constraint |
|---|---|---|
| id | String | Primary Key |
| name | String | Required |
| email | String | Unique |
| password | String | Required |
| createdAt | DateTime | Auto generated |
| updatedAt | DateTime | Auto updated |


---

# User Schema


```prisma
model User {

  id String @id @default(cuid())

  name String

  email String @unique

  password String


  createdAt DateTime @default(now())

  updatedAt DateTime @updatedAt

}
```


---

# Field Details


## id

Unique identifier for each user.

Generated automatically using cuid.


Example:


cmr5g68480000b8uzr1wd5who


---


## Email


Rules:

- Must be unique
- Used for login
- Duplicate accounts prevented


Protection:

- Application level check
- Database unique constraint


---


## Password


Passwords are never stored directly.


Flow:


Plain Password

↓

bcrypt Hash

↓

Database Storage



Example:


Input:


12345678


Stored:


$2b$10$HD72jshd...



---

# Current Database Operations


## Find User


Used for:

- Duplicate email check
- Login


Prisma:


findUnique()



---


## Create User


Used during registration.


Prisma:


create()



---

# Migration History


Initial Migration:

Created:

- User table
- Unique email index
- Timestamp fields


---

# Current Tables


Implemented:

- User


Upcoming:

- RefreshToken
- SavedRoutes
- Trips
- Places
- UserPreferences


---

# Database Security


Implemented:

- Environment variables
- Password hashing
- Unique constraints


Planned:

- Refresh token rotation
- Session management



# User Profile Query


Used by:

GET /auth/me


Purpose:

Retrieve authenticated user details.


---

## Prisma Query


findUnique()


Selection:

- id
- name
- email
- createdAt


Sensitive fields excluded:

- password


---

# Security Principle


Only required database fields are selected.

Sensitive information is never exposed through APIs.



# Authentication Database Models


## User

Stores JourneyAI users.

Fields:

- id
- name
- email
- password
- createdAt
- updatedAt


## RefreshToken

Stores active user sessions.

Relationship:

User
1
|
*
RefreshToken


Fields:

- id
- token
- userId
- createdAt


Purpose:

Allows:
- multiple device sessions
- secure logout
- refresh token validation


Deleting a user removes refresh tokens automatically using cascade delete.
## Journey

Fields:

- id
- originName
- destinationName
- journeyType
- interests
- status
- userId
- createdAt
- updatedAt

Relationship:

User (1) -----> (Many) Journey