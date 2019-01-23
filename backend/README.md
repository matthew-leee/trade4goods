# BACKEND NodeJS

## Setup

### create .env file with following parameters:
```
#database
DB_NAME=
DB_USERNAME=
DB_PASSWORD=

#URL
HOST=localhost
PORT=

#Cookie
COOKIE_SECRET=

#Jwt
JWT_SECRET=

#Oauth
FACEBOOK_ID=
GOOGLE_ID=

#Redis
REDIS_HOST=localhost
REDIS_PASSWORD=null
REDIS_PORT=6379

#Mail
MAIL_HOST=smtp.gmail.com
MAIL_PORT=587
MAIL_SECURITY=true
MAIL_USERNAME=
MAIL_PASSWORD=
```

### Install NPM Packages
```
npm install
```

### Start Postgres and Redis Service
```
on ubuntu:
    sudo service postgresql start
    redis-server --daemonize yes
on mac:
    brew services start postgresql
    redis-server --daemonize yes
```

### Run Knex Database Migration
```
knex migrate:latest
```

---

### Start the server

```
nodemon app.js
```
*or*
```
node app.js
```