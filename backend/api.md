# api (in developement)


## GET

- product profile

    *GET: /api/product/:id*

response format

```
{
    product_id: int
    product_name: string
    product_image: bytea
    product_description: string
    trade_location: string
    expectation: string
    tags: string[]
    uploaded by: int (user_id)
    liked_by: int[]  (user_id[])
    offered_by: (user_id[])
    comments: string
    upload_date: date
    sold_date: date
    sold_to: int (user_id)
    status: string
}
```

----

## GET

- chat messages

    *GET: /api/chat/:chatid*

response format
```
{
    chat_id: int
    user_id_1: int
    user_id_2: int
    messages: Array<{
        message: string
        sent_by_user1: boolean
        timestamp: date
        del_by_1: boolean
        del_by_2: boolean
    }>
}
```


----

## POST

- Upload Product

    *POST: /api/product*

request params
```
{
    product_name: string
    product_image: bytea
    product_description: string | undefined
    trade_location: string | undefined
    expectation: string | undefined
    tags: string[]
}
```
----

## POST

- like product

    *POST: /api/like/:product_id

    the product id stands for the targeted product to like

----

## POST

- offer product

    *POST: /api/offer/:product_id

    the product id stands for the targeted product to offer

request params
```
{
    products_being_offered: int[] (product_id[])
}
```
----

## POST

- start chat

    *POST: /api/startchat/:userid*

    the user id stands for the targeted user to start chat with

---

## POST

- chat

    *POST: /api/chat/:userid*

    the user id stands for the targeted user to chat with

request params
```
{
    message: string
}
```

---