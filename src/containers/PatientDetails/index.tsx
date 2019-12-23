import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { Link } from 'react-router-dom';
import { useLastLocation } from 'react-router-last-location';
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
import { filterByPatientId, sortByEventDate } from '../../helpers/utils';
import { getSmsData, SmsData } from '../../store/ducks/sms_events';
import './index.css';

interface Props extends RouteComponentProps {
  patientId: string;
  smsData: SmsData[];
  isNutrition: boolean;
}

export const PatientDetails = ({
  isNutrition = false,
  patientId = 'none',
  smsData = [],
}: Props) => {
  const [filteredData, setFilteredData] = useState<SmsData[]>([]);
  const lastLocation = useLastLocation();
  useEffect(() => {
    setFilteredData(
      sortByEventDate(
        filterByPatientId({
          patientId,
          smsData,
        })
      )
    );
  }, [patientId, smsData]);
  return (
    <div className="patient-details">
      <Link to={lastLocation ? lastLocation.pathname : '#'} className="back-page">
        <FontAwesomeIcon icon={BACKPAGE_ICON} size="lg" />
        <span>{BACK}</span>
      </Link>
      <div id="titleDiv">
        <h2 id="patients_title">{PATIENT_DETAILS}</h2>
      </div>
      <Row>
        <BasicInformation
          labelValuePairs={getBasicInformationProps(patientId, isNutrition, filteredData)}
        />
      </Row>
      <ReportTable isNutrition={isNutrition} singlePatientEvents={filteredData} />
    </div>
  );
};

function getBasicInformationProps(
  patientId: string,
  isNutrition: boolean,
  filteredData: SmsData[]
): LabelValuePair[] {
  const basicInformationProps = !isNutrition
    ? ([
        { label: ID, value: patientId },
        { label: LOCATION, value: getCurrentLocation(filteredData) },
        { label: CURRENT_GRAVIDITY, value: getCurrentGravidity(filteredData) },
        { label: CURRENT_EDD, value: getCurrentEdd(filteredData) },
        { label: CURRENT_PARITY, value: getCurrenParity(filteredData) },
        { label: PREVIOUS_PREGNANCY_RISK, value: getPreviousPregnancyRisk(filteredData) },
      ] as LabelValuePair[])
    : ([
        { label: CHILD_AGE, value: getAge(filteredData) },
        { label: ID, value: patientId },
        { label: RISK_CARTEGORIZATION, value: getNutritionStatus(filteredData) },
        { label: RESIDENCE, value: getCurrentLocation(filteredData) },
      ] as LabelValuePair[]);
  return basicInformationProps;
}

function getCurrentEdd(filteredData: SmsData[]): string {
  const reversedFilteredData: SmsData[] = [...filteredData];
  reversedFilteredData.reverse();
  for (const data in reversedFilteredData) {
    if (reversedFilteredData[data].lmp_edd) {
      return reversedFilteredData[data].lmp_edd + '';
    }
  }
  return 'could not find any edd';
}

function getAge(filteredData: SmsData[]): string {
  const reversedFilteredData: SmsData[] = [...filteredData];
  reversedFilteredData.reverse();
  for (const data in reversedFilteredData) {
    if (reversedFilteredData[data].age) {
      return reversedFilteredData[data].age;
    }
  }
  return '0';
}

function getNutritionStatus(filteredData: SmsData[]): string {
  const reversedFilteredData: SmsData[] = [...filteredData];
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

function getCurrentGravidity(filteredData: SmsData[]): number {
  const reversedFilteredData: SmsData[] = [...filteredData];
  reversedFilteredData.reverse();
  for (const data in reversedFilteredData) {
    if (reversedFilteredData[data].gravidity) {
      return reversedFilteredData[data].gravidity;
    }
  }
  return 0;
}

function getCurrenParity(filteredData: SmsData[]): number {
  const reversedFilteredData: SmsData[] = [...filteredData];
  reversedFilteredData.reverse();
  for (const data in reversedFilteredData) {
    if (reversedFilteredData[data].parity) {
      return reversedFilteredData[data].parity;
    }
  }
  return 0;
}

function getCurrentLocation(filteredData: SmsData[]): string {
  const reversedFilteredData: SmsData[] = [...filteredData];
  reversedFilteredData.reverse();
  for (const data in reversedFilteredData) {
    if (reversedFilteredData[data].health_worker_location_name) {
      return reversedFilteredData[data].health_worker_location_name;
    }
  }
  return 'could not find any location';
}

function getPreviousPregnancyRisk(filteredData: SmsData[]): string {
  const reversedFilteredData: SmsData[] = [...filteredData];
  reversedFilteredData.reverse();
  if (reversedFilteredData[1]) {
    return reversedFilteredData[1].logface_risk;
  } else {
    return 'no risk';
  }
}

const mapStateToprops = (
  state: any,
  ownProps: RouteComponentProps<{
    patient_id: string;
  }> & { isNutrition: boolean }
) => {
  return {
    isNutrition: ownProps.isNutrition,
    patientId: ownProps.match.params.patient_id,
    smsData: getSmsData(state),
  };
};

const ConnectedPatientDetails = connect(
  mapStateToprops,
  null
)(PatientDetails);

export default ConnectedPatientDetails;
