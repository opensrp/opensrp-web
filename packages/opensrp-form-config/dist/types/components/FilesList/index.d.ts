/// <reference types="react" />
import { SearchBarDefaultProps } from '../SearchBar';
import { FormConfigProps } from '../../helpers/types';
import { fetchManifestFiles, ManifestFilesTypes, removeManifestFiles } from '../../ducks/manifestFiles';
/** default props interface */
interface DefaultProps extends SearchBarDefaultProps {
    data: ManifestFilesTypes[];
    downloadLabel: string;
    editLabel: string;
    fetchFiles: typeof fetchManifestFiles;
    fileNameLabel: string;
    fileVersionLabel: string;
    identifierLabel: string;
    moduleLabel: string;
    removeFiles: typeof removeManifestFiles;
    uploadEditLabel: string;
    uploadFileLabel: string;
}
/** manifest files list props interface */
interface ManifestFilesListProps extends DefaultProps, FormConfigProps {
    downloadEndPoint: string;
    formVersion: string | null;
    fileUploadUrl: string;
    isJsonValidator: boolean;
    uploadTypeUrl: string;
}
/** view manifest forms */
declare const ManifestFilesList: {
    (props: ManifestFilesListProps): JSX.Element;
    /** pass default props to component */
    defaultProps: DefaultProps;
};
/** Connected ManifestFilesList component */
declare const ConnectedManifestFilesList: import("react-redux").ConnectedComponent<{
    (props: ManifestFilesListProps): JSX.Element;
    /** pass default props to component */
    defaultProps: DefaultProps;
}, Pick<ManifestFilesListProps, "isJsonValidator" | "placeholder" | "debounceTime" | "fileNameLabel" | "moduleLabel" | "baseURL" | "customAlert" | "endpoint" | "getPayload" | "LoadingComponent" | "identifierLabel" | "uploadFileLabel" | "uploadTypeUrl" | "downloadLabel" | "editLabel" | "fileVersionLabel" | "uploadEditLabel" | "downloadEndPoint" | "formVersion" | "fileUploadUrl">>;
export { ManifestFilesList, ConnectedManifestFilesList };