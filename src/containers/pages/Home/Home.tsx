// this is the home page component
import * as React from 'react';
import { Link } from 'react-router-dom';
import { Col, Row } from 'reactstrap';
import { LOGFACE_URL } from '../../../constants';
import { LogFace } from '../../LogFace';
import './Home.css';

class Home extends React.Component<{}, {}> {
  public render() {
    return (
      <div className="home-main">
        <div className="welcome-text">
          <h1>Welcome to the MIECD dashboard</h1>
        </div>
        <div className="components-list">
          <div className="spacer">
            <div className="home-sub-containers">
              {/* <div className="sub-container-heading">
                <p>Log face</p>
              </div> */}
              <div className="sub-container-message">
                <div id="cont-size">
                  <h1>Pregnancy</h1>
                </div>
                <div id="cont-size">
                  <h4>View the latest message updates about your patients.</h4>
                </div>
                <div id="cont-sized">
                  <Link to={'/pregnancy'}>
                    <button className="button-style default">View</button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className="spacer">
            <div className="home-sub-containers">
              {/* <div className="sub-container-heading">
                <p>Log face</p>
              </div> */}
              <div className="sub-container-message">
                <div id="cont-size">
                  <h1>NBC & PNC</h1>
                </div>
                <div id="cont-size">
                  <h4>View the latest message updates about your patients.</h4>
                </div>
                <div id="cont-sized">
                  
                    <button className="button-style">View</button>
                  
                </div>
              </div>
            </div>
          </div>
          <div className="spacer">
            <div className="home-sub-containers">
              {/* <div className="sub-container-heading">
                <p>Log face</p>
              </div> */}
              <div className="sub-container-message">
                <div id="cont-size">
                  <h1>Nutrition</h1>
                </div>
                <div id="cont-size">
                  <h4>View the latest message updates about your patients.</h4>
                </div>
                <div id="cont-sized">
                  
                    <button className="button-style">View</button>
                  
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
