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
  switch (Risk) {
    case 'No Risk':
      return (
        <td className="green" id="default-width">
          {Risk}
        </td>
      );
    case 'no risk':
      return (
        <td className="green" id="default-width">
          No Risk
        </td>
      );
    case 'low':
      return (
        <td className="blue" id="default-width">
          Low Risk
        </td>
      );
    case 'high':
      return (
        <td className="yellow" id="default-width">
          High Risk
        </td>
      );
    case 'red':
      return (
        <td className="red" id="default-width">
          Red Alert
        </td>
      );
    default:
      return (
        <td className="risk-default" id="default-width">
          {Risk}
        </td>
      );
  }
};

riskColoring.defaultProps = riskColoringDefaultProps;

export default riskColoring;
