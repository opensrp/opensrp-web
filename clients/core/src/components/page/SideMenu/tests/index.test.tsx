import { mount, shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import { createBrowserHistory } from 'history';
import React from 'react';
import { Router } from 'react-router';
import SideMenu from '..';
import {
    CLIENT_NAVIGATION_MODULE,
    ADMIN_NAVIGATION_MODULE,
    REPORT_NAVIGATION_MODULE,
} from '../../../../configs/navigationConfigs';

const history = createBrowserHistory();

describe('components/page/SideMenu', () => {
    beforeEach(() => {
        jest.resetAllMocks();
    });

    const sideMenuProps = {
        navigationModules: [
            {
                enabled: true,
                module: CLIENT_NAVIGATION_MODULE,
            },
            {
                enabled: true,
                module: REPORT_NAVIGATION_MODULE,
            },
            {
                enabled: true,
                module: ADMIN_NAVIGATION_MODULE,
            },
        ],
    };

    it('renders without crashing', () => {
        shallow(
            <Router history={history}>
                <SideMenu {...sideMenuProps} />
            </Router>,
        );
    });

    it('renders side menu correctly', () => {
        const wrapper = mount(
            <Router history={history}>
                <SideMenu {...sideMenuProps} />
            </Router>,
        );
        expect(
            wrapper
                .find('.side-menu-container div')
                .at(0)
                .find('.row div')
                .at(0)
                .find('.side-menu-extend div')
                .find('#sub-menu-Client-Records').length,
        ).toEqual(1);
        expect(
            wrapper
                .find('.side-menu-container div')
                .at(0)
                .find('.row div')
                .at(0)
                .find('.side-menu-extend div')
                .find('#sub-menu-Reports').length,
        ).toEqual(1);
        expect(
            wrapper
                .find('.side-menu-container div')
                .at(0)
                .find('.row div')
                .at(0)
                .find('.side-menu-extend div')
                .find('#sub-menu-Admin').length,
        ).toEqual(1);
        wrapper.unmount();
    });

    it('does not display any nav items if no navigation modules are enabled ', () => {
        const sideMenuProps = {
            navigationModules: [
                {
                    enabled: false,
                    module: CLIENT_NAVIGATION_MODULE,
                },
                {
                    enabled: false,
                    module: REPORT_NAVIGATION_MODULE,
                },
                {
                    enabled: false,
                    module: ADMIN_NAVIGATION_MODULE,
                },
            ],
        };
        const wrapper = mount(
            <Router history={history}>
                <SideMenu {...sideMenuProps} />
            </Router>,
        );
        expect(
            wrapper
                .find('.side-menu-container div')
                .at(0)
                .find('.row div')
                .at(0)
                .find('.side-menu-extend div')
                .at(0)
                .find('#sub-menu-Client-Records').length,
        ).toEqual(0);
        expect(
            wrapper
                .find('.side-menu-container div')
                .at(0)
                .find('.row div')
                .at(0)
                .find('.side-menu-extend div')
                .at(0)
                .find('#sub-menu-Reports').length,
        ).toEqual(0);
        expect(
            wrapper
                .find('.side-menu-container div')
                .at(0)
                .find('.row div')
                .at(0)
                .find('.side-menu-extend div')
                .at(0)
                .find('#sub-menu-Admin').length,
        ).toEqual(0);
    });
});
