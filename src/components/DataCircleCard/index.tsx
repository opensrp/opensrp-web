import React from 'react';
import { Card, CardBody, CardText, CardTitle, Col } from 'reactstrap';
import './index.css';

interface Props {
  highRisk: number;
  lowRisk: number;
  noRisk: number;
  title: string;
}

function DataCircleCard({ highRisk, lowRisk, noRisk, title }: Props) {
  return (
    <Col lg="3">
      <Card>
        <CardBody>
          <CardTitle>{title}</CardTitle>
          <CardText>
            <ul className="circlesRow">
              <li className="red">
                <span className="number">{highRisk}</span>
                <span className="risk-level">High Risk</span>
              </li>
              <li className="orange">
                <span className="number">{lowRisk}</span>
                <span className="risk-level">Low Risk</span>
              </li>
              <li className="green">
                <span className="number">{noRisk}</span>
                <span className="risk-level">No Risk</span>
              </li>
            </ul>
          </CardText>
        </CardBody>
      </Card>
    </Col>
  );
}

export default DataCircleCard;
