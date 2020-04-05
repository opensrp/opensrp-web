import reducerRegistry from '@onaio/redux-reducer-registry';
import * as React from 'react';
import { connect } from 'react-redux';
import { Col, Row } from 'reactstrap';
import { Store } from 'redux';
import Loading from '../../../../components/page/Loading';
import SearchBox from '../../../../components/page/SearchBox';
import { PAGINATION_SIZE, OPENSRP_API_BASE_URL } from '../../../../configs/env';
import { OpenSRPService } from '@opensrp/server-service';
import locationreducer, {
    fetchLocationList,
    getLocationArray,
    removeLocationList,
    reducerName,
    setTotalRecords,
    getTotalRecords,
    Location,
} from '../../../../store/ducks/adminLocation';
import './locationList.css';
import { OpenSRPTable } from '@opensrp/opensrp-table';
import '../../../../assets/styles/dropdown.css';
import { useLocationTableColumns } from './helpers/tableDefinition';
import { generateOptions } from '../../../../services/opensrp';
import '@opensrp/opensrp-table/dist/index.css';
import { OPENSRP_ADMIN_ENDPOINT } from '../../../../constants';

reducerRegistry.register(reducerName, locationreducer);

/** props interface for the locationList component */
export interface LocationListProps {
    opensrpService: typeof OpenSRPService;
    locationArray: Location[];
    fetchLocation: typeof fetchLocationList;
    removeLocation: typeof removeLocationList;
    totalRecords: number;
    setTotalRecords: typeof setTotalRecords;
}

/** state interface for the locationList component */
export interface LocationListState {
    loading: boolean;
    searchText: string;
    currentPage: number;
}

/** default props for the locationList component */
export const defaultLocationListProps: LocationListProps = {
    opensrpService: OpenSRPService,
    locationArray: [],
    fetchLocation: fetchLocationList,
    removeLocation: removeLocationList,
    setTotalRecords: setTotalRecords,
    totalRecords: 0,
};

/** default state for the locationList component */
export const defaultLocationState: LocationListState = {
    loading: true,
    searchText: '',
    currentPage: 1,
};

/** props interface for the location table */
export interface LocationTableProps {
    tableData: Location[];
}

/**
 * generate data for location table,
 * based on the configuration given in useLocationTableColumns
 * @param props
 */
function LocationTable(props: LocationTableProps): React.ReactElement {
    return <OpenSRPTable {...{ data: props.tableData, tableColumns: useLocationTableColumns() }} />;
}

/** Display the location list  */
class LocationList extends React.Component<LocationListProps, LocationListState> {
    public static defaultProps: LocationListProps = defaultLocationListProps;

    constructor(props: LocationListProps) {
        super(props);
        this.state = defaultLocationState;
    }

    public componentDidMount() {
        this.getDataFromServer();
    }

    getDataFromServer = async () => {
        const params = {
            clientType: '',
            pageNumber: this.state.currentPage,
            pageSize: PAGINATION_SIZE,
            searchText: this.state.searchText,
        };
        const { fetchLocation, opensrpService, setTotalRecords, removeLocation } = this.props;
        const clientService = new opensrpService(OPENSRP_API_BASE_URL, OPENSRP_ADMIN_ENDPOINT, generateOptions);
        const response = await clientService.list(params);
        removeLocation();
        fetchLocation(response.clients);
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
        const { locationArray, totalRecords } = this.props;
        /** render loader if there are no child in state */

        if (this.state.loading) {
            return <Loading />;
        } else {
            return (
                <div>
                    <h3 className="household-title"> Location ({totalRecords})</h3>
                    <Row>
                        <Col md={9} className="filter-row">
                            <div className="household-search-bar">
                                <SearchBox
                                    searchCallBack={(searchText: string) => this.searchTextfilter(searchText)}
                                    placeholder={`Search Location`}
                                />
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <LocationTable tableData={locationArray} />
                        </Col>
                    </Row>
                </div>
            );
        }
    }
}

export { LocationList };

/** Interface to describe props from mapStateToProps */
interface DispatchedStateProps {
    locationArray: Location[];
    totalRecords: number;
}

/** Map props to state  */
const mapStateToProps = (state: Partial<Store>): DispatchedStateProps => {
    const result = {
        locationArray: getLocationArray(state),
        totalRecords: getTotalRecords(state),
    };
    return result;
};

/** map props to actions */
const mapDispatchToProps = {
    fetchChild: fetchLocationList,
    removeChild: removeLocationList,
    setTotalRecords: setTotalRecords,
};

/** connect childList to the redux store */
const ConnectedChildList = connect(mapStateToProps, mapDispatchToProps)(LocationList);

export default ConnectedChildList;
