# POST /api/v1/auth/login

## Purpose

Authenticate an existing user.

---

## Request

```json
{
    "email": "user@gmail.com",
    "password": "12345678"
}
```

---

## Flow

Client

↓

Controller

↓

Zod Validation

↓

Auth Service

↓

Find User By Email

↓

bcrypt Password Compare

↓

Return Authentication Result


---

## Success Response

```json
{
    "success": true,
    "message": "Login successful",
    "data": {
        "id": "user_id",
        "name": "User",
        "email": "user@gmail.com"
    }
}
```

---

## Failure Response

```json
{
    "success": false,
    "message": "Invalid email or password"
}
```

---

## Security Notes

- Plain passwords are never compared manually.
- bcrypt.compare() verifies passwords.
- Same error response is used for invalid email/password to prevent user enumeration.