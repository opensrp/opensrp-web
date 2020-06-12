import React, { useEffect, useState } from 'react';
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

/** table data interface */
interface TableData extends ManifestReleasesTypes {
    link: JSX.Element;
}

/** default props interface */
interface DefaultProps {
    fetchReleases: typeof fetchManifestReleases;
    data: ManifestReleasesTypes[];
}

/**ManifestReleases props interface*/
export interface ManifestReleasesProps extends DefaultProps {
    baseURL: string;
    endpoint: string;
    getPayload: typeof getFetchOptions;
    LoadingComponent?: JSX.Element;
}

/** view all manifest pages */
const ManifestReleases = (props: ManifestReleasesProps) => {
    const { baseURL, endpoint, getPayload, fetchReleases, data, LoadingComponent } = props;

    const [loading, setLoading] = useState(false);
    const [formatedData, setFormatedData] = useState<TableData[]>([]);

    /** get manifest releases from store */
    const getManifests = async () => {
        setLoading(data.length < 1);
        const clientService = new OpenSRPService(baseURL, endpoint, getPayload);
        await clientService
            .list()
            .then((res: ManifestReleasesTypes[]) => fetchReleases(res))
            .catch(() => {
                // to handle error
            })
            .finally(() => setLoading(false));
    };

    useEffect(() => {
        if (!data.length) {
            getManifests();
        }
    }, []);

    useEffect(() => {
        const formatData = data.map((obj: ManifestReleasesTypes) => ({
            ...obj,
            appVersion: `V${obj.appVersion}`,
            identifier: `V${obj.identifier}`,
            link: <a href="#">View Files</a>,
        }));
        setFormatedData(formatData);
    }, [data]);

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
        useDrillDown: false,
    };

    if (LoadingComponent && loading) {
        return <div>{LoadingComponent}</div>;
    }

    return (
        <div>
            <DrillDownTable {...DrillDownTableProps} />
        </div>
    );
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
