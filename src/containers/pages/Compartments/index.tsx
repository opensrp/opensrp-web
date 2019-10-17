import React, { Component } from 'react';
import { Container, Row } from 'reactstrap';
import './index.css';

class Compartments extends Component<any, {}> {
  public render() {
    return (
      <Container fluid={true}>
        <Row>
          <h2 id="compartment_title">Compartment</h2>
        </Row>
        <Row>
          <p>the locations breadcrumbs go here</p>
        </Row>
        <Row>
          <p>the cards go here</p>
        </Row>
      </Container>
    );
  }
}

export default Compartments;
