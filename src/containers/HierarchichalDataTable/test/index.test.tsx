import { mount, shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import { createBrowserHistory } from 'history';
import React from 'react';
import { Provider } from 'react-redux';
import { Router } from 'react-router';
import ConnectedHierarchichalDataTable from '..';
import { fetchLocations } from '../../../store/ducks/locations';
import { fetchSms } from '../../../store/ducks/sms_events';
import store from '../../../store/index';
import { smsSlice } from '../../LogFace/tests/fixtures';
import { communes, districts, provinces, villages } from './fixtures';

jest.genMockFromModule('@fortawesome/react-fontawesome');
jest.mock('@fortawesome/react-fontawesome');

const history = createBrowserHistory();

describe('HierarchichalDataTable', () => {
  it('renders without crashing', () => {
    shallow(
      <Provider store={store}>
        <ConnectedHierarchichalDataTable />
      </Provider>
    );
  });

  it('renders correctly', () => {
    store.dispatch(fetchLocations(districts));
    store.dispatch(fetchLocations(provinces));
    store.dispatch(fetchLocations(communes));
    store.dispatch(fetchLocations(villages));
    store.dispatch(fetchSms(smsSlice));

    let props = {
      match: {
        params: {
          module: 'pregnancy',
          risk_highlighter: 'high_risk',
          title: 'Total Pregnancies',
        },
      },
    };

    let wrapper = mount(
      <Provider store={store}>
        <Router history={history}>
          <ConnectedHierarchichalDataTable {...props} />
        </Router>
      </Provider>
    );
    expect(toJson(wrapper.find('Table'))).toMatchSnapshot('hierarchichalDataTable');

    props = {
      match: {
        params: {
          current_level: 1,
          direction: 'down',
          module: 'pregnancy',
          node_id: '1',
          risk_highlighter: 'high_risk',
          title: 'Total Pregnancies',
        } as any,
      },
    };

    // pass props in the partern /:risk_highlighter?/:title?/:current_level?/:direction?/:node_id?/:from_level?
    //             hierarchicaldata/high-risk/156 Total Pregnancies/1/down/1
    wrapper = mount(
      <Provider store={store}>
        <Router history={history}>
          <ConnectedHierarchichalDataTable {...props} />
        </Router>
      </Provider>
    );
    expect(toJson(wrapper.find('tbody'))).toMatchSnapshot('hierarchichalDataTable');

    props = {
      match: {
        params: {
          current_level: 2,
          direction: 'down',
          module: 'pregnancy',
          node_id: '6',
          risk_highlighter: 'high_risk',
          title: 'Total Pregnancies',
        } as any,
      },
    };
    wrapper = mount(
      <Provider store={store}>
        <Router history={history}>
          <ConnectedHierarchichalDataTable {...props} />
        </Router>
      </Provider>
    );
    expect(toJson(wrapper.find('tbody'))).toMatchSnapshot('hierarchichalDataTable');

    props = {
      match: {
        params: {
          current_level: 3,
          direction: 'down',
          module: 'pregnancy',
          node_id: '13',
          risk_highlighter: 'high_risk',
          title: 'Total Pregnancies',
        } as any,
      },
    };
    wrapper = mount(
      <Provider store={store}>
        <Router history={history}>
          <ConnectedHierarchichalDataTable {...props} />
        </Router>
      </Provider>
    );
    expect(toJson(wrapper.find('tbody'))).toMatchSnapshot('hierarchichalDataTable');

    props = {
      match: {
        params: {
          current_level: 2,
          direction: 'up',
          from_level: 3,
          module: 'pregnancy',
          node_id: '13',
          risk_highlighter: 'high_risk',
          title: 'Total Pregnancies',
        } as any,
      },
    };
    wrapper = mount(
      <Provider store={store}>
        <Router history={history}>
          <ConnectedHierarchichalDataTable {...props} />
        </Router>
      </Provider>
    );
    expect(toJson(wrapper.find('tbody'))).toMatchSnapshot('hierarchichalDataTable');

    props = {
      match: {
        params: {
          current_level: 1,
          direction: 'up',
          from_level: 3,
          module: 'pregnancy',
          node_id: '13',
          risk_highlighter: 'high_risk',
          title: 'Total Pregnancies',
        } as any,
      },
    };
    wrapper = mount(
      <Provider store={store}>
        <Router history={history}>
          <ConnectedHierarchichalDataTable {...props} />
        </Router>
      </Provider>
    );
    expect(toJson(wrapper.find('tbody'))).toMatchSnapshot('hierarchichalDataTable');

    props = {
      match: {
        params: {
          current_level: 0,
          direction: 'up',
          from_level: 3,
          module: 'pregnancy',
          node_id: '13',
          risk_highlighter: 'high_risk',
          title: 'Total Pregnancies',
        } as any,
      },
    };
    wrapper = mount(
      <Provider store={store}>
        <Router history={history}>
          <ConnectedHierarchichalDataTable {...props} />
        </Router>
      </Provider>
    );
    expect(toJson(wrapper.find('tbody'))).toMatchSnapshot('hierarchichalDataTable');

    props = {
      match: {
        params: {
          current_level: 1,
          direction: 'up',
          from_level: 2,
          module: 'pregnancy',
          node_id: '13',
          risk_highlighter: 'high_risk',
          title: 'Total Pregnancies',
        } as any,
      },
    };
    wrapper = mount(
      <Provider store={store}>
        <Router history={history}>
          <ConnectedHierarchichalDataTable {...props} />
        </Router>
      </Provider>
    );
    expect(toJson(wrapper.find('tbody'))).toMatchSnapshot('hierarchichalDataTable');
    props = {
      match: {
        params: {
          current_level: 0,
          direction: 'up',
          from_level: 1,
          module: 'pregnancy',
          node_id: '13',
          risk_highlighter: 'high_risk',
          title: 'Total Pregnancies',
        } as any,
      },
    };
    wrapper = mount(
      <Provider store={store}>
        <Router history={history}>
          <ConnectedHierarchichalDataTable {...props} />
        </Router>
      </Provider>
    );
    expect(toJson(wrapper.find('tbody'))).toMatchSnapshot('hierarchichalDataTable');
  });

  it("must show the no record message when there's no data to show for a commune", () => {
    const props = {
      match: {
        params: {
          module: 'pregnancy',
          risk_highlighter: 'high_risk',
          title: 'Total Pregnancies',
        },
      },
    };

    const wrapper = mount(
      <Provider store={store}>
        <Router history={history}>
          <ConnectedHierarchichalDataTable {...props} />
        </Router>
      </Provider>
    );

    history.push(
      '/pregnancy_compartments/hierarchicaldata/Pregnancy/no/21%20Total%20Pregnancies/3/down/6792a597-4549-4f5f-9720-3d05e8bda8a0/0'
    );
    expect(toJson(wrapper.find('.norecord'))).toMatchSnapshot('norecord');
  });

  it('must ensure the back button works correctly', () => {
    const props = {
      match: {
        params: {
          module: 'pregnancy',
          risk_highlighter: 'high_risk',
          title: 'Total Pregnancies',
        },
      },
    };

    const wrapper = mount(
      <Provider store={store}>
        <Router history={history}>
          <ConnectedHierarchichalDataTable {...props} />
        </Router>
      </Provider>
    );

    const mockFunction = jest.fn();
    window.history.go = mockFunction;
    wrapper.find('.back-page').simulate('click');
    expect(mockFunction).toBeCalledWith(-1);
  });
});
