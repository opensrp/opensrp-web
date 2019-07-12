# Services and Utilities

## Services

Services live in the src/services folder

services in this context represent abstractions for making calls to external APIS.

there are no strict guidelines for this section since most what will go here is free form and subject to the authors interpretation. however there are still the basic principles that are in effect globally for the project. If you want, here is a [refresher](../codeQuality.md).

Here is a sample class that implements a service to retrieve clients from the opensrp rest clients endpoint

```typescript
class ClientService {
  private CLIENTS_API_ENDPOINT = `${OPENSRP_BASE_API_ENDPOINT}/${OPENSRP_CLIENT_ENDPOINT}/search`;

  public async getClientsList() {
    interface Response {
      data: any;
      error: string;
    }
    let result: Response | null = null;

    await fetch(this.CLIENTS_API_ENDPOINT, { headers: { ...SERVICE_HEADERS }, method: 'GET' })
      .then(async response => {
        const returnObj = await response.json();
        let data: Array<{ [key: string]: any }> = returnObj;
        // check that the returned data is an array, if there was an
        // error this will usually comeback as an object
        if (!Array.isArray(returnObj)) {
          data = [];
        }
        result = {
          data,
          error: (!response.ok && `${response.status} ${FAILED_TO_RETRIEVE_CLIENTS}`) || '',
        };
      })
      .catch(err => {
        result = {
          data: [],
          error: err,
        };
      });

    return result;
  }
}
```

The `getClientList` function trivially implements a get request to the opensrp ```/clients``` endpoint and returns an object containing the data, if there is any data received.

## Utilities

in the opensrp-web context, a utility will refer to functions, and types that can be reused across different modules

```typescript
/** Interface for an object that is allowed to have any property */
export interface FlexObject {
  [key: string]: any;
}
```

```FlexObject``` defines a type that has an indexable signature where the keys are strings and the values are of any type

The tests for the any testable utility func should be placed in the src/helpers/tests directory
