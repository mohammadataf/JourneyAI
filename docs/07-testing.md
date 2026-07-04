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

# JWT Middleware Testing


## Test 1

Request:

GET /api/v1/auth/me


With:

Valid Bearer Token


Expected:

Access granted


Status:

PASSED



---

## Test 2

Request without token


Expected:

401 Unauthorized


Status:

PASSED



---

## Test 3

Invalid token


Expected:

Request rejected


Status:

PASSED




# Current User API Testing


Endpoint:

GET /api/v1/auth/me


---

## Test 1

Valid JWT Token


Expected:

- Token verified
- User fetched from database
- Profile returned


Status:

PASSED


---

## Test 2

Missing Token


Expected:

401 Unauthorized


Status:

PASSED


---

## Test 3

Invalid Token


Expected:

Request rejected


Status:

PASSED