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
  CHILD_AGE,
  CURRENT_EDD,
  CURRENT_GRAVIDITY,
  CURRENT_PARITY,
  ID,
  LOCATION,
  NUTRITION,
  PATIENT_DETAILS,
  PREVIOUS_PREGNANCY_RISK,
  RESIDENCE,
  RISK_CARTEGORIZATION,
} from '../../constants';
import { filterByPatientAndSort } from '../../helpers/utils';
import { getSmsData, SmsData } from '../../store/ducks/sms_events';
import './index.css';

interface Props extends RouteComponentProps {
  patientId: string;
  smsData: SmsData[];
  isNutrition: boolean;
}

interface State {
  filteredData: SmsData[];
}

const defaultProps: Partial<Props> = {
  isNutrition: false,
  patientId: 'none',
  smsData: [],
};

export class PatientInfo extends Component<Props, State> {
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
        <ReportTable
          isNutrition={this.props.isNutrition}
          singlePatientEvents={this.state.filteredData}
        />
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

  private getAge(): string {
    const reversedFilteredData: SmsData[] = [...this.state.filteredData];
    reversedFilteredData.reverse();
    for (const data in reversedFilteredData) {
      if (reversedFilteredData[data].age) {
        return reversedFilteredData[data].age;
      }
    }
    return '0';
  }

  private getNutritionStatus(): string {
    const reversedFilteredData: SmsData[] = [...this.state.filteredData];
    reversedFilteredData.reverse();
    const statusFields: string[] = ['nutrition_status', 'growth_status', 'feeding_category'];
    for (const data in reversedFilteredData) {
      if (reversedFilteredData[data]) {
        for (const field in statusFields) {
          if ((reversedFilteredData[data] as any)[statusFields[field]]) {
            return (reversedFilteredData[data] as any)[statusFields[field]];
          }
        }
      }
    }
    return 'no risk category';
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
    const basicInformationProps = !this.props.isNutrition
      ? ([
          { label: ID, value: this.props.patientId },
          { label: LOCATION, value: this.getCurrentLocation() },
          { label: CURRENT_GRAVIDITY, value: this.getCurrentGravidity() },
          { label: CURRENT_EDD, value: this.getCurrentEdd() },
          { label: CURRENT_PARITY, value: this.getCurrenParity() },
          { label: PREVIOUS_PREGNANCY_RISK, value: this.getPreviousPregnancyRisk() },
        ] as LabelValuePair[])
      : ([
          { label: CHILD_AGE, value: this.getAge() },
          { label: ID, value: this.props.patientId },
          { label: RISK_CARTEGORIZATION, value: this.getNutritionStatus() },
          { label: RESIDENCE, value: this.getCurrentLocation() },
        ] as LabelValuePair[]);
    return basicInformationProps;
  }
}

const mapStateToprops = (state: any, ownProps: any) => {
  const patient_id = ownProps.match.params.patient_id;
  const result = {
    isNutrition: ownProps.match.url.includes(NUTRITION.toLowerCase()),
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
