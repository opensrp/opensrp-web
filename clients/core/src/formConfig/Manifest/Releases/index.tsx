import React, { useState, useEffect } from 'react';
import reducerRegistry from '@onaio/redux-reducer-registry';
import { OpenSRPService, getFetchOptions } from '@opensrp/server-service';
import { Store } from 'redux';
import { connect } from 'react-redux';
import releasesReducer, { fetchManifestReleases, reducerName } from '../../ducks/manifestReleases';

/** Register reducer */
reducerRegistry.register(reducerName, releasesReducer);

/** default props */
interface DefaultProps {
    fetchReleases: typeof fetchManifestReleases;
}

/**ManifestReleases props */
export interface ManifestReleasesProps extends DefaultProps {
    baseURL: string;
    endpoint: string;
    getPayload: typeof getFetchOptions;
    LoadingComponent?: React.ElementType<any>;
}
/** view all manifest pages */
const ManifestReleases = (props: ManifestReleasesProps) => {
    const { baseURL, endpoint, getPayload, LoadingComponent, fetchReleases } = props;

    const [loading, setLoading] = useState(true);

    const getManifests = async () => {
        const clientService = new OpenSRPService(baseURL, endpoint, getPayload);
        await clientService
            .list()
            .then(res => {
                fetchReleases(res);
                console.log(res);
            })
            .catch(error => console.log(error));
    };

    useEffect(() => {
        getManifests();
    }, []);

    if (loading && LoadingComponent) {
        // const LoadingComp = loadingComponent;
        // /@typescript-eslint/no-unused-expressions
        // <LoadingComponent />
    }

    return <div>Manifest releases</div>;
};

/** declear default props */
const defaultProps: DefaultProps = {
    fetchReleases: fetchManifestReleases,
};

ManifestReleases.defaultProps = defaultProps;
export { defaultProps };

/** Map props to state
 * @param {Partial<Store>} -  the  redux store
 * @param {any} ownprops - components props
 */
const mapStateToProps = (state: Partial<Store>, ownProps: ManifestReleasesProps) => {
    // const plan = getPlanById(state, ownProps.match.params.id);
    return {};
};

/** map dispatch to props */
const mapDispatchToProps = { fetchReleases: fetchManifestReleases };

/** Connected ActiveFI component */
const ConnectedManifestReleases = connect(mapStateToProps, mapDispatchToProps)(ManifestReleases);

export default ConnectedManifestReleases;
