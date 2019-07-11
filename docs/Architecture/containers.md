# CONTAINERS

### why do we have components and containers?

containers are different to components in that containers are components that are connected to the redux store

While a component should be purely presentational a container can receive state updates and dispatch actions , however the actual Dom elements rendering is relegated to the underlying presentational component

## Creating Containers

Most of the work involved increating a container is during the phase where you have to actually create the underlying presentational component. Once that is done there is `connect` function provided by `react-redux` that takes the dump component and connnects it to the store.

The connect function takes in 2 objects:

- an object that maps the components props to portions of the store, for the sake of conventions such an object is the return value of a function named `mapStateToProps`

- the second arg is an object that maps the prop properties to actions that can be dispatched within the container.

for a more thorough look at the connecting a component to the store [see this]()
