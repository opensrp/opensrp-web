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
  NO,
  NO_RISK,
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
}

function DataCircleCard({
  highRisk,
  lowRisk,
  noRisk,
  title,
  addFilterArgsActionCreator = addFilterArgs,
  filterArgs,
}: Props) {
  return (
    <Card className="dataCircleCard">
      <CardTitle>{title}</CardTitle>
      <CardBody>
        <ul className="circlesRow">
          <li className="red">
            <Link
              to={`${HIERARCHICAL_DATA_URL}/${HIGH}/${title}`}
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
              to={`${HIERARCHICAL_DATA_URL}/${LOW}/${title}`}
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
              to={`${HIERARCHICAL_DATA_URL}/${NO}/${title}`}
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
