import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Card, CardBody, CardTitle } from 'reactstrap';
import {
  ALL,
  HIGH,
  INAPPROPRIATELY_FED,
  LOW,
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
interface Props {
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
}: Props) {
  const pregnancyAndPncCircleSpec: CircleSpecProps[] = [
    {
      class: 'red',
      riskLabel: RED_ALERT,
      riskType: RED,
      riskValue: redAlert,
    },
    {
      class: 'orange',
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
      class: 'total-children',
      riskLabel: 'Total Children',
      riskType: HIGH,
      riskValue: ([stunting, wasting, overweight, inappropriateFeeding] as any).reduce(
        (a: number, b: number) => Number(a) + b,
        0
      ),
    },
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
      <CardBody>
        <ul className="circlesRow">
          {(module !== NUTRITION ? pregnancyAndPncCircleSpec : nutritionCircleSpec).map(
            (spec: FlexObject, i: number) => (
              <li className={spec.class} key={i}>
                <Link
                  to={getLinkToHierarchichalDataTable(
                    spec.riskType,
                    module,
                    title,
                    permissionLevel,
                    userLocationId
                  )}
                  // tslint:disable-next-line: jsx-no-lambda
                  onClick={() => {
                    if (filterArgs) {
                      addFilterArgsActionCreator(filterArgs);
                    }
                  }}
                >
                  <span className="number">{spec.riskValue}</span>
                </Link>
                <span className="risk-level">{spec.riskLabel}</span>
              </li>
            )
          )}
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
