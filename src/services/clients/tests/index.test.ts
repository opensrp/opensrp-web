import ClientService from '../';
import * as fixtures from '../../../store/ducks/tests/fixtures';

// tslint:disable-next-line: no-var-requires
const fetch = require('jest-fetch-mock');
jest.mock('../../../configs/env');

describe('services/clients', () => {
  beforeEach(() => {
    jest.resetAllMocks();
    fetch.resetMocks();
  });
});
