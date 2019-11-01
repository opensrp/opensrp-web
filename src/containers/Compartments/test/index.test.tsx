import reducerRegistry from '@onaio/redux-reducer-registry';
import { mount, shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import { createBrowserHistory } from 'history';
import React from 'react';
import { Provider } from 'react-redux';
import { Router } from 'react-router';
import ConnectedCompartments from '..';
import { PREGNANCY } from '../../../constants';
import reducer, { fetchSms, reducerName } from '../../../store/ducks/sms_events';
import store from '../../../store/index';
import { smsDataFixtures } from './fixtures';

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
          <ConnectedCompartments
            filterArgs={[
              {
                comparator: '===',
                field: 'sms_type',
                value: 'Pregnancy Registration',
              },
            ]}
            module={PREGNANCY}
          />
        </Router>
      </Provider>
    );

    // compartment title should have the correct text
    expect(toJson(wrapper.find('#compartment_title'))).toMatchSnapshot('compartment title');

    // the sub-heading right below the title
    expect(toJson(wrapper.find('#breadcrumb'))).toMatchSnapshot('subtitle');

    // ensure 3 data circle cards are found
    expect(wrapper.find('DataCircleCard')).toHaveLength(3);

    expect(wrapper.find('div.compartment-wrapper.compartments').find('Row')).toHaveLength(2);
  });

  it('must display the correct data', () => {
    store.dispatch(fetchSms(smsDataFixtures));
    const wrapper = mount(
      <Provider store={store}>
        <Router history={history}>
          <ConnectedCompartments
            filterArgs={[
              {
                comparator: '===',
                field: 'sms_type',
                value: 'Pregnancy Registration',
              },
            ]}
            module={PREGNANCY}
          />
        </Router>
      </Provider>
    );

    // the numbers in this snapshot encode the correctness of the private functions in the Compartments component
    expect(
      toJson(wrapper.find('div.compartment-wrapper.compartments').find('.dataCircleCard.card'))
    ).toMatchSnapshot('compartments');
  });
});
