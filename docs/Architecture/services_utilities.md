# Services and Utilities

## Services

Services live in the src/services folder

services in this context represent abstractions for making calls to external APIS.

there are no strict guidelines for this section since most what will go here is free form and subject to the authors interpretation. however there are still the basic principles that are in effect globally for the project. If you want, here is a [refresher](https://github.com/OpenSRP/opensrp-web/blob/master/docs/codeQuality.md).

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

The ```getClientList``` function trivially implements a get request to the opensrp /clients endpoint and returns an object containing the data, if there is any received.

## Utilities

in the opensrp-web context, a utility will refer to functions, and types whose intent is not part of the  primary functionality of any other sections. to better explain this with code, here is
an example of a utility function.

The need to have this functionality rose from within the clientList container. however, it does not serve any presentational detail for which the clientlist container file is for, as a result the function is more appropriate in the utilities section than in the clientlist component's file.

```typescript

/** Interface for an object that is allowed to have any property */
export interface FlexObject {
  [key: string]: any;
}

export function extractClient(rawClient: FlexObject): Client {
  const thisClient: Client = {
    firstName: rawClient.firstName || '',
    gender: rawClient.gender || '',
    id: rawClient._id || '',
    lastContactDate: '',
    lastName: rawClient.lastName || '',
    location: '',
    middleName: rawClient.middleName || '',
    type: 'Client',
  };
  return thisClient;
}
```

Here; ```extractClient``` utility function takes a single raw client object from the getClientList function defined above . It then proceeds to extract only those data fields that i thought were useful and needed being added to the redux store.

The tests for the same should be placed in the src/helpers/tests directory
