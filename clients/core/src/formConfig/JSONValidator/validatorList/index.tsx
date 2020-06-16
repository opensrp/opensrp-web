import React, { useEffect, useState, ChangeEvent, MouseEvent } from 'react';
import { OpenSRPService, URLParams } from '@opensrp/server-service';
import SearchBar, { SearchBarDefaultProps } from '../../SearchBar/searchBar';
import { Store } from 'redux';
import { DrillDownTable } from '@onaio/drill-down-table';
import { connect } from 'react-redux';
import { FormConfigProps } from '../../helpers/types';
import { Link } from 'react-router-dom';
import { handleDownload } from '../../helpers/fileDownload';

/** table data interface */

interface TableData {
    filename: string;
    fileVersion: string;
    identifier: string;
}
/** default props interface */
interface DefaultProps extends SearchBarDefaultProps {
    data: string[];
}

/** view JSON validator forms */
const JSONValidatorList = (props: DefaultProps & FormConfigProps) => {
    const { baseURL, endpoint, getPayload, LoadingComponent, data, debounceTime, placeholder, currentUrl } = props;

    const [loading, setLoading] = useState(false);
    const [stateData, setStateData] = useState<string[]>(data);

    /** get JSON validator files */
    const getValidatorFiles = async () => {
        setLoading(data.length < 1);
        const clientService = new OpenSRPService(baseURL, endpoint, getPayload);
        await clientService
            .list()
            .then((res: any) => {
                console.log(res);
            })
            .catch(error => {
                console.log(error);
                // to handle error
            })
            .finally(() => setLoading(false));
    };

    useEffect(() => {
        getValidatorFiles();
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
        const clientService = new OpenSRPService(baseURL, endpoint, getPayload);
        await clientService
            .list(params)
            .then(res => {
                handleDownload(res.clientForm.json, name);
            })
            .catch(() => {
                // to handle error
            })
            .finally(() => setLoading(false));
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

        downloadFile('blood_screening.json', params);
    };

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        const input = e.target.value.toUpperCase();
        // const searchResult = data.filter(
        //     dt =>
        //         dt.appId.toUpperCase().includes(input) ||
        //         dt.appVersion.toUpperCase().includes(input) ||
        //         dt.identifier.toUpperCase().includes(input),
        // );
        // setStateData(searchResult);
    };

    /**
     * create edit upload link
     * @param {TableData} obj table row data
     */
    const linkToEditFile = (_: TableData) => {
        return <Link to={currentUrl}>Upload Edit</Link>;
    };

    const testData = [
        {
            filename: 'testData.json',
            fileVersion: '1.0.1',
            identifier: '12',
        },
    ];

    const columns = [
        {
            Header: 'Identifier',
            accessor: `identifier`,
        },
        {
            Header: 'File Name',
            accessor: `filename`,
        },
        {
            Header: 'File Version',
            accessor: `fileVersion`,
        },
        {
            Header: 'Edit',
            accessor: (obj: TableData) => linkToEditFile(obj),
            disableSortBy: true,
        },
        {
            Header: ' ',
            accessor: (obj: TableData) =>
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
        data: testData || stateData,
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
    placeholder: 'Find JSON Validator',
};

/** pass default props to component */
JSONValidatorList.defaultProps = defaultProps;
export { JSONValidatorList };

/** Connect the component to the store */

/** interface to describe props from mapStateToProps */
interface DispatchedStateProps {
    data: string[];
}

/** Map props to state
 * @param {Partial<Store>} -  the  redux store
 */
const mapStateToProps = (_: Partial<Store>): DispatchedStateProps => {
    const data: string[] = [];
    return {
        data,
    };
};

/** Connected JSONValidatorList component */
const ConnectedJSONValidatorList = connect(mapStateToProps)(JSONValidatorList);

export default ConnectedJSONValidatorList;
