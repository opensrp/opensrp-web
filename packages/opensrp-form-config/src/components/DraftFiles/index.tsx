import React, { useEffect, useState, ChangeEvent, MouseEvent } from 'react';
import reducerRegistry from '@onaio/redux-reducer-registry';
import { OpenSRPService, URLParams } from '@opensrp/server-service';
import { SearchBar, SearchBarDefaultProps } from '../SearchBar';
import { Store } from 'redux';
import { DrillDownTable } from '@onaio/drill-down-table';
import { connect } from 'react-redux';
import { FormConfigProps } from '../../helpers/types';
import { handleDownload } from '../../helpers/fileDownload';
import DraftFilesReducer, {
    fetchManifestDraftFiles,
    draftReducerName,
    getAllManifestDraftFilesArray,
    removeManifestDraftFiles,
} from '../../ducks/manifestDraftFiles';
import { Button } from 'reactstrap';
import { ManifestFilesTypes } from '../../ducks/manifestFiles';
import { Redirect } from 'react-router';
import {
    MAKE_RELEASE_LABEL,
    FILE_NAME_LABEL,
    FILE_VERSION_LABEL,
    IDENTIFIER_LABEL,
    MODULE_LABEL,
    DOWNLOAD_LABEL,
    FIND_DRAFT_RELEASES_LABEL,
} from '../../constants';

/** Register reducer */
reducerRegistry.register(draftReducerName, DraftFilesReducer);

/** default props interface */
interface DefaultProps extends SearchBarDefaultProps {
    clearDraftFiles: typeof removeManifestDraftFiles;
    data: ManifestFilesTypes[];
    downloadLabel: string;
    fetchDraftFiles: typeof fetchManifestDraftFiles;
    fileNameLabel: string;
    fileVersionLabel: string;
    identifierLabel: string;
    makeReleaseLabel: string;
    moduleLabel: string;
}

/** manifest Draft files props interface */
interface ManifestDraftFilesProps extends DefaultProps, FormConfigProps {
    downloadEndPoint: string;
    manifestEndPoint: string;
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
        customAlert,
        downloadEndPoint,
        releasesUrl,
        manifestEndPoint,
        makeReleaseLabel,
        identifierLabel,
        fileNameLabel,
        fileVersionLabel,
        moduleLabel,
        downloadLabel,
    } = props;

    const [loading, setLoading] = useState(false);
    const [stateData, setStateData] = useState<ManifestFilesTypes[]>(data);
    const [ifDoneHere, setIfDoneHere] = useState(false);

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
     * create a manifest file
     * @param {MouseEvent} e
     */
    const onMakeReleaseClick = async (e: MouseEvent) => {
        e.preventDefault();
        const identifiers = data.map(form => form.identifier);
        const json = {
            /* eslint-disable-next-line @typescript-eslint/camelcase */
            forms_version: data[0].version,
            identifiers,
        };
        const clientService = new OpenSRPService(baseURL, manifestEndPoint, getPayload);
        await clientService
            .create({ json: JSON.stringify(json) })
            .then(() => {
                clearDraftFiles();
                setIfDoneHere(true);
            })
            .catch(err => {
                customAlert && customAlert(String(err), { type: 'error' });
            });
    };

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

    const columns = [
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
        },
        {
            Header: moduleLabel,
            accessor: (obj: ManifestFilesTypes) => (() => <span>{obj.module || '_'}</span>)(),
            disableSortBy: true,
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

    if (ifDoneHere) {
        return <Redirect to={releasesUrl} />;
    }

    return (
        <div>
            <SearchBar {...searchBarProps} />
            <DrillDownTable {...DrillDownTableProps} />
            {data.length > 0 && (
                <Button className="btn btn-md btn btn-primary float-right" color="primary" onClick={onMakeReleaseClick}>
                    {makeReleaseLabel}
                </Button>
            )}
        </div>
    );
};

/** declear default props */
const defaultProps: DefaultProps = {
    clearDraftFiles: removeManifestDraftFiles,
    data: [],
    debounceTime: 1000,
    downloadLabel: DOWNLOAD_LABEL,
    fetchDraftFiles: fetchManifestDraftFiles,
    fileNameLabel: FILE_NAME_LABEL,
    fileVersionLabel: FILE_VERSION_LABEL,
    identifierLabel: IDENTIFIER_LABEL,
    makeReleaseLabel: MAKE_RELEASE_LABEL,
    moduleLabel: MODULE_LABEL,
    placeholder: FIND_DRAFT_RELEASES_LABEL,
};

/** pass default props to component */
ManifestDraftFiles.defaultProps = defaultProps;

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
    data.sort((a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt));
    return {
        data,
    };
};

/** map dispatch to props */
const mapDispatchToProps = {
    clearDraftFiles: removeManifestDraftFiles,
    fetchDraftFiles: fetchManifestDraftFiles,
};

/** Connected ManifestDraftFiles component */
const ConnectedManifestDraftFiles = connect(mapStateToProps, mapDispatchToProps)(ManifestDraftFiles);

export { ManifestDraftFiles, ConnectedManifestDraftFiles };
