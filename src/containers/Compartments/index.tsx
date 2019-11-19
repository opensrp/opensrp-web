import { getUser, User } from '@onaio/session-reducer';
import React from 'react';
import { connect } from 'react-redux';
import { CardGroup, Row } from 'reactstrap';
import { Store } from 'redux';
import ConnectedDataCircleCard from '../../components/DataCircleCard';
import Ripple from '../../components/page/Loading';
import VillageData from '../../components/VillageData';
import {
  LOCATION_SLICES,
  OPENSRP_API_BASE_URL,
  SUPERSET_SMS_DATA_SLICE,
  USER_LOCATION_DATA_SLICE,
} from '../../configs/env';
import {
  COMMUNE,
  COMPARTMENTS,
  DISTRICT,
  EC_CHILD,
  EC_WOMAN,
  HIGH,
  LOW,
  MICROSECONDS_IN_A_WEEK,
  NBC_AND_PNC,
  NBC_AND_PNC_CHILD,
  NBC_AND_PNC_WOMAN,
  NO_RISK_LOWERCASE,
  NUTRITION,
  PREGNANCY,
  PROVINCE,
  VILLAGE,
} from '../../constants';
import {
  getFilterFunctionAndLocationLevel,
  getLocationId,
  locationIdIn,
} from '../../helpers/utils';
import { FlexObject } from '../../helpers/utils';
import supersetFetch from '../../services/superset';
import {
  fetchLocations,
  fetchUserId,
  fetchUserLocationId,
  fetchUserLocations,
  getLocationsOfLevel,
  getUserId,
  getUserLocations,
  Location,
  UserLocation,
  userLocationDataFetched,
  userLocationIdFetched,
} from '../../store/ducks/locations';
import {
  addFilterArgs,
  fetchSms,
  getFilterArgs,
  getFilteredSmsData,
  getSmsData,
  removeFilterArgs,
  SmsData,
  smsDataFetched,
} from '../../store/ducks/sms_events';
import './index.css';

interface Props {
  filterArgsInStore: Array<(smsData: SmsData) => boolean>;
  smsData: SmsData[];
  userLocationData: UserLocation[];
  session: { [key: string]: any };
  fetchSmsDataActionCreator: typeof fetchSms;
  fetchLocationsActionCreator: typeof fetchLocations;
  fetchUserLocationsActionCreator: typeof fetchUserLocations;
  fetchUserIdActionCreator: typeof fetchUserId;
  fetchUserLocationIdActionCreator: typeof fetchUserLocationId;
  dataFetched: boolean;
  isUserLocationIdFetched: boolean;
  isUserLocationDataFetched: boolean;
  user: User;
  userUUID: string;
  addFilterArgs: any;
  removeFilterArgs: any;
  filterArgs: Array<(smsData: SmsData) => boolean>;
  module: PREGNANCY | NBC_AND_PNC | NUTRITION | '';
  provinces: Location[];
  districts: Location[];
  communes: Location[];
  villages: Location[];
}

interface HeaderBreadCrumb {
  location: string;
  path: string;
  locationId: string;
  level: string;
}

interface State {
  userLocationId: string;
  locationAndPath: HeaderBreadCrumb;
  locationFilterFunction: (smsData: SmsData) => boolean;
  userLocationLevel: 0 | 1 | 2 | 3 | 4;
  filteredData: SmsData[];
}
const defaultCompartmentProps: Props = {
  addFilterArgs,
  communes: [],
  dataFetched: false,
  districts: [],
  fetchLocationsActionCreator: fetchLocations,
  fetchSmsDataActionCreator: fetchSms,
  fetchUserIdActionCreator: fetchUserId,
  fetchUserLocationIdActionCreator: fetchUserLocationId,
  fetchUserLocationsActionCreator: fetchUserLocations,
  filterArgs: [],
  filterArgsInStore: [],
  isUserLocationDataFetched: false,
  isUserLocationIdFetched: false,
  module: '',
  provinces: [],
  removeFilterArgs,
  session: {},
  smsData: [],
  user: {
    name: '',
    username: '',
  },
  userLocationData: [],
  userUUID: '',
  villages: [],
};
class Compartments extends React.Component<Props, State> {
  public static defaultProps: Props = defaultCompartmentProps;

  /**
   * Here we determine the location id that the user is assiged to
   * and use that to filter smsData in the store.
   * @param props
   * @param state
   */
  public static getDerivedStateFromProps(props: Props, state: State): State {
    const userLocationId = getLocationId(props.userLocationData, props.userUUID);

    const { locationLevel, locationFilterFunction } = getFilterFunctionAndLocationLevel(
      userLocationId,
      props.provinces,
      props.districts,
      props.communes,
      props.villages
    );

    if (
      locationFilterFunction &&
      !(
        props.filterArgsInStore
          .map(element => {
            return element.toString();
          })
          .indexOf(locationFilterFunction.toString()) > -1
      )
    ) {
      props.removeFilterArgs();
      props.addFilterArgs(props.filterArgs);
      props.addFilterArgs([locationFilterFunction as ((smsData: SmsData) => boolean)]);
    }
    const locationPath = Compartments.buildHeaderBreadCrumb(userLocationId, props);
    if (locationPath) {
      return {
        filteredData: props.smsData.filter(locationFilterFunction),
        locationAndPath: locationPath,
        locationFilterFunction,
        userLocationId,
        userLocationLevel: locationLevel,
      } as State;
    } else {
      return {
        filteredData: props.smsData.filter(locationFilterFunction),
        locationAndPath: state.locationAndPath,
        locationFilterFunction,
        userLocationId,
        userLocationLevel: locationLevel,
      } as State;
    }
  }

  /**
   * returns an object that is used to create the header breadcrumb on the Compartments component
   * @param locationId - location ID  of where the user is assigned;
   * this could be a province, district, commune or village
   * @return { HeaderBreadCrumb } an object representing information
   * required to build the header breadcrumb and to filter out data
   */
  private static buildHeaderBreadCrumb(locationId: string, props: Props): HeaderBreadCrumb {
    if (locationIdIn(locationId, props.provinces)) {
      const userProvince = props.provinces.find(
        (province: Location) => province.location_id === locationId
      );
      return {
        level: PROVINCE,
        location: userProvince!.location_name,
        locationId: userProvince!.location_id,
        path: '',
      };
    } else if (locationIdIn(locationId, props.districts)) {
      const userDistrict = props.districts.find(
        (district: Location) => district.location_id === locationId
      );
      const userProvince = props.provinces.find(
        (province: Location) => province.location_id === userDistrict!.parent_id
      );
      return {
        level: DISTRICT,
        location: userDistrict!.location_name,
        locationId: userDistrict!.location_id,
        path: `${userProvince!.location_name} / `,
      };
    } else if (locationIdIn(locationId, props.communes)) {
      const userCommune = props.communes.find(
        (commune: Location) => commune.location_id === locationId
      );
      const userDistrict = props.districts.find(
        (district: Location) => district.location_id === userCommune!.parent_id
      );
      const userProvince = props.provinces.find(
        (province: Location) => province.location_id === userDistrict!.parent_id
      );
      return {
        level: COMMUNE,
        location: userCommune!.location_name,
        locationId: userCommune!.location_id,
        path: `${userProvince!.location_name} / ${userDistrict!.location_name} / `,
      };
    } else if (locationIdIn(locationId, props.villages)) {
      const userVillage = props.villages.find(
        (village: Location) => village.location_id === locationId
      );
      const userCommune = props.communes.find(
        (commune: Location) => commune.location_id === userVillage!.parent_id
      );
      const userDistrict = props.districts.find(
        (district: Location) => district.location_id === userCommune!.parent_id
      );
      const userProvince = props.provinces.find(
        (province: Location) => province.location_id === userDistrict!.parent_id
      );
      return {
        level: VILLAGE,
        location: userVillage!.location_name,
        locationId: userVillage!.location_id,
        path: `${userProvince!.location_name} / ${userDistrict!.location_name} / ${
          userCommune!.location_name
        } / `,
      };
    }
    return { path: '', location: '', locationId: '', level: '' };
  }

  constructor(props: Props) {
    super(props);

    this.state = {
      filteredData: [],
      locationAndPath: {
        level: '',
        location: '',
        locationId: '',
        path: '',
      },
      locationFilterFunction: () => false,
      userLocationId: '',
      userLocationLevel: 4,
    };
  }
  public async componentDidMount() {
    this.props.removeFilterArgs();
    const { fetchLocationsActionCreator, fetchUserLocationsActionCreator } = this.props;

    const { session } = this.props;

    if (
      (session as any).extraData &&
      (session as any).extraData.oAuth2Data &&
      (session as any).extraData.oAuth2Data.state === 'opensrp'
    ) {
      const headers: any = new Headers();
      const self: any = this;
      headers.append(
        'Authorization',
        `Bearer ${(session as any).extraData.oAuth2Data.access_token}`
      );
      fetch(`${OPENSRP_API_BASE_URL}/security/authenticate`, { headers }).then((user: any) =>
        user.json().then((res: FlexObject) => {
          self.props.fetchUserIdActionCreator((res as any).user.attributes._PERSON_UUID);
        })
      );
    }

    // fetch user location details

    if (!this.props.isUserLocationDataFetched) {
      supersetFetch(USER_LOCATION_DATA_SLICE).then((result: UserLocation[]) => {
        fetchUserLocationsActionCreator(result);
      });
    }

    // fetch all location slices
    for (const slice in LOCATION_SLICES) {
      if (slice) {
        await supersetFetch(LOCATION_SLICES[slice]).then((result: Location[]) => {
          fetchLocationsActionCreator(result);
        });
      }
    }

    // check if sms data is fetched and then fetch if not fetched already
    const { fetchSmsDataActionCreator } = this.props;
    if (!this.props.dataFetched) {
      supersetFetch(SUPERSET_SMS_DATA_SLICE).then((result: any) => {
        fetchSmsDataActionCreator(result);
      });
    }
  }

  public render() {
    const { userLocationId, filteredData, userLocationLevel } = this.state;

    const pregnancyDataCircleCard1Props =
      this.props.module === PREGNANCY
        ? {
            highRisk: this.getNumberOfSmsWithRisk(HIGH, filteredData),
            lowRisk: this.getNumberOfSmsWithRisk(LOW, filteredData),
            noRisk: this.getNumberOfSmsWithRisk(NO_RISK_LOWERCASE, filteredData),
            permissionLevel: userLocationLevel,
            title: filteredData.length + ' Total Pregnancies',
          }
        : null;

    const last2WeeksSmsData =
      this.props.module === PREGNANCY
        ? this.filterSmsByPreviousWeekPeriod(userLocationId, false, true)
        : [];
    const pregnancyDataCircleCard2Props =
      this.props.module === PREGNANCY
        ? {
            filterArgs: [
              (smsData: SmsData) => {
                return (
                  Date.parse(smsData.lmp_edd) - Date.now() > 0 &&
                  Date.parse(smsData.lmp_edd) - Date.now() < 2 * MICROSECONDS_IN_A_WEEK
                );
              },
            ] as Array<(smsData: SmsData) => boolean>,
            highRisk: this.getNumberOfSmsWithRisk(HIGH, last2WeeksSmsData || []),
            lowRisk: this.getNumberOfSmsWithRisk(LOW, last2WeeksSmsData || []),
            noRisk: this.getNumberOfSmsWithRisk(NO_RISK_LOWERCASE, last2WeeksSmsData || []),
            permissionLevel: userLocationLevel,
            title: last2WeeksSmsData.length + ' Total Pregnancies due in 2 weeks',
          }
        : null;

    const last1WeekSmsData =
      this.props.module === PREGNANCY
        ? this.filterSmsByPreviousWeekPeriod(userLocationId, true, false)
        : [];
    const pregnancyDataCircleCard3Props =
      this.props.module === PREGNANCY
        ? {
            filterArgs: [
              (smsData: SmsData) => {
                return (
                  Date.parse(smsData.lmp_edd) - Date.now() > 0 &&
                  Date.parse(smsData.lmp_edd) - Date.now() < 2 * MICROSECONDS_IN_A_WEEK
                );
              },
            ] as Array<(smsData: SmsData) => boolean>,
            highRisk: this.getNumberOfSmsWithRisk(HIGH, last1WeekSmsData || []),
            lowRisk: this.getNumberOfSmsWithRisk(LOW, last1WeekSmsData || []),
            noRisk: this.getNumberOfSmsWithRisk(NO_RISK_LOWERCASE, last1WeekSmsData || []),
            permissionLevel: userLocationLevel,
            title: last1WeekSmsData.length + ' Total Pregnancies due in 1 week',
          }
        : null;

    const newBorn: SmsData[] =
      this.props.module === NBC_AND_PNC
        ? this.props.smsData.filter((smsData: SmsData) => {
            return smsData.client_type === EC_CHILD;
          })
        : [];

    const dataCircleCardChildData =
      this.props.module === NBC_AND_PNC
        ? {
            filterArgs: [
              (smsData: SmsData) => {
                return smsData.client_type === EC_CHILD;
              },
            ] as Array<(smsData: SmsData) => boolean>,
            highRisk: this.getNumberOfSmsWithRisk(HIGH, newBorn),
            lowRisk: this.getNumberOfSmsWithRisk(LOW, newBorn),
            noRisk: this.getNumberOfSmsWithRisk(NO_RISK_LOWERCASE, newBorn),
            permissionLevel: userLocationLevel,
            title: newBorn.length + ' Total Newborn',
          }
        : null;

    const woman: SmsData[] = filteredData.filter((smsData: SmsData) => {
      return smsData.client_type === EC_WOMAN;
    });

    const dataCircleCardWomanData =
      this.props.module === NBC_AND_PNC
        ? {
            filterArgs: [
              (smsData: SmsData) => {
                return smsData.client_type === EC_WOMAN;
              },
            ] as Array<(smsData: SmsData) => boolean>,
            highRisk: this.getNumberOfSmsWithRisk(HIGH, woman),
            lowRisk: this.getNumberOfSmsWithRisk(LOW, woman),
            noRisk: this.getNumberOfSmsWithRisk(NO_RISK_LOWERCASE, woman),
            permissionLevel: userLocationLevel,
            title: woman.length + ' Total mother in PNC',
          }
        : null;

    const dataCircleCardTestProps =
      this.props.module === NBC_AND_PNC
        ? {
            filterArgs: [],
            highRisk: 0,
            lowRisk: 0,
            noRisk: 0,
            permissionLevel: 0,
            title: 'test title',
          }
        : null;

    const path = this.state.locationAndPath.path;
    const location = this.state.locationAndPath.location;
    return (
      <div className="compartment-wrapper compartments compartment-data-table">
        <Row>
          <h2 id="compartment_title">{COMPARTMENTS}</h2>
        </Row>
        <Row className="breadcrumb-row">
          <p id="breadcrumb">
            {path}
            <span id="breadcrumb-span">{location}</span>
          </p>
        </Row>
        {this.props.dataFetched ? (
          <React.Fragment>
            <div className="cards-row">
              <CardGroup>
                {this.props.module === PREGNANCY && pregnancyDataCircleCard1Props ? (
                  <ConnectedDataCircleCard
                    {...pregnancyDataCircleCard1Props}
                    userLocationId={userLocationId}
                    module={this.props.module}
                  />
                ) : null}
                {this.props.module === PREGNANCY && pregnancyDataCircleCard2Props ? (
                  <ConnectedDataCircleCard
                    {...pregnancyDataCircleCard2Props}
                    userLocationId={userLocationId}
                    module={this.props.module}
                  />
                ) : null}
                {this.props.module === PREGNANCY && pregnancyDataCircleCard3Props ? (
                  <ConnectedDataCircleCard
                    {...pregnancyDataCircleCard3Props}
                    userLocationId={userLocationId}
                    module={this.props.module}
                  />
                ) : null}
                {this.props.module === NBC_AND_PNC && dataCircleCardChildData ? (
                  <ConnectedDataCircleCard
                    {...dataCircleCardChildData}
                    userLocationId={userLocationId}
                    module={NBC_AND_PNC_CHILD}
                  />
                ) : null}
                {this.props.module === NBC_AND_PNC && dataCircleCardWomanData ? (
                  <ConnectedDataCircleCard
                    {...dataCircleCardWomanData}
                    userLocationId={userLocationId}
                    module={NBC_AND_PNC_WOMAN}
                  />
                ) : null}
                {this.props.module === NBC_AND_PNC && dataCircleCardTestProps ? (
                  <ConnectedDataCircleCard
                    {...dataCircleCardTestProps}
                    userLocationId={userLocationId}
                    module={NBC_AND_PNC_WOMAN}
                    className={'invisible-but-visible'}
                  />
                ) : null}
                {this.props.module === NUTRITION
                  ? 'nothing to show for the nutrition module right now'
                  : null}
              </CardGroup>
            </div>
            {this.props.module === PREGNANCY && this.props.smsData.length ? (
              <VillageData
                {...{
                  current_level: userLocationLevel,
                  module: this.props.module,
                  smsData: filteredData,
                }}
              />
            ) : null}
          </React.Fragment>
        ) : (
          <Ripple />
        )}
      </div>
    );
  }

  /**
   * Filter smsData in order to get smsData in the previous 1 week
   * or the smsData in the previous 2 weeks.
   * @param {boolean} last1Week - filter smsData using filterByDataInLast1Week function
   * @param {boolean} last2Weeks - filter smsData using filterByDataInLast2Weeks function
   */
  private filterSmsByPreviousWeekPeriod = (
    locId: string,
    last1Week?: boolean,
    last2Weeks?: boolean
  ): SmsData[] => {
    let filteredData: SmsData[] = [];
    if (last2Weeks) {
      filteredData = this.props.smsData
        .filter((d: FlexObject) => d.location_id === locId)
        .filter(this.filterByDateInLast2Weeks);
    } else if (last1Week) {
      filteredData = this.props.smsData
        .filter((d: FlexObject) => d.location_id === locId)
        .filter(this.filterByDateInLast1Week);
    }
    return filteredData;
    /**  in the very near future we should be able to filter by an administrative unit
     * by passing in the following arguments
     * province?: string,
     * district?: string,
     * commune?: string,
     * village?: string
     */
  };

  /**
   * filter for smsData objects whose EventData fields are withing
   * the period of the last 2 weeks
   */
  private filterByDateInLast2Weeks = (dataItem: SmsData): boolean => {
    return (
      Date.parse(dataItem.lmp_edd) - Date.now() > 0 &&
      Date.parse(dataItem.lmp_edd) - Date.now() <
        2 * MICROSECONDS_IN_A_WEEK <
        (Date.parse(dataItem.lmp_edd) - Date.now() < MICROSECONDS_IN_A_WEEK)
    );
  };

  /**
   * Filter for smsData objects whose EventDate fields are withinthis.filterByDateInLast1Week(dataItem)
   * the period of the last 1 week
   */
  private filterByDateInLast1Week = (dataItem: SmsData): boolean => {
    return (
      Date.parse(dataItem.lmp_edd) - Date.now() > 0 &&
      Date.parse(dataItem.lmp_edd) - Date.now() < MICROSECONDS_IN_A_WEEK
    );
  };

  /**
   * get the number of sms_reports with a certain value in their logface_risk
   * field
   * @param {string} risk - value of logface_risk to look for
   */
  private getNumberOfSmsWithRisk = (risk: string, smsData: SmsData[]) => {
    function reducer(accumulator: number, currentValue: SmsData) {
      if (currentValue.logface_risk.toLowerCase().includes(risk)) {
        return accumulator + 1;
      } else {
        return accumulator;
      }
    }
    return smsData.reduce(reducer, 0);
  };
}

const mapStateToprops = (state: Partial<Store>) => {
  return {
    communes: getLocationsOfLevel(state, 'Commune'),
    dataFetched: smsDataFetched(state),
    districts: getLocationsOfLevel(state, 'District'),
    filterArgsInStore: getFilterArgs(state),
    isUserLocationDataFetched: userLocationDataFetched(state),
    isUserLocationIdFetched: userLocationIdFetched(state),
    provinces: getLocationsOfLevel(state, 'Province'),
    session: (state as any).session,
    smsData: getFilterArgs(state)
      ? getFilteredSmsData(state, getFilterArgs(state) as Array<(smsData: SmsData) => boolean>)
      : getSmsData(state),
    user: getUser(state),
    userLocationData: getUserLocations(state),
    userUUID: getUserId(state),
    villages: getLocationsOfLevel(state, 'Village'),
  };
};

const mapDispatchToProps = {
  addFilterArgs,
  fetchLocationsActionCreator: fetchLocations,
  fetchSmsDataActionCreator: fetchSms,
  fetchUserIdActionCreator: fetchUserId,
  fetchUserLocationIdActionCreator: fetchUserLocationId,
  fetchUserLocationsActionCreator: fetchUserLocations,
  removeFilterArgs,
};

const ConnectedCompartments = connect(
  mapStateToprops,
  mapDispatchToProps
)(Compartments);

export default ConnectedCompartments;
