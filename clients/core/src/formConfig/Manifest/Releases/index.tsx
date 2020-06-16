import React, { useEffect, useState, ChangeEvent } from 'react';
import reducerRegistry from '@onaio/redux-reducer-registry';
import { OpenSRPService } from '@opensrp/server-service';
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
import { Col, Row } from 'reactstrap';
import { FormConfigProps } from '../../helpers/types';

/** Register reducer */
reducerRegistry.register(reducerName, releasesReducer);

/** default props interface */
interface DefaultProps extends SearchBarDefaultProps {
    data: ManifestReleasesTypes[];
    fetchReleases: typeof fetchManifestReleases;
    formUploadUrl: string;
}

/** view all manifest pages */
const ManifestReleases = (props: FormConfigProps & DefaultProps) => {
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
        formUploadUrl,
    } = props;

    const [loading, setLoading] = useState(false);
    const [stateData, setStateData] = useState<ManifestReleasesTypes[]>(data);

    /** get manifest releases */
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

    /**
     * create link to manifest files
     * @param {ManifestReleasesTypes} obj
     */
    const linkToFiles = (obj: ManifestReleasesTypes) => {
        let link = null;
        try {
            JSON.parse(obj.json);
            link = <Link to={`${currentUrl}/${obj.identifier}`}>View Files</Link>;
        } catch {
            link = <span>View Files</span>;
        }
        return link;
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
            accessor: (obj: ManifestReleasesTypes) => linkToFiles(obj),
            disableSortBy: true,
        },
    ];

    const DrillDownTableProps = {
        columns,
        data: stateData,
        paginate: false,
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
            <Row>
                <Col xs="8">
                    <SearchBar {...searchBarProps} />
                </Col>
                <Col xs="4">
                    <Link className="btn btn-secondary float-right" to={formUploadUrl}>
                        Upload New File
                    </Link>
                </Col>
            </Row>
            <DrillDownTable {...DrillDownTableProps} />
        </div>
    );
};

/** declear default props */
const defaultProps: DefaultProps = {
    data: [],
    debounceTime: 1000,
    fetchReleases: fetchManifestReleases,
    formUploadUrl: '',
    placeholder: 'Find Release',
};

/** pass default props to component */
ManifestReleases.defaultProps = defaultProps;
export { ManifestReleases };

/** Connect the component to the store */

/** interface to describe props from mapStateToProps */
interface DispatchedStateProps {
    data: ManifestReleasesTypes[];
}

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

/** Connected ManifestReleases component */
const ConnectedManifestReleases = connect(mapStateToProps, mapDispatchToProps)(ManifestReleases);

export default ConnectedManifestReleases;
