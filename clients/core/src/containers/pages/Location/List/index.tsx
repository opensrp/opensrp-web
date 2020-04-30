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
import Select from 'react-select';
import { DropdownOption } from '../../../../helpers/Dropdown';
import { Link } from 'react-router-dom';

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

    getDataFromServer = async (): Promise<void> => {
        const params = {
            pageSize: 10,
            pageNumber: 1,
        };
        const { fetchLocation, opensrpService, setTotalRecords, removeLocation } = this.props;
        const clientService = new opensrpService(OPENSRP_API_BASE_URL, 'location/search-by-tag', generateOptions);
        const response = await clientService.list(params);
        // removeLocation();
        // fetchLocation(response.clients);
        // setTotalRecords(response.total);
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

    public render(): ReturnType<React.FC> {
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
