# `@partial-tube/backend`

> TODO: description

## Usage

```
const backend = require('@partial-tube/backend');

// TODO: DEMONSTRATE API
```


### Notes

- When you deploy to Firebase, the process occurs "Deploy Error" because Firebase can't solve the dependencies with other Lerna packages. We should create a helper cli to solve this problem with tempolarily changing the path of packages in package.json like `@hoge/foo: file:./partial-tube-domain-0.0.0.tgz`, and what the tgz file is that we should generate from `npm pack`.
