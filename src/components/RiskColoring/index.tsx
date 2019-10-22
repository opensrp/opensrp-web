import React from 'react';
import { HIGH_RISK, LOW_RISK, NO_RISK, NOT_SET, RED_ALERT } from '../../constants';
import './index.css';

interface RiskColoringProps {
  Risk: string;
}

const riskColoringDefaultProps: RiskColoringProps = {
  Risk: 'red-alert',
};

/** Colour codes risk levels */
const riskColoring = (props: RiskColoringProps) => {
  const { Risk } = props;
  switch (Risk.toLowerCase()) {
    case 'no risk':
      return (
        <span className="badge badge-success" id="default-width">
          <div>
            <p>{NO_RISK}</p>
          </div>
        </span>
      );
    case 'low':
      return (
        <span className="badge badge-primary" id="default-width">
          <div>
            <p>{LOW_RISK}</p>
          </div>
        </span>
      );
    case 'high':
      return (
        <span className="badge badge-warning" id="default-width">
          <div>
            <p>{HIGH_RISK}</p>
          </div>
        </span>
      );
    case 'red':
      return (
        <span className="badge badge-danger" id="default-width">
          <div>
            <p>{RED_ALERT}</p>
          </div>
        </span>
      );
    case 'not set':
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
          {Risk}
        </span>
      );
  }
};

riskColoring.defaultProps = riskColoringDefaultProps;

export default riskColoring;
