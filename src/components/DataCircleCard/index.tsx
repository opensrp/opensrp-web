import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardBody, CardText, CardTitle, Col } from 'reactstrap';
import { HIERARCHICAL_DATA_URL } from '../../constants';
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
      <Card className="dataCircleCard">
        <CardBody>
          <CardTitle>{title}</CardTitle>
          <CardText>
            <ul className="circlesRow">
              <li className="red">
                <Link to={`${HIERARCHICAL_DATA_URL}/high-risk/${title}`}>
                  <span className="number">{highRisk}</span>
                </Link>
                <span className="risk-level">High Risk</span>
              </li>
              <li className="orange">
                <Link to={`${HIERARCHICAL_DATA_URL}/low-risk/${title}`}>
                  <span className="number">{lowRisk}</span>
                </Link>
                <span className="risk-level">Low Risk</span>
              </li>
              <li className="green">
                <Link to={`${HIERARCHICAL_DATA_URL}/no-risk/${title}`}>
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
