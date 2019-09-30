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
        <span className="green" id="default-width">
          No Risk
        </span>
      );
    case 'low':
      return (
        <span className="blue" id="default-width">
          Low Risk
        </span>
      );
    case 'high':
      return (
        <span className="yellow" id="default-width">
          High Risk
        </span>
      );
    case 'red':
      return (
        <span className="red" id="default-width">
          Red Alert
        </span>
      );
    default:
      return (
        <span className="risk-default" id="default-width">
          {Risk}
        </span>
      );
  }
};

riskColoring.defaultProps = riskColoringDefaultProps;

export default riskColoring;
