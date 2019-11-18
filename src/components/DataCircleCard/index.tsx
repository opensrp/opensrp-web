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
  NBC_AND_PNC_COMPARTMENTS_URL,
  NBC_AND_PNC_WOMAN,
  NO,
  NO_RISK,
  NUTRITION,
  NUTRITION_COMPARTMENTS_URL,
  PREGNANCY,
  PREGNANCY_COMPARTMENTS_URL,
  SMS_FILTER_FUNCTION,
} from '../../constants';
import { addFilterArgs } from '../../store/ducks/sms_events';
import './index.css';

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

/**
 * Get a link to any of the modules compartments.
 * @param module string representing the module whose link you would like to get
 * @return link to module compartment
 */
export function getModuleLink(
  module: PREGNANCY | NBC_AND_PNC_CHILD | NBC_AND_PNC_WOMAN | NUTRITION | ''
): PREGNANCY_COMPARTMENTS_URL | NUTRITION_COMPARTMENTS_URL | NBC_AND_PNC_COMPARTMENTS_URL | '' {
  switch (module) {
    case PREGNANCY:
      return PREGNANCY_COMPARTMENTS_URL;
    case NUTRITION:
      return NUTRITION_COMPARTMENTS_URL;
    case NBC_AND_PNC_WOMAN:
      return NBC_AND_PNC_COMPARTMENTS_URL;
    case NBC_AND_PNC_CHILD:
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
  return (
    <Card className={`dataCircleCard ${className}`}>
      <CardTitle>{title}</CardTitle>
      <CardBody>
        <ul className="circlesRow">
          <li className="red">
            <Link
              to={getLinkToHierarchichalDataTable(HIGH)}
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
              to={getLinkToHierarchichalDataTable(LOW)}
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
              to={getLinkToHierarchichalDataTable(NO)}
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
