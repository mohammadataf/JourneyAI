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