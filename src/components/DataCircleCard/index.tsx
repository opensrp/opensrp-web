import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps, withRouter } from 'react-router-dom';
import { Card, CardBody, CardTitle } from 'reactstrap';
import {
  ALL,
  INAPPROPRIATELY_FED,
  NBC_AND_PNC_CHILD,
  NBC_AND_PNC_WOMAN,
  NO,
  NO_RISK,
  NUTRITION,
  OVERWEIGHT,
  PREGNANCY,
  RED,
  RED_ALERT,
  RISK,
  SEVERE_WASTING,
  SMS_FILTER_FUNCTION,
  STUNTED,
} from '../../constants';
import { getLinkToHierarchichalDataTable } from '../../helpers/utils';
import { FlexObject } from '../../helpers/utils';
import { addFilterArgs } from '../../store/ducks/sms_events';
import './index.css';

/**
 * interface for props to be passed to DataCircleCard component.
 */
interface Props extends RouteComponentProps {
  redAlert?: number;
  risk?: number;
  noRisk?: number;
  totalChildren?: number;
  stunting?: number;
  wasting?: number;
  overweight?: number;
  inappropriateFeeding?: number;
  title: string;
  addFilterArgsActionCreator?: typeof addFilterArgs;
  filterArgs?: SMS_FILTER_FUNCTION[];
  module: PREGNANCY | NBC_AND_PNC_CHILD | NBC_AND_PNC_WOMAN | NUTRITION | '';
  className?: string;
  userLocationId: string;
  permissionLevel: number;
}

/**
 * functional component that takes in props
 */
interface CircleSpecProps {
  class: string;
  riskLabel: string;
  riskType: string;
  riskValue: any;
}

function DataCircleCard({
  redAlert,
  risk,
  noRisk,
  stunting,
  wasting,
  overweight,
  inappropriateFeeding,
  title,
  addFilterArgsActionCreator = addFilterArgs,
  filterArgs,
  module,
  className = '',
  userLocationId,
  permissionLevel,
  history,
}: Props) {
  const pregnancyAndPncCircleSpec: CircleSpecProps[] = [
    {
      class: 'red',
      riskLabel: RED_ALERT,
      riskType: RED,
      riskValue: redAlert,
    },
    {
      class: 'yellow',
      riskLabel: RISK,
      riskType: RISK,
      riskValue: risk,
    },
    {
      class: 'green',
      riskLabel: NO_RISK,
      riskType: NO,
      riskValue: noRisk,
    },
  ];

  const nutritionCircleSpec: CircleSpecProps[] = [
    {
      class: 'stunting',
      riskLabel: 'Stunting',
      riskType: STUNTED,
      riskValue: stunting,
    },
    {
      class: 'wasting',
      riskLabel: 'Wasting',
      riskType: SEVERE_WASTING,
      riskValue: wasting,
    },
    {
      class: 'overweight',
      riskLabel: 'Overweight',
      riskType: OVERWEIGHT,
      riskValue: overweight,
    },
    {
      class: 'inappropriate-feeding',
      riskLabel: 'Inappropriate Feeding',
      riskType: INAPPROPRIATELY_FED,
      riskValue: inappropriateFeeding,
    },
  ];

  return (
    <Card className={`dataCircleCard ${className}`}>
      <CardTitle>
        <Link
          to={getLinkToHierarchichalDataTable(ALL, module, title, permissionLevel, userLocationId)}
          // tslint:disable-next-line: jsx-no-lambda
          onClick={() => {
            if (filterArgs) {
              addFilterArgsActionCreator(filterArgs);
            }
          }}
        >
          {title}
        </Link>
      </CardTitle>
      <CardBody className="circlesRow">
        {(module !== NUTRITION ? pregnancyAndPncCircleSpec : nutritionCircleSpec).map(
          (spec: FlexObject, i: number) => (
            <Link
              className={`${spec.class} circle`}
              key={i}
              // tslint:disable-next-line: jsx-no-lambda
              onClick={() => {
                if (filterArgs) {
                  addFilterArgsActionCreator(filterArgs);
                }
              }}
              to={getLinkToHierarchichalDataTable(
                spec.riskType,
                module,
                title,
                permissionLevel,
                userLocationId
              )}
            >
              <span className="number">{spec.riskValue}</span>
              <span className="risk-level">{spec.riskLabel}</span>
            </Link>
          )
        )}
      </CardBody>
    </Card>
  );
}

const mapDispatchToProps = { addFilterArgsActionCreator: addFilterArgs };

const ConnectedDataCircleCard = connect(
  null,
  mapDispatchToProps
)(withRouter(DataCircleCard));

export default ConnectedDataCircleCard;
