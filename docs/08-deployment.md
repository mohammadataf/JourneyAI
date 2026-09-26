# JourneyAI Deployment Documentation


## Overview

This document tracks deployment preparation and environment configuration.


---

# Backend Deployment Stack


Runtime:

Node.js


Framework:

Express


Language:

TypeScript


Database:

Neon PostgreSQL


ORM:

Prisma



---

# Environment Variables


Required variables:


PORT


DATABASE_URL


JWT_SECRET


JWT_EXPIRES_IN



Example:


PORT=5000

DATABASE_URL=postgresql://.....

JWT_SECRET=secret



---

# Security Rules


Never upload:

.env


Environment variables must be configured on hosting platforms.



---

# Database Deployment


Database Provider:

Neon PostgreSQL


Features:

- Cloud hosted
- SSL connection
- PostgreSQL compatible



---

# Build Process


Install dependencies:


npm install



Generate Prisma Client:


npx prisma generate



Run migrations:


npx prisma migrate deploy



Build TypeScript:


npm run build



Start:


npm start



---

# Future Deployment Targets


Frontend:

- Vercel


Backend:

- Render
- Railway
- AWS


Database:

- Neon


---

# Deployment Checklist


Completed:

- Environment configuration
- Cloud database
- Prisma setup


Pending:

- Backend hosting
- Frontend hosting
- CI/CD pipeline