import * as React from 'react';
import { mount, shallow } from 'enzyme';
import { LocationList, LocationListState, LocationListProps } from '..';
import ConnectedLocationList from '..';
import * as fixtures from '../../../../../store/ducks/tests/fixtures';
import reducer, { fetchChildList, reducerName, removeChildList } from '../../../../../store/ducks/child';
import reducerRegistry from '@onaio/redux-reducer-registry';
import { setTotalRecords } from '../../../../../store/ducks/clients';
import { MemoryRouter } from 'react-router';

reducerRegistry.register(reducerName, reducer);

jest.mock('../../../../../configs/env');
describe('containers/child/List', () => {
    let classMock: any;
    beforeEach(() => {
        jest.resetAllMocks();

        const listMock = jest.fn(async () => {
            return { clients: fixtures.childList, total: 3 };
        });
        classMock = jest.fn(() => ({
            list: listMock,
        }));
    });

    it('renders without crashing', () => {
        const mock: jest.Mock = jest.fn();
        const props: LocationListProps = {
            locationArray: [],
            fetchLocation: mock,
            opensrpService: classMock,
            removeLocation: mock,
            totalRecords: 0,
            setTotalRecords: mock,
        };
        const wrapper = shallow(<LocationList {...props} />);
        expect(wrapper.length).toBe(1);
    });

});
