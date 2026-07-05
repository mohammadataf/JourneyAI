# JourneyAI Development Guidelines


## Purpose

This document defines coding standards and development workflow.


---

# Branch Strategy


Main branch:

Stable production-ready code.


Feature branches:

Used for active development.


Example:


feature/authentication



---

# Git Workflow


Check status:


git status


---

Backend changes:


git add backend


git commit -m "feat(scope): message"


---

Documentation changes:


git add docs


git commit -m "docs: message"


---

Push:


git push origin branch-name



---

# Commit Message Convention


## Feature


feat(auth): add user registration


## Fix


fix(auth): resolve token issue


## Refactor


refactor(auth): improve service logic


## Documentation


docs: update API documentation



---

# Backend Guidelines


Architecture:

Routes

↓

Controllers

↓

Validators

↓

Services

↓

Database



---

# Controller Rules


Controllers should:

- Handle HTTP request
- Call services
- Return responses


Controllers should NOT:

- Write database queries
- Contain business logic


---

# Service Rules


Services contain:

- Business logic
- Prisma queries
- Security operations


---

# Validation Rules


All incoming data must be validated using Zod before reaching services.


---

# Security Rules


Never commit:

- .env
- Secrets
- Passwords
- API keys


Passwords:

Must always be hashed.


---

# Development Principles


- Write readable code
- Keep functions focused
- Test before commit
- Document important changes




# Error Handling Guidelines

JourneyAI follows centralized error handling.

Controllers should not contain try/catch blocks.

Correct:

Controller
- receives request
- calls service
- sends success response


Services:
- contain business logic
- throw AppError for failures


Example:

throw new AppError(
 "Invalid credentials",
 401
);


Async controllers must use:

asyncHandler()


Error flow:

Service Error
↓
asyncHandler
↓
Global Error Middleware
↓
HTTP Response