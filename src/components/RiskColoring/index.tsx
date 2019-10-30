import React from 'react';
import {
  HIGH,
  HIGH_RISK,
  LOW,
  LOW_RISK,
  NO_RISK,
  NOT_SET,
  NOT_SET_LOWERCASE,
  RED,
  RED_ALERT,
} from '../../constants';
import './index.css';

interface RiskColoringProps {
  risk: string;
}

const riskColoringDefaultProps: RiskColoringProps = {
  risk: 'red-alert',
};

/** Colour codes risk levels */
const riskColoring = (props: RiskColoringProps) => {
  const { risk } = props;
  switch (risk.toLowerCase().trim()) {
    case NO_RISK:
    case 'no risk':
    case 'null':
      return (
        <span className="badge badge-success" id="default-width">
          <div>
            <p>{NO_RISK}</p>
          </div>
        </span>
      );
    case LOW:
      return (
        <span className="badge badge-primary" id="default-width">
          <div>
            <p>{LOW_RISK}</p>
          </div>
        </span>
      );
    case HIGH:
      return (
        <span className="badge badge-warning" id="default-width">
          <div>
            <p>{HIGH_RISK}</p>
          </div>
        </span>
      );
    case RED:
      return (
        <span className="badge badge-danger" id="default-width">
          <div>
            <p>{RED_ALERT}</p>
          </div>
        </span>
      );
    case NOT_SET_LOWERCASE:
      return (
        <span className="badge badge-info" id="default-width">
          <div>
            <p>{NOT_SET}</p>
          </div>
        </span>
      );
    default:
      return (
        <span className="badge badge-info" id="default-width">
          {risk}
        </span>
      );
  }
};

riskColoring.defaultProps = riskColoringDefaultProps;

export default riskColoring;
