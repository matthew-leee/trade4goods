# Profile API

## GET

- get user profile

    *GET: /api/profile/*

response format

*Success*

```
{
    user_id: int,
    displayed_name: string,
    phone_number: int,
    profile_picture: bytea (base64 encoded image) | null,
    uploaded_products: null | int[] (product_id),
    liked_products: null | int[] (product_id),
    trade_history: null | int[] (product_id),
    credibility: int,
    chat_basket: null | int[] (chat_id) 
}
```

*Unauthorized*
```
status: 401 Unauthorized
```

*Failure*

```
{
    error: "Unauthorized",
    message: "Unknown error, user has not been registered"
}
```

---

## GET

- get all users profile

    *GET: /api/allProfile/*

response format

*Success*

```
[{
    user_id: int,
    displayed_name: string,
    phone_number: int,
    profile_picture: bytea (base64 encoded image) | null,
    uploaded_products: null | int[] (product_id),
    liked_products: null | int[] (product_id),
    trade_history: null | int[] (product_id),
    credibility: int,
    chat_basket: null | int[] (chat_id) 
}]
```

*Failure*

```
{
    error: "Unauthorized",
    message: "Unknown error, user has not been registered"
}
```

---

## POST

- Create user profile

    *GET: /api/profile/*

request params

```
{
    displayed_name: string 
    phone_number: int
    profile_picutre: bytea (base64 encoded image) | null
}
```

response format

*Success*
```
status: 200 OK
```

*Unauthorized*
```
status: 401 Unauthorized
```

*Failure*
```
{
    error: string
    message: string
    suggestSolution: string | null
}
```

---

## PUT

- Update user profile

    *GET: /api/profile/*

request params

```
{
    displayed_name: string | null
    phone_number: int | null
    profile_picutre: bytea (base64 encoded image) | null
}
```

response format

*Success*
```
status: 200 OK
```

*Unauthorized*
```
status: 401 Unauthorized
```

*Failure*
```
{
    error: string
    message: string
    suggestSolution: string | null
}
```

---