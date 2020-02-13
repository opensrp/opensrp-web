# Base Clients Dux Module

## What am i

Am an abstraction (more like a template), that you can use to create other dux modules that store data that is **similar** in schema to the response object from `/rest/clients/search` from openSRP. Am an attempt at having dry code and i will probably not be usable for any other types of "scheme-ad" data other than openSRP Client-like data. If you have come this far I can only hope you already know what I am referring to by openSRP Clients.

So instead of rewriting and duplicating lots of boilerplate to create say the ANC dux module, etc., you can just import me and use my factory methods to easily create namespaced action creators, selectors and reducers that just work. Its as simple as

```typescript
import {
    reducerFactory,
    BaseClient,
    fetchClientsFactory,
    removeClientsFactory,
    getClientsArrayFactory,
    getClientByIdFactory,
    getClientsByIdFactory,
    setTotalRecordsFactory,
    getTotalRecordsFactory,
} from './baseClients/baseClient';

/** reducer name for the ANC module */
export const reducerName = 'opensrp-web/client-type/ANC';

/** ANC Reducer */
const reducer = reducerFactory<ANCClientType>(reducerName);

// action
/** actionCreator returns action to to add anc records to store */
export const fetchANC = fetchClientsFactory<ANCClientType>(reducerName);
export const removeANCAction = removeClientsFactory(reducerName);
export const setTotalANCRecords = setTotalRecordsFactory(reducerName);

// selectors
export const getAllANCById = getClientsByIdFactory<ANCClientType>(reducerName);
export const getANCById = getClientByIdFactory<ANCClientType>(reducerName);
export const getAllANCArray = getClientsArrayFactory<ANCClientType>(reducerName);
export const getTotalANCRecords = getTotalRecordsFactory(reducerName);

export default reducer;
```

## What am i provisioning

Glad you asked; The above example should have given you some clue, but am all to happy to summarize this for you here:

`reducerFactory` - this a factory method that returns a function that can be used as the reducer.
currently it supports 3 action types: - adding clients - removing clients - setting total records

**for action creators:**

`fetchClientsFactory` - Use this to create action creators that you can use to create actions that when dispatched will add the data to a slice of the store,

`removeClientsFactory` - Use this to create action creators that return actions to remove all clients from a slice of the store

`setTotalRecordsFactory` - This will create an action creator that adds the total number of records to specific slice of the store

**for the selectors:**

`getClientsByIdFactory` which returns a selector that gets all clients from a store slice as an object

`getClientByIdFactory` which returns a selector that gets a single client from a store slice as an object

`getClientsArrayFactory` which returns a selector that gets all clients from a store slice as an array

`getTotalRecordsFactory` which returns a selector that gets the total number of records in a store slice

## Can You modify me

Well yes, but within reason, If you want to add new code that needs to be shared across ANC, child, household etc. then by all means feel free.

If you need to add say an `actionType` specific to one the above then the recommended way would be to extend me through composition(or whatever works) in the respective module that requires the added functionality
