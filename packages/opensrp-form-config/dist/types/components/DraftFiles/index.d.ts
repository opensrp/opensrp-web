/// <reference types="react" />
import { SearchBarDefaultProps } from '../SearchBar';
import { FormConfigProps } from '../../helpers/types';
import { fetchManifestDraftFiles } from '../../ducks/manifestDraftFiles';
import { ManifestFilesTypes } from '../../ducks/manifestFiles';
/** default props interface */
interface DefaultProps extends SearchBarDefaultProps {
    clearDraftFiles: typeof fetchManifestDraftFiles;
    createdAt: string;
    data: ManifestFilesTypes[];
    downloadLabel: string;
    fetchDraftFiles: typeof fetchManifestDraftFiles;
    fileNameLabel: string;
    fileVersionLabel: string;
    identifierLabel: string;
    makeReleaseLabel: string;
    moduleLabel: string;
    uploadFileLabel: string;
}
/** manifest Draft files props interface */
interface ManifestDraftFilesProps extends DefaultProps, FormConfigProps {
    downloadEndPoint: string;
    formUploadUrl: string;
    manifestEndPoint: string;
    releasesUrl: string;
    uploadTypeUrl: string;
}
/** view manifest forms */
declare const ManifestDraftFiles: {
    (props: ManifestDraftFilesProps): JSX.Element;
    /** pass default props to component */
    defaultProps: DefaultProps;
};
/** Connected ManifestDraftFiles component */
declare const ConnectedManifestDraftFiles: import("react-redux").ConnectedComponent<{
    (props: ManifestDraftFilesProps): JSX.Element;
    /** pass default props to component */
    defaultProps: DefaultProps;
}, Pick<ManifestDraftFilesProps, "createdAt" | "placeholder" | "debounceTime" | "fileNameLabel" | "moduleLabel" | "baseURL" | "customAlert" | "endpoint" | "getPayload" | "LoadingComponent" | "identifierLabel" | "uploadFileLabel" | "formUploadUrl" | "uploadTypeUrl" | "downloadLabel" | "fileVersionLabel" | "downloadEndPoint" | "makeReleaseLabel" | "manifestEndPoint" | "releasesUrl">>;
export { ManifestDraftFiles, ConnectedManifestDraftFiles };
