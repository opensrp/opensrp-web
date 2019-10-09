import ListView from '@onaio/list-view';
import { map } from 'lodash';
import React, { Component, Fragment } from 'react';
import { Dropdown, DropdownItem, DropdownMenu, DropdownToggle, Row } from 'reactstrap';
import { SmsData } from '../../store/ducks/sms_events';
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
  pregnacyArray: string[][][];
  dropdownOpenPregnancy: boolean;
  currentPregnancy: number;
}

const convertToStringArray = (smsData: PregnancySmsData): string[] => {
  const arr: string[] = [];
  arr.push(smsData.sms_type);
  arr.push(smsData.EventDate);
  arr.push(smsData.health_worker_name);
  arr.push(smsData.message as string);
  return arr;
};

const getPregnancyArray = (singlePatientEvents: SmsData[]): string[][][] => {
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
  singlePatientEvents.sort((event1: SmsData, event2: SmsData): number => {
    if (event1.EventDate < event2.EventDate) {
      return -1;
    }
    if (event1.EventDate > event2.EventDate) {
      return 1;
    }
    return 0;
  });

  let pregnancyIndex: number = 0;
  const gestation: number = 24192000000;
  for (const dataItem in singlePatientEvents) {
    if (singlePatientEvents) {
      if (data[pregnancyIndex]) {
        if (
          singlePatientEvents[dataItem].sms_type === 'Pregnancy registration' ||
          (data[-1] &&
            gestation >
              Date.parse(singlePatientEvents[dataItem].EventDate) -
                Date.parse(data[pregnancyIndex][-1].EventDate))
        ) {
          pregnancyIndex = pregnancyIndex + 1;
          data[pregnancyIndex].push(singlePatientEvents[dataItem]);
        } else if (singlePatientEvents[dataItem].sms_type === 'Birth Report') {
          data[pregnancyIndex].push(singlePatientEvents[dataItem]);
          pregnancyIndex++;
        } else {
          data[pregnancyIndex].push(singlePatientEvents[dataItem]);
        }
      } else {
        data[pregnancyIndex] = [];
        data[pregnancyIndex].push(singlePatientEvents[dataItem]);
      }
    }
  }

  const pregnancySmsStrings: string[][][] = [];

  for (const element in data) {
    if (data[element]) {
      pregnancySmsStrings[element] = data[element].map((sms: PregnancySmsData): string[] => {
        return convertToStringArray(sms);
      });
    }
  }

  // filter out duplicate pregnancy registrations
  if (pregnancySmsStrings.length > 1) {
    for (const pregnancy in pregnancySmsStrings) {
      if (
        pregnancySmsStrings[parseInt(pregnancy, 10)].length === 1 &&
        gestation >
          Date.parse(pregnancySmsStrings[parseInt(pregnancy, 10)][0][1]) -
            Date.parse(pregnancySmsStrings[parseInt(pregnancy, 10) + 1][0][1])
      ) {
        pregnancySmsStrings.splice(parseInt(pregnancy, 10), 1);
      }
    }
  }
  return pregnancySmsStrings;
};

class ReportTable extends Component<Props, State> {
  public static getDerivedStateFromProps(props: Props, state: State) {
    return {
      pregnacyArray: getPregnancyArray(props.singlePatientEvents),
    };
  }
  constructor(props: Readonly<Props>) {
    super(props);

    this.state = {
      currentPregnancy: 0,
      dropdownOpenPregnancy: false,
      pregnacyArray: [],
    };
  }

  public render() {
    const listViewProps = {
      data: this.state.pregnacyArray[this.state.currentPregnancy]
        ? this.state.pregnacyArray[this.state.currentPregnancy]
        : [],
      headerItems: ['Report', 'Date', 'Reporter', 'Message'],
      tableClass: 'table-striped',
      tbodyClass: 'table-active',
      tdClass: 'td-primary',
      thClass: 'th-primary',
      theadClass: 'thead-dark',
      trClass: 'tr-warning',
    };

    return (
      <Fragment>
        <Row id="dropdownRow">
          <p>Showing reports for: </p>
          <Dropdown isOpen={this.state.dropdownOpenPregnancy} toggle={this.togglePregnancyDropDown}>
            <DropdownToggle variant="success" id="dropdown-basic" caret={true}>
              select pregnancy
            </DropdownToggle>
            <DropdownMenu>
              {map(this.state.pregnacyArray, type => {
                return (
                  <DropdownItem
                    onClick={this.handlePregnancyDropDownClick}
                    key={this.state.pregnacyArray.indexOf(type)}
                  >
                    {this.state.pregnacyArray.indexOf(type)}
                  </DropdownItem>
                );
              })}
            </DropdownMenu>
          </Dropdown>
        </Row>
        <Row id="tableRow">
          <ListView {...listViewProps} />
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
    this.setState({
      currentPregnancy: parseInt((e.target as HTMLInputElement).innerText, 10),
    });
  };
}

export default ReportTable;
