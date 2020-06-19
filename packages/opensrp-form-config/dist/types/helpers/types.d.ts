/// <reference types="react" />
import { getFetchOptions } from '@opensrp/server-service';
import { ToastOptions } from 'react-toastify';
/** form config default component props types */
export interface FormConfigProps {
    baseURL: string;
    endpoint: string;
    getPayload: typeof getFetchOptions;
    growl?: (message: string, options: ToastOptions) => void;
    LoadingComponent?: JSX.Element;
}
