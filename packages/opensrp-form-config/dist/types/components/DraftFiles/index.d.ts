/// <reference types="react" />
import { SearchBarDefaultProps } from '../SearchBar';
import { FormConfigProps, DrillDownProps } from '../../helpers/types';
import { fetchManifestDraftFiles, removeManifestDraftFiles } from '../../ducks/manifestDraftFiles';
import { ManifestFilesTypes } from '../../ducks/manifestFiles';
/** default props interface */
export interface DraftsDefaultProps extends SearchBarDefaultProps {
    clearDraftFiles: typeof removeManifestDraftFiles;
    createdAt: string;
    data: ManifestFilesTypes[];
    downloadLabel: string;
    drillDownProps: DrillDownProps;
    fetchDraftFiles: typeof fetchManifestDraftFiles;
    fileNameLabel: string;
    fileVersionLabel: string;
    identifierLabel: string;
    makeReleaseLabel: string;
    moduleLabel: string;
    uploadFileLabel: string;
}
/** manifest Draft files props interface */
export interface ManifestDraftFilesProps extends DraftsDefaultProps, FormConfigProps {
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
    defaultProps: DraftsDefaultProps;
};
/** Connected ManifestDraftFiles component */
declare const ConnectedManifestDraftFiles: import("react-redux").ConnectedComponent<{
    (props: ManifestDraftFilesProps): JSX.Element;
    /** pass default props to component */
    defaultProps: DraftsDefaultProps;
}, Pick<ManifestDraftFilesProps, "createdAt" | "placeholder" | "debounceTime" | "fileNameLabel" | "moduleLabel" | "baseURL" | "customAlert" | "endpoint" | "getPayload" | "LoadingComponent" | "drillDownProps" | "identifierLabel" | "uploadFileLabel" | "formUploadUrl" | "uploadTypeUrl" | "downloadLabel" | "fileVersionLabel" | "downloadEndPoint" | "makeReleaseLabel" | "manifestEndPoint" | "releasesUrl">>;
export { ManifestDraftFiles, ConnectedManifestDraftFiles };
