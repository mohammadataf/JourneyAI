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





# Sprint 14 Authentication Tests


## Register User

POST

/api/v1/auth/register

Expected:

201 Created


## Duplicate Registration

Expected:

409 Conflict


## Login Valid Credentials

Expected:

200 OK


## Login Wrong Credentials

Expected:

401 Unauthorized


## Current User

GET

/api/v1/auth/me


With JWT:

200 OK


Without JWT:

401 Unauthorized


Security Checks:

- Password never returned
- JWT required for protected routes
- Invalid tokens rejected






# Sprint 15 Authentication Testing


## Login

Expected:

- Access token generated
- Refresh token generated
- Refresh token saved in database


## Refresh Token

Input:

Valid refresh token


Expected:

200 OK

New access token generated



Invalid token:

Expected:

401 Unauthorized



## Logout

Expected:

- Refresh token deleted
- Same token cannot be reused


Security checks:

Passed:

✓ Access token expiry added
✓ Refresh tokens stored
✓ Database session validation
✓ Logout invalidates sessions


# Sprint 16 Frontend Tests


Completed checks:

✓ React development server starts

✓ Production build passes

✓ Tailwind styles load correctly

✓ Routes working:

/
/login
/register
/dashboard


✓ Axios instance configured

✓ Environment variables loaded

# Sprint 17 Frontend Authentication Tests


Register:

✓ User can create account

✓ User stored in database


Login:

✓ Correct credentials work

✓ Wrong credentials fail

✓ Tokens stored


Protected Route:

✓ Dashboard blocked without login

✓ Dashboard works with token


Axios:

✓ JWT automatically attached


Logout:

✓ Backend logout called

✓ Refresh token deleted

✓ Local storage cleared

✓ Dashboard blocked after logout

# Sprint 17 Frontend Testing


Authentication:

✓ Register connected to backend

✓ Login connected to backend

✓ JWT tokens stored

✓ Protected dashboard works

✓ Axios attaches JWT automatically

✓ Logout clears server session


UI:

✓ Auth pages responsive

✓ Dashboard matches JourneyAI vision

✓ Production build successful
## Sprint 18 Testing

Journey Creation API

✓ Valid request

✓ Invalid JWT

✓ Missing JWT

✓ Empty origin

✓ Invalid journey type

✓ Database verification

Status:
PASS
## Sprint 19 Testing

Journey List API

✓ User with journeys

✓ User with no journeys

✓ Missing JWT

✓ Invalid JWT

Status:
PASS