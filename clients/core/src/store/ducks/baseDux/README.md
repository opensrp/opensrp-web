# Base Clients Dux Module

## What am i

Am an abstraction (more like a template), that you can use to create other [dux modules](https://github.com/erikras/ducks-modular-redux).

I think the biggest win with me, is that there is reduced boilerplate when it comes to creating dux modules.

currently , the only opinionated part about me is how i structure the stored data, basically it requires that my action creators are given data as list of objects, where each object bears a property akin to a `primary_key` i.e. this one single field should have unique values that are of type `string| number`.

```typescript
import {
    fetchActionCreatorFactory,
    removeActionCreatorFactory,
    setTotalRecordsFactory,
    reducerFactory,
    getItemsByIdFactory,
    getItemsArrayFactory,
    getItemByIdFactory,
    getTotalRecordsFactory,
    BaseDux,
} from './baseDux';

/** reducer name for the ANC module */
export const reducerName = 'opensrp-web/client-type/ANC';

/** ANC Reducer */
const reducer = reducerFactory<ANCClientType>(reducerName);

// action
/** actionCreator returns action to to add anc records to store */
export const fetchANC = fetchActionCreatorFactory<ANCClientType, 'baseEntityId'>(reducerName);
export const removeANCAction = removeActionCreatorFactory(reducerName);
export const setTotalANCRecords = setTotalRecordsFactory(reducerName);

// selectors
export const getAllANCById = getItemsByIdFactory<ANCClientType>(reducerName);
export const getANCById = getItemByIdFactory<ANCClientType>(reducerName);
export const getAllANCArray = getItemsArrayFactory<ANCClientType>(reducerName);
export const getTotalANCRecords = getTotalRecordsFactory(reducerName);

export default reducer;
```

## What am i provisioning

Glad you asked; The above example should have given you some clue, but am all to happy to summarize this for you here:

`reducerFactory` - this a factory method that returns a function that can be used as the reducer.
currently it supports 3 action types: - adding items - removing items - setting total records

**for action creators:**

`fetchActionCreatorFactory` - Use this to create action creators that you can use to create actions that when dispatched will add the data to a slice of the store,

`removeActionCreatorFactory` - Use this to create action creators that return actions to remove all items from a slice of the store

`setTotalRecordsFactory` - This will create an action creator that adds the total number of records to specific slice of the store

**for the selectors:**

`getItemsByIdFactory` which returns a selector that gets all items from a store slice as an object

`getItemByIdFactory` which returns a selector that gets a single item from a store slice as an object

`getItemsArrayFactory` which returns a selector that gets all objects from a store slice as an array

`getTotalRecordsFactory` which returns a selector that gets the total number of records in a store slice
