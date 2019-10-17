import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container, Row } from 'reactstrap';
import { Store } from 'redux';
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
        <Row>
          <p>the locations breadcrumbs go here</p>
        </Row>
        <Row>
          <p>the cards go here</p>
        </Row>
      </Container>
    );
  }
}

function filterSms(
  last1Week?: boolean,
  last2Weeks?: boolean,
  province?: string,
  district?: string,
  commune?: string,
  village?: string
): null {
  return null;
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
