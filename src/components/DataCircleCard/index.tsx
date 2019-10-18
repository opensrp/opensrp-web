import React from 'react';
import { Link } from 'react-router-dom';
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
                <Link to="#">
                  <span className="number">{highRisk}</span>
                </Link>
                <span className="risk-level">High Risk</span>
              </li>
              <li className="orange">
                <Link to="#">
                  <span className="number">{lowRisk}</span>
                </Link>
                <span className="risk-level">Low Risk</span>
              </li>
              <li className="green">
                <Link to="#">
                  <span className="number">{noRisk}</span>
                </Link>
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
