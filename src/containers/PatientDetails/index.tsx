import React, { Component } from 'react';
import { Container, Row } from 'reactstrap';
import BasicInformation from '../../components/BasicInformation';
import MotherWeightChart from '../../components/MotherWeightChart';
import './index.css';

const basicInformationProps = {
  currentEdd: '30.06.2019',
  currentGravidity: 2,
  currentParity: 1,
  id: '134235425',
  location: 'Kon Tum',
  previousPregnancyRisk: 'Convulsion, Caeserian',
};
class PatientDetails extends Component {
  public render() {
    return (
      <Container fluid={true} id={'patient-details'}>
        <Row>
          <BasicInformation {...basicInformationProps} />
        </Row>
        <Row>reports</Row>
        <Row id={'chart'}>
          <MotherWeightChart />
        </Row>
      </Container>
    );
  }
}

export default PatientDetails;
