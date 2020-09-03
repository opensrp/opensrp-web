import { logout, Payload } from '..';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const fetch = require('jest-fetch-mock');

const payload: Payload = {
    method: 'GET',
    headers: {
        authorization: 'Bearer <token>',
    },
};
const opensrpLogoutUri = 'https://global.smartregister.org/opensrp/logout.do';
const keycloakLogoutUri = 'https://keycloak.smartregister.org/realm/camelot/openid-connect/logout';
const redirectUri = 'https://opensrp-web.smartregister.org';

describe('gatekeeper/utils/logoutFromAuthServer', () => {
    afterEach(() => {
        fetch.resetMocks();
    });
    it('invokes all the required stuff', async () => {
        fetch.once(JSON.stringify('logged off'), { status: 200 });
        delete window.location;
        const hrefMock = jest.fn();
        (window.location as any) = {
            set href(url: string) {
                hrefMock(url);
            },
        };

        logout(payload, opensrpLogoutUri, keycloakLogoutUri, redirectUri);
        await new Promise(resolve => setImmediate(resolve));

        expect(fetch.mock.calls).toEqual([
            [
                'https://global.smartregister.org/opensrp/logout.do',
                {
                    headers: {
                        authorization: 'Bearer <token>',
                    },
                    method: 'GET',
                },
            ],
        ]);
        expect(hrefMock).toHaveBeenCalledWith(
            'https://keycloak.smartregister.org/realm/camelot/openid-connect/logout?redirect_uri=https%3A%2F%2Fopensrp-web.smartregister.org',
        );
    });

    it('Deals with errors', async () => {
        fetch.mockReject(JSON.stringify('still logged in'));
        const errorMock = jest.fn();

        logout(payload, opensrpLogoutUri, keycloakLogoutUri, redirectUri, errorMock);
        await new Promise(resolve => setImmediate(resolve));

        expect(errorMock).toHaveBeenCalledWith('"still logged in"');
    });
});
