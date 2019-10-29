import React from 'react';
import { Card, CardTitle, Col, Row, Table } from 'reactstrap';
import {
  BASIC_INFORMATION,
  CURRENT_EDD,
  CURRENT_GRAVIDITY,
  CURRENT_PARITY,
  ID,
  LOCATION,
  PREVIOUS_PREGNANCY_RISK,
} from '../../constants';
import './index.css';

interface Props {
  id: string;
  currentGravidity: number;
  currentParity: number;
  location: string;
  currentEdd?: string;
  previousPregnancyRisk: string;
}

export default function BasicInformation(props: Props) {
  return (
    <Row id={'detailsRow'}>
      <Card id={'detailsCard'}>
        <CardTitle>{BASIC_INFORMATION}</CardTitle>
        <Row>
          <Col className={'detailsColumn'} sm="12" lg="6">
            <Table borderless={true}>
              <tbody>
                <tr>
                  <td>{ID}</td>
                  <td>{props.id}</td>
                </tr>
                <tr>
                  <td>{CURRENT_GRAVIDITY}</td>
                  <td>{props.currentGravidity}</td>
                </tr>
                <tr>
                  <td>{CURRENT_PARITY}</td>
                  <td>{props.currentParity}</td>
                </tr>
              </tbody>
            </Table>
          </Col>
          <Col className={'detailsColumn'} sm="12" lg="6">
            <Table borderless={true}>
              <tbody>
                <tr>
                  <td>{LOCATION}</td>
                  <td>{props.location}</td>
                </tr>
                <tr>
                  <td>{CURRENT_EDD}</td>
                  <td>{props.currentEdd}</td>
                </tr>
                <tr>
                  <td>{PREVIOUS_PREGNANCY_RISK}</td>
                  <td>{props.previousPregnancyRisk}</td>
                </tr>
              </tbody>
            </Table>
          </Col>
        </Row>
      </Card>
    </Row>
  );
}
