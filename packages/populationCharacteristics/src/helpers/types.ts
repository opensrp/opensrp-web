import { getFetchOptions } from '@opensrp/server-service';
import { ToastOptions } from 'react-toastify';

/** form config default component props types */
export interface FormConfigProps {
    baseURL: string;
    customAlert?: (message: string, options: ToastOptions) => void;
    getPayload: typeof getFetchOptions;
    LoadingComponent?: JSX.Element;
    locationsEndpoint: string;
    restBaseURL: string;
    secAuthEndpoint: string;
    settingsEndpoint: string;
    v2BaseUrl: string;
}

/** interface for all displayed strings */
export interface EditSettingLabels {
    descriptionLabel: string;
    editLabel: string;
    inheritedLable: string;
    inheritSettingsLabel: string;
    nameLabel: string;
    noDataFound: string;
    pageTitle: string;
    placeholder: string;
    settingLabel: string;
    setToNoLabel: string;
    setToYesLabel: string;
}
