/// <reference types="react" />
import { fetchManifestReleases, ManifestReleasesTypes } from '../../ducks/manifestReleases';
import { SearchBarDefaultProps } from '../SearchBar';
import { FormConfigProps } from '../../helpers/types';
/** default props interface */
interface DefaultProps extends SearchBarDefaultProps {
    appIdLabel: string;
    appVersionLabel: string;
    data: ManifestReleasesTypes[];
    fetchReleases: typeof fetchManifestReleases;
    identifierLabel: string;
    formUploadUrl: string;
    updatedAt: string;
    uploadFileLabel: string;
    viewFilesLabel: string;
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
/** Connected ManifestReleases component */
declare const ConnectedManifestReleases: import("react-redux").ConnectedComponent<{
    (props: ManifestReleasesProps & DefaultProps): JSX.Element;
    /** pass default props to component */
    defaultProps: DefaultProps;
}, Pick<ManifestReleasesProps & DefaultProps, "updatedAt" | "placeholder" | "debounceTime" | "baseURL" | "customAlert" | "endpoint" | "getPayload" | "LoadingComponent" | "appIdLabel" | "appVersionLabel" | "identifierLabel" | "formUploadUrl" | "uploadFileLabel" | "viewFilesLabel" | "currentUrl" | "uploadTypeUrl">>;
export { ManifestReleases, ConnectedManifestReleases };
