# JourneyAI API Design


## Overview

JourneyAI exposes REST APIs using Express.js.

All APIs follow:

- JSON request format
- JSON response format
- Versioned routes


---

# Base URL


Development:


http://localhost:5000/api/v1



---

# Authentication APIs



# Register User


Endpoint:


POST /auth/register


---

## Purpose


Create a new user account.


---

## Request Body


```json
{
    "name":"John Doe",
    "email":"john@gmail.com",
    "password":"12345678"
}
```


---

## Processing Flow


Request

↓

Zod Validation

↓

Check Duplicate Email

↓

Hash Password

↓

Save User

↓

Return Response



---

## Success Response


```json
{
    "success":true,
    "message":"User registered successfully",
    "data":{
        "id":"user_id",
        "name":"John Doe",
        "email":"john@gmail.com"
    }
}
```


---

## Validation Error


```json
{
    "success":false,
    "message":"Validation failed"
}
```


---

## Duplicate Email


```json
{
    "success":false,
    "message":"Email already exists"
}
```



---


# Login User


Endpoint:


POST /auth/login


---

## Purpose


Authenticate user and issue JWT token.


---

## Request Body


```json
{
    "email":"john@gmail.com",
    "password":"12345678"
}
```


---

## Processing Flow


Request

↓

Validation

↓

Find User

↓

bcrypt.compare()

↓

Generate JWT

↓

Return Token



---

## Success Response


```json
{
    "success":true,
    "message":"Login successful",
    "token":"jwt_token",
    "data":{
        "id":"user_id",
        "name":"John",
        "email":"john@gmail.com"
    }
}
```


---

## Failed Login


```json
{
    "success":false,
    "message":"Invalid email or password"
}
```


---

# Authentication Header


Protected routes use:


Authorization:


Bearer jwt_token



---

# Security Rules


- Never return passwords
- Validate all input
- Hash passwords before storage
- Use JWT for authentication
# GET /api/v1/auth/me


## Purpose


Test authenticated user access.


Requires valid JWT token.


---

## Headers


Authorization:


Bearer <jwt_token>


---

## Success Response


```json
{
    "success": true,
    "message": "Protected route accessed",
    "user": {
        "id": "user_id"
    }
}
```


---

## Missing Token


```json
{
    "success": false,
    "message": "Authentication token missing"
}
```


---

## Invalid Token


```json
{
    "success": false,
    "message": "Invalid or expired token"
}
```


---

## Security


Only requests containing valid JWT tokens can access protected routes.




# GET /api/v1/auth/me


## Purpose

Fetch currently authenticated user profile.


Requires:

Valid JWT access token.


---

## Header


Authorization:

Bearer <jwt_token>


---

## Processing Flow


Request

↓

Authentication Middleware

↓

Verify JWT

↓

Extract User ID

↓

Fetch User From Database

↓

Return User Profile



---

## Success Response


```json
{
    "success": true,
    "message": "User fetched successfully",
    "data": {
        "id": "user_id",
        "name": "John Doe",
        "email": "john@gmail.com",
        "createdAt": "date"
    }
}
```


---

## Security


Returned:

- id
- name
- email


Never returned:

- password
```



# Authentication Error Responses

JourneyAI uses centralized error handling.

All API failures follow a consistent response format.

Example:

{
  "success": false,
  "message": "Error message"
}


## Auth Error Codes

| Scenario | Status Code |
|---|---|
| Duplicate email registration | 409 Conflict |
| Invalid login credentials | 401 Unauthorized |
| Missing JWT token | 401 Unauthorized |
| Invalid JWT token | 401 Unauthorized |
| Server error | 500 Internal Server Error |


## Protected Route Flow

Client
↓
Authorization Header
↓
JWT Middleware
↓
Verify Token
↓
Attach user id to request
↓
Controller
↓
Service
↓
Response




# Authentication APIs


## Register

POST

/api/v1/auth/register


Creates a new user account.


Response:

201 Created



## Login

POST

/api/v1/auth/login


Returns:

- accessToken
- refreshToken


Access Token:

Short lived token used for API authorization.


Refresh Token:

Long lived token used for creating new access tokens.



## Current User

GET

/api/v1/auth/me


Headers:

Authorization: Bearer accessToken


Returns logged in user.



## Refresh Token

POST

/api/v1/auth/refresh


Body:

{
 "refreshToken":"token"
}


Returns:

New accessToken



## Logout

POST

/api/v1/auth/logout


Deletes refresh token from database.

Invalidates user session.

# Frontend Authentication Flow

Authentication flow:

Register Page
↓
Auth API Layer
↓
Backend Register Endpoint
↓
Database


Login:

User credentials
↓
Backend verification
↓
Access Token + Refresh Token
↓
Frontend storage


Protected Requests:

Axios Interceptor
↓
Authorization Header
↓
JWT Middleware


Logout:

Frontend Logout
↓
Backend Session Delete
↓
Clear Tokens


# Frontend Authentication Flow

JourneyAI frontend authentication:

Register:
React Form
↓
Auth API Layer
↓
Backend
↓
Database


Login:
Credentials
↓
JWT Access Token
Refresh Token
↓
Frontend Session


Authenticated Requests:
Axios Interceptor
↓
Bearer Token
↓
Backend JWT Middleware


Logout:
Frontend Logout
↓
Backend Refresh Token Removal
↓
Session Destroyed