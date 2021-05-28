---
title: Developer guidelines (Last updated at 2021-05-28)
author: Thinh Tran
date: 2021-05-28 08:14:00 +0700
categories: [Tutorials]
tags: []
pin: true
---

Guidelines to develop applications. That's my experiences which focuses on Typescript, Nodejs, React, React Native, Postgres & AWS.

## Backend

### 1. Use GraphQL with Express server

```typescript
import express from "express";
import helmet from "helmet";
import { ApolloServer } from "apollo-server-express";
import { log } from "@core";
import { configureServer } from "./server.config";

const { apolloServerConfig } = configureServer();
const port = process.env.PORT || 3000;
const server = express().use(
  helmet({
    contentSecurityPolicy:
      process.env.NODE_ENV === "production" ? undefined : false,
  })
);
const apolloServer = new ApolloServer(apolloServerConfig);
apolloServer.applyMiddleware({ app: server });
server.listen({ port }, () =>
  log.info(
    `🚀 Server ready at http://localhost:${port}${apolloServer.graphqlPath}`
  )
);
```

### 2. Use GraphQL with Lambda

```typescript
import { ApolloServer } from "apollo-server-lambda";
import { configureServer } from "./server.config";

const { apolloServerConfig } = configureServer();
const server = new ApolloServer(apolloServerConfig);

exports.graphqlHandler = server.createHandler({
  cors: {
    origin: true,
    credentials: true,
  },
});
```

Use [this Serverless template](/assets/posts/2021-05-28-developer-guidelines/serverless.yml) to deploy Lambda function.

Follow instructions from [this link](https://www.apollographql.com/docs/apollo-server/deployment/lambda/).

### 3. Optimized Docker file sample

Use [this Docker file template](/assets/posts/2021-05-28-developer-guidelines/Dockerfile.txt).

### 4. Kubernetes deployment sample

Use [this deployment template](/assets/posts/2021-05-28-developer-guidelines/k8s.deployment.yaml).

## Web

## Mobile

## AWS

### 1. Make a dashboard to monitor apps

### 2. Use Serverless framework to make Lambda functions and expose them with API Gateway

- To reduce Lambda code storage, delete old versions of Lambda with [this Serverless plugin](https://www.serverless.com/plugins/serverless-prune-plugin) or follow [this link](https://docs.aws.amazon.com/lambda/latest/operatorguide/code-storage-best-practice.html).

## DepOps

### 1. Use Cloudflare proxy with Lambda

Follow [this post](/posts/use-cloudflare-proxy-with-lambda).

### 2. Run scripts with environment variables stored in .env files

```bash
set -o allexport;source conf-file;set +o allexport
```

## Npm

### 1. Publish a typescript package to npm

Follow [this link](https://itnext.io/step-by-step-building-and-publishing-an-npm-typescript-package-44fe7164964c).

### 2. Creating a NodeJS command-line package

Follow [this link](https://medium.com/netscape/a-guide-to-create-a-nodejs-command-line-package-c2166ad0452e#_=_).

## Coding conventions

### 1. Typescript

- Use Typescript as the main language to develops applications for backend, frontend (web, mobile).

- Use [babel](https://babeljs.io/) to compile Typescript.

- Use [the module resolver](https://www.npmjs.com/package/babel-plugin-module-resolver) to simplify the require/import paths in your project

  - tsconfig.json

  ```json
  {
    "compilerOptions": {
      "paths": {
        "@main/*": ["src/modules/main/*"],
        "@core": ["src/core"],
        "@test/*": ["__tests__/*"]
      }
    }
  }
  ```

  - babel.config.js

  ```javascript
  module.exports = {
    plugins: [
      [
        require.resolve("babel-plugin-module-resolver"),
        {
          root: ["./src/"],
          alias: {
            "@test": "./__tests__",
            "@core": "./src/core",
            "@main": "./src/modules/main",
          },
        },
      ],
    ],
  };
  ```

  - .eslintrc.js

  ```javascript
  module.exports = {
    root: true,
    parser: "@typescript-eslint/parser",
    plugins: ["@typescript-eslint", "no-null"],
    extends: [
      "eslint:recommended",
      "plugin:@typescript-eslint/recommended",
      "airbnb-base",
      "prettier",
    ],
    rules: {
      "import/no-unresolved": [
        "error",
        { ignore: ["@test", "@core", "@main"] },
      ],
    },
  };
  ```

### 2. Eslint

Use Eslint as the linter for Typescript. Use the below base files which having rules based on AirBnB's rules, Prettier & some custom rules.

- Backend

  - [.eslintrc.js](/assets/posts/2021-05-28-developer-guidelines/backend/eslintrc.js)

  - [.eslintignore](/assets/posts/2021-05-28-developer-guidelines/backend/eslintignore.txt)

- Web

- Mobile

### 3. Prettier

- Use a fixed version (for example: "2.3.0")

- Use those base files

  - [.prettierrc.js](/assets/posts/2021-05-28-developer-guidelines/prettierrc.js)

  - [.prettierignore](/assets/posts/2021-05-28-developer-guidelines/prettierignore.txt)
