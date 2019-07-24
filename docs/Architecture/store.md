# overview

In this section, we will go through the process of creating and working with:

1. Reducers
2. Actions
3. Selectors

within opensrp

## Where do I find the store

The store reducer modules are found within src/store. The initial directory structure looks something like this:

```
...
├── src
│   ├── ...
│   ├── store
│   │   ├── ducks
│   │   │    ├── tests/
│   │   │    ├── clients.ts
│   │   │    └── superset.ts
│   │   ├── tests
│   │   ├── index.ts
│   │   └── selectors.ts
...
```

A single reducer module will contain the afore mentioned parts i.e. its respective actions, action creators if any, its selectors and the reducer function.

In the following sections we will go through a basic process of adding each these to opensrp-web.

## Actions

An [action](https://redux.js.org/basics/actions) can be any object with a type property, they are the only way provisioned for feeding the redux store with the data needed to change state.

### Adding Actions

Its a common convention as well as recommended one to use action constants,
here is an example from the clients reducer module:

```typescript
/** CLIENTS_FETCHED action type */
const CLIENTS_FETCHED = 'opensrp/reducer/clients/CLIENTS_FETCHED';
```

First declare the action type as a constant variable then use the constant instead of the actual string literal within the action.

```typescript
/* a GOOD Sample action */
const goodSampleAction: FetchClientsAction = {
  clientsById: {
    GUUID: {
      id: 'GUUId',
    },
  },
  type: CLIENTS_FETCHED,
};

/** a BAD sample action */
const badSampleAction: FetchClientsAction = {
  clientsById: {
    GUUID: {
      id: 'GUUId',
    },
  },
  type: 'opensrp/reducer/clients/CLIENTS_FETCHED',
};
```

#### steps

- Add An interface describing the action structure: redux exposes an `AnyAction` type that can be extended to write custom action interfaces. Here is an example from the clients reducer module:

```typescript
interface FetchClientsAction extends AnyAction {
  clientsById: { [key: string]: Client };
  type: typeof CLIENTS_FETCHED;
}
```

- Write the action; this should be an object that compiles correctly when annotated to the already created action interface, e.g.

```typescript
const goodSampleAction: FetchClientsAction = {
  clientsById: {
    GUUID: {
      id: 'GUUId',
    },
  },
  type: CLIENTS_FETCHED,
};
```

In most cases you will find you do not have the payload data upfront during creation of the action object; in such cases its worth abstracting the action creation process in an action creator. Action creators are discussed in a below section

- Create a union type of the respective action types; for instance `ClientsActionTypes` below will only correctly assert that any action parsed into the reducer will conform to the type of `FetchClientsAction` action

```typescript
type ClientsActionTypes = FetchClientsAction | AnyAction;
```

If we added another action type say `ResetClientsAction`, probably defined as

```typescript
const RESET_CLIENTS = 'opensrp/reducer/clients/RESET_CLIENTS';

interface ResetClientsAction {
  clientsById: {};
  type: typeof RESET_CLIENTS;
}
```

The type `type ClientsActionTypes = FetchClientsAction | AnyAction | ResetClientsAction;` will only correctly assert action objects that conform to the interfaces of either `FetchClientsAction` or `ResetClientsAction`.

#### Adding ActionCreators

We have covered most of the work that goes into writing an action creator since; action creators are essentially functions that return actions

As intuited to earlier; action creators come in handy in cases where you have some payload preprocessing before appending the payload data to the action object. however, do note, that actions creators are meant to be strictly pure.

Here is an example of an action creator from the clients redux module:

```typescript
/** Fetch clients action creator
 * @param {Client []} clientsList - clients array to add to store
 * @return {FetchClientsAction} - an action to add clients to redux store
 */
const fetchClients = (clientsList: Client[] = []): FetchClientsAction => ({
  clientsById: keyBy(clientsList, (client: Client) => client.id),
  type: CLIENTS_FETCHED,
});
```

`fetchclients` takes in a list of Clients objects and creates a payload map where the keys are the client's object id and the values are the respective client objects. this payload is then returned in an object as the value of the `clientsById` key, then there is the type property we talked about earlier.

## Selectors

While the actions hold the data to change the store state; the selectors on the other hand act as getters of that data after its added to the redux store.

selectors are functions that will take at least one argument, the store, Then based on any other arguments like say an id, they can then be used to filter down the data retrieved.

Here is an example of a selector from the clients reducer module

```typescript
/** returns all clients in the store as values whose keys are their respective ids
 * @param {Partial<Store>} state - the redux store
 * @return { { [key: string] : Client} } - clients object as values, respective ids as keys
 */
export function getClients(state: Partial<Store>): { [key: string]: Client } {
  return (state as any)[reducerName].clientsById;
}
```

As you might have guessed or deduced form the docstring: `getClients` takes the store as an argument. It then uses the reducerName(we have not yet seen this, it will be in the below reducer section) to access a slice of the store pertinent to this reducer.

Out of that slice it then returns values of the clientsById property which judging from the return type interface `{ [key: string]: Client }` and how the previous actions structured their payloads, the returned object should have a signature that looks like this:

```typescript
{
  client_id: Client;
}
```

## The Reducer

> Reducers specify how the application's state changes in response to actions sent to the store.

[read more on reducers here](https://redux.js.org/basics/reducers)

The reducer function, takes 2 arguments; the state and an action.
using the type property of the action, the reducer should then know how to modify the state.
such functionality could be implemented as a form of switch structure such as a list of if statements or the more recommended approach which is to use a switch statement

Some universal rules on creating a reducer (from the official documentation):

- DO NOT:
  1. Mutate the reducer's arguments
  2. Perform side effects like API calls and routing transitions within the reducer
  3. call non-pure functions e.g Match.random() inside the reducer

as an added precaution and for enhanced code quality openSRP-web uses immutable
objects for its redux state, it does so by using the [seamless-immutable](https://github.com/rtfeldman/seamless-immutable) library. Its recommended that you strive to keep the state immutable.

### Adding the Reducer

- Define a name for the reducer, this will be used when retrieving just the piece of data handled by this reducer

```typescript
/** The reducer name */
export const reducerName = 'clients';
```

- Define an interface for the data to be stored in the store, in the clients reducer case, this would be the Clients objects interface

```typescript
/** Interface for client object */
export interface Client {
  type: 'Client';
  dateCreated: number;
  serverVersion: number;
  clientApplicationVersion: number;
  clientDatabaseVersion: number;
  baseEntityId: string;
  identifiers: { [key: string]: string | null };
  addresses: FlexObject[];
  attributes: FlexObject;
  firstName: string;
  lastName: string;
  birthdate: number;
  middleName?: string;
  birthdateApprox: boolean;
  deathdateApprox: boolean;
  gender?: string;
  relationships: {
    [key: string]: string[];
  };
  _id: string;
  _rev: string;
}
```

- Declare an initial state, A reducer should never return an undefined state, and thus you should provide an initial or default state that can be returned if for instance the reducer is called with an action whose type it does not handle

```typescript
/** initial clients-state state */
const initialState: ImmutableClientsState = SeamlessImmutable({
  clientsById: {},
});
```

- Define an interface for the store state.

```typescript
/** interface for clients state in redux store */
interface ClientState {
  clientsById: { [key: string]: Client };
}

type ImmutableClientsState = ClientState & SeamlessImmutable.ImmutableObject<ClientState>;
```

- Write the actual reducer function, while applying the required type annotations as required.

```typescript
/** the clients reducer function */
export default function reducer(
  state: ImmutableClientsState = initialState,
  action: ClientsActionTypes
): ImmutableClientsState {
  switch (action.type) {
    case CLIENTS_FETCHED:
      return SeamlessImmutable({
        ...state,
        clientsById: action.clientsById,
      });
    default:
      return state;
  }
}
```
