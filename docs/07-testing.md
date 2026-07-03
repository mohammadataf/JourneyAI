# Testing

# Testing Tool

Thunder Client (VS Code)

---

# Tested Endpoint

POST

/api/v1/auth/register

---

# Test Cases

## Valid Registration

Request

```json
{
    "name": "John Doe",
    "email": "john@gmail.com",
    "password": "12345678"
}
```

Expected Result

- Status 200
- Registration successful

Status

✅ Passed

---

## Invalid Email

Request

```json
{
    "name": "John Doe",
    "email": "abc",
    "password": "12345678"
}
```

Expected Result

- Status 400
- Email validation error

Status

✅ Passed

---

## Short Password

Request

```json
{
    "name": "John Doe",
    "email": "john@gmail.com",
    "password": "123"
}
```

Expected Result

- Status 400
- Password validation error

Status

✅ Passed

---

## Empty Name

Request

```json
{
    "name": "",
    "email": "john@gmail.com",
    "password": "12345678"
}
```

Expected Result

- Status 400
- Name validation error

Status

✅ Passed

---

## Duplicate Email

Request

```json
{
    "name": "Mohammad Ataf",
    "email": "ataf@gmail.com",
    "password": "12345678"
}
```

Expected Result

- Duplicate email detected

Status

✅ Passed

---



## Tested Features

### Database Connection

Status

✅ Passed

---

### Prisma Client Generation

Status

✅ Passed

---

### Migration

Status

✅ Passed

---

### Duplicate Email Query

Status

✅ Passed

---

## Environment

Database

Neon PostgreSQL

ORM

Prisma ORM

Backend

Express + TypeScript

# Current Testing Coverage

Completed

- Route Testing
- Controller Testing
- Service Testing
- Validation Testing
- Duplicate Email Testing

Upcoming

- Prisma Integration Tests
- Password Hashing Tests
- JWT Tests
- Login Tests
- Authorization Tests