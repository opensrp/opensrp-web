/// <reference types="react" />
import { SearchBarDefaultProps } from '../SearchBar/searchBar';
import { FormConfigProps } from '../../helpers/types';
import { fetchManifestDraftFiles } from '../../ducks/manifestDraftFiles';
import { ManifestFilesTypes } from '../../ducks/manifestFiles';
/** default props interface */
interface DefaultProps extends SearchBarDefaultProps {
    clearDraftFiles: typeof fetchManifestDraftFiles;
    data: ManifestFilesTypes[];
    fetchDraftFiles: typeof fetchManifestDraftFiles;
}
/** manifest Draft files props interface */
interface ManifestDraftFilesProps extends DefaultProps, FormConfigProps {
    downloadEndPoint: string;
    manifestEndPoint: string;
    releasesUrl: string;
}
/** view manifest forms */
declare const ManifestDraftFiles: {
    (props: ManifestDraftFilesProps): JSX.Element;
    /** pass default props to component */
    defaultProps: DefaultProps;
};
export { ManifestDraftFiles };
/** Connected ManifestDraftFiles component */
declare const ConnectedManifestDraftFiles: import("react-redux").ConnectedComponent<{
    (props: ManifestDraftFilesProps): JSX.Element;
    /** pass default props to component */
    defaultProps: DefaultProps;
}, Pick<ManifestDraftFilesProps, "placeholder" | "debounceTime" | "baseURL" | "endpoint" | "getPayload" | "growl" | "LoadingComponent" | "downloadEndPoint" | "manifestEndPoint" | "releasesUrl">>;
export default ConnectedManifestDraftFiles;
