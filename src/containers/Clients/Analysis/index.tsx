import * as React from 'react';

import './index.css';

interface State {
  loading: boolean;
}

export class Analysis extends React.Component<{}, State> {
  constructor(props: any) {
    super(props);
    this.state = {
      loading: true,
    };
  }

  public render() {
    return (
      <div className="analysis-content">
        <div>
          <h2 id="analysis_title">Pregnancy - Analysis</h2>
        </div>
        <div className="analysis-wrapper">
          <iframe
            seamless={true}
            scrolling="yes"
            frameBorder="0"
            src="https://superset.ona.io/superset/dashboard/164/?standalone=true"
          />
        </div>
      </div>
    );
  }
}

export default Analysis;
