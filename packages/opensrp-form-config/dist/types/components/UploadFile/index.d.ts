/// <reference types="react" />
import { InitialValuesTypes } from './helpers';
import { FormConfigProps } from '../../helpers/types';
import { ManifestFilesTypes } from '../../ducks/manifestFiles';
/** default props interface */
export interface DefaultProps {
    formData: ManifestFilesTypes | null;
    formInitialValues: InitialValuesTypes;
}
/** UploadConfigFile interface */
export interface UploadConfigFileProps extends FormConfigProps {
    draftFilesUrl: string;
    formId: string | null;
    isJsonValidator: boolean;
    validatorsUrl: string;
}
declare const UploadConfigFile: {
    (props: UploadConfigFileProps & DefaultProps): JSX.Element;
    defaultProp: DefaultProps;
};
export { UploadConfigFile };
/** Connected UploadConfigFile component */
declare const ConnectedUploadConfigFile: import("react-redux").ConnectedComponent<{
    (props: UploadConfigFileProps & DefaultProps): JSX.Element;
    defaultProp: DefaultProps;
}, Pick<UploadConfigFileProps & DefaultProps, "isJsonValidator" | "draftFilesUrl" | "formId" | "validatorsUrl" | "baseURL" | "endpoint" | "getPayload" | "growl" | "LoadingComponent"> & UploadConfigFileProps>;
export default ConnectedUploadConfigFile;
