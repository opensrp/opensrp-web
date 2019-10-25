// this is the home page component
import * as React from 'react';
import { Link } from 'react-router-dom';
import { Col, Row } from 'reactstrap';
import womanchild1 from '../../../assets/images/womanchild1.png';
import womanchild2 from '../../../assets/images/womanchild2.png';
import womanchild3 from '../../../assets/images/womanchild3.png';
import { LOGFACE_URL } from '../../../constants';
import { LogFace } from '../../LogFace';
import './index.css';

class Home extends React.Component<{}, {}> {
  public render() {
    return (
      <div className="home-main">
        <div className="welcome-text">
          <h1>Welcome to the MIECD dashboard</h1>
        </div>
        <div className="components-list">
          <div className="spacer">
            <img src={womanchild1} id="womanchild1" />
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
            <img src={womanchild2} id="womanchild2" />
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
            <img src={womanchild3} id="womanchild3" />
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
