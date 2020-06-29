/// <reference types="react" />
import { InitialValuesTypes } from './helpers';
import { FormConfigProps } from '../../helpers/types';
import { ManifestFilesTypes } from '../../ducks/manifestFiles';
/** default props interface */
export interface UploadDefaultProps {
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
    (props: UploadConfigFileProps & UploadDefaultProps): JSX.Element;
    defaultProps: UploadDefaultProps;
};
/** Connected UploadConfigFile component */
declare const ConnectedUploadConfigFile: import("react-redux").ConnectedComponent<{
    (props: UploadConfigFileProps & UploadDefaultProps): JSX.Element;
    defaultProps: UploadDefaultProps;
}, any>;
export { UploadConfigFile, ConnectedUploadConfigFile };
