import React, { useEffect, useState, ChangeEvent, MouseEvent } from 'react';
import reducerRegistry from '@onaio/redux-reducer-registry';
import { OpenSRPService, URLParams } from '@opensrp/server-service';
import SearchBar, { SearchBarDefaultProps } from '../SearchBar/searchBar';
import { Store } from 'redux';
import { DrillDownTable } from '@onaio/drill-down-table';
import { connect } from 'react-redux';
import { FormConfigProps } from '../../helpers/types';
import { handleDownload } from '../../helpers/fileDownload';
import DraftFilesReducer, {
    fetchManifestDraftFiles,
    draftReducerName,
    getAllManifestDraftFilesArray,
} from '../../ducks/manifestDraftFiles';
import { Button } from 'reactstrap';
import { ManifestFilesTypes } from '../../ducks/manifestFiles';
import { Redirect } from 'react-router';

/** Register reducer */
reducerRegistry.register(draftReducerName, DraftFilesReducer);

/** default props interface */
interface DefaultProps extends SearchBarDefaultProps {
    clearDraftFiles: typeof fetchManifestDraftFiles;
    data: ManifestFilesTypes[];
    fetchDraftFiles: typeof fetchManifestDraftFiles;
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
        growl,
        downloadEndPoint,
        releasesUrl,
        manifestEndPoint,
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
                growl && growl(String(error), { type: 'error' });
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
        const { headers } = getPayload(new AbortController().signal, 'POST');
        const identifiers = data.map(form => form.identifier);
        const json = {
            /* eslint-disable-next-line @typescript-eslint/camelcase */
            forms_version: data[0].version,
            identifiers,
        };
        const postdata = JSON.stringify({ json: JSON.stringify(json) });
        const response = await fetch(`${baseURL}${manifestEndPoint}`, {
            body: postdata,
            headers: {
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                Authorization: (headers as any).authorization || (headers as any).Authorization,
                'Content-Type': 'application/json',
            },
            method: 'POST',
        });
        if (response) {
            if (response.status == 201 || response.ok) {
                return setIfDoneHere(true);
            } else {
                const defaultMessage = `OpenSRPService create on ${manifestEndPoint} failed, HTTP status ${response?.status}`;
                growl && growl(defaultMessage, { type: 'error' });
            }
        }
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
                growl && growl(String(error), { type: 'error' });
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
    data.sort((a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt));
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