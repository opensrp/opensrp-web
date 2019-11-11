import React, { Component } from 'react';
import { connect } from 'react-redux';
import { CardGroup, Row } from 'reactstrap';
import { Store } from 'redux';
import ConnectedDataCircleCard from '../../components/DataCircleCard';
import Ripple from '../../components/page/Loading';
import { LOCATION_SLICES, SUPERSET_SMS_DATA_SLICE } from '../../configs/env';
import {
  CLIENT_TYPE,
  COMPARTMENTS,
  EC_CHILD,
  EC_WOMAN,
  EVENT_DATE,
  HIGH,
  LOW,
  MICROSECONDS_IN_A_WEEK,
  NBC_AND_PNC,
  NO_RISK_LOWERCASE,
  NUTRITION,
  PREGNANCY,
} from '../../constants';
import supersetFetch from '../../services/superset';
import { fetchLocations, getLocationsOfLevel, Location } from '../../store/ducks/locations';
import {
  addFilterArgs,
  fetchSms,
  FilterArgs,
  getFilterArgs,
  getFilteredSmsData,
  getSmsData,
  removeFilterArgs,
  SmsData,
  smsDataFetched,
} from '../../store/ducks/sms_events';
import './index.css';

interface Props {
  smsData: SmsData[];
  fetchSmsDataActionCreator: typeof fetchSms;
  fetchLocationsActionCreator: typeof fetchLocations;
  dataFetched: boolean;
  addFilterArgs: any;
  removeFilterArgs: any;
  filterArgs: FilterArgs[];
  module: PREGNANCY | NBC_AND_PNC | NUTRITION | '';
  provinces: Location[];
  districts: Location[];
  communes: Location[];
  villages: Location[];
}
const defaultProps: Props = {
  addFilterArgs,
  communes: [],
  dataFetched: false,
  districts: [],
  fetchLocationsActionCreator: fetchLocations,
  fetchSmsDataActionCreator: fetchSms,
  filterArgs: [],
  module: '',
  provinces: [],
  removeFilterArgs,
  smsData: [],
  villages: [],
};
class Compartments extends Component<Props, {}> {
  public static defaultProps = defaultProps;
  public componentDidMount() {
    const { fetchLocationsActionCreator } = this.props;
    for (const slice in LOCATION_SLICES) {
      if (slice) {
        supersetFetch(LOCATION_SLICES[slice]).then((result: Location[]) => {
          fetchLocationsActionCreator(result);
        });
      }
    }
    const { fetchSmsDataActionCreator } = this.props;
    if (!this.props.dataFetched) {
      supersetFetch(SUPERSET_SMS_DATA_SLICE).then((result: any) => {
        fetchSmsDataActionCreator(result);
      });
    }
    this.props.removeFilterArgs();
    this.props.addFilterArgs(this.props.filterArgs);
  }
  public render() {
    const pregnancyDataCircleCard1Props =
      this.props.module === PREGNANCY
        ? {
            highRisk: this.getNumberOfSmsWithRisk(HIGH, this.props.smsData),
            lowRisk: this.getNumberOfSmsWithRisk(LOW, this.props.smsData),
            noRisk: this.getNumberOfSmsWithRisk(NO_RISK_LOWERCASE, this.props.smsData),
            title: this.props.smsData.length + ' Total Pregnancies',
          }
        : null;

    const last2WeeksSmsData =
      this.props.module === PREGNANCY ? this.filterSmsByPreviousWeekPeriod(false, true) : [];
    const pregnancyDataCircleCard2Props =
      this.props.module === PREGNANCY
        ? {
            filterArgs: [
              {
                comparator: '<',
                field: EVENT_DATE,
                value: 2 * MICROSECONDS_IN_A_WEEK,
              },
            ] as FilterArgs[],
            highRisk: this.getNumberOfSmsWithRisk(HIGH, last2WeeksSmsData || []),
            lowRisk: this.getNumberOfSmsWithRisk(LOW, last2WeeksSmsData || []),
            noRisk: this.getNumberOfSmsWithRisk(NO_RISK_LOWERCASE, last2WeeksSmsData || []),
            title: last2WeeksSmsData.length + ' Total Pregnancies due in 2 weeks',
          }
        : null;

    const last1WeekSmsData =
      this.props.module === PREGNANCY ? this.filterSmsByPreviousWeekPeriod(true) : [];
    const pregnancyDataCircleCard3Props =
      this.props.module === PREGNANCY
        ? {
            filterArgs: [
              {
                comparator: '<',
                field: EVENT_DATE,
                value: MICROSECONDS_IN_A_WEEK,
              },
            ] as FilterArgs[],
            highRisk: this.getNumberOfSmsWithRisk(HIGH, last1WeekSmsData || []),
            lowRisk: this.getNumberOfSmsWithRisk(LOW, last1WeekSmsData || []),
            noRisk: this.getNumberOfSmsWithRisk(NO_RISK_LOWERCASE, last1WeekSmsData || []),
            title: last1WeekSmsData.length + ' Total Pregnancies due in 1 week',
          }
        : null;

    const newBorn: SmsData[] =
      this.props.module === NBC_AND_PNC
        ? this.props.smsData.filter((smsData: SmsData) => {
            return smsData.client_type === 'ec_child';
          })
        : [];

    const dataCircleCardChildData =
      this.props.module === NBC_AND_PNC
        ? {
            filterArgs: [
              {
                comparator: '===',
                field: CLIENT_TYPE,
                value: EC_CHILD,
              } as FilterArgs,
            ],
            highRisk: this.getNumberOfSmsWithRisk(HIGH, newBorn),
            lowRisk: this.getNumberOfSmsWithRisk(LOW, newBorn),
            noRisk: this.getNumberOfSmsWithRisk(NO_RISK_LOWERCASE, newBorn),
            title: newBorn.length + ' Total Newborn',
          }
        : null;

    const woman: SmsData[] = this.props.smsData.filter((smsData: SmsData) => {
      return smsData.client_type === EC_WOMAN;
    });

    const dataCircleCardWomanData =
      this.props.module === NBC_AND_PNC
        ? {
            filterArgs: [
              {
                comparator: '===',
                field: CLIENT_TYPE,
                value: EC_WOMAN,
              } as FilterArgs,
            ],
            highRisk: this.getNumberOfSmsWithRisk(HIGH, woman),
            lowRisk: this.getNumberOfSmsWithRisk(LOW, woman),
            noRisk: this.getNumberOfSmsWithRisk(NO_RISK_LOWERCASE, woman),
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
            title: 'test title',
          }
        : null;

    const locationAndPath = this.buildHeaderBreadCrumb('78a12165-3c12-471f-8755-c96bac123292');
    const path = locationAndPath.path;
    const location = locationAndPath.location;
    return (
      <div className="compartment-wrapper compartments">
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
          <div className="cards-row">
            <CardGroup>
              {this.props.module === PREGNANCY && pregnancyDataCircleCard1Props ? (
                <ConnectedDataCircleCard
                  {...pregnancyDataCircleCard1Props}
                  module={this.props.module}
                />
              ) : null}
              {this.props.module === PREGNANCY && pregnancyDataCircleCard2Props ? (
                <ConnectedDataCircleCard
                  {...pregnancyDataCircleCard2Props}
                  module={this.props.module}
                />
              ) : null}
              {this.props.module === PREGNANCY && pregnancyDataCircleCard3Props ? (
                <ConnectedDataCircleCard
                  {...pregnancyDataCircleCard3Props}
                  module={this.props.module}
                />
              ) : null}
              {this.props.module === NBC_AND_PNC && dataCircleCardChildData ? (
                <ConnectedDataCircleCard {...dataCircleCardChildData} module={this.props.module} />
              ) : null}
              {this.props.module === NBC_AND_PNC && dataCircleCardWomanData ? (
                <ConnectedDataCircleCard {...dataCircleCardWomanData} module={this.props.module} />
              ) : null}
              {this.props.module === NBC_AND_PNC && dataCircleCardTestProps ? (
                <ConnectedDataCircleCard
                  {...dataCircleCardTestProps}
                  module={this.props.module}
                  className={'invisible-but-visible'}
                />
              ) : null}
              {this.props.module === NUTRITION
                ? 'nothing to show for the nutrition module right now'
                : null}
            </CardGroup>
          </div>
        ) : (
          <Ripple />
        )}
      </div>
    );
  }
  private buildHeaderBreadCrumb(locationId: string): any {
    if (this.props.provinces.find((province: Location) => province.location_id === locationId)) {
      return {
        location: this.props.provinces.find(
          (province: Location) => province.location_id === locationId
        )!.location_name,
        path: '',
      };
    } else if (
      this.props.districts.find((district: Location) => district.location_id === locationId)
    ) {
      const userDistrict = this.props.districts.find(
        (district: Location) => district.location_id === locationId
      );
      const userProvince = this.props.provinces.find(
        (province: Location) => province.location_id === userDistrict!.parent_id
      );
      return { path: `${userProvince!.location_name} / `, location: userDistrict!.location_name };
    } else if (
      this.props.communes.find((commune: Location) => commune.location_id === locationId)
    ) {
      const userCommune = this.props.communes.find(
        (commune: Location) => commune.location_id === locationId
      );
      const userDistrict = this.props.districts.find(
        (district: Location) => district.location_id === userCommune!.parent_id
      );
      const userProvince = this.props.provinces.find(
        (province: Location) => province.location_id === userDistrict!.parent_id
      );
      return {
        location: userCommune!.location_name,
        path: `${userProvince!.location_name} / ${userDistrict!.location_name} / `,
      };
    } else if (
      this.props.villages.find(
        (village: Location) => village.location_id === locationId && this.props.communes.length
      )
    ) {
      const userVillage = this.props.villages.find(
        (village: Location) => village.location_id === locationId
      );
      const userCommune = this.props.communes.find(
        (commune: Location) => commune.location_id === userVillage!.parent_id
      );
      const userDistrict = this.props.districts.find(
        (district: Location) => district.location_id === userCommune!.parent_id
      );
      const userProvince = this.props.provinces.find(
        (province: Location) => province.location_id === userDistrict!.parent_id
      );
      return {
        location: userVillage!.location_name,
        path: `${userProvince!.location_name} / ${userDistrict!.location_name} / ${
          userCommune!.location_name
        } / `,
      };
    }
    return { path: '', location: '' };
  }
  private filterSmsByPreviousWeekPeriod = (
    last1Week?: boolean,
    last2Weeks?: boolean
  ): SmsData[] => {
    let filteredData: SmsData[] = [];
    if (last2Weeks) {
      filteredData = this.props.smsData.filter(this.filterByDateInLast2Weeks);
    } else if (last1Week) {
      filteredData = this.props.smsData.filter(this.filterByDateInLast1Week);
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

  private filterByDateInLast2Weeks = (dataItem: SmsData): boolean => {
    return Date.now() - Date.parse(dataItem.EventDate) < 2 * MICROSECONDS_IN_A_WEEK;
  };

  private filterByDateInLast1Week = (dataItem: SmsData): boolean => {
    return Date.now() - Date.parse(dataItem.EventDate) < MICROSECONDS_IN_A_WEEK;
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
  const result = {
    communes: getLocationsOfLevel(state, 'Commune'),
    dataFetched: smsDataFetched(state),
    districts: getLocationsOfLevel(state, 'District'),
    provinces: getLocationsOfLevel(state, 'Province'),
    smsData: getFilterArgs(state)
      ? getFilteredSmsData(state, getFilterArgs(state) as FilterArgs[])
      : getSmsData(state),
    villages: getLocationsOfLevel(state, 'Village'),
  };
  return result;
};

const mapDispatchToProps = {
  addFilterArgs,
  fetchLocationsActionCreator: fetchLocations,
  fetchSmsDataActionCreator: fetchSms,
  removeFilterArgs,
};

const ConnectedCompartments = connect(
  mapStateToprops,
  mapDispatchToProps
)(Compartments);

export default ConnectedCompartments;
