# CONTAINERS

in this doc, I will take you through the basic process of creating and adding a container to the existing opensrp code base

Ill use the Clients container for code examples along the way.

### why are there components and containers?

containers are different to components in that containers are components that are connected to the redux store

While a component should be purely presentational a container can receive state updates and dispatch actions , however the actual Dom elements rendering is relegated to the underlying presentational component

## Creating Containers

Most of the work involved in creating a container is during the phase where you have to actually create the underlying presentational component. Once that is done there is `connect` function provided by `react-redux` that takes the dump component and connects it to the store.

The connect function can take in several args as seen [here](https://react-redux.js.org/api/connect), however more often that not you will find you only need 2 arguments:

- an object that maps the components props to portions of the store, for the sake of conventions such an object is the return value of a function named `mapStateToProps`

```typescript
/** Map props to state  */
const mapStateToProps = (state: Partial<Store>): DispatchedStateProps => {
  const result = {
    clientsArray: getClientsArray(state),
  };
  return result;
};
```

- the second arg is an object that maps the prop properties to actions that can be dispatched within the container.

```typescript
/** map props to actions */
const mapDispatchToProps = { fetchClientsActionCreator: fetchClients };
```

the connect function is a high order function and it returns a unction that takes in the presentational component to be connected, such that the final syntax looks like this

```typescript
const ConnectedClientList = connect(
  mapStateToProps,
  mapDispatchToProps
)(ClientList);
```

for a more thorough look at the connecting a component to the store [see this](https://react-redux.js.org/api/connect)
