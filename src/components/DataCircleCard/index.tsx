import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Card, CardBody, CardTitle } from 'reactstrap';
import {
  HIGH,
  HIGH_RISK,
  LOW,
  LOW_RISK,
  NBC_AND_PNC_CHILD,
  NBC_AND_PNC_WOMAN,
  NO,
  NO_RISK,
  NUTRITION,
  PREGNANCY,
  SMS_FILTER_FUNCTION,
} from '../../constants';
import { getLinkToHierarchichalDataTable } from '../../helpers/utils';
import { addFilterArgs } from '../../store/ducks/sms_events';
import './index.css';

/**
 * interface for props to be passed to DataCircleCard component.
 */
interface Props {
  highRisk: number;
  lowRisk: number;
  noRisk: number;
  title: string;
  addFilterArgsActionCreator?: typeof addFilterArgs;
  filterArgs?: SMS_FILTER_FUNCTION[];
  module: PREGNANCY | NBC_AND_PNC_CHILD | NBC_AND_PNC_WOMAN | NUTRITION | '';
  className?: string;
  userLocationId: string;
  permissionLevel: number;
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
  userLocationId,
  permissionLevel,
}: Props) {
  const locationId = userLocationId;
  return (
    <Card className={`dataCircleCard ${className}`}>
      <CardTitle>{title}</CardTitle>
      <CardBody>
        <ul className="circlesRow">
          <li className="red">
            <Link
              to={getLinkToHierarchichalDataTable(HIGH, module, title, permissionLevel, locationId)}
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
              to={getLinkToHierarchichalDataTable(LOW, module, title, permissionLevel, locationId)}
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
              to={getLinkToHierarchichalDataTable(NO, module, title, permissionLevel, locationId)}
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
