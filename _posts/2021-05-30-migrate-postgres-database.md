---
title: Migrate Postgres database
description: tqt/pg-migrate - migrate Postgres database with SQL scripts
author: Thinh Tran
date: 2021-05-30 06:26:00 +0700
categories: [Tutorials]
tags: [postgres, nodejs]
image: assets/img/postgresql-love-nodejs.png
---

![Image](/assets/img/postgresql-love-nodejs.png)

I've been working with SQL Server for years before moving to MongoDB. I loved Mongo for its simplicity but still wanted SQL so badly. People like SQL so much and even uses them in cloud services such as AWS Athena and Google Big Query. Then I decided to change to Postgres. I fell in love with it at first sight and want to work with it in the long term.

One thing we all need when working with databases is managing schema. ORM (Object-Relational Mapping) tools do it so well with up/down features. We write code in some specific languages (C#, Javascript) and those tools to execute those scripts to update the database. I just want a simple tool having the similar feature but for SQL scripts so I've written one by myself as an npm package: `@tqt/pg-migrate`.

pg-migrate is a tool which manages databases' schema & data with SQL scripts.

### 1. Use pg-migrate as a global command

```bash
npm install -g @tqt/pg-migrate
```

You need to have a migration folder structured as below. You can name it whatever you want however its 2 sub-folders `up` and `down` are required. Put your main scripts in the `up` folder and name them in the alphabetical order (the order you want it to run). In case you want to downgrade, you need to place their counterparts in the `down` folder with the same name.

```bash
- migration-folder
  - up
    - 001-add-sample-1.sql
    - 002-add-sample-2.sql
    - 003-add-sample-3.sql
  - down
    - 001-add-sample-1.sql
    - 002-add-sample-2.sql
    - 003-add-sample-3.sql
```

Then run the script with the `up` command

```bash
pg-migrate up --migration-folder your-migration-folder --host host-name --database database-name --port port --user user-name --password password
```

For example

```bash
pg-migrate up --migration-folder ./db-migration --host localhost --database sample --port 5432 --user postgres --password postgres
```

After the command executes, a table named `migration` is created in your current database with all executed scripts.

| id  | version          |     createdAt |
| :-- | :--------------- | ------------: |
| 0   | 001-add-sample-1 | 1622278220790 |
| 1   | 002-add-sample-2 | 1622279735989 |
| 2   | 003-add-sample-3 | 1622279766950 |

In case you want to migrate to a specific version but not the latest one, run

```bash
pg-migrate up 002-add-sample-2 --migration-folder ./db-migration --host localhost --database sample --port 5432 --user postgres --password postgres
```

To downgrade to a specific version, run the script with the `down` command

```bash
pg-migrate down 002-add-sample-2 --migration-folder ./db-migration --host localhost --database sample --port 5432 --user postgres --password postgres
```

Instead of using parameters, you can use environment variables. You also may use a connection string. Here is the list of all parameters:

| param              | alternative environment variable | sample                                                           |
| :----------------- | :------------------------------- | :--------------------------------------------------------------- |
| --migration-folder | POSTGRES_MIGRATION_FOLDER        | ./db-migration                                                   |
| --host             | POSTGRES_HOST                    | localhost                                                        |
| --port             | POSTGRES_PORT                    | 5432                                                             |
| --database         | POSTGRES_DATABASE                | postgres                                                         |
| --user             | POSTGRES_USER                    | user                                                             |
| --password         | POSTGRES_PASSWORD                | password                                                         |
| --ssl              | POSTGRES_SSL                     | true                                                             |
| --connectionString | POSTGRES_CONNECTION_STRING       | postgresql://dbuser:secretpassword@database.server.com:3211/mydb |

### 2. Use pg-migrate as a local command

Install the package as a dep dependency in your project

```bash
npm install --save-dev @tqt/pg-migrate
```

or using yarn

```bash
yarn add -D @tqt/pg-migrate
```

Then run

```bash
npx pg-migrate up --migration-folder your-migration-folder --host host-name --database database-name --port port --user user-name --password password
```

### 3: Run it in your code

Install the package as a dep dependency in your project

```bash
npm install --save-dev @tqt/pg-migrate
```

or using yarn

```bash
yarn add -D @tqt/pg-migrate
```

Then import and run it in your code

```typescript
import { migrate } from "@tqt/pg-migrate";

migrate({
  migrationFolder: "./db-migration",
  mode: "up",
  poolConfig: {
    host: "host",
    database: "database",
    port: 5432,
    user: "user",
    password: "password",
    ssl: true,
  },
});
```
