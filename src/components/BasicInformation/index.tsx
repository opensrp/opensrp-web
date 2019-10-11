import React from 'react';
import { Card, CardTitle, Col, Row } from 'reactstrap';
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
        <CardTitle>Basic Information</CardTitle>
        <Row>
          <Col className={'detailsColumn'} sm="12" lg="6">
            <span className={'right'}>ID</span>
            <span />
            <span className={'left'}>{props.id}</span>
            <span className={'right'}>Current Gravidity</span>
            <span />
            <span className={'left'}>{props.currentGravidity}</span>
            <span className={'right'}>Current Parity</span>
            <span />
            <span className={'left'}>{props.currentParity}</span>
          </Col>
          <Col className={'detailsColumn'} sm="12" lg="6">
            <span className={'right'}>Location</span>
            <span />
            <span className={'left'}>{props.location}</span>
            <span className={'right'}>Current EDD</span>
            <span />
            <span className={'left'}>{props.currentEdd}</span>
            <span className={'right'}>Previous Pregnancy Risk</span>
            <span />
            <span className={'left'}>{props.previousPregnancyRisk}</span>
          </Col>
        </Row>
      </Card>
    </Row>
  );
}
