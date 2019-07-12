# Components

components reside in the src/components directory

### Guidelines on adding components

sample directory structure borrowed from the Loading component

```
.Loading
├── tests
│   ├── __snapshots__
│   ├── index.test.tsx
├─ index.tsx
├─ index.css
```

the component's code will go in index.tsx file,

Each component should have a test folder where the tests will reside

some guidelines for how to write the component code

- create a type for the props that the component will receive
- add default props
- write the components code; this will include the logic and most importantly the jsx content to be render on the browser.
- A well designed component is self containing and should not rely on
  external data such as from the store so as to render.
