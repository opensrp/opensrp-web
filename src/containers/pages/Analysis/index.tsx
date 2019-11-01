import * as React from 'react';
import Ripple from '../../../components/page/Loading';
import './index.css';

interface State {
  loading: boolean;
}

interface Props {
  endpoint: string;
}

const defaultProps: Props = {
  endpoint: '',
};

export class Analysis extends React.Component<Props, State> {
  public static defaultProps = defaultProps;
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
          {this.state.loading ? <Ripple /> : null}
          <iframe
            seamless={true}
            scrolling="yes"
            frameBorder="0"
            onLoad={this.hideSpinner}
            src={this.props.endpoint}
            title="pregnancy sms events analysis"
          />
        </div>
      </div>
    );
  }

  private hideSpinner = () => {
    this.setState({
      loading: false,
    });
  };
}

export default Analysis;
