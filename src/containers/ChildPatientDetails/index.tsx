import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ListView from '@onaio/list-view';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { Link } from 'react-router-dom';
import { Dropdown, DropdownItem, DropdownMenu, DropdownToggle, Row } from 'reactstrap';
import BasicInformation, { LabelValuePair } from '../../components/BasicInformation';
import { WeightMonthYear } from '../../components/ReportTable';
import WeightAndHeightChart from '../../components/WeightAndHeightChart';
import {
  AGE,
  BACK,
  BACKPAGE_ICON,
  CAPITALIZED_MESSAGE,
  CHILD_HEIGHT_VS_MONTHS,
  CHILD_WEIGHT_MONITORING,
  CHILD_WEIGHT_VS_MONTHS,
  CM,
  COULD_NOT_FIND_ANY_LOCATION,
  COULD_NOT_FIND_RISK_CARTEGORIZATION,
  CURRENT_NUTRTION,
  DATE,
  HEIGHT,
  ID,
  KG,
  LENGTH_HEIGHT_MONITORING,
  LOCATION_OF_RESIDENCE,
  MONTHLY_NUTRITION_REPORT,
  NUTRITION_REGISTRATION,
  NUTRITION_REPORT,
  PATIENT_DETAILS,
  REPORT,
  REPORTER,
  RISK_CARTEGORIZATION,
  WEIGHT,
} from '../../constants';
import { filterByPatientId, getNumberOfDaysSinceDate, sortByEventDate } from '../../helpers/utils';
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
      filteredData: sortByEventDate(filterByPatientId(props)).filter((smsData: SmsData) => {
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
      headerItems: [REPORT, DATE, REPORTER, CAPITALIZED_MESSAGE],
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
          <p className={'padding-left'}>Showing reports for:</p>
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
          <WeightAndHeightChart
            weights={this.getWeightsArray()}
            chartWrapperId={'child-weights'}
            title={CHILD_WEIGHT_MONITORING}
            legendString={CHILD_WEIGHT_VS_MONTHS}
            units={KG}
            xAxisLabel={WEIGHT}
          />
        </Row>
        <Row>
          <WeightAndHeightChart
            weights={this.getHeightsArray()}
            chartWrapperId={'child-heights'}
            title={LENGTH_HEIGHT_MONITORING}
            legendString={CHILD_HEIGHT_VS_MONTHS}
            units={CM}
            xAxisLabel={HEIGHT}
          />
        </Row>
      </div>
    );
  }

  /**
   * dropdown toggle event handler
   * @return {boolean} false for now. so that the dropdown is always closed
   */
  private toggleDropdown() {
    return false;
  }

  /**
   * get an array of WeightMonthYear objects to be displayed on the
   * chart from filteredData.
   * @return {WeightMonthYear[]} an array of WeightMonthYear objects
   */
  private getWeightsArray(): WeightMonthYear[] {
    return this.state.filteredData.map((smsData: SmsData) => {
      return {
        month: new Date(smsData.EventDate).getMonth(),
        weight: smsData.weight,
        year: new Date(smsData.EventDate).getFullYear(),
      };
    });
  }

  /**
   * get an array of WeightMonthYear objects to be displayed on the
   * chart from filteredData.
   * @return {WeightMonthYear[]} an array of WeightMonthYear objects
   */
  private getHeightsArray() {
    return this.state.filteredData.map((smsData: SmsData) => {
      return {
        month: new Date(smsData.EventDate).getMonth(),
        weight: smsData.height,
        year: new Date(smsData.EventDate).getFullYear(),
      };
    });
  }

  /**
   * Find the last SmsData object with a logface_risk field that is not falsy
   * and then return the value of the logface_risk field for that object.
   * return the constant COULD_NOT_FIND_RISK_CARTEGORIZATION otherwiser.
   * @return {string} representing a logface risk.
   */
  private getRiskCartegorization = (): string => {
    const reversedFilteredData: SmsData[] = [...this.state.filteredData];
    reversedFilteredData.reverse();
    for (const data in reversedFilteredData) {
      if (reversedFilteredData[data].logface_risk) {
        return reversedFilteredData[data].logface_risk;
      }
    }
    return COULD_NOT_FIND_RISK_CARTEGORIZATION;
  };

  /**
   * return the number of days since the EVENT_DATE of the first
   * SmsData object in filteredData.
   * @return {string}
   */
  private getAgeInDays = (): string => {
    let date = '';

    if (this.state.filteredData[0]) {
      date = this.state.filteredData[0].EventDate;
    }
    return getNumberOfDaysSinceDate(date) + ' days';
  };

  /**
   * Find the last SmsData object with a health_worker_location_name field
   * that is not falsy and then return the value of the health_worker_location_name
   * field for that object.
   * return the constant COULD_NOT_FIND_LOCATION otherwiser.
   * @return {string} representing a logface risk.
   */
  private getCurrentLocation = (): string => {
    const reversedFilteredData: SmsData[] = [...this.state.filteredData];
    reversedFilteredData.reverse();
    for (const data in reversedFilteredData) {
      if (reversedFilteredData[data].health_worker_location_name) {
        return reversedFilteredData[data].health_worker_location_name;
      }
    }
    return COULD_NOT_FIND_ANY_LOCATION;
  };

  /**
   * get the data to be passed as props to the BasicInformation component.
   */
  private getBasicInformationProps = () => {
    return [
      { label: ID, value: this.props.patientId },
      { label: AGE, value: this.getAgeInDays() },
      { label: LOCATION_OF_RESIDENCE, value: this.getCurrentLocation() },
      { label: RISK_CARTEGORIZATION, value: this.getRiskCartegorization() },
    ] as LabelValuePair[];
  };

  /**
   * Get data in a format that can be passed as a prop to the listview
   */
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
