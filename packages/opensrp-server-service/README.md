# OpenSRP Service

Exposes an api that abstracts making CRUD requests to a server. This module was built for the openSRPService but is
generic enough to be used on most apis. It exposes the below methods.

-   **create** - post a data object to an api.
-   **read** - get a single data object using its unique id
-   **update** - Modify an entity on the api
-   **list** - get many entities from specified entry point
-   **delete** - make a `DELETE` request to the api

## Installation

```node
yarn add @opensrp/server-service
```

## Usage

`OpenSRPService` makes use of the following options

-   **baseURL:**(string)
    -   **required**
    -   uri of the api
-   **endpoint:**(string)
    -   **required**
    -   the endpoint.
-   **signal:**(AbortSignal)
    -   optional
    -   optionally used to cancel pending requests.
-   **getOptions:**(Function)
    -   optional
    -   A function thats given the signal and method to use. Used to add custom options that you might want to pass on tho the fetch request

### Code example

Here is a [code sandbox](https://codesandbox.io/s/bootstrap-pagination-component-jxtbt) showing how this hook could be used to create a bootstrap-powered pagination component

```typescript
import OpenSRPService from '@opensrp/server-service';

function getFetchOptions(signal: AbortSignal, method: HTTPMethod): { headers: HeadersInit; method: HTTPMethod } {
    return {
        headers: {
            /**... */
        },
        method,
        signal,
    };
}

const loadclients = async () => {
    const clientService = new opensrpService(OPENSRP_API_BASE_URL, OPENSRP_CLIENT_ENDPOINT, getFetchOptions);
    return await clientService.list();
};
```
