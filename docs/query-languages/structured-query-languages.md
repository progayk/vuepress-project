---
title: 'Structured Query Languages'
sidebarDepth: 3
---

# Structured Query Languages

Every digital information need a space to be stored: Databases. There are different databases, the most common in **Relational Databases**. Common convention for retrievi ng stored and manipulating data is to use a Query Language. There are different types of query languages for different use cases. Most common one is SQL (Structured Query Languages) also NoSQL(Not Structured Query Languages) are in demand recently. 


## Credits

The link of this tutorial is [on here](https://www.khanacademy.org/computing/computer-programming/sql/).


## Content

[[toc]]

## SQL

In this tutorial we will use **SQLite**. It's a lightweight query language that can be used for small size databases. 

## Installing SQLite

First of all you need to install [SQLite](https://www.sqlite.org). 

```bash
$ sudo apt-get install sqlite3 libsqlite3-dev
```

Then open a terminal on your computer and create a sqlite file with `.db` extension. 

```bash
$ touch mydatabase.db
```

Then run the sqlite on the terminal:

```bash
$ sqlite3 mydatabase.db
```

You will see something like:

```bash
SQLite version 3.22.0 2018-01-22 18:45:57
Enter ".help" for usage hints.
sqlite>
```

## Creating Table

Let's create a table in the database. We will use a special command. In SQLite there are some reserved words that we can not use for column and row names. I will create a table that will contain information of a grocery list.

```bash
sqlite> CREATE TABLE groceries (id INTEGER PRIMARY KEY, name TEXT, quantity INTEGER);
```

The common practice is to write sql commands in upper-case. It's useful when debugging and udnerstanding the overall structure easily.

::: tip 
You have to end each statement with semicolon (`;`). This is how SQLite understans that your statement ends. 
:::

For each table in a database we need to add an extra column `id INTEGER PRIMARY KEY` for **unique identifier**. This is needed to query the database, because the other columns are subject to change so it's not useful to use them for querying. Here we have `id`, `name` and `quantity` as column names. We define their **type** to inform the database what kind of information will be stored. It's neccessary beacuse the database can handle efficiently values and memory based on types. On the table above we defined `id` as `INTEGER`; `name` as `TEXT`; `quantity` as `INTEGER`. 

## Inserting Data

We will insert some data into `groceries` table we created above.

```bash
INSERT INTO groceries VALUES (1, "apple", 4);
```

In the statement above, we tell SQLite to insert given values into `groceries` table.