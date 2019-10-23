import ListView from '@onaio/list-view';
import { map } from 'lodash';
import React, { Component, Fragment } from 'react';
import { Dropdown, DropdownItem, DropdownMenu, DropdownToggle, Row } from 'reactstrap';
import { GESTATION_PERIOD } from '../../constants';
import { getNumberSuffix } from '../../helpers/utils';
import { SmsData } from '../../store/ducks/sms_events';
import MotherWeightChart from '../MotherWeightChart';
import './index.css';

interface Props {
  singlePatientEvents: SmsData[];
}
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

const convertToStringArray = (smsData: PregnancySmsData): string[] => {
  const arr: string[] = [];
  arr.push(smsData.sms_type);
  arr.push(smsData.EventDate);
  arr.push(smsData.health_worker_name);
  arr.push(smsData.message as string);
  return arr;
};

const getEventsPregnancyArray = (singlePatientEvents: SmsData[]): PregnancySmsData[][] => {
  // remove event types that we are not interested in and retain
  // only pregnancy registration, ANC and birth reports
  singlePatientEvents = singlePatientEvents.filter((event: SmsData) => {
    return (
      event.sms_type.toLowerCase() === 'birth report' ||
      event.sms_type.toLowerCase() === 'anc report' ||
      event.sms_type.toLowerCase() === 'pregnancy registration'
    );
  });

  const data: PregnancySmsData[][] = [];

  let pregnancyIndex: number = 0;
  for (const dataItem in singlePatientEvents) {
    if (singlePatientEvents) {
      if (data[pregnancyIndex]) {
        if (
          singlePatientEvents[dataItem].sms_type === 'Pregnancy Registration' ||
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
        } else if (singlePatientEvents[dataItem].sms_type === 'Birth Report') {
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
      pregnancyEventsArray: getEventsPregnancyArray(props.singlePatientEvents),
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
          pregnancySmsStrings[parseInt(pregnancy, 10)][0][0] === 'Pregnancy Registration' &&
          pregnancySmsStrings[parseInt(pregnancy, 10) + 1][0][0] === 'Pregnancy Registration'
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

  public getWeightsArray = (pregnancySmsData: PregnancySmsData[][]): number[][] => {
    let weights: number[][] = [];
    for (const element in pregnancySmsData) {
      if (pregnancySmsData[element]) {
        weights[element] = pregnancySmsData[element].map((sms: any): number => {
          return sms.weight;
        });
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
                            return 'current pregnancy';
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
          <MotherWeightChart
            weights={
              this.getWeightsArray(this.state.pregnancyEventsArray)[this.state.currentPregnancy]
            }
          />
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
    if ((e.target as HTMLInputElement).innerText === 'current pregnancy') {
      this.setState({
        currentPregnancy: 0,
        pregnancyDropdownLabel: 'current pregnancy',
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
