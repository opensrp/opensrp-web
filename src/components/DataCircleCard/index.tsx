import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardBody, CardTitle } from 'reactstrap';
import { HIERARCHICAL_DATA_URL, HIGH_RISK, LOW_RISK, NO_RISK } from '../../constants';
import './index.css';

interface Props {
  highRisk: number;
  lowRisk: number;
  noRisk: number;
  title: string;
}

function DataCircleCard({ highRisk, lowRisk, noRisk, title }: Props) {
  return (
    <Card className="dataCircleCard">
      <CardTitle>{title}</CardTitle>
      <CardBody>
        <ul className="circlesRow">
          <li className="red">
            <Link to={`${HIERARCHICAL_DATA_URL}/high-risk/${title}`}>
              <span className="number">{highRisk}</span>
            </Link>
            <span className="risk-level">{HIGH_RISK}</span>
          </li>
          <li className="orange">
            <Link to={`${HIERARCHICAL_DATA_URL}/low-risk/${title}`}>
              <span className="number">{lowRisk}</span>
            </Link>
            <span className="risk-level">{LOW_RISK}</span>
          </li>
          <li className="green">
            <Link to={`${HIERARCHICAL_DATA_URL}/no-risk/${title}`}>
              <span className="number">{noRisk}</span>
            </Link>
            <span className="risk-level">{NO_RISK}</span>
          </li>
        </ul>
      </CardBody>
    </Card>
  );
}

export default DataCircleCard;
