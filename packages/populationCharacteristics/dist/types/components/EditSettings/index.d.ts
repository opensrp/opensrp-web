/// <reference types="react" />
import { Store } from 'redux';
import { Setting, fetchLocSettings } from '../../ducks/settings';
import { fetchLocs, LocChildren } from '../../ducks/locations';
import { FormConfigProps, EditSettingLabels } from '../../helpers/types';
/** dafault edit settings interface */
interface EditSettingsDefaultProps {
    activeLocationId: string;
    currentLocName: string;
    debounceTime: number;
    defaultLocId: string;
    fetchSettings: typeof fetchLocSettings;
    fetchLocations: typeof fetchLocs;
    labels: EditSettingLabels;
    locationDetails: LocChildren | {};
    locationSettings: Setting[];
    selectedLocations: string[];
    state: Partial<Store>;
}
/** component for displaying population characteristics */
declare const EditSetings: {
    (props: FormConfigProps & EditSettingsDefaultProps): JSX.Element;
    defaultProps: EditSettingsDefaultProps;
};
declare const ConnectedEditSetings: import("react-redux").ConnectedComponent<{
    (props: FormConfigProps & EditSettingsDefaultProps): JSX.Element;
    defaultProps: EditSettingsDefaultProps;
}, Pick<FormConfigProps & EditSettingsDefaultProps, "debounceTime" | "labels" | "baseURL" | "customAlert" | "getPayload" | "LoadingComponent" | "locationsEndpoint" | "restBaseURL" | "secAuthEndpoint" | "settingsEndpoint">>;
export { EditSetings, ConnectedEditSetings };
