import React, { useEffect, useState, ChangeEvent, MouseEvent } from 'react';
import reducerRegistry from '@onaio/redux-reducer-registry';
import { OpenSRPService, URLParams } from '@opensrp/server-service';
import SearchBar, { SearchBarDefaultProps } from '../../SearchBar/searchBar';
import { Store } from 'redux';
import { DrillDownTable } from '@onaio/drill-down-table';
import { connect } from 'react-redux';
import { FormConfigProps } from '../../helpers/types';
import { handleDownload } from '../../helpers/fileDownload';
import DraftFilesReducer, {
    fetchManifestDraftFiles,
    reducerName,
    getAllManifestDraftFilesArray,
} from '../../ducks/manifestDraftFiles';
import { Button } from 'reactstrap';
import { ManifestFilesTypes } from '../../ducks/manifestFiles';

/** Register reducer */
reducerRegistry.register(reducerName, DraftFilesReducer);

/** default props interface */
interface DefaultProps extends SearchBarDefaultProps {
    clearDraftFiles: typeof fetchManifestDraftFiles;
    data: ManifestFilesTypes[];
    fetchDraftFiles: typeof fetchManifestDraftFiles;
}

/** manifest Draft files props interface */
interface ManifestDraftFilesProps extends DefaultProps, FormConfigProps {
    downloadEndPoint: string;
    releasesUrl: string;
}

/** view manifest forms */
const ManifestDraftFiles = (props: ManifestDraftFilesProps) => {
    const {
        baseURL,
        endpoint,
        getPayload,
        LoadingComponent,
        data,
        debounceTime,
        placeholder,
        fetchDraftFiles,
        clearDraftFiles,
        growl,
        downloadEndPoint,
    } = props;

    const [loading, setLoading] = useState(false);
    const [stateData, setStateData] = useState<ManifestFilesTypes[]>(data);

    /** get manifest Draftfiles */
    const getManifestForms = async () => {
        setLoading(data.length < 1);
        /* eslint-disable-next-line @typescript-eslint/camelcase */
        const params = { is_draft: true };
        const clientService = new OpenSRPService(baseURL, endpoint, getPayload);
        await clientService
            .list(params)
            .then((res: ManifestFilesTypes[]) => {
                fetchDraftFiles(res);
            })
            .catch(error => {
                growl && growl(String(error), { type: 'error' });
            })
            .finally(() => setLoading(false));
    };

    useEffect(() => {
        if (!data.length) {
            getManifestForms();
        }
    }, []);

    useEffect(() => {
        setStateData(data);
    }, [data]);

    /**
     *
     * @param {string} name name of file
     * @param {URLParams} params url params
     */
    const downloadFile = async (name: string, params: URLParams) => {
        setLoading(true);
        const clientService = new OpenSRPService(baseURL, downloadEndPoint, getPayload);
        await clientService
            .list(params)
            .then(res => {
                handleDownload(res.clientForm.json, name);
            })
            .catch(error => {
                growl && growl(String(error), { type: 'error' });
            })
            .finally(() => setLoading(false));
    };

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        const input = e.target.value.toUpperCase();
        const searchResult = data.filter(
            dt =>
                dt.label.toUpperCase().includes(input) ||
                dt.identifier.toUpperCase().includes(input) ||
                (dt.module && dt.module.toUpperCase().includes(input)),
        );
        setStateData(searchResult);
    };

    /**
     * called when download link is clicked
     * @param {MouseEvent} e
     * @param {ManifestDraftFilesTypes} obj table row data
     */
    const onDownloadClick = (e: MouseEvent, obj: ManifestFilesTypes) => {
        e.preventDefault();
        const { identifier } = obj;
        const params = {
            form_identifier: identifier, // eslint-disable-line @typescript-eslint/camelcase
            form_version: obj.version, // eslint-disable-line @typescript-eslint/camelcase
        };

        downloadFile(identifier, params);
    };

    /**
     * called when download link is clicked
     * @param {MouseEvent} e
     * @param {ManifestDraftFilesTypes} obj table row data
     */
    const onDeleteClick = async (e: MouseEvent, obj: ManifestFilesTypes) => {
        e.preventDefault();
        setLoading(true);
        const clientService = new OpenSRPService(baseURL, endpoint, getPayload);
        await clientService
            .delete()
            .then(() => {
                clearDraftFiles();
            })
            .catch(error => {
                growl && growl(String(error), { type: 'error' });
            })
            .finally(() => setLoading(false));
    };

    const columns = [
        {
            Header: 'Identifier',
            accessor: `identifier`,
        },
        {
            Header: 'File Name',
            accessor: `label`,
        },
        {
            Header: 'File Version',
            accessor: `version`,
        },
        {
            Header: 'Module',
            accessor: (obj: ManifestFilesTypes) => (() => <span>{obj.module || '_'}</span>)(),
            disableSortBy: true,
        },
        {
            Header: ' ',
            accessor: (obj: ManifestFilesTypes) =>
                (() => (
                    <a href="#" onClick={e => onDownloadClick(e, obj)}>
                        Download
                    </a>
                ))(),
            disableSortBy: true,
        },
        {
            Header: '   ',
            accessor: (obj: ManifestFilesTypes) =>
                (() => (
                    <a className="cancel-icon" href="#" onClick={e => onDeleteClick(e, obj)}>
                        <span style={{ margin: '3px' }}>X</span>
                    </a>
                ))(),
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
            {data.length && (
                <Button className="btn btn-md btn btn-primary float-right" color="primary">
                    Make Release
                </Button>
            )}
        </div>
    );
};

/** declear default props */
const defaultProps: DefaultProps = {
    clearDraftFiles: fetchManifestDraftFiles,
    data: [],
    debounceTime: 1000,
    fetchDraftFiles: fetchManifestDraftFiles,
    placeholder: 'Find Draft Files',
};

/** pass default props to component */
ManifestDraftFiles.defaultProps = defaultProps;
export { ManifestDraftFiles };

/** Connect the component to the store */

/** interface to describe props from mapStateToProps */
interface DispatchedStateProps {
    data: ManifestFilesTypes[];
}

/** Map props to state
 * @param {Partial<Store>} -  the  redux store
 */
const mapStateToProps = (state: Partial<Store>): DispatchedStateProps => {
    const data: ManifestFilesTypes[] = getAllManifestDraftFilesArray(state);
    return {
        data,
    };
};

/** map dispatch to props */
const mapDispatchToProps = {
    clearDraftFiles: fetchManifestDraftFiles,
    fetchDraftFiles: fetchManifestDraftFiles,
};

/** Connected ManifestDraftFiles component */
const ConnectedManifestDraftFiles = connect(mapStateToProps, mapDispatchToProps)(ManifestDraftFiles);

export default ConnectedManifestDraftFiles;
