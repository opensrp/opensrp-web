import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container, Row } from 'reactstrap';
import BasicInformation from '../../components/BasicInformation';
import ReportTable from '../../components/ReportTable';
import supersetFetch from '../../services/superset';
import { fetchSms, getSmsData, SmsData } from '../../store/ducks/sms_events';
import { smsSlice } from '../LogFace/tests/fixtures';
import './index.css';

interface Props {
  patientId: string;
  testData: SmsData[];
  fetchTestDataActionCreator: typeof fetchSms;
}

interface State {
  filteredData: SmsData[];
}

class PatientDetails extends Component<Props, State> {
  public static getDerivedStateFromProps(props: Props, state: State) {
    return {
      filteredData: PatientDetails.filterByPatientAndSort(props),
    };
  }

  private static filterByPatientAndSort = (props: Props): SmsData[] => {
    return props.testData
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

  public componentDidMount() {
    // this will be removed later because this data
    // will aready be in the store by now
    const { fetchTestDataActionCreator } = this.props;
    // supersetFetch('2263').then((result: any) => {
    fetchTestDataActionCreator(smsSlice);
    // });
  }
  public render() {
    return (
      <Container fluid={true} id={'patient-details'}>
        <Row>
          <BasicInformation {...this.getBasicInformationProps()} />
        </Row>
        <ReportTable singlePatientEvents={this.state.filteredData} />
      </Container>
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
  private getBasicInformationProps() {
    const basicInformationProps = {
      currentEdd: this.getCurrentEdd(),
      currentGravidity: this.getCurrentGravidity(),
      currentParity: this.getCurrenParity(),
      id: this.props.patientId,
      location: this.getCurrentLocation(),
      previousPregnancyRisk: this.getPreviousPregnancyRisk(),
    };
    return basicInformationProps;
  }
}

const mapStateToprops = (state: any) => {
  const result = {
    testData: getSmsData(state),
  };
  return result;
};

const mapPropsToActions = { fetchTestDataActionCreator: fetchSms };

const ConnectedPatientDetails = connect(
  mapStateToprops,
  mapPropsToActions
)(PatientDetails);

export default ConnectedPatientDetails;
