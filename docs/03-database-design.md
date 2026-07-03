# User Model

Database:

PostgreSQL (Neon)

ORM:

Prisma


## Fields

| Field | Type | Description |
|---|---|---|
| id | String | Unique user identifier |
| name | String | User name |
| email | String | Unique email |
| password | String | Hashed password |
| createdAt | DateTime | Account creation time |
| updatedAt | DateTime | Last update time |


---

# Password Storage

Passwords are never stored as plain text.

Process:

Plain Password

↓

bcrypt Hash

↓

Hashed Password Stored


Example:

Input:

password123

Stored:

$2b$10$............


---

# Completed

- User table
- Unique email constraint
- Password hashing
- User persistence