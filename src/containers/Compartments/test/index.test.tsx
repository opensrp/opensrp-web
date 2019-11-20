import reducerRegistry from '@onaio/redux-reducer-registry';
import { mount, shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import { createBrowserHistory } from 'history';
import React from 'react';
import { Provider } from 'react-redux';
import { Router } from 'react-router';
import ConnectedCompartments from '..';
import { PREGNANCY, PREGNANCY_REGISTRATION, TYPE_SMS_FILTER_FUNCTION } from '../../../constants';
import locationsReducer, {
  reducerName as locationsReducerName,
} from '../../../store/ducks/locations';
import smsReducer, {
  fetchSms,
  reducerName as smsReducerName,
  SmsData,
} from '../../../store/ducks/sms_events';
import store from '../../../store/index';
import { smsDataFixtures } from './fixtures';

const history = createBrowserHistory();
reducerRegistry.register(smsReducerName, smsReducer);
reducerRegistry.register(locationsReducerName, locationsReducer);

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
            filterArgs={
              [
                (smsData: SmsData) => {
                  return smsData.sms_type === PREGNANCY_REGISTRATION;
                },
              ] as TYPE_SMS_FILTER_FUNCTION[]
            }
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
            filterArgs={
              [
                (smsData: SmsData) => {
                  return smsData.sms_type === PREGNANCY_REGISTRATION;
                },
              ] as TYPE_SMS_FILTER_FUNCTION[]
            }
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
