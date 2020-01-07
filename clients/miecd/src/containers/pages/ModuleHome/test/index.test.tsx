import { mount, shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import { createBrowserHistory } from 'history';
import React from 'react';
import { Router } from 'react-router';
import ModuleHome from '..';
import {
  PREGNANCY_ANALYSIS_URL,
  PREGNANCY_COMPARTMENTS_URL,
  PREGNANCY_DESCRIPTION,
  PREGNANCY_LOGFACE_URL,
} from '../../../../constants';

const history = createBrowserHistory();

describe('PregnancyHome', () => {
  it('must render without crashing', () => {
    shallow(<ModuleHome />);
  });

  it('must render correctly', () => {
    const wrapper = mount(
      <Router history={history}>
        <ModuleHome
          title="Welcome to the pregnancy dashboard"
          description={PREGNANCY_DESCRIPTION}
          logfaceUrl={PREGNANCY_LOGFACE_URL}
          compartmentUrl={PREGNANCY_COMPARTMENTS_URL}
          analysisUrl={PREGNANCY_ANALYSIS_URL}
        />
      </Router>
    );
    expect(toJson(wrapper)).toMatchSnapshot();
    wrapper.unmount();
  });
});
