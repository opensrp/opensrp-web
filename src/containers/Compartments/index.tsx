import React, { Component } from 'react';
import { connect } from 'react-redux';
import { CardGroup, Row } from 'reactstrap';
import { Store } from 'redux';
import DataCircleCard from '../../components/DataCircleCard';
import Ripple from '../../components/page/Loading';
import { SUPERSET_SMS_DATA_SLICE } from '../../configs/env';
import { COMPARTMENTS, MICROSECONDS_IN_A_WEEK, PROVINCE } from '../../constants';
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
}
const defaultProps: Props = {
  addFilterArgs,
  dataFetched: false,
  fetchSmsDataActionCreator: fetchSms,
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
    this.props.addFilterArgs([
      {
        comparator: '===',
        field: 'sms_type',
        value: 'Pregnancy Registration',
      },
    ]);
  }
  public render() {
    const dataCircleCard1Props = {
      highRisk: this.getNumberOfSmsWithRisk('high', this.props.smsData),
      lowRisk: this.getNumberOfSmsWithRisk('low', this.props.smsData),
      noRisk: this.getNumberOfSmsWithRisk('no risk', this.props.smsData),
      title: this.props.smsData.length + ' Total Pregnancies',
    };

    // for(const i in this.props.smsData){
    //   console.log(this.props.smsData[i]['sms_type'])
    // }
    const last2WeeksSmsData = this.filterSms(false, true);
    const dataCircleCard2Props = {
      filterArgs: [
        {
          comparator: '<',
          field: 'EventDate',
          value: 2 * MICROSECONDS_IN_A_WEEK,
        },
      ] as FilterArgs[],
      highRisk: this.getNumberOfSmsWithRisk('high', last2WeeksSmsData),
      lowRisk: this.getNumberOfSmsWithRisk('low', last2WeeksSmsData),
      noRisk: this.getNumberOfSmsWithRisk('no', last2WeeksSmsData),
      title: last2WeeksSmsData.length + ' Total Pregnancies due in 2 weeks',
    };

    const last1WeekSmsData = this.filterSms(true);
    const dataCircleCard3Props = {
      filterArgs: [
        {
          comparator: '<',
          field: 'EventDate',
          value: MICROSECONDS_IN_A_WEEK,
        },
      ] as FilterArgs[],
      highRisk: this.getNumberOfSmsWithRisk('high', last1WeekSmsData),
      lowRisk: this.getNumberOfSmsWithRisk('low', last1WeekSmsData),
      noRisk: this.getNumberOfSmsWithRisk('no risk', last1WeekSmsData),
      title: last1WeekSmsData.length + ' Total Pregnancies due in 1 week',
    };

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
              <DataCircleCard {...dataCircleCard1Props} />
              <DataCircleCard {...dataCircleCard2Props} />
              <DataCircleCard {...dataCircleCard3Props} />
            </CardGroup>
          </div>
        ) : (
          <Ripple />
        )}
      </div>
    );
  }
  private filterSms = (last1Week?: boolean, last2Weeks?: boolean): SmsData[] => {
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
