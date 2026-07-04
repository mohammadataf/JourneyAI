# JourneyAI System Architecture


## Architecture Style

JourneyAI follows:

- Layered architecture
- Feature based folder structure
- Separation of concerns


---

# Backend Stack

Runtime:

Node.js


Framework:

Express.js


Language:

TypeScript


Database:

PostgreSQL (Neon)


ORM:

Prisma


Validation:

Zod


Authentication:

JWT


Password Security:

bcrypt


---

# Backend Request Flow


Client

↓

Express Server

↓

Routes

↓

Controllers

↓

Validation Layer

↓

Service Layer

↓

Database Layer

↓

Response



---

# Folder Structure


backend/

src/

config/

prisma.ts


modules/

auth/

controllers/

routes/

services/

validators/


utils/


app.ts

server.ts


---

# Layer Responsibilities


## Routes

Responsibilities:

- Define API endpoints
- Connect URLs with controllers


Routes contain no business logic.


---


## Controllers


Responsibilities:

- Handle Request
- Validate input
- Call services
- Return Response


---


## Validators


Technology:

Zod


Responsibilities:

- Validate incoming data
- Prevent invalid data reaching services


---


## Services


Responsibilities:

Business logic:

- Duplicate checking
- Password hashing
- Database operations
- Token generation


---


## Database Layer


Prisma handles:

- Queries
- Type safety
- Migrations


---

# Authentication Flow


Register:

User Data

↓

Validation

↓

Duplicate Email Check

↓

bcrypt Hash

↓

Save User


---


Login:

Credentials

↓

Find User

↓

bcrypt Compare

↓

Generate JWT

↓

Return Token


---

# JWT Flow


Client receives token

↓

Stores token

↓

Sends:

Authorization: Bearer token

↓

Backend verifies JWT

↓

Access granted


---

# Design Principles


- Thin controllers
- Reusable services
- Type safety
- Secure authentication
- Environment based configuration


# Protected Route Architecture


JourneyAI protects private APIs using JWT middleware.


## Flow


Client Request

↓

Authorization Header

↓

Authentication Middleware

↓

Extract JWT Token

↓

Verify Token Signature

↓

Attach User To Request

↓

Controller



---

## Middleware Responsibility


auth.middleware.ts


Handles:


- Reading Authorization header
- Extracting Bearer token
- Verifying JWT
- Adding authenticated user data to request


---

## Request Extension


Express Request object is extended:


req.user = {
    id: userId
}


This allows controllers to access authenticated user information.