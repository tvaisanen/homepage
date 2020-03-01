---
path: "/blog/node-express-apollo-typescript-typeorm-part-2"
slug: "node-express-apollo-typescript-typeorm-part-2"
date: "2020-01-14"
title: "How to connect Apollo query resolvers with TypeORM"
tags: ["typescript", "typeorm", "apollo", "graphql", "postgres"]
previous:
---

# How to get started with Apollo QraphQL and TypeORM

This is a second part of a short series of Apollo and TypeORM.
You can read the how to setup the project [here](/blog/node-express-apollo-typescript-typeorm-part-1)

So, by so far we have one Apollo query and TypeORM template defaults running on our server. Let's define a QraphQL type for the User that matches our TypeORM User.

```typescript
export const typeDefs = gql`
  type Query {
    hello: String
    getUsers: [User]
  }
  type User {
    id: Int
    firstName: String
    lastName: String
    age: Int
  }
`
```

npx apollo client:download-schema

```graphql
directive @cacheControl(
  maxAge: Int
  scope: CacheControlScope
) on FIELD_DEFINITION | OBJECT | INTERFACE
enum CacheControlScope {
  PUBLIC
  PRIVATE
}

type Query {
  hello: String
  getUser: User
  getUsers: [User]
}

scalar Upload

type User {
  id: Int
  firstName: String
  lastName: String
  age: Int
}
```

### Now we can retrieve the same dataset that we did in the last post

```log
➜  ~ http :3000/graphql query={"query":"getUsers {id, firstName, lastName, age} "}
HTTP/1.1 200 OK
Access-Control-Allow-Origin: *
Connection: keep-alive
Content-Length: 139
Content-Type: application/json; charset=utf-8
Date: Tue, 14 Jan 2020 17:07:21 GMT
ETag: W/"8b-Ccem/CUKqTll78h2Y3GH3DK8MYc"
X-Powered-By: Express

{
    "data": {
        "query": [
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
    }
}
```

# Lets re-create all the user endpoints created by the template

```typescript
export const resolvers = {
  Query: {
    hello: () => "Hello world!",
    getUsers: async (parent, args, arg1, query) => {
      return await getRepository(User).find()
    },
    getUser: async (parent, args: { id: number }, context, info) => {
      return await getRepository(User).findOne(args.id)
    },
  },
  Mutation: {
    createUser: async (
      parent,
      { user }: { user: Partial<User> },
      arg1,
      query
    ) => {
      const newUser = new User(user)
      return await getRepository(User).save(newUser)
    },
    removeUser: async (parent, args, arg1, query) => {
      const { affected } = await getRepository(User).delete(args.id)
      return { success: affected === 1 }
    },
  },
}
```
