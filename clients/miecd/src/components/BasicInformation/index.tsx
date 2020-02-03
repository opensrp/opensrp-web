import React from 'react';
import { Card, CardTitle, Col, Row, Table } from 'reactstrap';
import { BASIC_INFORMATION } from '../../constants';
import './index.css';

export interface LabelValuePair {
  label: string;
  value: string | number;
}

interface Props {
  labelValuePairs: LabelValuePair[];
}

export default function BasicInformation({ labelValuePairs = [] }: Props) {
  return (
    <Row id={'detailsRow'}>
      <Card id={'detailsCard'}>
        <CardTitle>{BASIC_INFORMATION}</CardTitle>
        <Row>
          <Col className={'detailsColumn'} sm="12" lg="6">
            <Table borderless={true}>
              <tbody>
                {labelValuePairs.map((labelValuePair: LabelValuePair, index: number) => {
                  if (index % 2) {
                    return (
                      <tr key={index}>
                        <td>{labelValuePair.label}</td>
                        <td>{labelValuePair.value}</td>
                      </tr>
                    );
                  } else {
                    return null;
                  }
                })}
              </tbody>
            </Table>
          </Col>
          <Col className={'detailsColumn'} sm="12" lg="6">
            <Table borderless={true}>
              <tbody>
                {labelValuePairs.map((labelValuePair: LabelValuePair, index: number) => {
                  if (!(index % 2)) {
                    return (
                      <tr key={index}>
                        <td>{labelValuePair.label}</td>
                        <td>{labelValuePair.value}</td>
                      </tr>
                    );
                  } else {
                    return null;
                  }
                })}
              </tbody>
            </Table>
          </Col>
        </Row>
      </Card>
    </Row>
  );
}
