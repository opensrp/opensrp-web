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
  NBC_AND_PNC_CHILD,
  NBC_AND_PNC_WOMAN,
  NO,
  NO_RISK,
  NUTRITION,
  PREGNANCY,
  SMS_FILTER_FUNCTION,
} from '../../constants';
import { FlexObject, getModuleLink } from '../../helpers/utils';
import { addFilterArgs } from '../../store/ducks/sms_events';
import './index.css';

interface Props {
  highRisk?: number;
  lowRisk?: number;
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

function DataCircleCard({
  highRisk,
  lowRisk,
  noRisk,
  totalChildren,
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
  function getLinkToHierarchichalDataTable(riskLevel: HIGH | LOW | NO) {
    if (permissionLevel === 4) {
      return '#';
    } else {
      return `${getModuleLink(
        module
      )}${HIERARCHICAL_DATA_URL}/${module}/${riskLevel}/${title}/${permissionLevel}/down/${locationId}/${permissionLevel}`;
    }
  }
  const locationId = userLocationId;
  const pregnancyAndPncCircleSpec: FlexObject[] = [
    {
      class: 'red',
      riskLabel: HIGH_RISK,
      riskType: HIGH,
      riskValue: highRisk,
    },
    {
      class: 'orange',
      riskLabel: LOW_RISK,
      riskType: LOW,
      riskValue: lowRisk,
    },
    {
      class: 'green',
      riskLabel: NO_RISK,
      riskType: NO,
      riskValue: noRisk,
    },
  ];

  const nutritionCircleSpec: FlexObject[] = [
    {
      class: 'total-children',
      riskLabel: HIGH_RISK,
      riskType: HIGH,
      riskValue: totalChildren,
    },
    {
      class: 'stunting',
      riskLabel: LOW_RISK,
      riskType: LOW,
      riskValue: stunting,
    },
    {
      class: 'wasting',
      riskLabel: NO_RISK,
      riskType: NO,
      riskValue: wasting,
    },
    {
      class: 'overweight',
      riskLabel: NO_RISK,
      riskType: NO,
      riskValue: overweight,
    },
    {
      class: 'inappropriate-feeding',
      riskLabel: NO_RISK,
      riskType: NO,
      riskValue: inappropriateFeeding,
    },
  ];

  return (
    <Card className={`dataCircleCard ${className}`}>
      <CardTitle>{title}</CardTitle>
      <CardBody>
        <ul className="circlesRow">
          {module !== NUTRITION
            ? pregnancyAndPncCircleSpec.map((spec: FlexObject, i: number) => (
                <li className={spec.class} key={i}>
                  <Link
                    to={getLinkToHierarchichalDataTable(spec.riskType)}
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
              ))
            : nutritionCircleSpec.map((spec: FlexObject, i: number) => (
                <li className={spec.class} key={i}>
                  <Link
                    to={getLinkToHierarchichalDataTable(spec.riskType)}
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
              ))}
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
