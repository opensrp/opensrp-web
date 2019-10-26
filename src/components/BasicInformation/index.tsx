import React from 'react';
import { Card, CardTitle, Col, Row } from 'reactstrap';
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
            <span className={'right'}>{ID}</span>
            <span />
            <span className={'left'}>{props.id}</span>
            <span className={'right'}>{CURRENT_GRAVIDITY}</span>
            <span />
            <span className={'left'}>{props.currentGravidity}</span>
            <span className={'right'}>{CURRENT_PARITY}</span>
            <span />
            <span className={'left'}>{props.currentParity}</span>
          </Col>
          <Col className={'detailsColumn'} sm="12" lg="6">
            <span className={'right'}>{LOCATION}</span>
            <span />
            <span className={'left'}>{props.location}</span>
            <span className={'right'}>{CURRENT_EDD}</span>
            <span />
            <span className={'left'}>{props.currentEdd}</span>
            <span className={'right'}>{PREVIOUS_PREGNANCY_RISK}</span>
            <span />
            <span className={'left'}>{props.previousPregnancyRisk}</span>
          </Col>
        </Row>
      </Card>
    </Row>
  );
}
