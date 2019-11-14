import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps, withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import { Row } from 'reactstrap';
import BasicInformation, { LabelValuePair } from '../../components/BasicInformation';
import ReportTable from '../../components/ReportTable';
import {
  BACK,
  BACKPAGE_ICON,
  CURRENT_EDD,
  CURRENT_GRAVIDITY,
  CURRENT_PARITY,
  ID,
  LOCATION,
  PATIENT_DETAILS,
  PREVIOUS_PREGNANCY_RISK,
} from '../../constants';
import { getSmsData, SmsData } from '../../store/ducks/sms_events';
import './index.css';

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

export class PatientInfo extends Component<Props, State> {
  public static defaultProps: Partial<Props> = defaultProps;
  public static getDerivedStateFromProps(props: Props, state: State) {
    return {
      filteredData: PatientInfo.filterByPatientAndSort(props),
    };
  }

  private static filterByPatientAndSort = (props: Props): SmsData[] => {
    return props.smsData
      .filter((dataItem: SmsData): boolean => {
        return dataItem.anc_id.toLocaleLowerCase().includes(props.patientId.toLocaleLowerCase());
      })
      .sort((event1: SmsData, event2: SmsData): number => {
        if (event1.EventDate < event2.EventDate) {
          return -1;
        }
        if (event1.EventDate > event2.EventDate) {
          return 1;
        }
        return 0;
      });
  };
  constructor(props: Props) {
    super(props);

    this.state = {
      filteredData: [],
    };
  }

  public render() {
    return (
      <div className="patient-details">
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
        <ReportTable singlePatientEvents={this.state.filteredData} />
      </div>
    );
  }

  private getCurrentEdd(): string {
    const reversedFilteredData: SmsData[] = [...this.state.filteredData];
    reversedFilteredData.reverse();
    for (const data in reversedFilteredData) {
      if (reversedFilteredData[data].lmp_edd) {
        return reversedFilteredData[data].lmp_edd + '';
      }
    }
    return 'could not find any edd';
  }

  private getCurrentGravidity(): number {
    const reversedFilteredData: SmsData[] = [...this.state.filteredData];
    reversedFilteredData.reverse();
    for (const data in reversedFilteredData) {
      if (reversedFilteredData[data].gravidity) {
        return reversedFilteredData[data].gravidity;
      }
    }
    return 0;
  }

  private getCurrenParity(): number {
    const reversedFilteredData: SmsData[] = [...this.state.filteredData];
    reversedFilteredData.reverse();
    for (const data in reversedFilteredData) {
      if (reversedFilteredData[data].parity) {
        return reversedFilteredData[data].parity;
      }
    }
    return 0;
  }

  private getCurrentLocation(): string {
    const reversedFilteredData: SmsData[] = [...this.state.filteredData];
    reversedFilteredData.reverse();
    for (const data in reversedFilteredData) {
      if (reversedFilteredData[data].health_worker_location_name) {
        return reversedFilteredData[data].health_worker_location_name;
      }
    }
    return 'could not find any location';
  }

  private getPreviousPregnancyRisk(): string {
    const reversedFilteredData: SmsData[] = [...this.state.filteredData];
    reversedFilteredData.reverse();
    if (reversedFilteredData[1]) {
      return reversedFilteredData[1].logface_risk;
    } else {
      return 'no risk';
    }
  }
  private getBasicInformationProps(): LabelValuePair[] {
    const basicInformationProps = [
      { label: ID, value: this.props.patientId },
      { label: LOCATION, value: this.getCurrentLocation() },
      { label: CURRENT_GRAVIDITY, value: this.getCurrentGravidity() },
      { label: CURRENT_EDD, value: this.getCurrentEdd() },
      { label: CURRENT_PARITY, value: this.getCurrenParity() },
      { label: PREVIOUS_PREGNANCY_RISK, value: this.getPreviousPregnancyRisk() },
    ] as LabelValuePair[];
    return basicInformationProps;
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

const PatientDetails = withRouter(PatientInfo);

const ConnectedPatientDetails = connect(
  mapStateToprops,
  null
)(PatientDetails);

export default ConnectedPatientDetails;
