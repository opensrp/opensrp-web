// this is the home page component
import * as React from 'react';
import { Col, Row } from 'reactstrap';
import './Home.css';

class Home extends React.Component<{}, {}> {
  public render() {
    return (
      <div className="text-center">
        <Row className="welcome-box">
          <Col>
            <h3>Welcome to OpenSRp</h3>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Home;
