import { mount, shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import React from 'react';
import BasicInformation from '..';

describe('BasicInformation', () => {
  it('must render without crashing', () => {
    const props = {
      currentEdd: 'test edd',
      currentGravidity: 20,
      currentParity: 20,
      id: 'test',
      location: 'Test Location',
      previousPregnancyRisk: 'no risk',
    };
    shallow(<BasicInformation {...props} />);
  });
  it('must render without crashing when currentEdd is not supplied', () => {
    const props = {
      currentGravidity: 20,
      currentParity: 20,
      id: 'test',
      location: 'Test Location',
      previousPregnancyRisk: 'no risk',
    };
    shallow(<BasicInformation {...props} />);
  });
  it('must render correctly', () => {
    const props = {
      currentEdd: 'test edd',
      currentGravidity: 20,
      currentParity: 20,
      id: 'test',
      location: 'Test Location',
      previousPregnancyRisk: 'no risk',
    };
    const wrapper = mount(<BasicInformation {...props} />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
