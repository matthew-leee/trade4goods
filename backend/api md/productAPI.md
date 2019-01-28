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

## GET

- product profile

    *GET: /api/product/:id*

response format

```
{
    product_id: int
    name: string
    image: bytea | null
    description: string | null
    trade_location: string | null
    expectation: string
    tags: string[]
    uploaded_by: int (user_id)
    uploaded_at: date
    liked_by: int[] (user_id[]) | null
    offered_by: int[] (product_id[]) | null
    comments: string | null
    sold_to: int (user_id) | null
    sold_at: date | null
    status: int (1: available, 2: under offered, 3: trading, 4: sold out)
}
```

----

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