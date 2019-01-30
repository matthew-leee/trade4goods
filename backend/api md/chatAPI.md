# Chat API

## POST

- create chatroom

    *POST: /api/chat/create/*

request params
```
{
    target_user_id: int (user_id)
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
}
```

---

## POST

- send new chat

    *POST: /api/chat/*

request params
```
{
    chat_id: int (chat_id)
    message: string
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
}
```

---

## GET

- get a list of chat according to user

    *GET: /api/chatlist/*


response format

*Success*

```
[{
    chat_id: int
    user_id1: int (user id)
    user_id2: int (user id)
    message: int[] (message id[])
}]
```

*Unauthorized*
```
status: 401 Unauthorized
```

---

## GET

- get chat messages according to chatroom

    *GET: /api/chat/:chat_id*

    *provide chat id in request params*

response format

*Success*

```
[{
    message_id: int
    sent_by_user1: boolean
    chat_message: string
    sent_at: timestamp
    del_by_user1: boolean
    del_by_user2: boolean
}]
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

- delete chat messages

    *DELETE: /api/chat?chat_id=id&message_id=id*

    *provide chat id and message id in request query*

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