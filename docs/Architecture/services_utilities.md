# Services and Utilities

## Services

Services live in the src/services folder

services in this context represent abstractions for making calls to external APIS.

there are no strict guidelines for this section since most what will go here is free form and subject to the authors interpretation. however there are still the basic principles that are in effect globally for the project. If you want, here is a [refresher](../codeQuality.md).

Here is the crux of the opensrp service that one can extend to implement other services that will make calls to the opensrp APIs

```typescript
export class OpenSRPService {
  public baseURL: string;
  public endpoint: string;
  public generalURL: string;

  constructor(endpoint: string, baseURL: string = OPENSRP_API_BASE_URL) {
    this.endpoint = endpoint;
    this.baseURL = baseURL;
    this.generalURL = `${this.baseURL}${this.endpoint}`;
  }

  /** create method
   * Send a POST request to the general endpoint containing the new object data
   * Successful requests will result in a HTTP status 201 response with no body
   * @param {T} data - the data to be POSTed
   * @param {params} params - the url params object
   * @param {HTTPMethod} method - the HTTP method
   * @returns the object returned by API
   */
  public async create<T>(data: T, params: paramsType = null, method: HTTPMethod = 'POST') {
    const url = getURL(this.generalURL, params);
    const payload = {
      ...getPayload(method),
      'Cache-Control': 'no-cache',
      Pragma: 'no-cache',
      body: JSON.stringify(data),
    };
    const response = await fetch(url, payload);

    if (!response.ok || response.status !== 201) {
      throw new Error(
        `OpenSRPService create on ${this.endpoint} failed, HTTP status ${response.status}`
      );
    }

    return {};
  }

  /** read method
   * Send a GET request to the url for the specific object
   * @param {string|number} id - the identifier of the object
   * @param {params} params - the url params object
   * @param {HTTPMethod} method - the HTTP method
   * @returns the object returned by API
   */
  public async read(id: string | number, params: paramsType = null, method: HTTPMethod = 'GET') {
    const url = getURL(`${this.generalURL}/${id}`, params);
    const response = await fetch(url, getPayload(method));

    if (!response.ok) {
      throw new Error(
        `OpenSRPService read on ${this.endpoint} failed, HTTP status ${response.status}`
      );
    }

    return await response.json();
  }

  /** update method
   * Simply send the updated object as PUT request to the general endpoint URL
   * Successful requests will result in a HTTP status 200/201 response with no body
   * @param {T} data - the data to be POSTed
   * @param {params} params - the url params object
   * @param {HTTPMethod} method - the HTTP method
   * @returns the object returned by API
   */
  public async update<T>(data: T, params: paramsType = null, method: HTTPMethod = 'PUT') {
    const url = getURL(this.generalURL, params);
    const payload = {
      ...getPayload(method),
      'Cache-Control': 'no-cache',
      Pragma: 'no-cache',
      body: JSON.stringify(data),
    };
    const response = await fetch(url, payload);

    if (!response.ok) {
      throw new Error(
        `OpenSRPService update on ${this.endpoint} failed, HTTP status ${response.status}`
      );
    }

    return {};
  }

  /** list method
   * Send a GET request to the general API endpoint
   * @param {params} params - the url params object
   * @param {HTTPMethod} method - the HTTP method
   * @returns list of objects returned by API
   */
  public async list(params: paramsType = null, method: HTTPMethod = 'GET') {
    const url = getURL(this.generalURL, params);
    const response = await fetch(url, getPayload(method));

    if (!response.ok) {
      throw new Error(
        `OpenSRPService list on ${this.endpoint} failed, HTTP status ${response.status}`
      );
    }

    return await response.json();
  }
}
```

There is a nice docstring in the code that illustrates sample usage of the class; here is a peak.

```typescript
/** The OpenSRP service class
 *
 * Sample usage:
 * -------------
 * const service = new OpenSRPService('the-endpoint');
 *
 * **To list all objects**: service.list()
 *
 * **To get one object**: service.read('the-object-identifier')
 *
 * **To create a new object**: service.create(theObject)
 *
 * **To update an object**: service.update(theObject)
 */
```

The `ClientList` component uses this service to get data from the `clients/search` endpoint.

## Utilities

in the opensrp-web context, a utility will refer to functions, and types that can be reused across different modules

```typescript
/** Interface for an object that is allowed to have any property */
export interface FlexObject {
  [key: string]: any;
}
```

`FlexObject` defines a type that has an indexable signature where the keys are strings and the values are of any type

The tests for the any testable utility func should be placed in the src/helpers/tests directory
