/// <reference types="react" />
import { SearchBarDefaultProps } from '../../SearchBar/searchBar';
import { FormConfigProps } from '../../helpers/types';
import { fetchManifestFiles, ManifestFilesTypes, removeManifestFiles } from '../../ducks/manifestFiles';
/** default props interface */
interface DefaultProps extends SearchBarDefaultProps {
    data: ManifestFilesTypes[];
    fetchFiles: typeof fetchManifestFiles;
    removeFiles: typeof removeManifestFiles;
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
export { ManifestFilesList };
/** Connected ManifestFilesList component */
declare const ConnectedManifestFilesList: import("react-redux").ConnectedComponent<{
    (props: ManifestFilesListProps): JSX.Element;
    /** pass default props to component */
    defaultProps: DefaultProps;
}, Pick<ManifestFilesListProps, "placeholder" | "debounceTime" | "isJsonValidator" | "downloadEndPoint" | "baseURL" | "endpoint" | "getPayload" | "growl" | "LoadingComponent" | "formVersion" | "fileUploadUrl" | "uploadTypeUrl">>;
export default ConnectedManifestFilesList;
