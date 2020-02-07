import { mount, shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import React from 'react';
import BasicInformation from '..';

const props = [
    { label: 'currentEdd', value: 'test edd' },
    { label: 'currentGravidity', value: 20 },
    { label: 'currentParity', value: 20 },
    { label: 'id', value: 'test' },
    { label: 'location', value: 'Test Location' },
    { label: 'previousPregnancyRisk', value: 'no risk' },
];

describe('BasicInformation', () => {
    it('must render without crashing', () => {
        shallow(<BasicInformation labelValuePairs={props} />);
    });
    it('must render without crashing when currentEdd is not supplied', () => {
        shallow(<BasicInformation labelValuePairs={props} />);
    });
    it('must render correctly', () => {
        const wrapper = mount(<BasicInformation labelValuePairs={props} />);
        expect(toJson(wrapper)).toMatchSnapshot();
    });
});
