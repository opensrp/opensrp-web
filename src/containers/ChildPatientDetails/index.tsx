import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps, withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import { BACK, BACKPAGE_ICON } from '../../constants';
import { getSmsData, SmsData } from '../../store/ducks/sms_events';
import { PatientInfo } from '../PatientDetails';

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
  public render() {
    return (
      <div className={'patient-details'}>
        <Link to="#" className="back-page">
          <span onClick={this.props.history.goBack}>
            <FontAwesomeIcon icon={BACKPAGE_ICON} size="lg" />
            <span>{BACK}</span>
          </span>
        </Link>
      </div>
    );
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
