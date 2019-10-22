import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container, Row } from 'reactstrap';
import { Store } from 'redux';
import DataCircleCard from '../../components/DataCircleCard';
import Ripple from '../../components/page/Loading';
import { MICROSECONDS_IN_A_WEEK } from '../../constants';
import supersetFetch from '../../services/superset';
import { fetchSms, getSmsData, SmsData, smsDataFetched } from '../../store/ducks/sms_events';
import './index.css';

interface Props {
  smsData: SmsData[];
  fetchSmsDataActionCreator: typeof fetchSms;
  dataFetched: boolean;
}
const defaultProps: Props = {
  dataFetched: false,
  fetchSmsDataActionCreator: fetchSms,
  smsData: [],
};
class Compartments extends Component<Props, {}> {
  public static defaultProps = defaultProps;
  public componentDidMount() {
    const { fetchSmsDataActionCreator } = this.props;
    if (!this.props.dataFetched) {
      supersetFetch('2263').then((result: any) => {
        fetchSmsDataActionCreator(result);
      });
    }
  }
  public render() {
    const dataCircleCard1Props = {
      highRisk: this.getNumberOfSmsWithRisk('high', this.props.smsData),
      lowRisk: this.getNumberOfSmsWithRisk('low', this.props.smsData),
      noRisk: this.getNumberOfSmsWithRisk('no risk', this.props.smsData),
      title: this.props.smsData.length + ' Total Pregnancies',
    };

    const last2WeeksSmsData = this.filterSms(false, true);
    const dataCircleCard2Props = {
      highRisk: this.getNumberOfSmsWithRisk('high', last2WeeksSmsData),
      lowRisk: this.getNumberOfSmsWithRisk('low', last2WeeksSmsData),
      noRisk: this.getNumberOfSmsWithRisk('no risk', last2WeeksSmsData),
      title: last2WeeksSmsData.length + ' Total Pregnancies due in 2 weeks',
    };

    const last1WeekSmsData = this.filterSms(true);
    const dataCircleCard3Props = {
      highRisk: this.getNumberOfSmsWithRisk('high', last1WeekSmsData),
      lowRisk: this.getNumberOfSmsWithRisk('low', last1WeekSmsData),
      noRisk: this.getNumberOfSmsWithRisk('no risk', last1WeekSmsData),
      title: last1WeekSmsData.length + ' Total Pregnancies due in 1 week',
    };

    return (
      <Container fluid={true} className="compartment-wrapper compartments">
        <Row>
          <h2 id="compartment_title">Compartment</h2>
        </Row>
        <Row className="breadcrumb-row">
          <p id="breadcrumb">Province</p>
        </Row>
        {this.props.dataFetched ? (
          <Row className="cards-row">
            <DataCircleCard {...dataCircleCard1Props} />
            <DataCircleCard {...dataCircleCard2Props} />
            <DataCircleCard {...dataCircleCard3Props} />
          </Row>
        ) : (
          <Ripple />
        )}
      </Container>
    );
  }
  private filterSms = (last1Week?: boolean, last2Weeks?: boolean): SmsData[] => {
    let filteredData: SmsData[] = [];
    if (last2Weeks) {
      filteredData = this.props.smsData.filter((dataItem: SmsData): boolean => {
        return Date.now() - Date.parse(dataItem.EventDate) < 2 * MICROSECONDS_IN_A_WEEK;
      });
    } else if (last1Week) {
      filteredData = this.props.smsData.filter((dataItem: SmsData): boolean => {
        return Date.now() - Date.parse(dataItem.EventDate) < MICROSECONDS_IN_A_WEEK;
      });
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
    smsData: getSmsData(state),
  };
  return result;
};

const mapPropsToActions = { fetchSmsDataActionCreator: fetchSms };

const ConnectedCompartments = connect(
  mapStateToprops,
  mapPropsToActions
)(Compartments);

export default ConnectedCompartments;
