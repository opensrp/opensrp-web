# OpenSRP Web Frontend

[![CircleCI](https://circleci.com/gh/OpenSRP/opensrp-web.svg?style=svg)](https://circleci.com/gh/OpenSRP/opensrp-web)
[![Coverage Status](https://coveralls.io/repos/github/OpenSRP/opensrp-web/badge.svg?branch=master)](https://coveralls.io/github/OpenSRP/opensrp-web?branch=master)

## Summary

OpenSRP web is the web interface to the OpenSRP server. OpenSRP uses OpenMRS backend and web interface to perform most of the administrative tasks

The structure of this repository is inherited from [create-react-app](https://github.com/facebook/create-react-app).

-   We try follow the [BEM](https://en.bem.info/methodology/quick-start/) or Block Element Modifier guidelines for CSS.
-   We strictly follow the [three principles of redux](https://redux.js.org/introduction/three-principles).

## Getting started

### Running a web-app in the `clients` directory

cd into the specific client directory with the client project you would like to run

First, copy the included `.env.sample` into `.env`

```sh
cp .env.sample .env
```

Next install packages using yarn and then start the app:

```sh
yarn

yarn start
```

### Lint and test

To Lint

```sh
yarn lint
```

you can run `yarn lint` from an clients directory or from the root directory.

Run the tests

```sh
yarn test
```

you need to cd into a specific client directory within clients/ in order for tests to work properly.
This is because, clients may each have a separate `.env` files.

## Configuration

The configurations are located in the `configs` directory and are split into two modules:

-   **env.ts**: this module reads configurations from environment variables
-   **settings.ts**: this module holds more complicated configurations

## Creating a new package/

## Contributing/Collaboration

See [contribution guidelines](https://github.com/OpenSRP/opensrp-web/blob/docs/docs/contributing.md).

## Documentation

1. [Components](docs/Architecture/components.md)
2. [Containers](docs/Architecture/containers.md)
3. [store](docs/Architecture/store.md)
4. [Services & Utilities](docs/Architecture/services_utilities.md)

## Code Quality

See [guidelines](docs/codeQuality.md) on recommended coding conventions for this project.

## Creating a New Client

```sh
cd clients
npx create-react-app my-new-client --typescript
```

remember to remove the `.igtignore` file created by npx

Add a `.prettierrc` file such as this one.

```sh
{
    "printWidth": 100,
    "singleQuote": true,
    "trailingComma": "es5"
}
```

Add an `images.d.ts` file (image type definitions); an example can be found in `clients/core`

Finally, you need to modify `test` and `lint` scripts in `clients/my-new-client/package.json` file to match these:

```sh
"test": "cp ./.env ../../.env && cd ../../ && yarn test clients/core --verbose --collectCoverage=true && cd clients/core",,
"lint": "eslint './**/*.{js,jsx,ts,tsx}'"
```

## Creating a New Package

```sh
cd packages
```

Once we’re in the correct directory, we can create and cd into our new package

```sh
mkdir my-new-package && cd my-new-package
```

Then we create a new package.json by running yarn init:

```sh
yarn init
```

The new name should follow our NPM Org scope e.g. `@onaio`

It’s also important to have the new package start at a version like 0.0.0 because once we do our first publish using Lerna, it’ll be published at 0.1.0 or 1.0.0.

Here's an example sample `package.json` for a package:

```json
{
    "name": "@opensrp/my-new-package",
    "version": "0.0.0",
    "description": "My new my-new-package",
    "main": "dist/index.js",
    "types": "dist/types",
    "files": ["dist"],
    "publishConfig": {
        "access": "public"
    },
    "repository": "https://github.com/opensrp/opensrp-web",
    "scripts": {
        "jest": "jest --coverage --verbose --color",
        "test": "cd ../../ && yarn test packages/opensrp-server-service --verbose --collectCoverage=true && cd clients/core",
        "lint": "eslint './**/*.{js,jsx,ts,tsx}'",
        "transpile": "babel src -d dist --root-mode upward --extensions '.ts,.tsx' --ignore '**/*.test.ts,**/*.test.tsx,**/tests,**/__tests__'"
    },
    "jest": {
        "automock": false,
        "setupFiles": ["../../setupTests"]
    },
    "bugs": {
        "url": "https://github.com/opensrp/opensrp-web/issues"
    },
    "author": "Ona Engineering",
    "license": "Apache-2.0",
    "private": false,
    "dependencies": {
        "@onaio/session-reducer": "^0.0.11"
    }
}
```

Additionally, a new package must have a `tsconfig.json` file that looks like so:

```json
{
    "extends": "../../tsconfig.json",
    "compilerOptions": {
        "outDir": "dist",
        "declarationDir": "dist/types"
    },
    "include": ["src"]
}
```

### Add a story

Don't forget to [add a story](https://storybook.js.org/docs/basics/writing-stories/) for the new package, if possible. This allows easy discovery and documentation for other developers or users of the package.

Stries should be added in a `stories` directory at the root directory of this git repo.

## Transpiling the package and generating type definations for it

You should be able to transpile a packages running the following commands in the root directory of the package:

```sh
yarn transpile
```

Your transpiled package is saved in the `dist` directory.

Type definitions are generated by running the following command in the root directory of the package:

```sh
tsc
```

What this does is generate type definations for the package that are store in the `dist/types` directory.
