---
title: Migrate Postgres database
author: Thinh Tran
date: 2021-05-30 06:26:00 +0700
categories: [Tutorials]
tags: [postgres, nodejs]
---

I've wrote a npm package to make the migration easier. Basically, we use SQL script files to manage our database's schema & data, then use that package to execute those scripts in the database. I prefer using SQL files instead of using other ORM tools & libraries because I think it's much easier to manage Postgres with SQL commands than let ORM tools do some tricks.

## How to use

### Options 1: run a global command

```bash
npm install -g @tqt/pg-migrate
```

You need to have a migration folder structured as below. You can name it whatever you want but its 2 sub-folders `up` and `down` are required. Put your main scripts in the `up` folder and name them in alphabetical order (the order you want it to run). In order to reverse those scripts in case you want to downgrade, put their counterparts in the `down` folder with the same name.

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

After it run, a table named `migration` is created in your current database with all scripts which are executed.

| id  | version            |     createdat |
| :-- | :----------------- | ------------: |
| 0   | "001-add-sample-1" | 1622278220790 |
| 1   | "002-add-sample-2" | 1622279735989 |
| 2   | "003-add-sample-3" | 1622279766950 |

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
| --port             | "003-add-sample-3"               | 5432                                                             |
| --database         | POSTGRES_DATABASE                | postgres                                                         |
| --user             | POSTGRES_USER                    | user                                                             |
| --password         | POSTGRES_PASSWORD                | password                                                         |
| --ssl              | POSTGRES_SSL                     | true                                                             |
| --connectionString | POSTGRES_CONNECTION_STRING       | postgresql://dbuser:secretpassword@database.server.com:3211/mydb |

### Options 2: run as a local command

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

### Options 3: run in your code

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
