/// <reference types="react" />
import { SearchBarDefaultProps } from '../SearchBar';
import { FormConfigProps, DrillDownProps } from '../../helpers/types';
import { fetchManifestFiles, ManifestFilesTypes, removeManifestFiles } from '../../ducks/manifestFiles';
/** default props interface */
export interface FilesListDefaultProps extends SearchBarDefaultProps {
    createdAt: string;
    data: ManifestFilesTypes[];
    downloadLabel: string;
    drillDownProps: DrillDownProps;
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
export interface ManifestFilesListProps extends FilesListDefaultProps, FormConfigProps {
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
    defaultProps: FilesListDefaultProps;
};
/** Connected ManifestFilesList component */
declare const ConnectedManifestFilesList: import("react-redux").ConnectedComponent<{
    (props: ManifestFilesListProps): JSX.Element;
    /** pass default props to component */
    defaultProps: FilesListDefaultProps;
}, Pick<ManifestFilesListProps, "createdAt" | "isJsonValidator" | "placeholder" | "debounceTime" | "fileNameLabel" | "moduleLabel" | "baseURL" | "customAlert" | "endpoint" | "getPayload" | "LoadingComponent" | "drillDownProps" | "identifierLabel" | "uploadFileLabel" | "uploadTypeUrl" | "downloadLabel" | "editLabel" | "fileVersionLabel" | "uploadEditLabel" | "downloadEndPoint" | "formVersion" | "fileUploadUrl">>;
export { ManifestFilesList, ConnectedManifestFilesList };
