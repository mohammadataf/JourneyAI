# JourneyAI Testing Documentation


## Testing Tools


API Testing:

Thunder Client


Database Testing:

Prisma Queries / Neon Dashboard



---

# Authentication Testing



# Register API


Endpoint:


POST /api/v1/auth/register



---

## Valid Registration


Input:


name

email

password


Expected:

- Validate request
- Hash password
- Store user


Status:

PASSED



---

## Invalid Email Test


Expected:

Validation error


Status:

PASSED



---

## Duplicate Email Test


Expected:

Existing user rejected


Status:

PASSED



---

# Login API


Endpoint:


POST /api/v1/auth/login



---

## Correct Credentials


Expected:

- Find user
- Compare password
- Generate JWT


Status:

PASSED



---

## Wrong Password


Expected:

Reject login


Status:

PASSED



---

# Database Tests


Completed:


- Prisma connection test
- User creation test
- User fetching test


Status:

PASSED



---

# Security Tests


Completed:


Password Hashing:

PASSED


JWT Generation:

PASSED



---

# Upcoming Tests


- JWT middleware tests
- Protected route tests
- Refresh token tests