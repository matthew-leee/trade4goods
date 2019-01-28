# api (in developement)

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