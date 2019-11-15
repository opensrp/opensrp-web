import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ListView from '@onaio/list-view';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { Link } from 'react-router-dom';
import { Dropdown, DropdownItem, DropdownMenu, DropdownToggle, Row } from 'reactstrap';
import BasicInformation, { LabelValuePair } from '../../components/BasicInformation';
import MotherWeightChart from '../../components/MotherWeightChart';
import {
  AGE,
  BACK,
  BACKPAGE_ICON,
  CURRENT_NUTRTION,
  ID,
  LOCATION_OF_RESIDENCE,
  MONTHLY_NUTRITION_REPORT,
  NUTRITION_REGISTRATION,
  NUTRITION_REPORT,
  PATIENT_DETAILS,
  RISK_CARTEGORIZATION,
} from '../../constants';
import { filterByPatientAndSort } from '../../helpers/utils';
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

class ChildPatientDetails extends Component<Props, State> {
  public static defaultProps: Partial<Props> = defaultProps;
  public static getDerivedStateFromProps(props: Props, state: State) {
    return {
      filteredData: filterByPatientAndSort(props).filter((smsData: SmsData) => {
        return (
          smsData.sms_type === NUTRITION_REGISTRATION ||
          smsData.sms_type === NUTRITION_REPORT ||
          smsData.sms_type === MONTHLY_NUTRITION_REPORT
        );
      }),
    };
  }
  constructor(props: Props) {
    super(props);

    this.state = {
      filteredData: [],
    };
  }
  public render() {
    const listViewProps = {
      data: this.buildDataArray(),
      headerItems: ['Report', 'Date', 'Reporter', 'Message'],
      tableClass: 'table-container',
      tbodyClass: 'body',
      tdClass: 'default-width',
    };
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
        <Row id="filter-panel">
          <p>Showing reports for:&emsp;</p>
          <div className="filters">
            <Dropdown isOpen={false} toggle={this.toggleDropdown}>
              <DropdownToggle variant="success" id="dropdown-basic" caret={true}>
                {CURRENT_NUTRTION}
              </DropdownToggle>
              <DropdownMenu>
                <DropdownItem>{CURRENT_NUTRTION}</DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>
        </Row>
        <Row>
          <ListView {...listViewProps} />
        </Row>
        <Row>
          <MotherWeightChart weights={this.getWeightsArray()} chartWrapperId={'child-weights'} />
        </Row>
        <Row>
          <MotherWeightChart weights={this.getHeightsArray()} chartWrapperId={'child-heights'} />
        </Row>
      </div>
    );
  }

  private toggleDropdown() {
    return false;
  }

  private getWeightsArray() {
    return this.state.filteredData.map((smsData: SmsData) => {
      return {
        month: new Date(smsData.EventDate).getMonth(),
        weight: smsData.weight,
        year: new Date(smsData.EventDate).getFullYear(),
      };
    });
  }

  private getHeightsArray() {
    return this.state.filteredData.map((smsData: SmsData) => {
      return {
        month: new Date(smsData.EventDate).getMonth(),
        weight: smsData.height,
        year: new Date(smsData.EventDate).getFullYear(),
      };
    });
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

  private buildDataArray() {
    return this.state.filteredData.map((smsData: SmsData) => [
      smsData.sms_type,
      smsData.EventDate,
      smsData.health_worker_name,
      smsData.message,
    ]);
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
