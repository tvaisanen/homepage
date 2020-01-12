---
path: "/blog/node-express-apollo-typescript-typeorm-part-1"
date: "2020-01-12"
title: "How to get started with Apollo QraphQL and TypeORM"
tags: ["typescript", "typeorm", "apollo", "graphql", "postgres"]
---

# How to get started with Apollo QraphQL and TypeORM

To follow up the steps in this post you should have: **node**, **typeorm** and **docker** installed before starting.

### First setup a initial TypeORM project.

Here's a little script for getting you started
In addition to the TypeORM dependencies we need **express-apollo-server** and **graphql**.

_init.sh_

```bash
#!/bin/bash
PROJECT_NAME=insert-project-name-here
DATABASE=postgres
typeorm init --name $PROJECT_NAME --db $DATABASE --express --docker
cd $PROJECT_NAME
npm install
npm install -S apollo-server-express graphql @types/graphql
```

---

After the dependencies have been installed we create folder
for apollo related code.

```bash
mkdir src/apollo
touch src/apollo/config.ts
touch src/apollo/server.ts
```

After this step the file structure of **src** should look like this.

```log
tree -L 2

├── apollo
│   ├── config.ts
│   └── server.ts
├── controller
│   └── UserController.ts
├── entity
│   └── User.ts
├── index.ts
├── migration
└── routes.ts
```

---

For the initial step lets use the first example from the [**apollo-server-express**](https://github.com/apollographql/apollo-server/tree/master/packages/apollo-server-express#express)
**src/apollo/config.ts**

```typescript
import { gql } from "apollo-server-express"

// Construct a schema, using GraphQL schema language
export const typeDefs = gql`
  type Query {
    hello: String
  }
`

// Provide resolver functions for your schema fields
export const resolvers = {
  Query: {
    hello: () => "Hello world!",
  },
}
```

---

And here we configure the apollo server that we'll use as the middleware for handling graphql queries.

**src/apollo/server.ts**

```typescript
import { ApolloServer } from "apollo-server-express"
import { typeDefs, resolvers } from "./config"

export const apolloServer = new ApolloServer({ typeDefs, resolvers })
```

The last step to get started with the server is to add two lines
to the **index.ts** to activate the **apolloServer** middleware.
**src/index.ts**

```typescript

...
// Import the apolloServer
import { apolloServer } from "./apollo/server"
...
// create express app
const app = express();
...
// setup express app here
apolloServer.applyMiddleware({ app });
...

```

Before running the **express** application we need to run
**docker-compose up** in the projects root folder to start
the Postgres database instance.

```log
npm start

> insert-project-name-here@0.0.1 start .../insert-project-name-here
> ts-node src/index.ts

Express server has started on port 3000. Open http://localhost:3000/users to see results

```

---

### Confirm that TypeORM is running

TypeORM's template creates an endpoint **localhost:3000/users** that we can use to test that the service is running correctly.

```log
http :3000/users

HTTP/1.1 200 OK
Connection: keep-alive
Content-Length: 119
Content-Type: application/json; charset=utf-8
Date: Sun, 12 Jan 2020 19:20:57 GMT
ETag: W/"77-57wsx/7U+T/s7WNYpnMwtpLxGvw"
X-Powered-By: Express

[
  {
    "age": 27,
    "firstName": "Timber",
    "id": 1,
    "lastName": "Saw"
  },
  {
    "age": 24,
    "firstName": "Phantom",
    "id": 2,
    "lastName": "Assassin"
  }
]
```

---

### Confirm that qraphql endpoint is listening

```log
➜  http POST :3000/graphql query={"query":"hello"}
HTTP/1.1 200 OK
Access-Control-Allow-Origin: *
Connection: keep-alive
Content-Length: 34
Content-Type: application/json; charset=utf-8
Date: Sun, 12 Jan 2020 19:40:02 GMT
ETag: W/"22-/c99o8DqoF5JwFIU/+5bN0rKBq8"
X-Powered-By: Express

{
    "data": {
        "query": "Hello world!"
    }
}

```

### You can also navigate to **localhost:3000/graphql** with a web browser to explore the GraphQL API.

---

And that's it. Express application setup with listeing Apollo server, typescript, typeorm and postgres setup with just a few lines of code.
