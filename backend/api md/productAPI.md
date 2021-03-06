# Product API

## POST

- upload product

    *POST: /api/product/*

request params
```
{
    name: string
    image: string[] | null
    description: string | null
    expectation: string | null
    trade_location: string | null
    tags: string[] | null
}
```

response format

*Success*

```
status: 201 Created
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
    image: string[]
    description: string | null
    trade_location: string | null
    expectation: string
    tags: string[]
    uploaded_by: int (user_id)
    uploaded_at: date
    liked_by: int[] (user_id[])
    offered_by: int[] (product_id[])
    comments: int (comments_id[])
    sold_to: int (user_id) | null
    sold_at: date | null
    status: int (1: available, 2: trading, 3: sold out)
}
```

----

## GET

- all products profile

    *GET: /api/allProducts/*

response format

```
[{
    product_id: int
    name: string
    image: string[]
    description: string | null
    trade_location: string | null
    expectation: string
    tags: string[]
    uploaded_by: int (user_id)
    uploaded_at: date
    liked_by: int[] (user_id[])
    offered_by: int[] (product_id[])
    comments: int (comments_id[])
    sold_to: int (user_id) | null
    sold_at: date | null
    status: int (1: available, 2: trading, 3: sold out)
}]
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
    image: string[] | null
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

## POST

- offer product

    *POST: /api/offer/product*

request params
```
{
    product_offered: int (product id being offered)
    product_offering: int (product id for offering)
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
}
```

---

## DELETE

- cancel offer product

    *DELETE: /api/offer/product?product_offered=int&product_offering=int*
    
    *provide both product id in query*

request params
```
{
    product_offered: int (product id being offered)
    product_offering: int (product id for offering)
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
}
```

---

## POST

- comment on product

    *POST: /api/comment/*

request params
```
{
    product_id: int (product id to comment on)
    comment: string
}
```

response format

*Success*

```
status: 201 CREATED
```

*Unauthorized*
```
status: 401 Unauthorized
```

*Failure*

```
{
    error: "Product not found",
    message: "product (product id) does not exists"
}
```

---

## GET

- get comments

    *GET: /api/comment/:id*

    *provide product id in params*


response format

*Success*

```
[{
    comment_id: int
    commentator: int (user_id)
    comment_in_product: int (product_id)
    comment: string
    comment_at: timestamp
}]
```


*Failure*

```
{
    error: "Product not found",
    message: "product (product id) does not exists"
}
```

---

## PUT

- edit comment on product

    *POST: /api/comment/*

request params
```
{
    comment_id: int
    comment: string
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
    statusCode: 403,
    error: "user (user_id) has no permission to delete comment (comment_id)"
}
```

---

## DELETE

- comment on product

    *DELETE: /api/comment/:id*

    *provide comment id in param*

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
    statusCode: 403,
    error: "user (user_id) has no permission to delete comment (comment_id)"
}
```

---

## PUT

- like and unlike product

    *PUT: /api/like/:id*

    *provide product id in param*

response format

*Success*

```
liked / unliked
```

*Unauthorized*
```
status: 401 Unauthorized
```

*Failure*

```
{
    error: "Product not found",
    message: "product (product_id) does not exists"
}
```

---

## POST

- accept product offer

    *POST: /api/acceptOffer/*

request params
```
{
    product_offered: int
    product_offering: int
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