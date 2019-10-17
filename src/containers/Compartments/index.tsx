import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container, Row } from 'reactstrap';
import { Store } from 'redux';
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
    return (
      <Container fluid={true}>
        <Row>
          <h2 id="compartment_title">Compartment</h2>
        </Row>
        <Row className="breadcrumb-row">
          <p id="breadcrumb">Province</p>
        </Row>
        <Row className="cards-row">
          <p>the cards go here</p>
        </Row>
      </Container>
    );
  }
  private filterSms = (
    last1Week?: boolean,
    last2Weeks?: boolean,
    province?: string,
    district?: string,
    commune?: string,
    village?: string
  ): void => {
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
    // in the very near future we should be able to filter by an administrative unit
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
