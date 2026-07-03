# Authentication Testing


## Registration Tests


### Valid Registration

Expected:

- User created
- Password hashed
- User stored in PostgreSQL

Status:

PASSED


---

### Duplicate Email Test

Expected:

Existing email rejected.

Status:

PASSED


---

### Password Security Test

Input:

12345678


Database Value:

bcrypt hash


Status:

PASSED