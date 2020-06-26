/// <reference types="react" />
import { fetchManifestReleases, ManifestReleasesTypes } from '../../ducks/manifestReleases';
import { SearchBarDefaultProps } from '../SearchBar';
import { FormConfigProps, DrillDownProps } from '../../helpers/types';
/** default props interface */
export interface ReleasesDefaultProps extends SearchBarDefaultProps {
    appIdLabel: string;
    appVersionLabel: string;
    data: ManifestReleasesTypes[];
    drillDownProps: DrillDownProps;
    fetchReleases: typeof fetchManifestReleases;
    identifierLabel: string;
    updatedAt: string;
    uploadFileLabel: string;
    viewFilesLabel: string;
}
/** ManifestReleases props interface */
export interface ManifestReleasesProps extends FormConfigProps {
    currentUrl: string;
    formUploadUrl: string;
    uploadTypeUrl: string;
}
/** view all manifest pages */
declare const ManifestReleases: {
    (props: ManifestReleasesProps & ReleasesDefaultProps): JSX.Element;
    /** pass default props to component */
    defaultProps: ReleasesDefaultProps;
};
/** Connected ManifestReleases component */
declare const ConnectedManifestReleases: import("react-redux").ConnectedComponent<{
    (props: ManifestReleasesProps & ReleasesDefaultProps): JSX.Element;
    /** pass default props to component */
    defaultProps: ReleasesDefaultProps;
}, Pick<ManifestReleasesProps & ReleasesDefaultProps, "updatedAt" | "placeholder" | "debounceTime" | "baseURL" | "customAlert" | "endpoint" | "getPayload" | "LoadingComponent" | "appIdLabel" | "appVersionLabel" | "drillDownProps" | "identifierLabel" | "uploadFileLabel" | "viewFilesLabel" | "currentUrl" | "formUploadUrl" | "uploadTypeUrl">>;
export { ManifestReleases, ConnectedManifestReleases };
