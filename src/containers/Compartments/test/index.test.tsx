import { exportAllDeclaration } from '@babel/types';
import reducerRegistry from '@onaio/redux-reducer-registry';
import { mount, shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import { createBrowserHistory } from 'history';
import React from 'react';
import { Provider } from 'react-redux';
import { Router } from 'react-router';
import ConnectedCompartments from '..';
import reducer, { fetchSms, reducerName } from '../../../store/ducks/sms_events';
import store from '../../../store/index';

const history = createBrowserHistory();
reducerRegistry.register(reducerName, reducer);

describe('Compartments', () => {
  it('must render without crashing', () => {
    shallow(
      <Provider store={store}>
        <ConnectedCompartments />
      </Provider>
    );
  });
  it('must render correctly', () => {
    store.dispatch(fetchSms([]));
    const wrapper = mount(
      <Provider store={store}>
        <Router history={history}>
          <ConnectedCompartments />
        </Router>
      </Provider>
    );

    // container should have the correct classes
    expect(wrapper.find('Container').props().className).toEqual('compartment-wrapper compartments');
    expect((wrapper.find('Container').props() as any).fluid).toEqual(true);
    expect((wrapper.find('Container').props() as any).tag).toEqual('div');
    expect(wrapper.find('Container').find('div')).toHaveLength(16);

    // compartment title should have the correct text
    expect(wrapper.find('#compartment_title')).toMatchSnapshot('compartment title');

    // the sub-heading right below the title
    expect(wrapper.find('#breadcrumb')).toMatchSnapshot('subtitle');

    // ensure 3 data circle cards are found
    expect(wrapper.find('DataCircleCard')).toHaveLength(3);

    expect(wrapper.find('Compartments').find('Row')).toHaveLength(3);
  });
});
