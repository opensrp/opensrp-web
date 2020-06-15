import React, { useEffect, useState, ChangeEvent, MouseEvent } from 'react';
import { OpenSRPService } from '@opensrp/server-service';
import SearchBar, { SearchBarDefaultProps } from '../../SearchBar/searchBar';
import { Store } from 'redux';
import { DrillDownTable } from '@onaio/drill-down-table';
import { connect } from 'react-redux';
import { FormConfigProps } from '../../helpers/types';
import {
    fetchManifestReleases,
    getManifestReleasesById,
    ManifestReleasesTypes,
    ManifestJsonFieldType,
} from '../../ducks/manifestReleases';
import { handleDownload } from '../../helpers/serviceHook';
import { Link } from 'react-router-dom';

/** table data interface */
interface TableData {
    fileName: string;
    fileVersion: string;
    identifier: string;
    manifestId: string;
    module: string;
}

/** default props interface */
interface DefaultProps extends SearchBarDefaultProps {
    data: TableData[];
    fetchReleases: typeof fetchManifestReleases;
}

/** manifest files list props interface */
interface ManifestFilesListProps extends DefaultProps, FormConfigProps {
    formVersion: string;
    manifestEndPoint: string;
    fileUploadUrl: string;
}

/** view manifest forms */
const ManifestFilesList = (props: ManifestFilesListProps) => {
    const {
        baseURL,
        endpoint,
        manifestEndPoint,
        getPayload,
        LoadingComponent,
        data,
        debounceTime,
        placeholder,
        fetchReleases,
        fileUploadUrl,
    } = props;

    const [loading, setLoading] = useState(false);
    const [stateData, setStateData] = useState<TableData[]>(data);

    /** get manifest files */
    const getManifests = async () => {
        setLoading(data.length < 1);
        const clientService = new OpenSRPService(baseURL, manifestEndPoint, getPayload);
        await clientService
            .list()
            .then((res: ManifestReleasesTypes[]) => {
                fetchReleases(res);
            })
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

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        const input = e.target.value.toUpperCase();
        const searchResult = data.filter(
            dt =>
                dt.fileName.toUpperCase().includes(input) ||
                dt.identifier.toUpperCase().includes(input) ||
                dt.module.toUpperCase().includes(input),
        );
        setStateData(searchResult);
    };

    /**
     * called when download link is clicked
     * @param {MouseEvent} e
     * @param {TableData} obj table row data
     */
    const onDownloadClick = (e: MouseEvent, obj: TableData) => {
        e.preventDefault();
        const { identifier } = obj;
        const params = {
            form_identifier: identifier, // eslint-disable-line @typescript-eslint/camelcase
            form_version: obj.fileVersion, // eslint-disable-line @typescript-eslint/camelcase
        };
        handleDownload(baseURL, endpoint, getPayload, identifier, params);
    };

    /**
     * create edit upload link
     * @param {TableData} obj table row data
     */
    const linkToEditFile = (obj: TableData) => {
        return <Link to={`${fileUploadUrl}/${obj.manifestId}/${obj.identifier}`}>Upload Edit</Link>;
    };

    /**
     * create download link
     * @param {TableData} obj table row data
     */
    const downLoadLink = (obj: TableData) => {
        return (
            <a href="#" onClick={e => onDownloadClick(e, obj)}>
                Download
            </a>
        );
    };

    const columns = [
        {
            Header: 'Identifier',
            accessor: `identifier`,
        },
        {
            Header: 'File Name',
            accessor: `fileName`,
        },
        {
            Header: 'File Version',
            accessor: `fileVersion`,
        },
        {
            Header: 'Module',
            accessor: `module`,
        },
        {
            Header: 'Edit',
            accessor: (obj: TableData) => linkToEditFile(obj),
            disableSortBy: true,
        },
        {
            Header: ' ',
            accessor: (obj: TableData) => downLoadLink(obj),
            disableSortBy: true,
        },
    ];

    const DrillDownTableProps = {
        columns,
        data: stateData,
        paginate: false,
        useDrillDown: false,
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
    placeholder: 'Find Release Files',
};

/** pass default props to component */
ManifestFilesList.defaultProps = defaultProps;
export { ManifestFilesList };

/** Connect the component to the store */

/** interface to describe props from mapStateToProps */
interface DispatchedStateProps extends SearchBarDefaultProps {
    data: TableData[];
}

/** Map props to state
 * @param {Partial<Store>} -  the  redux store
 */
const mapStateToProps = (state: Partial<Store>, ownProps: ManifestFilesListProps): DispatchedStateProps => {
    const { formVersion } = ownProps;
    const manifest: ManifestReleasesTypes | null = formVersion ? getManifestReleasesById(state, formVersion) : null;
    let data: TableData[] = [];
    if (manifest) {
        const jsonData: ManifestJsonFieldType = JSON.parse(manifest.json);
        data = jsonData.identifiers.map(identifier => ({
            fileVersion: jsonData.forms_version,
            fileName: jsonData.forms_version,
            identifier,
            manifestId: manifest.identifier,
            module: '-',
        }));
    }
    return {
        data,
    };
};

/** map dispatch to props */
const mapDispatchToProps = { fetchReleases: fetchManifestReleases };

/** Connected ManifestFilesList component */
const ConnectedManifestFilesList = connect(mapStateToProps, mapDispatchToProps)(ManifestFilesList);

export default ConnectedManifestFilesList;
