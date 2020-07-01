import { preparePutData } from '../utils';
import { allSettings } from '../../ducks/settings/tests/fixtures';
import { updateDate } from '../../EditSettings/tests/fixtures';

const data = { ...allSettings[0] };
const output = {
    ...updateDate,
};

describe('helpers/utils', () => {
    it('preparePutData', () => {
        const teamData = {
            team: 'demo',
            teamId: '123',
        };
        expect(preparePutData(data, 'true')).toEqual(output);

        // with teams
        expect(preparePutData({ ...data, ...teamData }, 'true')).toEqual({ ...output, ...teamData });

        // with providerId
        expect(preparePutData({ ...data, providerId: '12' }, 'true')).toEqual({ ...output, providerId: '12' });
    });
});
