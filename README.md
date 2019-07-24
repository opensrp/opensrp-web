# OpenSRP Web Frontend

[![CircleCI](https://circleci.com/gh/OpenSRP/opensrp-web.svg?style=svg)](https://circleci.com/gh/OpenSRP/opensrp-web)

## Summary

OpenSRP web is the web interface to the OpenSRP server. OpenSRP uses OpenMRS backend and web interface to perform most of the administrative tasks

The structure of this repository is inherited from [create-react-app](https://github.com/facebook/create-react-app).

- We try follow the [BEM](https://en.bem.info/methodology/quick-start/) or Block Element Modifier guidelines for CSS.
- We strictly follow the [three principles of redux](https://redux.js.org/introduction/three-principles).

## Getting started

### Running the web-app

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

To Lint:

```sh
yarn lint-ts
```

Run the tests

```sh
yarn test
```

## Configuration

The configurations are located in the `configs` directory and are split into two modules:

- **env.ts**: this module reads configurations from environment variables
- **settings.ts**: this module holds more complicated configurations

## Contributing/Collaboration

See [contribution guidelines](https://github.com/OpenSRP/opensrp-web/blob/docs/docs/contributing.md).

## Documentation

1. [Components](docs/Architecture/components.md)
2. [Containers](docs/Architecture/containers.md)
3. [store](docs/Architecture/store.md)
4. [Services & Utilities](docs/Architecture/services_utilities.md)

## Code Quality

See [guidelines](docs/codeQuality.md) on recommended coding conventions for this project.
