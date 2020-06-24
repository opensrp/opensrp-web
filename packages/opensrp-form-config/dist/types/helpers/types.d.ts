/// <reference types="react" />
import { getFetchOptions } from '@opensrp/server-service';
import { ToastOptions } from 'react-toastify';
/** form config default component props types */
export interface FormConfigProps {
    baseURL: string;
    customAlert?: (message: string, options: ToastOptions) => void;
    endpoint: string;
    getPayload: typeof getFetchOptions;
    LoadingComponent?: JSX.Element;
}
