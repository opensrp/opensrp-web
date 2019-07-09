import ClientService from '../';

import * as fixtures from '../tests/fixtures';

// How to mock the fetch method or is it the response

describe('services/clients', () => {
  jest.resetAllMocks();

  it('should return data for ok response status data', () => {
    const mockJsonPromise = Promise.resolve(fixtures.rawClients);
    const mockFetchPromise = Promise.resolve({
      json: () => mockJsonPromise,
    });

    jest.spyOn(global, 'fetch').mockImplementation(() => mockFetchPromise);

    expect(global.fetch).toHaveBeenCalledTimes(1);
    const responseData = ClientService.getClientsList();
    expect(responseData).toEqual(fixtures.rawClients);
  });

  it('should handle different types of http errors', () => {
    // what does this method response look like for http errors
    // How to mock status of a response after using fetch
  });
});
