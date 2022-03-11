### Requirements

1. node >= 12
2. docker
3. vscode

### Setup for all use cases below

Make sure docker is running first

open up a terminal in vscode

```
1. git clone https://github.com/nanacnote/cmp-db.git
2. cd cmp-db
3. npm install
4. npm start
```

---

### 1. Using with knex to generate SQL queries

```
1. chmod +x ./**/*.js ***run this once to add permissions***
2. npm run queries [name of folder under ./queries]
3. npm run queries:force [name of folder under ./queries]  ***use this if 2 gives errors***
```

Use the example found at `./queries/formative` as a guide to summative

start the summative work with a boilerplate by running

```
npm add:dump summative
```

This will add the needed files to `./queries/summative` just like `./queries/formative` and you can start using knex.js

Once you have written your knex queries run

```
npm run queries summative
```

This will output your sql dump file to `./database/summative.sql`

Knex documentation

http://knexjs.org/

---

### 2. Using the PSQL command line client

```
npm run client
```

password: secret

This command will take you to the cli of your database which is set by default to `uea_cmp` you can then start adding tables and data or dump files. Checkout link below for docs

PSQL cheat sheet

https://postgrescheatsheet.com/

---

### 3. Using Adminer db manager

```
In browser go to:
http://localhost:8080
```

Use the following

system: PostgresSQL

server: postgres

username: postgres

password: secret

database: **_leave empty_**

---

### Stopping the database

```
1. npm stop
```

---

### Postgres credential

username: postgres

password: secret
