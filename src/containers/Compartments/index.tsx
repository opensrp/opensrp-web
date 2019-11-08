import React, { Component } from 'react';
import { connect } from 'react-redux';
import { CardGroup, Row } from 'reactstrap';
import { Store } from 'redux';
import ConnectedDataCircleCard from '../../components/DataCircleCard';
import Ripple from '../../components/page/Loading';
import { SUPERSET_SMS_DATA_SLICE } from '../../configs/env';
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
  PROVINCE,
} from '../../constants';
import supersetFetch from '../../services/superset';
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
  dataFetched: boolean;
  addFilterArgs: any;
  removeFilterArgs: any;
  filterArgs: FilterArgs[];
  module: PREGNANCY | NBC_AND_PNC | NUTRITION | '';
}
const defaultProps: Props = {
  addFilterArgs,
  dataFetched: false,
  fetchSmsDataActionCreator: fetchSms,
  filterArgs: [],
  module: '',
  removeFilterArgs,
  smsData: [],
};
class Compartments extends Component<Props, {}> {
  public static defaultProps = defaultProps;
  public componentDidMount() {
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

    return (
      <div className="compartment-wrapper compartments">
        <Row>
          <h2 id="compartment_title">{COMPARTMENTS}</h2>
        </Row>
        <Row className="breadcrumb-row">
          <p id="breadcrumb">{PROVINCE}</p>
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
    dataFetched: smsDataFetched(state),
    smsData: getFilterArgs(state)
      ? getFilteredSmsData(state, getFilterArgs(state) as FilterArgs[])
      : getSmsData(state),
  };
  return result;
};

const mapDispatchToProps = { fetchSmsDataActionCreator: fetchSms, addFilterArgs, removeFilterArgs };

const ConnectedCompartments = connect(
  mapStateToprops,
  mapDispatchToProps
)(Compartments);

export default ConnectedCompartments;
