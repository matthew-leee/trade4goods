# BACKEND NodeJS

## Setup

### .env environmental variables
create .env file at rootDir with following parameters:
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
Run npm install to install packages
```
$ npm install
```

### Create HTTPS Certification
Create a localhost certificate
```
$ openssl req -x509 -out localhost.crt -keyout localhost.key \
  -newkey rsa:2048 -nodes -sha256 \
  -subj '/CN=localhost' -extensions EXT -config <( \
   printf "[dn]\nCN=localhost\n[req]\ndistinguished_name = dn\n[EXT]\nsubjectAltName=DNS:localhost\nkeyUsage=digitalSignature\nextendedKeyUsage=serverAuth")

```
Put localhost.crt and localhost.key in rootDir/cert

Self sign the localhost certifcate and trust it on your local computer with [the following procedure]

(https://blogs.technet.microsoft.com/sbs/2008/05/08/installing-a-self-signed-certificate-as-a-trusted-root-ca-in-windows-vista/)


### Run Knex Database Migration
```
$ knex migrate:rollback
$ knex migrate:latest
```

---

## Starting the Server

### Start Postgres and Redis Service
Start services before starting the server
```
$ sudo service postgresql start
$ redis-server --daemonize yes
```

### Boot Up the server

```
$ nodemon app.js
```
*or*
```
$ node app.js
```