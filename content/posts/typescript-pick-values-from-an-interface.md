---
path: "/blog/typescript-pick-values-form-an-interface"
slug: "typescript-pick-values-form-an-interface"
date: "2019-12-28"
title: "Pick Values From an Interface or a Type"
tags: ["typescript", "javascript", "pick"]
---

# Use Pick Utility Type in Typescript to Select Specific Properties From an Interface or a Type

Use Typescripts utility Pick utility type to pick values from an interface or a type. This makes it simpler to reuse code and enables also IDE like features in VS code.

### Create Types

```typescript
/**
 * @description User password.
 * @example
 *  const username: UserName = "John";
 */
type UserName = string

/**
 * @description User Password.
 * @example
 *  const password: UserPassword = "userpassword";
 */
type UserPassword = string

/**
 * @description User Phone number
 * @example
 *  const number: UserPhoneNumber = 04001231234;
 */
type UserPhoneNumber = string

type User = {
  username: UserName
  password: UserPassword
  phone: UserPhoneNumber
}
```

### Create A User

Let's create two versions of a function that both require the user.

```typescript
const u: User = { username: "User", password: "password", phone: "1231234" }

const login1 = (u: Pick<User, "username" | "password">) => {
  console.log("login user")
  console.log(u)
}

const login2 = (u: User) => {
  console.log(u)
}

// * This version is OK since we picked
// * the values username and password from User
login1({ username: "foo", password: "bar" })

// * Here the typescript compiler does not let
// * the values pass since we don't have the 'phone'
// * from the User
login2({ username: "foo", password: "bar" })
```

### Compiler Error on login2

```console
tsc index.ts
index.ts:46:8 - error TS2345: Argument of type '{ username: string; password: string; }' is not assignable to parameter of type 'User'.
  Property 'phone' is missing in type '{ username: string; password: string; }' but required in type 'User'.

46 login2({ username: "foo", password: "bar" });
          ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

  index.ts:25:3
    25   phone: UserPhoneNumber;
         ~~~~~
    'phone' is declared here.


Found 1 error.
```

whats here
