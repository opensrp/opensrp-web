import { getFetchOptions } from '@opensrp/server-service';

/** form config default component props types */
export interface FormConfigProps {
    baseURL: string;
    endpoint: string;
    getPayload: typeof getFetchOptions;
    LoadingComponent?: JSX.Element;
}
