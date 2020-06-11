import React, { useEffect } from 'react';
import reducerRegistry from '@onaio/redux-reducer-registry';
import { OpenSRPService, getFetchOptions } from '@opensrp/server-service';
import { DrillDownTable } from '@onaio/drill-down-table';
import { Store } from 'redux';
import { connect } from 'react-redux';
import releasesReducer, {
    fetchManifestReleases,
    reducerName,
    getAllManifestReleasesArray,
    ManifestReleasesTypes,
} from '../../ducks/manifestReleases';

/** Register reducer */
reducerRegistry.register(reducerName, releasesReducer);

/** default props */
interface DefaultProps {
    fetchReleases: typeof fetchManifestReleases;
    data: ManifestReleasesTypes[];
}

/**ManifestReleases props */
export interface ManifestReleasesProps extends DefaultProps {
    baseURL: string;
    endpoint: string;
    getPayload: typeof getFetchOptions;
}

/** view all manifest pages */
const ManifestReleases = (props: ManifestReleasesProps) => {
    const { baseURL, endpoint, getPayload, fetchReleases, data } = props;

    /** get manifest releases from store */
    const getManifests = async () => {
        const clientService = new OpenSRPService(baseURL, endpoint, getPayload);
        await clientService
            .list()
            .then((res: ManifestReleasesTypes[]) => fetchReleases(res))
            .catch(error => console.log(error));
    };

    useEffect(() => {
        getManifests();
    }, []);

    const formatedData = data.map((obj: ManifestReleasesTypes) => {
        return {
            ...obj,
            appVersion: `V${obj.appVersion}`,
            identifier: `V${obj.identifier}`,
            link: <a href="#">View Files</a>,
        };
    });

    const columns = [
        {
            Header: 'Identifier',
            accessor: 'identifier',
        },
        {
            Header: 'APP Id',
            accessor: 'appId',
        },
        {
            Header: 'appVersion',
            accessor: 'appVersion',
        },
        {
            Header: '',
            accessor: 'link',
            disableSortBy: true,
        },
    ];

    const DrillDownTableProps = {
        columns,
        data: formatedData,
        linkerField: 'appId',
        useDrillDown: false,
    };

    return <DrillDownTable {...DrillDownTableProps} />;
};

/** declear default props */
const defaultProps: DefaultProps = {
    fetchReleases: fetchManifestReleases,
    data: [],
};

/** Connect the component to the store */

/** interface to describe props from mapStateToProps */
interface DispatchedStateProps {
    data: ManifestReleasesTypes[];
}

/** pass default props to component */
ManifestReleases.defaultProps = defaultProps;
export { defaultProps };

/** Map props to state
 * @param {Partial<Store>} -  the  redux store
 */
const mapStateToProps = (state: Partial<Store>): DispatchedStateProps => {
    const data = getAllManifestReleasesArray(state);
    return {
        data,
    };
};

/** map dispatch to props */
const mapDispatchToProps = { fetchReleases: fetchManifestReleases };

/** Connected ActiveFI component */
const ConnectedManifestReleases = connect(mapStateToProps, mapDispatchToProps)(ManifestReleases);

export default ConnectedManifestReleases;
