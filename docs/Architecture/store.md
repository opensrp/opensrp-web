# overview

This documentation will take you through the process of creating and working with:

    - reducers
    - actions
    - selectors

## Where do I find the store

the store reducer modules are found within src/store. The initial directory structure looks something like this: (Note: this structure only depicts the initial directory structure and will as expected contain more directories and files as more are added with time)

```
...
├── src
│   ├── ...
│   ├── store
│   │   ├── ducks
│   │   │    ├── superset.ts
│   │   │    ├── tests/
│   │   ├── tests
│   │   ├── index.ts
│   │   └── selectors.ts
...
```

A single reducer module will contain the afore mentioned parts i.e. its respective actions, action creators if any, its selectors and the reducer function

## Actions

An action can be any object with a type property, they are the only way provisioned for changing the state in a redux store.

### Adding Actions

Its a common convention as well as recommended one to Use type constants, [read more on this here]().

steps:

- Add An interface describing the action structure: redux exposes an `AnyAction` type that can be extended to write custom action interfaces
- Create a general actiontypes to be used to type check all actions that will be passed to the reducer function as an argument. this will be in the form of [intersection type]()

## Selectors

whereas the action puts data in the store; the selectors on the other hand act as getters of the slice of data that this reducer module handles

selectors are functions that will take at least one argument, the store, Then based on any other arguments like say an id, can be used to filter down the data retrieved.

## The Reducer

The reducer function, takes 2 arguments; the state and an action.
using the type property of the action, the reducer should then know how to modify the state.
such functionality could be implemented as a form of switch strcture such as a list of if statements or the more recommended approach which is to use the actual switch statement

### Adding the Reducer

- Define an interface for the data to be stored in the store
- Define an interface for the store state.
- write the actual reducer function, while applying the required type annotations as required.
