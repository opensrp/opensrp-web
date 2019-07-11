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

the component's code will go in index.tsx file, the name index.ts is arbitrary and you can name your component's file differently.

Each component should have a test folder where the tests will reside

you can explicitly create the **snapshots** folder but that will
be created by jest for you once your run the tests.

some guidelines for how to write the component code

- create a type for the props that the component will receive
- add default props
- write the components code; this will iinclude the logic and most importantly the jsx content to be used to render on the browser.
- A good component is self containing and should not rely on
  external data such as from the store so as to render.
