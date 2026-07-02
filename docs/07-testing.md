# Testing

# Current Testing Tool

Thunder Client (VS Code)

---

# Tested Endpoint

POST

/api/v1/auth/register

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

## Expected Response

```json
{
    "success": true,
    "message": "Registration service executed successfully."
}
```

---

# Test Results

Status Code

200 OK

Result

Authentication request successfully reaches:

Route

↓

Controller

↓

Service

↓

Response

---

# Future Test Cases

Authentication

- Register User
- Login User

Validation

- Missing Name
- Missing Email
- Invalid Email
- Weak Password

Security

- SQL Injection
- XSS
- JWT Authentication

## Validation Tests

### Valid Request

Status: ✅ Passed

### Invalid Email

Status: ✅ Passed

### Short Password

Status: ✅ Passed

### Missing Name

Status: ✅ Passed

## Validation Tests

| Test Case | Status |
|------------|--------|
| Valid Request | ✅ Passed |
| Invalid Email | ✅ Passed |
| Short Password | ✅ Passed |
| Empty Name | ✅ Passed |