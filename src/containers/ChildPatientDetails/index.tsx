import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { Link } from 'react-router-dom';
import { Row } from 'reactstrap';
import BasicInformation, { LabelValuePair } from '../../components/BasicInformation';
import {
  AGE,
  BACK,
  BACKPAGE_ICON,
  ID,
  LOCATION_OF_RESIDENCE,
  PATIENT_DETAILS,
  RISK_CARTEGORIZATION,
} from '../../constants';
import { filterByPatientAndSort } from '../../helpers/utils';
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
  public static getDerivedStateFromProps(props: Props, state: State) {
    return {
      filteredData: filterByPatientAndSort(props),
    };
  }
  constructor(props: Props) {
    super(props);

    this.state = {
      filteredData: [],
    };
  }
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

  private getRiskCartegorization = () => {
    const reversedFilteredData: SmsData[] = [...this.state.filteredData];
    reversedFilteredData.reverse();
    for (const data in reversedFilteredData) {
      if (reversedFilteredData[data].logface_risk) {
        return reversedFilteredData[data].logface_risk;
      }
    }
    return 'could not find any location';
  };
  private getCurrentLocation = (): string => {
    const reversedFilteredData: SmsData[] = [...this.state.filteredData];
    reversedFilteredData.reverse();
    for (const data in reversedFilteredData) {
      if (reversedFilteredData[data].health_worker_location_name) {
        return reversedFilteredData[data].health_worker_location_name;
      }
    }
    return 'could not find any location';
  };

  private getBasicInformationProps = () => {
    return [
      { label: ID, value: this.props.patientId },
      { label: AGE, value: '' },
      { label: LOCATION_OF_RESIDENCE, value: this.getCurrentLocation() },
      { label: RISK_CARTEGORIZATION, value: this.getRiskCartegorization() },
    ] as LabelValuePair[];
  };
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
