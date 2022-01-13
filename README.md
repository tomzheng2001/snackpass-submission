![Image of Snackpass](https://www.snackpass.co/static/media/logo_round_2.d74f1dd2.png)

# Snackpass Full Stack Code Challenge

Welcome to the Snackpass Challenge! We really appreciate your time to participate. 

## The Challenge

Assume the customers around a campus order 5000 orders a day from 50 local restaurants. Each order contains one or multiple products. For eg, `2 burritos, a soda, and a side of chips`.

1. Design a full stack application which returns an infinite-scrolling list of trending products to the user.
2. A product can be qualified as trending if it is purchased at least once in last 48 hours
3. Each product should be displayed with two tags:
    * a recent purchase tag: `5 purchased recently`
    * a time tag `ordered 3 min ago`
4. **Use a heuristic to determine which trending products gets returned higher. Base heuristic on both recency and number of recent purchases.**

## Requirements

1. Implement a Full-Stack solution including web server, backend persistence and associated code.
2. Please submit with in 72 hours from the time you accept invitation. (If circumstances don't allow for this, please let us know early!)
3. You can use pseudocode for parts of web application. For instance, you could replace a function body with "assume this service has the following API."

## Practices

### Quality of code 

Please use best practices for writing code and publish to this repo. 

### Q & A

- Please create an issue and tag `@shrimuthu`, `@aduca98`, `@nprbst` and `@seankwalker` for any questions.
- **When you are ready to submit, please create an issue and tag `@BiancaVGreen`, `@shrimuthu`, and `@nprbst`.**

### Data

For sample data, you may use [Sample Orders](https://docs.google.com/spreadsheets/d/1xfAjSlBflehOYj4O7I2YkfcBB1b9VgSHg9X-SmRWmsE/edit#gid=280279953), or generate your own.

> Note: Remember to insert your own random timestamps to fit within 48 hours window.
 
## Solution

Please be sure to provide an explaination of:

1. How you solved the problem
2. How to setup 
3. How to run it

You may be as verbose as you would like when providing details on approach, setup etc.

1. I used a React frontend with a NodeJS backend and MySQL as the database. For the DB setup, I created 4 tables: restaurants, items, orders, and orderItems.
Since I originally planned out more features but didn't have time to finish them due to other commitments some of the tables are not utilized.  To display the 
items, I simply pulled the rows from the items table and displayed them.  To get the recently purchased, I used a SQL query to get the sum(quantity) on all items
that matched the appropriate item id and a cross join with the order table to make sure they were within the past 48 hours.  The heuristic I used to sort items was
first sorting by the most purchased within the last 24 hours and then breaking ties by the most recently purchased. I also added a feature to allow adding items
directly from the UI and uploading image although it is a bit buggy but should be fine for an MVP.  If I had more free time to work on it, I would probably finish up the 
add items feature and the purchase items feature as well as allow sorting by restaurant, which currently doesn't work although the dropdown appears on the frontend. 

2/3. run npm install in both the client and server folders and add all the necessary environment variables (mysql details and backend server url).  The test data I used
are included in the "tables folder" and they can be imported into MySQL. I wrote all the create table sql statements in the connection.js file so it should automatically
create upon starting the server.
