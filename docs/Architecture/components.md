# Components

in this section we will go through how to _add_ a Component. Examples for this tasks are derived from the ClientList presentational component.

## Guidelines on adding components

A sample directory structure will probably look like this

```
.<ComponentName>
├── tests
│   ├── __snapshots__
│   ├── index.test.tsx
├─ index.tsx
├─ index.css
```

The component's code will go in index.tsx file,

Each component should have a test folder where the tests will reside

### some guidelines for how to write the component code

- Create a type for the props that the component will receive

```typescript
export interface ClientListProps {
  clientService: typeof ClientService;
  clientsArray: Client[];
  fetchClientsActionCreator: typeof fetchClients;
}
```

- Add default props

```typescript
/** default props for the clientList component */
export const defaultClientListProps: ClientListProps = {
  clientService: ClientService,
  clientsArray: [],
  fetchClientsActionCreator: fetchClients,
};
```

- Write the components code; this will include the logic and most importantly the jsx content to be render on the browser.
  [see](https://dev.to/iam_timsmith/react-how-to-create-a-component-2ho9)

  Here is the ClientList component with the jsx stripped down to a single div

```typescript
/** Display the client list  */
class ClientList extends React.Component<ClientListProps, {}> {
  public static defaultProps: ClientListProps = defaultClientListProps;
  constructor(props: ClientListProps) {
    super(props);
  }

  public async componentDidMount() {
    const { fetchClientsActionCreator, opensrpService } = this.props;
    const clientService = new opensrpService(`${OPENSRP_CLIENT_ENDPOINT}`);
    const response = await clientService.list();
    fetchClientsActionCreator(response);
  }

  public render() {
    /** render loader if there are no clients in state */
    const { clientsArray } = this.props;
    if (!some(clientsArray)) {
      return <Loading />;
    }
    return <div>{/** For each client in clientArray display as a new record in a table */}</div>;
  }
}
```

This is an example of a Class-based component, Using a class-based component is usually recommended in cases where you find you have to deal with state within the component.

The `defaultProps` variable is used to set the default value for the props.

Then we have one of [React life cycle hooks](https://programmingwithmosh.com/javascript/react-lifecycle-methods/) the `componentDidMount` function, that basically tells react wait until this component is mounted and then do something.

In our example, React will wait for the component to mount and then get clients from the `openSRPService` and then dispatch an action that that will add the data to the redux store. The `fetchclientsActionCreator` prop maps to an action creator that once given the response data, it creates an action that once dispatched, adds the data payload to the redux store. We will cover more about mapping props to action creators and connecting components to the store in the [containers](containers.md) file.

Then we have the canonical `render` [life cycle hook](https://programmingwithmosh.com/javascript/react-lifecycle-methods/). This is the only required hook for react class-based components and its sole purpose is to render the Dom elements for the ui.

In our case the render function [conditionally renders](https://reactjs.org/docs/conditional-rendering.html) the `loading` component if the clientsArray prop is not empty, otherwise if we have clients data in the clientsArray prop, then the div and its children will be rendered.
