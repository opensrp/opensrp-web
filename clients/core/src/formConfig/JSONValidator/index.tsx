import React, { useEffect, useState, ChangeEvent } from 'react';
import { OpenSRPService } from '@opensrp/server-service';
import SearchBar, { SearchBarDefaultProps } from '../SearchBar/searchBar';
import { Store } from 'redux';
import { DrillDownTable } from '@onaio/drill-down-table';
import { connect } from 'react-redux';
import { FormConfigProps } from '../helpers/types';

/** default props interface */
interface DefaultProps extends SearchBarDefaultProps {
    data: string[];
}

/** view JSON validator forms */
const JSONValidator = (props: DefaultProps & FormConfigProps) => {
    const { baseURL, endpoint, getPayload, LoadingComponent, data, debounceTime, placeholder } = props;

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

    const testData = [{ identifier: 12 }];

    const columns = [
        {
            Header: 'Identifier',
            accessor: `identifier`,
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
JSONValidator.defaultProps = defaultProps;
export { JSONValidator };

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

/** Connected JSONValidator component */
const ConnectedManifestFilesList = connect(mapStateToProps)(JSONValidator);

export default ConnectedManifestFilesList;
