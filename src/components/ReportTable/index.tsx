import ListView from '@onaio/list-view';
import React, { Component, Fragment } from 'react';
import { Dropdown, DropdownItem, DropdownMenu, DropdownToggle, Row } from 'reactstrap';
import {
  ANC_REPORT,
  BIRTH_REPORT,
  CHILD_HEIGHT,
  CHILD_HEIGHT_MONITORING,
  CHILD_WEIGHT,
  CHILD_WEIGHT_MONITORING,
  CURRENT_PREGNANCY,
  GESTATION_PERIOD,
  HEIGHT,
  KG,
  MOTHER_WEIGHT_TRACKING,
  MOTHERS_WEIGHT,
  NUTRITION_REGISTRATION,
  NUTRITION_REPORT,
  PREGNANCY_REGISTRATION,
  WEIGHT,
} from '../../constants';
import { getNumberSuffix } from '../../helpers/utils';
import { SmsData } from '../../store/ducks/sms_events';
import WeightAndHeightChart from '../WeightAndHeightChart';
import './index.css';

interface Props {
  singlePatientEvents: SmsData[];
  isNutrition: boolean;
}

/**
 * An object that represents the weight of a child
 * or mother for a given month and year.
 * @member {number} weight  the weight
 * @member {number} month a number between 0 and 11 representing the month
 * @member {number} year the year the month is in.
 */
export interface WeightMonthYear {
  weight: number;
  month: number;
  year: number;
}

/**
 * An object representing Pregnancy data contained in an SmsEvent
 * object but has been adapted specifically for the pregnancy module
 * @member {string} EventDate - the date the SmsEvent was created. this is
 * when the sms was sent.
 * @member {string | number} message - the string/number representation of the message
 * @member {string} health_workder_name - name of health worker who sent the message
 * @member {string}  sms_type - the sms type.
 */
interface PregnancySmsData {
  EventDate: string;
  message: string | number;
  health_worker_name: string;
  sms_type: string;
}
interface State {
  pregnancyEventsArray: PregnancySmsData[][];
  dropdownOpenPregnancy: boolean;
  currentPregnancy: number;
  pregnancyDropdownLabel: string;
  indicesToRemove: number[];
}

export const convertToStringArray = (smsData: PregnancySmsData): string[] => {
  const arr: string[] = [];
  arr.push(smsData.sms_type);
  arr.push(smsData.EventDate);
  arr.push(smsData.health_worker_name);
  arr.push(smsData.message as string);
  return arr;
};

export const getEventsPregnancyArray = (
  singlePatientEvents: SmsData[],
  isNutrition: boolean
): PregnancySmsData[][] => {
  // remove event types that we are not interested in and retain
  // only pregnancy registration, ANC and birth reports
  singlePatientEvents = !isNutrition
    ? singlePatientEvents.filter((event: SmsData) => {
        return (
          event.sms_type.toLowerCase() === BIRTH_REPORT.toLowerCase() ||
          event.sms_type.toLowerCase() === ANC_REPORT.toLowerCase() ||
          event.sms_type.toLowerCase() === PREGNANCY_REGISTRATION.toLowerCase()
        );
      })
    : singlePatientEvents.filter((event: SmsData) => {
        return (
          event.sms_type.toLowerCase() === NUTRITION_REPORT.toLowerCase() ||
          event.sms_type.toLowerCase() === NUTRITION_REGISTRATION.toLowerCase()
        );
      });
  const data: PregnancySmsData[][] = [];

  let pregnancyIndex: number = 0;
  for (const dataItem in singlePatientEvents) {
    if (singlePatientEvents) {
      if (data[pregnancyIndex]) {
        if (
          singlePatientEvents[dataItem].sms_type === PREGNANCY_REGISTRATION ||
          (data[pregnancyIndex][parseInt(dataItem, 10) - 1] &&
            GESTATION_PERIOD <
              Date.parse(singlePatientEvents[dataItem].EventDate) -
                Date.parse(data[pregnancyIndex][parseInt(dataItem, 10) - 1].EventDate))
        ) {
          pregnancyIndex = pregnancyIndex + 1;
          if (!data[pregnancyIndex]) {
            data[pregnancyIndex] = [];
          }
          data[pregnancyIndex].push(singlePatientEvents[dataItem]);
        } else if (singlePatientEvents[dataItem].sms_type === BIRTH_REPORT) {
          data[pregnancyIndex].push(singlePatientEvents[dataItem]);
        } else {
          data[pregnancyIndex].push(singlePatientEvents[dataItem]);
        }
      } else {
        data[pregnancyIndex] = [];
        data[pregnancyIndex].push(singlePatientEvents[dataItem]);
      }
    }
  }

  return data;
};

class ReportTable extends Component<Props, State> {
  public static getDerivedStateFromProps(props: Props, state: State) {
    return {
      pregnancyEventsArray: getEventsPregnancyArray(props.singlePatientEvents, props.isNutrition),
    };
  }

  constructor(props: Readonly<Props>) {
    super(props);

    this.state = {
      currentPregnancy: 0,
      dropdownOpenPregnancy: false,
      indicesToRemove: [],
      pregnancyDropdownLabel: '',
      pregnancyEventsArray: [],
    };
  }

  public getPregnancyStringArray = (pregnancySmsData: PregnancySmsData[][]): string[][][] => {
    let pregnancySmsStrings: string[][][] = [];

    const gestation: number = GESTATION_PERIOD;
    for (const element in pregnancySmsData) {
      if (pregnancySmsData[element]) {
        pregnancySmsStrings[element] = pregnancySmsData[element].map(
          (sms: PregnancySmsData): string[] => {
            return convertToStringArray(sms);
          }
        );
      }
    }

    // filter out duplicate pregnancy registrations
    if (pregnancySmsStrings.length > 1) {
      for (const pregnancy in pregnancySmsStrings) {
        if (
          pregnancySmsStrings.length - 1 !== parseInt(pregnancy, 10) &&
          pregnancySmsStrings[parseInt(pregnancy, 10)].length === 1 &&
          gestation >
            Date.parse(pregnancySmsStrings[parseInt(pregnancy, 10)][0][1]) -
              Date.parse(pregnancySmsStrings[parseInt(pregnancy, 10) + 1][0][1]) &&
          pregnancySmsStrings[parseInt(pregnancy, 10)][0][0] === PREGNANCY_REGISTRATION &&
          pregnancySmsStrings[parseInt(pregnancy, 10) + 1][0][0] === PREGNANCY_REGISTRATION
        ) {
          this.state.indicesToRemove.push(parseInt(pregnancy, 10));
        }
      }
    }

    pregnancySmsStrings = pregnancySmsStrings.filter(
      (pregnancy, index) => !this.state.indicesToRemove.includes(index)
    );
    return pregnancySmsStrings;
  };

  public getWeightsArray = (
    pregnancySmsData: PregnancySmsData[][],
    field: string
  ): WeightMonthYear[][] => {
    let weights: WeightMonthYear[][] = [];
    for (const element in pregnancySmsData) {
      if (pregnancySmsData[element]) {
        weights[element] = pregnancySmsData[element].map(
          (sms: any): WeightMonthYear => {
            return {
              month: new Date(sms.EventDate).getMonth(),
              weight: sms[field],
              year: new Date(sms.EventDate).getFullYear(),
            };
          }
        );
      }
    }

    weights = weights.filter((pregnancy, index) => !this.state.indicesToRemove.includes(index));
    return weights;
  };

  public render() {
    const listViewProps = {
      data: this.getPregnancyStringArray(this.state.pregnancyEventsArray)[
        this.state.currentPregnancy
      ]
        ? this.getPregnancyStringArray(this.state.pregnancyEventsArray)[this.state.currentPregnancy]
        : [],
      headerItems: ['Report', 'Date', 'Reporter', 'Message'],
      tableClass: 'table-container',
      tbodyClass: 'body',
      tdClass: 'default-width',
    };

    return (
      <Fragment>
        <Row id="filter-panel">
          <p>Showing reports for:&emsp;</p>
          <div className="filters">
            <Dropdown
              isOpen={this.state.dropdownOpenPregnancy}
              toggle={this.togglePregnancyDropDown}
            >
              <DropdownToggle variant="success" id="dropdown-basic" caret={true}>
                <span>
                  {this.state.pregnancyDropdownLabel.length
                    ? this.state.pregnancyDropdownLabel
                    : 'select pregnancy'}
                </span>
              </DropdownToggle>
              <DropdownMenu>
                {this.getPregnancyStringArray(this.state.pregnancyEventsArray).map(
                  (pregnancy, i) => {
                    return (
                      <DropdownItem onClick={this.handlePregnancyDropDownClick} key={i}>
                        {(() => {
                          if (i === 0) {
                            return CURRENT_PREGNANCY;
                          } else {
                            const pregnancyIndex =
                              this.getPregnancyStringArray(this.state.pregnancyEventsArray).length -
                              i;
                            return pregnancyIndex + getNumberSuffix(pregnancyIndex) + ' pregnancy';
                          }
                        })()}
                      </DropdownItem>
                    );
                  }
                )}
              </DropdownMenu>
            </Dropdown>
          </div>
        </Row>
        <Row id="tableRow">
          <ListView {...listViewProps} />
        </Row>
        <Row id={'chart'}>
          <WeightAndHeightChart
            weights={
              this.getWeightsArray(this.state.pregnancyEventsArray, 'weight')[
                this.state.currentPregnancy
              ]
            }
            chartWrapperId={this.props.isNutrition ? 'nutrition-chart' : 'pregnancy-chart'}
            title={this.props.isNutrition ? CHILD_WEIGHT_MONITORING : MOTHER_WEIGHT_TRACKING}
            legendString={this.props.isNutrition ? CHILD_WEIGHT : MOTHERS_WEIGHT}
            units={KG}
            xAxisLabel={WEIGHT}
          />
          {this.props.isNutrition ? (
            <WeightAndHeightChart
              weights={
                this.getWeightsArray(this.state.pregnancyEventsArray, 'height')[
                  this.state.currentPregnancy
                ]
              }
              chartWrapperId={'nutrition-chart-1'}
              title={CHILD_HEIGHT_MONITORING}
              legendString={CHILD_HEIGHT}
              units={'cm'}
              xAxisLabel={HEIGHT}
            />
          ) : null}
        </Row>
      </Fragment>
    );
  }

  private togglePregnancyDropDown = () => {
    this.setState({
      dropdownOpenPregnancy: !this.state.dropdownOpenPregnancy,
    });
  };

  private handlePregnancyDropDownClick = (e: React.MouseEvent) => {
    // here we will take the new index and change the state using that index
    if ((e.target as HTMLInputElement).innerText === CURRENT_PREGNANCY) {
      this.setState({
        currentPregnancy: 0,
        pregnancyDropdownLabel: CURRENT_PREGNANCY,
      });
    } else {
      this.setState({
        currentPregnancy: parseInt((e.target as HTMLInputElement).innerText, 10),
        pregnancyDropdownLabel: (e.target as HTMLInputElement).innerText,
      });
    }
  };
}

export default ReportTable;
