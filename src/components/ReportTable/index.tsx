import ListView from '@onaio/list-view';
import { map } from 'lodash';
import React, { Component, Fragment } from 'react';
import { Dropdown, DropdownItem, DropdownMenu, DropdownToggle, Row } from 'reactstrap';
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
  const gestation: number = 24192000000;
  for (const dataItem in singlePatientEvents) {
    if (singlePatientEvents) {
      if (data[pregnancyIndex]) {
        if (
          singlePatientEvents[dataItem].sms_type === 'Pregnancy Registration' ||
          (data[pregnancyIndex][parseInt(dataItem, 10) - 1] &&
            gestation <
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

const getWeightsArray = (pregnancySmsData: PregnancySmsData[][]): number[][] => {
  const weights: number[][] = [];
  for (const element in pregnancySmsData) {
    if (pregnancySmsData[element]) {
      weights[element] = pregnancySmsData[element].map((sms: any): number => {
        return sms.weight;
      });
    }
  }
  return weights;
};

const getPregnancyStringArray = (pregnancySmsData: PregnancySmsData[][]): string[][][] => {
  let pregnancySmsStrings: string[][][] = [];

  const gestation: number = 24192000000;
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
  const indicesToRemove: number[] = [];
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
        indicesToRemove.push(parseInt(pregnancy, 10));
      }
    }
  }

  pregnancySmsStrings = pregnancySmsStrings.filter(
    (pregnancy, index) => !indicesToRemove.includes(index)
  );
  return pregnancySmsStrings;
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
      pregnancyDropdownLabel: '',
      pregnancyEventsArray: [],
    };
  }

  public render() {
    const listViewProps = {
      data: getPregnancyStringArray(this.state.pregnancyEventsArray)[this.state.currentPregnancy]
        ? getPregnancyStringArray(this.state.pregnancyEventsArray)[this.state.currentPregnancy]
        : [],
      headerItems: ['Report', 'Date', 'Reporter', 'Message'],
      tableClass: 'table-container',
      tbodyClass: 'body',
      tdClass: 'default-width',
    };

    return (
      <Fragment>
        <Row id="dropdownRow">
          <p>Showing reports for: </p>
          <Dropdown
            isOpen={this.state.dropdownOpenPregnancy}
            toggle={this.togglePregnancyDropDown}
            className="dropdown"
          >
            <DropdownToggle variant="success" id="dropdown-basic" caret={true} className="dropdown">
              {this.state.pregnancyDropdownLabel.length
                ? this.state.pregnancyDropdownLabel
                : 'select pregnancy'}
            </DropdownToggle>
            <DropdownMenu>
              {map(this.state.pregnancyEventsArray, pregnancy => {
                return (
                  <DropdownItem
                    onClick={this.handlePregnancyDropDownClick}
                    key={this.state.pregnancyEventsArray.indexOf(pregnancy)}
                  >
                    {(() => {
                      if (this.state.pregnancyEventsArray.indexOf(pregnancy) === 0) {
                        return 'current pregnancy';
                      } else {
                        const pregnancyIndex =
                          this.state.pregnancyEventsArray.length -
                          this.state.pregnancyEventsArray.indexOf(pregnancy);
                        return pregnancyIndex + getNumberSuffix(pregnancyIndex) + ' pregnancy';
                      }
                    })()}
                  </DropdownItem>
                );
              })}
            </DropdownMenu>
          </Dropdown>
        </Row>
        <Row id="tableRow">
          <ListView {...listViewProps} />
        </Row>
        <Row id={'chart'}>
          <MotherWeightChart
            weights={getWeightsArray(this.state.pregnancyEventsArray)[this.state.currentPregnancy]}
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
