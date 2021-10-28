---
title: Developer guidelines (Last updated at 2021-09-20)
description: Guidelines for develop applications with Typescript, Nodejs, React, React Native & Postgres
author: Thinh Tran
date: 2021-05-28 08:14:00 +0700
categories: [Tutorials]
tags: []
pin: true
---

The guidelines to develop applications focusing on Typescript, Nodejs, React, React Native, Postgres & AWS.

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

Use [this Serverless template](/assets/posts/2021-05-28-developer-guidelines/serverless.yml) to deploy a Lambda function.

Follow instructions from [this link](https://www.apollographql.com/docs/apollo-server/deployment/lambda/).

### 3. Optimized Docker file sample

Use [this Docker file template](/assets/posts/2021-05-28-developer-guidelines/Dockerfile.txt).

### 4. Kubernetes deployment sample

Use [this deployment template](/assets/posts/2021-05-28-developer-guidelines/k8s.deployment.yaml).

## Web

### 1. Set up a new app with Nextjs, Typescript, Tailwind CSS

- Set up a new project with Nextjs & Typescript (follow [this](https://nextjs.org/docs/getting-started))

  ```bash
  yarn create next-app --typescript
  ```

- Install Eslint parser/rules/plugins: [eslint-config-airbnb](https://www.npmjs.com/package/eslint-config-airbnb), [plugin:@next/next/recommended](https://nextjs.org/docs/basic-features/eslint#recommended-plugin-ruleset), [eslint-config-prettier](https://prettier.io/docs/en/integrating-with-linters.html), [eslint-plugin-prettier](https://github.com/prettier/eslint-plugin-prettier), [eslint-plugin-no-null](https://www.npmjs.com/package/eslint-plugin-no-null). Check this sample: [.eslintrc.js](/assets/posts/2021-05-28-developer-guidelines/web/eslintrc.js)

  ```bash
  yarn add --dev @typescript-eslint/parser @typescript-eslint/eslint-plugin @next/eslint-plugin-next eslint-config-prettier eslint-plugin-prettier eslint-plugin-no-null eslint-plugin-no-inline-styles
  ```

  ```bash
  npx install-peerdeps --dev eslint-config-airbnb
  ```

- Install Prettier (a fixed version)

  ```bash
  yarn add --dev prettier@2.4.1
  ```

- Install Jest & Cypress: Follow [this sample](https://github.com/vercel/next.js/blob/canary/examples/with-jest/package.json)

- Install [TailwindCSS](https://tailwindcss.com/docs/guides/nextjs)

  ```bash
  yarn add --dev tailwindcss@latest postcss@latest autoprefixer@latest
  ```

  ```bash
  npx tailwindcss init -p
  ```

- Add [bundle analyzer](https://www.npmjs.com/package/@next/bundle-analyzer)

  ```bash
  yarn add @next/bundle-analyzer
  ```

  Then update next.config.js

  ```typescript
  const withBundleAnalyzer = require("@next/bundle-analyzer")({
    enabled: process.env.ANALYZE === "true",
  });
  module.exports = withBundleAnalyzer({});
  ```

- Add [Rematch](https://rematchjs.org/docs/getting-started/installation/) - state management library with react-redux, immer, redux-persist

  ```bash
  yarn add @rematch/core @rematch/immer @rematch/persist immer react-redux redux-persist
  ```

  Then follow the tutorial

### 2. [Internationalized Routing](https://nextjs.org/docs/advanced-features/i18n-routing) by updating next.config.js

```javascript
// next.config.js
module.exports = {
  i18n: {
    locales: ["en", "vi"],
    defaultLocale: "en",
    domains: [],
  },
};
```

### 3. Make PWA with [next-pwa](https://github.com/shadowwalker/next-pwa)

```bash
yarn add next-pwa
```

### 4. Make icon with [this](https://chirpy.cotes.info/posts/customize-the-favicon/)

## Mobile

### 1. App Store Screenshot Requirements

The required device screenshots for app submission are:

- iPhone 12 Pro Max · 6.7-inch
- iPhone 8 Plus · 5.5-inch
- iPad Pro · 12.9-inch (only if the app runs on iPad)

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

Use Eslint as the linter for Typescript. Use the below base files which have rules based on AirBnB's rules, Prettier & some custom rules.

- Backend

  - [.eslintrc.js](/assets/posts/2021-05-28-developer-guidelines/backend/eslintrc.js)

  - [.eslintignore](/assets/posts/2021-05-28-developer-guidelines/backend/eslintignore.txt)

- Web

  - [.eslintrc.js](/assets/posts/2021-05-28-developer-guidelines/web/eslintrc.js)

  - [.eslintignore](/assets/posts/2021-05-28-developer-guidelines/web/eslintignore.txt)

- Mobile

### 3. Prettier

- Use a fixed version (for example: "2.3.0")

- Use those base files

  - [.prettierrc.js](/assets/posts/2021-05-28-developer-guidelines/prettierrc.js)

  - [.prettierignore](/assets/posts/2021-05-28-developer-guidelines/prettierignore.txt)
