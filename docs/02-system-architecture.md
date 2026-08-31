# System Architecture

## Backend Stack

- Runtime: Node.js
- Framework: Express.js
- Language: TypeScript
- Module System: CommonJS
- Package Manager: npm

---

## Backend Folder Structure

backend/
└── src/
    ├── config/
    ├── middlewares/
    ├── modules/
    │   └── auth/
    │       ├── controllers/
    │       ├── routes/
    │       ├── services/
    │       ├── repository/
    │       ├── validators/
    │       ├── dto/
    │       ├── interfaces/
    │       └── types/
    ├── shared/
    ├── app.ts
    └── server.ts

---

## Request Flow

Client
   ↓
Express App
   ↓
Router
   ↓
Controller
   ↓
Service
   ↓
Repository
   ↓
Database