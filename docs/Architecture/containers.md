# Containers

In this section, I will take you through the basic process of creating and adding a container to the existing opensrp code base

Ill use the Clients container for code examples along the way.

## why are there components and containers

Containers are different to components in that containers are components that are connected to the redux store

While a component should be purely presentational a container can receive state updates and dispatch actions , however the actual Dom elements rendering is relegated to the underlying presentational component

## Creating Containers

Most of the work involved in creating a container is done during the phase where you have to actually create the underlying presentational component([see here](components.md)). Once that is done; there is a `connect` function provided by `react-redux` that takes the dumb component and connects it to the store.

The [connect](https://react-redux.js.org/api/connect) function can take up to 4 arguments, however, you will often find that you only need 2 arguments:

- an object that maps the components props to portions of the store, such an object is the return value of a function named `mapStateToProps`.

```typescript
/** Map props to state  */
const mapStateToProps = (state: Partial<Store>): DispatchedStateProps => {
  const result = {
    clientsArray: getClientsArray(state),
  };
  return result;
};
```

- the second arg is an object that maps certain props to actions that can be dispatched within the container.

```typescript
/** map props to actions */
const mapDispatchToProps = { fetchClientsActionCreator: fetchClients };
```

the connect function is a high order that takes the above optional parameters and returns a function that takes in the presentational component to be connected, such that the final syntax looks like this

```typescript
const ConnectedClientList = connect(
  mapStateToProps,
  mapDispatchToProps
)(ClientList);
```

where `ClientList` is purely presentational.

for a more comprehensive guide at connecting a component to the store [see this](https://react-redux.js.org/api/connect)
