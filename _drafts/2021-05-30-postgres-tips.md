---
title: Postgres Tips
author: Thinh Tran
date: 2021-05-30 14:03:00 +0700
categories: [Tutorials]
tags: [postgres]
---

I've wrote a npm package to make the migration easier. Basically, we use SQL script files to manage our database's schema & data, then use that package to execute those scripts in the database. I prefer using SQL files instead of using other ORM tools & libraries because I think it's much easier to manage Postgres with SQL commands than let ORM tools do some tricks.

### 1. Insert if not exist

Follow [this link](https://www.postgresql.org/docs/current/sql-insert.html#SQL-ON-CONFLICT)

```sql
INSERT INTO table1(col1, col2)
VALUES(1,2)
RETURNING id
ON CONFLICT DO NOTHING
```
