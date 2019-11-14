import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { Link } from 'react-router-dom';
import { Row } from 'reactstrap';
import BasicInformation from '../../components/BasicInformation';
import { BACK, BACKPAGE_ICON, PATIENT_DETAILS } from '../../constants';
import { getSmsData, SmsData } from '../../store/ducks/sms_events';

interface Props extends RouteComponentProps {
  patientId: string;
  smsData: SmsData[];
}

interface State {
  filteredData: SmsData[];
}

const defaultProps: Partial<Props> = {
  patientId: 'none',
  smsData: [],
};

class ChildPatientDetails extends Component<Props, State> {
  public static defaultProps: Partial<Props> = defaultProps;
  public render() {
    return (
      <div className={'patient-details'}>
        <Link to="#" className="back-page">
          <span onClick={this.props.history.goBack}>
            <FontAwesomeIcon icon={BACKPAGE_ICON} size="lg" />
            <span>{BACK}</span>
          </span>
        </Link>
        <div id="titleDiv">
          <h2 id="patients_title">{PATIENT_DETAILS}</h2>
        </div>
        <Row>
          <BasicInformation labelValuePairs={this.getBasicInformationProps()} />
        </Row>
      </div>
    );
  }

  private getBasicInformationProps() {
    return [];
  }
}

const mapStateToprops = (state: any, ownProps: any) => {
  const patient_id = ownProps.match.params.patient_id;
  const result = {
    patientId: patient_id,
    smsData: getSmsData(state),
  };
  return result;
};

const ConnectedChildPatientDetails = connect(
  mapStateToprops,
  null
)(ChildPatientDetails);

export default ConnectedChildPatientDetails;
