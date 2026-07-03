# POST /api/v1/auth/register


## Purpose

Create a new user account.


## Request

{
    "name":"John Doe",
    "email":"john@gmail.com",
    "password":"12345678"
}


## Processing Steps

1. Validate request data

2. Check duplicate email

3. Hash password using bcrypt

4. Store user in PostgreSQL


## Success Response


{
    "success":true,
    "message":"User registered successfully",
    "data":{
        "id":"user_id",
        "name":"John Doe",
        "email":"john@gmail.com"
    }
}


Security:

Password is never returned in API responses.