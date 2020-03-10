import { shallow } from 'enzyme';
import React from 'react';
import InfoCard, { InfoCardProps, renderHeaderFunc, renderRowsFunc } from '..';

describe('components/page/InfoCard', () => {
    beforeEach(() => {
        jest.resetAllMocks();
    });

    it('renders without crashing', () => {
        const props: InfoCardProps = {
            renderHeader: renderHeaderFunc,
            renderRows: renderRowsFunc,
            visible: true,
            title: '',
            link: '',
            linkLable: '',
            rowData: [],
        };
        const component = shallow(<InfoCard {...props} />);
        expect(component).toMatchSnapshot();
    });
});
