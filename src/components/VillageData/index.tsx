import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardBody, CardTitle, Row, Table } from 'reactstrap';
import {
  EDD,
  GRAVIDITY,
  LOCATION,
  NBC_AND_PNC_CHILD,
  PARITY,
  PATIENT_ID,
  PREGNANCY,
  PREVIOUS_PREGNANCY_RISK,
  RISK_CATEGORY,
} from '../../constants';
import { getModuleLink, getNumberOfDaysSinceDate } from '../../helpers/utils';
import { SmsData } from '../../store/ducks/sms_events';
import { PaginationData, Paginator, PaginatorProps } from '../Paginator';
import RiskColoring from '../RiskColoring';
import './index.css';

export interface Props {
  current_level: number;
  smsData: SmsData[];
  module: string;
}

interface State {
  currentPage: number;
}

const defaultProps: Props = {
  current_level: 0,
  module: '',
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
        {this.props.current_level >= 3 ? (
          <React.Fragment>
            <Row className="village villageDataRow">
              <Card className="table-card">
                <CardTitle>Selected Commune</CardTitle>
                <CardBody>
                  <Table striped={true} borderless={true}>
                    <thead id="header">
                      {this.props.module === PREGNANCY ? (
                        <tr>
                          <th className="default-width">{PATIENT_ID}</th>
                          <th className="default-width">{GRAVIDITY}</th>
                          <th className="default-width">{PARITY}</th>
                          <th className="default-width">{LOCATION}</th>
                          <th className="default-width">{EDD}</th>
                          <th className="default-width">{PREVIOUS_PREGNANCY_RISK}</th>
                          <th className="default-width">{RISK_CATEGORY}</th>
                        </tr>
                      ) : (
                        <tr>
                          <th className="default-width">{PATIENT_ID}</th>
                          <th className="default-width">{'Days since birth'}</th>
                          <th className="default-width">{'Location of residence'}</th>
                          <th className="default-width">{'current symptoms'}</th>
                          <th className="default-width">{'Location of birth'}</th>
                          <th className="default-width">{RISK_CATEGORY}</th>
                        </tr>
                      )}
                    </thead>
                    <tbody id="body">
                      {this.props.smsData.length
                        ? this.props.smsData
                            .slice(
                              (this.state.currentPage - 1) * routePaginatorProps.pageLimit,
                              (this.state.currentPage - 1) * routePaginatorProps.pageLimit +
                                routePaginatorProps.pageLimit
                            )
                            .map(
                              this.props.module === PREGNANCY
                                ? this.pregnancyMapFunction
                                : this.props.module === NBC_AND_PNC_CHILD
                                ? this.nbcAndPncChildMapFunction
                                : this.props.module === NUTRITION
                                ? this.nutritionMapFunction
                                : this.nbcAndPncMotherMapFunction
                            )
                        : null}
                    </tbody>
                  </Table>
                </CardBody>
              </Card>
            </Row>
            <Row id="navrow" className="villageDataRow">
              <Paginator {...routePaginatorProps} />
            </Row>
          </React.Fragment>
        ) : null}
      </React.Fragment>
    );
  }

  /**
   * Returns a <tr></tr> for an SmsData object passed to it
   * which is used to build the table above.
   * for the NBC & PNC_MOTHER module
   * @param {SmsData} dataItem - an SmsData object used to generate a table row
   * @return {JSX.Element} table row
   */
  public nbcAndPncMotherMapFunction = (dataItem: SmsData): JSX.Element => {
    return (
      <tr key={dataItem.event_id}>
        <td className="default-width">
          <Link to={`${getModuleLink(this.props.module)}/patient_detail/${dataItem.anc_id}`}>
            {dataItem.anc_id}
          </Link>
        </td>
        <td className="default-width">{getNumberOfDaysSinceDate(dataItem.EventDate)}</td>
        <td className="default-width">{dataItem.health_worker_location_name}</td>
        <td className="default-width">{dataItem.mother_symptoms}</td>
        <td className="default-width">{dataItem.health_worker_location_name}</td>
        <td className="default-width">
          <RiskColoring {...{ risk: dataItem.logface_risk }} />
        </td>
      </tr>
    );
  };

  /**
   * Returns a <tr></tr> for an SmsData object passed to it
   * which is used to build the table above.
   * for the NBC & PNC_CHILD module
   * @param {SmsData} dataItem - an SmsData object used to generate a table row
   * @return {JSX.Element} table row
   */
  public nbcAndPncChildMapFunction = (dataItem: SmsData): JSX.Element => {
    return (
      <tr key={dataItem.event_id}>
        <td className="default-width">
          <Link to={`${getModuleLink(this.props.module)}/child_patient_detail/${dataItem.anc_id}`}>
            {dataItem.anc_id}
          </Link>
        </td>
        <td className="default-width">{getNumberOfDaysSinceDate(dataItem.EventDate)}</td>
        <td className="default-width">{dataItem.health_worker_location_name}</td>
        <td className="default-width">{dataItem.child_symptoms}</td>
        <td className="default-width">{dataItem.health_worker_location_name}</td>
        <td className="default-width">
          <RiskColoring {...{ risk: dataItem.logface_risk }} />
        </td>
      </tr>
    );
  };

  /**
   * Returns a <tr></tr> for an SmsData object passed to it
   * which is used to build the table above.
   * for the PREGNANCY module
   * @param {SmsData} dataItem - an SmsData object used to generate a table row
   * @return {JSX.Element} table row
   */
  public pregnancyMapFunction = (dataItem: SmsData): JSX.Element => {
    return (
      <tr key={dataItem.event_id}>
        <td className="default-width">
          <Link to={`${getModuleLink(this.props.module)}/patient_detail/${dataItem.anc_id}`}>
            {dataItem.anc_id}
          </Link>
        </td>
        <td className="default-width">{dataItem.gravidity}</td>
        <td className="default-width">{dataItem.parity}</td>
        <td className="default-width">{dataItem.health_worker_location_name}</td>
        <td className="default-width">{dataItem.lmp_edd}</td>
        <td className="default-width">{dataItem.previous_risks}</td>
        <td className="default-width">
          <RiskColoring {...{ risk: dataItem.logface_risk }} />
        </td>
      </tr>
    );
  };

  /**
   * Returns a <tr></tr> for an SmsData object passed to it
   * which is used to build the table above.
   * for the NUTRITION module
   * @param {SmsData} dataItem - an SmsData object used to generate a table row
   * @return {JSX.Element} table row
   */
  public nutritionMapFunction = (dataItem: SmsData): JSX.Element => {
    return (
      <tr key={dataItem.event_id}>
        <td className="default-width">
          <Link to={`${getModuleLink(this.props.module)}/child_patient_detail/${dataItem.anc_id}`}>
            {dataItem.anc_id}
          </Link>
        </td>
        <td className="default-width">{getNumberOfDaysSinceDate(dataItem.EventDate)}</td>
        <td className="default-width">{dataItem.health_worker_location_name}</td>
        <td className="default-width">{dataItem.child_symptoms}</td>
        <td className="default-width">{dataItem.health_worker_location_name}</td>
        <td className="default-width">
          <RiskColoring {...{ risk: dataItem.logface_risk }} />
        </td>
      </tr>
    );
  };
}
