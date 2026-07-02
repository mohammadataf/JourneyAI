# API Design

# Base URL

http://localhost:5000/api/v1

---

# Authentication Module

## POST /auth/register

### Description

Registers a new user.

Incoming requests are validated before reaching the service layer.

Duplicate email addresses are rejected.

(Currently duplicate checking uses an in-memory array. It will later be replaced by PostgreSQL.)

---

## Request

```json
{
    "name": "Mohammad Ataf",
    "email": "ataf@gmail.com",
    "password": "12345678"
}
```

---

## Successful Response

Status Code

200 OK

```json
{
    "success": true,
    "message": "Registration request processed successfully.",
    "data": {
        "name": "Mohammad Ataf",
        "email": "ataf@gmail.com"
    }
}
```

---

## Validation Error

Status Code

400 Bad Request

```json
{
    "success": false,
    "message": "Validation failed",
    "errors": {
        "email": [
            "Please enter a valid email address"
        ]
    }
}
```

---

## Duplicate Email

Status Code

200 OK (Temporary)

```json
{
    "success": false,
    "message": "Email already exists."
}
```

> Note:
> Later this response will use HTTP 409 Conflict.

---

# Current Validation Rules

Name

- Required
- Minimum 2 characters

Email

- Required
- Must be a valid email address

Password

- Required
- Minimum 8 characters

---

# Current Request Flow

Client

↓

Route

↓

Controller

↓

Validation

↓

Service

↓

Business Rules

↓

Response