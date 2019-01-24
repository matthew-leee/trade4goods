# Product API

## POST

- upload product

    *POST: /api/product/*

request params
```
{
    name: string
    image: bytea (base64 encoded image)
    description: string | null
    expectation: string | null
    trade_location: string | null
    tags: string[] | null
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

- upload product

    *PUT: /api/product/*

request params
```
{
    product_id: int
    name: string | null
    image: bytea (base64 encoded image) | null
    description: string | null
    expectation: string | null
    trade_location: string | null
    tags: string[] | null
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

## DELETE

- upload product

    *DELETE: /api/product/:id (provide product id in the param)*

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
    error: "Product not belongs to user",
    message: 'user (userID) does not own product (Product ID)'
}
```

---