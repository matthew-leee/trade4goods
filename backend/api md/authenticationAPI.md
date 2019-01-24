# Authentication API

## GET

- Check if user is logged in

    *GET: /api/isLoggedIn*

response format

*Success*
```
true / false
```
----

## POST

- Local Login

    *POST: /api/login*

request params

```
{
    username_or_email: string
    password: string
}
```

response format

*Succes*
```
status: 200 OK
```

*Failure*
```
{
    error: 'Incorrect Credential',
    message: 'username or password is not found',
}
```

----


## POST

- Facebook Login

    *POST: /api/facebook_login*

request params

```
{
    access_token: string
}
```


response format

*Succes*
```
status: 200 OK
```

*Failure*
```
{
    error: string
    message: string
    suggestionSolution: string
}
```


----

## POST

- Google Login

    *POST: /api/google_login*

request params

```
{
    access_token: string
    id_token: string
}
```

response format

*Succes*
```
status: 200 OK
```

*Failure*
```
{
    error: string
    message: string
    suggestionSolution: string
}
```


----

## POST

- Logout

    *POST: /api/logout*


response format

*Succes*
```
status: 200 OK
```

----

## POST

- Sign Up

    *POST: /api/signup*

request params

```
{
    username: string
    password: string
    confirmed_password: string
    email: string
}
```

response format

*Succes*
```
status: 201 Created
```

*Failure*
```
{
    error: string
    message: string
    suggestionSolution: string
}
```

----

## POST

- Verify Email

    *POST: /api/verifyEmail*

request params

```
{
    key: string (from uri params)
}
```

*Succes*
```
status: 200 OK
```

*Failure*
```
{
    error: 'Expired Key',
    message: 'The key has been expired or invalid'
}
```

----

## POST

- Forget Password

    *POST: /api/forgetPassword*

request params

```
{
    email: string
}
```

*Succes*
```
status: 202 Accepted
```

----

## POST

- Reset Password

    *POST: /api/resetPassword*

request params

```
{
    password: string
    confirmed_password: string
    key: string (from uri params)
}
```


response format

*Succes*
```
status: 200 OK
```

*Failure*
```
{
    error: string
    message: string
    suggestionSolution: string
}
```
----