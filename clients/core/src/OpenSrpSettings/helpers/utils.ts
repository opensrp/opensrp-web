import { Setting } from '../ducks/settings';

interface PostData extends Partial<Setting> {
    _id: string;
    identifier: string;
}

/**
 *
 * @param {Setting} data
 * @param {boolean} value
 */
export const preparePutData = (data: Setting, value: string) => {
    const {
        description,
        key,
        label,
        locationId,
        providerId,
        uuid,
        settingsId,
        settingIdentifier: identifier,
        settingMetadataId: _id,
        team,
        teamId,
        type,
    } = data;
    let postData: PostData = {
        _id,
        description,
        identifier,
        key,
        label,
        locationId,
        uuid,
        settingsId,
        type,
        value,
    };
    if (team) postData = { ...postData, team };
    if (teamId) postData = { ...postData, teamId };
    if (providerId) postData = { ...postData, providerId };
    return postData;
};
