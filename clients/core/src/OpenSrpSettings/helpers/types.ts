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
}
