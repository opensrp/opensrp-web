import reducerRegistry from '@onaio/redux-reducer-registry';
import * as React from 'react';
import { connect } from 'react-redux';
import { Col, Row } from 'reactstrap';
import { Store } from 'redux';
import Loading from '../../../../components/page/Loading';
import SearchBox from '../../../../components/page/SearchBox';
import { PAGINATION_SIZE, OPENSRP_API_BASE_URL } from '../../../../configs/env';
import { OpenSRPService } from '@opensrp/server-service';
import ANCReducer, {
    fetchANC,
    getAllANCArray,
    removeANCAction,
    reducerName,
    setTotalANCRecords,
    getTotalANCRecords,
    ANCClientType as ANC,
} from '../../../../store/ducks/anc';
import './anc.css';
import Select from 'react-select';
import { OpenSRPTable } from '@opensrp/opensrp-table';
import '../../../../assets/styles/dropdown.css';
import { useANCTableColumns } from './helpers/tableDefinition';
import { generateOptions } from '../../../../services/opensrp';
import '@opensrp/opensrp-table/dist/index.css';
import { DropdownOption, genderOptions } from '../../../../helpers/Dropdown';
import { ANC_CLIENT_TYPE, OPENSRP_CLIENT_ENDPOINT } from '../../../../constants';

reducerRegistry.register(reducerName, ANCReducer);

/** props interface for the ANCList component */
export interface ANCProps {
    opensrpService: typeof OpenSRPService;
    ancArray: ANC[];
    fetchANC: typeof fetchANC;
    removeANC: typeof removeANCAction;
    totalRecords: number;
    setTotalRecords: typeof setTotalANCRecords;
}

/** state interface for the ancList component */
export interface ANCState {
    selectedGender: DropdownOption;
    loading: boolean;
    searchText: string;
}

/** default props for the ancList component */
export const defaultANCProps: ANCProps = {
    opensrpService: OpenSRPService,
    ancArray: [],
    fetchANC: fetchANC,
    removeANC: removeANCAction,
    setTotalRecords: setTotalANCRecords,
    totalRecords: 0,
};

/** default state for the ancList component */
export const defaultANCState: ANCState = {
    selectedGender: { value: '', label: 'All' },
    loading: true,
    searchText: '',
};

/** props interface for the anc table */
export interface ANCTableProps {
    tableData: ANC[];
}

/**
 * generate data for anc table,
 * based on the configuration given in useANCTableColumns
 * @param props
 */
function ANCTable(props: ANCTableProps): React.ReactElement {
    return <OpenSRPTable {...{ data: props.tableData, tableColumns: useANCTableColumns() }} />;
}

/** Display the anc list  */
class ANCList extends React.Component<ANCProps, ANCState> {
    public static defaultProps: ANCProps = defaultANCProps;

    constructor(props: ANCProps) {
        super(props);
        this.state = defaultANCState;
    }

    public componentDidMount() {
        this.getDataFromServer();
    }

    getDataFromServer = async () => {
        const params = {
            clientType: ANC_CLIENT_TYPE,
            pageNumber: '1',
            pageSize: PAGINATION_SIZE,
            gender: this.state.selectedGender.value,
            searchText: this.state.searchText,
        };
        const { fetchANC, opensrpService, setTotalRecords, removeANC } = this.props;
        const clientService = new opensrpService(OPENSRP_API_BASE_URL, OPENSRP_CLIENT_ENDPOINT, generateOptions);
        const response = await clientService.list(params);
        removeANC();
        fetchANC(response.clients);
        setTotalRecords(response.total);
        this.setState({
            ...this.state,
            loading: false,
        });
    };

    searchTextfilter = (searchText: string) => {
        this.setState(
            {
                ...this.state,
                searchText,
            },
            () => {
                this.getDataFromServer();
            },
        );
    };

    public render() {
        const { ancArray, totalRecords } = this.props;
        /** render loader if there are no anc in state */

        if (this.state.loading) {
            return <Loading />;
        } else {
            return (
                <div>
                    <h3 className="household-title"> All ANC ({totalRecords})</h3>
                    <Row>
                        <Col md={9} className="filter-row">
                            <div className="household-search-bar">
                                <SearchBox
                                    searchCallBack={(searchText: string) => this.searchTextfilter(searchText)}
                                    placeholder={`Search ANC`}
                                />
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <ANCTable tableData={ancArray} />
                        </Col>
                    </Row>
                </div>
            );
        }
    }
}

export { ANCList };

/** Interface to describe props from mapStateToProps */
interface DispatchedStateProps {
    ancArray: ANC[];
    totalRecords: number;
}

/** Map props to state  */
const mapStateToProps = (state: Partial<Store>): DispatchedStateProps => {
    const result = {
        ancArray: getAllANCArray(state),
        totalRecords: getTotalANCRecords(state),
    };
    return result;
};

/** map props to actions */
const mapDispatchToProps = {
    fetchANC: fetchANC,
    removeANC: removeANCAction,
    setTotalRecords: setTotalANCRecords,
};

/** connect ancList to the redux store */
const ConnectedANCList = connect(mapStateToProps, mapDispatchToProps)(ANCList);

export default ConnectedANCList;
