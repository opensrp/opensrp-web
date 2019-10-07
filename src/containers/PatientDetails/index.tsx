import React, { Component } from 'react';
import MotherWeightChart from '../../components/MotherWeightChart';

class PatientDetails extends Component {
  public render() {
    return (
      <div className={'container-fluid'}>
        <div className={'row'}>basic information</div>
        <div className={'row'}>reports</div>
        <div className={'row'}>
          <MotherWeightChart />
        </div>
      </div>
    );
  }
}

export default PatientDetails;
