# System Architecture

# Overview

JourneyAI follows a layered backend architecture.

Each layer has a single responsibility, making the application modular, maintainable, scalable, and easy to test.

---

# Current Backend Architecture

Client
    ↓
Express Application
    ↓
Routes
    ↓
Controllers
    ↓
Validation (Zod)
    ↓
Services
    ↓
Response

---

# Layer Responsibilities

## Express Application

Responsible for:

- Starting the server
- Registering middleware
- Registering routes

Files

- src/app.ts
- src/server.ts

---

## Routes

Routes map incoming HTTP requests to controllers.

Responsibilities

- Define API endpoints
- Forward requests to controllers

Routes should never contain business logic.

---

## Controllers

Controllers handle HTTP communication.

Responsibilities

- Receive request
- Validate request
- Call service layer
- Return HTTP response

Controllers remain thin.

---

## Validation

Validation is implemented using Zod.

Responsibilities

- Validate incoming request data
- Prevent invalid data from reaching services
- Return HTTP 400 for invalid requests

---

## Services

Services contain business logic.

Responsibilities

- Process validated data
- Check duplicate users
- Handle business rules
- Prepare response

Services never use Express Request or Response objects.

---

# Authentication Request Flow

Client

↓

POST /api/v1/auth/register

↓

Route

↓

Controller

↓

Zod Validation

↓

Authentication Service

↓

JSON Response

---

# Current Business Rules

Implemented

- Name validation
- Email validation
- Password validation
- Duplicate email check (temporary in-memory storage)

Upcoming

- PostgreSQL
- Prisma ORM
- Password Hashing
- JWT Authentication
- Refresh Tokens
- Protected Routes

---

# Folder Structure

backend/

src/

config/

middlewares/

modules/

auth/

controllers/

routes/

services/

validators/

types/

shared/

app.ts

server.ts

---

# Design Principles

JourneyAI follows

- Separation of Concerns
- Layered Architecture
- Feature-based Folder Structure
- Thin Controllers
- Business Logic inside Services
- Validation before Service Execution