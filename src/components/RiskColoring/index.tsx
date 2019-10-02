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
          No Risk
        </span>
      );
    case 'low':
      return (
        <span className="badge badge-primary" id="default-width">
          Low Risk
        </span>
      );
    case 'high':
      return (
        <span className="badge badge-warning" id="default-width">
          High Risk
        </span>
      );
    case 'red':
      return (
        <span className="badge badge-danger" id="default-width">
          Red Alert
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
