import { ReactNodeArray } from 'prop-types';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { CardGroup, Row } from 'reactstrap';
import { Store } from 'redux';
import ConnectedDataCircleCard from '../../components/DataCircleCard';
import Ripple from '../../components/page/Loading';
import VillageData from '../../components/VillageData';
import {
  COMPARTMENTS,
  EC_CHILD,
  EC_FAMILY_MEMBER,
  EC_WOMAN,
  HIGH,
  LOW,
  MICROSECONDS_IN_A_WEEK,
  NBC_AND_PNC,
  NBC_AND_PNC_CHILD,
  NBC_AND_PNC_WOMAN,
  NO_RISK_LOWERCASE,
  NUTRITION,
  PREGNANCY,
  RED,
  SMS_FILTER_FUNCTION,
  VIETNAM_COUNTRY_LOCATION_ID,
} from '../../constants';
import {
  buildHeaderBreadCrumb,
  convertMilisecondsToYear,
  fetchData,
  getFilterFunctionAndLocationLevel,
  getLocationId,
  HeaderBreadCrumb,
} from '../../helpers/utils';
import { FlexObject } from '../../helpers/utils';
import {
  getLocationsOfLevel,
  getUserId,
  getUserLocations,
  Location,
  UserLocation,
} from '../../store/ducks/locations';
import {
  addFilterArgs as addFilterArgsActionCreator,
  getFilterArgs,
  getFilteredSmsData,
  removeFilterArgs as removeFilterArgsActionCreator,
  SmsData,
  smsDataFetched,
} from '../../store/ducks/sms_events';
import './index.css';

interface Props {
  filterArgsInStore: SMS_FILTER_FUNCTION[];
  smsData: SmsData[];
  userLocationData: UserLocation[];
  dataFetched: boolean;
  userUUID: string;
  addFilterArgs: typeof addFilterArgsActionCreator;
  removeFilterArgs: typeof removeFilterArgsActionCreator;
  filterArgs: SMS_FILTER_FUNCTION[];
  module: string;
  provinces: Location[];
  districts: Location[];
  communes: Location[];
  villages: Location[];
}

interface PregnancyAndNBCDataCircleCardProps {
  filterArgs?: SMS_FILTER_FUNCTION[];
  noRisk: number;
  permissionLevel: number;
  module: string;
  redAlert: number;
  risk: number;
  title: string;
}

interface NutritionDataCircleCardProps {
  filterArgs: SMS_FILTER_FUNCTION[];
  inappropriateFeeding: number;
  module: string;
  overweight: number;
  permissionLevel: number;
  stunting: number;
  title: string;
  totalChildren: number;
  wasting: number;
}

export const Compartments = ({
  module = '',
  smsData = [],
  dataFetched = false,
  userLocationData = [],
  userUUID = '',
  provinces = [],
  districts = [],
  communes = [],
  villages = [],
  filterArgsInStore = [],
  filterArgs = [],
  removeFilterArgs = removeFilterArgsActionCreator,
  addFilterArgs = addFilterArgsActionCreator,
}: Props) => {
  const [filteredData, setFilteredData] = useState<SmsData[]>([]);
  const [locationAndPath, setLocationAndPath] = useState<HeaderBreadCrumb>({
    level: '',
    location: '',
    locationId: '',
    path: '',
  });
  const [userLocationId, setUserLocationId] = useState<string>('');
  const [userLocationLevel, setUserLocationLevel] = useState<number>(4);

  const [
    allPregnanciesProps,
    setallPregnanciesProps,
  ] = useState<null | PregnancyAndNBCDataCircleCardProps>(null);
  const [
    pregnaciesDueIn2WeeksProps,
    setpregnaciesDueIn2WeeksProps,
  ] = useState<null | PregnancyAndNBCDataCircleCardProps>(null);
  const [
    pregnanciesDueIn1WeekProps,
    setpregnanciesDueIn1WeekProps,
  ] = useState<null | PregnancyAndNBCDataCircleCardProps>(null);

  // fetch data and add to store when the component mounts
  useEffect(() => {
    removeFilterArgs();
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // update state when some props change
  useEffect(() => {
    setUserLocationId(getLocationId(userLocationData, userUUID));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userUUID, userLocationData]);

  useEffect(() => {
    const { locationLevel, locationFilterFunction } = getFilterFunctionAndLocationLevel(
      userLocationId,
      [provinces, districts, communes, villages]
    );

    if (
      locationFilterFunction &&
      !(
        filterArgsInStore
          .map(element => {
            return element.toString();
          })
          .indexOf(locationFilterFunction.toString()) > -1
      )
    ) {
      removeFilterArgs();
      addFilterArgs(filterArgs);
      addFilterArgs([locationFilterFunction as SMS_FILTER_FUNCTION]);
    }
    const locationPath = buildHeaderBreadCrumb(
      userLocationId,
      provinces,
      districts,
      communes,
      villages,
      VIETNAM_COUNTRY_LOCATION_ID
    );

    setFilteredData(smsData.filter(locationFilterFunction));
    setLocationAndPath(locationPath);
    setUserLocationLevel(locationLevel);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userLocationId, provinces, districts, communes, villages, filterArgsInStore]);

  useEffect(() => {
    const birthsInTheFuture = module === PREGNANCY ? smsData.filter(filterByDateInTheFuture) : [];
    setallPregnanciesProps(
      module === PREGNANCY
        ? ({
            filterArgs: [filterByDateInTheFuture] as SMS_FILTER_FUNCTION[],
            module: PREGNANCY,
            noRisk: getNumberOfSmsWithRisk(NO_RISK_LOWERCASE, birthsInTheFuture, 'logface_risk'),
            permissionLevel: userLocationLevel,
            redAlert: getNumberOfSmsWithRisk(RED, birthsInTheFuture, 'logface_risk'),
            risk:
              getNumberOfSmsWithRisk(LOW, birthsInTheFuture, 'logface_risk') +
              getNumberOfSmsWithRisk(HIGH, birthsInTheFuture, 'logface_risk'),
            title: birthsInTheFuture.length + ' Total Pregnancies',
          } as PregnancyAndNBCDataCircleCardProps)
        : null
    );

    const filterByDateInNext2Weeks = filterByDateInNextNWeeks(2);
    const filterByDateInNext1Week = filterByDateInNextNWeeks(1);

    const last2WeeksSmsData = module === PREGNANCY ? smsData.filter(filterByDateInNext2Weeks) : [];
    setpregnaciesDueIn2WeeksProps(
      module === PREGNANCY
        ? {
            filterArgs: [filterByDateInNext2Weeks] as SMS_FILTER_FUNCTION[],
            module: PREGNANCY,
            noRisk: getNumberOfSmsWithRisk(
              NO_RISK_LOWERCASE,
              last2WeeksSmsData || [],
              'logface_risk'
            ),
            permissionLevel: userLocationLevel,
            redAlert: getNumberOfSmsWithRisk(RED, last2WeeksSmsData || [], 'logface_risk'),
            risk:
              getNumberOfSmsWithRisk(LOW, last2WeeksSmsData || [], 'logface_risk') +
              getNumberOfSmsWithRisk(HIGH, last2WeeksSmsData || [], 'logface_risk'),
            title: last2WeeksSmsData.length + ' Total Pregnancies due in 2 weeks',
          }
        : null
    );

    const last1WeekSmsData = module === PREGNANCY ? smsData.filter(filterByDateInNext1Week) : [];
    setpregnanciesDueIn1WeekProps(
      module === PREGNANCY
        ? {
            filterArgs: [filterByDateInNext1Week] as SMS_FILTER_FUNCTION[],
            module: PREGNANCY,
            noRisk: getNumberOfSmsWithRisk(
              NO_RISK_LOWERCASE,
              last1WeekSmsData || [],
              'logface_risk'
            ),
            permissionLevel: userLocationLevel,
            redAlert: getNumberOfSmsWithRisk(HIGH, last1WeekSmsData || [], 'logface_risk'),
            risk: getNumberOfSmsWithRisk(LOW, last1WeekSmsData || [], 'logface_risk'),
            title: last1WeekSmsData.length + ' Total Pregnancies due in 1 week',
          }
        : null
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filteredData, userLocationId]);

  const [
    dataCircleCardChildData,
    setDataCircleCardChildData,
  ] = useState<null | PregnancyAndNBCDataCircleCardProps>(null);
  const [
    dataCircleCardWomanData,
    setDataCircleCardWomanData,
  ] = useState<null | PregnancyAndNBCDataCircleCardProps>(null);

  // this should only run when the module is NBC & PNC
  useEffect(() => {
    const newBorn: SmsData[] = module === NBC_AND_PNC ? filteredData.filter(filterByEcChild) : [];

    setDataCircleCardChildData(
      module === NBC_AND_PNC
        ? {
            filterArgs: [filterByEcChild] as SMS_FILTER_FUNCTION[],
            module: NBC_AND_PNC_CHILD,
            noRisk: getNumberOfSmsWithRisk(NO_RISK_LOWERCASE, newBorn, 'logface_risk'),
            permissionLevel: userLocationLevel,
            redAlert: getNumberOfSmsWithRisk(RED, newBorn, 'logface_risk'),
            risk:
              getNumberOfSmsWithRisk(LOW, newBorn, 'logface_risk') +
              getNumberOfSmsWithRisk(HIGH, newBorn, 'logface_risk'),
            title: newBorn.length + ' Total Newborn',
          }
        : null
    );

    const woman: SmsData[] = filteredData.filter((dataItem: SmsData) => {
      return dataItem.client_type === EC_WOMAN || dataItem.client_type === EC_FAMILY_MEMBER;
    });

    setDataCircleCardWomanData(
      module === NBC_AND_PNC
        ? {
            filterArgs: [
              (dataItem: SmsData) => {
                return (
                  dataItem.client_type === EC_WOMAN || dataItem.client_type === EC_FAMILY_MEMBER
                );
              },
            ] as SMS_FILTER_FUNCTION[],
            module: NBC_AND_PNC_WOMAN,
            noRisk: getNumberOfSmsWithRisk(NO_RISK_LOWERCASE, woman, 'logface_risk'),
            permissionLevel: userLocationLevel,
            redAlert: getNumberOfSmsWithRisk(RED, woman, 'logface_risk'),
            risk:
              getNumberOfSmsWithRisk(LOW, woman, 'logface_risk') +
              getNumberOfSmsWithRisk(HIGH, woman, 'logface_risk'),
            title: woman.length + ' Total mother in PNC',
          }
        : null
    );

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filteredData]);

  const [
    dataCircleCardNutrition1,
    setDataCircleCardNutrition1,
  ] = useState<null | NutritionDataCircleCardProps>(null);
  const [
    dataCircleCardNutrition2,
    setDataCircleCardNutrition2,
  ] = useState<null | NutritionDataCircleCardProps>(null);

  useEffect(() => {
    const childrenBetween0And2FilterFunction = childrenAgeRangeFilterFunction(0, 2);
    const childrenBetween2And5FilterFuction = childrenAgeRangeFilterFunction(2, 5);
    const childrenUnder2 = filteredData.filter(childrenBetween0And2FilterFunction);

    const childrenUnder5 = filteredData.filter(childrenBetween2And5FilterFuction);

    setDataCircleCardNutrition1(
      module === NUTRITION
        ? {
            filterArgs: [childrenBetween2And5FilterFuction],
            inappropriateFeeding: getNumberOfSmsWithRisk(
              'inappropriately fed',
              childrenUnder5,
              'feeding_category'
            ),
            module: NUTRITION,
            overweight: getNumberOfSmsWithRisk('overweight', childrenUnder5, 'nutrition_status'),
            permissionLevel: userLocationLevel,
            stunting: getNumberOfSmsWithRisk('stunted', childrenUnder5, 'growth_status'),
            title: 'Children Under 5',
            totalChildren: 0,
            wasting: getNumberOfSmsWithRisk('severe wasting', childrenUnder5, 'nutrition_status'),
          }
        : null
    );

    setDataCircleCardNutrition2(
      module === NUTRITION
        ? {
            filterArgs: [childrenBetween0And2FilterFunction],
            inappropriateFeeding: getNumberOfSmsWithRisk(
              'inappropriately fed',
              childrenUnder2,
              'feeding_category'
            ),
            module: NUTRITION,
            overweight: getNumberOfSmsWithRisk('overweight', childrenUnder2, 'nutrition_status'),
            permissionLevel: userLocationLevel,
            stunting: getNumberOfSmsWithRisk('stunted', childrenUnder2, 'growth_status'),
            title: 'Children Under 2',
            totalChildren: 0,
            wasting: getNumberOfSmsWithRisk('severe wasting', childrenUnder2, 'nutrition_status'),
          }
        : null
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filteredData]);

  const [circleCardComponent, setCircleCardComponent] = useState<ReactNodeArray>([]);

  useEffect(() => {
    const circleCardProps: FlexObject = {
      [PREGNANCY]: [pregnanciesDueIn1WeekProps, pregnaciesDueIn2WeeksProps, allPregnanciesProps],
      [NBC_AND_PNC]: [dataCircleCardChildData, dataCircleCardWomanData],
      [NUTRITION]: [dataCircleCardNutrition1, dataCircleCardNutrition2],
    };

    const componentArray: ReactNodeArray = [];
    Object.keys(circleCardProps).forEach((moduleElement: string) => {
      circleCardProps[moduleElement].forEach((prop: any, index: number) => {
        if (module === moduleElement) {
          componentArray.push(
            <ConnectedDataCircleCard
              key={index}
              userLocationId={userLocationId}
              module={module}
              {...prop}
            />
          );
        }
      });
    });
    setCircleCardComponent(componentArray);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    dataCircleCardNutrition1,
    dataCircleCardNutrition2,
    dataCircleCardWomanData,
    dataCircleCardChildData,
    allPregnanciesProps,
    pregnaciesDueIn2WeeksProps,
    pregnanciesDueIn1WeekProps,
  ]);

  return (
    <div className="compartment-wrapper compartments compartment-data-table">
      <Row>
        <h2 id="compartment_title">{COMPARTMENTS}</h2>
      </Row>
      <Row className="breadcrumb-row">
        <p id="breadcrumb">
          {locationAndPath.path}
          <span id="breadcrumb-span">{locationAndPath.location}</span>
        </p>
      </Row>
      {dataFetched && filteredData.length ? (
        <React.Fragment>
          <div className="cards-row">
            <CardGroup>{circleCardComponent.slice(0, 2)}</CardGroup>
          </div>
          <div className="cards-row">
            <CardGroup>{circleCardComponent[2] ? circleCardComponent[2] : null}</CardGroup>
          </div>
          {(module === PREGNANCY || module === NUTRITION) && smsData.length ? (
            <VillageData
              {...{
                current_level: userLocationLevel,
                module,
                smsData: filteredData,
              }}
            />
          ) : null}
        </React.Fragment>
      ) : (
        <Ripple />
      )}
    </div>
  );
};

/**
 * filter function for smsData based on date_of_birth field
 * @param {SmsData} dataItem - SmsData item
 * @param {number} startAge - the begining of age range we are filtering for.
 * @returns filterFunction  - the ending of age range we are filtering for.
 */
export const childrenAgeRangeFilterFunction = (startAge: number, endAge: number) => {
  return (dataItem: SmsData) => {
    const ageInYears = convertMilisecondsToYear(
      new Date().getTime() - new Date(dataItem.date_of_birth).getTime()
    );
    return ageInYears < endAge && ageInYears > startAge;
  };
};

/**
 * get the number of sms_reports with a certain value in one of its fields
 * specified by field.
 * @param {string} risk - value of logface_risk to look for
 * @param {SmsData[]} smsData - an array of SmsData objects
 * @param {string | any} field - sms event field for which we want to
 * check the value passed in risk
 */
const getNumberOfSmsWithRisk = (risk: string, smsData: SmsData[], field: string) => {
  function reducer(accumulator: number, currentValue: SmsData) {
    if ((currentValue as any)[field].toLowerCase().includes(risk)) {
      return accumulator + 1;
    } else {
      return accumulator;
    }
  }
  return smsData.reduce(reducer, 0);
};

/**
 * @param {number} n number of weeks future
 */
export const filterByDateInNextNWeeks = (n: number) => {
  return (dataItem: SmsData) => {
    return (
      Date.parse(dataItem.lmp_edd) - Date.now() > 0 &&
      Date.parse(dataItem.lmp_edd) - Date.now() < n * MICROSECONDS_IN_A_WEEK
    );
  };
};

/**
 *
 * @param dataItem
 * @param {SmsData} dataItem sms data item
 */
const filterByDateInTheFuture = (dataItem: SmsData): boolean => {
  return Date.parse(dataItem.lmp_edd) - Date.now() > 0;
};

/**
 * @param {SmsData} dataItem an SmsData item to be filtered out or in.
 * @return {boolean} should the dataItem be filtered in or out.
 */
const filterByEcChild: (smsData: SmsData) => boolean = (dataItem: SmsData) => {
  return dataItem.client_type === EC_CHILD;
};

const mapStateToprops = (state: Partial<Store>) => {
  return {
    communes: getLocationsOfLevel(state, 'Commune'),
    dataFetched: smsDataFetched(state),
    districts: getLocationsOfLevel(state, 'District'),
    filterArgsInStore: getFilterArgs(state),
    provinces: getLocationsOfLevel(state, 'Province'),
    smsData: getFilteredSmsData(state, getFilterArgs(state) as SMS_FILTER_FUNCTION[]),
    userLocationData: getUserLocations(state),
    userUUID: getUserId(state),
    villages: getLocationsOfLevel(state, 'Village'),
  };
};

const mapDispatchToProps = {
  addFilterArgs: addFilterArgsActionCreator,
  removeFilterArgs: removeFilterArgsActionCreator,
};

const ConnectedCompartments = connect(
  mapStateToprops,
  mapDispatchToProps
)(Compartments);

export default ConnectedCompartments;
