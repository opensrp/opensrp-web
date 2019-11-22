import { getUser, User } from '@onaio/session-reducer';
import { ReactNodeArray } from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { CardGroup, Row } from 'reactstrap';
import { Store } from 'redux';
import ConnectedDataCircleCard from '../../components/DataCircleCard';
import Ripple from '../../components/page/Loading';
import VillageData from '../../components/VillageData';
import {
  LOCATION_SLICES,
  SUPERSET_SMS_DATA_SLICE,
  USER_LOCATION_DATA_SLICE,
} from '../../configs/env';
import {
  COMPARTMENTS,
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
  SMS_FILTER_FUNCTION,
} from '../../constants';
import {
  buildHeaderBreadCrumb,
  getFilterFunctionAndLocationLevel,
  getLocationId,
  HeaderBreadCrumb,
} from '../../helpers/utils';
import { FlexObject } from '../../helpers/utils';
import { OpenSRPService } from '../../services/opensrp';
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
  userIdFetched,
  UserLocation,
  userLocationDataFetched,
  userLocationIdFetched,
} from '../../store/ducks/locations';
import {
  addFilterArgs,
  fetchSms,
  getFilterArgs,
  getFilteredSmsData,
  removeFilterArgs,
  SmsData,
  smsDataFetched,
} from '../../store/ducks/sms_events';
import './index.css';

interface Props {
  filterArgsInStore: SMS_FILTER_FUNCTION[];
  smsData: SmsData[];
  userLocationData: UserLocation[];
  fetchSmsDataActionCreator: typeof fetchSms;
  fetchLocationsActionCreator: typeof fetchLocations;
  fetchUserLocationsActionCreator: typeof fetchUserLocations;
  fetchUserIdActionCreator: typeof fetchUserId;
  fetchUserLocationIdActionCreator: typeof fetchUserLocationId;
  dataFetched: boolean;
  isUserLocationIdFetched: boolean;
  isUserLocationDataFetched: boolean;
  user: User;
  userIdFetched: boolean;
  userUUID: string;
  addFilterArgs: any;
  removeFilterArgs: any;
  filterArgs: SMS_FILTER_FUNCTION[];
  module: PREGNANCY | NBC_AND_PNC | NUTRITION | '';
  provinces: Location[];
  districts: Location[];
  communes: Location[];
  villages: Location[];
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
  smsData: [],
  user: {
    name: '',
    username: '',
  },
  userIdFetched: false,
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
      props.addFilterArgs([locationFilterFunction as SMS_FILTER_FUNCTION]);
    }
    const locationPath = buildHeaderBreadCrumb(
      userLocationId,
      props.provinces,
      props.districts,
      props.communes,
      props.villages
    );

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

    // fetch user UUID from OpenSRP
    // tslint:disable-next-line: no-shadowed-variable
    const { userIdFetched } = this.props;

    if (!userIdFetched) {
      const opensrpService = new OpenSRPService('/security/authenticate');

      opensrpService.read('').then((response: any) => {
        this.props.fetchUserIdActionCreator((response as any).user.attributes._PERSON_UUID);
      });
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
            ] as SMS_FILTER_FUNCTION[],
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
            ] as SMS_FILTER_FUNCTION[],
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
            ] as SMS_FILTER_FUNCTION[],
            highRisk: this.getNumberOfSmsWithRisk(HIGH, newBorn),
            lowRisk: this.getNumberOfSmsWithRisk(LOW, newBorn),
            module: NBC_AND_PNC_CHILD,
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
            ] as SMS_FILTER_FUNCTION[],
            highRisk: this.getNumberOfSmsWithRisk(HIGH, woman),
            lowRisk: this.getNumberOfSmsWithRisk(LOW, woman),
            module: NBC_AND_PNC_WOMAN,
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

    const dataCircleCardNutrition =
      this.props.module === NUTRITION
        ? {
            filterArgs: [],
            inappropriateFeeding: 0,
            overweight: 0,
            permissionLevel: 0,
            stunting: 0,
            title: 'test title',
            totalChildren: 0,
            wasting: 0,
          }
        : null;

    const path = this.state.locationAndPath.path;
    const location = this.state.locationAndPath.location;
    const circleCardProps: FlexObject = {
      [PREGNANCY]: [
        pregnancyDataCircleCard1Props,
        pregnancyDataCircleCard2Props,
        pregnancyDataCircleCard3Props,
      ],
      [NBC_AND_PNC]: [dataCircleCardChildData, dataCircleCardWomanData],
    };
    const circleCardComponent: ReactNodeArray = [];
    Object.keys(circleCardProps).forEach((m: string) => {
      circleCardProps[m].forEach((p: any) => {
        if (this.props.module === m) {
          circleCardComponent.push(
            <ConnectedDataCircleCard
              key={Math.random()}
              userLocationId={userLocationId}
              module={m}
              {...p}
            />
          );
        }
      });
    });

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
                {circleCardComponent}
                {this.props.module === NBC_AND_PNC && dataCircleCardTestProps ? (
                  <ConnectedDataCircleCard
                    {...dataCircleCardTestProps}
                    userLocationId={userLocationId}
                    module={NBC_AND_PNC_WOMAN}
                    className={'invisible-but-visible'}
                  />
                ) : null}
                {this.props.module === NUTRITION && dataCircleCardNutrition ? (
                  <ConnectedDataCircleCard
                    {...dataCircleCardNutrition}
                    userLocationId={userLocationId}
                    module={NUTRITION}
                  />
                ) : null}
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
    smsData: getFilteredSmsData(state, getFilterArgs(state) as SMS_FILTER_FUNCTION[]),
    user: getUser(state),
    userIdFetched: userIdFetched(state),
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
