import React, { useEffect, useState, ChangeEvent } from 'react';
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
import SearchBar, { SearchBarDefaultProps } from '../../SearchBar/searchBar';
import { Link } from 'react-router-dom';

/** Register reducer */
reducerRegistry.register(reducerName, releasesReducer);

/** table data interface */
interface TableData extends ManifestReleasesTypes {
    link: JSX.Element;
}

/** default props interface */
interface DefaultProps extends SearchBarDefaultProps {
    fetchReleases: typeof fetchManifestReleases;
    data: ManifestReleasesTypes[];
}

/**ManifestReleases props interface*/
export interface ManifestReleasesProps extends DefaultProps {
    baseURL: string;
    currentUrl: string;
    endpoint: string;
    getPayload: typeof getFetchOptions;
    LoadingComponent?: JSX.Element;
}

/** view all manifest pages */
const ManifestReleases = (props: ManifestReleasesProps) => {
    const {
        baseURL,
        endpoint,
        getPayload,
        fetchReleases,
        data,
        LoadingComponent,
        debounceTime,
        placeholder,
        currentUrl,
    } = props;

    const [loading, setLoading] = useState(false);
    const [stateData, setStateData] = useState<ManifestReleasesTypes[]>(data);

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
        setStateData(data);
    }, [data]);

    const test = (obj: ManifestReleasesTypes) => {
        return <Link to={`${currentUrl}/${obj.identifier}`}>View Files</Link>;
    };

    const columns = [
        {
            Header: 'Identifier',
            accessor: (obj: ManifestReleasesTypes) => `V${obj.identifier}`,
        },
        {
            Header: 'APP Id',
            accessor: 'appId',
        },
        {
            Header: 'App Version',
            accessor: (obj: ManifestReleasesTypes) => `V${obj.appVersion}`,
        },
        {
            Header: ' ',
            accessor: (obj: ManifestReleasesTypes) => test(obj),
            disableSortBy: true,
        },
    ];

    const DrillDownTableProps = {
        columns,
        data: stateData,
        useDrillDown: false,
    };

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        const input = e.target.value.toUpperCase();
        const searchResult = data.filter(
            dt =>
                dt.appId.toUpperCase().includes(input) ||
                dt.appVersion.toUpperCase().includes(input) ||
                dt.identifier.toUpperCase().includes(input),
        );
        setStateData(searchResult);
    };

    const searchBarProps = {
        debounceTime,
        onChangeHandler,
        placeholder,
    };

    if (LoadingComponent && loading) {
        return <div>{LoadingComponent}</div>;
    }

    return (
        <div>
            <SearchBar {...searchBarProps} />
            <DrillDownTable {...DrillDownTableProps} />
        </div>
    );
};

/** declear default props */
const defaultProps: DefaultProps = {
    data: [],
    debounceTime: 1000,
    fetchReleases: fetchManifestReleases,
    placeholder: 'Find Release',
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
