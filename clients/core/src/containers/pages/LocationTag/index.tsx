import reducerRegistry from '@onaio/redux-reducer-registry';
import * as React from 'react';
import { connect } from 'react-redux';
import { Row, Col } from 'reactstrap';
import { Store } from 'redux';
import Loading from '../../../components/page/Loading';
import { OPENSRP_API_BASE_URL, OPENSRP_LOCATION_TAG_ENDPOINT } from '../../../configs/env';
import { OpenSRPService } from '@opensrp/server-service';
import locationTagReducer, {
    LocationTag,
    fetchLocationTags,
    getLocationtagsArray,
    reducerName as locationTagReducerName,
    removeLocationTags,
} from '../../../store/ducks/locationTag';
import './locationTag.css';
import { generateOptions } from '../../../services/opensrp';
import { useLocationTagTableColumns } from './helpers/tableDefinition';
import { OpenSRPTable } from '@opensrp/opensrp-table';
import { Helmet } from 'react-helmet';

/** register the location-tag reducer */
reducerRegistry.register(locationTagReducerName, locationTagReducer);

/** interface for location-tag table props */
interface LocationTagTableProps {
    tableData: LocationTag[];
}

/** render the location-tag table using opensrp-table */
function LocationTagTable(props: LocationTagTableProps): React.ReactElement {
    return <OpenSRPTable {...{ data: props.tableData, tableColumns: useLocationTagTableColumns() }} />;
}

/** props Interface for the location-tags component */
export interface LocationtagProps {
    service: typeof OpenSRPService;
    locationTagArray: LocationTag[];
    fetchLocationTags: typeof fetchLocationTags;
    removeLocationTags: typeof removeLocationTags;
}

/** interface for location-tag state */
export interface LocationTagState {
    loading: boolean;
}

/** default props for the location-tag component */
export const defaultLocationTagProps: LocationtagProps = {
    locationTagArray: [],
    fetchLocationTags: fetchLocationTags,
    removeLocationTags: removeLocationTags,
    service: OpenSRPService,
};

/** default values for location-tag state */
export const defaultLocationTagState: LocationTagState = {
    loading: true,
};

/** Display the location-tag list  */
class LocationTagList extends React.Component<LocationtagProps, LocationTagState> {
    public static defaultProps: LocationtagProps = defaultLocationTagProps;
    constructor(props: LocationtagProps) {
        super(props);
        this.state = defaultLocationTagState;
    }

    public async componentDidMount(): Promise<void> {
        this.getDataFromServer();
    }

    /** fetch data from server when any filter is applied */
    getDataFromServer = async (): Promise<void> => {
        const { fetchLocationTags, service, removeLocationTags } = this.props;
        const locationTagService = new service(OPENSRP_API_BASE_URL, OPENSRP_LOCATION_TAG_ENDPOINT, generateOptions);
        const response = await locationTagService.list();
        removeLocationTags();
        fetchLocationTags(response);
        this.setState({
            ...this.state,
            loading: false,
        });
    };

    public render(): React.ReactNode {
        const { locationTagArray } = this.props;
        /** render loader if there are no location-tag in state */
        // if (this.state.loading) {
        //     return <Loading />;
        // } else {
        return (
            <div className="client-page">
                <Helmet>
                    <title>Location Tags</title>
                </Helmet>
                <h3 className="household-title"> Location Tags </h3>
                <Row>
                    <Col>
                        <LocationTagTable tableData={locationTagArray} />
                    </Col>
                </Row>
            </div>
        );
        // }
    }
}

export { LocationTagList };

/** Interface to describe props from mapStateToProps */
interface DispatchedStateProps {
    locationTagArray: LocationTag[];
}

/** Map props to state  */
const mapStateToProps = (state: Partial<Store>): DispatchedStateProps => {
    const result = {
        locationTagArray: getLocationtagsArray(state),
    };
    return result;
};

/** map props to actions */
const mapDispatchToProps = {
    fetchLocationTags: fetchLocationTags,
    removeLocationTags: removeLocationTags,
};

/** connect location-tag list to the redux store */
const ConnectedLocationTagList = connect(mapStateToProps, mapDispatchToProps)(LocationTagList);

export default ConnectedLocationTagList;
