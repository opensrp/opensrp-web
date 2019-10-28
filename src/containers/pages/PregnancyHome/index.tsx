// this is the home page component
import * as React from 'react';
import { Link } from 'react-router-dom';
import { Col, Row } from 'reactstrap';
import { ANALYSIS_URL, COMPARTMENTS_URL, LOGFACE_URL } from '../../../constants';
import { LogFace } from '../../LogFace';
import './index.css';

interface Props {
  title: string;
}

const defaultProps: Props = {
  title: '',
};
class PregnancyHome extends React.Component<Props, {}> {
  public static defaultProps = defaultProps;

  public render() {
    return (
      <div className="pregnancy-home-main">
        <div className="welcome-text">
          <h1>{this.props.title}</h1>
          <p>
            This dashboard displays information collected from MIECD Viet Nam Pregnancy Module for
            patients in your geographical location. The Module covers the whole pregnancy period
            from conception to delivery and includes Pregnancy Registration, ANC visits, Birth
            reports/Death reports, Risk Reports, Risk alerts and ResponseReports.
          </p>
        </div>
        <div className="components-list">
          <div className="spacer">
            <div className="home-sub-containers">
              <div className="sub-container-heading">
                <p>Log face</p>
              </div>
              <hr />
              <div className="sub-container-message">
                <div id="cont-size">
                  <p>Display of all messages receioved from MIECD in chronological order</p>
                </div>
                <div id="cont-sized">
                  <Link to={LOGFACE_URL}>
                    <button className="button-style">View</button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className="spacer">
            <div className="home-sub-containers">
              <div className="sub-container-heading">
                <p>Compartments</p>
              </div>
              <hr />
              <div className="sub-container-message">
                <div id="cont-size">
                  <p>This is the aggregation and categorization of patients data</p>
                </div>
                <div id="cont-sized">
                  <Link to={COMPARTMENTS_URL}>
                    <button className="button-style">View</button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className="spacer">
            <div className="home-sub-containers">
              <div className="sub-container-heading">
                <p>Analysis</p>
              </div>
              <hr />
              <div className="sub-container-message">
                <div id="cont-size">
                  <p>Important analysis and indicators generated from collected data</p>
                </div>
                <div id="cont-sized">
                  <Link to={ANALYSIS_URL}>
                    <button className="button-style">View</button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default PregnancyHome;
