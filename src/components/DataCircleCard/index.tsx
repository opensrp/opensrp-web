import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Card, CardBody, CardTitle } from 'reactstrap';
import {
  HIERARCHICAL_DATA_URL,
  HIGH,
  HIGH_RISK,
  LOW,
  LOW_RISK,
  NBC_AND_PNC,
  NBC_AND_PNC_COMPARTMENTS_URL,
  NO,
  NO_RISK,
  NUTRITION,
  NUTRITION_COMPARTMENTS_URL,
  PREGNANCY,
  PREGNANCY_COMPARTMENTS_URL,
} from '../../constants';
import { addFilterArgs, FilterArgs } from '../../store/ducks/sms_events';
import './index.css';

interface Props {
  highRisk: number;
  lowRisk: number;
  noRisk: number;
  title: string;
  addFilterArgsActionCreator?: typeof addFilterArgs;
  filterArgs?: FilterArgs[];
  module: string;
  className?: string;
}

export function getModuleLink(module: string) {
  switch (module) {
    case PREGNANCY:
      return PREGNANCY_COMPARTMENTS_URL;
    case NUTRITION:
      return NUTRITION_COMPARTMENTS_URL;
    case NBC_AND_PNC:
      return NBC_AND_PNC_COMPARTMENTS_URL;
    default:
      return '';
  }
}

function DataCircleCard({
  highRisk,
  lowRisk,
  noRisk,
  title,
  addFilterArgsActionCreator = addFilterArgs,
  filterArgs,
  module,
  className = '',
}: Props) {
  return (
    <Card className={`dataCircleCard ${className}`}>
      <CardTitle>{title}</CardTitle>
      <CardBody>
        <ul className="circlesRow">
          <li className="red">
            <Link
              to={`${getModuleLink(module)}${HIERARCHICAL_DATA_URL}/${module}/${HIGH}/${title}`}
              // tslint:disable-next-line: jsx-no-lambda
              onClick={() => {
                if (filterArgs) {
                  addFilterArgsActionCreator(filterArgs);
                }
              }}
            >
              <span className="number">{highRisk}</span>
            </Link>
            <span className="risk-level">{HIGH_RISK}</span>
          </li>
          <li className="orange">
            <Link
              to={`${getModuleLink(module)}${HIERARCHICAL_DATA_URL}/${module}/${LOW}/${title}`}
              // tslint:disable-next-line: jsx-no-lambda
              onClick={() => {
                if (filterArgs) {
                  addFilterArgsActionCreator(filterArgs);
                }
              }}
            >
              <span className="number">{lowRisk}</span>
            </Link>
            <span className="risk-level">{LOW_RISK}</span>
          </li>
          <li className="green">
            <Link
              to={`${getModuleLink(module)}${HIERARCHICAL_DATA_URL}/${module}/${NO}/${title}`}
              // tslint:disable-next-line: jsx-no-lambda
              onClick={() => {
                if (filterArgs) {
                  addFilterArgsActionCreator(filterArgs);
                }
              }}
            >
              <span className="number">{noRisk}</span>
            </Link>
            <span className="risk-level">{NO_RISK}</span>
          </li>
        </ul>
      </CardBody>
    </Card>
  );
}

const mapDispatchToProps = { addFilterArgsActionCreator: addFilterArgs };

const ConnectedDataCircleCard = connect(
  null,
  mapDispatchToProps
)(DataCircleCard);

export default ConnectedDataCircleCard;
