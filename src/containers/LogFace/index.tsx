import reducerRegistry from '@onaio/redux-reducer-registry';
import superset from '@onaio/superset-connector';
import { Field, Formik } from 'formik';
import { map } from 'lodash';
import { useEffect, useState } from 'react';
import * as React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Table } from 'reactstrap';
import { Dropdown, DropdownItem, DropdownMenu, DropdownToggle } from 'reactstrap';
import Ripple from '../../components/page/Loading';
import { PaginationData, Paginator, PaginatorProps } from '../../components/Paginator';
import RiskColoring from '../../components/RiskColoring';
import {
  GET_FORM_DATA_ROW_LIMIT,
  SUPERSET_FETCH_TIMEOUT_INTERVAL,
  SUPERSET_PREGNANCY_DATA_EXPORT,
  SUPERSET_SMS_DATA_SLICE,
} from '../../configs/env';
import { SmsTypes } from '../../configs/settings';
import {
  ALL,
  DEFAULT_NUMBER_OF_LOGFACE_ROWS,
  EVENT_ID,
  LOG_FACE,
  LOGFACE_SEARCH_PLACEHOLDER,
  NBC_AND_PNC,
  NBC_AND_PNC_LOGFACE_URL,
  NUTRITION,
  NUTRITION_LOGFACE_URL,
  PREGNANCY,
  PREGNANCY_LOGFACE_URL,
  RISK_LEVEL,
  RISK_LEVELS,
  SELECT_LOCATION,
  SELECT_RISK,
  SELECT_TYPE,
  TYPE,
} from '../../constants';
import {
  fetchData,
  getFilterFunctionAndLocationLevel,
  getLinkToPatientDetail,
  getLocationId,
  sortFunction,
} from '../../helpers/utils';
import supersetFetch from '../../services/superset';
import {
  fetchLocations,
  fetchUserLocations,
  getLocationsOfLevel,
  getUserId,
  getUserLocations,
  Location,
  UserLocation,
} from '../../store/ducks/locations';
import locationsReducer, { reducerName as locationReducerName } from '../../store/ducks/locations';
import {
  addFilterArgs as addFilterArgsActionCreator,
  removeFilterArgs as removeFilterArgsActionCreator,
} from '../../store/ducks/sms_events';
import smsReducer, {
  fetchSms,
  getFilterArgs,
  getSmsData,
  reducerName as smsReducerName,
  SmsData,
  smsDataFetched,
} from '../../store/ducks/sms_events';
import './index.css';

reducerRegistry.register(smsReducerName, smsReducer);
reducerRegistry.register(locationReducerName, locationsReducer);

/**
 * Interface representing Logface props
 */
export interface Props {
  module: string;
  smsData?: SmsData[];
  fetchSmsDataActionCreator?: typeof fetchSms;
  dataFetched?: boolean;
  numberOfRows?: number;
  userUUID?: string;
  userLocationData?: UserLocation[];
  provinces?: Location[];
  districts?: Location[];
  communes?: Location[];
  villages?: Location[];
  addFilterArgs?: typeof addFilterArgsActionCreator;
  removeFilterArgs?: typeof removeFilterArgsActionCreator;
  fetchLocations?: typeof fetchLocations;
  fetchUserLocations?: typeof fetchUserLocations;
  userIdFetched?: boolean;
  isUserLocationDataFetched?: boolean;
  fetchUserIdActionCreator?: any;
  filterArgsInStore?: Array<(smsData: SmsData) => boolean>;
}

/**
 * A representation of the the current values of the dropdown on the logface
 * @member {string} riskLabel a label for no-risk, risk or red alert
 * @member {string} locationLabel a label for location drop down
 * @member {string} typeLabel a label for the SmsType
 */
interface DropDownLabels {
  riskLabel: string;
  locationLabel: string;
  typeLabel: string;
}

/**
 * The logface component
 * @param {Props} props
 */
export const LogFace = ({
  addFilterArgs = addFilterArgsActionCreator,
  communes = [],
  dataFetched = false,
  districts = [],
  fetchSmsDataActionCreator = fetchSms,
  filterArgsInStore = [],
  module,
  numberOfRows = DEFAULT_NUMBER_OF_LOGFACE_ROWS,
  provinces = [],
  removeFilterArgs = removeFilterArgsActionCreator,
  smsData = [],
  userLocationData = [],
  userUUID = '',
  villages = [],
}: Props) => {
  useEffect(() => {
    removeFilterArgs();
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const intervalId: NodeJS.Timeout = setInterval(() => {
      const smsDataInDescendingOrderByEventId: SmsData[] = smsData.sort(sortFunction);

      // pick the lartgest ID if this smsDataInDescendingOrderByEventId list is not empty
      if (smsDataInDescendingOrderByEventId.length) {
        const largestEventID: string = smsDataInDescendingOrderByEventId[0].event_id;
        const supersetParams = superset.getFormData(GET_FORM_DATA_ROW_LIMIT, [
          { comparator: largestEventID, operator: '>', subject: EVENT_ID },
        ]);
        supersetFetch(SUPERSET_SMS_DATA_SLICE, supersetParams)
          .then((result: SmsData[]) => {
            fetchSmsDataActionCreator(result);
          })
          .catch(() => {
            // console.log(error);
          });
      }
    }, SUPERSET_FETCH_TIMEOUT_INTERVAL);
    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [dropdownOpenRiskLevel, setDropdownOpenRiskLevel] = useState<boolean>(false);
  const [riskLabel, setRiskLabel] = useState<string>('');
  const [dropdownOpenLocation, setDropdownOpenLocation] = useState<boolean>(false);
  const [locationLabel, setLocationLabel] = useState<string>('');
  const [dropdownOpenType, setDropdownOpenType] = useState<boolean>(false);
  const [typeLabel, setTypeLabel] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [filterString, setFilterString] = useState<string>('');
  const [filteredData, setFilteredData] = useState<SmsData[]>([]);

  useEffect(() => {
    const allLabels: string[] = [riskLabel, locationLabel, typeLabel];
    const userLocationId = getLocationId(userLocationData, userUUID);

    const { locationFilterFunction } = getFilterFunctionAndLocationLevel(userLocationId, [
      provinces,
      districts,
      communes,
      villages,
    ]);
    if (
      locationFilterFunction &&
      !(
        filterArgsInStore
          .map((element: any) => {
            return element.toString();
          })
          .indexOf(locationFilterFunction.toString()) > -1
      )
    ) {
      removeFilterArgs();
      addFilterArgs([locationFilterFunction as ((smsData: SmsData) => boolean)]);
    }

    if (
      !filteredData.length &&
      allLabels.every((label: string) => !label.length || label === ALL) &&
      !(
        document.getElementById('input') &&
        (document.getElementById('input') as HTMLInputElement)!.value
      )
    ) {
      setFilteredData(smsData);
    } else {
      const smsDataInDescendingOrderByEventId: SmsData[] = filteredData.sort(sortFunction);
      if (smsDataInDescendingOrderByEventId.length) {
        const highestId = smsDataInDescendingOrderByEventId[0].event_id;
        const smsDataItem = smsData.find((dataItem: SmsData) => {
          return dataItem.event_id > highestId;
        });
        if (smsDataItem) {
          setFilteredData([...filteredData, smsDataItem].filter(locationFilterFunction));
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    userLocationData,
    userUUID,
    provinces,
    districts,
    communes,
    villages,
    filterArgsInStore,
    removeFilterArgs,
    addFilterArgs,
    smsData,
  ]);

  // this sets the current page to 1 if it's not already 1
  const resetCurrentPage = () => {
    if (currentPage > 1) {
      setCurrentPage(1);
    }
  };

  useEffect(() => {
    setFilteredData(
      filterDataByTextSearch(smsData, filterString, {
        locationLabel,
        riskLabel,
        typeLabel,
      }).sort(sortFunction)
    );
    resetCurrentPage();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [locationLabel, riskLabel, typeLabel]);

  useEffect(() => {
    setFilteredData(
      filterDataByTextSearch(smsData, filterString, {
        locationLabel,
        riskLabel,
        typeLabel,
      }).sort(sortFunction)
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterString]);

  const handleRiskLevelDropdownClick = (event: React.MouseEvent) => {
    setRiskLabel((event.target as HTMLInputElement).innerText);
  };

  const handleTermChange = (event: React.FormEvent<HTMLInputElement>) => {
    setFilterString((event.target as HTMLInputElement).value);
  };

  const handleLocationDropdownClick = async (event: React.MouseEvent) => {
    setLocationLabel((event.target as HTMLInputElement).innerText);
  };

  const handleTypeDropdownClick = (event: React.MouseEvent) => {
    setTypeLabel((event.target as HTMLInputElement).innerText);
  };

  const toggleTypeDropDown = () => {
    setDropdownOpenType(!dropdownOpenType);
  };

  const toggleLocationDropDown = () => {
    setDropdownOpenLocation(!dropdownOpenLocation);
  };

  const toggleRiskLevelDropDown = () => {
    setDropdownOpenRiskLevel(!dropdownOpenRiskLevel);
  };

  const onPageChangeHandler = (paginationData: PaginationData) => {
    setCurrentPage(paginationData.currentPage);
  };

  const routePaginatorProps: PaginatorProps = {
    endLabel: 'last',
    nextLabel: 'next',
    onPageChange: onPageChangeHandler,
    pageLimit: 5,
    pageNeighbours: 3,
    previousLabel: 'previous',
    startLabel: 'first',
    totalRecords: filteredData.length,
  };

  return (
    <div className="logface-content">
      <div>
        <h2 id="logface_title">{`${LOG_FACE} - ${module}`}</h2>
      </div>
      <div className="filter-panel">
        <div className="filters">
          {/*tslint:disable-next-line: jsx-no-lambda no-empty*/}
          <Formik initialValues={{}} onSubmit={() => {}}>
            {() => (
              <Field
                type="text"
                name="input"
                id="input"
                placeholder={LOGFACE_SEARCH_PLACEHOLDER}
                className={`form-control logface-search`}
                onChange={handleTermChange}
                disabled={!smsData.length}
              />
            )}
          </Formik>
          <div className="location-type-filter">
            <span>{RISK_LEVEL}</span>
            <Dropdown isOpen={dropdownOpenRiskLevel} toggle={toggleRiskLevelDropDown}>
              <DropdownToggle
                variant="success"
                id="dropdown-basic"
                caret={true}
                disabled={!smsData.length}
              >
                <span>{riskLabel.length ? riskLabel : SELECT_RISK}</span>
              </DropdownToggle>
              <DropdownMenu>
                {map(RISK_LEVELS, risk => {
                  return (
                    <DropdownItem onClick={handleRiskLevelDropdownClick} key={risk}>
                      {risk}
                    </DropdownItem>
                  );
                })}
              </DropdownMenu>
            </Dropdown>
          </div>
          <div className="location-type-filter">
            <span>{SELECT_LOCATION}</span>
            <Dropdown isOpen={dropdownOpenLocation} toggle={toggleLocationDropDown}>
              <DropdownToggle
                variant="success"
                id="dropdown-basic"
                caret={true}
                disabled={!smsData.length}
              >
                <span>{locationLabel.length ? locationLabel : SELECT_LOCATION}</span>
              </DropdownToggle>
              <DropdownMenu>
                {map(getAllLocations(smsData).concat(ALL), location => {
                  return (
                    <DropdownItem onClick={handleLocationDropdownClick} key={location}>
                      {location}
                    </DropdownItem>
                  );
                })}
              </DropdownMenu>
            </Dropdown>
          </div>
          <div className="location-type-filter">
            <span>{TYPE}</span>
            <Dropdown isOpen={dropdownOpenType} toggle={toggleTypeDropDown}>
              <DropdownToggle
                variant="success"
                id="dropdown-basic"
                caret={true}
                disabled={!smsData.length}
              >
                <span>{typeLabel.length ? typeLabel : SELECT_TYPE}</span>
              </DropdownToggle>
              <DropdownMenu>
                {map(SmsTypes, type => {
                  return (
                    <DropdownItem onClick={handleTypeDropdownClick} key={type}>
                      {type}
                    </DropdownItem>
                  );
                })}
                <DropdownItem onClick={handleTypeDropdownClick} key={ALL}>
                  {ALL}
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>
          <a id="export-button" href={SUPERSET_PREGNANCY_DATA_EXPORT} download={true}>
            Export data
          </a>
        </div>
      </div>
      {dataFetched && filteredData.length ? (
        <div className="table-container">
          <Table striped={true} borderless={true}>
            <thead id="header">
              <tr>
                <th className="default-width">ID</th>
                <th className="default-width">Event Date</th>
                <th className="default-width">Location</th>
                <th className="default-width">SMS Type</th>
                <th className="default-width">Reporter</th>
                <th className="default-width">Patient</th>
                <th className="small-width">Age</th>
                <th className="large-width">Message</th>
                <th className="default-width">Risk Level</th>
              </tr>
            </thead>
            <tbody id="body">
              {map(
                filteredData.slice(
                  (currentPage - 1) * numberOfRows,
                  (currentPage - 1) * numberOfRows + numberOfRows
                ),
                dataObj => {
                  return (
                    <tr key={dataObj.event_id}>
                      <td className="default-width">{dataObj.event_id}</td>
                      <td className="default-width">{dataObj.EventDate}</td>
                      <td className="default-width">{dataObj.health_worker_location_name}</td>
                      <td className="default-width">{dataObj.sms_type}</td>
                      <td className="default-width">{dataObj.health_worker_name}</td>
                      <td className="default-width">
                        <Link to={getLinkToPatientDetail(dataObj, getModuleLogFaceUrlLink(module))}>
                          {dataObj.anc_id}
                        </Link>
                      </td>
                      <td className="small-width">{dataObj.age}</td>
                      <td className="large-width">{dataObj.message}</td>
                      <td className="default-width">
                        <RiskColoring {...{ risk: dataObj.logface_risk }} />
                      </td>
                    </tr>
                  );
                }
              )}
            </tbody>
          </Table>
        </div>
      ) : (
        <Ripple />
      )}
      <div className="paginator">
        <Paginator {...routePaginatorProps} />
      </div>
    </div>
  );
};

/**
 * @param {string} module a string represeting the module this logface is being used for.
 * @return {string} the logface url for the module passed in. empty string if the module is invalid.
 */
function getModuleLogFaceUrlLink(module: string) {
  switch (module) {
    case PREGNANCY:
      return PREGNANCY_LOGFACE_URL;
    case NUTRITION:
      return NUTRITION_LOGFACE_URL;
    case NBC_AND_PNC:
      return NBC_AND_PNC_LOGFACE_URL;
    default:
      return '';
  }
}

/**
 *
 * @param {SmsData[]} smsData an array of SmsData objects.
 * @return {string[]} an array represeting all locations that can be found
 * in the smsData array passed in.
 */
function getAllLocations(smsData: SmsData[]): string[] {
  const locations = [];
  for (const i in smsData) {
    if (smsData[i].health_worker_location_name) {
      locations.push(smsData[i].health_worker_location_name);
    }
  }

  return Array.from(new Set(locations));
}

/**
 * @param {SmsData[]} allSmsData all the sms data passed as props to the to the logface component
 * @param {SmsData[]} filteredSmsData sms data that have been filtered by dropdowns(using filterDataByDropDowns)
 * @param {string} filterString a string by wich to filter smsData
 * @param {DropDownLabels} dropDownLabels labels of the drop downs on the logface which we will use to filter smsData
 */
function filterDataByTextSearch(
  allSmsData: SmsData[],
  filterString: string,
  dropDownLabels: DropDownLabels
): SmsData[] {
  const { riskLabel, locationLabel, typeLabel } = dropDownLabels;
  const isFiltered: boolean = [riskLabel, locationLabel, typeLabel].some(
    (label: string) => label.length || label !== ALL
  );
  let smsDataFilteredByDropDowns = allSmsData;
  if (isFiltered) {
    smsDataFilteredByDropDowns = filterDataByDropDowns(allSmsData, dropDownLabels);
  } else {
    smsDataFilteredByDropDowns = allSmsData;
  }
  return smsDataFilteredByDropDowns.filter(
    dataItem =>
      dataItem.event_id.toLocaleLowerCase().includes(filterString.toLocaleLowerCase()) ||
      dataItem.health_worker_name.toLocaleLowerCase().includes(filterString.toLocaleLowerCase()) ||
      dataItem.anc_id.toLocaleLowerCase().includes(filterString.toLocaleLowerCase())
  );
}

/**
 * filter sms data based on an event a user event based on the logface_risk, health_worker_location_name,
 * sms_type fields
 * @param {SmsData[]} smsData a list of SmsData objects
 * @param {React.MouseEvent} event the event we are filtering data based on.
 * @param {string} filterBy the category by which we are filtering the smsData.
 */
function filterDataByDropDowns(smsData: SmsData[], dropDownLabels: DropDownLabels) {
  const { riskLabel, locationLabel, typeLabel } = dropDownLabels;
  const allLabels = [riskLabel, locationLabel, typeLabel];
  const dataFiltered = smsData.filter((dataItem: SmsData) => {
    return (
      (allLabels[0].length && allLabels[0] !== ALL
        ? dataItem.logface_risk.toLowerCase().includes(allLabels[0])
        : allLabels[0] === ALL || !allLabels[0].length) &&
      (allLabels[1].length && allLabels[1] !== ALL
        ? dataItem.health_worker_location_name.replace(/\s+/g, ' ').includes(allLabels[1])
        : allLabels[1] === ALL || !allLabels[1].length) &&
      (allLabels[2].length && allLabels[2] !== ALL
        ? dataItem.sms_type.includes(allLabels[2])
        : allLabels[2] === ALL || !allLabels[2].length)
    );
  });
  return dataFiltered;
}

const mapStateToprops = (state: any): any => {
  const result = {
    communes: getLocationsOfLevel(state, 'Commune'),
    dataFetched: smsDataFetched(state),
    districts: getLocationsOfLevel(state, 'District'),
    filterArgsInStore: getFilterArgs(state),
    provinces: getLocationsOfLevel(state, 'Province'),
    smsData: getSmsData(state),
    userLocationData: getUserLocations(state),
    userUUID: getUserId(state),
    villages: getLocationsOfLevel(state, 'Village'),
  };
  return result;
};

const mapPropsToActions = {
  addFilterArgs: addFilterArgsActionCreator,
  fetchSmsDataActionCreator: fetchSms,
  removeFilterArgs: removeFilterArgsActionCreator,
};

const ConnectedLogFace = connect(
  mapStateToprops,
  mapPropsToActions
)(LogFace);

export default ConnectedLogFace;
