# Hello, welcome to my Connect News App API

## Background
Connect news is news aggregator similar to reddit. It has articles which are divided into topics. Each article has user curated ratings and can be up or down voted using the API. Users can also add comments about an article. Comments can also be up or down voted. A user can add comments and remove any comments which they have added.
During the build process for this project, I learnt how to make use of Express, Postgres and Knex to create a functional API with multiple endpoints that can be seen here below:

—-
```http
GET /api/topics

GET /api/users/:username

DELETE /api/articles/:article_id
PATCH /api/articles/:article_id
GET /api/articles/:article_id

POST /api/articles/:article_id/comments
GET /api/articles/:article_id/comments

GET /api/articles
POST /api/articles

PATCH / api / comments /: comment_id 
DELETE / api / comments /: comment_id

GET /api
```
—-

### Routes will look like this
_**All endpoints send the below responses in an object, with a key name of what it is that being sent. E.g.**_

```json

{
  "topics": [
    {
      "description": "Code is love, code is life",
      "slug": "coding"
    },
    {
      "description": "FOOTIE!",
      "slug": "football"
    },
    {
      "description": "Hey good looking, what you got cooking?",
      "slug": "cooking"
    }
  ]
}

```
—-

## Road Map
The current API was designed to get to grips with using test and development data simultaneously while using express and knex to build end points and seed data, however I have plans to build more endpoints that will add a little more functionality to my api, the below endpoints are planned for the future.

```http
DELETE /api/articles/:article_id
POST /api/topics
POST /api/users
GET /api/users
```

## For developers

# Minimum version requirements
Node.js: v15.6.0
Postgres: v8.5.1

 # Install
You can Form my project from here and clone it on your local machine.

```http
git clone https://github.com/Nadia770/Connect-news
```
Install all dependencies using a package manager e.g:
```http
npm install
```
This project also requires you to create your own knexfile.js which should be set out like this for test and development databases.

```http
const ENV = process.env.NODE_ENV || 'development';

const baseConfig = {
  client: 'pg',
  migrations: {
    directory: './db/migrations',
  },
  seeds: {
    directory: './db/seeds',
  },
};

const customConfig = {
  development: {
    connection: {
      database: 'nc_news',
      username: '*YOUR PSQL USERNAME HERE*',
      password: '*YOUR PSQL PASSWORD HERE*',
    },
  },
  test: {
    connection: {
      database: 'nc_news_test',
      username: '*YOUR PSQL USERNAME HERE*',
      password: '*YOUR PSQL USERNAME HERE*',
    },
  },
};

module.exports = { ...customConfig[ENV], ...baseConfig };

```

# Seeding your Database
To seed the database simply run the seeding script already in the JSON scripts.
```http
npm run seed
```

# Running tests for each endpoint
The test already written are for each endpoint currently available, if you wish to add more tests for extended endpoints, you can do so by following the test suite available by supertest and jest. You can run the test with the following command:

```http
npm run test
```

Author
Nadia Amir
GitHub @Nadia770
