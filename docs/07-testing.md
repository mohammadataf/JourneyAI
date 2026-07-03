# Testing

## Authentication Database Tests

Testing Tool:

Thunder Client

Database:

Neon PostgreSQL

---

## User Registration

Status:

PASSED

---

## Test Case 1

Create new user

Expected:

- User saved in PostgreSQL
- User data returned

Result:

PASSED

---

## Test Case 2

Register same email again

Expected:

- Duplicate email detected

Result:

PASSED

---

## Database Verification

Method:

Temporary Prisma query script

Result:

Users successfully retrieved from PostgreSQL.

PASSED