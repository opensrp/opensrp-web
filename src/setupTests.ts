// This is used to set up stuff for tests e.g. configs, icons, etc
import { library } from '@fortawesome/fontawesome-svg-core';
import { faUser } from '@fortawesome/free-regular-svg-icons';
import { faCog } from '@fortawesome/free-solid-svg-icons';
import enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { GlobalWithFetchMock } from 'jest-fetch-mock';

enzyme.configure({ adapter: new Adapter() });
library.add(faUser);
library.add(faCog);

const customGlobal: GlobalWithFetchMock = global as GlobalWithFetchMock;
/* tslint:disable-next-line no-var-requires */
customGlobal.fetch = require('jest-fetch-mock');
customGlobal.fetchMock = customGlobal.fetch;
