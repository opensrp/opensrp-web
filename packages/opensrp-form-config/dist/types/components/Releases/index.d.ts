/// <reference types="react" />
import { fetchManifestReleases, ManifestReleasesTypes } from '../../ducks/manifestReleases';
import { SearchBarDefaultProps } from '../../SearchBar/searchBar';
import { FormConfigProps } from '../../helpers/types';
/** default props interface */
interface DefaultProps extends SearchBarDefaultProps {
    data: ManifestReleasesTypes[];
    fetchReleases: typeof fetchManifestReleases;
    formUploadUrl: string;
}
/** ManifestReleases props interface */
interface ManifestReleasesProps extends FormConfigProps {
    currentUrl: string;
    uploadTypeUrl: string;
}
/** view all manifest pages */
declare const ManifestReleases: {
    (props: ManifestReleasesProps & DefaultProps): JSX.Element;
    /** pass default props to component */
    defaultProps: DefaultProps;
};
export { ManifestReleases };
/** Connected ManifestReleases component */
declare const ConnectedManifestReleases: import("react-redux").ConnectedComponent<{
    (props: ManifestReleasesProps & DefaultProps): JSX.Element;
    /** pass default props to component */
    defaultProps: DefaultProps;
}, Pick<ManifestReleasesProps & DefaultProps, "placeholder" | "debounceTime" | "baseURL" | "endpoint" | "getPayload" | "growl" | "LoadingComponent" | "formUploadUrl" | "currentUrl" | "uploadTypeUrl">>;
export default ConnectedManifestReleases;
