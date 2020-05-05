import reducerRegistry from '@onaio/redux-reducer-registry';
import * as React from 'react';
import { connect } from 'react-redux';
import { Col, Row } from 'reactstrap';
import { Store } from 'redux';
import Loading from '../../../../components/page/Loading';
import SearchBox from '../../../../components/page/SearchBox';
import { PAGINATION_SIZE, OPENSRP_API_BASE_URL, OPENSRP_LOCATION_ENDPOINT } from '../../../../configs/env';
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
import Select from 'react-select';
import { DropdownOption } from '../../../../helpers/Dropdown';
import { Link } from 'react-router-dom';
import { Pagination, Props as PaginationProps } from '../../../../components/Pagination';
import { PAGINATION_NEIGHBORS } from '../../../../constants';
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
    selectedProvince: DropdownOption;
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
    selectedProvince: { value: '', label: 'All' },
    loading: false,
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

    public componentDidMount(): void {
        this.getDataFromServer();
    }

    getDataFromServer = async () => {
        const params = {
            pageSize: PAGINATION_SIZE,
            pageNumber: this.state.currentPage,
            name: this.state.searchText,
        };
        const { fetchLocation, opensrpService, setTotalRecords, removeLocation } = this.props;
        const locationService = new opensrpService(OPENSRP_API_BASE_URL, OPENSRP_LOCATION_ENDPOINT, generateOptions);
        const response = await locationService.list(params);
        removeLocation();
        fetchLocation(response.locations);
        setTotalRecords(response.total);
        this.setState({
            ...this.state,
            loading: false,
        });
    };

    searchTextfilter = (searchText: string): void => {
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

    /** fetch data from server with a specific page number */
    onPageChange = (currentPage: number): void => {
        this.setState(
            {
                ...this.state,
                currentPage,
            },
            () => {
                this.getDataFromServer();
            },
        );
    };

    getPaginationOptions = (): PaginationProps => {
        return {
            onPageChangeHandler: this.onPageChange,
            pageNeighbors: PAGINATION_NEIGHBORS,
            pageSize: PAGINATION_SIZE,
            totalRecords: this.props.totalRecords,
        };
    };

    public render() {
        const { locationArray } = this.props;
        /** render loader if there are no location in state */

        if (this.state.loading) {
            return <Loading />;
        } else {
            return (
                <div style={{ fontSize: '14px' }}>
                    <h3 className="location-title"> Locations - Provinces</h3>
                    <Row>
                        <Col md={12} className="new-province">
                            <Link to="/"> + Add new province </Link>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={1}>Level: </Col>
                        <Col md={2} className="province-dropdown">
                            <Select
                                value={this.state.selectedProvince}
                                classNamePrefix="select"
                                className="basic-single"
                                onChange={(e): void => {
                                    console.log(e);
                                }}
                            />
                        </Col>
                        <Col md={{ size: 5, offset: 4 }} className="filter-row">
                            <div className="location-search-bar">
                                <SearchBox searchCallBack={this.searchTextfilter} placeholder={`Search Provinces`} />
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <LocationTable tableData={locationArray} />
                        </Col>
                    </Row>
                    <Row>
                        <Col md={{ size: 3, offset: 3 }}>
                            <Pagination {...this.getPaginationOptions()} />
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
    fetchLocation: fetchLocationList,
    removeLocation: removeLocationList,
    setTotalRecords: setTotalRecords,
};

/** connect locationList to the redux store */
const ConnectedLocationList = connect(mapStateToProps, mapDispatchToProps)(LocationList);

export default ConnectedLocationList;
