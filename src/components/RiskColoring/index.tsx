import React from 'react';
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
            <p>No Risk</p>
          </div>
        </span>
      );
    case 'low':
      return (
        <span className="badge badge-primary" id="default-width">
          <div>
            <p>Low Risk</p>
          </div>
        </span>
      );
    case 'high':
      return (
        <span className="badge badge-warning" id="default-width">
          <div>
            <p>High Risk</p>
          </div>
        </span>
      );
    case 'red':
      return (
        <span className="badge badge-danger" id="default-width">
          <div>
            <p>Red Alert</p>
          </div>
        </span>
      );
    case 'not set':
      return (
        <span className="badge badge-info" id="default-width">
          <div>
            <p>Not Set</p>
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
