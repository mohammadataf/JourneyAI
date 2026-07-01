# System Architecture

# Overview

JourneyAI follows a layered backend architecture.

Each layer has a single responsibility, making the application easier to maintain, test, and scale.

---

# Current Architecture

Client
    ↓
Express Application
    ↓
Routes
    ↓
Controllers
    ↓
Services
    ↓
Response

---

# Layer Responsibilities

## Express Application

Responsible for:

- Starting the server
- Loading global middleware
- Registering application routes

Files:

- src/app.ts
- src/server.ts

---

## Routes

Routes define API endpoints.

Their only responsibility is mapping an HTTP request to the appropriate controller.

Example:

POST /api/v1/auth/register

↓

registerUser()

Routes should never contain business logic.

---

## Controllers

Controllers handle HTTP communication.

Responsibilities:

- Receive Request
- Read Request Body
- Call Services
- Return HTTP Response

Controllers should remain small.

Business logic should not be written here.

---

## Services

Services contain business logic.

Examples:

- Register User
- Login User
- Validate Credentials
- Generate Tokens

Currently the authentication service returns a sample response.

Future responsibilities include:

- Validation
- Password Hashing
- JWT Generation
- User Creation

---

# Current Authentication Flow

Thunder Client

↓

POST /api/v1/auth/register

↓

Auth Route

↓

Auth Controller

↓

Auth Service

↓

JSON Response

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

JourneyAI follows:

- Separation of Concerns
- Layered Architecture
- Feature-based Folder Structure
- Small Controllers
- Business Logic inside Services

---

# Current Status

Completed

- Express Backend
- TypeScript Configuration
- Authentication Route
- Authentication Controller
- Authentication Service

Upcoming

- Validation
- Database Layer
- Repository Pattern
- JWT Authentication
- Authorization Middleware