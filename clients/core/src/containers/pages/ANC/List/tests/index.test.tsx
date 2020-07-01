import * as React from 'react';
import { mount, shallow } from 'enzyme';
import { ANCList, ANCProps } from '..';
import ConnectedANCList from '..';
import * as fixtures from '../../../../../store/ducks/tests/fixtures';
import { Provider } from 'react-redux';
import store from '../../../../../store';
import reducer, { fetchANC, reducerName, removeANCAction, setTotalANCRecords } from '../../../../../store/ducks/anc';
import reducerRegistry from '@onaio/redux-reducer-registry';
import { MemoryRouter } from 'react-router';

reducerRegistry.register(reducerName, reducer);

jest.mock('../../../../../configs/env');
describe('containers/anc/List', () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let classMock: any;
    beforeEach(() => {
        jest.resetAllMocks();

        const listMock = jest.fn(async () => {
            return { clients: fixtures.ancList, total: 3 };
        });
        classMock = jest.fn(() => ({
            list: listMock,
        }));
    });

    it('renders without crashing', () => {
        const props: ANCProps = {
            opensrpService: classMock,
            ancArray: [],
            fetchANC: fetchANC,
            removeANC: removeANCAction,
            setTotalRecords: setTotalANCRecords,
            totalRecords: 0,
        };
        const wrapper = shallow(<ANCList {...props} />);
        expect(wrapper.length).toBe(1);
    });

    it('renders correctly when ancArray is an empty array', () => {
        const props: ANCProps = {
            opensrpService: classMock,
            ancArray: [],
            fetchANC: fetchANC,
            removeANC: removeANCAction,
            setTotalRecords: setTotalANCRecords,
            totalRecords: 0,
        };
        const wrapper = mount(<ANCList {...props} />);
        expect(wrapper.find('Ripple').length).toBe(1);
        wrapper.unmount();
    });

    it('works correctly with the redux store', () => {
        store.dispatch(fetchANC(fixtures.ancList));
        const props: ANCProps = {
            opensrpService: classMock,
            ancArray: [],
            fetchANC: fetchANC,
            removeANC: removeANCAction,
            setTotalRecords: setTotalANCRecords,
            totalRecords: 0,
        };
        const wrapper = mount(
            <Provider store={store}>
                <ConnectedANCList {...props} />
                );
            </Provider>,
        );
        const foundProps = wrapper.find('ANCList').props() as ANCProps;
        expect(foundProps.ancArray).toEqual(fixtures.ancList);
        wrapper.unmount();
    });

    it(' should update the props after server call', async () => {
        const props: ANCProps = {
            opensrpService: classMock,
            ancArray: [],
            fetchANC: fetchANC,
            removeANC: removeANCAction,
            setTotalRecords: setTotalANCRecords,
            totalRecords: 0,
        };
        const wrapper = mount(
            <Provider store={store}>
                <MemoryRouter initialEntries={['/']} keyLength={0}>
                    <ConnectedANCList {...props} />
                </MemoryRouter>
            </Provider>,
        );
        await new Promise(resolve => setImmediate(resolve));
        wrapper.update();

        const foundProps = wrapper.find('ANCList').props() as ANCProps;
        expect(foundProps.totalRecords as number).toBe(3);
        wrapper.unmount();
    });
});
