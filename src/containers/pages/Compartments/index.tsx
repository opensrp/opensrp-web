import React, { Component } from 'react';
import DataCircleCard from '../../../components/DataCircleCard';
import HierarchichalDataTable from '../../../components/HierarchichalDataTable';

class Compartments extends Component<any, {}> {
  public render() {
    return (
      <HierarchichalDataTable
        current_level={parseInt(this.props.match.params.current_level, 10)}
        node_id={this.props.match.params.node_id}
        direction={this.props.match.params.direction}
        from_level={this.props.match.params.from_level}
      />
    );
  }
}

export default Compartments;
