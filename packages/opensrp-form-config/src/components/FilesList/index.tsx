import React, { useEffect, useState, ChangeEvent, MouseEvent } from 'react';
import reducerRegistry from '@onaio/redux-reducer-registry';
import { OpenSRPService, URLParams } from '@opensrp/server-service';
import { SearchBar, SearchBarDefaultProps } from '../SearchBar';
import { Store } from 'redux';
import { DrillDownTable } from '@onaio/drill-down-table';
import { connect } from 'react-redux';
import { FormConfigProps } from '../../helpers/types';
import { handleDownload } from '../../helpers/fileDownload';
import { Link } from 'react-router-dom';
import filesReducer, {
    fetchManifestFiles,
    filesReducerName,
    ManifestFilesTypes,
    getAllManifestFilesArray,
    removeManifestFiles,
} from '../../ducks/manifestFiles';
import { Row, Col } from 'reactstrap';
import {
    DOWNLOAD_LABEL,
    EDIT_LABEL,
    FILE_NAME_LABEL,
    FILE_VERSION_LABEL,
    IDENTIFIER_LABEL,
    UPLOAD_EDIT_LABEL,
    UPOL0AD_FILE_LABEL,
    MODULE_LABEL,
    FIND_FILES_LABEL,
    CREATED_AT_LABEL,
} from '../../constants';
import { Cell } from 'react-table';
import { formatDate } from '../../helpers/utils';

/** Register reducer */
reducerRegistry.register(filesReducerName, filesReducer);

/** default props interface */
interface DefaultProps extends SearchBarDefaultProps {
    createdAt: string;
    data: ManifestFilesTypes[];
    downloadLabel: string;
    editLabel: string;
    fetchFiles: typeof fetchManifestFiles;
    fileNameLabel: string;
    fileVersionLabel: string;
    identifierLabel: string;
    moduleLabel: string;
    removeFiles: typeof removeManifestFiles;
    uploadEditLabel: string;
    uploadFileLabel: string;
}

/** manifest files list props interface */

interface ManifestFilesListProps extends DefaultProps, FormConfigProps {
    downloadEndPoint: string;
    formVersion: string | null;
    fileUploadUrl: string;
    isJsonValidator: boolean;
    uploadTypeUrl: string;
}

/** view manifest forms */
const ManifestFilesList = (props: ManifestFilesListProps) => {
    const {
        baseURL,
        endpoint,
        getPayload,
        LoadingComponent,
        data,
        debounceTime,
        placeholder,
        fetchFiles,
        fileUploadUrl,
        isJsonValidator,
        customAlert,
        formVersion,
        downloadEndPoint,
        removeFiles,
        uploadTypeUrl,
        identifierLabel,
        fileNameLabel,
        fileVersionLabel,
        moduleLabel,
        editLabel,
        uploadEditLabel,
        downloadLabel,
        uploadFileLabel,
        createdAt,
    } = props;

    const [loading, setLoading] = useState(false);
    const [stateData, setStateData] = useState<ManifestFilesTypes[]>(data);

    /** get manifest files */
    const getManifestForms = async () => {
        setLoading(true);
        let params = null;
        // if form version is available -  means request is to get manifest files else get json validator files
        /* eslint-disable-next-line @typescript-eslint/camelcase */
        params = formVersion ? { identifier: formVersion } : { is_json_validator: true };
        removeFiles();
        const clientService = new OpenSRPService(baseURL, endpoint, getPayload);
        await clientService
            .list(params)
            .then((res: ManifestFilesTypes[]) => {
                fetchFiles(res);
            })
            .catch(error => {
                customAlert && customAlert(String(error), { type: 'error' });
            })
            .finally(() => setLoading(false));
    };

    useEffect(() => {
        getManifestForms();
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
        const clientService = new OpenSRPService(baseURL, downloadEndPoint, getPayload);
        await clientService
            .list(params)
            .then(res => {
                handleDownload(res.clientForm.json, name);
            })
            .catch(error => {
                customAlert && customAlert(String(error), { type: 'error' });
            });
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
     * @param {ManifestFilesTypes} obj table row data
     */
    const onDownloadClick = (e: MouseEvent, obj: ManifestFilesTypes) => {
        e.preventDefault();
        const { identifier } = obj;
        const params: URLParams = {
            form_identifier: identifier, // eslint-disable-line @typescript-eslint/camelcase
            form_version: obj.version, // eslint-disable-line @typescript-eslint/camelcase
        };
        if (isJsonValidator) {
            params['is_json_validator'] = true;
        }
        downloadFile(identifier, params);
    };

    /**
     * create edit upload link
     * @param {TableData} obj table row data
     */
    const linkToEditFile = (obj: ManifestFilesTypes) => {
        return <Link to={`${fileUploadUrl}/${uploadTypeUrl}/${obj.id}`}>{uploadEditLabel}</Link>;
    };
    let columns = [
        {
            Header: identifierLabel,
            accessor: `identifier`,
        },
        {
            Header: fileNameLabel,
            accessor: `label`,
        },
        {
            Header: fileVersionLabel,
            accessor: `version`,
            maxWidth: 100,
        },
        {
            Header: createdAt,
            accessor: 'createdAt',
            Cell: ({ value }: Cell) => (() => <span>{formatDate(value)}</span>)(),
            maxWidth: 100,
        },
        {
            Header: moduleLabel,
            accessor: (obj: ManifestFilesTypes) => (() => <span>{obj.module || '_'}</span>)(),
            disableSortBy: true,
            maxWidth: 100,
        },
        {
            Header: editLabel,
            accessor: (obj: ManifestFilesTypes) => linkToEditFile(obj),
            disableSortBy: true,
            maxWidth: 80,
        },
        {
            Header: ' ',
            accessor: (obj: ManifestFilesTypes) =>
                (() => (
                    <a href="#" onClick={e => onDownloadClick(e, obj)}>
                        {downloadLabel}
                    </a>
                ))(),
            disableSortBy: true,
            maxWidth: 80,
        },
    ];

    if (isJsonValidator) {
        columns = columns.filter(col => col.Header !== 'Module');
    }

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
            <Row>
                <Col xs="8">
                    <SearchBar {...searchBarProps} />
                </Col>
                <Col xs="4">
                    {isJsonValidator && (
                        <Link className="btn btn-secondary float-right" to={`${fileUploadUrl}/${uploadTypeUrl}`}>
                            {uploadFileLabel}
                        </Link>
                    )}
                </Col>
            </Row>
            <DrillDownTable {...DrillDownTableProps} />
        </div>
    );
};

/** declear default props */
const defaultProps: DefaultProps = {
    createdAt: CREATED_AT_LABEL,
    data: [],
    debounceTime: 1000,
    downloadLabel: DOWNLOAD_LABEL,
    editLabel: EDIT_LABEL,
    fetchFiles: fetchManifestFiles,
    fileNameLabel: FILE_NAME_LABEL,
    fileVersionLabel: FILE_VERSION_LABEL,
    identifierLabel: IDENTIFIER_LABEL,
    moduleLabel: MODULE_LABEL,
    placeholder: FIND_FILES_LABEL,
    removeFiles: removeManifestFiles,
    uploadEditLabel: UPLOAD_EDIT_LABEL,
    uploadFileLabel: UPOL0AD_FILE_LABEL,
};

/** pass default props to component */
ManifestFilesList.defaultProps = defaultProps;

/** Connect the component to the store */

/** interface to describe props from mapStateToProps */
interface DispatchedStateProps {
    data: ManifestFilesTypes[];
}

/** Map props to state
 * @param {Partial<Store>} -  the  redux store
 */
const mapStateToProps = (state: Partial<Store>): DispatchedStateProps => {
    const data: ManifestFilesTypes[] = getAllManifestFilesArray(state);
    data.sort((a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt));
    return {
        data,
    };
};

/** map dispatch to props */
const mapDispatchToProps = {
    fetchFiles: fetchManifestFiles,
    removeFiles: removeManifestFiles,
};

/** Connected ManifestFilesList component */
const ConnectedManifestFilesList = connect(mapStateToProps, mapDispatchToProps)(ManifestFilesList);

export { ManifestFilesList, ConnectedManifestFilesList };
