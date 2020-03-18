import * as React from 'react';
import { mount, shallow } from 'enzyme';
import { ChildList, ChildListProps } from '..';
import ConnectedChildList from '..';
import * as fixtures from '../../../../../store/ducks/tests/fixtures';
import toJson from 'enzyme-to-json';
import { Provider } from 'react-redux';
import store from '../../../../../store';
import reducer, { fetchChildList, reducerName, removeChildList } from '../../../../../store/ducks/child';
import reducerRegistry from '@onaio/redux-reducer-registry';
import { setTotalRecords } from '../../../../../store/ducks/clients';

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
        const props: ChildListProps = {
            childArray: [],
            fetchChild: mock,
            opensrpService: classMock,
            removeChild: mock,
            totalRecords: 0,
            setTotalRecords: mock,
        };
        const wrapper = shallow(<ChildList {...props} />);
        expect(wrapper.length).toBe(1);
    });

    it('renders correctly when childArray is an empty array', () => {
        const mock: jest.Mock = jest.fn();
        const props: ChildListProps = {
            childArray: [],
            fetchChild: mock,
            opensrpService: classMock,
            removeChild: mock,
            totalRecords: 0,
            setTotalRecords: mock,
        };
        const wrapper = mount(<ChildList {...props} />);
        expect(toJson(wrapper.find('Ripple'))).toMatchSnapshot('Ripple Loader');
        wrapper.unmount();
    });

    it('works correctly with the redux store', () => {
        store.dispatch(fetchChildList(fixtures.childList));
        const mock: jest.Mock = jest.fn();
        const props: ChildListProps = {
            childArray: [],
            fetchChild: mock,
            opensrpService: classMock,
            removeChild: mock,
            totalRecords: 0,
            setTotalRecords: mock,
        };
        const wrapper = mount(
            <Provider store={store}>
                <ConnectedChildList {...props} />
                );
            </Provider>,
        );
        const foundProps = wrapper.find('ChildList').props() as any;
        expect(foundProps.childArray).toEqual(fixtures.childList);
        wrapper.unmount();
    });

    it(' should update the props after server call', async () => {
        const props: ChildListProps = {
            childArray: [],
            fetchChild: fetchChildList,
            opensrpService: classMock,
            removeChild: removeChildList,
            totalRecords: 0,
            setTotalRecords: setTotalRecords,
        };
        const wrapper = mount(
            <Provider store={store}>
                <ConnectedChildList {...props} />
                );
            </Provider>,
        );
        await new Promise(resolve => setImmediate(resolve));
        wrapper.update();

        const foundProps = wrapper.find('ChildList').props() as any;
        expect(foundProps.totalRecords as number).toBe(3);
        wrapper.unmount();
    });

    it(' should select gender correctly', async () => {
        const props: ChildListProps = {
            childArray: [],
            fetchChild: fetchChildList,
            opensrpService: classMock,
            removeChild: removeChildList,
            totalRecords: 0,
            setTotalRecords: setTotalRecords,
        };
        const wrapper = mount(
            <Provider store={store}>
                <ConnectedChildList {...props} />
                );
            </Provider>,
        );
        await new Promise(resolve => setImmediate(resolve));
        wrapper.update();

        (wrapper.find('Select').instance() as any).selectOption({ value: 'Male', label: 'Male' });
        wrapper.update();
        expect(wrapper.find('ChildList').state().selectedGender).toEqual({ value: 'Male', label: 'Male' });
        wrapper.unmount();
    });
});
