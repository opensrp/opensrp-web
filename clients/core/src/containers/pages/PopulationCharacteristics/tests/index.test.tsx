import React from 'react';
import { shallow } from 'enzyme';
import { EditSetingsPage } from '..';

describe('EditsettingsPage', () => {
    it('renders without crashing', () => {
        shallow(<EditSetingsPage />);
    });
});
