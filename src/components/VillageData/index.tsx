import React from 'react';
import { Row, Table } from 'reactstrap';
import {
  EDD,
  GRAVIDITY,
  LOCATION,
  PARITY,
  PATIENT_ID,
  PREVIOUS_PREGNANCY_RISK,
  RISK_CATEGORY,
} from '../../constants';
import { LocationWithData } from '../../containers/HierarchichalDataTable';
import { SmsData } from '../../store/ducks/sms_events';
import { PaginationData, Paginator, PaginatorProps } from '../Paginator';

interface Props {
  current_level: number;
  smsData: SmsData[];
}

interface State {
  currentPage: number;
}

const defaultProps: Props = {
  current_level: 0,
  smsData: [],
};

export default class VillageData extends React.Component<Props, State> {
  public static defaultProps = defaultProps;

  constructor(props: Props) {
    super(props);
    this.state = {
      currentPage: 1,
    };
  }
  public render() {
    const routePaginatorProps: PaginatorProps = {
      endLabel: 'last',
      nextLabel: 'next',
      onPageChange: (paginationData: PaginationData) => {
        this.setState({
          currentPage: paginationData.currentPage,
        });
      },
      pageLimit: 5,
      pageNeighbours: 3,
      previousLabel: 'previous',
      startLabel: 'first',
      totalRecords: this.props.smsData.length,
    };
    return (
      <React.Fragment>
        {this.props.current_level === 3 ? (
          <Row>
            <Table striped={true} borderless={true}>
              <thead id="header">
                <tr>
                  <th className="default-width">{PATIENT_ID}</th>
                  <th className="default-width">{GRAVIDITY}</th>
                  <th className="default-width">{PARITY}</th>
                  <th className="default-width">{LOCATION}</th>
                  <th className="default-width">{EDD}</th>
                  <th className="default-width">{PREVIOUS_PREGNANCY_RISK}</th>
                  <th className="default-width">{RISK_CATEGORY}</th>
                </tr>
              </thead>
              <tbody id="body">
                {this.props.smsData.length
                  ? this.props.smsData
                      .slice(
                        (this.state.currentPage - 1) * routePaginatorProps.pageLimit,
                        (this.state.currentPage - 1) * routePaginatorProps.pageLimit +
                          routePaginatorProps.pageLimit
                      )
                      .map((dataItem: SmsData) => {
                        return (
                          <tr key={dataItem.event_id}>
                            <td className="default-width">{dataItem.anc_id}</td>
                            <td className="default-width">{dataItem.gravidity}</td>
                            <td className="default-width">{dataItem.parity}</td>
                            <td className="default-width">{dataItem.location_id}</td>
                            <td className="default-width">{dataItem.lmp_edd}</td>
                            <td className="default-width">{dataItem.previous_risks}</td>
                            <td className="default-width">{dataItem.logface_risk}</td>
                          </tr>
                        );
                      })
                  : null}
              </tbody>
            </Table>
            <Paginator {...routePaginatorProps} />
          </Row>
        ) : null}
      </React.Fragment>
    );
  }
}
