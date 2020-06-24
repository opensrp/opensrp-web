/// <reference types="react" />
import { InitialValuesTypes } from './helpers';
import { FormConfigProps } from '../../helpers/types';
import { ManifestFilesTypes } from '../../ducks/manifestFiles';
/** default props interface */
export interface DefaultProps {
    fileNameLabel: string;
    fileUploadLabel: string;
    formData: ManifestFilesTypes | null;
    formInitialValues: InitialValuesTypes;
    formNameRequiredLable: string;
    formRequiredLabel: string;
    moduleLabel: string;
    relatedToLabel: string;
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
    defaultProps: DefaultProps;
};
/** Connected UploadConfigFile component */
declare const ConnectedUploadConfigFile: import("react-redux").ConnectedComponent<{
    (props: UploadConfigFileProps & DefaultProps): JSX.Element;
    defaultProps: DefaultProps;
}, any>;
export { UploadConfigFile, ConnectedUploadConfigFile };
